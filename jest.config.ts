import nextJest from "next/jest";
import type { Config } from "@jest/types";

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig: Config.InitialOptions = {
  setupFilesAfterEnv: ["<rootDir>/__tests__/setupTests.tsx"], // sesuaikan lokasi setupTests
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/context/(.*)$": "<rootDir>/src/context/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/(.*)$": "<rootDir>/src/$1", // fallback untuk semua alias
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default createJestConfig(customJestConfig);
