const { parseAnnotations } = require('../..')

test('parseAnnotations', () => {
  const result = parseAnnotations('db', `
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
})
