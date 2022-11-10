import minimist from 'minimist'
import buildOptions from 'minimist-options'

import { generate } from './generate'

export const run = async () => {
  const options = buildOptions({
    version: {
      type: 'boolean',
      alias: 'v',
      default: false
    },
    out: {
      type: 'string',
      alias: 'o',
      default: 'auto-import.d.ts'
    },
    dir: {
      type: 'string',
      alias: 'd',
      default: 'components'
    },
    include: {
      type: 'array',
      alias: 'i',
      default: []
    },
    exclude: {
      type: 'array',
      alias: 'e',
      default: []
    }
  })

  const argv = minimist(process.argv.slice(2), options)

  const { out, dir, include, exclude } = argv
  argv.version
    ? console.log(`v${require('../package.json').version}`)
    : generate({ out, dir, include, exclude })
}
