import fs from 'fs'
import { parse } from 'yaml'
import wcmatch from 'wildcard-match'

export const generate = ({ config: configPath }: { config: string }) => {
  const yml = fs.readFileSync(configPath, 'utf8')
  const { config } = parse(yml)
  config.excludes.push('node_modules')

  const vueFiles = listFiles('.')
    .map(it => it.replace('./', ''))
    .filter(
      name =>
        config.includes.some((it: string) => wcmatch(it)(name)) &&
        config.excludes.every((it: string) => !wcmatch(it)(name))
    )

  const types = vueFiles
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

  fs.writeFileSync(
    config.out,
    `declare module '@vue/runtime-core' {\n\x20\x20export interface GlobalComponents {${types}\n\x20\x20}\n}`
  )
}

const listFiles = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap(dirent =>
      dirent.isFile() ? [`${dir}/${dirent.name}`] : listFiles(`${dir}/${dirent.name}`)
    )
