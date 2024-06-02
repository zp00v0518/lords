const child_process = require('child_process')

const lords = child_process.exec('supervisor --inspect --watch backend index.js ', (err, stdout, stderr) => {
	console.log(err)
	console.log(stdout)
	console.log(stderr)
})

const webpack = child_process.exec('npm run dev', (err, stdout, stderr) => {
	console.log(err)
	console.log(stdout)
	console.log(stderr)
})


lords.stdout.pipe(process.stdout)
webpack.stdout.pipe(process.stdout)

