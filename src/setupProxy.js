const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/issuemoa", {
      target: "http://localhost:8000",
      pathRewrite: {
        '^/issuemoa': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/googleapisYoutube", {
      target: "https://www.googleapis.com/youtube/v3/videos",
      changeOrigin: true,
      pathRewrite: {
        '^/googleapisYoutube': "",
      }
    })
  );
  app.use(
    createProxyMiddleware("/krxStock", {
      target: "http://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo",
      changeOrigin: true,
      pathRewrite: {
        '^/krxStock': "",
      }
    })
  );
};