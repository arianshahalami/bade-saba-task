import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },

   css: {
      // preprocessorOptions: {
      //    scss: {
      //       additionalData: `@import "./src/styles/mixins/index.scss";`,
      //    },
      // },

      modules: {
         localsConvention: "camelCaseOnly",
      },
   },
   plugins: [react()],
});
