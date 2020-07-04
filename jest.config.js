module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testURL: 'http://localhost',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
