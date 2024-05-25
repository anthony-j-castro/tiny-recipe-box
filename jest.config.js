const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: [compilerOptions.baseUrl],
  preset: "ts-jest",
  roots: ["<rootDir>"],
  setupFiles: ["dotenv/config"],
  testEnvironment: "node",
};
