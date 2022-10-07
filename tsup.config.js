const {defineConfig} = require('tsup');

module.exports = defineConfig({
	entry: ['./src'],
	outDir: './dist',
	clean: true,
	minify: true,
	platform: 'node',
	target: 'node16',
	format: 'cjs',
	bundle: true,
});
