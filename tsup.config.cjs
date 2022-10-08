const {defineConfig} = require('tsup');

module.exports = defineConfig({
	entry: ['./src'],
	outDir: './dist',
	clean: true,
	platform: 'node',
	target: 'node16',
	format: 'esm',
	minify: true,
	bundle: true,
});
