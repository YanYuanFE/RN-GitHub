/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict-local
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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

const defaults = require("metro-config/src/defaults/defaults");

const virtualModule = require("./module").virtual;

const getPreludeCode = require("../lib/getPreludeCode");

function build(_x) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator(function*(options) {
    const entryPointPaths = options.entryPointPaths,
      getPolyfills = options.getPolyfills,
      graphFn = options.graphFn,
      optimize = options.optimize,
      platform = options.platform,
      postProcessModules = options.postProcessModules,
      translateDefaultsPath = options.translateDefaultsPath;

    const graphOnlyModules =
      /*#__PURE__*/
      (function() {
        var _ref = _asyncToGenerator(function*(m) {
          return (yield graphFn(m)).modules;
        });

        return function graphOnlyModules(_x2) {
          return _ref.apply(this, arguments);
        };
      })();

    const _ref2 = yield Promise.all([
        _asyncToGenerator(function*() {
          const result = yield graphFn(entryPointPaths);
          const modules = result.modules,
            entryModules = result.entryModules;
          const prModules = postProcessModules(
            modules,
            _toConsumableArray(entryPointPaths)
          );
          return {
            modules: prModules,
            entryModules
          };
        })(),
        graphOnlyModules([translateDefaultsPath(defaults.moduleSystem)]),
        graphOnlyModules(
          getPolyfills({
            platform
          }).map(translateDefaultsPath)
        )
      ]),
      _ref3 = _slicedToArray(_ref2, 3),
      graph = _ref3[0],
      moduleSystem = _ref3[1],
      polyfills = _ref3[2];

    const entryModules = graph.entryModules;
    const preludeScript = virtualModule(
      getPreludeCode({
        extraVars: {
          __FRAMEWORK__: options.framework
        },
        isDev: !optimize
      }),
      "/<generated>/prelude.js"
    );
    const prependedScripts = [preludeScript].concat(
      _toConsumableArray(moduleSystem),
      _toConsumableArray(polyfills)
    );
    return {
      entryModules,
      modules: _toConsumableArray(prependedScripts).concat(
        _toConsumableArray(graph.modules)
      )
    };
  });
  return _build.apply(this, arguments);
}

module.exports = build;
