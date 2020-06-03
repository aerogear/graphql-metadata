import { parseAnnotations, stripAnnotations, parseMarker } from '../../src/index'
import { GraphQLField, GraphQLString } from 'graphql'

test('parseAnnotations', () => {
  let result: any = parseAnnotations('db', `
    This is a description
    @db.length: 200
    @db.foo: 'bar'
    @db.unique
    @db.index: { name: 'foo', type: 'string' }
  `)
  expect(Object.keys(result).length).toBe(4)
  expect(result.length).toBe(200)
  expect(result.foo).toBe('bar')
  expect(result.unique).toBe(true)
  expect(result.index).toEqual({ name: 'foo', type: 'string' })

  result = parseAnnotations('db', `
  This is a description
  @db
  `)
  expect(result).toBeTruthy()
})

test('parseMarker tests', () => {
  let result: any = parseMarker('marker', `
    This is a description
    @marker`)
  expect(result).toBeTruthy()

  result = parseMarker('marker', undefined)
  expect(result).toEqual(undefined)

  result = parseMarker('marker', `
  This is a description
  @marker size:1, data:'test'`)
  expect(result.size).toEqual(1)
  expect(result.data).toEqual('test')

  result = parseMarker('marker', `
  This is a description
  @marker 1`)
  console.log(result)
  expect(result).toEqual(1)

  let testField: GraphQLField<any, any> = {
    name: 'testField',
    description: '@marker',
    type: GraphQLString,
    args: undefined,
    extensions: undefined,
    isDeprecated: false,
    deprecationReason: undefined
  }
  result = parseMarker('marker', testField)
  expect(result).toEqual(true)

  testField = {
    name: 'testField',
    description: undefined,
    type: GraphQLString,
    args: undefined,
    extensions: undefined,
    isDeprecated: false,
    deprecationReason: undefined
  }
  result = parseMarker('marker', testField)
  expect(result).toEqual(undefined)
})

test('stripAnnotations', () => {
  const result = stripAnnotations(`
    This is a description
    @db.length: 200
    @db.foo: 'bar'
    @db.unique
    @db.index: { name: 'foo', type: 'string' }
  `)
  expect(result).toBe(`
    This is a description
  `)
})
