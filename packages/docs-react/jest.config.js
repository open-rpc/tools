/** @type {import('jest').Config} */
export default {
  "clearMocks": true,
  "coverageDirectory": "../coverage",
  "resetMocks": true,
  "restoreMocks": true,
  "rootDir": "./src",
  "testEnvironment": "jsdom",
  "testPathIgnorePatterns": ["./build"],
  "transform": {
    "^.+\\.(t|j)sx?$": ["ts-jest", {
      useESM: true,
      tsconfig: {
        allowJs: true
      }
    }]
  },
  "extensionsToTreatAsEsm": [".ts", ".tsx", ".jsx"],
  "moduleNameMapper": {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(react-markdown|@react-markdown|@testing-library|/aria-query/|jest-circus|jest-environment-jsdom))/",
    "react-markdown"
  ],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts']
};
