import fs from 'fs'
import { parse } from 'yaml'
import wcmatch from 'wildcard-match'

type Config = {
  config: {
    includes?: string[]
    excludes?: string[]
    out?: string
    stdout?: boolean
  }
}

export const generate = ({ config: configPath }: { config?: string }): void => {
  const c = getConfig(configPath)
  const p = getVueComponentFilePaths(c)
  const s = generateTypeDefString(c, p)
  c.stdout ? console.log(s) : fs.writeFileSync(c.out, s)
}

export const generateTypeDefString = (
  config: Required<Config['config']>,
  files: string[]
): string => {
  const types = files
    .flatMap(it => [
      `\n\x20\x20\x20\x20${it
        .split('/')
        .at(-1)
        ?.replace(/\.vue/, '')}: typeof import('${it}').default;`,
      `\n\x20\x20\x20\x20Lazy${it
        .split('/')
        .at(-1)
        ?.replace(/\.vue/, '')}: typeof import('${it}').default;`
    ])
    .sort(it => (it.match(/Lazy/) ? 1 : -1))
    .join('')

  return `declare module '@vue/runtime-core' {\n\x20\x20export interface GlobalComponents {${types}\n\x20\x20}\n}\n`
}

export const getVueComponentFilePaths = (config: Required<Config['config']>, dir = '.'): string[] =>
  recursiveListFilePaths(dir)
    .map(it => it.replace(`${dir}/`, ''))
    .filter(
      name =>
        config.includes.some((it: string) => wcmatch(it)(name)) &&
        config.excludes.every((it: string) => !wcmatch(it)(name))
    )

export const recursiveListFilePaths = (dir: string): string[] =>
  fs.statSync(dir).isDirectory()
    ? fs
        .readdirSync(dir, { withFileTypes: true })
        .flatMap(dirent =>
          dirent.isFile()
            ? [`${dir}/${dirent.name}`]
            : recursiveListFilePaths(`${dir}/${dirent.name}`)
        )
    : []

export const getConfig = (configPath?: string): Required<Config['config']> => {
  try {
    const yml = fs.readFileSync(configPath ?? 'vue-gt.yml', 'utf8')
    const { config } = parse(yml) as Config
    const { out, includes, excludes } = config
    return {
      out: out ?? 'auto-import.d.ts',
      includes: includes ?? ['components/**/*.vue', 'pages/**/*.vue'],
      excludes: excludes ? [...excludes, 'node_modules'] : ['node_modules'],
      stdout: config.stdout ?? false
    }
  } catch {
    return {
      includes: ['components/**/*.vue', 'pages/**/*.vue'],
      excludes: ['node_modules'],
      out: 'auto-import.d.ts',
      stdout: false
    }
  }
}
