import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import dynamicImport from 'vite-plugin-dynamic-import';
import svgLoader from 'vite-svg-loader';
import Components from 'unplugin-vue-components/vite';
import { buildSync } from 'esbuild';
import legacy from '@vitejs/plugin-legacy';
import VueDevTools from 'vite-plugin-vue-devtools';
import postcssPresetEnv from 'postcss-preset-env';
// Analyse bundle
// import { visualizer } from 'rollup-plugin-visualizer';

const ENV = {
	appId: {
		slotoking: '1:1053405441741:web:0d5fb84b8f55f4473bc384',
		vulkanoriginals: '1:1053405441741:web:9541b802da2a0e063bc384',
	},
	measurementId: {
		slotoking: 'G-MH9WFFP8ZX',
		vulkanoriginals: 'G-C7FCP5EZNF',
	},
	notificationClickEnable: {
		slotoking: true,
		vulkanoriginals: false,
	},
};

export default ({ mode, isSsrBuild }) => {
	// eslint-disable-next-line no-undef
	const env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	// eslint-disable-next-line no-undef
	process.env = env;

	// eslint-disable-next-line no-undef
	const projectName = env.PROJECT_NAME;
	const currentProject = `./src/project-${projectName}`;

	// https://vitejs.dev/config/
	return defineConfig({
		plugins: [
			...(env.NODE_ENV === 'development' ? [] : [legacy()]),
			vue({
				template: {
					compilerOptions: {
						isCustomElement: (tag) => tag.startsWith('swiper-'),
					},
				},
			}),
			vueJsx(),
			dynamicImport({
				filter(id) {
					// Icon deep import
					if (id.includes('@icons/') || id.includes('@projectIcons/') || id.includes('@cash3-new/assets/img/core')) {
						return true;
					}
				},
			}),
			svgLoader({
				svgoConfig: {
					plugins: ['prefixIds', 'removeDimensions'],
				},
			}),
			Components({
				dirs: ['../modules/plugins/modal', './src/core', currentProject],
				deep: true,
				directives: false,
				allowOverrides: true,
			}),
			{
				apply: 'build',
				enforce: 'post',
				transformIndexHtml() {
					buildSync({
						minify: false,
						bundle: false,
						entryPoints: ['./src/core/serviceWorker.js'],
						outfile: './server/dist/firebase-messaging-sw.js',
						define: {
							__APP_ID__: `'${ENV.appId[env.PROJECT_NAME]}'`,
							__MEASUREMENT_ID__: `'${ENV.measurementId[env.PROJECT_NAME]}'`,
							__NOTIFICATION_CLICK_ENABLE__: `${ENV.notificationClickEnable[env.PROJECT_NAME]}`,
						},
					});
				},
			},
			...(isSsrBuild
				? []
				: [
						viteStaticCopy({
							targets: [
								{
									src: './src/core/assets/img/**/*',
									dest: 'images',
								},
								{
									src: `${currentProject}/assets/img/**/*`,
									dest: 'projectImages',
								},
								{
									src: '../modules/plugins/verificationIdentity/images/**/*',
									dest: 'verificationIdentity',
								},
								{
									src: '../modules/plugins/notify/images/**/*',
									dest: 'notifyImages',
								},
								{
									src: '../modules/plugins/notify/icons/**/*',
									dest: 'notifyIcons',
								},
								{
									src: '../modules/cash3-new/assets/img/**/*',
									dest: 'cash3',
								},
								{
									src: '../modules/cash3-new/notify/images/**/*',
									dest: 'cash3-notify',
								},
								{
									src: '../modules/cash3-new/assets/fonts/**/*',
									dest: 'cash3-fonts',
								},
								{
									src: './node_modules/@esotericsoftware/spine-player/dist/iife/spine-player.min.js',
									dest: '@esotericsoftware',
								},
							],
						}),
					]),
			...(env.NODE_ENV === 'development' ? [VueDevTools()] : []),
			// visualizer({
			// 	template: 'treemap', // or sunburst
			// 	open: true,
			// 	gzipSize: true,
			// 	brotliSize: true,
			// 	filename: 'analyse.html', // will be saved in project's root
			// }),
		],
		define: {
			'process.env': {
				// Change NODE_ENV to import.meta.env. -  DEV, PROD
				NODE_ENV: env.NODE_ENV,
				PROJECT_NAME: env.PROJECT_NAME,
				VUE_APP_PAGE_LIMIT_ALL_SLOTS: env.VUE_APP_PAGE_LIMIT_ALL_SLOTS,
				VUE_APP_GA_TRACK_FORM: env.VUE_APP_GA_TRACK_FORM,
				VUE_APP_IS_USE_CLOUD_IMG: env.VUE_APP_IS_USE_CLOUD_IMG,
				VUE_APP_MAIN_DOMAIN: env.VUE_APP_MAIN_DOMAIN,
			},
		},
		build: {
			emptyOutDir: true,
			assetsDir: 'asset',
			sourcemap: false,
			rollupOptions: {
				// Ignore external error from public images
				external: [
					/^\/themes\//,
					/^\/images\//,
					/^\/projectImages\//,
					/^\/verificationIdentity\//,
					/^\/notifyImages\//,
					/^\/notifyIcons\//,
					/^\/cash3\//,
					/^\/cash3-notify\//,
					/^\/cash3-fonts\//,
				],
			},
		},
		resolve: {
			extensions: ['.js', '.vue', '.css', '.scss'],
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
				'@core': fileURLToPath(new URL('./src/core', import.meta.url)),
				'@cash3': fileURLToPath(new URL('../modules/cash3', import.meta.url)),
				'@cash3-new': fileURLToPath(new URL('../modules/cash3-new', import.meta.url)),
				'@modules': fileURLToPath(new URL('../modules', import.meta.url)),
				'@currentProject': fileURLToPath(new URL(currentProject, import.meta.url)),
				'@icons': fileURLToPath(new URL('src/core/assets/icons', import.meta.url)),
				'@projectIcons': fileURLToPath(new URL(`${currentProject}/assets/icons`, import.meta.url)),
				'@images': fileURLToPath(new URL('src/core/assets/img', import.meta.url)),
				'@projectImages': fileURLToPath(new URL(`${currentProject}/assets/img`, import.meta.url)),
				'@ga': fileURLToPath(new URL('src/core/GA', import.meta.url)),
				...(isSsrBuild ? {} : { vue: 'vue/dist/vue.esm-bundler.js' }),
			},
			dedupe: [
				'vue',
				'vuex',
				'vue-router',
				'@vuelidate/core',
				'@vuelidate/validators',
				'axios',
				'click-outside-vue3',
				'google-libphonenumber',
				'vue-cleave-component',
				'vue-cookies',
				'vue-final-modal',
				'vue-i18n',
				'vue-the-mask',
				'vue3-clipboard',
			],
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
            @use "sass:math";
            $app__current-project: '${env.PROJECT_NAME}';
				    @import "@/core/styles/_functions.scss";
				    @import "@/core/styles/variables.scss";
				    @import "@currentProject/styles/variables.scss";
				    @import "@currentProject/styles/variables/_export-variables.scss";
				    @import "@/core/styles/_extend-styles.scss";
				    @import "@currentProject/styles/_extend-styles.scss";
				    @import "@/core/styles/_mixins.scss";
            @import "@cash3-new/css/_variables.scss";
            @import "@currentProject/styles/quasar.variables.scss";
            `,
				},
			},
			postcss: {
				plugins: [postcssPresetEnv()],
			},
		},
	});
};
