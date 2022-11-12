const { build } = require('esbuild')
const glob = require('glob')
const entryPoints = glob.sync('./src/**/*.ts')

build({
  entryPoints,
  outbase: './src',
  outdir: './dist',
  platform: 'node',
  bundle: true,
  minify: true,
  target: 'node16',
  external: [],
  watch: false
})
