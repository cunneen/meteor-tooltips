const fs = Npm.require("fs");
const path = Npm.require("path");

// try to obtain package metadata from package.json ; it's much easier to manage the version number this way
// TODO: try to find a better way to obtain package metadata from package.json ; currently relying on a non-public _packageSource
const packageJSON = JSON.parse(fs.readFileSync(path.join(Package._packageSource.sourceRoot, "package.json")));

const { description, version, repository } = packageJSON;
Package.describe({
  name: "cunneen:tooltips",
  summary: description || "Reactive tooltips, no coffee required.",
  version: version || "1.0.1",
  git: repository || "https://github.com/cunneen/meteor-tooltips.git",
});

Package.onUse(function (api) {
  api.use(
    [
      "ecmascript@0.0.0",
      "reactive-var@1.0.0",
      "jquery@1.0.0 || 3.0.0",
      "templating@1.0.0",
      "tracker@1.0.0",
    ],
    "client"
  );
  const distDir = "dist";

  api.addFiles(
    ["tooltips.html", "lodashUtils.js"].map((f) => `${distDir}/${f}`),
    "client"
  );
  api.mainModule(`${distDir}/tooltips.js`, "client");
});
