const path = require("path");

module.exports = {
  outputDir: 'lib',
  productionSourceMap: false,
  css:{
    sourceMap: false
  },
  devServer: {
    port: 20010,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  chainWebpack: config => {
    //svg
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "./packages/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
    const fileRule = config.module.rule("file");
    fileRule.uses.clear();
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, "./packages/icons"))
      .end()
      .use("file-loader")
      .loader("file-loader");
  }
};
