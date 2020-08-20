/**
 * @param {string?} description
 */
export function stripAnnotations(description: string) {
  if (!description) {
    return description;
  }

  return description.split('\n')
  .filter(line => !line.trim().startsWith('@'))
  .join('\n')
}
