/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';



exports.empty = () => virtual('', '/<generated>/empty.js');

// creates a virtual module (i.e. not corresponding to a file on disk)
// with the given source code.
const virtual = (code, filePath) => ({
  dependencies: [],
  file: {
    code,
    map: null,
    path: filePath,
    type: 'script' } });



exports.virtual = virtual;