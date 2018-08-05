/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+javascript_foundation
 * @format
 */

'use strict';let getTransformOptions = (() => {var _ref = _asyncToGenerator(





  function* () {
    const bundler = {
      getGlobalTransformOptions() {
        return {
          enableBabelRCLookup: true,
          projectRoot: '/root' };

      },
      getTransformOptionsForEntryFiles() {return _asyncToGenerator(function* () {
          return {
            inlineRequires: true };})();

      } };


    return yield transformHelpers.calcTransformerOptions(
    [],
    bundler,
    {},
    {
      assetPlugins: [],
      dev: true,
      entryPoints: [],
      hot: true,
      minify: false,
      platform: 'ios',
      type: 'module' });


  });return function getTransformOptions() {return _ref.apply(this, arguments);};})();function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}const transformHelpers = require('../lib/transformHelpers');

module.exports = getTransformOptions;