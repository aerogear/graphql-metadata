import safeEval from 'safe-eval'
import { TypeDefinition } from 'src/definitions'

/**
 * Parse metadata annotations.
 *
 * Examples:
 *
 * ```
 * @metadata
 * @metadata(create:false, create: "test")
 * ``
 *
 * @param {string} name - The name of the metadata to be parsed
 * @param {TypeDefinition|string?} definition The GraphQL definition which has the metadata to be parsed
 * @returns {any|boolean}
 */
export function parseMetadata(name: string, definition: TypeDefinition): any | boolean {
  const description = definition.description

  if (description) {
    const start = `@${name}`

    let line = description.split('\n').map(line => line.trim())
      .find(line => line.startsWith(start))
    if (!line) {
      return undefined
    }
    line = line.substr(start.length).trim()
    if (line === '') {
      return true
    }

    const openingTag = '('
    const closingTag = ')'

    if (!line.startsWith(openingTag)) {
      console.error(`Can't parse "@${name} annotation on ${definition.name}: Expected opening tag "${openingTag}"`)
    }

    const startPosition = description.indexOf(line)
    const startContent = description.substring(startPosition + 1, description.length)
    const endPosition = startContent.indexOf(')')

    if (endPosition === -1) {
      console.error(`Can't parse "@${name} annotation: Expected closing tag "${closingTag}"`)

      return undefined
    }

    const metadataContent = startContent.substring(0, endPosition).trim()
    const enclosedContent = `{${metadataContent}}`

    let parsedContent: any;
    try {
      parsedContent = safeEval(enclosedContent)
    } catch (e) {
      console.error(`Can't parse "@${name}" annotation on ${definition.name}: ${e.message}`)
    }

    return parsedContent
  }

  return undefined
}
