module.exports = {
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/node_modules/**',
    '!**/src/examples/**',
    '!**/src/__tests__/**',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/*spec.ts?(x)'],
  verbose: true,
};
