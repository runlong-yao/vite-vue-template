import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
const sessionId = "006B1300FEC60F8BEF6F8EDD01189B4E";
const cookie = `JSESSIONID=${sessionId}`;

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    proxy: {
      "/service": {
        target: "http://106.15.184.62:8083",
        changeOrigin: true,
        headers: {
          Cookie: cookie,
        },
      },
      // "/web": {
      //   target: "http://106.15.184.62:8083",
      //   changeOrigin: true,
      //   headers: {
      //     Cookie: cookie,
      //   },
      // },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss: { additionalData: ` @import "@/styles/global.scss"; ` },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // viteCommonjs(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: "less" })],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ["vue", "@vueuse/core", "vue-router"],
      eslintrc: {
        enabled: false, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dts: "./auto-imports.d.ts",
    }),
    viteCommonjs(),
    esbuildCommonjs(["@progress/kendo-ui/js/kendo.spreadsheet"]),
  ],
});

// your plugin installation
