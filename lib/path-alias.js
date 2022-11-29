//@ts-check
"use strict";

/** @typedef {import("#~/index").TYPE_DEFAULT_OPTIONS} TYPE_DEFAULT_OPTIONS */
/** @type {TYPE_DEFAULT_OPTIONS} */
const DEFAULT_OPTIONS = {
  appRootPath: process.cwd(),
  config: "./package.json",
  propertyName: "imports",
};

/**
 * generator of pathAliases
 * @param {TYPE_DEFAULT_OPTIONS} [options]
 * @return aliases
 */
module.exports = (options = DEFAULT_OPTIONS) => {
  // node modules
  const nodePath = require("path");

  // custom modules
  const isString = require("./is-string");
  const resolve = require("./resolve");

  const pathAliases = {
    /** @type {object} */
    config: undefined,

    /** @type {TYPE_DEFAULT_OPTIONS} */
    options: DEFAULT_OPTIONS,

    /**
     * @param {TYPE_DEFAULT_OPTIONS} [options]
     */
    setConfig(options) {
      if (!options) {
        return;
      }

      options = {
        ...DEFAULT_OPTIONS,
        ...options,
      };

      pathAliases.options = options;

      let config = {};

      if (isString(options.config)) {
        // cast
        let path = /** @type {string} */ (options.config);

        if (!nodePath.isAbsolute(path)) {
          path = nodePath.join(options.appRootPath, path);
        }

        config = require(path);
      } else {
        config = options.config;
      }

      pathAliases.config = config;
    },

    /**
     * @param {string} [propertyName]
     * @return {object}
     */
    resolve(propertyName) {
      // cast
      let name = /** @type {string}*/ (pathAliases.options.propertyName);

      if (propertyName && isString(propertyName)) {
        name = propertyName;
      }

      let path = undefined;

      if (name && isString(name)) {
        if (pathAliases.config[name]) {
          path = pathAliases.config[name];
        }
      }

      if (!path) {
        path = pathAliases.config;
      }

      return resolve(options.appRootPath, path);
    },

    toJSON() {
      return JSON.parse(JSON.stringify(pathAliases.config));
    },
  };

  pathAliases.setConfig(options);

  return pathAliases;
};
