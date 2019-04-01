'use strict';

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
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
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance'
      );
    }
  };
})();

var _fast_path;

function _load_fast_path() {
  return (_fast_path = _interopRequireWildcard(require('../lib/fast_path')));
}

var _normalizePathSep;

function _load_normalizePathSep() {
  return (_normalizePathSep = _interopRequireDefault(
    require('../lib/normalizePathSep')
  ));
}

var _path;

function _load_path() {
  return (_path = _interopRequireDefault(require('path')));
}

var _fbWatchman;

function _load_fbWatchman() {
  return (_fbWatchman = _interopRequireDefault(require('fb-watchman')));
}

var _constants;

function _load_constants() {
  return (_constants = _interopRequireDefault(require('../constants')));
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];
    return arr2;
  } else {
    return Array.from(arr);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
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
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            }
          );
        }
      }
      return step('next');
    });
  };
}
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const watchmanURL =
  'https://facebook.github.io/watchman/docs/troubleshooting.html';

function WatchmanError(error) {
  error.message =
    `Watchman error: ${error.message.trim()}. Make sure watchman ` +
    `is running for this project. See ${watchmanURL}.`;
  return error;
}

module.exports = (() => {
  var _ref = _asyncToGenerator(function*(options) {
    let getWatchmanRoots = (() => {
      var _ref3 = _asyncToGenerator(function*(roots) {
        const watchmanRoots = new Map();
        yield Promise.all(
          roots.map(
            (() => {
              var _ref4 = _asyncToGenerator(function*(root) {
                const response = yield cmd('watch-project', root);
                const existing = watchmanRoots.get(response.watch);
                // A root can only be filtered if it was never seen with a
                // relative_path before.
                const canBeFiltered = !existing || existing.length > 0;

                if (canBeFiltered) {
                  if (response.relative_path) {
                    watchmanRoots.set(
                      response.watch,
                      (existing || []).concat(response.relative_path)
                    );
                  } else {
                    // Make the filter directories an empty array to signal that this
                    // root was already seen and needs to be watched for all files or
                    // directories.
                    watchmanRoots.set(response.watch, []);
                  }
                }
              });

              return function(_x3) {
                return _ref4.apply(this, arguments);
              };
            })()
          )
        );
        return watchmanRoots;
      });

      return function getWatchmanRoots(_x2) {
        return _ref3.apply(this, arguments);
      };
    })();

    let queryWatchmanForDirs = (() => {
      var _ref5 = _asyncToGenerator(function*(rootProjectDirMappings) {
        const files = new Map();
        let isFresh = false;
        yield Promise.all(
          Array.from(rootProjectDirMappings).map(
            (() => {
              var _ref7 = _asyncToGenerator(function*(_ref6) {
                var _ref8 = _slicedToArray(_ref6, 2);

                let root = _ref8[0],
                  directoryFilters = _ref8[1];

                const expression = Array.from(defaultWatchExpression);
                const glob = [];

                if (directoryFilters.length > 0) {
                  expression.push(
                    ['anyof'].concat(
                      _toConsumableArray(
                        directoryFilters.map(function(dir) {
                          return ['dirname', dir];
                        })
                      )
                    )
                  );

                  for (const directory of directoryFilters) {
                    for (const extension of extensions) {
                      glob.push(`${directory}/**/*.${extension}`);
                    }
                  }
                } else {
                  for (const extension of extensions) {
                    glob.push(`**/*.${extension}`);
                  }
                }

                const relativeRoot = (_fast_path || _load_fast_path()).relative(
                  rootDir,
                  root
                );
                const query = clocks.has(relativeRoot) // Use the `since` generator if we have a clock available
                  ? {
                      expression: expression,
                      fields: fields,
                      since: clocks.get(relativeRoot)
                    } // Otherwise use the `glob` filter
                  : {expression: expression, fields: fields, glob: glob};

                const response = yield cmd('query', root, query);

                if ('warning' in response) {
                  console.warn('watchman warning: ', response.warning);
                }

                isFresh = isFresh || response.is_fresh_instance;
                files.set(root, response);
              });

              return function(_x5) {
                return _ref7.apply(this, arguments);
              };
            })()
          )
        );

        return {
          files: files,
          isFresh: isFresh
        };
      });

      return function queryWatchmanForDirs(_x4) {
        return _ref5.apply(this, arguments);
      };
    })();

    const fields = ['name', 'exists', 'mtime_ms'];
    const data = options.data,
      extensions = options.extensions,
      ignore = options.ignore,
      rootDir = options.rootDir,
      roots = options.roots;

    const defaultWatchExpression = [
      'allof',
      ['type', 'f'],
      ['anyof'].concat(
        extensions.map(function(extension) {
          return ['suffix', extension];
        })
      )
    ];
    const clocks = data.clocks;
    const client = new (_fbWatchman || _load_fbWatchman()).default.Client();

    let clientError;
    client.on('error', function(error) {
      return (clientError = WatchmanError(error));
    });

    const cmd = function() {
      for (
        var _len = arguments.length, args = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      return new Promise(function(resolve, reject) {
        return client.command(args, function(error, result) {
          return error ? reject(WatchmanError(error)) : resolve(result);
        });
      });
    };

    if (options.computeSha1) {
      var _ref2 = yield cmd('list-capabilities');

      const capabilities = _ref2.capabilities;

      if (capabilities.indexOf('field-content.sha1hex') !== -1) {
        fields.push('content.sha1hex');
      }
    }

    let files = data.files;
    let watchmanFiles;
    try {
      const watchmanRoots = yield getWatchmanRoots(roots);
      const watchmanFileResults = yield queryWatchmanForDirs(watchmanRoots);

      // Reset the file map if watchman was restarted and sends us a list of
      // files.
      if (watchmanFileResults.isFresh) {
        files = new Map();
      }

      watchmanFiles = watchmanFileResults.files;
    } finally {
      client.end();
    }

    if (clientError) {
      throw clientError;
    }

    for (const _ref9 of watchmanFiles) {
      var _ref10 = _slicedToArray(_ref9, 2);

      const watchRoot = _ref10[0];
      const response = _ref10[1];

      const fsRoot = (0,
      (_normalizePathSep || _load_normalizePathSep()).default)(watchRoot);
      const relativeFsRoot = (_fast_path || _load_fast_path()).relative(
        rootDir,
        fsRoot
      );
      clocks.set(relativeFsRoot, response.clock);

      for (const fileData of response.files) {
        const filePath =
          fsRoot +
          (_path || _load_path()).default.sep +
          (0, (_normalizePathSep || _load_normalizePathSep()).default)(
            fileData.name
          );
        const relativeFilePath = (_fast_path || _load_fast_path()).relative(
          rootDir,
          filePath
        );

        if (!fileData.exists) {
          files.delete(relativeFilePath);
        } else if (!ignore(filePath)) {
          const mtime =
            typeof fileData.mtime_ms === 'number'
              ? fileData.mtime_ms
              : fileData.mtime_ms.toNumber();

          let sha1hex = fileData['content.sha1hex'];
          if (typeof sha1hex !== 'string' || sha1hex.length !== 40) {
            sha1hex = null;
          }

          const existingFileData = data.files.get(relativeFilePath);
          let nextData;

          if (
            existingFileData &&
            existingFileData[
              (_constants || _load_constants()).default.MTIME
            ] === mtime
          ) {
            nextData = existingFileData;
          } else if (
            existingFileData &&
            sha1hex &&
            existingFileData[(_constants || _load_constants()).default.SHA1] ===
              sha1hex
          ) {
            nextData = [].concat(_toConsumableArray(existingFileData));
            nextData[1] = mtime;
          } else {
            // See ../constants.js
            nextData = ['', mtime, 0, [], sha1hex];
          }

          const mappings = options.mapper ? options.mapper(filePath) : null;

          if (mappings) {
            for (const absoluteVirtualFilePath of mappings) {
              if (!ignore(absoluteVirtualFilePath)) {
                const relativeVirtualFilePath = (
                  _fast_path || _load_fast_path()
                ).relative(rootDir, absoluteVirtualFilePath);
                files.set(relativeVirtualFilePath, nextData);
              }
            }
          } else {
            files.set(relativeFilePath, nextData);
          }
        }
      }
    }

    data.files = files;
    return data;
  });

  function watchmanCrawl(_x) {
    return _ref.apply(this, arguments);
  }

  return watchmanCrawl;
})();
