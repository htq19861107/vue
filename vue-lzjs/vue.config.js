const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack");
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: { "crypto": require.resolve("crypto-browserify"), "path": require.resolve("path-browserify"), "stream": require.resolve("stream-browserify"), "assert": require.resolve("assert/"), "constants": require.resolve("constants-browserify"), "fs": false },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"]
      })
    ]
  },

}
)


