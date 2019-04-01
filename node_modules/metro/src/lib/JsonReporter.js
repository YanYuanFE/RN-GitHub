/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
"use strict";

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const _require = require("stream"),
  Writable = _require.Writable;

class JsonReporter {
  constructor(stream) {
    this._stream = stream;
  }
  /**
   * There is a special case for errors because they have non-enumerable fields.
   * (Perhaps we should switch in favor of plain object?)
   */

  update(event) {
    /* $FlowFixMe: fine to call on `undefined`. */
    if (Object.prototype.toString.call(event.error) === "[object Error]") {
      event = _objectSpread({}, event);
      /* $FlowFixMe(>=0.70.0 site=react_native_fb) This comment suppresses an
       * error found when Flow v0.70 was deployed. To see the error delete
       * this comment and run Flow. */

      event.error = _objectSpread({}, event.error, {
        /* $FlowFixMe(>=0.70.0 site=react_native_fb) This comment suppresses an
         * error found when Flow v0.70 was deployed. To see the error delete
         * this comment and run Flow. */
        message: event.error.message,

        /* $FlowFixMe(>=0.70.0 site=react_native_fb) This comment suppresses an
         * error found when Flow v0.70 was deployed. To see the error delete
         * this comment and run Flow. */
        stack: event.error.stack
      });
    }

    this._stream.write(JSON.stringify(event) + "\n");
  }
}

module.exports = JsonReporter;
