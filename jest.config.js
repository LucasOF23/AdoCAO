module.exports = {
    testEnvironment: 'node',
    preset: 'ts-jest',
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
      },
  };