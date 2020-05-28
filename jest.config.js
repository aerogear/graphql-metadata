
module.exports = {
  verbose: true,
  projects: ["<rootDir>/jest.config.js"],
  moduleDirectories: ["node_modules"],
  preset: "ts-jest",
  testRegex: '(/tests/.*)\\.(ts?)$'
}