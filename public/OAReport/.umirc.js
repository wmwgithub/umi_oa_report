
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      routes: [
        { path: '/', component: '../pages/index' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'oa-report-umi',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  ssr: {
    // https://github.com/liady/webpack-node-externals#optionswhitelist-
    externalWhitelist: [],
    // 客户端资源 manifest 文件名，默认是 ssr-client-mainifest.json
    manifestFileName: 'ssr-client-mainifest.json',
  },
  proxy: {
    "/api/*": {
      "target": "http://oadev.vip.qydev.com",
      "secure": false,
      "changeOrigin": true
    }
  },
  extraBabelPlugins: [
    "babel-plugin-styled-components"
  ],
}
