import minimist from 'minimist'
import buildOptions from 'minimist-options'

import { generate } from './generate'

export const run = async (args: string[]) => {
  const options = buildOptions({
    version: {
      type: 'boolean',
      alias: 'v',
      default: false
    },
    config: {
      type: 'string',
      alias: 'c',
      default: 'vue-gt.yml'
    }
  })

  const argv = minimist(args, options)

  const { config } = argv
  argv.version ? console.log(`v${require('../package.json').version}`) : generate({ config })
}
