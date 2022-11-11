# Vue Global Type Generator

generate global vue components types.  
ex.)

```ts
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    TextBtn: typeof import('example/components/TextBtn.vue').default
    LazyTextBtn: typeof import('example/components/TextBtn.vue').default
  }
}
```

# Usage

installation

```sh
$ npm install -D vue-global-type-gen
# or
$ yarn add -D vue-global-type-gen
# or
$ pnpm install -D vue-global-type-gen
```

configure your npm scripts

```json
{
  "scripts": {
    "vue-global-type-gen": "vue-global-type-gen"
  }
}
```

# CLI Options

| option        | default    | description          |
| ------------- | ---------- | -------------------- |
| --config, -c  | vue-gt.yml | your config yml path |
| --version, -v | -          | print version        |

# Configuration

setting vue-gt.yml

```yml
# vue-gt.yml
# default
config:
  out: auto-import.d.ts
  includes: [components/**/*.vue, pages/**/*.vue]
  excludes: [node_modules]
```

# Example

https://user-images.githubusercontent.com/71201308/201339326-0833eaef-9623-4912-9dc5-fd0328e056c4.mov


