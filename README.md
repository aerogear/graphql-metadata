# graphql-annotations

[![circleci](https://img.shields.io/circleci/project/github/Akryum/graphql-annotations/master.svg)](https://circleci.com/gh/Akryum/graphql-annotations)

Annotate a GraphQL schema

<p align="center">
  <a href="https://www.patreon.com/akryum" target="_blank">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patreon">
  </a>
</p>

## Sponsors

### Silver

<p align="center">
  <a href="https://vueschool.io/" target="_blank">
    <img src="https://vueschool.io/img/logo/vueschool_logo_multicolor.svg" alt="VueSchool logo" width="200px">
  </a>

  <a href="https://www.vuemastery.com/" target="_blank">
    <img src="https://cdn.discordapp.com/attachments/258614093362102272/557267759130607630/Vue-Mastery-Big.png" alt="Vue Mastery logo" width="200px">
  </a>
</p>

### Bronze

<p align="center">
  <a href="https://vuetifyjs.com" target="_blank">
    <img src="https://cdn.discordapp.com/attachments/537832759985700914/537832771691872267/Horizontal_Logo_-_Dark.png" width="100">
  </a>

  <a href="https://www.frontenddeveloperlove.com/" target="_blank" title="Frontend Developer Love">
    <img src="https://cdn.discordapp.com/attachments/258614093362102272/557267744249085953/frontend_love-logo.png" width="56">
  </a>
</p>

## Installation

```bash
npm i graphql-annotations
```

## Usage

### Annotations parsing

Here is a very basic example with a `namespace` (here `'db'`) and a `description` that needs to be parsed:

```js
const { parseAnnotations } = require('graphql-annotations')

const result = parseAnnotations('db', `
  This is a description
  @db.length: 200
  @db.foo: 'bar'
  @db.unique
  @db.index: { name: 'foo', type: 'string' }
`)

console.log(result)
```

This will output an object containing the annotations:

```js
{
  length: 200,
  foo: 'bar',
  unique: true,
  index: { name: 'foo', type: 'string' }
}
```

In a GraphQL schema, you can use the `description` property on `GraphQLObjectType`, `GraphQLField`...

```js
const { parseAnnotations } = require('graphql-annotations')
const { buildSchema, isObjectType } = require('graphql')

const schema = buildSchema(`
  """
  @db.table: 'users'
  """
  type User {
    """
    @db.primary
    """
    id: ID!
  }
`)

const typeMap = schema.getTypeMap()
for (const key in typeMap) {
  const type = typeMap[key]
  // Tables
  if (isObjectType(type)) {
    const typeAnnotations = parseAnnotations('db', type.description)
    console.log(type.name, typeAnnotations)
    const fields = type.getFields()
    for (const key in fields) {
      const field = fields[key]
      const fieldAnnotations = parseAnnotations('db', field.description)
      console.log(field.name, fieldAnnotations)
    }
  }
}
```

Which will output:

```js
User { table: 'users' }
id { primary: true }
```

### Strip annotations

Sometimes it will be helpful to strip the annotations from the description. For example, you may not want to display them in a GraphQL schema explorer.

```js
const { stripAnnotations } = require('graphql-annotations')

const result = stripAnnotations('db', `
  This is a description
  @db.length: 200
  @db.foo: 'bar'
  @db.unique
  @db.index: { name: 'foo', type: 'string' }
`)

console.log(result)
```

The result will be:

```js
`
  This is a description
`
```
