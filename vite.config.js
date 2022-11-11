const Path = require('path');
const vuePlugin = require('@vitejs/plugin-vue')

const { defineConfig } = require('vite');

/**
 * https://vitejs.dev/config
 */
const config = defineConfig({
  root: Path.join(__dirname, 'src', 'renderer'),
  server: {
    port: 8080,
  },
  open: false,
  build: {
    outDir: Path.join(__dirname, 'build', 'renderer'),
    emptyOutDir: true,
  },
  plugins: [vuePlugin()],
  resolve: {
    alias: {
      '@': Path.resolve(__dirname, './src/renderer'),
      '@img': Path.resolve(__dirname, './src/renderer/assets/image')
    }
  }
});

module.exports = config;
