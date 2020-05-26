/**
 * @param {string?} description
 */
export function stripAnnotations(description: string) {
  if (description) {
    let lines = description.split('\n')
    lines = lines.filter(line => !line.trim().startsWith('@'))
    description = lines.join('\n')
  }
  return description
}
