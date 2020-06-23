import { GraphQLField, GraphQLString } from 'graphql'
import { parseMetadata } from '../../src/index'

const setupField = (description: string): GraphQLField<any, any> => {
  return {
    name: 'testField',
    description,
    type: GraphQLString,
    args: undefined,
    extensions: undefined,
    isDeprecated: false,
    deprecationReason: undefined
  }
}

test('parse blank metadata', () => {
  const field = setupField(`This is a description
    @test
    This is another description`,)

  const result = parseMetadata('test', field)

  expect(result).toEqual(true)
})

test('return undefined when no metadata', () => {
  const field = setupField('This is a description')

  const result = parseMetadata('test', field)

  expect(result).toEqual(undefined)
})

test('validate invalid metadata', () => {
  const field = setupField(`This is a description
    @test here is some text that does not belong
  `)

  const result = parseMetadata('test', field)

  expect(result).toEqual(undefined)
})

test('successfully parse metadata', () => {
  const field = setupField(`This is a description
  @test(value: "This is a string value", config: {
    stringValue: "This is a string value",
    numberValue: 1,
    arrayValue: [1, 2, 3]
  })`)

  const result = parseMetadata('test', field)

  expect(result).toEqual({
    value: "This is a string value", config: {
      stringValue: "This is a string value",
      numberValue: 1,
      arrayValue: [1, 2, 3]
    }
  })
})

test('successfully parse metadata with spacing', () => {
  const field = setupField(`
  This is a description
  @test(value: "This is a string value")
    `)

  const result = parseMetadata('test', field)

  expect(result).toEqual({
    value: "This is a string value"
  })
})

test('fail to parse metadata with missing closing tag', () => {
  const field = setupField(`@invalid(reason: "This annotation is missing a closing tag"`)

  const result = parseMetadata('invalid', field)

  expect(result).toBeUndefined()
});

test('fail to parse metadata with an undefined value', () => {
  const field = setupField('@invalid(reason: undefinedVariable)')

  const result = parseMetadata('valid', field)

  expect(result).toBeUndefined()
});

test('parse metadata from string description', () => {
  const description = '@valid(reason: "This is a valid way to parse metadata")'

  const result = parseMetadata('valid', description)

  expect(result).toEqual({
    reason: 'This is a valid way to parse metadata'
  })
});

test('return undefined when no annotation found', () => {
  const result = parseMetadata('valid', '')

  expect(result).toBeUndefined()
});
