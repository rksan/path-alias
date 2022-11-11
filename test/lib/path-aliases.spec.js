//@ts-check
const { describe, it } = require("mocha");
const { assert } = require("chai");

const nodePath = require("path");
const appRootPath = require("app-root-path");
const CRF = require("node:path").relative(appRootPath.toString(), __filename);

describe(`test ${CRF}`, function () {
  describe("interface pathAliases", () => {
    const generator = require("#~/lib/path-aliases");

    it("const generator", () => {
      assert.isFunction(generator);
    });

    const pathAliases = generator();

    it("interface pathAliases", () => {
      assert.isObject(pathAliases);
    });

    it("property pathAliases.config", () => {
      assert.isObject(
        pathAliases.config,
        `aliases.config<${typeof pathAliases.config}>=${pathAliases.config}`
      );
    });

    it("property pathAliases.options", () => {
      assert.isObject(pathAliases.options);
    });

    it("function pathAliases.setConfig()", () => {
      assert.isFunction(pathAliases.setConfig);
    });

    it("function pathAliases.resolve()", () => {
      assert.isFunction(pathAliases.resolve);
    });

    it("function pathAliases.toJSON()", () => {
      assert.isFunction(pathAliases.toJSON);
    });
  });

  describe("default options", () => {
    const generator = require("#~/lib/path-aliases");

    const pathAliases = generator();

    it("run pathAliases.resolve()", () => {
      let config = pathAliases.resolve();
      assert.isObject(config, `config=${config}`);
    });

    it("fun pathAliases.resolve(`imports`)", () => {
      let imports = pathAliases.resolve("imports");
      assert.isObject(imports);
      Object.entries(imports).forEach(([key, value]) => {
        assert.equal(key, "#~/*");
        assert.equal(
          value[0],
          nodePath.join(String(pathAliases.options.appRootPath), "./*.js")
        );
      });
    });

    it("run pathAliases.toJSON()", () => {
      let json = pathAliases.toJSON();

      assert.isObject(json);
    });
  });

  describe("custom options", () => {
    const generator = require("#~/lib/path-aliases");

    const options = {
      appRootPath: appRootPath.toString(),
      config: "./test/test-config.json",
      propertyName: false,
    };

    const pathAliases = generator(options);

    it("interface pathAliases", () => {
      assert.isObject(pathAliases);
    });

    it("property pathAliases.options", () => {
      assert.equal(pathAliases.options.appRootPath, options.appRootPath);
      assert.equal(pathAliases.options.config, options.config);
      assert.equal(pathAliases.options.propertyName, options.propertyName);
    });

    it("run pathAliases.resolve()", () => {
      let config = pathAliases.resolve();

      assert.isObject(config);

      assert.equal(
        config["root"],
        nodePath.join(pathAliases.options.appRootPath, ".")
      );

      assert.equal(
        config["alias"]["@"],
        nodePath.join(pathAliases.options.appRootPath, "./src")
      );
    });

    it("run pathAliases.resolve(basePath)", () => {
      let basePath = appRootPath.toString();
      let config = pathAliases.resolve(basePath);

      assert.isObject(config);
      assert.equal(config["root"], nodePath.join(basePath, "."));
      assert.equal(config["alias"]["@"], nodePath.join(basePath, "./src"));
    });

    it("run pathAliases.toJSON()", () => {
      let config = pathAliases.toJSON();

      assert.isObject(config);
      assert.equal(config["root"], ".");
      assert.equal(config["alias"]["@"], "./src");
    });
  });

  describe("others", () => {
    const generator = require("#~/lib/path-aliases");

    const options = {
      appRootPath: appRootPath.toString(),
      config: "./test/test-config.json",
      propertyName: false,
    };

    const pathAliases = generator(options);

    it("run pathAliases.setConfig()", () => {
      pathAliases.setConfig();

      assert.equal(pathAliases.options.appRootPath, options.appRootPath);
      assert.equal(pathAliases.options.config, options.config);
      assert.equal(pathAliases.options.propertyName, options.propertyName);
    });

    it("run pathAliases.setConfig({config: {root, aliases}})", () => {
      pathAliases.setConfig({
        config: {
          root: ".",
          alias: {
            "@": "./src",
          },
        },
      });

      assert.equal(pathAliases.config["root"], ".");
      assert.equal(pathAliases.config["alias"]["@"], "./src");
    });

    it("run pathAliases.setConfig({config: {root, aliases}})", () => {
      pathAliases.setConfig({
        config: { root: ".", alias: { "@": "./src" } },
      });

      assert.equal(pathAliases.config["root"], ".");
      assert.equal(pathAliases.config["alias"]["@"], "./src");
    });

    it("run pathAliases.setConfig({config:'absolute path'})", () => {
      let basePath = appRootPath.toString();

      pathAliases.setConfig({
        appRootPath: basePath,
        config: nodePath.join(basePath, "./test/test-config.json"),
        propertyName: false,
      });

      assert.equal(pathAliases.config["root"], ".");
      assert.equal(pathAliases.config["alias"]["@"], "./src");
    });
  });
});
