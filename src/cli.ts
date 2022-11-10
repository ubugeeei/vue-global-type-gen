import minimist from 'minimist'

export const run = async (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'out', 'dir', 'include', 'exclude'],
    alias: { v: 'version', o: 'out', d: 'dir', i: 'include', e: 'exclude' }
  })

  argv.version !== undefined
    ? console.log(`v${require('../package.json').version}`)
    : (() => {
        // TODO:
        console.log('hello')
      })()
}
