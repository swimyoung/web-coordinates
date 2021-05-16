module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testURL: 'http://localhost',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.tsx?$',
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
