const { parseAnnotations, stripAnnotations, parseMarker } = require('../../src/index')

test('parseAnnotations', () => {
  let result = parseAnnotations('db', `
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
  let result = parseMarker('marker', `
    This is a description
    @marker`)
  expect(result).toBeTruthy()

  result = parseMarker('marker', `
  This is a description
  @marker size:1, data:'test'`)
  console.log(result)
  expect(result.size).toEqual(1)
  expect(result.data).toEqual('test')
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
