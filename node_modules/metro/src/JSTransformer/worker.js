/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use strict';let transformCode = (() => {var _ref = _asyncToGenerator(















































































































  function* (
  filename,
  localPath,
  transformerPath,
  options,
  assetExts,
  assetRegistryPath,
  minifierPath,
  asyncRequireModulePath,
  dynamicDepsInPackages)
  {
    const transformFileStartLogEntry = {
      action_name: 'Transforming file',
      action_phase: 'start',
      file_name: filename,
      log_entry_label: 'Transforming file',
      start_timestamp: process.hrtime() };


    const data = fs.readFileSync(filename);
    const sourceCode = data.toString('utf8');
    let type = 'js/module';

    const sha1 = crypto.
    createHash('sha1').
    update(data).
    digest('hex');

    if (filename.endsWith('.json')) {
      let code = JsFileWrapping.wrapJson(sourceCode);
      let map = [];

      const transformFileEndLogEntry = getEndLogEntry(
      transformFileStartLogEntry,
      filename);


      if (options.minify) {var _ref2 =
        yield minifyCode(
        filename,
        code,
        sourceCode,
        map,
        minifierPath);map = _ref2.map;code = _ref2.code;

      }

      return {
        result: { dependencies: [], output: [{ data: { code, map }, type }] },
        sha1,
        transformFileStartLogEntry,
        transformFileEndLogEntry };

    }

    const plugins = options.dev ?
    [] :
    [[inlinePlugin, options], [constantFoldingPlugin, options]];

    // $FlowFixMe TODO t26372934 Plugin system
    const transformer = require(transformerPath);

    const transformerArgs = {
      filename,
      localPath,
      options,
      plugins,
      src: sourceCode };


    if (isAsset(filename, assetExts)) {
      type = 'js/module/asset';
    }

    const transformResult =
    type === 'js/module/asset' ?
    yield assetTransformer.transform(
    transformerArgs,
    assetRegistryPath,
    options.assetDataPlugins) :

    yield transformer.transform(transformerArgs);

    // Transformers can ouptut null ASTs (if they ignore the file). In that case
    // we need to parse the module source code to get their AST.
    const ast =
    transformResult.ast || babylon.parse(sourceCode, { sourceType: 'module' });

    const transformFileEndLogEntry = getEndLogEntry(
    transformFileStartLogEntry,
    filename);


    let dependencies, wrappedAst;

    // If the module to transform is a script (meaning that is not part of the
    // dependency graph and it code will just be prepended to the bundle modules),
    // we need to wrap it differently than a commonJS module (also, scripts do
    // not have dependencies).
    if (options.isScript) {
      dependencies = [];
      wrappedAst = JsFileWrapping.wrapPolyfill(ast);

      type = 'js/script';
    } else {
      let dependencyMapName;
      try {
        const opts = {
          asyncRequireModulePath,
          dynamicRequires: getDynamicDepsBehavior(
          dynamicDepsInPackages,
          filename) };var _collectDependencies =


        collectDependencies(ast, opts);dependencies = _collectDependencies.dependencies;dependencyMapName = _collectDependencies.dependencyMapName;
      } catch (error) {
        if (error instanceof collectDependencies.InvalidRequireCallError) {
          throw new InvalidRequireCallError(error, filename);
        }
        throw error;
      }

      const wrapped = JsFileWrapping.wrapModule(ast, dependencyMapName);

      wrappedAst = wrapped.ast;

      if (!options.dev) {
        dependencies = optimizeDependencies(
        wrappedAst,
        dependencies,
        dependencyMapName,
        wrapped.requireName);

      }
    }

    const result = generate(
    wrappedAst,
    {
      code: false,
      comments: false,
      compact: false,
      filename: localPath,
      retainLines: false,
      sourceFileName: filename,
      sourceMaps: true },

    sourceCode);


    let map = result.rawMappings ? result.rawMappings.map(toSegmentTuple) : [];
    let code = result.code;

    if (options.minify) {var _ref3 =
      yield minifyCode(
      filename,
      result.code,
      sourceCode,
      map,
      minifierPath);map = _ref3.map;code = _ref3.code;

    }

    return {
      result: { dependencies, output: [{ data: { code, map }, type }] },
      sha1,
      transformFileStartLogEntry,
      transformFileEndLogEntry };

  });return function transformCode(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9) {return _ref.apply(this, arguments);};})();let minifyCode = (() => {var _ref4 = _asyncToGenerator(

  function* (
  filename,
  code,
  source,
  map,
  minifierPath)



  {
    const sourceMap = fromRawMappings([
    { code, source, map, path: filename }]).
    toMap(undefined, {});

    const minify = getMinifier(minifierPath);

    try {
      const minified = minify.withSourceMap(code, sourceMap, filename);

      return {
        code: minified.code,
        map: minified.map ?
        toBabelSegments(minified.map).map(toSegmentTuple) :
        [] };

    } catch (error) {
      if (error.constructor.name === 'JS_Parse_Error') {
        throw new Error(
        `${error.message} in file ${filename} at ${error.line}:${error.col}`);

      }

      throw error;
    }
  });return function minifyCode(_x10, _x11, _x12, _x13, _x14) {return _ref4.apply(this, arguments);};})();function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}const JsFileWrapping = require('../ModuleGraph/worker/JsFileWrapping');const assetTransformer = require('../assetTransformer');const babylon = require('babylon');const collectDependencies = require('../ModuleGraph/worker/collectDependencies');const constantFoldingPlugin = require('./worker/constant-folding-plugin');const crypto = require('crypto');const fs = require('fs');const generate = require('@babel/generator').default;const getMinifier = require('../lib/getMinifier');const inlinePlugin = require('./worker/inline-plugin');const optimizeDependencies = require('../ModuleGraph/worker/optimizeDependencies');const path = require('path');var _require = require('metro-source-map');const fromRawMappings = _require.fromRawMappings,toBabelSegments = _require.toBabelSegments,toSegmentTuple = _require.toSegmentTuple;function getDynamicDepsBehavior(inPackages, filename) {switch (inPackages) {case 'reject':return 'reject';case 'throwAtRuntime':const isPackage = /(?:^|[/\\])node_modules[/\\]/.test(filename);return isPackage ? inPackages : 'reject';default:inPackages;throw new Error(`invalid value for dynamic deps behavior: \`${inPackages}\``);}}

function isAsset(filePath, assetExts) {
  return assetExts.indexOf(path.extname(filePath).slice(1)) !== -1;
}

function getEndLogEntry(startLogEntry, filename) {
  const timeDelta = process.hrtime(startLogEntry.start_timestamp);
  const duration_ms = Math.round((timeDelta[0] * 1e9 + timeDelta[1]) / 1e6);

  return {
    action_name: 'Transforming file',
    action_phase: 'end',
    file_name: filename,
    duration_ms,
    log_entry_label: 'Transforming file' };

}

class InvalidRequireCallError extends Error {



  constructor(
  innerError,
  filename)
  {
    super(`${filename}:${innerError.message}`);
    this.innerError = innerError;
    this.filename = filename;
  }}


module.exports = {
  transform: transformCode,
  InvalidRequireCallError };