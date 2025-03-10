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
      "package-scoped-var-declarations.js",
      "tooltips.html",
      "lodashUtils.js",
      "tooltips.js",
    ].map((f) => `${distDir}/${f}`),
    "client"
  );
  api.export("Tooltips", "client");
});
