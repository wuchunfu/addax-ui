const path = require('path')
// const PurifyCSSPlugin = require('purifycss-webpack')
// const glob = require('glob-all')

function resolveRealPath (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //  "baseUrl" option in vue.config.js is deprecated now, please use "publicPath" instead.
  publicPath: '',
  productionSourceMap: false,
  outputDir: process.env.outputDir,
  devServer: {
    //http://10.60.171.33:9080 http://10.60.171.31:8080
    // proxy: 'http://10.60.172.165:9091'
    proxy: {
      '/api': {
        target: 'http://10.60.171.199:9080/zeus',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }

  },
  // 以下是pwa配置
  pwa         : {
    iconPaths: {
      favicon32     : 'favicon.ico',
      favicon16     : 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon      : 'favicon.ico',
      msTileImage   : 'favicon.ico'
    }
  },

  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        additionalData: `@import "@/assets/sass/_variables.sass", "@/assets/sass/_mixins.sass", "@/assets/sass/_extends.sass"`
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      // .set('vue$', 'vue/dist/vue.esm.js')
      .set('@utils', resolveRealPath('src/utils'))
      .set('@views', resolveRealPath('src/views'))
      .set('@assets', resolveRealPath('src/assets'))
      .set('@styles', resolveRealPath('src/assets/sass'))
      .set('@img', resolveRealPath('src/assets/images'))
      .set('@components', resolveRealPath('src/components'))
  },
  configureWebpack: config => {
    // config.plugins.push(new PurifyCSSPlugin({
    //   paths: glob.sync([
    //     path.join(__dirname, './src/index.html'),
    //     path.join(__dirname, './**/*.vue'),
    //     path.join(__dirname, './src/**/*.js')
    //   ])
    // }))
  }
}
