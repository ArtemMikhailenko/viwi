// remix.config.cjs
module.exports = {
  serverBuildTarget: "netlify",
    assetsBuildDirectory: "public",
  publicPath: "/",
  serverBuildTarget: "static",
  // не нужно явно указывать routes(), Remix сам найдёт app/routes
};
