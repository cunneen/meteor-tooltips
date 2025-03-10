Package.describe({
  name: "cunneen:tooltips",
  summary: "Reactive tooltips, no coffee required.",
  version: "1.0.0",
  git: "https://github.com/cunneen/meteor-tooltips.git",
});

Package.onUse(function (api) {
  api.use(
    ["ecmascript@0.0.0", 
      "reactive-var@1.0.0", 
      "jquery@1.0.0 || 3.0.0", 
      "templating@1.0.0", 
      "tracker@1.0.0"],
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
