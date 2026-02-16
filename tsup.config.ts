import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  exclude: ["src/__mocks__/**", "src/**/*.d.ts", "src/@types/**"],
  format: ["esm"],
  bundle: false,
  outDir: "dist",
  clean: true,
  sourcemap: true,
  outExtension: () => ({ js: ".js" }),
});
