const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
       fallback: { "crypto": require.resolve("crypto-browserify")  ,"path": require.resolve("path-browserify"),"stream": require.resolve("stream-browserify") ,"assert": require.resolve("assert/"),"constants": require.resolve("constants-browserify"),"fs": false},
        // fallback: {
        //     "fs": false
        // },
    },
  }
}
)


