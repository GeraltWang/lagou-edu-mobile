module.exports = {
  productionSourceMap: false,
  css: {
    extract: false
  },
  chainWebpack: config => {
    // 图片压缩
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     bypassOnDebug: true
    //   })
    //   .end()
  }
}
