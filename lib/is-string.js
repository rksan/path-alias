//@ts-check
"use strict";

//node modules
const nodeTypes = require("util/types");

function isString(val) {
  return typeof val === "string" || nodeTypes.isStringObject(val);
}

module.exports = isString;
