module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.tsx?$',
  testEnvironment: 'jsdom',
  moduleFileExtensions: [
    'ts',
    'tsx',
    // moduleFileExtensions must include 'js'
    'js',
  ],
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
