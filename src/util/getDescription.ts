import { TypeOrDescription, Maybe } from '../definitions'

/**
 * Helper to extract the description value from a possible GraphQL type
 *
 * @param definition GraphQL type or string description
 */
export function getDescription(definition: Maybe<TypeOrDescription>): string | undefined {
  let description: string;
  if (!definition) {
    return undefined
  } else if (typeof definition === "string") {
    description = definition;
  } else {
    description = definition.description
  }

  return description
}
