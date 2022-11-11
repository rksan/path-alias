//@ts-check
"use strict";

//node modules
const nodePath = require("path");

//custom modules
const isString = require("./is-string");

/**
 * @param {string} basePath
 * @param {string} path
 * @return {string}
 */
function resolveString(basePath, path) {
  return nodePath.join(basePath, path);
}

/**
 * @param {string} basePath
 * @param {string[]} path
 * @return {string[]}
 */
function resolveArray(basePath, path) {
  return path.map((entry) => {
    return resolve(basePath, entry);
  });
}

/**
 * @param {string} basePath
 * @param {object} path
 * @return {object}
 */
function resolveObject(basePath, path) {
  let val = {};

  Object.entries(path).forEach(([key, value]) => {
    val = { ...val, [key]: resolve(basePath, value) };
  });

  return val;
}

/**
 * @param {string} basePath
 * @param {string | string[] | object} path
 * @return {string | string[] | object}
 */
function resolve(basePath, path) {
  if (Array.isArray(path)) {
    return resolveArray(basePath, path);
  } else if (isString(path)) {
    return resolveString(basePath, path);
  } else {
    return resolveObject(basePath, path);
  }
}

module.exports = resolve;
