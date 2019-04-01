/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 * @format
 */
"use strict";

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];
    return arr2;
  }
}

function getPreludeCode(_ref) {
  let extraVars = _ref.extraVars,
    isDev = _ref.isDev;

  const vars = _toConsumableArray(formatExtraVars(extraVars)).concat([
    `__DEV__=${String(isDev)}`,
    "__BUNDLE_START_TIME__=this.nativePerformanceNow?nativePerformanceNow():Date.now()",
    "process=this.process||{}"
  ]);

  return `var ${vars.join(",")};${processEnv(
    isDev ? "development" : "production"
  )}`;
}

function formatExtraVars(extraVars) {
  const assignments = [];

  for (const key in extraVars) {
    assignments.push(`${key}=${JSON.stringify(extraVars[key])}`);
  }

  return assignments;
}

function processEnv(nodeEnv) {
  return `process.env=process.env||{};process.env.NODE_ENV=${JSON.stringify(
    nodeEnv
  )};`;
}

module.exports = getPreludeCode;
