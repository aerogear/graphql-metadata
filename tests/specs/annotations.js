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

// test('parseMarker tests', () => {
//   let result = parseMarker('marker', `
//     This is a description
//     @marker`)
//   expect(Object.keys(result).length).toBe(1)
//   console.log(result)

//   result = parseMarker('marker', `
//   This is a description
//   @marker 'value'`)

//   result = parseMarker('marker', `
//   This is a description
//   @marker [1,4,5]`)

// })

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
