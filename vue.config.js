const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  port: 8081
}),
module.exports = {
  devServer: {
    port: 8081
  }
}
