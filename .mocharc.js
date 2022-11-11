"use strict";

/**
 * local config
 * @see https://github.com/mochajs/mocha/blob/master/example/config/.mocharc.js
 */

module.exports = {
  extension: ["js", "cjs", "mjs"],
  package: "./package.json",
  reporter: "spec",
  spec: [
    `${__dirname}/test/!(_)*.spec.js`,
    `${__dirname}/test/!(_)*/!(_)*.spec.js`,
  ], // the positional arguments!,
};
