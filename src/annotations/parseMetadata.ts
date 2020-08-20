import { safeEvaluate }  from '../util/safe-evaluate'
import { TypeOrDescription, Maybe } from '../definitions'
import { getDescription } from '../util/getDescription'

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
 * @param {TypeOrDescriptionDefinition|string} definition The GraphQL definition which has the metadata to be parsed
 * @returns {any|boolean}
 */
export function parseMetadata(name: string, definition: Maybe<TypeOrDescription>): any | boolean {
  const description = getDescription(definition)

  if (!description) {
    return undefined
  }

  if (description) {
    const annotation = `@${name}`;
    const regex = new RegExp(`${annotation}\\s*\\(.*\\)?$`);
    const lines = description.split('\n');
    let line: string;

    for (const rawLine of lines) {
      const trimmed = rawLine.trim();
      if (!trimmed.length) {
        continue;
      }

      if (annotation === trimmed || regex.test(trimmed)) {
        line = trimmed;
        break;
      }
    }

    if (!line) {
      return undefined
    }

    line = line.substr(annotation.length).trim()
    if (line === '') {
      return true
    }

    const openingTag = '('
    const closingTag = ')'

    const maybeOwner = typeof definition === 'string' ? '' : ` on ${definition.name}`
    if (!line.startsWith(openingTag)) {
      console.error(`Can't parse "@${name} annotation${maybeOwner}: Expected opening tag "${openingTag}"`)
    }

    const startPosition = description.indexOf(line)
    const startContent = description.substring(startPosition + 1, description.length)
    const endPosition = startContent.indexOf(')')

    if (endPosition === -1) {
      console.error(`Can't parse "@${name} annotation${maybeOwner}: Expected closing tag "${closingTag}"`)

      return undefined
    }

    const metadataContent = startContent.substring(0, endPosition).trim()
    const enclosedContent = `{${metadataContent}}`

    let parsedContent: any;
    try {
      parsedContent = safeEvaluate(enclosedContent)
    } catch (e) {
      console.error(`Can't parse "@${name}" annotation${maybeOwner}: ${e.message}`)
    }

    return parsedContent
  }

  return undefined
}
