//@ts-check
const { describe, it } = require("mocha");
const { assert } = require("chai");

const nodePath = require("path");
const appRootPath = require("app-root-path");

const CRF = nodePath.relative(appRootPath.toString(), __filename);

describe(`test ${CRF}`, function () {
  describe("default options", () => {
    const pathAliases = require("#~/index");

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

    it("run pathAliases.resolve()", () => {
      let config = pathAliases.resolve();
      assert.isObject(config, `config=${config}`);
    });

    it("run pathAliases.resolve(`imports`)", () => {
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
  });

  describe("custom options", () => {
    const pathAliases = require("#~/index");

    it("run pathAliases.setConfig()", () => {
      let options = {
        appRootPath: appRootPath.toString(),
        config: "./test/test-config.json",
        propertyName: false,
      };

      pathAliases.setConfig(options);

      assert.equal(pathAliases.options.appRootPath, options.appRootPath);
      assert.equal(pathAliases.options.config, options.config);
      assert.equal(pathAliases.options.propertyName, options.propertyName);
    });

    it("run pathAliases.resolve()", () => {
      let config = pathAliases.resolve();

      assert.equal(
        config["root"],
        nodePath.join(pathAliases.options.appRootPath, ".")
      );

      assert.equal(
        config["alias"]["@"],
        nodePath.join(pathAliases.options.appRootPath, "./src")
      );
    });
  });
});
