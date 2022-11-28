//@ts-check
const { describe, it } = require("mocha");
const { assert } = require("chai");

const nodePath = require("path");
const appRootPath = require("app-root-path");

const CRF = nodePath.relative(appRootPath.toString(), __filename);

describe(`test ${CRF}`, function () {
  describe("./resolve.js", () => {
    // const config = require("../../lib/path-aliases");
    const resolve = require("#~/lib/resolve");

    it("const resolve", () => {
      assert.isFunction(resolve);
    });

    const basePath = appRootPath.toString();

    it("resolve(basePath, <string>)", () => {
      let val = resolve(basePath, "./");
      assert.isString(val);
    });

    it("resolve(basePath, <string[]>)", () => {
      let val = resolve(basePath, ["./", "./src"]);
      assert.isArray(val);
      assert.equal(val[0], nodePath.join(basePath, "./"));
      assert.equal(val[1], nodePath.join(basePath, "./src"));
    });

    it("resolve(basePath, <{name: string}>)", () => {
      let val = resolve(basePath, { "#~/*": "./*" });
      assert.isObject(val);
      assert.equal(val["#~/*"], nodePath.join(basePath, "./*"));
    });

    it("resolve(basePath, <{name: string[]}>)", () => {
      let val = resolve(basePath, { "#~/*": ["./*", "./lib/*"] });
      assert.isObject(val);
      assert.equal(val["#~/*"][0], nodePath.join(basePath, "./*"));
      assert.equal(val["#~/*"][1], nodePath.join(basePath, "./lib/*"));
    });

    it("resolve(basePath, <{name: {sub: string | string[]}>)", () => {
      let val = resolve(basePath, {
        "#~/*": { "~": ["./*", "./lib/*"], "@": "./src/*" },
      });
      assert.isObject(val);
      assert.equal(val["#~/*"]["~"][0], nodePath.join(basePath, "./*"));
      assert.equal(val["#~/*"]["~"][1], nodePath.join(basePath, "./lib/*"));
      assert.equal(val["#~/*"]["@"], nodePath.join(basePath, "./src/*"));
    });
  });
});
