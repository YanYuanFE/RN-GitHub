/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 *  strict
 */
"use strict";

const _require = require("console"),
  Console = _require.Console;

const _require2 = require("stream"),
  Writable = _require2.Writable;

const write = (_, __, callback) => callback();

module.exports = new Console(
  new Writable({
    write,
    writev: write
  })
);
