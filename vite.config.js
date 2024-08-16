import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 按需导入
    AutoImport({
        // targets to transform
        include: [
            /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            /\.vue$/,
            /\.vue\?vue/, // .vue
            /\.md$/ // .md
        ],

        // global imports to register
        imports: ['vue', 'vue-router'],

        // Filepath to generate corresponding .d.ts file.
        // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
        // Set `false` to disable.
        dts: './auto-imports.d.ts',

        // Inject the imports at the end of other imports
        injectAtEnd: true,

        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
            enabled: true, // Default `false`
            filepath: './.eslintrc-auto-import.json' // Default `./.eslintrc-auto-import.json`
        }
    })
  ],
  // 别名
  resolve: {
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
      rollupOptions: {
          external: ["vue","file-saver","html2canvas","jspdf"],
          output: {
              globals: {
                  vue: "Vue"
              }
          }
      },
      minify: false, // 可以指定压缩工具terser
      sourcemap: true, // 是否生成 sourcemap 文件
      cssCodeSplit: true, // css 代码分割
      lib: {
          entry: "./src/index.ts",
          name: "PrintPage",
          // fileName: "vue3ui",
          formats: ["es", "umd", "iife"] // 输出常用的三种模块类型
      }
  },
  // pages: {
  //   index: {
  //     entry: 'examples/main.ts',
  //     // 模板来源
  //     template: 'index.html',
  //     // 输出文件名
  //     filename: 'index.html'
  //   }
  // }
})
