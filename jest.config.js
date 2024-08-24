/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": ["ts-jest", {}],
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  roots: ["<rootDir>/tests"],
};
