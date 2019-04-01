/**
 * Copyright (c) 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

'use strict';

var _types;

function _load_types() {
  return (_types = require('./types'));
}

let file = null;
let setupArgs = [];
let initialized = false;

/**
 * This file is a small bootstrapper for workers. It sets up the communication
 * between the worker and the parent process, interpreting parent messages and
 * sending results back.
 *
 * The file loaded will be lazily initialized the first time any of the workers
 * is called. This is done for optimal performance: if the farm is initialized,
 * but no call is made to it, child Node processes will be consuming the least
 * possible amount of memory.
 *
 * If an invalid message is detected, the child will exit (by throwing) with a
 * non-zero exit code.
 */
process.on('message', (request /* Should be ChildMessage */) => {
  switch (request[0]) {
    case (_types || _load_types()).CHILD_MESSAGE_INITIALIZE:
      file = request[2];
      setupArgs = request[3];
      break;

    case (_types || _load_types()).CHILD_MESSAGE_CALL:
      execMethod(request[2], request[3]);
      break;

    case (_types || _load_types()).CHILD_MESSAGE_END:
      end();
      break;

    default:
      throw new TypeError(
        'Unexpected request from parent process: ' + request[0]
      );
  }
});

function reportSuccess(result) {
  if (!process || !process.send) {
    throw new Error('Child can only be used on a forked process');
  }

  process.send([(_types || _load_types()).PARENT_MESSAGE_OK, result]);
}

function reportClientError(error) {
  return reportError(
    error,
    (_types || _load_types()).PARENT_MESSAGE_CLIENT_ERROR
  );
}

function reportInitializeError(error) {
  return reportError(
    error,
    (_types || _load_types()).PARENT_MESSAGE_SETUP_ERROR
  );
}

function reportError(error, type) {
  if (!process || !process.send) {
    throw new Error('Child can only be used on a forked process');
  }

  if (error == null) {
    error = new Error('"null" or "undefined" thrown');
  }

  process.send([
    type,
    error.constructor && error.constructor.name,
    error.message,
    error.stack,
    // $FlowFixMe: this is safe to just inherit from Object.
    typeof error === 'object' ? Object.assign({}, error) : error
  ]);
}

function end() {
  // $FlowFixMe: This has to be a dynamic require.
  const main = require(file);

  if (!main.teardown) {
    exitProcess();

    return;
  }

  execFunction(main.teardown, main, [], exitProcess, exitProcess);
}

function exitProcess() {
  process.exit(0);
}

function execMethod(method, args) {
  // $FlowFixMe: This has to be a dynamic require.
  const main = require(file);

  let fn;

  if (method === 'default') {
    fn = main.__esModule ? main['default'] : main;
  } else {
    fn = main[method];
  }

  function execHelper() {
    execFunction(fn, main, args, reportSuccess, reportClientError);
  }

  if (initialized || !main.setup) {
    execHelper();

    return;
  }

  initialized = true;

  execFunction(main.setup, main, setupArgs, execHelper, reportInitializeError);
}

function execFunction(fn, ctx, args, onResult, onError) {
  let result;

  try {
    result = fn.apply(ctx, args);
  } catch (err) {
    onError(err);

    return;
  }

  if (result && typeof result.then === 'function') {
    result.then(onResult, onError);
  } else {
    onResult(result);
  }
}
