/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^\\.\\./generated/prisma/client\\.js$":
      "<rootDir>/src/__mocks__/prisma-client.ts",
    "^\\./config/swagger\\.js$": "<rootDir>/src/__mocks__/swagger.ts",
    "^\\.\\./env\\.js$": "<rootDir>/src/env.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^\\./(middlewares|routes|config|database|controllers|utils)/(.*)\\.js$":
      "<rootDir>/src/$1/$2",
    "^\\./(sessionsRoutes|userRoutes|deliveryRoutes|delivery-logs-routes|index)\\.js$":
      "<rootDir>/src/routes/$1",
    "^\\.\\./(utils|middlewares|routes|config|database|controllers|generated)/(.*)\\.js$":
      "<rootDir>/src/$1/$2",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          module: "commonjs",
          moduleResolution: "node",
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },
  testMatch: ["<rootDir>/tests/**/*.test.ts", "<rootDir>/src/**/*.test.ts"],
  setupFiles: ["<rootDir>/tests/setup.js"],
};
