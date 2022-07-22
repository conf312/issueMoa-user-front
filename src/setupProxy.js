const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    "/issuemoa",
    createProxyMiddleware({
      target: "http://localhost:8000",
      pathRewrite: {
        '^/issuemoa': '',
      }
    }),
  );
};