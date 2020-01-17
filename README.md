# graphql-metadata

Attach metadata to your GraphQL schema

## Installation

```bash
npm i graphql-metadata
```

## Usage

### Annotations parsing

Here is a very basic example with a `namespace` (here `'db'`) and a `description` that needs to be parsed:

```js
const { parseAnnotations } = require('graphql-metadata')

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
const { parseAnnotations } = require('graphql-metadata')
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
const { stripAnnotations } = require('graphql-metadata')

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

## Relation to GraphQL-Annotations

> NOTE: This package is an customized version of 
https://github.com/Akryum/graphql-annotations
If you like it please consider donating to Akryum patreon

<p align="center">
  <a href="https://www.patreon.com/akryum" target="_blank">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patreon">
  </a>
</p>
