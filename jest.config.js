module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/dist/',
    '/package/'
  ],
  setupFilesAfterEnv: [],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json'
    }
  }
};
