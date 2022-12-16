
module.exports = {
  testPathIgnorePatterns: [
    "/node_modules",
    "/android",
    "/ios",
  ],
  preset: "jest-expo",
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components"
  ],
  setupFiles: ["./jestSetupFile.js"],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx', '!src/**/*.spec.tsx'],
  coverageReporters: ['lcov']
}