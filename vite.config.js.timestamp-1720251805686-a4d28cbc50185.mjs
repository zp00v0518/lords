// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///C:/Users/zp00v/Desktop/Projects/lords/node_modules/vite/dist/node/index.js";
import vueDevTools from "file:///C:/Users/zp00v/Desktop/Projects/lords/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import vue from "file:///C:/Users/zp00v/Desktop/Projects/lords/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/zp00v/Desktop/Projects/lords/vite.config.js";
console.log(process.env);
console.log("*****************************************");
console.log("*****************************************");
console.log("*****************************************");
console.log(import.meta);
console.log(import.meta.env);
var vite_config_default = defineConfig((obj) => {
  console.log(obj);
  return {
    plugins: [vueDevTools(), vue()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/main.scss";`
        }
      }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    define: {
      "process.env": {
        NODE_ENV: "development"
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx6cDAwdlxcXFxEZXNrdG9wXFxcXFByb2plY3RzXFxcXGxvcmRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx6cDAwdlxcXFxEZXNrdG9wXFxcXFByb2plY3RzXFxcXGxvcmRzXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy96cDAwdi9EZXNrdG9wL1Byb2plY3RzL2xvcmRzL3ZpdGUuY29uZmlnLmpzXCI7Ly8gIENvbmZpZ3VyYXRpb24gVml0ZVxyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuLy8gaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJztcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5jb25zb2xlLmxvZyhwcm9jZXNzLmVudilcclxuY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJylcclxuY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJylcclxuY29uc29sZS5sb2coJyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJylcclxuY29uc29sZS5sb2coaW1wb3J0Lm1ldGEpXHJcbmNvbnNvbGUubG9nKGltcG9ydC5tZXRhLmVudilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygob2JqKSA9PiB7XHJcbiAgY29uc29sZS5sb2cob2JqKVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW3Z1ZURldlRvb2xzKCksIHZ1ZSgpXSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9hc3NldHMvbWFpbi5zY3NzXCI7YFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgICdwcm9jZXNzLmVudic6IHtcclxuICAgICAgICBOT0RFX0VOVjogJ2RldmVsb3BtZW50J1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxlQUFlLFdBQVc7QUFHbkMsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxTQUFTO0FBTjZLLElBQU0sMkNBQTJDO0FBTzlPLFFBQVEsSUFBSSxRQUFRLEdBQUc7QUFDdkIsUUFBUSxJQUFJLDJDQUEyQztBQUN2RCxRQUFRLElBQUksMkNBQTJDO0FBQ3ZELFFBQVEsSUFBSSwyQ0FBMkM7QUFDdkQsUUFBUSxJQUFJLFdBQVc7QUFDdkIsUUFBUSxJQUFJLFlBQVksR0FBRztBQUUzQixJQUFPLHNCQUFRLGFBQWEsQ0FBQyxRQUFRO0FBQ25DLFVBQVEsSUFBSSxHQUFHO0FBRWYsU0FBTztBQUFBLElBQ0wsU0FBUyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFBQSxJQUM5QixLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3REO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sZUFBZTtBQUFBLFFBQ2IsVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
