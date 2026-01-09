import { defineConfig } from "vite";
import { terser } from "rollup-plugin-terser";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "HealthsyncFitnessCards",
      fileName: () => "fitness-cards.js",
      formats: ["es"]
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      },
      plugins: [terser()]
    }
  }
});
