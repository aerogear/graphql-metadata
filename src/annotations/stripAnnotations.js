/**
 * @param {string?} description
 */
module.exports = function (description) {
  if (description) {
    let lines = description.split('\n')
    lines = lines.filter(line => !line.trim().startsWith('@'))
    description = lines.join('\n')
  }
  return description
}
