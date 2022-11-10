import fs from 'fs'

export const generate = ({
  out,
  dir,
  include,
  exclude
}: {
  out: string
  dir: string
  include: string[]
  exclude: string[]
}) => {
  const listFiles = (dir: string): string[] =>
    fs
      .readdirSync(dir, { withFileTypes: true })
      .flatMap(dirent =>
        dirent.isFile() ? [`${dir}/${dirent.name}`] : listFiles(`${dir}/${dirent.name}`)
      )

  const types = listFiles(dir)
    .map(
      it =>
        `\x20\x20export type ${it
          .split('/')
          .at(-1)
          ?.replace(/\.vue/, '')} = typeof import('${it}').default;\n`
    )
    .join('')

  fs.writeFileSync(out, `declare module '@vue/runtime-core' {\n${types}\n}`)
}
