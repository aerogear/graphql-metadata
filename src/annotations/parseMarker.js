const safeEval = require('safe-eval')

/**
 * Parse marker annotations.
 * Examples:
 * ```
 * @marker
 * @marker data
 * @marker create:false, create:"test"
 * ``
 *
 * @param {string} marker
 * @param {string?} description
 * @returns {object}
 */
module.exports = function (marker, description) {
  if (description) {
    const start = `@${marker}`
    const lines = description.split('\n').map(line => line.trim())
      .filter(line => line.startsWith(start))
    const resultObject = lines.reduce((obj, line) => {
      line = line.substr(start.length).trim()
      if (line === '') {
        obj = true
        return obj
      }
      const entries = line.split(',')

      for (const entry of entries) {
        const [key, value] = entry.split(':')
        if (key && value) {
          try {
            obj[key.trim()] = safeEval(value)
          } catch (e) {
            console.error(`Can't parse annotation ${line}: ${e.message}`)
          }
        } else if (key) {
          try {
            obj = safeEval(key)
          } catch (e) {
            console.error(`Can't parse annotation ${line}: ${e.message}`)
          }
        }
      }
      return obj
    }, {})

    if (Object.keys(resultObject).length === 0 && resultObject.constructor === Object) {
      return undefined
    }

    return resultObject
  }
  return undefined
}
