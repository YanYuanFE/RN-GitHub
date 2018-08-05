/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use strict';var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};let calcTransformerOptions = (() => {var _ref = _asyncToGenerator(








  function* (
  entryFiles,
  bundler,
  deltaBundler,
  options)
  {var _bundler$getGlobalTra =



    bundler.getGlobalTransformOptions();const enableBabelRCLookup = _bundler$getGlobalTra.enableBabelRCLookup,projectRoot = _bundler$getGlobalTra.projectRoot;

    const transformOptionsForBlacklist = {
      assetDataPlugins: options.assetPlugins,
      customTransformOptions: options.customTransformOptions,
      enableBabelRCLookup,
      dev: options.dev,
      hot: options.hot,
      inlineRequires: false,
      isScript: options.type === 'script',
      minify: options.minify,
      platform: options.platform,
      projectRoot };


    // When we're processing scripts, we don't need to calculate any
    // inlineRequires information, since scripts by definition don't have
    // requires().
    if (options.type === 'script') {
      return _extends({},
      transformOptionsForBlacklist, {
        inlineRequires: false });

    }var _ref2 =

    yield bundler.getTransformOptionsForEntryFiles(
    entryFiles,
    { dev: options.dev, platform: options.platform }, (() => {var _ref3 = _asyncToGenerator(
      function* (path) {var _ref4 =
        yield deltaBundler.buildGraph([path], {
          resolve: yield getResolveDependencyFn(bundler, options.platform),
          transform: yield getTransformFn([path], bundler, deltaBundler, options),
          onProgress: null });const dependencies = _ref4.dependencies;


        return Array.from(dependencies.keys());
      });return function (_x5) {return _ref3.apply(this, arguments);};})());const inlineRequires = _ref2.inlineRequires;


    return _extends({},
    transformOptionsForBlacklist, {
      inlineRequires: inlineRequires || false });

  });return function calcTransformerOptions(_x, _x2, _x3, _x4) {return _ref.apply(this, arguments);};})();let getTransformFn = (() => {var _ref5 = _asyncToGenerator(












  function* (
  entryFiles,
  bundler,
  deltaBundler,
  options)
  {var _ref6 =
    yield calcTransformerOptions(
    entryFiles,
    bundler,
    deltaBundler,
    options);const inlineRequires = _ref6.inlineRequires,transformerOptions = _objectWithoutProperties(_ref6, ['inlineRequires']);


    return (() => {var _ref7 = _asyncToGenerator(function* (path) {
        return yield bundler.transformFile(path, _extends({},
        transformerOptions, {
          inlineRequires: removeInlineRequiresBlacklistFromOptions(
          path,
          inlineRequires) }));


      });return function (_x10) {return _ref7.apply(this, arguments);};})();
  });return function getTransformFn(_x6, _x7, _x8, _x9) {return _ref5.apply(this, arguments);};})();let getResolveDependencyFn = (() => {var _ref8 = _asyncToGenerator(

  function* (
  bundler,
  platform)
  {
    const dependencyGraph = yield bundler.getDependencyGraph();

    return function (from, to) {return (
        dependencyGraph.resolveDependency(from, to, platform));};
  });return function getResolveDependencyFn(_x11, _x12) {return _ref8.apply(this, arguments);};})();function _objectWithoutProperties(obj, keys) {var target = {};for (var i in obj) {if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];}return target;}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}function removeInlineRequiresBlacklistFromOptions(path, inlineRequires) {if (typeof inlineRequires === 'object') {return !(path in inlineRequires.blacklist);}return inlineRequires;}

module.exports = {
  calcTransformerOptions,
  getTransformFn,
  getResolveDependencyFn };