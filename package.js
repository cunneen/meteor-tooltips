Package.describe({
  name: 'lookback:tooltips',
  summary: "Reactive tooltips, no coffee required.",
  version: "1.0.0",
  git: "https://github.com/cunneen/meteor-tooltips.git",
});

Package.onUse(function (api) {
  api.use(
    ["ecmascript", "reactive-var", "jquery", "templating", "tracker"],
    "client"
  );
  const distDir = "dist";
  api.addFiles(
    [
      "tooltips.html",
      "lodashUtils.js",
    ].map((f) => `${distDir}/${f}`),
    "client"
  );
  api.mainModule(`${distDir}/tooltips.js`, "client");
});
