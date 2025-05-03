// remix.config.cjs
module.exports = {
  // не указываем `appDirectory` — по умолчанию это папка "app"
  assetsBuildDirectory: "public",
  publicPath: "/",
  serverBuildTarget: "static",
  // не нужно явно указывать routes(), Remix сам найдёт app/routes
};
