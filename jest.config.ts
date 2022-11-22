import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  setupFiles: ['dotenv/config'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
    'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs',
  },
};
export default config;
