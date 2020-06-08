import safeEval from 'safe-eval'


/**
 * Parse annotations
 * Examples:
 * ```
 * @marker.test: 10
 * ``
 *
 * @param {string} namespace
 * @param {string?} description
 * @returns object or undefined if description is not found
 * @deprecated This method is deprecated and will be removed in a future release. Please use `parseMetadata`. See https://github.com/aerogear/graphql-metadata#metadata-parsing
 */
export function parseAnnotations (namespace: string, description: string) {
  if (description) {
    const start = `@${namespace}`
    const lines = description.split('\n').map(line => line.trim())
      .filter(line => line.startsWith(start))
    const result = lines.reduce((obj, line) => {
      line = line.substr(start.length + 1)
      const separatorIndex = line.indexOf(':')
      if (separatorIndex === -1) {
        if (line) {
          obj[line] = true
        } else {
          obj = true
        }
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

    return result
  }
  return {}
}
