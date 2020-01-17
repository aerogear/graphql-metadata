const safeEval = require('safe-eval')

/**
 * @param {string} namespace
 * @param {string?} description
 * @returns {object}
 */
module.exports = function (namespace, description) {
  if (description) {
    const start = `@${namespace}`
    const lines = description.split('\n').map(line => line.trim())
      .filter(line => line.startsWith(start))
    return lines.reduce((obj, line) => {
      line = line.substr(start.length + 1)
      const separatorIndex = line.indexOf(':')
      if (separatorIndex === -1) {
        if (line) {
          obj[line] = true
        }
        obj = true
      } else {
        const name = line.substr(0, separatorIndex).trim()
        const value = line.substr(separatorIndex + 1).trim()
        try {
          obj[name] = safeEval(value)
        } catch (e) {
          console.error(`Can't parse annotation ${line}: ${e.message}`)
        }
      }
      return obj
    }, {})
  }
  return {}
}
