// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"EM1A":[function(require,module,exports) {
var define;
var global = arguments[3];
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.localforage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb || !idb.open) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support
        // (see: https://github.com/pouchdb/pouchdb/issues/5572).
        // Safari 10.1 shipped with fetch, we can use that to detect it.
        // Note: this creates issues with `window.fetch` polyfills and
        // overrides; see:
        // https://github.com/localForage/localForage/issues/856
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            var db = openreq.result;
            db.onversionchange = function (e) {
                // Triggered when the database is modified (e.g. adding an objectStore) or
                // deleted (even when initiated by other sessions in different tabs).
                // Closing the connection here prevents those operations from being blocked.
                // If the database is accessed again later by this instance, the connection
                // will be reopened or the database recreated as needed.
                e.target.close();
            };
            resolve(db);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback returns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openKeyCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openKeyCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(req.error);
                    };

                    req.onblocked = function () {
                        // Closing all open connections in onversionchange handler should prevent this situation, but if
                        // we do get here, it just means the request remains pending - eventually it will succeed or error
                        console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});

},{}],"gZU7":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Mustache = factory());
}(this, (function () { 'use strict';

  /*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   */

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  /**
   * Safe way of detecting whether or not the given thing is a primitive and
   * whether it has the given property
   */
  function primitiveHasOwnProperty (primitive, propName) {
    return (
      primitive != null
      && typeof primitive !== 'object'
      && primitive.hasOwnProperty
      && primitive.hasOwnProperty(propName)
    );
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   *
   * Tokens for partials also contain two more elements: 1) a string value of
   * indendation prior to that tag and 2) the index of that tag on that line -
   * eg a value of 2 indicates the partial is the third tag on this line.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];
    var lineHasNonSpace = false;
    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?
    var indentation = '';  // Tracks indentation for tags that use it
    var tagIndex = 0;      // Stores a count of number of tags encountered on a line

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
            indentation += chr;
          } else {
            nonSpace = true;
            lineHasNonSpace = true;
            indentation += ' ';
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
            indentation = '';
            tagIndex = 0;
            lineHasNonSpace = false;
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      if (type == '>') {
        token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
      } else {
        token = [ type, value, start, scanner.pos ];
      }
      tagIndex++;
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    stripSpace();

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, intermediateValue, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          intermediateValue = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           *
           * In the case where dot notation is used, we consider the lookup
           * to be successful even if the last "object" in the path is
           * not actually an object but a primitive (e.g., a string, or an
           * integer), because it is sometimes useful to access a property
           * of an autoboxed primitive, such as the length of a string.
           **/
          while (intermediateValue != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = (
                hasProperty(intermediateValue, names[index])
                || primitiveHasOwnProperty(intermediateValue, names[index])
              );

            intermediateValue = intermediateValue[names[index++]];
          }
        } else {
          intermediateValue = context.view[name];

          /**
           * Only checking against `hasProperty`, which always returns `false` if
           * `context.view` is not an object. Deliberately omitting the check
           * against `primitiveHasOwnProperty` if dot notation is not used.
           *
           * Consider this example:
           * ```
           * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
           * ```
           *
           * If we were to check also against `primitiveHasOwnProperty`, as we do
           * in the dot notation case, then render call would return:
           *
           * "The length of a football field is 9."
           *
           * rather than the expected:
           *
           * "The length of a football field is 100 yards."
           **/
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit) {
          value = intermediateValue;
          break;
        }

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.templateCache = {
      _cache: {},
      set: function set (key, value) {
        this._cache[key] = value;
      },
      get: function get (key) {
        return this._cache[key];
      },
      clear: function clear () {
        this._cache = {};
      }
    };
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    if (typeof this.templateCache !== 'undefined') {
      this.templateCache.clear();
    }
  };

  /**
   * Parses and caches the given `template` according to the given `tags` or
   * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.templateCache;
    var cacheKey = template + ':' + (tags || mustache.tags).join(':');
    var isCacheEnabled = typeof cache !== 'undefined';
    var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

    if (tokens == undefined) {
      tokens = parseTemplate(template, tags);
      isCacheEnabled && cache.set(cacheKey, tokens);
    }
    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   *
   * If the optional `config` argument is given here, then it should be an
   * object with a `tags` attribute or an `escape` attribute or both.
   * If an array is passed, then it will be interpreted the same way as
   * a `tags` attribute on a `config` object.
   *
   * The `tags` attribute of a `config` object must be an array with two
   * string values: the opening and closing tags used in the template (e.g.
   * [ "<%", "%>" ]). The default is to mustache.tags.
   *
   * The `escape` attribute of a `config` object must be a function which
   * accepts a string as input and outputs a safely escaped string.
   * If an `escape` function is not provided, then an HTML-safe string
   * escaping function is used as the default.
   */
  Writer.prototype.render = function render (template, view, partials, config) {
    var tags = this.getConfigTags(config);
    var tokens = this.parse(template, tags);
    var context = (view instanceof Context) ? view : new Context(view, undefined);
    return this.renderTokens(tokens, context, partials, template, config);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, config) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context, config);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate, config) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials, config);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate, config) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate, config);
  };

  Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
    var filteredIndentation = indentation.replace(/[^ \t]/g, '');
    var partialByNl = partial.split('\n');
    for (var i = 0; i < partialByNl.length; i++) {
      if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
        partialByNl[i] = filteredIndentation + partialByNl[i];
      }
    }
    return partialByNl.join('\n');
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials, config) {
    if (!partials) return;
    var tags = this.getConfigTags(config);

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) {
      var lineHasNonSpace = token[6];
      var tagIndex = token[5];
      var indentation = token[4];
      var indentedValue = value;
      if (tagIndex == 0 && indentation) {
        indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
      }
      var tokens = this.parse(indentedValue, tags);
      return this.renderTokens(tokens, context, partials, indentedValue, config);
    }
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context, config) {
    var escape = this.getConfigEscape(config) || mustache.escape;
    var value = context.lookup(token[1]);
    if (value != null)
      return (typeof value === 'number' && escape === mustache.escape) ? String(value) : escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  Writer.prototype.getConfigTags = function getConfigTags (config) {
    if (isArray(config)) {
      return config;
    }
    else if (config && typeof config === 'object') {
      return config.tags;
    }
    else {
      return undefined;
    }
  };

  Writer.prototype.getConfigEscape = function getConfigEscape (config) {
    if (config && typeof config === 'object' && !isArray(config)) {
      return config.escape;
    }
    else {
      return undefined;
    }
  };

  var mustache = {
    name: 'mustache.js',
    version: '4.2.0',
    tags: [ '{{', '}}' ],
    clearCache: undefined,
    escape: undefined,
    parse: undefined,
    render: undefined,
    Scanner: undefined,
    Context: undefined,
    Writer: undefined,
    /**
     * Allows a user to override the default caching strategy, by providing an
     * object with set, get and clear methods. This can also be used to disable
     * the cache by setting it to the literal `undefined`.
     */
    set templateCache (cache) {
      defaultWriter.templateCache = cache;
    },
    /**
     * Gets the default or overridden caching object from the default writer.
     */
    get templateCache () {
      return defaultWriter.templateCache;
    }
  };

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view`, `partials`, and `config`
   * using the default writer.
   */
  mustache.render = function render (template, view, partials, config) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials, config);
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  return mustache;

})));

},{}],"IWa2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.uid = exports.top_bar = exports.toaster = exports.sort_array = exports.side_toaster = exports.screenlock = exports.pushLocalNotification = exports.pick_image = exports.notification = exports.list_files = exports.goodbye = exports.getManifest = exports.deleteFile = exports.bottom_bar = void 0;

var sort_array = function sort_array(arr, item_key, type) {
  if (type == "date") {
    arr.sort(function (a, b) {
      var da = new Date(a[item_key]),
          db = new Date(b[item_key]);
      return da - db;
    });
  } //sort by number


  if (type == "number") {
    arr.sort(function (a, b) {
      return b[item_key] - a[item_key];
    });
  } //sort by string


  if (type == "string") {
    arr.sort(function (a, b) {
      var fa = a[item_key].toLowerCase(),
          fb = b[item_key].toLowerCase();

      if (fa < fb) {
        return -1;
      }

      if (fa > fb) {
        return 1;
      }

      return 0;
    });
  }
};

exports.sort_array = sort_array;

var uid = function uid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }

  return "greg@" + _p8() + _p8(true) + _p8(true) + _p8();
};

exports.uid = uid;
var notification = "";
exports.notification = notification;

var notify = function notify(param_title, param_text, param_silent) {
  var options = {
    body: param_text,
    silent: param_silent,
    requireInteraction: false //actions: [{ action: "test", title: "test" }],

  }; // Let's check whether notification permissions have already been granted

  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    exports.notification = notification = new Notification(param_title, options);
  } // Otherwise, we need to ask the user for permission


  if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        exports.notification = notification = new Notification(param_title, options);
      }
    });
  }
}; //https://notifications.spec.whatwg.org/#dictdef-notificationaction


var pushLocalNotification = function pushLocalNotification(title, body) {
  window.Notification.requestPermission().then(function (result) {
    var notification = new window.Notification(title, {
      body: body //requireInteraction: true,

    });

    notification.onerror = function (err) {
      console.log(err);
    };

    notification.onclick = function (event) {
      if (window.navigator.mozApps) {
        var request = window.navigator.mozApps.getSelf();

        request.onsuccess = function () {
          if (request.result) {
            notification.close();
            request.result.launch();
          }
        };
      } else {
        window.open(document.location.origin, "_blank");
      }
    };

    notification.onshow = function () {// notification.close();
    };
  });
};

exports.pushLocalNotification = pushLocalNotification;

if (navigator.mozSetMessageHandler) {
  navigator.mozSetMessageHandler("alarm", function (message) {
    console.log(JSON.stringify(message));
    pushLocalNotification("Greg", message.data.foo);
  });
}

var validate = function validate(url) {
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  if (pattern.test(url)) {
    return true;
  }

  return false;
};

exports.validate = validate;

var getManifest = function getManifest(callback) {
  if (!navigator.mozApps) {
    //let t = document.getElementById("kaisos-ads");
    //t.remove();
    return false;
  }

  var self = navigator.mozApps.getSelf();

  self.onsuccess = function () {
    callback(self.result);
  };

  self.onerror = function () {};
}; //top toaster


exports.getManifest = getManifest;
var queue = [];
var timeout;

var toaster = function toaster(text, time) {
  queue.push({
    text: text,
    time: time
  });

  if (queue.length === 1) {
    toast_q(text, time);
  }
};

exports.toaster = toaster;

var toast_q = function toast_q(text, time) {
  var x = document.querySelector("div#toast");
  x.innerHTML = queue[0].text;
  x.style.transform = "translate(0px, 0px)";
  timeout = setTimeout(function () {
    timeout = null;
    x.style.transform = "translate(0px, -100px)";
    queue = queue.slice(1);

    if (queue.length > 0) {
      setTimeout(function () {
        toast_q(text, time);
      }, 1000);
    }
  }, time);
}; //side toaster


var queue_st = [];
var ttimeout;

var side_toaster = function side_toaster(text, time) {
  queue_st.push({
    text: text,
    time: time
  });

  if (queue_st.length === 1) {
    toast_qq(text, time);
  }
};

exports.side_toaster = side_toaster;

var toast_qq = function toast_qq(text, time) {
  var x = document.querySelector("div#side-toast");
  x.innerHTML = queue_st[0].text;
  x.style.transform = "translate(0vh, 0px)";
  timeout = setTimeout(function () {
    ttimeout = null;
    x.style.transform = "translate(-100vh,0px)";
    queue_st = queue.slice(1);

    if (queue_st.length > 0) {
      setTimeout(function () {
        toast_qq(text, time);
      }, 1000);
    }
  }, time);
}; //bottom bar


var bottom_bar = function bottom_bar(left, center, right) {
  document.querySelector("div#bottom-bar div#button-left").textContent = left;
  document.querySelector("div#bottom-bar div#button-center").textContent = center;
  document.querySelector("div#bottom-bar div#button-right").textContent = right;

  if (left == "" && center == "" && right == "") {
    document.querySelector("div#bottom-bar").style.display = "none";
  } else {
    document.querySelector("div#bottom-bar").style.display = "block";
  }
}; //top bar


exports.bottom_bar = bottom_bar;

var top_bar = function top_bar(left, center, right) {
  document.querySelector("div#top-bar div.button-left").innerHTML = left;
  document.querySelector("div#top-bar div.button-center").textContent = center;
  document.querySelector("div#top-bar div.button-right").textContent = right;

  if (left == "" && center == "" && right == "") {
    document.querySelector("div#top-bar").style.display = "none";
  } else {
    document.querySelector("div#top-bar").style.display = "block";
  }
};

exports.top_bar = top_bar;

var add_script = function add_script(script) {
  document.body.appendChild(document.createElement("script")).src = script;
};

var lock;

var screenlock = function screenlock(stat) {
  if (typeof window.navigator.requestWakeLock === "undefined") {
    return false;
  }

  if (stat == "lock") {
    lock = window.navigator.requestWakeLock("screen");

    lock.onsuccess = function () {};

    lock.onerror = function () {
      alert("An error occurred: " + this.error.name);
    };
  }

  if (stat == "unlock") {
    if (lock.topic == "screen") {
      lock.unlock();
    }
  }
}; //goodbye


exports.screenlock = screenlock;

var goodbye = function goodbye() {
  document.getElementById("goodbye").style.display = "block";
  bottom_bar("", "", "");

  if (localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount) + 1;
  } else {
    localStorage.clickcount = 1;
  }

  if (localStorage.clickcount == 300000) {
    message();
  } else {
    document.getElementById("ciao").style.display = "block";
    setTimeout(function () {
      window.close();
    }, 2000);
  }

  function message() {
    document.getElementById("donation").style.display = "block";
    setTimeout(function () {
      localStorage.clickcount = 1;
      window.close();
    }, 3000);
  }
}; //pick image


exports.goodbye = goodbye;

var pick_image = function pick_image(cb) {
  var activity = new MozActivity({
    name: "pick",
    data: {
      type: ["image/png", "image/jpg", "image/jpeg"]
    }
  });

  activity.onsuccess = function () {
    console.log("Activity successfuly handled");
    var p = this.result.blob;
    cb(p);
  };

  activity.onerror = function () {
    console.log("The activity encouter en error: " + this.error);
  };
}; //delete file


exports.pick_image = pick_image;

var deleteFile = function deleteFile(storage, path, notification) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var requestDel = sdcard[storage].delete(path);

  requestDel.onsuccess = function () {
    if (notification == "notification") {
      toaster('File "' + name + '" successfully deleted frome the sdcard storage area');
    }
  };

  requestDel.onerror = function () {
    toaster("Unable to delete the file: " + this.error);
  };
};

exports.deleteFile = deleteFile;

var list_files = function list_files(filetype, callback) {
  if (!navigator.getDeviceStorage) return false;
  var d = navigator.getDeviceStorage("sdcard");
  var cursor = d.enumerate();

  cursor.onsuccess = function () {
    if (!this.result) {
      console.log("finished");
    }

    if (cursor.result.name !== null) {
      var file = cursor.result;
      var n = file.name.split(".");
      var file_type = n[n.length - 1];

      if (file_type == filetype) {
        callback(file.name);
      }

      this.continue();
    }
  };

  cursor.onerror = function () {
    console.warn("No file found: " + this.error);
  };
}; //polyfill


exports.list_files = list_files;

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

function hashCode(str) {
  var hash = 0;

  for (var i = 0; i < str.length; i++) {
    hash = ~~((hash << 5) - hash + str.charCodeAt(i));
  }

  return hash;
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
}

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function share(url) {
  var activity = new MozActivity({
    name: "share",
    data: {
      type: "url",
      url: url
    }
  });

  activity.onsuccess = function () {};

  activity.onerror = function () {
    console.log("The activity encounter en error: " + this.error);
  };
} //check if internet connection


function check_iconnection() {
  function updateOfflineStatus() {
    toaster("Your Browser is offline", 15000);
    return false;
  }

  window.addEventListener("offline", updateOfflineStatus);
}

function delete_file(filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var request = sdcard[1].delete(filename);

  request.onsuccess = function () {//toaster("File deleted", 2000);
  };

  request.onerror = function () {//toaster("Unable to delete the file: " + this.error, 2000);
  };
}

function get_file(filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var request = sdcard[1].get(filename);

  request.onsuccess = function () {
    var file = this.result; //alert("Get the file: " + file.name);
  };

  request.onerror = function () {//alert("Unable to get the file: " + this.error);
  };
}

function write_file(data, filename) {
  var sdcard = navigator.getDeviceStorages("sdcard");
  var file = new Blob([data], {
    type: "text/plain"
  });
  var request = sdcard[1].addNamed(file, filename);

  request.onsuccess = function () {
    var name = this.result; //toaster('File "' + name + '" successfully wrote on the sdcard storage area', 2000);
  }; // An error typically occur if a file with the same name already exist


  request.onerror = function () {
    toaster("Unable to write the file: " + this.error, 2000);
  };
}
},{}],"eYm5":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMoonPhase = getMoonPhase;

/*
 * modified from http://www.voidware.com/moon_phase.htm
 */
function getMoonPhase(year, month, day) {
  var c = e = jd = b = 0;
  var b;
  var jd;
  var e;

  if (month < 3) {
    year--;
    month += 12;
  }

  ++month;
  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09; //jd is total days elapsed

  jd /= 29.5305882; //divide by the moon cycle

  b = parseInt(jd); //int(jd) -> b, take integer part of jd

  jd -= b; //subtract integer part to leave fractional part of original jd

  b = Math.round(jd * 8); //scale fraction from 0-8 and round

  if (b >= 8) {
    b = 0; //0 and 8 are the same so turn 8 into 0
  } // 0 => New Moon
  // 1 => Waxing Crescent Moon
  // 2 => First Quarter Moon
  // 3 => Waxing Gibbous Moon
  // 4 => Full Moon
  // 5 => Waning Gibbous Moon
  // 6 => Last Quarter Moon
  // 7 => Waning Crescent Moon


  return b;
}
},{}],"dZdQ":[function(require,module,exports) {
var define;
(function(name, definition) {

/****************
 *  A tolerant, minimal icalendar parser
 *  (http://tools.ietf.org/html/rfc5545)
 *
 *  <peterbraden@peterbraden.co.uk>
 * **************/

  if (typeof module !== 'undefined') {
    module.exports = definition();
  } else if (typeof define === 'function' && typeof define.amd === 'object'){
    define(definition);
  } else {
    this[name] = definition();
  }

}('ical', function(){

   // Unescape Text re RFC 4.3.11
  var text = function(t){
    t = t || "";
    return (t
      .replace(/\\\,/g, ',')
      .replace(/\\\;/g, ';')
      .replace(/\\[nN]/g, '\n')
      .replace(/\\\\/g, '\\')
    )
  }

  var parseParams = function(p){
    var out = {}
    for (var i = 0; i<p.length; i++){
      if (p[i].indexOf('=') > -1){
        var segs = p[i].split('=');

        out[segs[0]] = parseValue(segs.slice(1).join('='));

      }
    }
    return out || sp
  }

  var parseValue = function(val){
    if ('TRUE' === val)
      return true;

    if ('FALSE' === val)
      return false;

    var number = Number(val);
    if (!isNaN(number))
      return number;

    return val;
  }

  var storeValParam = function (name) {
      return function (val, curr) {
          var current = curr[name];
          if (Array.isArray(current)) {
              current.push(val);
              return curr;
          }

          if (current != null) {
              curr[name] = [current, val];
              return curr;
          }

          curr[name] = val;
          return curr
      }
  }

  var storeParam = function (name) {
      return function (val, params, curr) {
          var data;
          if (params && params.length && !(params.length == 1 && params[0] === 'CHARSET=utf-8')) {
              data = { params: parseParams(params), val: text(val) }
          }
          else
              data = text(val)

          return storeValParam(name)(data, curr);
      }
  }

  var addTZ = function (dt, params) {
    var p = parseParams(params);

    if (params && p){
      dt.tz = p.TZID
      if (dt.tz !== undefined)
      {
        // Remove surrouding quotes if found at the begining and at the end of the string
        // (Occurs when parsing Microsoft Exchange events containing TZID with Windows standard format instead IANA)
        dt.tz = dt.tz.replace(/^"(.*)"$/, "$1")
      }
    }

    return dt
  }

  var dateParam = function(name){
      return function (val, params, curr) {

      var newDate = text(val);


      if (params && params[0] === "VALUE=DATE") {
        // Just Date

        var comps = /^(\d{4})(\d{2})(\d{2})$/.exec(val);
        if (comps !== null) {
          // No TZ info - assume same timezone as this computer
          newDate = new Date(
            comps[1],
            parseInt(comps[2], 10)-1,
            comps[3]
          );

          newDate = addTZ(newDate, params);
          newDate.dateOnly = true;

          // Store as string - worst case scenario
          return storeValParam(name)(newDate, curr)
        }
      }


      //typical RFC date-time format
      var comps = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/.exec(val);
      if (comps !== null) {
        if (comps[7] == 'Z'){ // GMT
          newDate = new Date(Date.UTC(
            parseInt(comps[1], 10),
            parseInt(comps[2], 10)-1,
            parseInt(comps[3], 10),
            parseInt(comps[4], 10),
            parseInt(comps[5], 10),
            parseInt(comps[6], 10 )
          ));
          // TODO add tz
        } else {
          newDate = new Date(
            parseInt(comps[1], 10),
            parseInt(comps[2], 10)-1,
            parseInt(comps[3], 10),
            parseInt(comps[4], 10),
            parseInt(comps[5], 10),
            parseInt(comps[6], 10)
          );
        }

        newDate = addTZ(newDate, params);
    }


          // Store as string - worst case scenario
      return storeValParam(name)(newDate, curr)
      }
  }


  var geoParam = function(name){
    return function(val, params, curr){
      storeParam(val, params, curr)
      var parts = val.split(';');
      curr[name] = {lat:Number(parts[0]), lon:Number(parts[1])};
      return curr
    }
  }

  var categoriesParam = function (name) {
    var separatorPattern = /\s*,\s*/g;
    return function (val, params, curr) {
      storeParam(val, params, curr)
      if (curr[name] === undefined)
        curr[name] = val ? val.split(separatorPattern) : []
      else
        if (val)
          curr[name] = curr[name].concat(val.split(separatorPattern))
      return curr
    }
  }

  // EXDATE is an entry that represents exceptions to a recurrence rule (ex: "repeat every day except on 7/4").
  // The EXDATE entry itself can also contain a comma-separated list, so we make sure to parse each date out separately.
  // There can also be more than one EXDATE entries in a calendar record.
  // Since there can be multiple dates, we create an array of them.  The index into the array is the ISO string of the date itself, for ease of use.
  // i.e. You can check if ((curr.exdate != undefined) && (curr.exdate[date iso string] != undefined)) to see if a date is an exception.
  // NOTE: This specifically uses date only, and not time.  This is to avoid a few problems:
  //    1. The ISO string with time wouldn't work for "floating dates" (dates without timezones).
  //       ex: "20171225T060000" - this is supposed to mean 6 AM in whatever timezone you're currently in
  //    2. Daylight savings time potentially affects the time you would need to look up
  //    3. Some EXDATE entries in the wild seem to have times different from the recurrence rule, but are still excluded by calendar programs.  Not sure how or why.
  //       These would fail any sort of sane time lookup, because the time literally doesn't match the event.  So we'll ignore time and just use date.
  //       ex: DTSTART:20170814T140000Z
  //             RRULE:FREQ=WEEKLY;WKST=SU;INTERVAL=2;BYDAY=MO,TU
  //             EXDATE:20171219T060000
  //       Even though "T060000" doesn't match or overlap "T1400000Z", it's still supposed to be excluded?  Odd. :(
  // TODO: See if this causes any problems with events that recur multiple times a day.
  var exdateParam = function (name) {
    return function (val, params, curr) {
      var separatorPattern = /\s*,\s*/g;
      curr[name] = curr[name] || [];
      var dates = val ? val.split(separatorPattern) : [];
      dates.forEach(function (entry) {
          var exdate = new Array();
          dateParam(name)(entry, params, exdate);

          if (exdate[name])
          {
            if (typeof exdate[name].toISOString === 'function') {
              curr[name][exdate[name].toISOString().substring(0, 10)] = exdate[name];
            } else {
              console.error("No toISOString function in exdate[name]", exdate[name]);
            }
          }
        }
      )
      return curr;
    }
  }

  // RECURRENCE-ID is the ID of a specific recurrence within a recurrence rule.
  // TODO:  It's also possible for it to have a range, like "THISANDPRIOR", "THISANDFUTURE".  This isn't currently handled.
  var recurrenceParam = function (name) {
      return dateParam(name);
  }

  var addFBType = function (fb, params) {
    var p = parseParams(params);

    if (params && p){
      fb.type = p.FBTYPE || "BUSY"
    }

    return fb;
  }

  var freebusyParam = function (name) {
    return function(val, params, curr){
      var fb = addFBType({}, params);
      curr[name] = curr[name] || []
      curr[name].push(fb);

      storeParam(val, params, fb);

      var parts = val.split('/');

      ['start', 'end'].forEach(function (name, index) {
        dateParam(name)(parts[index], params, fb);
      });

      return curr;
    }
  }

  return {


    objectHandlers : {
      'BEGIN' : function(component, params, curr, stack){
          stack.push(curr)

          return {type:component, params:params}
        }

      , 'END' : function(component, params, curr, stack){
        // prevents the need to search the root of the tree for the VCALENDAR object
        if (component === "VCALENDAR") {
            //scan all high level object in curr and drop all strings
            var key,
                obj;

            for (key in curr) {
                if(curr.hasOwnProperty(key)) {
                   obj = curr[key];
                   if (typeof obj === 'string') {
                       delete curr[key];
                   }
                }
            }

            return curr
        }

        var par = stack.pop()

        if (curr.uid)
        {
        	// If this is the first time we run into this UID, just save it.
        	if (par[curr.uid] === undefined)
            {
            	par[curr.uid] = curr;
            }
            else
            {
                // If we have multiple ical entries with the same UID, it's either going to be a
                // modification to a recurrence (RECURRENCE-ID), and/or a significant modification
                // to the entry (SEQUENCE).

                // TODO: Look into proper sequence logic.

                if (curr.recurrenceid === undefined)
                {
                    // If we have the same UID as an existing record, and it *isn't* a specific recurrence ID,
                    // not quite sure what the correct behaviour should be.  For now, just take the new information
                    // and merge it with the old record by overwriting only the fields that appear in the new record.
                    var key;
                    for (key in curr) {
                    	par[curr.uid][key] = curr[key];
                    }

                }
            }

        	// If we have recurrence-id entries, list them as an array of recurrences keyed off of recurrence-id.
        	// To use - as you're running through the dates of an rrule, you can try looking it up in the recurrences
        	// array.  If it exists, then use the data from the calendar object in the recurrence instead of the parent
        	// for that day.

        	// NOTE:  Sometimes the RECURRENCE-ID record will show up *before* the record with the RRULE entry.  In that
        	// case, what happens is that the RECURRENCE-ID record ends up becoming both the parent record and an entry
        	// in the recurrences array, and then when we process the RRULE entry later it overwrites the appropriate
			// fields in the parent record.

        	if (curr.recurrenceid != null)
        	{

        		// TODO:  Is there ever a case where we have to worry about overwriting an existing entry here?

        		// Create a copy of the current object to save in our recurrences array.  (We *could* just do par = curr,
        		// except for the case that we get the RECURRENCE-ID record before the RRULE record.  In that case, we
        		// would end up with a shared reference that would cause us to overwrite *both* records at the point
				// that we try and fix up the parent record.)
        		var recurrenceObj = new Object();
        		var key;
        		for (key in curr) {
        			recurrenceObj[key] = curr[key];
        		}

        		if (recurrenceObj.recurrences != undefined) {
        			delete recurrenceObj.recurrences;
        		}


				// If we don't have an array to store recurrences in yet, create it.
        		if (par[curr.uid].recurrences === undefined) {
        			par[curr.uid].recurrences = new Array();
            	}

        		// Save off our cloned recurrence object into the array, keyed by date but not time.
        		// We key by date only to avoid timezone and "floating time" problems (where the time isn't associated with a timezone).
				// TODO: See if this causes a problem with events that have multiple recurrences per day.
                if (typeof curr.recurrenceid.toISOString === 'function') {
                  par[curr.uid].recurrences[curr.recurrenceid.toISOString().substring(0,10)] = recurrenceObj;
                } else {
                  console.error("No toISOString function in curr.recurrenceid", curr.recurrenceid);
                }
            }

        	// One more specific fix - in the case that an RRULE entry shows up after a RECURRENCE-ID entry,
        	// let's make sure to clear the recurrenceid off the parent field.
        	if ((par[curr.uid].rrule != undefined) && (par[curr.uid].recurrenceid != undefined))
            {
        		delete par[curr.uid].recurrenceid;
            }

        }
        else
          par[Math.random()*100000] = curr  // Randomly assign ID : TODO - use true GUID

        return par
      }

      , 'SUMMARY' : storeParam('summary')
      , 'DESCRIPTION' : storeParam('description')
      , 'URL' : storeParam('url')
      , 'UID' : storeParam('uid')
      , 'LOCATION' : storeParam('location')
      , 'DTSTART' : dateParam('start')
      , 'DTEND' : dateParam('end')
      , 'EXDATE' : exdateParam('exdate')
      ,' CLASS' : storeParam('class')
      , 'TRANSP' : storeParam('transparency')
      , 'GEO' : geoParam('geo')
      , 'PERCENT-COMPLETE': storeParam('completion')
      , 'COMPLETED': dateParam('completed')
      , 'CATEGORIES': categoriesParam('categories')
      , 'FREEBUSY': freebusyParam('freebusy')
      , 'DTSTAMP': dateParam('dtstamp')
      , 'CREATED': dateParam('created')
      , 'LAST-MODIFIED': dateParam('lastmodified')
      , 'RECURRENCE-ID': recurrenceParam('recurrenceid')

    },


    handleObject : function(name, val, params, ctx, stack, line){
      var self = this

      if(self.objectHandlers[name])
        return self.objectHandlers[name](val, params, ctx, stack, line)

      //handling custom properties
      if(name.match(/X\-[\w\-]+/) && stack.length > 0) {
          //trimming the leading and perform storeParam
          name = name.substring(2);
          return (storeParam(name))(val, params, ctx, stack, line);
      }

      return storeParam(name.toLowerCase())(val, params, ctx);
    },

		getLineBreakChar: function (string) {
			const indexOfLF = string.indexOf('\n', 1);  // No need to check first-character

			if (indexOfLF === -1) {
				if (string.indexOf('\r') !== -1) return '\r';

				return '\n';
			}

			if (string[indexOfLF - 1] === '\r') return '\r?\n';

			return '\n';
		},

    parseICS : function(str){
      var self = this
			var line_end_type = self.getLineBreakChar(str)
      var lines = str.split(line_end_type=='\n'?/\n/:/\r?\n/)
      var ctx = {}
      var stack = []

      for (var i = 0, ii = lines.length, l = lines[0]; i<ii; i++, l=lines[i]){
        //Unfold : RFC#3.1
        while (lines[i+1] && /[ \t]/.test(lines[i+1][0])) {
          l += lines[i+1].slice(1)
          i += 1
        }

        // Split on semicolons except if the semicolon is surrounded by quotes
        var kv = l.split(/:(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/g)

        if (kv.length < 2){
          // Invalid line - must have k&v
          continue;
        }

        // Although the spec says that vals with colons should be quote wrapped
        // in practise nobody does, so we assume further colons are part of the
        // val
        var value = kv.slice(1).join(":")
          , kp = kv[0].split(";")
          , name = kp[0]
          , params = kp.slice(1)

        ctx = self.handleObject(name, value, params, ctx, stack, l) || {}
      }

       // type and params are added to the list of items, get rid of them.
       delete ctx.type
       delete ctx.params

       return ctx
    }

  }
}))

},{}],"ChoL":[function(require,module,exports) {

},{}],"O7gF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notEmpty = exports.isPresent = exports.isNumber = exports.isArray = exports.includes = exports.empty = exports.divmod = exports.clone = void 0;
exports.padStart = padStart;
exports.toArray = exports.split = exports.repeat = exports.range = exports.pymod = void 0;

// =============================================================================
// Helper functions
// =============================================================================
var isPresent = function (value) {
  return value !== null && value !== undefined;
};

exports.isPresent = isPresent;

var isNumber = function (value) {
  return typeof value === 'number';
};

exports.isNumber = isNumber;
var isArray = Array.isArray;
/**
 * Simplified version of python's range()
 */

exports.isArray = isArray;

var range = function (start, end) {
  if (end === void 0) {
    end = start;
  }

  if (arguments.length === 1) {
    end = start;
    start = 0;
  }

  var rang = [];

  for (var i = start; i < end; i++) rang.push(i);

  return rang;
};

exports.range = range;

var clone = function (array) {
  return [].concat(array);
};

exports.clone = clone;

var repeat = function (value, times) {
  var i = 0;
  var array = [];

  if (isArray(value)) {
    for (; i < times; i++) array[i] = [].concat(value);
  } else {
    for (; i < times; i++) array[i] = value;
  }

  return array;
};

exports.repeat = repeat;

var toArray = function (item) {
  if (isArray(item)) {
    return item;
  }

  return [item];
};

exports.toArray = toArray;

function padStart(item, targetLength, padString) {
  if (padString === void 0) {
    padString = ' ';
  }

  var str = String(item);
  targetLength = targetLength >> 0;

  if (str.length > targetLength) {
    return String(str);
  }

  targetLength = targetLength - str.length;

  if (targetLength > padString.length) {
    padString += repeat(padString, targetLength / padString.length);
  }

  return padString.slice(0, targetLength) + String(str);
}
/**
 * Python like split
 */


var split = function (str, sep, num) {
  var splits = str.split(sep);
  return num ? splits.slice(0, num).concat([splits.slice(num).join(sep)]) : splits;
};
/**
 * closure/goog/math/math.js:modulo
 * Copyright 2006 The Closure Library Authors.
 * The % operator in JavaScript returns the remainder of a / b, but differs from
 * some other languages in that the result will have the same sign as the
 * dividend. For example, -1 % 8 == -1, whereas in some other languages
 * (such as Python) the result would be 7. This function emulates the more
 * correct modulo behavior, which is useful for certain applications such as
 * calculating an offset index in a circular list.
 *
 * @param {number} a The dividend.
 * @param {number} b The divisor.
 * @return {number} a % b where the result is between 0 and b (either 0 <= x < b
 *     or b < x <= 0, depending on the sign of b).
 */


exports.split = split;

var pymod = function (a, b) {
  var r = a % b; // If r and b differ in sign, add b to wrap the result to the correct sign.

  return r * b < 0 ? r + b : r;
};
/**
 * @see: <http://docs.python.org/library/functions.html#divmod>
 */


exports.pymod = pymod;

var divmod = function (a, b) {
  return {
    div: Math.floor(a / b),
    mod: pymod(a, b)
  };
};

exports.divmod = divmod;

var empty = function (obj) {
  return !isPresent(obj) || obj.length === 0;
};
/**
 * Python-like boolean
 * @return {Boolean} value of an object/primitive, taking into account
 * the fact that in Python an empty list's/tuple's
 * boolean value is False, whereas in JS it's true
 */


exports.empty = empty;

var notEmpty = function (obj) {
  return !empty(obj);
};
/**
 * Return true if a value is in an array
 */


exports.notEmpty = notEmpty;

var includes = function (arr, val) {
  return notEmpty(arr) && arr.indexOf(val) !== -1;
};

exports.includes = includes;
},{}],"jBj6":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.dateutil = void 0;

var _helpers = require("./helpers");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

/**
 * General date-related utilities.
 * Also handles several incompatibilities between JavaScript and Python
 *
 */
var dateutil;
exports.dateutil = dateutil;

(function (dateutil) {
  dateutil.MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  /**
   * Number of milliseconds of one day
   */

  dateutil.ONE_DAY = 1000 * 60 * 60 * 24;
  /**
   * @see: <http://docs.python.org/library/datetime.html#datetime.MAXYEAR>
   */

  dateutil.MAXYEAR = 9999;
  /**
   * Python uses 1-Jan-1 as the base for calculating ordinals but we don't
   * want to confuse the JS engine with milliseconds > Number.MAX_NUMBER,
   * therefore we use 1-Jan-1970 instead
   */

  dateutil.ORDINAL_BASE = new Date(Date.UTC(1970, 0, 1));
  /**
   * Python: MO-SU: 0 - 6
   * JS: SU-SAT 0 - 6
   */

  dateutil.PY_WEEKDAYS = [6, 0, 1, 2, 3, 4, 5];
  /**
   * py_date.timetuple()[7]
   */

  dateutil.getYearDay = function (date) {
    var dateNoTime = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return Math.ceil((dateNoTime.valueOf() - new Date(date.getUTCFullYear(), 0, 1).valueOf()) / dateutil.ONE_DAY) + 1;
  };

  dateutil.isLeapYear = function (year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  };
  /**
   * @return {Number} the date's timezone offset in ms
   */


  dateutil.tzOffset = function (date) {
    return date.getTimezoneOffset() * 60 * 1000;
  };
  /**
   * @see: <http://www.mcfedries.com/JavaScript/DaysBetween.asp>
   */


  dateutil.daysBetween = function (date1, date2) {
    // The number of milliseconds in one day
    // Convert both dates to milliseconds
    var date1ms = date1.getTime() - dateutil.tzOffset(date1);
    var date2ms = date2.getTime() - dateutil.tzOffset(date2); // Calculate the difference in milliseconds

    var differencems = date1ms - date2ms; // Convert back to days and return

    return Math.round(differencems / dateutil.ONE_DAY);
  };
  /**
   * @see: <http://docs.python.org/library/datetime.html#datetime.date.toordinal>
   */


  dateutil.toOrdinal = function (date) {
    return dateutil.daysBetween(date, dateutil.ORDINAL_BASE);
  };
  /**
   * @see - <http://docs.python.org/library/datetime.html#datetime.date.fromordinal>
   */


  dateutil.fromOrdinal = function (ordinal) {
    return new Date(dateutil.ORDINAL_BASE.getTime() + ordinal * dateutil.ONE_DAY);
  };

  dateutil.getMonthDays = function (date) {
    var month = date.getUTCMonth();
    return month === 1 && dateutil.isLeapYear(date.getUTCFullYear()) ? 29 : dateutil.MONTH_DAYS[month];
  };
  /**
   * @return {Number} python-like weekday
   */


  dateutil.getWeekday = function (date) {
    return dateutil.PY_WEEKDAYS[date.getUTCDay()];
  };
  /**
   * @see: <http://docs.python.org/library/calendar.html#calendar.monthrange>
   */


  dateutil.monthRange = function (year, month) {
    var date = new Date(Date.UTC(year, month, 1));
    return [dateutil.getWeekday(date), dateutil.getMonthDays(date)];
  };
  /**
   * @see: <http://docs.python.org/library/datetime.html#datetime.datetime.combine>
   */


  dateutil.combine = function (date, time) {
    time = time || date;
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds()));
  };

  dateutil.clone = function (date) {
    var dolly = new Date(date.getTime());
    return dolly;
  };

  dateutil.cloneDates = function (dates) {
    var clones = [];

    for (var i = 0; i < dates.length; i++) {
      clones.push(dateutil.clone(dates[i]));
    }

    return clones;
  };
  /**
   * Sorts an array of Date or dateutil.Time objects
   */


  dateutil.sort = function (dates) {
    dates.sort(function (a, b) {
      return a.getTime() - b.getTime();
    });
  };

  dateutil.timeToUntilString = function (time, utc) {
    if (utc === void 0) {
      utc = true;
    }

    var date = new Date(time);
    return [(0, _helpers.padStart)(date.getUTCFullYear().toString(), 4, '0'), (0, _helpers.padStart)(date.getUTCMonth() + 1, 2, '0'), (0, _helpers.padStart)(date.getUTCDate(), 2, '0'), 'T', (0, _helpers.padStart)(date.getUTCHours(), 2, '0'), (0, _helpers.padStart)(date.getUTCMinutes(), 2, '0'), (0, _helpers.padStart)(date.getUTCSeconds(), 2, '0'), utc ? 'Z' : ''].join('');
  };

  dateutil.untilStringToDate = function (until) {
    var re = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/;
    var bits = re.exec(until);
    if (!bits) throw new Error("Invalid UNTIL value: " + until);
    return new Date(Date.UTC(parseInt(bits[1], 10), parseInt(bits[2], 10) - 1, parseInt(bits[3], 10), parseInt(bits[5], 10) || 0, parseInt(bits[6], 10) || 0, parseInt(bits[7], 10) || 0));
  };

  var Time =
  /** @class */
  function () {
    function Time(hour, minute, second, millisecond) {
      this.hour = hour;
      this.minute = minute;
      this.second = second;
      this.millisecond = millisecond || 0;
    }

    Time.prototype.getHours = function () {
      return this.hour;
    };

    Time.prototype.getMinutes = function () {
      return this.minute;
    };

    Time.prototype.getSeconds = function () {
      return this.second;
    };

    Time.prototype.getMilliseconds = function () {
      return this.millisecond;
    };

    Time.prototype.getTime = function () {
      return (this.hour * 60 * 60 + this.minute * 60 + this.second) * 1000 + this.millisecond;
    };

    return Time;
  }();

  dateutil.Time = Time;

  var DateTime =
  /** @class */
  function (_super) {
    __extends(DateTime, _super);

    function DateTime(year, month, day, hour, minute, second, millisecond) {
      var _this = _super.call(this, hour, minute, second, millisecond) || this;

      _this.year = year;
      _this.month = month;
      _this.day = day;
      return _this;
    }

    DateTime.prototype.getWeekday = function () {
      return dateutil.getWeekday(new Date(this.getTime()));
    };

    DateTime.prototype.getTime = function () {
      return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)).getTime();
    };

    DateTime.prototype.getDay = function () {
      return this.day;
    };

    DateTime.prototype.getMonth = function () {
      return this.month;
    };

    DateTime.prototype.getYear = function () {
      return this.year;
    };

    DateTime.prototype.addYears = function (years) {
      this.year += years;
    };

    DateTime.prototype.addMonths = function (months) {
      this.month += months;

      if (this.month > 12) {
        var yearDiv = Math.floor(this.month / 12);
        var monthMod = (0, _helpers.pymod)(this.month, 12);
        this.month = monthMod;
        this.year += yearDiv;

        if (this.month === 0) {
          this.month = 12;
          --this.year;
        }
      }
    };

    DateTime.prototype.addWeekly = function (days, wkst) {
      if (wkst > this.getWeekday()) {
        this.day += -(this.getWeekday() + 1 + (6 - wkst)) + days * 7;
      } else {
        this.day += -(this.getWeekday() - wkst) + days * 7;
      }

      this.fixDay();
    };

    DateTime.prototype.addDaily = function (days) {
      this.day += days;
      this.fixDay();
    };

    DateTime.prototype.addHours = function (hours, filtered, byhour) {
      var fixday = false;

      if (filtered) {
        // Jump to one iteration before next day
        this.hour += Math.floor((23 - this.hour) / hours) * hours;
      }

      while (true) {
        this.hour += hours;

        var _a = (0, _helpers.divmod)(this.hour, 24),
            dayDiv = _a.div,
            hourMod = _a.mod;

        if (dayDiv) {
          this.hour = hourMod;
          this.addDaily(dayDiv);
          fixday = true;
        }

        if ((0, _helpers.empty)(byhour) || (0, _helpers.includes)(byhour, this.hour)) break;
      }

      return fixday;
    };

    DateTime.prototype.addMinutes = function (minutes, filtered, byhour, byminute) {
      var fixday = false;

      if (filtered) {
        // Jump to one iteration before next day
        this.minute += Math.floor((1439 - (this.hour * 60 + this.minute)) / minutes) * minutes;
      }

      while (true) {
        this.minute += minutes;

        var _a = (0, _helpers.divmod)(this.minute, 60),
            hourDiv = _a.div,
            minuteMod = _a.mod;

        if (hourDiv) {
          this.minute = minuteMod;
          fixday = this.addHours(hourDiv, false, byhour);
        }

        if (((0, _helpers.empty)(byhour) || (0, _helpers.includes)(byhour, this.hour)) && ((0, _helpers.empty)(byminute) || (0, _helpers.includes)(byminute, this.minute))) {
          break;
        }
      }

      return fixday;
    };

    DateTime.prototype.addSeconds = function (seconds, filtered, byhour, byminute, bysecond) {
      var fixday = false;

      if (filtered) {
        // Jump to one iteration before next day
        this.second += Math.floor((86399 - (this.hour * 3600 + this.minute * 60 + this.second)) / seconds) * seconds;
      }

      while (true) {
        this.second += seconds;

        var _a = (0, _helpers.divmod)(this.second, 60),
            minuteDiv = _a.div,
            secondMod = _a.mod;

        if (minuteDiv) {
          this.second = secondMod;
          fixday = this.addMinutes(minuteDiv, false, byhour, byminute);
        }

        if (((0, _helpers.empty)(byhour) || (0, _helpers.includes)(byhour, this.hour)) && ((0, _helpers.empty)(byminute) || (0, _helpers.includes)(byminute, this.minute)) && ((0, _helpers.empty)(bysecond) || (0, _helpers.includes)(bysecond, this.second))) {
          break;
        }
      }

      return fixday;
    };

    DateTime.prototype.fixDay = function () {
      if (this.day <= 28) {
        return;
      }

      var daysinmonth = dateutil.monthRange(this.year, this.month - 1)[1];

      if (this.day <= daysinmonth) {
        return;
      }

      while (this.day > daysinmonth) {
        this.day -= daysinmonth;
        ++this.month;

        if (this.month === 13) {
          this.month = 1;
          ++this.year;

          if (this.year > dateutil.MAXYEAR) {
            return;
          }
        }

        daysinmonth = dateutil.monthRange(this.year, this.month - 1)[1];
      }
    };

    return DateTime;
  }(Time);

  dateutil.DateTime = DateTime;
})(dateutil || (exports.dateutil = dateutil = {}));

var _default = dateutil;
exports.default = _default;
},{"./helpers":"O7gF"}],"hkTT":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WDAYMASK = exports.NMDAY366MASK = exports.NMDAY365MASK = exports.MDAY366MASK = exports.MDAY365MASK = exports.M366RANGE = exports.M366MASK = exports.M365RANGE = exports.M365MASK = void 0;

var _helpers = require("./helpers");

// =============================================================================
// Date masks
// =============================================================================
// Every mask is 7 days longer to handle cross-year weekly periods.
var M365MASK = (0, _helpers.repeat)(1, 31).concat((0, _helpers.repeat)(2, 28), (0, _helpers.repeat)(3, 31), (0, _helpers.repeat)(4, 30), (0, _helpers.repeat)(5, 31), (0, _helpers.repeat)(6, 30), (0, _helpers.repeat)(7, 31), (0, _helpers.repeat)(8, 31), (0, _helpers.repeat)(9, 30), (0, _helpers.repeat)(10, 31), (0, _helpers.repeat)(11, 30), (0, _helpers.repeat)(12, 31), (0, _helpers.repeat)(1, 7));
exports.M365MASK = M365MASK;
var M366MASK = (0, _helpers.repeat)(1, 31).concat((0, _helpers.repeat)(2, 29), (0, _helpers.repeat)(3, 31), (0, _helpers.repeat)(4, 30), (0, _helpers.repeat)(5, 31), (0, _helpers.repeat)(6, 30), (0, _helpers.repeat)(7, 31), (0, _helpers.repeat)(8, 31), (0, _helpers.repeat)(9, 30), (0, _helpers.repeat)(10, 31), (0, _helpers.repeat)(11, 30), (0, _helpers.repeat)(12, 31), (0, _helpers.repeat)(1, 7));
exports.M366MASK = M366MASK;
var M28 = (0, _helpers.range)(1, 29);
var M29 = (0, _helpers.range)(1, 30);
var M30 = (0, _helpers.range)(1, 31);
var M31 = (0, _helpers.range)(1, 32);
var MDAY366MASK = M31.concat(M29, M31, M30, M31, M30, M31, M31, M30, M31, M30, M31, M31.slice(0, 7));
exports.MDAY366MASK = MDAY366MASK;
var MDAY365MASK = M31.concat(M28, M31, M30, M31, M30, M31, M31, M30, M31, M30, M31, M31.slice(0, 7));
exports.MDAY365MASK = MDAY365MASK;
var NM28 = (0, _helpers.range)(-28, 0);
var NM29 = (0, _helpers.range)(-29, 0);
var NM30 = (0, _helpers.range)(-30, 0);
var NM31 = (0, _helpers.range)(-31, 0);
var NMDAY366MASK = NM31.concat(NM29, NM31, NM30, NM31, NM30, NM31, NM31, NM30, NM31, NM30, NM31, NM31.slice(0, 7));
exports.NMDAY366MASK = NMDAY366MASK;
var NMDAY365MASK = NM31.concat(NM28, NM31, NM30, NM31, NM30, NM31, NM31, NM30, NM31, NM30, NM31, NM31.slice(0, 7));
exports.NMDAY365MASK = NMDAY365MASK;
var M366RANGE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
exports.M366RANGE = M366RANGE;
var M365RANGE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
exports.M365RANGE = M365RANGE;

var WDAYMASK = function () {
  var wdaymask = [];

  for (var i = 0; i < 55; i++) wdaymask = wdaymask.concat((0, _helpers.range)(7));

  return wdaymask;
}();

exports.WDAYMASK = WDAYMASK;
},{"./helpers":"O7gF"}],"zJ0F":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _masks = require("./masks");

var _rrule = _interopRequireDefault(require("./rrule"));

var _dateutil = _interopRequireDefault(require("./dateutil"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// =============================================================================
// Iterinfo
// =============================================================================
var Iterinfo =
/** @class */
function () {
  function Iterinfo(rrule) {
    this.yearlen = 365;
    this.nextyearlen = 365;
    this.rrule = rrule;
    this.mmask = null;
    this.mrange = null;
    this.mdaymask = null;
    this.nmdaymask = null;
    this.wdaymask = null;
    this.wnomask = null;
    this.nwdaymask = null;
    this.eastermask = null;
  }

  Iterinfo.prototype.easter = function (y, offset) {
    if (offset === void 0) {
      offset = 0;
    }

    var a = y % 19;
    var b = Math.floor(y / 100);
    var c = y % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = Math.floor(19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = Math.floor(32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = (h + l - 7 * m + 114) % 31 + 1;
    var date = Date.UTC(y, month - 1, day + offset);
    var yearStart = Date.UTC(y, 0, 1);
    return [Math.ceil((date - yearStart) / (1000 * 60 * 60 * 24))];
  };

  Iterinfo.prototype.rebuild = function (year, month) {
    var rr = this.rrule;

    if (year !== this.lastyear) {
      this.rebuildYear(year);
    }

    if ((0, _helpers.notEmpty)(rr.options.bynweekday) && (month !== this.lastmonth || year !== this.lastyear)) {
      this.rebuildMonth(year, month);
    }

    if ((0, _helpers.isPresent)(rr.options.byeaster)) {
      this.eastermask = this.easter(year, rr.options.byeaster);
    }
  };

  Iterinfo.prototype.rebuildYear = function (year) {
    var rr = this.rrule;
    this.yearlen = _dateutil.default.isLeapYear(year) ? 366 : 365;
    this.nextyearlen = _dateutil.default.isLeapYear(year + 1) ? 366 : 365;
    var firstyday = new Date(Date.UTC(year, 0, 1));
    this.yearordinal = _dateutil.default.toOrdinal(firstyday);
    this.yearweekday = _dateutil.default.getWeekday(firstyday);

    var wday = _dateutil.default.getWeekday(firstyday);

    if (this.yearlen === 365) {
      this.mmask = _masks.M365MASK;
      this.mdaymask = _masks.MDAY365MASK;
      this.nmdaymask = _masks.NMDAY365MASK;
      this.wdaymask = _masks.WDAYMASK.slice(wday);
      this.mrange = _masks.M365RANGE;
    } else {
      this.mmask = _masks.M366MASK;
      this.mdaymask = _masks.MDAY366MASK;
      this.nmdaymask = _masks.NMDAY366MASK;
      this.wdaymask = _masks.WDAYMASK.slice(wday);
      this.mrange = _masks.M366RANGE;
    }

    if ((0, _helpers.empty)(rr.options.byweekno)) {
      this.wnomask = null;
    } else {
      this.wnomask = (0, _helpers.repeat)(0, this.yearlen + 7);
      var no1wkst = void 0;
      var firstwkst = void 0;
      var wyearlen = void 0;
      no1wkst = firstwkst = (0, _helpers.pymod)(7 - this.yearweekday + rr.options.wkst, 7);

      if (no1wkst >= 4) {
        no1wkst = 0; // Number of days in the year, plus the days we got
        // from last year.

        wyearlen = this.yearlen + (0, _helpers.pymod)(this.yearweekday - rr.options.wkst, 7);
      } else {
        // Number of days in the year, minus the days we
        // left in last year.
        wyearlen = this.yearlen - no1wkst;
      }

      var div = Math.floor(wyearlen / 7);
      var mod = (0, _helpers.pymod)(wyearlen, 7);
      var numweeks = Math.floor(div + mod / 4);

      for (var j = 0; j < rr.options.byweekno.length; j++) {
        var i = void 0;
        var n = rr.options.byweekno[j];

        if (n < 0) {
          n += numweeks + 1;
        }

        if (!(n > 0 && n <= numweeks)) {
          continue;
        }

        if (n > 1) {
          i = no1wkst + (n - 1) * 7;

          if (no1wkst !== firstwkst) {
            i -= 7 - firstwkst;
          }
        } else {
          i = no1wkst;
        }

        for (var k = 0; k < 7; k++) {
          this.wnomask[i] = 1;
          i++;
          if (this.wdaymask[i] === rr.options.wkst) break;
        }
      }

      if ((0, _helpers.includes)(rr.options.byweekno, 1)) {
        // Check week number 1 of next year as well
        // orig-TODO : Check -numweeks for next year.
        var i = no1wkst + numweeks * 7;
        if (no1wkst !== firstwkst) i -= 7 - firstwkst;

        if (i < this.yearlen) {
          // If week starts in next year, we
          // don't care about it.
          for (var j = 0; j < 7; j++) {
            this.wnomask[i] = 1;
            i += 1;
            if (this.wdaymask[i] === rr.options.wkst) break;
          }
        }
      }

      if (no1wkst) {
        // Check last week number of last year as
        // well. If no1wkst is 0, either the year
        // started on week start, or week number 1
        // got days from last year, so there are no
        // days from last year's last week number in
        // this year.
        var lnumweeks = void 0;

        if (!(0, _helpers.includes)(rr.options.byweekno, -1)) {
          var lyearweekday = _dateutil.default.getWeekday(new Date(Date.UTC(year - 1, 0, 1)));

          var lno1wkst = (0, _helpers.pymod)(7 - lyearweekday.valueOf() + rr.options.wkst, 7);
          var lyearlen = _dateutil.default.isLeapYear(year - 1) ? 366 : 365;

          if (lno1wkst >= 4) {
            lno1wkst = 0;
            lnumweeks = Math.floor(52 + (0, _helpers.pymod)(lyearlen + (0, _helpers.pymod)(lyearweekday - rr.options.wkst, 7), 7) / 4);
          } else {
            lnumweeks = Math.floor(52 + (0, _helpers.pymod)(this.yearlen - no1wkst, 7) / 4);
          }
        } else {
          lnumweeks = -1;
        }

        if ((0, _helpers.includes)(rr.options.byweekno, lnumweeks)) {
          for (var i = 0; i < no1wkst; i++) this.wnomask[i] = 1;
        }
      }
    }
  };

  Iterinfo.prototype.rebuildMonth = function (year, month) {
    var rr = this.rrule;
    var ranges = [];

    if (rr.options.freq === _rrule.default.YEARLY) {
      if ((0, _helpers.notEmpty)(rr.options.bymonth)) {
        for (var j = 0; j < rr.options.bymonth.length; j++) {
          month = rr.options.bymonth[j];
          ranges.push(this.mrange.slice(month - 1, month + 1));
        }
      } else {
        ranges = [[0, this.yearlen]];
      }
    } else if (rr.options.freq === _rrule.default.MONTHLY) {
      ranges = [this.mrange.slice(month - 1, month + 1)];
    }

    if ((0, _helpers.notEmpty)(ranges)) {
      // Weekly frequency won't get here, so we may not
      // care about cross-year weekly periods.
      this.nwdaymask = (0, _helpers.repeat)(0, this.yearlen);

      for (var j = 0; j < ranges.length; j++) {
        var rang = ranges[j];
        var first = rang[0];
        var last = rang[1];
        last -= 1;

        for (var k = 0; k < rr.options.bynweekday.length; k++) {
          var i = void 0;
          var wday = rr.options.bynweekday[k][0];
          var n = rr.options.bynweekday[k][1];

          if (n < 0) {
            i = last + (n + 1) * 7;
            i -= (0, _helpers.pymod)(this.wdaymask[i] - wday, 7);
          } else {
            i = first + (n - 1) * 7;
            i += (0, _helpers.pymod)(7 - this.wdaymask[i] + wday, 7);
          }

          if (first <= i && i <= last) this.nwdaymask[i] = 1;
        }
      }
    }

    this.lastyear = year;
    this.lastmonth = month;
  };

  Iterinfo.prototype.ydayset = function () {
    return [(0, _helpers.range)(this.yearlen), 0, this.yearlen];
  };

  Iterinfo.prototype.mdayset = function (_, month, __) {
    var start = this.mrange[month - 1];
    var end = this.mrange[month];
    var set = (0, _helpers.repeat)(null, this.yearlen);

    for (var i = start; i < end; i++) set[i] = i;

    return [set, start, end];
  };

  Iterinfo.prototype.wdayset = function (year, month, day) {
    // We need to handle cross-year weeks here.
    var set = (0, _helpers.repeat)(null, this.yearlen + 7);
    var i = _dateutil.default.toOrdinal(new Date(Date.UTC(year, month - 1, day))) - this.yearordinal;
    var start = i;

    for (var j = 0; j < 7; j++) {
      set[i] = i;
      ++i;
      if (this.wdaymask[i] === this.rrule.options.wkst) break;
    }

    return [set, start, i];
  };

  Iterinfo.prototype.ddayset = function (year, month, day) {
    var set = (0, _helpers.repeat)(null, this.yearlen);
    var i = _dateutil.default.toOrdinal(new Date(Date.UTC(year, month - 1, day))) - this.yearordinal;
    set[i] = i;
    return [set, i, i + 1];
  };

  Iterinfo.prototype.htimeset = function (hour, minute, second, millisecond) {
    var set = [];
    var rr = this.rrule;

    for (var i = 0; i < rr.options.byminute.length; i++) {
      minute = rr.options.byminute[i];

      for (var j = 0; j < rr.options.bysecond.length; j++) {
        second = rr.options.bysecond[j];
        set.push(new _dateutil.default.Time(hour, minute, second, millisecond));
      }
    }

    _dateutil.default.sort(set);

    return set;
  };

  Iterinfo.prototype.mtimeset = function (hour, minute, second, millisecond) {
    var set = [];
    var rr = this.rrule;

    for (var j = 0; j < rr.options.bysecond.length; j++) {
      second = rr.options.bysecond[j];
      set.push(new _dateutil.default.Time(hour, minute, second, millisecond));
    }

    _dateutil.default.sort(set);

    return set;
  };

  Iterinfo.prototype.stimeset = function (hour, minute, second, millisecond) {
    return [new _dateutil.default.Time(hour, minute, second, millisecond)];
  };

  return Iterinfo;
}();

var _default = Iterinfo;
exports.default = _default;
},{"./masks":"hkTT","./rrule":"adWO","./dateutil":"jBj6","./helpers":"O7gF"}],"Ijgv":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * This class helps us to emulate python's generators, sorta.
 */
var IterResult =
/** @class */
function () {
  function IterResult(method, args) {
    this.minDate = null;
    this.maxDate = null;
    this._result = [];
    this.total = 0;
    this.method = method;
    this.args = args;

    if (method === 'between') {
      this.maxDate = args.inc ? args.before : new Date(args.before.getTime() - 1);
      this.minDate = args.inc ? args.after : new Date(args.after.getTime() + 1);
    } else if (method === 'before') {
      this.maxDate = args.inc ? args.dt : new Date(args.dt.getTime() - 1);
    } else if (method === 'after') {
      this.minDate = args.inc ? args.dt : new Date(args.dt.getTime() + 1);
    }
  }
  /**
   * Possibly adds a date into the result.
   *
   * @param {Date} date - the date isn't necessarly added to the result
   *                      list (if it is too late/too early)
   * @return {Boolean} true if it makes sense to continue the iteration
   *                   false if we're done.
   */


  IterResult.prototype.accept = function (date) {
    ++this.total;
    var tooEarly = this.minDate && date < this.minDate;
    var tooLate = this.maxDate && date > this.maxDate;

    if (this.method === 'between') {
      if (tooEarly) return true;
      if (tooLate) return false;
    } else if (this.method === 'before') {
      if (tooLate) return false;
    } else if (this.method === 'after') {
      if (tooEarly) return true;
      this.add(date);
      return false;
    }

    return this.add(date);
  };
  /**
   *
   * @param {Date} date that is part of the result.
   * @return {Boolean} whether we are interested in more values.
   */


  IterResult.prototype.add = function (date) {
    this._result.push(date);

    return true;
  };
  /**
   * 'before' and 'after' return only one date, whereas 'all'
   * and 'between' an array.
   * @return {Date,Array?}
   */


  IterResult.prototype.getValue = function () {
    var res = this._result;

    switch (this.method) {
      case 'all':
      case 'between':
        return res;

      case 'before':
      case 'after':
        return res.length ? res[res.length - 1] : null;
    }
  };

  IterResult.prototype.clone = function () {
    return new IterResult(this.method, this.args);
  };

  return IterResult;
}();

var _default = IterResult;
exports.default = _default;
},{}],"UdsQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _iterresult = _interopRequireDefault(require("./iterresult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

/**
 * IterResult subclass that calls a callback function on each add,
 * and stops iterating when the callback returns false.
 */
var CallbackIterResult =
/** @class */
function (_super) {
  __extends(CallbackIterResult, _super);

  function CallbackIterResult(method, args, iterator) {
    var _this = _super.call(this, method, args) || this;

    _this.iterator = iterator;
    return _this;
  }

  CallbackIterResult.prototype.add = function (date) {
    if (this.iterator(date, this._result.length)) {
      this._result.push(date);

      return true;
    }

    return false;
  };

  return CallbackIterResult;
}(_iterresult.default);

var _default = CallbackIterResult;
exports.default = _default;
},{"./iterresult":"Ijgv"}],"AXHO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Frequency = void 0;
var Frequency;
exports.Frequency = Frequency;

(function (Frequency) {
  Frequency[Frequency["YEARLY"] = 0] = "YEARLY";
  Frequency[Frequency["MONTHLY"] = 1] = "MONTHLY";
  Frequency[Frequency["WEEKLY"] = 2] = "WEEKLY";
  Frequency[Frequency["DAILY"] = 3] = "DAILY";
  Frequency[Frequency["HOURLY"] = 4] = "HOURLY";
  Frequency[Frequency["MINUTELY"] = 5] = "MINUTELY";
  Frequency[Frequency["SECONDLY"] = 6] = "SECONDLY";
})(Frequency || (exports.Frequency = Frequency = {}));
},{}],"EMzM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Weekday = void 0;
// =============================================================================
// Weekday
// =============================================================================
var WDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

var Weekday =
/** @class */
function () {
  function Weekday(weekday, n) {
    if (n === 0) throw new Error("Can't create weekday with n == 0");
    this.weekday = weekday;
    this.n = n;
  } // __call__ - Cannot call the object directly, do it through
  // e.g. RRule.TH.nth(-1) instead,


  Weekday.prototype.nth = function (n) {
    return this.n === n ? this : new Weekday(this.weekday, n);
  }; // __eq__


  Weekday.prototype.equals = function (other) {
    return this.weekday === other.weekday && this.n === other.n;
  }; // __repr__


  Weekday.prototype.toString = function () {
    var s = WDAYS[this.weekday];
    if (this.n) s = (this.n > 0 ? '+' : '') + String(this.n) + s;
    return s;
  };

  Weekday.prototype.getJsWeekday = function () {
    return this.weekday === 6 ? 0 : this.weekday + 1;
  };

  return Weekday;
}();

exports.Weekday = Weekday;
},{}],"ewSO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeOptions = initializeOptions;
exports.parseOptions = parseOptions;

var _helpers = require("./helpers");

var _rrule = _interopRequireWildcard(require("./rrule"));

var _dateutil = _interopRequireDefault(require("./dateutil"));

var _weekday = require("./weekday");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function initializeOptions(options) {
  var invalid = [];
  var keys = Object.keys(options);
  var initializedOptions = {}; // Shallow copy for options and origOptions and check for invalid

  keys.forEach(function (key) {
    initializedOptions[key] = options[key];
    if (!(0, _helpers.includes)(_rrule.defaultKeys, key)) invalid.push(key);
  });

  if (invalid.length) {
    throw new Error('Invalid options: ' + invalid.join(', '));
  }

  return initializedOptions;
}

function parseOptions(options) {
  var opts = initializeOptions(options);
  var keys = Object.keys(options); // Merge in default options

  _rrule.defaultKeys.forEach(function (key) {
    if (!(0, _helpers.includes)(keys, key)) opts[key] = _rrule.DEFAULT_OPTIONS[key];
  });

  if ((0, _helpers.isPresent)(opts.byeaster)) opts.freq = _rrule.default.YEARLY;

  if (!((0, _helpers.isPresent)(opts.freq) && _rrule.default.FREQUENCIES[opts.freq])) {
    throw new Error("Invalid frequency: " + opts.freq);
  }

  if (!opts.dtstart) opts.dtstart = new Date(new Date().setMilliseconds(0));
  var millisecondModulo = opts.dtstart.getTime() % 1000;

  if (!(0, _helpers.isPresent)(opts.wkst)) {
    opts.wkst = _rrule.default.MO.weekday;
  } else if ((0, _helpers.isNumber)(opts.wkst)) {// cool, just keep it like that
  } else {
    opts.wkst = opts.wkst.weekday;
  }

  if ((0, _helpers.isPresent)(opts.bysetpos)) {
    if ((0, _helpers.isNumber)(opts.bysetpos)) opts.bysetpos = [opts.bysetpos];

    for (var i = 0; i < opts.bysetpos.length; i++) {
      var v = opts.bysetpos[i];

      if (v === 0 || !(v >= -366 && v <= 366)) {
        throw new Error('bysetpos must be between 1 and 366,' + ' or between -366 and -1');
      }
    }
  }

  if (!(Boolean(opts.byweekno) || (0, _helpers.notEmpty)(opts.byweekno) || (0, _helpers.notEmpty)(opts.byyearday) || Boolean(opts.bymonthday) || (0, _helpers.notEmpty)(opts.bymonthday) || (0, _helpers.isPresent)(opts.byweekday) || (0, _helpers.isPresent)(opts.byeaster))) {
    switch (opts.freq) {
      case _rrule.default.YEARLY:
        if (!opts.bymonth) opts.bymonth = opts.dtstart.getUTCMonth() + 1;
        opts.bymonthday = opts.dtstart.getUTCDate();
        break;

      case _rrule.default.MONTHLY:
        opts.bymonthday = opts.dtstart.getUTCDate();
        break;

      case _rrule.default.WEEKLY:
        opts.byweekday = [_dateutil.default.getWeekday(opts.dtstart)];
        break;
    }
  } // bymonth


  if ((0, _helpers.isPresent)(opts.bymonth) && !(0, _helpers.isArray)(opts.bymonth)) {
    opts.bymonth = [opts.bymonth];
  } // byyearday


  if ((0, _helpers.isPresent)(opts.byyearday) && !(0, _helpers.isArray)(opts.byyearday) && (0, _helpers.isNumber)(opts.byyearday)) {
    opts.byyearday = [opts.byyearday];
  } // bymonthday


  if (!(0, _helpers.isPresent)(opts.bymonthday)) {
    opts.bymonthday = [];
    opts.bynmonthday = [];
  } else if ((0, _helpers.isArray)(opts.bymonthday)) {
    var bymonthday = [];
    var bynmonthday = [];

    for (var i = 0; i < opts.bymonthday.length; i++) {
      var v = opts.bymonthday[i];

      if (v > 0) {
        bymonthday.push(v);
      } else if (v < 0) {
        bynmonthday.push(v);
      }
    }

    opts.bymonthday = bymonthday;
    opts.bynmonthday = bynmonthday;
  } else if (opts.bymonthday < 0) {
    opts.bynmonthday = [opts.bymonthday];
    opts.bymonthday = [];
  } else {
    opts.bynmonthday = [];
    opts.bymonthday = [opts.bymonthday];
  } // byweekno


  if ((0, _helpers.isPresent)(opts.byweekno) && !(0, _helpers.isArray)(opts.byweekno)) {
    opts.byweekno = [opts.byweekno];
  } // byweekday / bynweekday


  if (!(0, _helpers.isPresent)(opts.byweekday)) {
    opts.bynweekday = null;
  } else if ((0, _helpers.isNumber)(opts.byweekday)) {
    opts.byweekday = [opts.byweekday];
    opts.bynweekday = null;
  } else if (opts.byweekday instanceof _weekday.Weekday) {
    if (!opts.byweekday.n || opts.freq > _rrule.default.MONTHLY) {
      opts.byweekday = [opts.byweekday.weekday];
      opts.bynweekday = null;
    } else {
      opts.bynweekday = [[opts.byweekday.weekday, opts.byweekday.n]];
      opts.byweekday = null;
    }
  } else {
    var byweekday = [];
    var bynweekday = [];

    for (var i = 0; i < opts.byweekday.length; i++) {
      var wday = opts.byweekday[i];

      if ((0, _helpers.isNumber)(wday)) {
        byweekday.push(wday);
        continue;
      }

      var wd = wday;

      if (!wd.n || opts.freq > _rrule.default.MONTHLY) {
        byweekday.push(wd.weekday);
      } else {
        bynweekday.push([wd.weekday, wd.n]);
      }
    }

    opts.byweekday = (0, _helpers.notEmpty)(byweekday) ? byweekday : null;
    opts.bynweekday = (0, _helpers.notEmpty)(bynweekday) ? bynweekday : null;
  } // byhour


  if (!(0, _helpers.isPresent)(opts.byhour)) {
    opts.byhour = opts.freq < _rrule.default.HOURLY ? [opts.dtstart.getUTCHours()] : null;
  } else if ((0, _helpers.isNumber)(opts.byhour)) {
    opts.byhour = [opts.byhour];
  } // byminute


  if (!(0, _helpers.isPresent)(opts.byminute)) {
    opts.byminute = opts.freq < _rrule.default.MINUTELY ? [opts.dtstart.getUTCMinutes()] : null;
  } else if ((0, _helpers.isNumber)(opts.byminute)) {
    opts.byminute = [opts.byminute];
  } // bysecond


  if (!(0, _helpers.isPresent)(opts.bysecond)) {
    opts.bysecond = opts.freq < _rrule.default.SECONDLY ? [opts.dtstart.getUTCSeconds()] : null;
  } else if ((0, _helpers.isNumber)(opts.bysecond)) {
    opts.bysecond = [opts.bysecond];
  }

  var timeset;

  if (opts.freq >= _rrule.default.HOURLY) {
    timeset = null;
  } else {
    timeset = [];

    for (var i = 0; i < opts.byhour.length; i++) {
      var hour = opts.byhour[i];

      for (var j = 0; j < opts.byminute.length; j++) {
        var minute = opts.byminute[j];

        for (var k = 0; k < opts.bysecond.length; k++) {
          var second = opts.bysecond[k]; // python:
          // datetime.time(hour, minute, second,
          // tzinfo=self._tzinfo))

          timeset.push(new _dateutil.default.Time(hour, minute, second, millisecondModulo));
        }
      }
    }

    _dateutil.default.sort(timeset);
  }

  return {
    parsedOptions: opts,
    timeset: timeset
  };
}
},{"./helpers":"O7gF","./rrule":"adWO","./dateutil":"jBj6","./weekday":"EMzM"}],"FKWL":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseString = parseString;

var _types = require("./types");

var _weekday = require("./weekday");

var _dateutil = _interopRequireDefault(require("./dateutil"));

var _rrule = require("./rrule");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseString(rfcString) {
  rfcString = rfcString.replace(/^\s+|\s+$/, '');
  if (!rfcString.length) return null;
  var options = {};
  var dtstartWithZone = /^DTSTART;TZID=(.+?):([^;]+)$/.exec(rfcString);

  if (dtstartWithZone) {
    var _ = dtstartWithZone[0],
        tzid = dtstartWithZone[1],
        dtstart = dtstartWithZone[2];
    options.tzid = tzid;
    options.dtstart = _dateutil.default.untilStringToDate(dtstart);
    return options;
  }

  var attrs = rfcString.split(';');

  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i].split('=');
    var key = attr[0];
    var value = attr[1];

    switch (key) {
      case 'FREQ':
        options.freq = _types.Frequency[value];
        break;

      case 'WKST':
        options.wkst = _rrule.Days[value];
        break;

      case 'COUNT':
      case 'INTERVAL':
      case 'BYSETPOS':
      case 'BYMONTH':
      case 'BYMONTHDAY':
      case 'BYYEARDAY':
      case 'BYWEEKNO':
      case 'BYHOUR':
      case 'BYMINUTE':
      case 'BYSECOND':
        var num = void 0;

        if (value.indexOf(',') !== -1) {
          var values = value.split(',');
          num = values.map(function (val) {
            if (/^[+-]?\d+$/.test(val.toString())) {
              return Number(val);
            } else {
              return val;
            }
          });
        } else if (/^[+-]?\d+$/.test(value)) {
          num = Number(value);
        } else {
          num = value;
        }

        var optionKey = key.toLowerCase(); // @ts-ignore

        options[optionKey] = num;
        break;

      case 'BYDAY':
        // => byweekday
        var n = void 0;
        var wday = void 0;
        var day = void 0;
        var days = value.split(',');
        options.byweekday = [];

        for (var j = 0; j < days.length; j++) {
          day = days[j];

          if (day.length === 2) {
            // MO, TU, ...
            wday = _rrule.Days[day]; // wday instanceof Weekday

            options.byweekday.push(wday);
          } else {
            // -1MO, +3FR, 1SO, ...
            var parts = day.match(/^([+-]?\d)([A-Z]{2})$/);
            n = Number(parts[1]);
            var wdaypart = parts[2];
            wday = _rrule.Days[wdaypart].weekday;
            options.byweekday.push(new _weekday.Weekday(wday, n));
          }
        }

        break;

      case 'DTSTART':
        options.dtstart = _dateutil.default.untilStringToDate(value);
        break;

      case 'UNTIL':
        options.until = _dateutil.default.untilStringToDate(value);
        break;

      case 'BYEASTER':
        options.byeaster = Number(value);
        break;

      default:
        throw new Error("Unknown RRULE property '" + key + "'");
    }
  }

  return options;
}
},{"./types":"AXHO","./weekday":"EMzM","./dateutil":"jBj6","./rrule":"adWO"}],"C0fI":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optionsToString = optionsToString;

var _rrule = _interopRequireWildcard(require("./rrule"));

var _helpers = require("./helpers");

var _weekday = require("./weekday");

var _dateutil = _interopRequireDefault(require("./dateutil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function optionsToString(options) {
  var pairs = [];
  var keys = Object.keys(options);
  var defaultKeys = Object.keys(_rrule.DEFAULT_OPTIONS);

  for (var i = 0; i < keys.length; i++) {
    if (keys[i] === 'tzid') continue;
    if (!(0, _helpers.includes)(defaultKeys, keys[i])) continue;
    var key = keys[i].toUpperCase();
    var value = options[keys[i]];
    var outValue = '';
    if (!(0, _helpers.isPresent)(value) || (0, _helpers.isArray)(value) && !value.length) continue;

    switch (key) {
      case 'FREQ':
        outValue = _rrule.default.FREQUENCIES[options.freq];
        break;

      case 'WKST':
        if ((0, _helpers.isNumber)(value)) {
          outValue = new _weekday.Weekday(value).toString();
        } else {
          outValue = value.toString();
        }

        break;

      case 'BYWEEKDAY':
        /*
        NOTE: BYWEEKDAY is a special case.
        RRule() deconstructs the rule.options.byweekday array
        into an array of Weekday arguments.
        On the other hand, rule.origOptions is an array of Weekdays.
        We need to handle both cases here.
        It might be worth change RRule to keep the Weekdays.
               Also, BYWEEKDAY (used by RRule) vs. BYDAY (RFC)
               */
        key = 'BYDAY';
        var arrayValue = (0, _helpers.toArray)(value);
        outValue = (0, _helpers.toArray)(value).map(function (wday) {
          if (wday instanceof _weekday.Weekday) {
            return wday;
          } else if ((0, _helpers.isArray)(wday)) {
            return new _weekday.Weekday(wday[0], wday[1]);
          } else {
            return new _weekday.Weekday(wday);
          }
        }).toString();
        break;

      case 'DTSTART':
      case 'UNTIL':
        outValue = _dateutil.default.timeToUntilString(value, !options.tzid);

        if (options.tzid) {
          outValue = ";TZID=" + options.tzid + ":" + outValue;
        }

        break;

      default:
        if ((0, _helpers.isArray)(value)) {
          var strValues = [];

          for (var j = 0; j < value.length; j++) {
            strValues[j] = String(value[j]);
          }

          outValue = strValues.toString();
        } else {
          outValue = String(value);
        }

    }

    pairs.push([key, outValue]);
  }

  var strings = [];

  for (var i = 0; i < pairs.length; i++) {
    var _a = pairs[i],
        key = _a[0],
        value = _a[1];

    if (value.indexOf(';') === 0) {
      strings.push("" + key + value);
    } else {
      strings.push(key + "=" + value.toString());
    }
  }

  return strings.join(';');
}
},{"./rrule":"adWO","./helpers":"O7gF","./weekday":"EMzM","./dateutil":"jBj6"}],"b8OE":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cache = void 0;

var _iterresult = _interopRequireDefault(require("./iterresult"));

var _dateutil = _interopRequireDefault(require("./dateutil"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cache =
/** @class */
function () {
  function Cache() {
    this.all = false;
    this.before = [];
    this.after = [];
    this.between = [];
  }
  /**
   * @param {String} what - all/before/after/between
   * @param {Array,Date} value - an array of dates, one date, or null
   * @param {Object?} args - _iter arguments
   */


  Cache.prototype._cacheAdd = function (what, value, args) {
    if (value) {
      value = value instanceof Date ? _dateutil.default.clone(value) : _dateutil.default.cloneDates(value);
    }

    if (what === 'all') {
      this.all = value;
    } else {
      args._value = value;
      this[what].push(args);
    }
  };
  /**
   * @return false - not in the cache
   *         null  - cached, but zero occurrences (before/after)
   *         Date  - cached (before/after)
   *         []    - cached, but zero occurrences (all/between)
   *         [Date1, DateN] - cached (all/between)
   */


  Cache.prototype._cacheGet = function (what, args) {
    var cached = false;
    var argsKeys = args ? Object.keys(args) : [];

    var findCacheDiff = function (item) {
      for (var i = 0; i < argsKeys.length; i++) {
        var key = argsKeys[i];

        if (String(args[key]) !== String(item[key])) {
          return true;
        }
      }

      return false;
    };

    var cachedObject = this[what];

    if (what === 'all') {
      cached = this.all;
    } else if ((0, _helpers.isArray)(cachedObject)) {
      // Let's see whether we've already called the
      // 'what' method with the same 'args'
      for (var i = 0; i < cachedObject.length; i++) {
        var item = cachedObject[i];
        if (argsKeys.length && findCacheDiff(item)) continue;
        cached = item._value;
        break;
      }
    }

    if (!cached && this.all) {
      // Not in the cache, but we already know all the occurrences,
      // so we can find the correct dates from the cached ones.
      var iterResult = new _iterresult.default(what, args);

      for (var i = 0; i < this.all.length; i++) {
        if (!iterResult.accept(this.all[i])) break;
      }

      cached = iterResult.getValue();

      this._cacheAdd(what, cached, args);
    }

    return (0, _helpers.isArray)(cached) ? _dateutil.default.cloneDates(cached) : cached instanceof Date ? _dateutil.default.clone(cached) : cached;
  };

  return Cache;
}();

exports.Cache = Cache;
},{"./iterresult":"Ijgv","./dateutil":"jBj6","./helpers":"O7gF"}],"eqBM":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o) {
  var i = 0;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  i = o[Symbol.iterator]();
  return i.next.bind(i);
}

// these aren't really private, but nor are they really useful to document

/**
 * @private
 */
var LuxonError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(LuxonError, _Error);

  function LuxonError() {
    return _Error.apply(this, arguments) || this;
  }

  return LuxonError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * @private
 */


var InvalidDateTimeError = /*#__PURE__*/function (_LuxonError) {
  _inheritsLoose(InvalidDateTimeError, _LuxonError);

  function InvalidDateTimeError(reason) {
    return _LuxonError.call(this, "Invalid DateTime: " + reason.toMessage()) || this;
  }

  return InvalidDateTimeError;
}(LuxonError);
/**
 * @private
 */

var InvalidIntervalError = /*#__PURE__*/function (_LuxonError2) {
  _inheritsLoose(InvalidIntervalError, _LuxonError2);

  function InvalidIntervalError(reason) {
    return _LuxonError2.call(this, "Invalid Interval: " + reason.toMessage()) || this;
  }

  return InvalidIntervalError;
}(LuxonError);
/**
 * @private
 */

var InvalidDurationError = /*#__PURE__*/function (_LuxonError3) {
  _inheritsLoose(InvalidDurationError, _LuxonError3);

  function InvalidDurationError(reason) {
    return _LuxonError3.call(this, "Invalid Duration: " + reason.toMessage()) || this;
  }

  return InvalidDurationError;
}(LuxonError);
/**
 * @private
 */

var ConflictingSpecificationError = /*#__PURE__*/function (_LuxonError4) {
  _inheritsLoose(ConflictingSpecificationError, _LuxonError4);

  function ConflictingSpecificationError() {
    return _LuxonError4.apply(this, arguments) || this;
  }

  return ConflictingSpecificationError;
}(LuxonError);
/**
 * @private
 */

var InvalidUnitError = /*#__PURE__*/function (_LuxonError5) {
  _inheritsLoose(InvalidUnitError, _LuxonError5);

  function InvalidUnitError(unit) {
    return _LuxonError5.call(this, "Invalid unit " + unit) || this;
  }

  return InvalidUnitError;
}(LuxonError);
/**
 * @private
 */

var InvalidArgumentError = /*#__PURE__*/function (_LuxonError6) {
  _inheritsLoose(InvalidArgumentError, _LuxonError6);

  function InvalidArgumentError() {
    return _LuxonError6.apply(this, arguments) || this;
  }

  return InvalidArgumentError;
}(LuxonError);
/**
 * @private
 */

var ZoneIsAbstractError = /*#__PURE__*/function (_LuxonError7) {
  _inheritsLoose(ZoneIsAbstractError, _LuxonError7);

  function ZoneIsAbstractError() {
    return _LuxonError7.call(this, "Zone is an abstract class") || this;
  }

  return ZoneIsAbstractError;
}(LuxonError);

/**
 * @private
 */
var n = "numeric",
    s = "short",
    l = "long";
var DATE_SHORT = {
  year: n,
  month: n,
  day: n
};
var DATE_MED = {
  year: n,
  month: s,
  day: n
};
var DATE_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s
};
var DATE_FULL = {
  year: n,
  month: l,
  day: n
};
var DATE_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l
};
var TIME_SIMPLE = {
  hour: n,
  minute: n
};
var TIME_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n
};
var TIME_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var TIME_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
var TIME_24_SIMPLE = {
  hour: n,
  minute: n,
  hour12: false
};
/**
 * {@link toLocaleString}; format like '09:30:23', always 24-hour.
 */

var TIME_24_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n,
  hour12: false
};
/**
 * {@link toLocaleString}; format like '09:30:23 EDT', always 24-hour.
 */

var TIME_24_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hour12: false,
  timeZoneName: s
};
/**
 * {@link toLocaleString}; format like '09:30:23 Eastern Daylight Time', always 24-hour.
 */

var TIME_24_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hour12: false,
  timeZoneName: l
};
/**
 * {@link toLocaleString}; format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
 */

var DATETIME_SHORT = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n
};
/**
 * {@link toLocaleString}; format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
 */

var DATETIME_SHORT_WITH_SECONDS = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n
};
var DATETIME_MED_WITH_SECONDS = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s,
  hour: n,
  minute: n
};
var DATETIME_FULL = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  timeZoneName: s
};
var DATETIME_FULL_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var DATETIME_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  timeZoneName: l
};
var DATETIME_HUGE_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};

/*
  This is just a junk drawer, containing anything used across multiple classes.
  Because Luxon is small(ish), this should stay small and we won't worry about splitting
  it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
*/
/**
 * @private
 */
// TYPES

function isUndefined(o) {
  return typeof o === "undefined";
}
function isNumber(o) {
  return typeof o === "number";
}
function isInteger(o) {
  return typeof o === "number" && o % 1 === 0;
}
function isString(o) {
  return typeof o === "string";
}
function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
} // CAPABILITIES

function hasIntl() {
  try {
    return typeof Intl !== "undefined" && Intl.DateTimeFormat;
  } catch (e) {
    return false;
  }
}
function hasFormatToParts() {
  return !isUndefined(Intl.DateTimeFormat.prototype.formatToParts);
}
function hasRelative() {
  try {
    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
  } catch (e) {
    return false;
  }
} // OBJECTS AND ARRAYS

function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}
function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return undefined;
  }

  return arr.reduce(function (best, next) {
    var pair = [by(next), next];

    if (!best) {
      return pair;
    } else if (compare(best[0], pair[0]) === best[0]) {
      return best;
    } else {
      return pair;
    }
  }, null)[1];
}
function pick(obj, keys) {
  return keys.reduce(function (a, k) {
    a[k] = obj[k];
    return a;
  }, {});
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
} // NUMBERS AND STRINGS

function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
} // x % n but takes the sign of n instead of x

function floorMod(x, n) {
  return x - n * Math.floor(x / n);
}
function padStart(input, n) {
  if (n === void 0) {
    n = 2;
  }

  var minus = input < 0 ? "-" : "";
  var target = minus ? input * -1 : input;
  var result;

  if (target.toString().length < n) {
    result = ("0".repeat(n) + target).slice(-n);
  } else {
    result = target.toString();
  }

  return "" + minus + result;
}
function parseInteger(string) {
  if (isUndefined(string) || string === null || string === "") {
    return undefined;
  } else {
    return parseInt(string, 10);
  }
}
function parseMillis(fraction) {
  // Return undefined (instead of 0) in these cases, where fraction is not set
  if (isUndefined(fraction) || fraction === null || fraction === "") {
    return undefined;
  } else {
    var f = parseFloat("0." + fraction) * 1000;
    return Math.floor(f);
  }
}
function roundTo(number, digits, towardZero) {
  if (towardZero === void 0) {
    towardZero = false;
  }

  var factor = Math.pow(10, digits),
      rounder = towardZero ? Math.trunc : Math.round;
  return rounder(number * factor) / factor;
} // DATE BASICS

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
  var modMonth = floorMod(month - 1, 12) + 1,
      modYear = year + (month - modMonth) / 12;

  if (modMonth === 2) {
    return isLeapYear(modYear) ? 29 : 28;
  } else {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
  }
} // covert a calendar object to a local timestamp (epoch, but with the offset baked in)

function objToLocalTS(obj) {
  var d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond); // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that

  if (obj.year < 100 && obj.year >= 0) {
    d = new Date(d);
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }

  return +d;
}
function weeksInWeekYear(weekYear) {
  var p1 = (weekYear + Math.floor(weekYear / 4) - Math.floor(weekYear / 100) + Math.floor(weekYear / 400)) % 7,
      last = weekYear - 1,
      p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
  return p1 === 4 || p2 === 3 ? 53 : 52;
}
function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else return year > 60 ? 1900 + year : 2000 + year;
} // PARSING

function parseZoneInfo(ts, offsetFormat, locale, timeZone) {
  if (timeZone === void 0) {
    timeZone = null;
  }

  var date = new Date(ts),
      intlOpts = {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };

  if (timeZone) {
    intlOpts.timeZone = timeZone;
  }

  var modified = Object.assign({
    timeZoneName: offsetFormat
  }, intlOpts),
      intl = hasIntl();

  if (intl && hasFormatToParts()) {
    var parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find(function (m) {
      return m.type.toLowerCase() === "timezonename";
    });
    return parsed ? parsed.value : null;
  } else if (intl) {
    // this probably doesn't work for all locales
    var without = new Intl.DateTimeFormat(locale, intlOpts).format(date),
        included = new Intl.DateTimeFormat(locale, modified).format(date),
        diffed = included.substring(without.length),
        trimmed = diffed.replace(/^[, \u200e]+/, "");
    return trimmed;
  } else {
    return null;
  }
} // signedOffset('-5', '30') -> -330

function signedOffset(offHourStr, offMinuteStr) {
  var offHour = parseInt(offHourStr, 10); // don't || this because we want to preserve -0

  if (Number.isNaN(offHour)) {
    offHour = 0;
  }

  var offMin = parseInt(offMinuteStr, 10) || 0,
      offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
} // COERCION

function asNumber(value) {
  var numericValue = Number(value);
  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue)) throw new InvalidArgumentError("Invalid unit value " + value);
  return numericValue;
}
function normalizeObject(obj, normalizer, nonUnitKeys) {
  var normalized = {};

  for (var u in obj) {
    if (hasOwnProperty(obj, u)) {
      if (nonUnitKeys.indexOf(u) >= 0) continue;
      var v = obj[u];
      if (v === undefined || v === null) continue;
      normalized[normalizer(u)] = asNumber(v);
    }
  }

  return normalized;
}
function formatOffset(offset, format) {
  var hours = Math.trunc(Math.abs(offset / 60)),
      minutes = Math.trunc(Math.abs(offset % 60)),
      sign = offset >= 0 ? "+" : "-";

  switch (format) {
    case "short":
      return "" + sign + padStart(hours, 2) + ":" + padStart(minutes, 2);

    case "narrow":
      return "" + sign + hours + (minutes > 0 ? ":" + minutes : "");

    case "techie":
      return "" + sign + padStart(hours, 2) + padStart(minutes, 2);

    default:
      throw new RangeError("Value format " + format + " is out of range for property format");
  }
}
function timeObject(obj) {
  return pick(obj, ["hour", "minute", "second", "millisecond"]);
}
var ianaRegex = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z_+-]{1,256}(\/[A-Za-z_+-]{1,256})?)?/;

function stringify(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}
/**
 * @private
 */


var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function months(length) {
  switch (length) {
    case "narrow":
      return [].concat(monthsNarrow);

    case "short":
      return [].concat(monthsShort);

    case "long":
      return [].concat(monthsLong);

    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    default:
      return null;
  }
}
var weekdaysLong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
function weekdays(length) {
  switch (length) {
    case "narrow":
      return [].concat(weekdaysNarrow);

    case "short":
      return [].concat(weekdaysShort);

    case "long":
      return [].concat(weekdaysLong);

    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];

    default:
      return null;
  }
}
var meridiems = ["AM", "PM"];
var erasLong = ["Before Christ", "Anno Domini"];
var erasShort = ["BC", "AD"];
var erasNarrow = ["B", "A"];
function eras(length) {
  switch (length) {
    case "narrow":
      return [].concat(erasNarrow);

    case "short":
      return [].concat(erasShort);

    case "long":
      return [].concat(erasLong);

    default:
      return null;
  }
}
function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric, narrow) {
  if (numeric === void 0) {
    numeric = "always";
  }

  if (narrow === void 0) {
    narrow = false;
  }

  var units = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  };
  var lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;

  if (numeric === "auto" && lastable) {
    var isDay = unit === "days";

    switch (count) {
      case 1:
        return isDay ? "tomorrow" : "next " + units[unit][0];

      case -1:
        return isDay ? "yesterday" : "last " + units[unit][0];

      case 0:
        return isDay ? "today" : "this " + units[unit][0];

    }
  }

  var isInPast = Object.is(count, -0) || count < 0,
      fmtValue = Math.abs(count),
      singular = fmtValue === 1,
      lilUnits = units[unit],
      fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
  return isInPast ? fmtValue + " " + fmtUnit + " ago" : "in " + fmtValue + " " + fmtUnit;
}
function formatString(knownFormat) {
  // these all have the offsets removed because we don't have access to them
  // without all the intl stuff this is backfilling
  var filtered = pick(knownFormat, ["weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "hour12"]),
      key = stringify(filtered),
      dateTimeHuge = "EEEE, LLLL d, yyyy, h:mm a";

  switch (key) {
    case stringify(DATE_SHORT):
      return "M/d/yyyy";

    case stringify(DATE_MED):
      return "LLL d, yyyy";

    case stringify(DATE_MED_WITH_WEEKDAY):
      return "EEE, LLL d, yyyy";

    case stringify(DATE_FULL):
      return "LLLL d, yyyy";

    case stringify(DATE_HUGE):
      return "EEEE, LLLL d, yyyy";

    case stringify(TIME_SIMPLE):
      return "h:mm a";

    case stringify(TIME_WITH_SECONDS):
      return "h:mm:ss a";

    case stringify(TIME_WITH_SHORT_OFFSET):
      return "h:mm a";

    case stringify(TIME_WITH_LONG_OFFSET):
      return "h:mm a";

    case stringify(TIME_24_SIMPLE):
      return "HH:mm";

    case stringify(TIME_24_WITH_SECONDS):
      return "HH:mm:ss";

    case stringify(TIME_24_WITH_SHORT_OFFSET):
      return "HH:mm";

    case stringify(TIME_24_WITH_LONG_OFFSET):
      return "HH:mm";

    case stringify(DATETIME_SHORT):
      return "M/d/yyyy, h:mm a";

    case stringify(DATETIME_MED):
      return "LLL d, yyyy, h:mm a";

    case stringify(DATETIME_FULL):
      return "LLLL d, yyyy, h:mm a";

    case stringify(DATETIME_HUGE):
      return dateTimeHuge;

    case stringify(DATETIME_SHORT_WITH_SECONDS):
      return "M/d/yyyy, h:mm:ss a";

    case stringify(DATETIME_MED_WITH_SECONDS):
      return "LLL d, yyyy, h:mm:ss a";

    case stringify(DATETIME_MED_WITH_WEEKDAY):
      return "EEE, d LLL yyyy, h:mm a";

    case stringify(DATETIME_FULL_WITH_SECONDS):
      return "LLLL d, yyyy, h:mm:ss a";

    case stringify(DATETIME_HUGE_WITH_SECONDS):
      return "EEEE, LLLL d, yyyy, h:mm:ss a";

    default:
      return dateTimeHuge;
  }
}

function stringifyTokens(splits, tokenToString) {
  var s = "";

  for (var _iterator = _createForOfIteratorHelperLoose(splits), _step; !(_step = _iterator()).done;) {
    var token = _step.value;

    if (token.literal) {
      s += token.val;
    } else {
      s += tokenToString(token.val);
    }
  }

  return s;
}

var _macroTokenToFormatOpts = {
  D: DATE_SHORT,
  DD: DATE_MED,
  DDD: DATE_FULL,
  DDDD: DATE_HUGE,
  t: TIME_SIMPLE,
  tt: TIME_WITH_SECONDS,
  ttt: TIME_WITH_SHORT_OFFSET,
  tttt: TIME_WITH_LONG_OFFSET,
  T: TIME_24_SIMPLE,
  TT: TIME_24_WITH_SECONDS,
  TTT: TIME_24_WITH_SHORT_OFFSET,
  TTTT: TIME_24_WITH_LONG_OFFSET,
  f: DATETIME_SHORT,
  ff: DATETIME_MED,
  fff: DATETIME_FULL,
  ffff: DATETIME_HUGE,
  F: DATETIME_SHORT_WITH_SECONDS,
  FF: DATETIME_MED_WITH_SECONDS,
  FFF: DATETIME_FULL_WITH_SECONDS,
  FFFF: DATETIME_HUGE_WITH_SECONDS
};
/**
 * @private
 */

var Formatter = /*#__PURE__*/function () {
  Formatter.create = function create(locale, opts) {
    if (opts === void 0) {
      opts = {};
    }

    return new Formatter(locale, opts);
  };

  Formatter.parseFormat = function parseFormat(fmt) {
    var current = null,
        currentFull = "",
        bracketed = false;
    var splits = [];

    for (var i = 0; i < fmt.length; i++) {
      var c = fmt.charAt(i);

      if (c === "'") {
        if (currentFull.length > 0) {
          splits.push({
            literal: bracketed,
            val: currentFull
          });
        }

        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c;
      } else if (c === current) {
        currentFull += c;
      } else {
        if (currentFull.length > 0) {
          splits.push({
            literal: false,
            val: currentFull
          });
        }

        currentFull = c;
        current = c;
      }
    }

    if (currentFull.length > 0) {
      splits.push({
        literal: bracketed,
        val: currentFull
      });
    }

    return splits;
  };

  Formatter.macroTokenToFormatOpts = function macroTokenToFormatOpts(token) {
    return _macroTokenToFormatOpts[token];
  };

  function Formatter(locale, formatOpts) {
    this.opts = formatOpts;
    this.loc = locale;
    this.systemLoc = null;
  }

  var _proto = Formatter.prototype;

  _proto.formatWithSystemDefault = function formatWithSystemDefault(dt, opts) {
    if (this.systemLoc === null) {
      this.systemLoc = this.loc.redefaultToSystem();
    }

    var df = this.systemLoc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.format();
  };

  _proto.formatDateTime = function formatDateTime(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.format();
  };

  _proto.formatDateTimeParts = function formatDateTimeParts(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.formatToParts();
  };

  _proto.resolvedOptions = function resolvedOptions(dt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.resolvedOptions();
  };

  _proto.num = function num(n, p) {
    if (p === void 0) {
      p = 0;
    }

    // we get some perf out of doing this here, annoyingly
    if (this.opts.forceSimple) {
      return padStart(n, p);
    }

    var opts = Object.assign({}, this.opts);

    if (p > 0) {
      opts.padTo = p;
    }

    return this.loc.numberFormatter(opts).format(n);
  };

  _proto.formatDateTimeFromString = function formatDateTimeFromString(dt, fmt) {
    var _this = this;

    var knownEnglish = this.loc.listingMode() === "en",
        useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory" && hasFormatToParts(),
        string = function string(opts, extract) {
      return _this.loc.extract(dt, opts, extract);
    },
        formatOffset = function formatOffset(opts) {
      if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
        return "Z";
      }

      return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
    },
        meridiem = function meridiem() {
      return knownEnglish ? meridiemForDateTime(dt) : string({
        hour: "numeric",
        hour12: true
      }, "dayperiod");
    },
        month = function month(length, standalone) {
      return knownEnglish ? monthForDateTime(dt, length) : string(standalone ? {
        month: length
      } : {
        month: length,
        day: "numeric"
      }, "month");
    },
        weekday = function weekday(length, standalone) {
      return knownEnglish ? weekdayForDateTime(dt, length) : string(standalone ? {
        weekday: length
      } : {
        weekday: length,
        month: "long",
        day: "numeric"
      }, "weekday");
    },
        maybeMacro = function maybeMacro(token) {
      var formatOpts = Formatter.macroTokenToFormatOpts(token);

      if (formatOpts) {
        return _this.formatWithSystemDefault(dt, formatOpts);
      } else {
        return token;
      }
    },
        era = function era(length) {
      return knownEnglish ? eraForDateTime(dt, length) : string({
        era: length
      }, "era");
    },
        tokenToString = function tokenToString(token) {
      // Where possible: http://cldr.unicode.org/translation/date-time-1/date-time#TOC-Standalone-vs.-Format-Styles
      switch (token) {
        // ms
        case "S":
          return _this.num(dt.millisecond);

        case "u": // falls through

        case "SSS":
          return _this.num(dt.millisecond, 3);
        // seconds

        case "s":
          return _this.num(dt.second);

        case "ss":
          return _this.num(dt.second, 2);
        // minutes

        case "m":
          return _this.num(dt.minute);

        case "mm":
          return _this.num(dt.minute, 2);
        // hours

        case "h":
          return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);

        case "hh":
          return _this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);

        case "H":
          return _this.num(dt.hour);

        case "HH":
          return _this.num(dt.hour, 2);
        // offset

        case "Z":
          // like +6
          return formatOffset({
            format: "narrow",
            allowZ: _this.opts.allowZ
          });

        case "ZZ":
          // like +06:00
          return formatOffset({
            format: "short",
            allowZ: _this.opts.allowZ
          });

        case "ZZZ":
          // like +0600
          return formatOffset({
            format: "techie",
            allowZ: _this.opts.allowZ
          });

        case "ZZZZ":
          // like EST
          return dt.zone.offsetName(dt.ts, {
            format: "short",
            locale: _this.loc.locale
          });

        case "ZZZZZ":
          // like Eastern Standard Time
          return dt.zone.offsetName(dt.ts, {
            format: "long",
            locale: _this.loc.locale
          });
        // zone

        case "z":
          // like America/New_York
          return dt.zoneName;
        // meridiems

        case "a":
          return meridiem();
        // dates

        case "d":
          return useDateTimeFormatter ? string({
            day: "numeric"
          }, "day") : _this.num(dt.day);

        case "dd":
          return useDateTimeFormatter ? string({
            day: "2-digit"
          }, "day") : _this.num(dt.day, 2);
        // weekdays - standalone

        case "c":
          // like 1
          return _this.num(dt.weekday);

        case "ccc":
          // like 'Tues'
          return weekday("short", true);

        case "cccc":
          // like 'Tuesday'
          return weekday("long", true);

        case "ccccc":
          // like 'T'
          return weekday("narrow", true);
        // weekdays - format

        case "E":
          // like 1
          return _this.num(dt.weekday);

        case "EEE":
          // like 'Tues'
          return weekday("short", false);

        case "EEEE":
          // like 'Tuesday'
          return weekday("long", false);

        case "EEEEE":
          // like 'T'
          return weekday("narrow", false);
        // months - standalone

        case "L":
          // like 1
          return useDateTimeFormatter ? string({
            month: "numeric",
            day: "numeric"
          }, "month") : _this.num(dt.month);

        case "LL":
          // like 01, doesn't seem to work
          return useDateTimeFormatter ? string({
            month: "2-digit",
            day: "numeric"
          }, "month") : _this.num(dt.month, 2);

        case "LLL":
          // like Jan
          return month("short", true);

        case "LLLL":
          // like January
          return month("long", true);

        case "LLLLL":
          // like J
          return month("narrow", true);
        // months - format

        case "M":
          // like 1
          return useDateTimeFormatter ? string({
            month: "numeric"
          }, "month") : _this.num(dt.month);

        case "MM":
          // like 01
          return useDateTimeFormatter ? string({
            month: "2-digit"
          }, "month") : _this.num(dt.month, 2);

        case "MMM":
          // like Jan
          return month("short", false);

        case "MMMM":
          // like January
          return month("long", false);

        case "MMMMM":
          // like J
          return month("narrow", false);
        // years

        case "y":
          // like 2014
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year);

        case "yy":
          // like 14
          return useDateTimeFormatter ? string({
            year: "2-digit"
          }, "year") : _this.num(dt.year.toString().slice(-2), 2);

        case "yyyy":
          // like 0012
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year, 4);

        case "yyyyyy":
          // like 000012
          return useDateTimeFormatter ? string({
            year: "numeric"
          }, "year") : _this.num(dt.year, 6);
        // eras

        case "G":
          // like AD
          return era("short");

        case "GG":
          // like Anno Domini
          return era("long");

        case "GGGGG":
          return era("narrow");

        case "kk":
          return _this.num(dt.weekYear.toString().slice(-2), 2);

        case "kkkk":
          return _this.num(dt.weekYear, 4);

        case "W":
          return _this.num(dt.weekNumber);

        case "WW":
          return _this.num(dt.weekNumber, 2);

        case "o":
          return _this.num(dt.ordinal);

        case "ooo":
          return _this.num(dt.ordinal, 3);

        case "q":
          // like 1
          return _this.num(dt.quarter);

        case "qq":
          // like 01
          return _this.num(dt.quarter, 2);

        case "X":
          return _this.num(Math.floor(dt.ts / 1000));

        case "x":
          return _this.num(dt.ts);

        default:
          return maybeMacro(token);
      }
    };

    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
  };

  _proto.formatDurationFromString = function formatDurationFromString(dur, fmt) {
    var _this2 = this;

    var tokenToField = function tokenToField(token) {
      switch (token[0]) {
        case "S":
          return "millisecond";

        case "s":
          return "second";

        case "m":
          return "minute";

        case "h":
          return "hour";

        case "d":
          return "day";

        case "M":
          return "month";

        case "y":
          return "year";

        default:
          return null;
      }
    },
        tokenToString = function tokenToString(lildur) {
      return function (token) {
        var mapped = tokenToField(token);

        if (mapped) {
          return _this2.num(lildur.get(mapped), token.length);
        } else {
          return token;
        }
      };
    },
        tokens = Formatter.parseFormat(fmt),
        realTokens = tokens.reduce(function (found, _ref) {
      var literal = _ref.literal,
          val = _ref.val;
      return literal ? found : found.concat(val);
    }, []),
        collapsed = dur.shiftTo.apply(dur, realTokens.map(tokenToField).filter(function (t) {
      return t;
    }));

    return stringifyTokens(tokens, tokenToString(collapsed));
  };

  return Formatter;
}();

var Invalid = /*#__PURE__*/function () {
  function Invalid(reason, explanation) {
    this.reason = reason;
    this.explanation = explanation;
  }

  var _proto = Invalid.prototype;

  _proto.toMessage = function toMessage() {
    if (this.explanation) {
      return this.reason + ": " + this.explanation;
    } else {
      return this.reason;
    }
  };

  return Invalid;
}();

/**
 * @interface
 */

var Zone = /*#__PURE__*/function () {
  function Zone() {}

  var _proto = Zone.prototype;

  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  _proto.offsetName = function offsetName(ts, opts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  ;

  _proto.formatOffset = function formatOffset(ts, format) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  ;

  _proto.offset = function offset(ts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  ;

  _proto.equals = function equals(otherZone) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  ;

  _createClass(Zone, [{
    key: "type",

    /**
     * The type of zone
     * @abstract
     * @type {string}
     */
    get: function get() {
      throw new ZoneIsAbstractError();
    }
    /**
     * The name of this zone.
     * @abstract
     * @type {string}
     */

  }, {
    key: "name",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
    /**
     * Returns whether the offset is known to be fixed for the whole year.
     * @abstract
     * @type {boolean}
     */

  }, {
    key: "universal",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
  }, {
    key: "isValid",
    get: function get() {
      throw new ZoneIsAbstractError();
    }
  }]);

  return Zone;
}();

var singleton = null;
/**
 * Represents the local zone for this JavaScript environment.
 * @implements {Zone}
 */

var LocalZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(LocalZone, _Zone);

  function LocalZone() {
    return _Zone.apply(this, arguments) || this;
  }

  var _proto = LocalZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName(ts, _ref) {
    var format = _ref.format,
        locale = _ref.locale;
    return parseZoneInfo(ts, format, locale);
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  ;

  _proto.offset = function offset(ts) {
    return -new Date(ts).getTimezoneOffset();
  }
  /** @override **/
  ;

  _proto.equals = function equals(otherZone) {
    return otherZone.type === "local";
  }
  /** @override **/
  ;

  _createClass(LocalZone, [{
    key: "type",

    /** @override **/
    get: function get() {
      return "local";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      if (hasIntl()) {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
      } else return "local";
    }
    /** @override **/

  }, {
    key: "universal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return true;
    }
  }], [{
    key: "instance",

    /**
     * Get a singleton instance of the local zone
     * @return {LocalZone}
     */
    get: function get() {
      if (singleton === null) {
        singleton = new LocalZone();
      }

      return singleton;
    }
  }]);

  return LocalZone;
}(Zone);

var matchingRegex = RegExp("^" + ianaRegex.source + "$");
var dtfCache = {};

function makeDTF(zone) {
  if (!dtfCache[zone]) {
    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  return dtfCache[zone];
}

var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};

function hackyOffset(dtf, date) {
  var formatted = dtf.format(date).replace(/\u200E/g, ""),
      parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted),
      fMonth = parsed[1],
      fDay = parsed[2],
      fYear = parsed[3],
      fHour = parsed[4],
      fMinute = parsed[5],
      fSecond = parsed[6];
  return [fYear, fMonth, fDay, fHour, fMinute, fSecond];
}

function partsOffset(dtf, date) {
  var formatted = dtf.formatToParts(date),
      filled = [];

  for (var i = 0; i < formatted.length; i++) {
    var _formatted$i = formatted[i],
        type = _formatted$i.type,
        value = _formatted$i.value,
        pos = typeToPos[type];

    if (!isUndefined(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }

  return filled;
}

var ianaZoneCache = {};
/**
 * A zone identified by an IANA identifier, like America/New_York
 * @implements {Zone}
 */

var IANAZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(IANAZone, _Zone);

  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  IANAZone.create = function create(name) {
    if (!ianaZoneCache[name]) {
      ianaZoneCache[name] = new IANAZone(name);
    }

    return ianaZoneCache[name];
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  ;

  IANAZone.resetCache = function resetCache() {
    ianaZoneCache = {};
    dtfCache = {};
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Fantasia/Castle") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @return {boolean}
   */
  ;

  IANAZone.isValidSpecifier = function isValidSpecifier(s) {
    return !!(s && s.match(matchingRegex));
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  ;

  IANAZone.isValidZone = function isValidZone(zone) {
    try {
      new Intl.DateTimeFormat("en-US", {
        timeZone: zone
      }).format();
      return true;
    } catch (e) {
      return false;
    }
  } // Etc/GMT+8 -> -480

  /** @ignore */
  ;

  IANAZone.parseGMTOffset = function parseGMTOffset(specifier) {
    if (specifier) {
      var match = specifier.match(/^Etc\/GMT(0|[+-]\d{1,2})$/i);

      if (match) {
        return -60 * parseInt(match[1]);
      }
    }

    return null;
  };

  function IANAZone(name) {
    var _this;

    _this = _Zone.call(this) || this;
    /** @private **/

    _this.zoneName = name;
    /** @private **/

    _this.valid = IANAZone.isValidZone(name);
    return _this;
  }
  /** @override **/


  var _proto = IANAZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName(ts, _ref) {
    var format = _ref.format,
        locale = _ref.locale;
    return parseZoneInfo(ts, format, locale, this.name);
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  ;

  _proto.offset = function offset(ts) {
    var date = new Date(ts);
    if (isNaN(date)) return NaN;

    var dtf = makeDTF(this.name),
        _ref2 = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date),
        year = _ref2[0],
        month = _ref2[1],
        day = _ref2[2],
        hour = _ref2[3],
        minute = _ref2[4],
        second = _ref2[5],
        adjustedHour = hour === 24 ? 0 : hour;

    var asUTC = objToLocalTS({
      year: year,
      month: month,
      day: day,
      hour: adjustedHour,
      minute: minute,
      second: second,
      millisecond: 0
    });
    var asTS = +date;
    var over = asTS % 1000;
    asTS -= over >= 0 ? over : 1000 + over;
    return (asUTC - asTS) / (60 * 1000);
  }
  /** @override **/
  ;

  _proto.equals = function equals(otherZone) {
    return otherZone.type === "iana" && otherZone.name === this.name;
  }
  /** @override **/
  ;

  _createClass(IANAZone, [{
    key: "type",
    get: function get() {
      return "iana";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      return this.zoneName;
    }
    /** @override **/

  }, {
    key: "universal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.valid;
    }
  }]);

  return IANAZone;
}(Zone);

var singleton$1 = null;
/**
 * A zone with a fixed offset (meaning no DST)
 * @implements {Zone}
 */

var FixedOffsetZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(FixedOffsetZone, _Zone);

  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  FixedOffsetZone.instance = function instance(offset) {
    return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  ;

  FixedOffsetZone.parseSpecifier = function parseSpecifier(s) {
    if (s) {
      var r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);

      if (r) {
        return new FixedOffsetZone(signedOffset(r[1], r[2]));
      }
    }

    return null;
  };

  _createClass(FixedOffsetZone, null, [{
    key: "utcInstance",

    /**
     * Get a singleton instance of UTC
     * @return {FixedOffsetZone}
     */
    get: function get() {
      if (singleton$1 === null) {
        singleton$1 = new FixedOffsetZone(0);
      }

      return singleton$1;
    }
  }]);

  function FixedOffsetZone(offset) {
    var _this;

    _this = _Zone.call(this) || this;
    /** @private **/

    _this.fixed = offset;
    return _this;
  }
  /** @override **/


  var _proto = FixedOffsetZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName() {
    return this.name;
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset$1(ts, format) {
    return formatOffset(this.fixed, format);
  }
  /** @override **/
  ;

  /** @override **/
  _proto.offset = function offset() {
    return this.fixed;
  }
  /** @override **/
  ;

  _proto.equals = function equals(otherZone) {
    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
  }
  /** @override **/
  ;

  _createClass(FixedOffsetZone, [{
    key: "type",
    get: function get() {
      return "fixed";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      return this.fixed === 0 ? "UTC" : "UTC" + formatOffset(this.fixed, "narrow");
    }
  }, {
    key: "universal",
    get: function get() {
      return true;
    }
  }, {
    key: "isValid",
    get: function get() {
      return true;
    }
  }]);

  return FixedOffsetZone;
}(Zone);

/**
 * A zone that failed to parse. You should never need to instantiate this.
 * @implements {Zone}
 */

var InvalidZone = /*#__PURE__*/function (_Zone) {
  _inheritsLoose(InvalidZone, _Zone);

  function InvalidZone(zoneName) {
    var _this;

    _this = _Zone.call(this) || this;
    /**  @private */

    _this.zoneName = zoneName;
    return _this;
  }
  /** @override **/


  var _proto = InvalidZone.prototype;

  /** @override **/
  _proto.offsetName = function offsetName() {
    return null;
  }
  /** @override **/
  ;

  _proto.formatOffset = function formatOffset() {
    return "";
  }
  /** @override **/
  ;

  _proto.offset = function offset() {
    return NaN;
  }
  /** @override **/
  ;

  _proto.equals = function equals() {
    return false;
  }
  /** @override **/
  ;

  _createClass(InvalidZone, [{
    key: "type",
    get: function get() {
      return "invalid";
    }
    /** @override **/

  }, {
    key: "name",
    get: function get() {
      return this.zoneName;
    }
    /** @override **/

  }, {
    key: "universal",
    get: function get() {
      return false;
    }
  }, {
    key: "isValid",
    get: function get() {
      return false;
    }
  }]);

  return InvalidZone;
}(Zone);

/**
 * @private
 */
function normalizeZone(input, defaultZone) {
  var offset;

  if (isUndefined(input) || input === null) {
    return defaultZone;
  } else if (input instanceof Zone) {
    return input;
  } else if (isString(input)) {
    var lowered = input.toLowerCase();
    if (lowered === "local") return defaultZone;else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;else if ((offset = IANAZone.parseGMTOffset(input)) != null) {
      // handle Etc/GMT-4, which V8 chokes on
      return FixedOffsetZone.instance(offset);
    } else if (IANAZone.isValidSpecifier(lowered)) return IANAZone.create(input);else return FixedOffsetZone.parseSpecifier(lowered) || new InvalidZone(input);
  } else if (isNumber(input)) {
    return FixedOffsetZone.instance(input);
  } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
    // This is dumb, but the instanceof check above doesn't seem to really work
    // so we're duck checking it
    return input;
  } else {
    return new InvalidZone(input);
  }
}

var now = function now() {
  return Date.now();
},
    defaultZone = null,
    // not setting this directly to LocalZone.instance bc loading order issues
defaultLocale = null,
    defaultNumberingSystem = null,
    defaultOutputCalendar = null,
    throwOnInvalid = false;
/**
 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
 */


var Settings = /*#__PURE__*/function () {
  function Settings() {}

  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  Settings.resetCaches = function resetCaches() {
    Locale.resetCache();
    IANAZone.resetCache();
  };

  _createClass(Settings, null, [{
    key: "now",

    /**
     * Get the callback for returning the current timestamp.
     * @type {function}
     */
    get: function get() {
      return now;
    }
    /**
     * Set the callback for returning the current timestamp.
     * The function should return a number, which will be interpreted as an Epoch millisecond count
     * @type {function}
     * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
     * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
     */
    ,
    set: function set(n) {
      now = n;
    }
    /**
     * Get the default time zone to create DateTimes in.
     * @type {string}
     */

  }, {
    key: "defaultZoneName",
    get: function get() {
      return Settings.defaultZone.name;
    }
    /**
     * Set the default time zone to create DateTimes in. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(z) {
      if (!z) {
        defaultZone = null;
      } else {
        defaultZone = normalizeZone(z);
      }
    }
    /**
     * Get the default time zone object to create DateTimes in. Does not affect existing instances.
     * @type {Zone}
     */

  }, {
    key: "defaultZone",
    get: function get() {
      return defaultZone || LocalZone.instance;
    }
    /**
     * Get the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */

  }, {
    key: "defaultLocale",
    get: function get() {
      return defaultLocale;
    }
    /**
     * Set the default locale to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(locale) {
      defaultLocale = locale;
    }
    /**
     * Get the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */

  }, {
    key: "defaultNumberingSystem",
    get: function get() {
      return defaultNumberingSystem;
    }
    /**
     * Set the default numbering system to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(numberingSystem) {
      defaultNumberingSystem = numberingSystem;
    }
    /**
     * Get the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */

  }, {
    key: "defaultOutputCalendar",
    get: function get() {
      return defaultOutputCalendar;
    }
    /**
     * Set the default output calendar to create DateTimes with. Does not affect existing instances.
     * @type {string}
     */
    ,
    set: function set(outputCalendar) {
      defaultOutputCalendar = outputCalendar;
    }
    /**
     * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */

  }, {
    key: "throwOnInvalid",
    get: function get() {
      return throwOnInvalid;
    }
    /**
     * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
     * @type {boolean}
     */
    ,
    set: function set(t) {
      throwOnInvalid = t;
    }
  }]);

  return Settings;
}();

var intlDTCache = {};

function getCachedDTF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var key = JSON.stringify([locString, opts]);
  var dtf = intlDTCache[key];

  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache[key] = dtf;
  }

  return dtf;
}

var intlNumCache = {};

function getCachedINF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var key = JSON.stringify([locString, opts]);
  var inf = intlNumCache[key];

  if (!inf) {
    inf = new Intl.NumberFormat(locString, opts);
    intlNumCache[key] = inf;
  }

  return inf;
}

var intlRelCache = {};

function getCachedRTF(locString, opts) {
  if (opts === void 0) {
    opts = {};
  }

  var _opts = opts,
      base = _opts.base,
      cacheKeyOpts = _objectWithoutPropertiesLoose(_opts, ["base"]); // exclude `base` from the options


  var key = JSON.stringify([locString, cacheKeyOpts]);
  var inf = intlRelCache[key];

  if (!inf) {
    inf = new Intl.RelativeTimeFormat(locString, opts);
    intlRelCache[key] = inf;
  }

  return inf;
}

var sysLocaleCache = null;

function systemLocale() {
  if (sysLocaleCache) {
    return sysLocaleCache;
  } else if (hasIntl()) {
    var computedSys = new Intl.DateTimeFormat().resolvedOptions().locale; // node sometimes defaults to "und". Override that because that is dumb

    sysLocaleCache = !computedSys || computedSys === "und" ? "en-US" : computedSys;
    return sysLocaleCache;
  } else {
    sysLocaleCache = "en-US";
    return sysLocaleCache;
  }
}

function parseLocaleString(localeStr) {
  // I really want to avoid writing a BCP 47 parser
  // see, e.g. https://github.com/wooorm/bcp-47
  // Instead, we'll do this:
  // a) if the string has no -u extensions, just leave it alone
  // b) if it does, use Intl to resolve everything
  // c) if Intl fails, try again without the -u
  var uIndex = localeStr.indexOf("-u-");

  if (uIndex === -1) {
    return [localeStr];
  } else {
    var options;
    var smaller = localeStr.substring(0, uIndex);

    try {
      options = getCachedDTF(localeStr).resolvedOptions();
    } catch (e) {
      options = getCachedDTF(smaller).resolvedOptions();
    }

    var _options = options,
        numberingSystem = _options.numberingSystem,
        calendar = _options.calendar; // return the smaller one so that we can append the calendar and numbering overrides to it

    return [smaller, numberingSystem, calendar];
  }
}

function intlConfigString(localeStr, numberingSystem, outputCalendar) {
  if (hasIntl()) {
    if (outputCalendar || numberingSystem) {
      localeStr += "-u";

      if (outputCalendar) {
        localeStr += "-ca-" + outputCalendar;
      }

      if (numberingSystem) {
        localeStr += "-nu-" + numberingSystem;
      }

      return localeStr;
    } else {
      return localeStr;
    }
  } else {
    return [];
  }
}

function mapMonths(f) {
  var ms = [];

  for (var i = 1; i <= 12; i++) {
    var dt = DateTime.utc(2016, i, 1);
    ms.push(f(dt));
  }

  return ms;
}

function mapWeekdays(f) {
  var ms = [];

  for (var i = 1; i <= 7; i++) {
    var dt = DateTime.utc(2016, 11, 13 + i);
    ms.push(f(dt));
  }

  return ms;
}

function listStuff(loc, length, defaultOK, englishFn, intlFn) {
  var mode = loc.listingMode(defaultOK);

  if (mode === "error") {
    return null;
  } else if (mode === "en") {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}

function supportsFastNumbers(loc) {
  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
    return false;
  } else {
    return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || hasIntl() && new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn";
  }
}
/**
 * @private
 */


var PolyNumberFormatter = /*#__PURE__*/function () {
  function PolyNumberFormatter(intl, forceSimple, opts) {
    this.padTo = opts.padTo || 0;
    this.floor = opts.floor || false;

    if (!forceSimple && hasIntl()) {
      var intlOpts = {
        useGrouping: false
      };
      if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
      this.inf = getCachedINF(intl, intlOpts);
    }
  }

  var _proto = PolyNumberFormatter.prototype;

  _proto.format = function format(i) {
    if (this.inf) {
      var fixed = this.floor ? Math.floor(i) : i;
      return this.inf.format(fixed);
    } else {
      // to match the browser's numberformatter defaults
      var _fixed = this.floor ? Math.floor(i) : roundTo(i, 3);

      return padStart(_fixed, this.padTo);
    }
  };

  return PolyNumberFormatter;
}();
/**
 * @private
 */


var PolyDateFormatter = /*#__PURE__*/function () {
  function PolyDateFormatter(dt, intl, opts) {
    this.opts = opts;
    this.hasIntl = hasIntl();
    var z;

    if (dt.zone.universal && this.hasIntl) {
      // UTC-8 or Etc/UTC-8 are not part of tzdata, only Etc/GMT+8 and the like.
      // That is why fixed-offset TZ is set to that unless it is:
      // 1. Representing offset 0 when UTC is used to maintain previous behavior and does not become GMT.
      // 2. Unsupported by the browser:
      //    - some do not support Etc/
      //    - < Etc/GMT-14, > Etc/GMT+12, and 30-minute or 45-minute offsets are not part of tzdata
      var gmtOffset = -1 * (dt.offset / 60);
      var offsetZ = gmtOffset >= 0 ? "Etc/GMT+" + gmtOffset : "Etc/GMT" + gmtOffset;
      var isOffsetZoneSupported = IANAZone.isValidZone(offsetZ);

      if (dt.offset !== 0 && isOffsetZoneSupported) {
        z = offsetZ;
        this.dt = dt;
      } else {
        // Not all fixed-offset zones like Etc/+4:30 are present in tzdata.
        // So we have to make do. Two cases:
        // 1. The format options tell us to show the zone. We can't do that, so the best
        // we can do is format the date in UTC.
        // 2. The format options don't tell us to show the zone. Then we can adjust them
        // the time and tell the formatter to show it to us in UTC, so that the time is right
        // and the bad zone doesn't show up.
        z = "UTC";

        if (opts.timeZoneName) {
          this.dt = dt;
        } else {
          this.dt = dt.offset === 0 ? dt : DateTime.fromMillis(dt.ts + dt.offset * 60 * 1000);
        }
      }
    } else if (dt.zone.type === "local") {
      this.dt = dt;
    } else {
      this.dt = dt;
      z = dt.zone.name;
    }

    if (this.hasIntl) {
      var intlOpts = Object.assign({}, this.opts);

      if (z) {
        intlOpts.timeZone = z;
      }

      this.dtf = getCachedDTF(intl, intlOpts);
    }
  }

  var _proto2 = PolyDateFormatter.prototype;

  _proto2.format = function format() {
    if (this.hasIntl) {
      return this.dtf.format(this.dt.toJSDate());
    } else {
      var tokenFormat = formatString(this.opts),
          loc = Locale.create("en-US");
      return Formatter.create(loc).formatDateTimeFromString(this.dt, tokenFormat);
    }
  };

  _proto2.formatToParts = function formatToParts() {
    if (this.hasIntl && hasFormatToParts()) {
      return this.dtf.formatToParts(this.dt.toJSDate());
    } else {
      // This is kind of a cop out. We actually could do this for English. However, we couldn't do it for intl strings
      // and IMO it's too weird to have an uncanny valley like that
      return [];
    }
  };

  _proto2.resolvedOptions = function resolvedOptions() {
    if (this.hasIntl) {
      return this.dtf.resolvedOptions();
    } else {
      return {
        locale: "en-US",
        numberingSystem: "latn",
        outputCalendar: "gregory"
      };
    }
  };

  return PolyDateFormatter;
}();
/**
 * @private
 */


var PolyRelFormatter = /*#__PURE__*/function () {
  function PolyRelFormatter(intl, isEnglish, opts) {
    this.opts = Object.assign({
      style: "long"
    }, opts);

    if (!isEnglish && hasRelative()) {
      this.rtf = getCachedRTF(intl, opts);
    }
  }

  var _proto3 = PolyRelFormatter.prototype;

  _proto3.format = function format(count, unit) {
    if (this.rtf) {
      return this.rtf.format(count, unit);
    } else {
      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
    }
  };

  _proto3.formatToParts = function formatToParts(count, unit) {
    if (this.rtf) {
      return this.rtf.formatToParts(count, unit);
    } else {
      return [];
    }
  };

  return PolyRelFormatter;
}();
/**
 * @private
 */


var Locale = /*#__PURE__*/function () {
  Locale.fromOpts = function fromOpts(opts) {
    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
  };

  Locale.create = function create(locale, numberingSystem, outputCalendar, defaultToEN) {
    if (defaultToEN === void 0) {
      defaultToEN = false;
    }

    var specifiedLocale = locale || Settings.defaultLocale,
        // the system locale is useful for human readable strings but annoying for parsing/formatting known formats
    localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale()),
        numberingSystemR = numberingSystem || Settings.defaultNumberingSystem,
        outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
    return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
  };

  Locale.resetCache = function resetCache() {
    sysLocaleCache = null;
    intlDTCache = {};
    intlNumCache = {};
    intlRelCache = {};
  };

  Locale.fromObject = function fromObject(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        locale = _ref.locale,
        numberingSystem = _ref.numberingSystem,
        outputCalendar = _ref.outputCalendar;

    return Locale.create(locale, numberingSystem, outputCalendar);
  };

  function Locale(locale, numbering, outputCalendar, specifiedLocale) {
    var _parseLocaleString = parseLocaleString(locale),
        parsedLocale = _parseLocaleString[0],
        parsedNumberingSystem = _parseLocaleString[1],
        parsedOutputCalendar = _parseLocaleString[2];

    this.locale = parsedLocale;
    this.numberingSystem = numbering || parsedNumberingSystem || null;
    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
    this.weekdaysCache = {
      format: {},
      standalone: {}
    };
    this.monthsCache = {
      format: {},
      standalone: {}
    };
    this.meridiemCache = null;
    this.eraCache = {};
    this.specifiedLocale = specifiedLocale;
    this.fastNumbersCached = null;
  }

  var _proto4 = Locale.prototype;

  _proto4.listingMode = function listingMode(defaultOK) {
    if (defaultOK === void 0) {
      defaultOK = true;
    }

    var intl = hasIntl(),
        hasFTP = intl && hasFormatToParts(),
        isActuallyEn = this.isEnglish(),
        hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");

    if (!hasFTP && !(isActuallyEn && hasNoWeirdness) && !defaultOK) {
      return "error";
    } else if (!hasFTP || isActuallyEn && hasNoWeirdness) {
      return "en";
    } else {
      return "intl";
    }
  };

  _proto4.clone = function clone(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return Locale.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, alts.defaultToEN || false);
    }
  };

  _proto4.redefaultToEN = function redefaultToEN(alts) {
    if (alts === void 0) {
      alts = {};
    }

    return this.clone(Object.assign({}, alts, {
      defaultToEN: true
    }));
  };

  _proto4.redefaultToSystem = function redefaultToSystem(alts) {
    if (alts === void 0) {
      alts = {};
    }

    return this.clone(Object.assign({}, alts, {
      defaultToEN: false
    }));
  };

  _proto4.months = function months$1(length, format, defaultOK) {
    var _this = this;

    if (format === void 0) {
      format = false;
    }

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, length, defaultOK, months, function () {
      var intl = format ? {
        month: length,
        day: "numeric"
      } : {
        month: length
      },
          formatStr = format ? "format" : "standalone";

      if (!_this.monthsCache[formatStr][length]) {
        _this.monthsCache[formatStr][length] = mapMonths(function (dt) {
          return _this.extract(dt, intl, "month");
        });
      }

      return _this.monthsCache[formatStr][length];
    });
  };

  _proto4.weekdays = function weekdays$1(length, format, defaultOK) {
    var _this2 = this;

    if (format === void 0) {
      format = false;
    }

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, length, defaultOK, weekdays, function () {
      var intl = format ? {
        weekday: length,
        year: "numeric",
        month: "long",
        day: "numeric"
      } : {
        weekday: length
      },
          formatStr = format ? "format" : "standalone";

      if (!_this2.weekdaysCache[formatStr][length]) {
        _this2.weekdaysCache[formatStr][length] = mapWeekdays(function (dt) {
          return _this2.extract(dt, intl, "weekday");
        });
      }

      return _this2.weekdaysCache[formatStr][length];
    });
  };

  _proto4.meridiems = function meridiems$1(defaultOK) {
    var _this3 = this;

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, undefined, defaultOK, function () {
      return meridiems;
    }, function () {
      // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
      // for AM and PM. This is probably wrong, but it's makes parsing way easier.
      if (!_this3.meridiemCache) {
        var intl = {
          hour: "numeric",
          hour12: true
        };
        _this3.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(function (dt) {
          return _this3.extract(dt, intl, "dayperiod");
        });
      }

      return _this3.meridiemCache;
    });
  };

  _proto4.eras = function eras$1(length, defaultOK) {
    var _this4 = this;

    if (defaultOK === void 0) {
      defaultOK = true;
    }

    return listStuff(this, length, defaultOK, eras, function () {
      var intl = {
        era: length
      }; // This is problematic. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
      // to definitely enumerate them.

      if (!_this4.eraCache[length]) {
        _this4.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map(function (dt) {
          return _this4.extract(dt, intl, "era");
        });
      }

      return _this4.eraCache[length];
    });
  };

  _proto4.extract = function extract(dt, intlOpts, field) {
    var df = this.dtFormatter(dt, intlOpts),
        results = df.formatToParts(),
        matching = results.find(function (m) {
      return m.type.toLowerCase() === field;
    });
    return matching ? matching.value : null;
  };

  _proto4.numberFormatter = function numberFormatter(opts) {
    if (opts === void 0) {
      opts = {};
    }

    // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
    // (in contrast, the rest of the condition is used heavily)
    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
  };

  _proto4.dtFormatter = function dtFormatter(dt, intlOpts) {
    if (intlOpts === void 0) {
      intlOpts = {};
    }

    return new PolyDateFormatter(dt, this.intl, intlOpts);
  };

  _proto4.relFormatter = function relFormatter(opts) {
    if (opts === void 0) {
      opts = {};
    }

    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
  };

  _proto4.isEnglish = function isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || hasIntl() && new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  };

  _proto4.equals = function equals(other) {
    return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
  };

  _createClass(Locale, [{
    key: "fastNumbers",
    get: function get() {
      if (this.fastNumbersCached == null) {
        this.fastNumbersCached = supportsFastNumbers(this);
      }

      return this.fastNumbersCached;
    }
  }]);

  return Locale;
}();

/*
 * This file handles parsing for well-specified formats. Here's how it works:
 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
 */

function combineRegexes() {
  for (var _len = arguments.length, regexes = new Array(_len), _key = 0; _key < _len; _key++) {
    regexes[_key] = arguments[_key];
  }

  var full = regexes.reduce(function (f, r) {
    return f + r.source;
  }, "");
  return RegExp("^" + full + "$");
}

function combineExtractors() {
  for (var _len2 = arguments.length, extractors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    extractors[_key2] = arguments[_key2];
  }

  return function (m) {
    return extractors.reduce(function (_ref, ex) {
      var mergedVals = _ref[0],
          mergedZone = _ref[1],
          cursor = _ref[2];

      var _ex = ex(m, cursor),
          val = _ex[0],
          zone = _ex[1],
          next = _ex[2];

      return [Object.assign(mergedVals, val), mergedZone || zone, next];
    }, [{}, null, 1]).slice(0, 2);
  };
}

function parse(s) {
  if (s == null) {
    return [null, null];
  }

  for (var _len3 = arguments.length, patterns = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    patterns[_key3 - 1] = arguments[_key3];
  }

  for (var _i = 0, _patterns = patterns; _i < _patterns.length; _i++) {
    var _patterns$_i = _patterns[_i],
        regex = _patterns$_i[0],
        extractor = _patterns$_i[1];
    var m = regex.exec(s);

    if (m) {
      return extractor(m);
    }
  }

  return [null, null];
}

function simpleParse() {
  for (var _len4 = arguments.length, keys = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    keys[_key4] = arguments[_key4];
  }

  return function (match, cursor) {
    var ret = {};
    var i;

    for (i = 0; i < keys.length; i++) {
      ret[keys[i]] = parseInteger(match[cursor + i]);
    }

    return [ret, null, cursor + i];
  };
} // ISO and SQL parsing


var offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
    isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
    isoTimeRegex = RegExp("" + isoTimeBaseRegex.source + offsetRegex.source + "?"),
    isoTimeExtensionRegex = RegExp("(?:T" + isoTimeRegex.source + ")?"),
    isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,
    isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/,
    isoOrdinalRegex = /(\d{4})-?(\d{3})/,
    extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay"),
    extractISOOrdinalData = simpleParse("year", "ordinal"),
    sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/,
    // dumbed-down version of the ISO one
sqlTimeRegex = RegExp(isoTimeBaseRegex.source + " ?(?:" + offsetRegex.source + "|(" + ianaRegex.source + "))?"),
    sqlTimeExtensionRegex = RegExp("(?: " + sqlTimeRegex.source + ")?");

function int(match, pos, fallback) {
  var m = match[pos];
  return isUndefined(m) ? fallback : parseInteger(m);
}

function extractISOYmd(match, cursor) {
  var item = {
    year: int(match, cursor),
    month: int(match, cursor + 1, 1),
    day: int(match, cursor + 2, 1)
  };
  return [item, null, cursor + 3];
}

function extractISOTime(match, cursor) {
  var item = {
    hours: int(match, cursor, 0),
    minutes: int(match, cursor + 1, 0),
    seconds: int(match, cursor + 2, 0),
    milliseconds: parseMillis(match[cursor + 3])
  };
  return [item, null, cursor + 4];
}

function extractISOOffset(match, cursor) {
  var local = !match[cursor] && !match[cursor + 1],
      fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]),
      zone = local ? null : FixedOffsetZone.instance(fullOffset);
  return [{}, zone, cursor + 3];
}

function extractIANAZone(match, cursor) {
  var zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
  return [{}, zone, cursor + 1];
} // ISO time parsing


var isoTimeOnly = RegExp("^T?" + isoTimeBaseRegex.source + "$"); // ISO duration parsing

var isoDuration = /^-?P(?:(?:(-?\d{1,9})Y)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})W)?(?:(-?\d{1,9})D)?(?:T(?:(-?\d{1,9})H)?(?:(-?\d{1,9})M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,9}))?S)?)?)$/;

function extractISODuration(match) {
  var s = match[0],
      yearStr = match[1],
      monthStr = match[2],
      weekStr = match[3],
      dayStr = match[4],
      hourStr = match[5],
      minuteStr = match[6],
      secondStr = match[7],
      millisecondsStr = match[8];
  var hasNegativePrefix = s[0] === "-";
  var negativeSeconds = secondStr && secondStr[0] === "-";

  var maybeNegate = function maybeNegate(num, force) {
    if (force === void 0) {
      force = false;
    }

    return num !== undefined && (force || num && hasNegativePrefix) ? -num : num;
  };

  return [{
    years: maybeNegate(parseInteger(yearStr)),
    months: maybeNegate(parseInteger(monthStr)),
    weeks: maybeNegate(parseInteger(weekStr)),
    days: maybeNegate(parseInteger(dayStr)),
    hours: maybeNegate(parseInteger(hourStr)),
    minutes: maybeNegate(parseInteger(minuteStr)),
    seconds: maybeNegate(parseInteger(secondStr), secondStr === "-0"),
    milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
  }];
} // These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
// and not just that we're in -240 *right now*. But since I don't think these are used that often
// I'm just going to ignore that


var obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};

function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  var result = {
    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
    month: monthsShort.indexOf(monthStr) + 1,
    day: parseInteger(dayStr),
    hour: parseInteger(hourStr),
    minute: parseInteger(minuteStr)
  };
  if (secondStr) result.second = parseInteger(secondStr);

  if (weekdayStr) {
    result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
  }

  return result;
} // RFC 2822/5322


var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

function extractRFC2822(match) {
  var weekdayStr = match[1],
      dayStr = match[2],
      monthStr = match[3],
      yearStr = match[4],
      hourStr = match[5],
      minuteStr = match[6],
      secondStr = match[7],
      obsOffset = match[8],
      milOffset = match[9],
      offHourStr = match[10],
      offMinuteStr = match[11],
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  var offset;

  if (obsOffset) {
    offset = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset = 0;
  } else {
    offset = signedOffset(offHourStr, offMinuteStr);
  }

  return [result, new FixedOffsetZone(offset)];
}

function preprocessRFC2822(s) {
  // Remove comments and folding whitespace and replace multiple-spaces with a single space
  return s.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
} // http date


var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
    rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
    ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

function extractRFC1123Or850(match) {
  var weekdayStr = match[1],
      dayStr = match[2],
      monthStr = match[3],
      yearStr = match[4],
      hourStr = match[5],
      minuteStr = match[6],
      secondStr = match[7],
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}

function extractASCII(match) {
  var weekdayStr = match[1],
      monthStr = match[2],
      dayStr = match[3],
      hourStr = match[4],
      minuteStr = match[5],
      secondStr = match[6],
      yearStr = match[7],
      result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}

var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
var extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset);
var extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset);
var extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset);
var extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset);
/**
 * @private
 */

function parseISODate(s) {
  return parse(s, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
}
function parseRFC2822Date(s) {
  return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
}
function parseHTTPDate(s) {
  return parse(s, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
}
function parseISODuration(s) {
  return parse(s, [isoDuration, extractISODuration]);
}
var extractISOTimeOnly = combineExtractors(extractISOTime);
function parseISOTimeOnly(s) {
  return parse(s, [isoTimeOnly, extractISOTimeOnly]);
}
var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
var extractISOYmdTimeOffsetAndIANAZone = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
var extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
function parseSQL(s) {
  return parse(s, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeOffsetAndIANAZone], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
}

var INVALID = "Invalid Duration"; // unit conversion constants

var lowOrderMatrix = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1000
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1000
  },
  hours: {
    minutes: 60,
    seconds: 60 * 60,
    milliseconds: 60 * 60 * 1000
  },
  minutes: {
    seconds: 60,
    milliseconds: 60 * 1000
  },
  seconds: {
    milliseconds: 1000
  }
},
    casualMatrix = Object.assign({
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1000
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1000
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1000
  }
}, lowOrderMatrix),
    daysInYearAccurate = 146097.0 / 400,
    daysInMonthAccurate = 146097.0 / 4800,
    accurateMatrix = Object.assign({
  years: {
    quarters: 4,
    months: 12,
    weeks: daysInYearAccurate / 7,
    days: daysInYearAccurate,
    hours: daysInYearAccurate * 24,
    minutes: daysInYearAccurate * 24 * 60,
    seconds: daysInYearAccurate * 24 * 60 * 60,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000
  },
  quarters: {
    months: 3,
    weeks: daysInYearAccurate / 28,
    days: daysInYearAccurate / 4,
    hours: daysInYearAccurate * 24 / 4,
    minutes: daysInYearAccurate * 24 * 60 / 4,
    seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000 / 4
  },
  months: {
    weeks: daysInMonthAccurate / 7,
    days: daysInMonthAccurate,
    hours: daysInMonthAccurate * 24,
    minutes: daysInMonthAccurate * 24 * 60,
    seconds: daysInMonthAccurate * 24 * 60 * 60,
    milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000
  }
}, lowOrderMatrix); // units ordered by size

var orderedUnits = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
var reverseUnits = orderedUnits.slice(0).reverse(); // clone really means "create another instance just like this one, but with these changes"

function clone(dur, alts, clear) {
  if (clear === void 0) {
    clear = false;
  }

  // deep merge for vals
  var conf = {
    values: clear ? alts.values : Object.assign({}, dur.values, alts.values || {}),
    loc: dur.loc.clone(alts.loc),
    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
  };
  return new Duration(conf);
}

function antiTrunc(n) {
  return n < 0 ? Math.floor(n) : Math.ceil(n);
} // NB: mutates parameters


function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
  var conv = matrix[toUnit][fromUnit],
      raw = fromMap[fromUnit] / conv,
      sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]),
      // ok, so this is wild, but see the matrix in the tests
  added = !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
  toMap[toUnit] += added;
  fromMap[fromUnit] -= added * conv;
} // NB: mutates parameters


function normalizeValues(matrix, vals) {
  reverseUnits.reduce(function (previous, current) {
    if (!isUndefined(vals[current])) {
      if (previous) {
        convert(matrix, vals, previous, vals, current);
      }

      return current;
    } else {
      return previous;
    }
  }, null);
}
/**
 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime.plus} to add a Duration object to a DateTime, producing another DateTime.
 *
 * Here is a brief overview of commonly used methods and getters in Duration:
 *
 * * **Creation** To create a Duration, use {@link Duration.fromMillis}, {@link Duration.fromObject}, or {@link Duration.fromISO}.
 * * **Unit values** See the {@link Duration.years}, {@link Duration.months}, {@link Duration.weeks}, {@link Duration.days}, {@link Duration.hours}, {@link Duration.minutes}, {@link Duration.seconds}, {@link Duration.milliseconds} accessors.
 * * **Configuration** See  {@link Duration.locale} and {@link Duration.numberingSystem} accessors.
 * * **Transformation** To create new Durations out of old ones use {@link Duration.plus}, {@link Duration.minus}, {@link Duration.normalize}, {@link Duration.set}, {@link Duration.reconfigure}, {@link Duration.shiftTo}, and {@link Duration.negate}.
 * * **Output** To convert the Duration into other representations, see {@link Duration.as}, {@link Duration.toISO}, {@link Duration.toFormat}, and {@link Duration.toJSON}
 *
 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
 */


var Duration = /*#__PURE__*/function () {
  /**
   * @private
   */
  function Duration(config) {
    var accurate = config.conversionAccuracy === "longterm" || false;
    /**
     * @access private
     */

    this.values = config.values;
    /**
     * @access private
     */

    this.loc = config.loc || Locale.create();
    /**
     * @access private
     */

    this.conversionAccuracy = accurate ? "longterm" : "casual";
    /**
     * @access private
     */

    this.invalid = config.invalid || null;
    /**
     * @access private
     */

    this.matrix = accurate ? accurateMatrix : casualMatrix;
    /**
     * @access private
     */

    this.isLuxonDuration = true;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */


  Duration.fromMillis = function fromMillis(count, opts) {
    return Duration.fromObject(Object.assign({
      milliseconds: count
    }, opts));
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {string} [obj.locale='en-US'] - the locale to use
   * @param {string} obj.numberingSystem - the numbering system to use
   * @param {string} [obj.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  ;

  Duration.fromObject = function fromObject(obj) {
    if (obj == null || typeof obj !== "object") {
      throw new InvalidArgumentError("Duration.fromObject: argument expected to be an object, got " + (obj === null ? "null" : typeof obj));
    }

    return new Duration({
      values: normalizeObject(obj, Duration.normalizeUnit, ["locale", "numberingSystem", "conversionAccuracy", "zone" // a bit of debt; it's super inconvenient internally not to be able to blindly pass this
      ]),
      loc: Locale.fromObject(obj),
      conversionAccuracy: obj.conversionAccuracy
    });
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  ;

  Duration.fromISO = function fromISO(text, opts) {
    var _parseISODuration = parseISODuration(text),
        parsed = _parseISODuration[0];

    if (parsed) {
      var obj = Object.assign(parsed, opts);
      return Duration.fromObject(obj);
    } else {
      return Duration.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
    }
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  ;

  Duration.fromISOTime = function fromISOTime(text, opts) {
    var _parseISOTimeOnly = parseISOTimeOnly(text),
        parsed = _parseISOTimeOnly[0];

    if (parsed) {
      var obj = Object.assign(parsed, opts);
      return Duration.fromObject(obj);
    } else {
      return Duration.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
    }
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  ;

  Duration.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }

    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
    }

    var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidDurationError(invalid);
    } else {
      return new Duration({
        invalid: invalid
      });
    }
  }
  /**
   * @private
   */
  ;

  Duration.normalizeUnit = function normalizeUnit(unit) {
    var normalized = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[unit ? unit.toLowerCase() : unit];
    if (!normalized) throw new InvalidUnitError(unit);
    return normalized;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  ;

  Duration.isDuration = function isDuration(o) {
    return o && o.isLuxonDuration || false;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  ;

  var _proto = Duration.prototype;

  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * The duration will be converted to the set of units in the format string using {@link Duration.shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  _proto.toFormat = function toFormat(fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    // reverse-compat since 1.2; we always round down now, never up, and we do it by default
    var fmtOpts = Object.assign({}, opts, {
      floor: opts.round !== false && opts.floor !== false
    });
    return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID;
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  ;

  _proto.toObject = function toObject(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) return {};
    var base = Object.assign({}, this.values);

    if (opts.includeConfig) {
      base.conversionAccuracy = this.conversionAccuracy;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }

    return base;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  ;

  _proto.toISO = function toISO() {
    // we could use the formatter, but this is an easier way to get the minimum string
    if (!this.isValid) return null;
    var s = "P";
    if (this.years !== 0) s += this.years + "Y";
    if (this.months !== 0 || this.quarters !== 0) s += this.months + this.quarters * 3 + "M";
    if (this.weeks !== 0) s += this.weeks + "W";
    if (this.days !== 0) s += this.days + "D";
    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) s += "T";
    if (this.hours !== 0) s += this.hours + "H";
    if (this.minutes !== 0) s += this.minutes + "M";
    if (this.seconds !== 0 || this.milliseconds !== 0) // this will handle "floating point madness" by removing extra decimal places
      // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
      s += roundTo(this.seconds + this.milliseconds / 1000, 3) + "S";
    if (s === "P") s += "T0S";
    return s;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  ;

  _proto.toISOTime = function toISOTime(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) return null;
    var millis = this.toMillis();
    if (millis < 0 || millis >= 86400000) return null;
    opts = Object.assign({
      suppressMilliseconds: false,
      suppressSeconds: false,
      includePrefix: false,
      format: "extended"
    }, opts);
    var value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
    var fmt = opts.format === "basic" ? "hhmm" : "hh:mm";

    if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
      fmt += opts.format === "basic" ? "ss" : ":ss";

      if (!opts.suppressMilliseconds || value.milliseconds !== 0) {
        fmt += ".SSS";
      }
    }

    var str = value.toFormat(fmt);

    if (opts.includePrefix) {
      str = "T" + str;
    }

    return str;
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  ;

  _proto.toJSON = function toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    return this.toISO();
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  ;

  _proto.toMillis = function toMillis() {
    return this.as("milliseconds");
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  ;

  _proto.valueOf = function valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  ;

  _proto.plus = function plus(duration) {
    if (!this.isValid) return this;
    var dur = friendlyDuration(duration),
        result = {};

    for (var _iterator = _createForOfIteratorHelperLoose(orderedUnits), _step; !(_step = _iterator()).done;) {
      var k = _step.value;

      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
        result[k] = dur.get(k) + this.get(k);
      }
    }

    return clone(this, {
      values: result
    }, true);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  ;

  _proto.minus = function minus(duration) {
    if (!this.isValid) return this;
    var dur = friendlyDuration(duration);
    return this.plus(dur.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnit(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnit((x, u) => u === "hour" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  ;

  _proto.mapUnits = function mapUnits(fn) {
    if (!this.isValid) return this;
    var result = {};

    for (var _i = 0, _Object$keys = Object.keys(this.values); _i < _Object$keys.length; _i++) {
      var k = _Object$keys[_i];
      result[k] = asNumber(fn(this.values[k], k));
    }

    return clone(this, {
      values: result
    }, true);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  ;

  _proto.get = function get(unit) {
    return this[Duration.normalizeUnit(unit)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  ;

  _proto.set = function set(values) {
    if (!this.isValid) return this;
    var mixed = Object.assign(this.values, normalizeObject(values, Duration.normalizeUnit, []));
    return clone(this, {
      values: mixed
    });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  ;

  _proto.reconfigure = function reconfigure(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        locale = _ref.locale,
        numberingSystem = _ref.numberingSystem,
        conversionAccuracy = _ref.conversionAccuracy;

    var loc = this.loc.clone({
      locale: locale,
      numberingSystem: numberingSystem
    }),
        opts = {
      loc: loc
    };

    if (conversionAccuracy) {
      opts.conversionAccuracy = conversionAccuracy;
    }

    return clone(this, opts);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  ;

  _proto.as = function as(unit) {
    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @return {Duration}
   */
  ;

  _proto.normalize = function normalize() {
    if (!this.isValid) return this;
    var vals = this.toObject();
    normalizeValues(this.matrix, vals);
    return clone(this, {
      values: vals
    }, true);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  ;

  _proto.shiftTo = function shiftTo() {
    for (var _len = arguments.length, units = new Array(_len), _key = 0; _key < _len; _key++) {
      units[_key] = arguments[_key];
    }

    if (!this.isValid) return this;

    if (units.length === 0) {
      return this;
    }

    units = units.map(function (u) {
      return Duration.normalizeUnit(u);
    });
    var built = {},
        accumulated = {},
        vals = this.toObject();
    var lastUnit;

    for (var _iterator2 = _createForOfIteratorHelperLoose(orderedUnits), _step2; !(_step2 = _iterator2()).done;) {
      var k = _step2.value;

      if (units.indexOf(k) >= 0) {
        lastUnit = k;
        var own = 0; // anything we haven't boiled down yet should get boiled to this unit

        for (var ak in accumulated) {
          own += this.matrix[ak][k] * accumulated[ak];
          accumulated[ak] = 0;
        } // plus anything that's already in this unit


        if (isNumber(vals[k])) {
          own += vals[k];
        }

        var i = Math.trunc(own);
        built[k] = i;
        accumulated[k] = own - i; // we'd like to absorb these fractions in another unit
        // plus anything further down the chain that should be rolled up in to this

        for (var down in vals) {
          if (orderedUnits.indexOf(down) > orderedUnits.indexOf(k)) {
            convert(this.matrix, vals, down, built, k);
          }
        } // otherwise, keep it in the wings to boil it later

      } else if (isNumber(vals[k])) {
        accumulated[k] = vals[k];
      }
    } // anything leftover becomes the decimal for the last unit
    // lastUnit must be defined since units is not empty


    for (var key in accumulated) {
      if (accumulated[key] !== 0) {
        built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
      }
    }

    return clone(this, {
      values: built
    }, true).normalize();
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  ;

  _proto.negate = function negate() {
    if (!this.isValid) return this;
    var negated = {};

    for (var _i2 = 0, _Object$keys2 = Object.keys(this.values); _i2 < _Object$keys2.length; _i2++) {
      var k = _Object$keys2[_i2];
      negated[k] = -this.values[k];
    }

    return clone(this, {
      values: negated
    }, true);
  }
  /**
   * Get the years.
   * @type {number}
   */
  ;

  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  _proto.equals = function equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }

    if (!this.loc.equals(other.loc)) {
      return false;
    }

    function eq(v1, v2) {
      // Consider 0 and undefined as equal
      if (v1 === undefined || v1 === 0) return v2 === undefined || v2 === 0;
      return v1 === v2;
    }

    for (var _iterator3 = _createForOfIteratorHelperLoose(orderedUnits), _step3; !(_step3 = _iterator3()).done;) {
      var u = _step3.value;

      if (!eq(this.values[u], other.values[u])) {
        return false;
      }
    }

    return true;
  };

  _createClass(Duration, [{
    key: "locale",
    get: function get() {
      return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
     *
     * @type {string}
     */

  }, {
    key: "numberingSystem",
    get: function get() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
  }, {
    key: "years",
    get: function get() {
      return this.isValid ? this.values.years || 0 : NaN;
    }
    /**
     * Get the quarters.
     * @type {number}
     */

  }, {
    key: "quarters",
    get: function get() {
      return this.isValid ? this.values.quarters || 0 : NaN;
    }
    /**
     * Get the months.
     * @type {number}
     */

  }, {
    key: "months",
    get: function get() {
      return this.isValid ? this.values.months || 0 : NaN;
    }
    /**
     * Get the weeks
     * @type {number}
     */

  }, {
    key: "weeks",
    get: function get() {
      return this.isValid ? this.values.weeks || 0 : NaN;
    }
    /**
     * Get the days.
     * @type {number}
     */

  }, {
    key: "days",
    get: function get() {
      return this.isValid ? this.values.days || 0 : NaN;
    }
    /**
     * Get the hours.
     * @type {number}
     */

  }, {
    key: "hours",
    get: function get() {
      return this.isValid ? this.values.hours || 0 : NaN;
    }
    /**
     * Get the minutes.
     * @type {number}
     */

  }, {
    key: "minutes",
    get: function get() {
      return this.isValid ? this.values.minutes || 0 : NaN;
    }
    /**
     * Get the seconds.
     * @return {number}
     */

  }, {
    key: "seconds",
    get: function get() {
      return this.isValid ? this.values.seconds || 0 : NaN;
    }
    /**
     * Get the milliseconds.
     * @return {number}
     */

  }, {
    key: "milliseconds",
    get: function get() {
      return this.isValid ? this.values.milliseconds || 0 : NaN;
    }
    /**
     * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
     * on invalid DateTimes or Intervals.
     * @return {boolean}
     */

  }, {
    key: "isValid",
    get: function get() {
      return this.invalid === null;
    }
    /**
     * Returns an error code if this Duration became invalid, or null if the Duration is valid
     * @return {string}
     */

  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
     * @type {string}
     */

  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }]);

  return Duration;
}();
function friendlyDuration(durationish) {
  if (isNumber(durationish)) {
    return Duration.fromMillis(durationish);
  } else if (Duration.isDuration(durationish)) {
    return durationish;
  } else if (typeof durationish === "object") {
    return Duration.fromObject(durationish);
  } else {
    throw new InvalidArgumentError("Unknown duration argument " + durationish + " of type " + typeof durationish);
  }
}

var INVALID$1 = "Invalid Interval"; // checks if the start is equal to or before the end

function validateStartEnd(start, end) {
  if (!start || !start.isValid) {
    return Interval.invalid("missing or invalid start");
  } else if (!end || !end.isValid) {
    return Interval.invalid("missing or invalid end");
  } else if (end < start) {
    return Interval.invalid("end before start", "The end of an interval must be after its start, but you had start=" + start.toISO() + " and end=" + end.toISO());
  } else {
    return null;
  }
}
/**
 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
 *
 * Here is a brief overview of the most commonly used methods and getters in Interval:
 *
 * * **Creation** To create an Interval, use {@link fromDateTimes}, {@link after}, {@link before}, or {@link fromISO}.
 * * **Accessors** Use {@link start} and {@link end} to get the start and end.
 * * **Interrogation** To analyze the Interval, use {@link count}, {@link length}, {@link hasSame}, {@link contains}, {@link isAfter}, or {@link isBefore}.
 * * **Transformation** To create other Intervals out of this one, use {@link set}, {@link splitAt}, {@link splitBy}, {@link divideEqually}, {@link merge}, {@link xor}, {@link union}, {@link intersection}, or {@link difference}.
 * * **Comparison** To compare this Interval to another one, use {@link equals}, {@link overlaps}, {@link abutsStart}, {@link abutsEnd}, {@link engulfs}.
 * * **Output** To convert the Interval into other representations, see {@link toString}, {@link toISO}, {@link toISODate}, {@link toISOTime}, {@link toFormat}, and {@link toDuration}.
 */


var Interval = /*#__PURE__*/function () {
  /**
   * @private
   */
  function Interval(config) {
    /**
     * @access private
     */
    this.s = config.start;
    /**
     * @access private
     */

    this.e = config.end;
    /**
     * @access private
     */

    this.invalid = config.invalid || null;
    /**
     * @access private
     */

    this.isLuxonInterval = true;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */


  Interval.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }

    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
    }

    var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidIntervalError(invalid);
    } else {
      return new Interval({
        invalid: invalid
      });
    }
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  ;

  Interval.fromDateTimes = function fromDateTimes(start, end) {
    var builtStart = friendlyDateTime(start),
        builtEnd = friendlyDateTime(end);
    var validateError = validateStartEnd(builtStart, builtEnd);

    if (validateError == null) {
      return new Interval({
        start: builtStart,
        end: builtEnd
      });
    } else {
      return validateError;
    }
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  ;

  Interval.after = function after(start, duration) {
    var dur = friendlyDuration(duration),
        dt = friendlyDateTime(start);
    return Interval.fromDateTimes(dt, dt.plus(dur));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  ;

  Interval.before = function before(end, duration) {
    var dur = friendlyDuration(duration),
        dt = friendlyDateTime(end);
    return Interval.fromDateTimes(dt.minus(dur), dt);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime.fromISO} and optionally {@link Duration.fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  ;

  Interval.fromISO = function fromISO(text, opts) {
    var _split = (text || "").split("/", 2),
        s = _split[0],
        e = _split[1];

    if (s && e) {
      var start, startIsValid;

      try {
        start = DateTime.fromISO(s, opts);
        startIsValid = start.isValid;
      } catch (e) {
        startIsValid = false;
      }

      var end, endIsValid;

      try {
        end = DateTime.fromISO(e, opts);
        endIsValid = end.isValid;
      } catch (e) {
        endIsValid = false;
      }

      if (startIsValid && endIsValid) {
        return Interval.fromDateTimes(start, end);
      }

      if (startIsValid) {
        var dur = Duration.fromISO(e, opts);

        if (dur.isValid) {
          return Interval.after(start, dur);
        }
      } else if (endIsValid) {
        var _dur = Duration.fromISO(s, opts);

        if (_dur.isValid) {
          return Interval.before(end, _dur);
        }
      }
    }

    return Interval.invalid("unparsable", "the input \"" + text + "\" can't be parsed as ISO 8601");
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  ;

  Interval.isInterval = function isInterval(o) {
    return o && o.isLuxonInterval || false;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  ;

  var _proto = Interval.prototype;

  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  _proto.length = function length(unit) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    return this.isValid ? this.toDuration.apply(this, [unit]).get(unit) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @return {number}
   */
  ;

  _proto.count = function count(unit) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    if (!this.isValid) return NaN;
    var start = this.start.startOf(unit),
        end = this.end.startOf(unit);
    return Math.floor(end.diff(start, unit).get(unit)) + 1;
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  ;

  _proto.hasSame = function hasSame(unit) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  ;

  _proto.isEmpty = function isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  ;

  _proto.isAfter = function isAfter(dateTime) {
    if (!this.isValid) return false;
    return this.s > dateTime;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  ;

  _proto.isBefore = function isBefore(dateTime) {
    if (!this.isValid) return false;
    return this.e <= dateTime;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  ;

  _proto.contains = function contains(dateTime) {
    if (!this.isValid) return false;
    return this.s <= dateTime && this.e > dateTime;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  ;

  _proto.set = function set(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        start = _ref.start,
        end = _ref.end;

    if (!this.isValid) return this;
    return Interval.fromDateTimes(start || this.s, end || this.e);
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...[DateTime]} dateTimes - the unit of time to count.
   * @return {[Interval]}
   */
  ;

  _proto.splitAt = function splitAt() {
    var _this = this;

    if (!this.isValid) return [];

    for (var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++) {
      dateTimes[_key] = arguments[_key];
    }

    var sorted = dateTimes.map(friendlyDateTime).filter(function (d) {
      return _this.contains(d);
    }).sort(),
        results = [];
    var s = this.s,
        i = 0;

    while (s < this.e) {
      var added = sorted[i] || this.e,
          next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
      i += 1;
    }

    return results;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {[Interval]}
   */
  ;

  _proto.splitBy = function splitBy(duration) {
    var dur = friendlyDuration(duration);

    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
      return [];
    }

    var s = this.s,
        idx = 1,
        next;
    var results = [];

    while (s < this.e) {
      var added = this.start.plus(dur.mapUnits(function (x) {
        return x * idx;
      }));
      next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
      idx += 1;
    }

    return results;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {[Interval]}
   */
  ;

  _proto.divideEqually = function divideEqually(numberOfParts) {
    if (!this.isValid) return [];
    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.overlaps = function overlaps(other) {
    return this.e > other.s && this.s < other.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.abutsStart = function abutsStart(other) {
    if (!this.isValid) return false;
    return +this.e === +other.s;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.abutsEnd = function abutsEnd(other) {
    if (!this.isValid) return false;
    return +other.e === +this.s;
  }
  /**
   * Return whether this Interval engulfs the start and end of the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.engulfs = function engulfs(other) {
    if (!this.isValid) return false;
    return this.s <= other.s && this.e >= other.e;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  ;

  _proto.equals = function equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }

    return this.s.equals(other.s) && this.e.equals(other.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  ;

  _proto.intersection = function intersection(other) {
    if (!this.isValid) return this;
    var s = this.s > other.s ? this.s : other.s,
        e = this.e < other.e ? this.e : other.e;

    if (s >= e) {
      return null;
    } else {
      return Interval.fromDateTimes(s, e);
    }
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  ;

  _proto.union = function union(other) {
    if (!this.isValid) return this;
    var s = this.s < other.s ? this.s : other.s,
        e = this.e > other.e ? this.e : other.e;
    return Interval.fromDateTimes(s, e);
  }
  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {[Interval]} intervals
   * @return {[Interval]}
   */
  ;

  Interval.merge = function merge(intervals) {
    var _intervals$sort$reduc = intervals.sort(function (a, b) {
      return a.s - b.s;
    }).reduce(function (_ref2, item) {
      var sofar = _ref2[0],
          current = _ref2[1];

      if (!current) {
        return [sofar, item];
      } else if (current.overlaps(item) || current.abutsStart(item)) {
        return [sofar, current.union(item)];
      } else {
        return [sofar.concat([current]), item];
      }
    }, [[], null]),
        found = _intervals$sort$reduc[0],
        final = _intervals$sort$reduc[1];

    if (final) {
      found.push(final);
    }

    return found;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {[Interval]} intervals
   * @return {[Interval]}
   */
  ;

  Interval.xor = function xor(intervals) {
    var _Array$prototype;

    var start = null,
        currentCount = 0;

    var results = [],
        ends = intervals.map(function (i) {
      return [{
        time: i.s,
        type: "s"
      }, {
        time: i.e,
        type: "e"
      }];
    }),
        flattened = (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, ends),
        arr = flattened.sort(function (a, b) {
      return a.time - b.time;
    });

    for (var _iterator = _createForOfIteratorHelperLoose(arr), _step; !(_step = _iterator()).done;) {
      var i = _step.value;
      currentCount += i.type === "s" ? 1 : -1;

      if (currentCount === 1) {
        start = i.time;
      } else {
        if (start && +start !== +i.time) {
          results.push(Interval.fromDateTimes(start, i.time));
        }

        start = null;
      }
    }

    return Interval.merge(results);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {[Interval]}
   */
  ;

  _proto.difference = function difference() {
    var _this2 = this;

    for (var _len2 = arguments.length, intervals = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      intervals[_key2] = arguments[_key2];
    }

    return Interval.xor([this].concat(intervals)).map(function (i) {
      return _this2.intersection(i);
    }).filter(function (i) {
      return i && !i.isEmpty();
    });
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    if (!this.isValid) return INVALID$1;
    return "[" + this.s.toISO() + " \u2013 " + this.e.toISO() + ")";
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime.toISO}
   * @return {string}
   */
  ;

  _proto.toISO = function toISO(opts) {
    if (!this.isValid) return INVALID$1;
    return this.s.toISO(opts) + "/" + this.e.toISO(opts);
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  ;

  _proto.toISODate = function toISODate() {
    if (!this.isValid) return INVALID$1;
    return this.s.toISODate() + "/" + this.e.toISODate();
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime.toISO}
   * @return {string}
   */
  ;

  _proto.toISOTime = function toISOTime(opts) {
    if (!this.isValid) return INVALID$1;
    return this.s.toISOTime(opts) + "/" + this.e.toISOTime(opts);
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format string.
   * @param {string} dateFormat - the format string. This string formats the start and end time. See {@link DateTime.toFormat} for details.
   * @param {Object} opts - options
   * @param {string} [opts.separator =  ' – '] - a separator to place between the start and end representations
   * @return {string}
   */
  ;

  _proto.toFormat = function toFormat(dateFormat, _temp2) {
    var _ref3 = _temp2 === void 0 ? {} : _temp2,
        _ref3$separator = _ref3.separator,
        separator = _ref3$separator === void 0 ? " – " : _ref3$separator;

    if (!this.isValid) return INVALID$1;
    return "" + this.s.toFormat(dateFormat) + separator + this.e.toFormat(dateFormat);
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  ;

  _proto.toDuration = function toDuration(unit, opts) {
    if (!this.isValid) {
      return Duration.invalid(this.invalidReason);
    }

    return this.e.diff(this.s, unit, opts);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  ;

  _proto.mapEndpoints = function mapEndpoints(mapFn) {
    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
  };

  _createClass(Interval, [{
    key: "start",
    get: function get() {
      return this.isValid ? this.s : null;
    }
    /**
     * Returns the end of the Interval
     * @type {DateTime}
     */

  }, {
    key: "end",
    get: function get() {
      return this.isValid ? this.e : null;
    }
    /**
     * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
     * @type {boolean}
     */

  }, {
    key: "isValid",
    get: function get() {
      return this.invalidReason === null;
    }
    /**
     * Returns an error code if this Interval is invalid, or null if the Interval is valid
     * @type {string}
     */

  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
     * @type {string}
     */

  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
  }]);

  return Interval;
}();

/**
 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
 */

var Info = /*#__PURE__*/function () {
  function Info() {}

  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  Info.hasDST = function hasDST(zone) {
    if (zone === void 0) {
      zone = Settings.defaultZone;
    }

    var proto = DateTime.now().setZone(zone).set({
      month: 12
    });
    return !zone.universal && proto.offset !== proto.set({
      month: 6
    }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  ;

  Info.isValidIANAZone = function isValidIANAZone(zone) {
    return IANAZone.isValidSpecifier(zone) && IANAZone.isValidZone(zone);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone.isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  ;

  Info.normalizeZone = function normalizeZone$1(input) {
    return normalizeZone(input, Settings.defaultZone);
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {[string]}
   */
  ;

  Info.months = function months(length, _temp) {
    if (length === void 0) {
      length = "long";
    }

    var _ref = _temp === void 0 ? {} : _temp,
        _ref$locale = _ref.locale,
        locale = _ref$locale === void 0 ? null : _ref$locale,
        _ref$numberingSystem = _ref.numberingSystem,
        numberingSystem = _ref$numberingSystem === void 0 ? null : _ref$numberingSystem,
        _ref$locObj = _ref.locObj,
        locObj = _ref$locObj === void 0 ? null : _ref$locObj,
        _ref$outputCalendar = _ref.outputCalendar,
        outputCalendar = _ref$outputCalendar === void 0 ? "gregory" : _ref$outputCalendar;

    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {[string]}
   */
  ;

  Info.monthsFormat = function monthsFormat(length, _temp2) {
    if (length === void 0) {
      length = "long";
    }

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$locale = _ref2.locale,
        locale = _ref2$locale === void 0 ? null : _ref2$locale,
        _ref2$numberingSystem = _ref2.numberingSystem,
        numberingSystem = _ref2$numberingSystem === void 0 ? null : _ref2$numberingSystem,
        _ref2$locObj = _ref2.locObj,
        locObj = _ref2$locObj === void 0 ? null : _ref2$locObj,
        _ref2$outputCalendar = _ref2.outputCalendar,
        outputCalendar = _ref2$outputCalendar === void 0 ? "gregory" : _ref2$outputCalendar;

    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {[string]}
   */
  ;

  Info.weekdays = function weekdays(length, _temp3) {
    if (length === void 0) {
      length = "long";
    }

    var _ref3 = _temp3 === void 0 ? {} : _temp3,
        _ref3$locale = _ref3.locale,
        locale = _ref3$locale === void 0 ? null : _ref3$locale,
        _ref3$numberingSystem = _ref3.numberingSystem,
        numberingSystem = _ref3$numberingSystem === void 0 ? null : _ref3$numberingSystem,
        _ref3$locObj = _ref3.locObj,
        locObj = _ref3$locObj === void 0 ? null : _ref3$locObj;

    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link weekdays}
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {[string]}
   */
  ;

  Info.weekdaysFormat = function weekdaysFormat(length, _temp4) {
    if (length === void 0) {
      length = "long";
    }

    var _ref4 = _temp4 === void 0 ? {} : _temp4,
        _ref4$locale = _ref4.locale,
        locale = _ref4$locale === void 0 ? null : _ref4$locale,
        _ref4$numberingSystem = _ref4.numberingSystem,
        numberingSystem = _ref4$numberingSystem === void 0 ? null : _ref4$numberingSystem,
        _ref4$locObj = _ref4.locObj,
        locObj = _ref4$locObj === void 0 ? null : _ref4$locObj;

    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {[string]}
   */
  ;

  Info.meridiems = function meridiems(_temp5) {
    var _ref5 = _temp5 === void 0 ? {} : _temp5,
        _ref5$locale = _ref5.locale,
        locale = _ref5$locale === void 0 ? null : _ref5$locale;

    return Locale.create(locale).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {[string]}
   */
  ;

  Info.eras = function eras(length, _temp6) {
    if (length === void 0) {
      length = "short";
    }

    var _ref6 = _temp6 === void 0 ? {} : _temp6,
        _ref6$locale = _ref6.locale,
        locale = _ref6$locale === void 0 ? null : _ref6$locale;

    return Locale.create(locale, null, "gregory").eras(length);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, timezone support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `zones`: whether this environment supports IANA timezones
   * * `intlTokens`: whether this environment supports internationalized token-based formatting/parsing
   * * `intl`: whether this environment supports general internationalization
   * * `relative`: whether this environment supports relative time formatting
   * @example Info.features() //=> { intl: true, intlTokens: false, zones: true, relative: false }
   * @return {Object}
   */
  ;

  Info.features = function features() {
    var intl = false,
        intlTokens = false,
        zones = false,
        relative = false;

    if (hasIntl()) {
      intl = true;
      intlTokens = hasFormatToParts();
      relative = hasRelative();

      try {
        zones = new Intl.DateTimeFormat("en", {
          timeZone: "America/New_York"
        }).resolvedOptions().timeZone === "America/New_York";
      } catch (e) {
        zones = false;
      }
    }

    return {
      intl: intl,
      intlTokens: intlTokens,
      zones: zones,
      relative: relative
    };
  };

  return Info;
}();

function dayDiff(earlier, later) {
  var utcDayStart = function utcDayStart(dt) {
    return dt.toUTC(0, {
      keepLocalTime: true
    }).startOf("day").valueOf();
  },
      ms = utcDayStart(later) - utcDayStart(earlier);

  return Math.floor(Duration.fromMillis(ms).as("days"));
}

function highOrderDiffs(cursor, later, units) {
  var differs = [["years", function (a, b) {
    return b.year - a.year;
  }], ["quarters", function (a, b) {
    return b.quarter - a.quarter;
  }], ["months", function (a, b) {
    return b.month - a.month + (b.year - a.year) * 12;
  }], ["weeks", function (a, b) {
    var days = dayDiff(a, b);
    return (days - days % 7) / 7;
  }], ["days", dayDiff]];
  var results = {};
  var lowestOrder, highWater;

  for (var _i = 0, _differs = differs; _i < _differs.length; _i++) {
    var _differs$_i = _differs[_i],
        unit = _differs$_i[0],
        differ = _differs$_i[1];

    if (units.indexOf(unit) >= 0) {
      var _cursor$plus;

      lowestOrder = unit;
      var delta = differ(cursor, later);
      highWater = cursor.plus((_cursor$plus = {}, _cursor$plus[unit] = delta, _cursor$plus));

      if (highWater > later) {
        var _cursor$plus2;

        cursor = cursor.plus((_cursor$plus2 = {}, _cursor$plus2[unit] = delta - 1, _cursor$plus2));
        delta -= 1;
      } else {
        cursor = highWater;
      }

      results[unit] = delta;
    }
  }

  return [cursor, results, highWater, lowestOrder];
}

function _diff (earlier, later, units, opts) {
  var _highOrderDiffs = highOrderDiffs(earlier, later, units),
      cursor = _highOrderDiffs[0],
      results = _highOrderDiffs[1],
      highWater = _highOrderDiffs[2],
      lowestOrder = _highOrderDiffs[3];

  var remainingMillis = later - cursor;
  var lowerOrderUnits = units.filter(function (u) {
    return ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0;
  });

  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      var _cursor$plus3;

      highWater = cursor.plus((_cursor$plus3 = {}, _cursor$plus3[lowestOrder] = 1, _cursor$plus3));
    }

    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
  }

  var duration = Duration.fromObject(Object.assign(results, opts));

  if (lowerOrderUnits.length > 0) {
    var _Duration$fromMillis;

    return (_Duration$fromMillis = Duration.fromMillis(remainingMillis, opts)).shiftTo.apply(_Duration$fromMillis, lowerOrderUnits).plus(duration);
  } else {
    return duration;
  }
}

var numberingSystems = {
  arab: "[\u0660-\u0669]",
  arabext: "[\u06F0-\u06F9]",
  bali: "[\u1B50-\u1B59]",
  beng: "[\u09E6-\u09EF]",
  deva: "[\u0966-\u096F]",
  fullwide: "[\uFF10-\uFF19]",
  gujr: "[\u0AE6-\u0AEF]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[\u17E0-\u17E9]",
  knda: "[\u0CE6-\u0CEF]",
  laoo: "[\u0ED0-\u0ED9]",
  limb: "[\u1946-\u194F]",
  mlym: "[\u0D66-\u0D6F]",
  mong: "[\u1810-\u1819]",
  mymr: "[\u1040-\u1049]",
  orya: "[\u0B66-\u0B6F]",
  tamldec: "[\u0BE6-\u0BEF]",
  telu: "[\u0C66-\u0C6F]",
  thai: "[\u0E50-\u0E59]",
  tibt: "[\u0F20-\u0F29]",
  latn: "\\d"
};
var numberingSystemsUTF16 = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
}; // eslint-disable-next-line

var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
function parseDigits(str) {
  var value = parseInt(str, 10);

  if (isNaN(value)) {
    value = "";

    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);

      if (str[i].search(numberingSystems.hanidec) !== -1) {
        value += hanidecChars.indexOf(str[i]);
      } else {
        for (var key in numberingSystemsUTF16) {
          var _numberingSystemsUTF = numberingSystemsUTF16[key],
              min = _numberingSystemsUTF[0],
              max = _numberingSystemsUTF[1];

          if (code >= min && code <= max) {
            value += code - min;
          }
        }
      }
    }

    return parseInt(value, 10);
  } else {
    return value;
  }
}
function digitRegex(_ref, append) {
  var numberingSystem = _ref.numberingSystem;

  if (append === void 0) {
    append = "";
  }

  return new RegExp("" + numberingSystems[numberingSystem || "latn"] + append);
}

var MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";

function intUnit(regex, post) {
  if (post === void 0) {
    post = function post(i) {
      return i;
    };
  }

  return {
    regex: regex,
    deser: function deser(_ref) {
      var s = _ref[0];
      return post(parseDigits(s));
    }
  };
}

var NBSP = String.fromCharCode(160);
var spaceOrNBSP = "( |" + NBSP + ")";
var spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");

function fixListRegex(s) {
  // make dots optional and also make them literal
  // make space and non breakable space characters interchangeable
  return s.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
}

function stripInsensitivities(s) {
  return s.replace(/\./g, "") // ignore dots that were made optional
  .replace(spaceOrNBSPRegExp, " ") // interchange space and nbsp
  .toLowerCase();
}

function oneOf(strings, startIndex) {
  if (strings === null) {
    return null;
  } else {
    return {
      regex: RegExp(strings.map(fixListRegex).join("|")),
      deser: function deser(_ref2) {
        var s = _ref2[0];
        return strings.findIndex(function (i) {
          return stripInsensitivities(s) === stripInsensitivities(i);
        }) + startIndex;
      }
    };
  }
}

function offset(regex, groups) {
  return {
    regex: regex,
    deser: function deser(_ref3) {
      var h = _ref3[1],
          m = _ref3[2];
      return signedOffset(h, m);
    },
    groups: groups
  };
}

function simple(regex) {
  return {
    regex: regex,
    deser: function deser(_ref4) {
      var s = _ref4[0];
      return s;
    }
  };
}

function escapeToken(value) {
  // eslint-disable-next-line no-useless-escape
  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}

function unitForToken(token, loc) {
  var one = digitRegex(loc),
      two = digitRegex(loc, "{2}"),
      three = digitRegex(loc, "{3}"),
      four = digitRegex(loc, "{4}"),
      six = digitRegex(loc, "{6}"),
      oneOrTwo = digitRegex(loc, "{1,2}"),
      oneToThree = digitRegex(loc, "{1,3}"),
      oneToSix = digitRegex(loc, "{1,6}"),
      oneToNine = digitRegex(loc, "{1,9}"),
      twoToFour = digitRegex(loc, "{2,4}"),
      fourToSix = digitRegex(loc, "{4,6}"),
      literal = function literal(t) {
    return {
      regex: RegExp(escapeToken(t.val)),
      deser: function deser(_ref5) {
        var s = _ref5[0];
        return s;
      },
      literal: true
    };
  },
      unitate = function unitate(t) {
    if (token.literal) {
      return literal(t);
    }

    switch (t.val) {
      // era
      case "G":
        return oneOf(loc.eras("short", false), 0);

      case "GG":
        return oneOf(loc.eras("long", false), 0);
      // years

      case "y":
        return intUnit(oneToSix);

      case "yy":
        return intUnit(twoToFour, untruncateYear);

      case "yyyy":
        return intUnit(four);

      case "yyyyy":
        return intUnit(fourToSix);

      case "yyyyyy":
        return intUnit(six);
      // months

      case "M":
        return intUnit(oneOrTwo);

      case "MM":
        return intUnit(two);

      case "MMM":
        return oneOf(loc.months("short", true, false), 1);

      case "MMMM":
        return oneOf(loc.months("long", true, false), 1);

      case "L":
        return intUnit(oneOrTwo);

      case "LL":
        return intUnit(two);

      case "LLL":
        return oneOf(loc.months("short", false, false), 1);

      case "LLLL":
        return oneOf(loc.months("long", false, false), 1);
      // dates

      case "d":
        return intUnit(oneOrTwo);

      case "dd":
        return intUnit(two);
      // ordinals

      case "o":
        return intUnit(oneToThree);

      case "ooo":
        return intUnit(three);
      // time

      case "HH":
        return intUnit(two);

      case "H":
        return intUnit(oneOrTwo);

      case "hh":
        return intUnit(two);

      case "h":
        return intUnit(oneOrTwo);

      case "mm":
        return intUnit(two);

      case "m":
        return intUnit(oneOrTwo);

      case "q":
        return intUnit(oneOrTwo);

      case "qq":
        return intUnit(two);

      case "s":
        return intUnit(oneOrTwo);

      case "ss":
        return intUnit(two);

      case "S":
        return intUnit(oneToThree);

      case "SSS":
        return intUnit(three);

      case "u":
        return simple(oneToNine);
      // meridiem

      case "a":
        return oneOf(loc.meridiems(), 0);
      // weekYear (k)

      case "kkkk":
        return intUnit(four);

      case "kk":
        return intUnit(twoToFour, untruncateYear);
      // weekNumber (W)

      case "W":
        return intUnit(oneOrTwo);

      case "WW":
        return intUnit(two);
      // weekdays

      case "E":
      case "c":
        return intUnit(one);

      case "EEE":
        return oneOf(loc.weekdays("short", false, false), 1);

      case "EEEE":
        return oneOf(loc.weekdays("long", false, false), 1);

      case "ccc":
        return oneOf(loc.weekdays("short", true, false), 1);

      case "cccc":
        return oneOf(loc.weekdays("long", true, false), 1);
      // offset/zone

      case "Z":
      case "ZZ":
        return offset(new RegExp("([+-]" + oneOrTwo.source + ")(?::(" + two.source + "))?"), 2);

      case "ZZZ":
        return offset(new RegExp("([+-]" + oneOrTwo.source + ")(" + two.source + ")?"), 2);
      // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
      // because we don't have any way to figure out what they are

      case "z":
        return simple(/[a-z_+-/]{1,256}?/i);

      default:
        return literal(t);
    }
  };

  var unit = unitate(token) || {
    invalidReason: MISSING_FTP
  };
  unit.token = token;
  return unit;
}

var partTypeStyleToTokenVal = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour: {
    numeric: "h",
    "2-digit": "hh"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  }
};

function tokenForPart(part, locale, formatOpts) {
  var type = part.type,
      value = part.value;

  if (type === "literal") {
    return {
      literal: true,
      val: value
    };
  }

  var style = formatOpts[type];
  var val = partTypeStyleToTokenVal[type];

  if (typeof val === "object") {
    val = val[style];
  }

  if (val) {
    return {
      literal: false,
      val: val
    };
  }

  return undefined;
}

function buildRegex(units) {
  var re = units.map(function (u) {
    return u.regex;
  }).reduce(function (f, r) {
    return f + "(" + r.source + ")";
  }, "");
  return ["^" + re + "$", units];
}

function match(input, regex, handlers) {
  var matches = input.match(regex);

  if (matches) {
    var all = {};
    var matchIndex = 1;

    for (var i in handlers) {
      if (hasOwnProperty(handlers, i)) {
        var h = handlers[i],
            groups = h.groups ? h.groups + 1 : 1;

        if (!h.literal && h.token) {
          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
        }

        matchIndex += groups;
      }
    }

    return [matches, all];
  } else {
    return [matches, {}];
  }
}

function dateTimeFromMatches(matches) {
  var toField = function toField(token) {
    switch (token) {
      case "S":
        return "millisecond";

      case "s":
        return "second";

      case "m":
        return "minute";

      case "h":
      case "H":
        return "hour";

      case "d":
        return "day";

      case "o":
        return "ordinal";

      case "L":
      case "M":
        return "month";

      case "y":
        return "year";

      case "E":
      case "c":
        return "weekday";

      case "W":
        return "weekNumber";

      case "k":
        return "weekYear";

      case "q":
        return "quarter";

      default:
        return null;
    }
  };

  var zone;

  if (!isUndefined(matches.Z)) {
    zone = new FixedOffsetZone(matches.Z);
  } else if (!isUndefined(matches.z)) {
    zone = IANAZone.create(matches.z);
  } else {
    zone = null;
  }

  if (!isUndefined(matches.q)) {
    matches.M = (matches.q - 1) * 3 + 1;
  }

  if (!isUndefined(matches.h)) {
    if (matches.h < 12 && matches.a === 1) {
      matches.h += 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }

  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }

  if (!isUndefined(matches.u)) {
    matches.S = parseMillis(matches.u);
  }

  var vals = Object.keys(matches).reduce(function (r, k) {
    var f = toField(k);

    if (f) {
      r[f] = matches[k];
    }

    return r;
  }, {});
  return [vals, zone];
}

var dummyDateTimeCache = null;

function getDummyDateTime() {
  if (!dummyDateTimeCache) {
    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
  }

  return dummyDateTimeCache;
}

function maybeExpandMacroToken(token, locale) {
  if (token.literal) {
    return token;
  }

  var formatOpts = Formatter.macroTokenToFormatOpts(token.val);

  if (!formatOpts) {
    return token;
  }

  var formatter = Formatter.create(locale, formatOpts);
  var parts = formatter.formatDateTimeParts(getDummyDateTime());
  var tokens = parts.map(function (p) {
    return tokenForPart(p, locale, formatOpts);
  });

  if (tokens.includes(undefined)) {
    return token;
  }

  return tokens;
}

function expandMacroTokens(tokens, locale) {
  var _Array$prototype;

  return (_Array$prototype = Array.prototype).concat.apply(_Array$prototype, tokens.map(function (t) {
    return maybeExpandMacroToken(t, locale);
  }));
}
/**
 * @private
 */


function explainFromTokens(locale, input, format) {
  var tokens = expandMacroTokens(Formatter.parseFormat(format), locale),
      units = tokens.map(function (t) {
    return unitForToken(t, locale);
  }),
      disqualifyingUnit = units.find(function (t) {
    return t.invalidReason;
  });

  if (disqualifyingUnit) {
    return {
      input: input,
      tokens: tokens,
      invalidReason: disqualifyingUnit.invalidReason
    };
  } else {
    var _buildRegex = buildRegex(units),
        regexString = _buildRegex[0],
        handlers = _buildRegex[1],
        regex = RegExp(regexString, "i"),
        _match = match(input, regex, handlers),
        rawMatches = _match[0],
        matches = _match[1],
        _ref6 = matches ? dateTimeFromMatches(matches) : [null, null],
        result = _ref6[0],
        zone = _ref6[1];

    if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
      throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
    }

    return {
      input: input,
      tokens: tokens,
      regex: regex,
      rawMatches: rawMatches,
      matches: matches,
      result: result,
      zone: zone
    };
  }
}
function parseFromTokens(locale, input, format) {
  var _explainFromTokens = explainFromTokens(locale, input, format),
      result = _explainFromTokens.result,
      zone = _explainFromTokens.zone,
      invalidReason = _explainFromTokens.invalidReason;

  return [result, zone, invalidReason];
}

var nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

function unitOutOfRange(unit, value) {
  return new Invalid("unit out of range", "you specified " + value + " (of type " + typeof value + ") as a " + unit + ", which is invalid");
}

function dayOfWeek(year, month, day) {
  var js = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return js === 0 ? 7 : js;
}

function computeOrdinal(year, month, day) {
  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}

function uncomputeOrdinal(year, ordinal) {
  var table = isLeapYear(year) ? leapLadder : nonLeapLadder,
      month0 = table.findIndex(function (i) {
    return i < ordinal;
  }),
      day = ordinal - table[month0];
  return {
    month: month0 + 1,
    day: day
  };
}
/**
 * @private
 */


function gregorianToWeek(gregObj) {
  var year = gregObj.year,
      month = gregObj.month,
      day = gregObj.day,
      ordinal = computeOrdinal(year, month, day),
      weekday = dayOfWeek(year, month, day);
  var weekNumber = Math.floor((ordinal - weekday + 10) / 7),
      weekYear;

  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = weeksInWeekYear(weekYear);
  } else if (weekNumber > weeksInWeekYear(year)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }

  return Object.assign({
    weekYear: weekYear,
    weekNumber: weekNumber,
    weekday: weekday
  }, timeObject(gregObj));
}
function weekToGregorian(weekData) {
  var weekYear = weekData.weekYear,
      weekNumber = weekData.weekNumber,
      weekday = weekData.weekday,
      weekdayOfJan4 = dayOfWeek(weekYear, 1, 4),
      yearInDays = daysInYear(weekYear);
  var ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3,
      year;

  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += daysInYear(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= daysInYear(weekYear);
  } else {
    year = weekYear;
  }

  var _uncomputeOrdinal = uncomputeOrdinal(year, ordinal),
      month = _uncomputeOrdinal.month,
      day = _uncomputeOrdinal.day;

  return Object.assign({
    year: year,
    month: month,
    day: day
  }, timeObject(weekData));
}
function gregorianToOrdinal(gregData) {
  var year = gregData.year,
      month = gregData.month,
      day = gregData.day,
      ordinal = computeOrdinal(year, month, day);
  return Object.assign({
    year: year,
    ordinal: ordinal
  }, timeObject(gregData));
}
function ordinalToGregorian(ordinalData) {
  var year = ordinalData.year,
      ordinal = ordinalData.ordinal,
      _uncomputeOrdinal2 = uncomputeOrdinal(year, ordinal),
      month = _uncomputeOrdinal2.month,
      day = _uncomputeOrdinal2.day;

  return Object.assign({
    year: year,
    month: month,
    day: day
  }, timeObject(ordinalData));
}
function hasInvalidWeekData(obj) {
  var validYear = isInteger(obj.weekYear),
      validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)),
      validWeekday = integerBetween(obj.weekday, 1, 7);

  if (!validYear) {
    return unitOutOfRange("weekYear", obj.weekYear);
  } else if (!validWeek) {
    return unitOutOfRange("week", obj.week);
  } else if (!validWeekday) {
    return unitOutOfRange("weekday", obj.weekday);
  } else return false;
}
function hasInvalidOrdinalData(obj) {
  var validYear = isInteger(obj.year),
      validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));

  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validOrdinal) {
    return unitOutOfRange("ordinal", obj.ordinal);
  } else return false;
}
function hasInvalidGregorianData(obj) {
  var validYear = isInteger(obj.year),
      validMonth = integerBetween(obj.month, 1, 12),
      validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));

  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validMonth) {
    return unitOutOfRange("month", obj.month);
  } else if (!validDay) {
    return unitOutOfRange("day", obj.day);
  } else return false;
}
function hasInvalidTimeData(obj) {
  var hour = obj.hour,
      minute = obj.minute,
      second = obj.second,
      millisecond = obj.millisecond;
  var validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0,
      validMinute = integerBetween(minute, 0, 59),
      validSecond = integerBetween(second, 0, 59),
      validMillisecond = integerBetween(millisecond, 0, 999);

  if (!validHour) {
    return unitOutOfRange("hour", hour);
  } else if (!validMinute) {
    return unitOutOfRange("minute", minute);
  } else if (!validSecond) {
    return unitOutOfRange("second", second);
  } else if (!validMillisecond) {
    return unitOutOfRange("millisecond", millisecond);
  } else return false;
}

var INVALID$2 = "Invalid DateTime";
var MAX_DATE = 8.64e15;

function unsupportedZone(zone) {
  return new Invalid("unsupported zone", "the zone \"" + zone.name + "\" is not supported");
} // we cache week data on the DT object and this intermediates the cache


function possiblyCachedWeekData(dt) {
  if (dt.weekData === null) {
    dt.weekData = gregorianToWeek(dt.c);
  }

  return dt.weekData;
} // clone really means, "make a new object with these modifications". all "setters" really use this
// to create a new object while only changing some of the properties


function clone$1(inst, alts) {
  var current = {
    ts: inst.ts,
    zone: inst.zone,
    c: inst.c,
    o: inst.o,
    loc: inst.loc,
    invalid: inst.invalid
  };
  return new DateTime(Object.assign({}, current, alts, {
    old: current
  }));
} // find the right offset a given local time. The o input is our guess, which determines which
// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)


function fixOffset(localTS, o, tz) {
  // Our UTC time is just a guess because our offset is just a guess
  var utcGuess = localTS - o * 60 * 1000; // Test whether the zone matches the offset for this ts

  var o2 = tz.offset(utcGuess); // If so, offset didn't change and we're done

  if (o === o2) {
    return [utcGuess, o];
  } // If not, change the ts by the difference in the offset


  utcGuess -= (o2 - o) * 60 * 1000; // If that gives us the local time we want, we're done

  var o3 = tz.offset(utcGuess);

  if (o2 === o3) {
    return [utcGuess, o2];
  } // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time


  return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
} // convert an epoch timestamp into a calendar object with the given offset


function tsToObj(ts, offset) {
  ts += offset * 60 * 1000;
  var d = new Date(ts);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
    millisecond: d.getUTCMilliseconds()
  };
} // convert a calendar object to a epoch timestamp


function objToTS(obj, offset, zone) {
  return fixOffset(objToLocalTS(obj), offset, zone);
} // create a new DT instance by adding a duration, adjusting for DSTs


function adjustTime(inst, dur) {
  var oPre = inst.o,
      year = inst.c.year + Math.trunc(dur.years),
      month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3,
      c = Object.assign({}, inst.c, {
    year: year,
    month: month,
    day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
  }),
      millisToAdd = Duration.fromObject({
    years: dur.years - Math.trunc(dur.years),
    quarters: dur.quarters - Math.trunc(dur.quarters),
    months: dur.months - Math.trunc(dur.months),
    weeks: dur.weeks - Math.trunc(dur.weeks),
    days: dur.days - Math.trunc(dur.days),
    hours: dur.hours,
    minutes: dur.minutes,
    seconds: dur.seconds,
    milliseconds: dur.milliseconds
  }).as("milliseconds"),
      localTS = objToLocalTS(c);

  var _fixOffset = fixOffset(localTS, oPre, inst.zone),
      ts = _fixOffset[0],
      o = _fixOffset[1];

  if (millisToAdd !== 0) {
    ts += millisToAdd; // that could have changed the offset by going over a DST, but we want to keep the ts the same

    o = inst.zone.offset(ts);
  }

  return {
    ts: ts,
    o: o
  };
} // helper useful in turning the results of parsing into real dates
// by handling the zone options


function parseDataToDateTime(parsed, parsedZone, opts, format, text) {
  var setZone = opts.setZone,
      zone = opts.zone;

  if (parsed && Object.keys(parsed).length !== 0) {
    var interpretationZone = parsedZone || zone,
        inst = DateTime.fromObject(Object.assign(parsed, opts, {
      zone: interpretationZone,
      // setZone is a valid option in the calling methods, but not in fromObject
      setZone: undefined
    }));
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(new Invalid("unparsable", "the input \"" + text + "\" can't be parsed as " + format));
  }
} // if you want to output a technical format (e.g. RFC 2822), this helper
// helps handle the details


function toTechFormat(dt, format, allowZ) {
  if (allowZ === void 0) {
    allowZ = true;
  }

  return dt.isValid ? Formatter.create(Locale.create("en-US"), {
    allowZ: allowZ,
    forceSimple: true
  }).formatDateTimeFromString(dt, format) : null;
} // technical time formats (e.g. the time part of ISO 8601), take some options
// and this commonizes their handling


function toTechTimeFormat(dt, _ref) {
  var _ref$suppressSeconds = _ref.suppressSeconds,
      suppressSeconds = _ref$suppressSeconds === void 0 ? false : _ref$suppressSeconds,
      _ref$suppressMillisec = _ref.suppressMilliseconds,
      suppressMilliseconds = _ref$suppressMillisec === void 0 ? false : _ref$suppressMillisec,
      includeOffset = _ref.includeOffset,
      _ref$includePrefix = _ref.includePrefix,
      includePrefix = _ref$includePrefix === void 0 ? false : _ref$includePrefix,
      _ref$includeZone = _ref.includeZone,
      includeZone = _ref$includeZone === void 0 ? false : _ref$includeZone,
      _ref$spaceZone = _ref.spaceZone,
      spaceZone = _ref$spaceZone === void 0 ? false : _ref$spaceZone,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? "extended" : _ref$format;
  var fmt = format === "basic" ? "HHmm" : "HH:mm";

  if (!suppressSeconds || dt.second !== 0 || dt.millisecond !== 0) {
    fmt += format === "basic" ? "ss" : ":ss";

    if (!suppressMilliseconds || dt.millisecond !== 0) {
      fmt += ".SSS";
    }
  }

  if ((includeZone || includeOffset) && spaceZone) {
    fmt += " ";
  }

  if (includeZone) {
    fmt += "z";
  } else if (includeOffset) {
    fmt += format === "basic" ? "ZZZ" : "ZZ";
  }

  var str = toTechFormat(dt, fmt);

  if (includePrefix) {
    str = "T" + str;
  }

  return str;
} // defaults for unspecified units in the supported calendars


var defaultUnitValues = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
},
    defaultWeekUnitValues = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
},
    defaultOrdinalUnitValues = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}; // Units in the supported calendars, sorted by bigness

var orderedUnits$1 = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
    orderedWeekUnits = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"],
    orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"]; // standardize case and plurality in units

function normalizeUnit(unit) {
  var normalized = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[unit.toLowerCase()];
  if (!normalized) throw new InvalidUnitError(unit);
  return normalized;
} // this is a dumbed down version of fromObject() that runs about 60% faster
// but doesn't do any validation, makes a bunch of assumptions about what units
// are present, and so on.


function quickDT(obj, zone) {
  // assume we have the higher-order units
  for (var _iterator = _createForOfIteratorHelperLoose(orderedUnits$1), _step; !(_step = _iterator()).done;) {
    var u = _step.value;

    if (isUndefined(obj[u])) {
      obj[u] = defaultUnitValues[u];
    }
  }

  var invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);

  if (invalid) {
    return DateTime.invalid(invalid);
  }

  var tsNow = Settings.now(),
      offsetProvis = zone.offset(tsNow),
      _objToTS = objToTS(obj, offsetProvis, zone),
      ts = _objToTS[0],
      o = _objToTS[1];

  return new DateTime({
    ts: ts,
    zone: zone,
    o: o
  });
}

function diffRelative(start, end, opts) {
  var round = isUndefined(opts.round) ? true : opts.round,
      format = function format(c, unit) {
    c = roundTo(c, round || opts.calendary ? 0 : 2, true);
    var formatter = end.loc.clone(opts).relFormatter(opts);
    return formatter.format(c, unit);
  },
      differ = function differ(unit) {
    if (opts.calendary) {
      if (!end.hasSame(start, unit)) {
        return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
      } else return 0;
    } else {
      return end.diff(start, unit).get(unit);
    }
  };

  if (opts.unit) {
    return format(differ(opts.unit), opts.unit);
  }

  for (var _iterator2 = _createForOfIteratorHelperLoose(opts.units), _step2; !(_step2 = _iterator2()).done;) {
    var unit = _step2.value;
    var count = differ(unit);

    if (Math.abs(count) >= 1) {
      return format(count, unit);
    }
  }

  return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
}
/**
 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
 *
 * A DateTime comprises of:
 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
 *
 * Here is a brief overview of the most commonly used functionality it provides:
 *
 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link local}, {@link utc}, and (most flexibly) {@link fromObject}. To create one from a standard string format, use {@link fromISO}, {@link fromHTTP}, and {@link fromRFC2822}. To create one from a custom string format, use {@link fromFormat}. To create one from a native JS date, use {@link fromJSDate}.
 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link toObject}), use the {@link year}, {@link month},
 * {@link day}, {@link hour}, {@link minute}, {@link second}, {@link millisecond} accessors.
 * * **Week calendar**: For ISO week calendar attributes, see the {@link weekYear}, {@link weekNumber}, and {@link weekday} accessors.
 * * **Configuration** See the {@link locale} and {@link numberingSystem} accessors.
 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link set}, {@link reconfigure}, {@link setZone}, {@link setLocale}, {@link plus}, {@link minus}, {@link endOf}, {@link startOf}, {@link toUTC}, and {@link toLocal}.
 * * **Output**: To convert the DateTime to other representations, use the {@link toRelative}, {@link toRelativeCalendar}, {@link toJSON}, {@link toISO}, {@link toHTTP}, {@link toObject}, {@link toRFC2822}, {@link toString}, {@link toLocaleString}, {@link toFormat}, {@link toMillis} and {@link toJSDate}.
 *
 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
 */


var DateTime = /*#__PURE__*/function () {
  /**
   * @access private
   */
  function DateTime(config) {
    var zone = config.zone || Settings.defaultZone;
    var invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
    /**
     * @access private
     */

    this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
    var c = null,
        o = null;

    if (!invalid) {
      var unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);

      if (unchanged) {
        var _ref2 = [config.old.c, config.old.o];
        c = _ref2[0];
        o = _ref2[1];
      } else {
        var ot = zone.offset(this.ts);
        c = tsToObj(this.ts, ot);
        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
        c = invalid ? null : c;
        o = invalid ? null : ot;
      }
    }
    /**
     * @access private
     */


    this._zone = zone;
    /**
     * @access private
     */

    this.loc = config.loc || Locale.create();
    /**
     * @access private
     */

    this.invalid = invalid;
    /**
     * @access private
     */

    this.weekData = null;
    /**
     * @access private
     */

    this.c = c;
    /**
     * @access private
     */

    this.o = o;
    /**
     * @access private
     */

    this.isLuxonDateTime = true;
  } // CONSTRUCT

  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */


  DateTime.now = function now() {
    return new DateTime({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                            //~> now
   * @example DateTime.local(2017)                        //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                     //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12)                 //~> 2017-03-12T00:00:00
   * @example DateTime.local(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  ;

  DateTime.local = function local(year, month, day, hour, minute, second, millisecond) {
    if (isUndefined(year)) {
      return DateTime.now();
    } else {
      return quickDT({
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond
      }, Settings.defaultZone);
    }
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.utc()                            //~> now
   * @example DateTime.utc(2017)                        //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                     //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                 //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.765Z
   * @return {DateTime}
   */
  ;

  DateTime.utc = function utc(year, month, day, hour, minute, second, millisecond) {
    if (isUndefined(year)) {
      return new DateTime({
        ts: Settings.now(),
        zone: FixedOffsetZone.utcInstance
      });
    } else {
      return quickDT({
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond
      }, FixedOffsetZone.utcInstance);
    }
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  ;

  DateTime.fromJSDate = function fromJSDate(date, options) {
    if (options === void 0) {
      options = {};
    }

    var ts = isDate(date) ? date.valueOf() : NaN;

    if (Number.isNaN(ts)) {
      return DateTime.invalid("invalid input");
    }

    var zoneToUse = normalizeZone(options.zone, Settings.defaultZone);

    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }

    return new DateTime({
      ts: ts,
      zone: zoneToUse,
      loc: Locale.fromObject(options)
    });
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  ;

  DateTime.fromMillis = function fromMillis(milliseconds, options) {
    if (options === void 0) {
      options = {};
    }

    if (!isNumber(milliseconds)) {
      throw new InvalidArgumentError("fromMillis requires a numerical input, but received a " + typeof milliseconds + " with value " + milliseconds);
    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
      // this isn't perfect because because we can still end up out of range because of additional shifting, but it's a start
      return DateTime.invalid("Timestamp out of range");
    } else {
      return new DateTime({
        ts: milliseconds,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  ;

  DateTime.fromSeconds = function fromSeconds(seconds, options) {
    if (options === void 0) {
      options = {};
    }

    if (!isNumber(seconds)) {
      throw new InvalidArgumentError("fromSeconds requires a numerical input");
    } else {
      return new DateTime({
        ts: seconds * 1000,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {string|Zone} [obj.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [obj.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} obj.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} obj.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @return {DateTime}
   */
  ;

  DateTime.fromObject = function fromObject(obj) {
    var zoneToUse = normalizeZone(obj.zone, Settings.defaultZone);

    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }

    var tsNow = Settings.now(),
        offsetProvis = zoneToUse.offset(tsNow),
        normalized = normalizeObject(obj, normalizeUnit, ["zone", "locale", "outputCalendar", "numberingSystem"]),
        containsOrdinal = !isUndefined(normalized.ordinal),
        containsGregorYear = !isUndefined(normalized.year),
        containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
        containsGregor = containsGregorYear || containsGregorMD,
        definiteWeekDef = normalized.weekYear || normalized.weekNumber,
        loc = Locale.fromObject(obj); // cases:
    // just a weekday -> this week's instance of that weekday, no worries
    // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
    // (gregorian month or day) + ordinal -> error
    // otherwise just use weeks or ordinals or gregorian, depending on what's specified

    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }

    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }

    var useWeekData = definiteWeekDef || normalized.weekday && !containsGregor; // configure ourselves to deal with gregorian dates or week stuff

    var units,
        defaultValues,
        objNow = tsToObj(tsNow, offsetProvis);

    if (useWeekData) {
      units = orderedWeekUnits;
      defaultValues = defaultWeekUnitValues;
      objNow = gregorianToWeek(objNow);
    } else if (containsOrdinal) {
      units = orderedOrdinalUnits;
      defaultValues = defaultOrdinalUnitValues;
      objNow = gregorianToOrdinal(objNow);
    } else {
      units = orderedUnits$1;
      defaultValues = defaultUnitValues;
    } // set default values for missing stuff


    var foundFirst = false;

    for (var _iterator3 = _createForOfIteratorHelperLoose(units), _step3; !(_step3 = _iterator3()).done;) {
      var u = _step3.value;
      var v = normalized[u];

      if (!isUndefined(v)) {
        foundFirst = true;
      } else if (foundFirst) {
        normalized[u] = defaultValues[u];
      } else {
        normalized[u] = objNow[u];
      }
    } // make sure the values we have are in range


    var higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized),
        invalid = higherOrderInvalid || hasInvalidTimeData(normalized);

    if (invalid) {
      return DateTime.invalid(invalid);
    } // compute the actual time


    var gregorian = useWeekData ? weekToGregorian(normalized) : containsOrdinal ? ordinalToGregorian(normalized) : normalized,
        _objToTS2 = objToTS(gregorian, offsetProvis, zoneToUse),
        tsFinal = _objToTS2[0],
        offsetFinal = _objToTS2[1],
        inst = new DateTime({
      ts: tsFinal,
      zone: zoneToUse,
      o: offsetFinal,
      loc: loc
    }); // gregorian data + weekday serves only to validate


    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
      return DateTime.invalid("mismatched weekday", "you can't specify both a weekday of " + normalized.weekday + " and a date of " + inst.toISO());
    }

    return inst;
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  ;

  DateTime.fromISO = function fromISO(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseISODate = parseISODate(text),
        vals = _parseISODate[0],
        parsedZone = _parseISODate[1];

    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  ;

  DateTime.fromRFC2822 = function fromRFC2822(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseRFC2822Date = parseRFC2822Date(text),
        vals = _parseRFC2822Date[0],
        parsedZone = _parseRFC2822Date[1];

    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  ;

  DateTime.fromHTTP = function fromHTTP(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseHTTPDate = parseHTTPDate(text),
        vals = _parseHTTPDate[0],
        parsedZone = _parseHTTPDate[1];

    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @see https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  ;

  DateTime.fromFormat = function fromFormat(text, fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (isUndefined(text) || isUndefined(fmt)) {
      throw new InvalidArgumentError("fromFormat requires an input string and a format");
    }

    var _opts = opts,
        _opts$locale = _opts.locale,
        locale = _opts$locale === void 0 ? null : _opts$locale,
        _opts$numberingSystem = _opts.numberingSystem,
        numberingSystem = _opts$numberingSystem === void 0 ? null : _opts$numberingSystem,
        localeToUse = Locale.fromOpts({
      locale: locale,
      numberingSystem: numberingSystem,
      defaultToEN: true
    }),
        _parseFromTokens = parseFromTokens(localeToUse, text, fmt),
        vals = _parseFromTokens[0],
        parsedZone = _parseFromTokens[1],
        invalid = _parseFromTokens[2];

    if (invalid) {
      return DateTime.invalid(invalid);
    } else {
      return parseDataToDateTime(vals, parsedZone, opts, "format " + fmt, text);
    }
  }
  /**
   * @deprecated use fromFormat instead
   */
  ;

  DateTime.fromString = function fromString(text, fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    return DateTime.fromFormat(text, fmt, opts);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  ;

  DateTime.fromSQL = function fromSQL(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _parseSQL = parseSQL(text),
        vals = _parseSQL[0],
        parsedZone = _parseSQL[1];

    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  ;

  DateTime.invalid = function invalid(reason, explanation) {
    if (explanation === void 0) {
      explanation = null;
    }

    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
    }

    var invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

    if (Settings.throwOnInvalid) {
      throw new InvalidDateTimeError(invalid);
    } else {
      return new DateTime({
        invalid: invalid
      });
    }
  }
  /**
   * Check if an object is a DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  ;

  DateTime.isDateTime = function isDateTime(o) {
    return o && o.isLuxonDateTime || false;
  } // INFO

  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  ;

  var _proto = DateTime.prototype;

  _proto.get = function get(unit) {
    return this[unit];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  ;

  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  _proto.resolvedLocaleOpts = function resolvedLocaleOpts(opts) {
    if (opts === void 0) {
      opts = {};
    }

    var _Formatter$create$res = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this),
        locale = _Formatter$create$res.locale,
        numberingSystem = _Formatter$create$res.numberingSystem,
        calendar = _Formatter$create$res.calendar;

    return {
      locale: locale,
      numberingSystem: numberingSystem,
      outputCalendar: calendar
    };
  } // TRANSFORM

  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  ;

  _proto.toUTC = function toUTC(offset, opts) {
    if (offset === void 0) {
      offset = 0;
    }

    if (opts === void 0) {
      opts = {};
    }

    return this.setZone(FixedOffsetZone.instance(offset), opts);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  ;

  _proto.toLocal = function toLocal() {
    return this.setZone(Settings.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link plus}. You may wish to use {@link toLocal} and {@link toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  ;

  _proto.setZone = function setZone(zone, _temp) {
    var _ref3 = _temp === void 0 ? {} : _temp,
        _ref3$keepLocalTime = _ref3.keepLocalTime,
        keepLocalTime = _ref3$keepLocalTime === void 0 ? false : _ref3$keepLocalTime,
        _ref3$keepCalendarTim = _ref3.keepCalendarTime,
        keepCalendarTime = _ref3$keepCalendarTim === void 0 ? false : _ref3$keepCalendarTim;

    zone = normalizeZone(zone, Settings.defaultZone);

    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return DateTime.invalid(unsupportedZone(zone));
    } else {
      var newTS = this.ts;

      if (keepLocalTime || keepCalendarTime) {
        var offsetGuess = zone.offset(this.ts);
        var asObj = this.toObject();

        var _objToTS3 = objToTS(asObj, offsetGuess, zone);

        newTS = _objToTS3[0];
      }

      return clone$1(this, {
        ts: newTS,
        zone: zone
      });
    }
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  ;

  _proto.reconfigure = function reconfigure(_temp2) {
    var _ref4 = _temp2 === void 0 ? {} : _temp2,
        locale = _ref4.locale,
        numberingSystem = _ref4.numberingSystem,
        outputCalendar = _ref4.outputCalendar;

    var loc = this.loc.clone({
      locale: locale,
      numberingSystem: numberingSystem,
      outputCalendar: outputCalendar
    });
    return clone$1(this, {
      loc: loc
    });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  ;

  _proto.setLocale = function setLocale(locale) {
    return this.reconfigure({
      locale: locale
    });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link reconfigure} and {@link setZone}.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  ;

  _proto.set = function set(values) {
    if (!this.isValid) return this;
    var normalized = normalizeObject(values, normalizeUnit, []),
        settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday),
        containsOrdinal = !isUndefined(normalized.ordinal),
        containsGregorYear = !isUndefined(normalized.year),
        containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
        containsGregor = containsGregorYear || containsGregorMD,
        definiteWeekDef = normalized.weekYear || normalized.weekNumber;

    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
    }

    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }

    var mixed;

    if (settingWeekStuff) {
      mixed = weekToGregorian(Object.assign(gregorianToWeek(this.c), normalized));
    } else if (!isUndefined(normalized.ordinal)) {
      mixed = ordinalToGregorian(Object.assign(gregorianToOrdinal(this.c), normalized));
    } else {
      mixed = Object.assign(this.toObject(), normalized); // if we didn't set the day but we ended up on an overflow date,
      // use the last day of the right month

      if (isUndefined(normalized.day)) {
        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
      }
    }

    var _objToTS4 = objToTS(mixed, this.o, this.zone),
        ts = _objToTS4[0],
        o = _objToTS4[1];

    return clone$1(this, {
      ts: ts,
      o: o
    });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  ;

  _proto.plus = function plus(duration) {
    if (!this.isValid) return this;
    var dur = friendlyDuration(duration);
    return clone$1(this, adjustTime(this, dur));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
  */
  ;

  _proto.minus = function minus(duration) {
    if (!this.isValid) return this;
    var dur = friendlyDuration(duration).negate();
    return clone$1(this, adjustTime(this, dur));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  ;

  _proto.startOf = function startOf(unit) {
    if (!this.isValid) return this;
    var o = {},
        normalizedUnit = Duration.normalizeUnit(unit);

    switch (normalizedUnit) {
      case "years":
        o.month = 1;
      // falls through

      case "quarters":
      case "months":
        o.day = 1;
      // falls through

      case "weeks":
      case "days":
        o.hour = 0;
      // falls through

      case "hours":
        o.minute = 0;
      // falls through

      case "minutes":
        o.second = 0;
      // falls through

      case "seconds":
        o.millisecond = 0;
        break;
      // no default, invalid units throw in normalizeUnit()
    }

    if (normalizedUnit === "weeks") {
      o.weekday = 1;
    }

    if (normalizedUnit === "quarters") {
      var q = Math.ceil(this.month / 3);
      o.month = (q - 1) * 3 + 1;
    }

    return this.set(o);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  ;

  _proto.endOf = function endOf(unit) {
    var _this$plus;

    return this.isValid ? this.plus((_this$plus = {}, _this$plus[unit] = 1, _this$plus)).startOf(unit).minus(1) : this;
  } // OUTPUT

  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @see https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  ;

  _proto.toFormat = function toFormat(fmt, opts) {
    if (opts === void 0) {
      opts = {};
    }

    return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID$2;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param opts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString({ locale: 'en-gb' }); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hour12: false }); //=> '11:32'
   * @return {string}
   */
  ;

  _proto.toLocaleString = function toLocaleString(opts) {
    if (opts === void 0) {
      opts = DATE_SHORT;
    }

    return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTime(this) : INVALID$2;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  ;

  _proto.toLocaleParts = function toLocaleParts(opts) {
    if (opts === void 0) {
      opts = {};
    }

    return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string}
   */
  ;

  _proto.toISO = function toISO(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) {
      return null;
    }

    return this.toISODate(opts) + "T" + this.toISOTime(opts);
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string}
   */
  ;

  _proto.toISODate = function toISODate(_temp3) {
    var _ref5 = _temp3 === void 0 ? {} : _temp3,
        _ref5$format = _ref5.format,
        format = _ref5$format === void 0 ? "extended" : _ref5$format;

    var fmt = format === "basic" ? "yyyyMMdd" : "yyyy-MM-dd";

    if (this.year > 9999) {
      fmt = "+" + fmt;
    }

    return toTechFormat(this, fmt);
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  ;

  _proto.toISOWeekDate = function toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @return {string}
   */
  ;

  _proto.toISOTime = function toISOTime(_temp4) {
    var _ref6 = _temp4 === void 0 ? {} : _temp4,
        _ref6$suppressMillise = _ref6.suppressMilliseconds,
        suppressMilliseconds = _ref6$suppressMillise === void 0 ? false : _ref6$suppressMillise,
        _ref6$suppressSeconds = _ref6.suppressSeconds,
        suppressSeconds = _ref6$suppressSeconds === void 0 ? false : _ref6$suppressSeconds,
        _ref6$includeOffset = _ref6.includeOffset,
        includeOffset = _ref6$includeOffset === void 0 ? true : _ref6$includeOffset,
        _ref6$includePrefix = _ref6.includePrefix,
        includePrefix = _ref6$includePrefix === void 0 ? false : _ref6$includePrefix,
        _ref6$format = _ref6.format,
        format = _ref6$format === void 0 ? "extended" : _ref6$format;

    return toTechTimeFormat(this, {
      suppressSeconds: suppressSeconds,
      suppressMilliseconds: suppressMilliseconds,
      includeOffset: includeOffset,
      includePrefix: includePrefix,
      format: format
    });
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime, always in UTC
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  ;

  _proto.toRFC2822 = function toRFC2822() {
    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  ;

  _proto.toHTTP = function toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  ;

  _proto.toSQLDate = function toSQLDate() {
    return toTechFormat(this, "yyyy-MM-dd");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  ;

  _proto.toSQLTime = function toSQLTime(_temp5) {
    var _ref7 = _temp5 === void 0 ? {} : _temp5,
        _ref7$includeOffset = _ref7.includeOffset,
        includeOffset = _ref7$includeOffset === void 0 ? true : _ref7$includeOffset,
        _ref7$includeZone = _ref7.includeZone,
        includeZone = _ref7$includeZone === void 0 ? false : _ref7$includeZone;

    return toTechTimeFormat(this, {
      includeOffset: includeOffset,
      includeZone: includeZone,
      spaceZone: true
    });
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  ;

  _proto.toSQL = function toSQL(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) {
      return null;
    }

    return this.toSQLDate() + " " + this.toSQLTime(opts);
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    return this.isValid ? this.toISO() : INVALID$2;
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link toMillis}
   * @return {number}
   */
  ;

  _proto.valueOf = function valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  ;

  _proto.toMillis = function toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds of this DateTime.
   * @return {number}
   */
  ;

  _proto.toSeconds = function toSeconds() {
    return this.isValid ? this.ts / 1000 : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  ;

  _proto.toJSON = function toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  ;

  _proto.toBSON = function toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  ;

  _proto.toObject = function toObject(opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid) return {};
    var base = Object.assign({}, this.c);

    if (opts.includeConfig) {
      base.outputCalendar = this.outputCalendar;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }

    return base;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  ;

  _proto.toJSDate = function toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  } // COMPARE

  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  ;

  _proto.diff = function diff(otherDateTime, unit, opts) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    if (opts === void 0) {
      opts = {};
    }

    if (!this.isValid || !otherDateTime.isValid) {
      return Duration.invalid(this.invalid || otherDateTime.invalid, "created by diffing an invalid DateTime");
    }

    var durOpts = Object.assign({
      locale: this.locale,
      numberingSystem: this.numberingSystem
    }, opts);

    var units = maybeArray(unit).map(Duration.normalizeUnit),
        otherIsLater = otherDateTime.valueOf() > this.valueOf(),
        earlier = otherIsLater ? this : otherDateTime,
        later = otherIsLater ? otherDateTime : this,
        diffed = _diff(earlier, later, units, durOpts);

    return otherIsLater ? diffed.negate() : diffed;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  ;

  _proto.diffNow = function diffNow(unit, opts) {
    if (unit === void 0) {
      unit = "milliseconds";
    }

    if (opts === void 0) {
      opts = {};
    }

    return this.diff(DateTime.now(), unit, opts);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  ;

  _proto.until = function until(otherDateTime) {
    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  ;

  _proto.hasSame = function hasSame(otherDateTime, unit) {
    if (!this.isValid) return false;
    var inputMs = otherDateTime.valueOf();
    var otherZoneDateTime = this.setZone(otherDateTime.zone, {
      keepLocalTime: true
    });
    return otherZoneDateTime.startOf(unit) <= inputMs && inputMs <= otherZoneDateTime.endOf(unit);
  }
  /**
   * Equality check
   * Two DateTimes are equal iff they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  ;

  _proto.equals = function equals(other) {
    return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  ;

  _proto.toRelative = function toRelative(options) {
    if (options === void 0) {
      options = {};
    }

    if (!this.isValid) return null;
    var base = options.base || DateTime.fromObject({
      zone: this.zone
    }),
        padding = options.padding ? this < base ? -options.padding : options.padding : 0;
    var units = ["years", "months", "days", "hours", "minutes", "seconds"];
    var unit = options.unit;

    if (Array.isArray(options.unit)) {
      units = options.unit;
      unit = undefined;
    }

    return diffRelative(base, this.plus(padding), Object.assign(options, {
      numeric: "always",
      units: units,
      unit: unit
    }));
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  ;

  _proto.toRelativeCalendar = function toRelativeCalendar(options) {
    if (options === void 0) {
      options = {};
    }

    if (!this.isValid) return null;
    return diffRelative(options.base || DateTime.fromObject({
      zone: this.zone
    }), this, Object.assign(options, {
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: true
    }));
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  ;

  DateTime.min = function min() {
    for (var _len = arguments.length, dateTimes = new Array(_len), _key = 0; _key < _len; _key++) {
      dateTimes[_key] = arguments[_key];
    }

    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("min requires all arguments be DateTimes");
    }

    return bestBy(dateTimes, function (i) {
      return i.valueOf();
    }, Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  ;

  DateTime.max = function max() {
    for (var _len2 = arguments.length, dateTimes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      dateTimes[_key2] = arguments[_key2];
    }

    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("max requires all arguments be DateTimes");
    }

    return bestBy(dateTimes, function (i) {
      return i.valueOf();
    }, Math.max);
  } // MISC

  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  ;

  DateTime.fromFormatExplain = function fromFormatExplain(text, fmt, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$locale = _options.locale,
        locale = _options$locale === void 0 ? null : _options$locale,
        _options$numberingSys = _options.numberingSystem,
        numberingSystem = _options$numberingSys === void 0 ? null : _options$numberingSys,
        localeToUse = Locale.fromOpts({
      locale: locale,
      numberingSystem: numberingSystem,
      defaultToEN: true
    });
    return explainFromTokens(localeToUse, text, fmt);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  ;

  DateTime.fromStringExplain = function fromStringExplain(text, fmt, options) {
    if (options === void 0) {
      options = {};
    }

    return DateTime.fromFormatExplain(text, fmt, options);
  } // FORMAT PRESETS

  /**
   * {@link toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  ;

  _createClass(DateTime, [{
    key: "isValid",
    get: function get() {
      return this.invalid === null;
    }
    /**
     * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
     * @type {string}
     */

  }, {
    key: "invalidReason",
    get: function get() {
      return this.invalid ? this.invalid.reason : null;
    }
    /**
     * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
     * @type {string}
     */

  }, {
    key: "invalidExplanation",
    get: function get() {
      return this.invalid ? this.invalid.explanation : null;
    }
    /**
     * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
     *
     * @type {string}
     */

  }, {
    key: "locale",
    get: function get() {
      return this.isValid ? this.loc.locale : null;
    }
    /**
     * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
     *
     * @type {string}
     */

  }, {
    key: "numberingSystem",
    get: function get() {
      return this.isValid ? this.loc.numberingSystem : null;
    }
    /**
     * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
     *
     * @type {string}
     */

  }, {
    key: "outputCalendar",
    get: function get() {
      return this.isValid ? this.loc.outputCalendar : null;
    }
    /**
     * Get the time zone associated with this DateTime.
     * @type {Zone}
     */

  }, {
    key: "zone",
    get: function get() {
      return this._zone;
    }
    /**
     * Get the name of the time zone.
     * @type {string}
     */

  }, {
    key: "zoneName",
    get: function get() {
      return this.isValid ? this.zone.name : null;
    }
    /**
     * Get the year
     * @example DateTime.local(2017, 5, 25).year //=> 2017
     * @type {number}
     */

  }, {
    key: "year",
    get: function get() {
      return this.isValid ? this.c.year : NaN;
    }
    /**
     * Get the quarter
     * @example DateTime.local(2017, 5, 25).quarter //=> 2
     * @type {number}
     */

  }, {
    key: "quarter",
    get: function get() {
      return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
    }
    /**
     * Get the month (1-12).
     * @example DateTime.local(2017, 5, 25).month //=> 5
     * @type {number}
     */

  }, {
    key: "month",
    get: function get() {
      return this.isValid ? this.c.month : NaN;
    }
    /**
     * Get the day of the month (1-30ish).
     * @example DateTime.local(2017, 5, 25).day //=> 25
     * @type {number}
     */

  }, {
    key: "day",
    get: function get() {
      return this.isValid ? this.c.day : NaN;
    }
    /**
     * Get the hour of the day (0-23).
     * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
     * @type {number}
     */

  }, {
    key: "hour",
    get: function get() {
      return this.isValid ? this.c.hour : NaN;
    }
    /**
     * Get the minute of the hour (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
     * @type {number}
     */

  }, {
    key: "minute",
    get: function get() {
      return this.isValid ? this.c.minute : NaN;
    }
    /**
     * Get the second of the minute (0-59).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
     * @type {number}
     */

  }, {
    key: "second",
    get: function get() {
      return this.isValid ? this.c.second : NaN;
    }
    /**
     * Get the millisecond of the second (0-999).
     * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
     * @type {number}
     */

  }, {
    key: "millisecond",
    get: function get() {
      return this.isValid ? this.c.millisecond : NaN;
    }
    /**
     * Get the week year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
     * @type {number}
     */

  }, {
    key: "weekYear",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
    }
    /**
     * Get the week number of the week year (1-52ish).
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
     * @type {number}
     */

  }, {
    key: "weekNumber",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
    }
    /**
     * Get the day of the week.
     * 1 is Monday and 7 is Sunday
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2014, 11, 31).weekday //=> 4
     * @type {number}
     */

  }, {
    key: "weekday",
    get: function get() {
      return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
    }
    /**
     * Get the ordinal (meaning the day of the year)
     * @example DateTime.local(2017, 5, 25).ordinal //=> 145
     * @type {number|DateTime}
     */

  }, {
    key: "ordinal",
    get: function get() {
      return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
    }
    /**
     * Get the human readable short month name, such as 'Oct'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
     * @type {string}
     */

  }, {
    key: "monthShort",
    get: function get() {
      return this.isValid ? Info.months("short", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
    /**
     * Get the human readable long month name, such as 'October'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).monthLong //=> October
     * @type {string}
     */

  }, {
    key: "monthLong",
    get: function get() {
      return this.isValid ? Info.months("long", {
        locObj: this.loc
      })[this.month - 1] : null;
    }
    /**
     * Get the human readable short weekday, such as 'Mon'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
     * @type {string}
     */

  }, {
    key: "weekdayShort",
    get: function get() {
      return this.isValid ? Info.weekdays("short", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
    /**
     * Get the human readable long weekday, such as 'Monday'.
     * Defaults to the system's locale if no locale has been specified
     * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
     * @type {string}
     */

  }, {
    key: "weekdayLong",
    get: function get() {
      return this.isValid ? Info.weekdays("long", {
        locObj: this.loc
      })[this.weekday - 1] : null;
    }
    /**
     * Get the UTC offset of this DateTime in minutes
     * @example DateTime.now().offset //=> -240
     * @example DateTime.utc().offset //=> 0
     * @type {number}
     */

  }, {
    key: "offset",
    get: function get() {
      return this.isValid ? +this.o : NaN;
    }
    /**
     * Get the short human name for the zone's current offset, for example "EST" or "EDT".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */

  }, {
    key: "offsetNameShort",
    get: function get() {
      if (this.isValid) {
        return this.zone.offsetName(this.ts, {
          format: "short",
          locale: this.locale
        });
      } else {
        return null;
      }
    }
    /**
     * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
     * Defaults to the system's locale if no locale has been specified
     * @type {string}
     */

  }, {
    key: "offsetNameLong",
    get: function get() {
      if (this.isValid) {
        return this.zone.offsetName(this.ts, {
          format: "long",
          locale: this.locale
        });
      } else {
        return null;
      }
    }
    /**
     * Get whether this zone's offset ever changes, as in a DST.
     * @type {boolean}
     */

  }, {
    key: "isOffsetFixed",
    get: function get() {
      return this.isValid ? this.zone.universal : null;
    }
    /**
     * Get whether the DateTime is in a DST.
     * @type {boolean}
     */

  }, {
    key: "isInDST",
    get: function get() {
      if (this.isOffsetFixed) {
        return false;
      } else {
        return this.offset > this.set({
          month: 1
        }).offset || this.offset > this.set({
          month: 5
        }).offset;
      }
    }
    /**
     * Returns true if this DateTime is in a leap year, false otherwise
     * @example DateTime.local(2016).isInLeapYear //=> true
     * @example DateTime.local(2013).isInLeapYear //=> false
     * @type {boolean}
     */

  }, {
    key: "isInLeapYear",
    get: function get() {
      return isLeapYear(this.year);
    }
    /**
     * Returns the number of days in this DateTime's month
     * @example DateTime.local(2016, 2).daysInMonth //=> 29
     * @example DateTime.local(2016, 3).daysInMonth //=> 31
     * @type {number}
     */

  }, {
    key: "daysInMonth",
    get: function get() {
      return daysInMonth(this.year, this.month);
    }
    /**
     * Returns the number of days in this DateTime's year
     * @example DateTime.local(2016).daysInYear //=> 366
     * @example DateTime.local(2013).daysInYear //=> 365
     * @type {number}
     */

  }, {
    key: "daysInYear",
    get: function get() {
      return this.isValid ? daysInYear(this.year) : NaN;
    }
    /**
     * Returns the number of weeks in this DateTime's year
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     * @example DateTime.local(2004).weeksInWeekYear //=> 53
     * @example DateTime.local(2013).weeksInWeekYear //=> 52
     * @type {number}
     */

  }, {
    key: "weeksInWeekYear",
    get: function get() {
      return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
    }
  }], [{
    key: "DATE_SHORT",
    get: function get() {
      return DATE_SHORT;
    }
    /**
     * {@link toLocaleString} format like 'Oct 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_MED",
    get: function get() {
      return DATE_MED;
    }
    /**
     * {@link toLocaleString} format like 'Fri, Oct 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_MED_WITH_WEEKDAY",
    get: function get() {
      return DATE_MED_WITH_WEEKDAY;
    }
    /**
     * {@link toLocaleString} format like 'October 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_FULL",
    get: function get() {
      return DATE_FULL;
    }
    /**
     * {@link toLocaleString} format like 'Tuesday, October 14, 1983'
     * @type {Object}
     */

  }, {
    key: "DATE_HUGE",
    get: function get() {
      return DATE_HUGE;
    }
    /**
     * {@link toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_SIMPLE",
    get: function get() {
      return TIME_SIMPLE;
    }
    /**
     * {@link toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_WITH_SECONDS",
    get: function get() {
      return TIME_WITH_SECONDS;
    }
    /**
     * {@link toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_WITH_SHORT_OFFSET",
    get: function get() {
      return TIME_WITH_SHORT_OFFSET;
    }
    /**
     * {@link toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "TIME_WITH_LONG_OFFSET",
    get: function get() {
      return TIME_WITH_LONG_OFFSET;
    }
    /**
     * {@link toLocaleString} format like '09:30', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_SIMPLE",
    get: function get() {
      return TIME_24_SIMPLE;
    }
    /**
     * {@link toLocaleString} format like '09:30:23', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_WITH_SECONDS",
    get: function get() {
      return TIME_24_WITH_SECONDS;
    }
    /**
     * {@link toLocaleString} format like '09:30:23 EDT', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_WITH_SHORT_OFFSET",
    get: function get() {
      return TIME_24_WITH_SHORT_OFFSET;
    }
    /**
     * {@link toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
     * @type {Object}
     */

  }, {
    key: "TIME_24_WITH_LONG_OFFSET",
    get: function get() {
      return TIME_24_WITH_LONG_OFFSET;
    }
    /**
     * {@link toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_SHORT",
    get: function get() {
      return DATETIME_SHORT;
    }
    /**
     * {@link toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_SHORT_WITH_SECONDS",
    get: function get() {
      return DATETIME_SHORT_WITH_SECONDS;
    }
    /**
     * {@link toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_MED",
    get: function get() {
      return DATETIME_MED;
    }
    /**
     * {@link toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_MED_WITH_SECONDS",
    get: function get() {
      return DATETIME_MED_WITH_SECONDS;
    }
    /**
     * {@link toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_MED_WITH_WEEKDAY",
    get: function get() {
      return DATETIME_MED_WITH_WEEKDAY;
    }
    /**
     * {@link toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_FULL",
    get: function get() {
      return DATETIME_FULL;
    }
    /**
     * {@link toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_FULL_WITH_SECONDS",
    get: function get() {
      return DATETIME_FULL_WITH_SECONDS;
    }
    /**
     * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_HUGE",
    get: function get() {
      return DATETIME_HUGE;
    }
    /**
     * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
     * @type {Object}
     */

  }, {
    key: "DATETIME_HUGE_WITH_SECONDS",
    get: function get() {
      return DATETIME_HUGE_WITH_SECONDS;
    }
  }]);

  return DateTime;
}();
function friendlyDateTime(dateTimeish) {
  if (DateTime.isDateTime(dateTimeish)) {
    return dateTimeish;
  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish && typeof dateTimeish === "object") {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new InvalidArgumentError("Unknown datetime argument: " + dateTimeish + ", of type " + typeof dateTimeish);
  }
}

var VERSION = "1.28.0";

exports.DateTime = DateTime;
exports.Duration = Duration;
exports.FixedOffsetZone = FixedOffsetZone;
exports.IANAZone = IANAZone;
exports.Info = Info;
exports.Interval = Interval;
exports.InvalidZone = InvalidZone;
exports.LocalZone = LocalZone;
exports.Settings = Settings;
exports.VERSION = VERSION;
exports.Zone = Zone;
//# sourceMappingURL=luxon.js.map

},{}],"evcW":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// =============================================================================
// i18n
// =============================================================================
var ENGLISH = {
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  tokens: {
    'SKIP': /^[ \r\n\t]+|^\.$/,
    'number': /^[1-9][0-9]*/,
    'numberAsText': /^(one|two|three)/i,
    'every': /^every/i,
    'day(s)': /^days?/i,
    'weekday(s)': /^weekdays?/i,
    'week(s)': /^weeks?/i,
    'hour(s)': /^hours?/i,
    'minute(s)': /^minutes?/i,
    'month(s)': /^months?/i,
    'year(s)': /^years?/i,
    'on': /^(on|in)/i,
    'at': /^(at)/i,
    'the': /^the/i,
    'first': /^first/i,
    'second': /^second/i,
    'third': /^third/i,
    'nth': /^([1-9][0-9]*)(\.|th|nd|rd|st)/i,
    'last': /^last/i,
    'for': /^for/i,
    'time(s)': /^times?/i,
    'until': /^(un)?til/i,
    'monday': /^mo(n(day)?)?/i,
    'tuesday': /^tu(e(s(day)?)?)?/i,
    'wednesday': /^we(d(n(esday)?)?)?/i,
    'thursday': /^th(u(r(sday)?)?)?/i,
    'friday': /^fr(i(day)?)?/i,
    'saturday': /^sa(t(urday)?)?/i,
    'sunday': /^su(n(day)?)?/i,
    'january': /^jan(uary)?/i,
    'february': /^feb(ruary)?/i,
    'march': /^mar(ch)?/i,
    'april': /^apr(il)?/i,
    'may': /^may/i,
    'june': /^june?/i,
    'july': /^july?/i,
    'august': /^aug(ust)?/i,
    'september': /^sep(t(ember)?)?/i,
    'october': /^oct(ober)?/i,
    'november': /^nov(ember)?/i,
    'december': /^dec(ember)?/i,
    'comma': /^(,\s*|(and|or)\s*)+/i
  }
};
var _default = ENGLISH;
exports.default = _default;
},{}],"fozm":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18n = _interopRequireDefault(require("./i18n"));

var _index = _interopRequireDefault(require("../index"));

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// =============================================================================
// Helper functions
// =============================================================================

/**
 * Return true if a value is in an array
 */
var contains = function (arr, val) {
  return arr.indexOf(val) !== -1;
};

var defaultGetText = function (id) {
  return id.toString();
};
/**
 *
 * @param {RRule} rrule
 * Optional:
 * @param {Function} gettext function
 * @param {Object} language definition
 * @constructor
 */


var ToText =
/** @class */
function () {
  function ToText(rrule, gettext, language) {
    if (gettext === void 0) {
      gettext = defaultGetText;
    }

    if (language === void 0) {
      language = _i18n.default;
    }

    this.text = [];
    this.language = language || _i18n.default;
    this.gettext = gettext;
    this.rrule = rrule;
    this.options = rrule.options;
    this.origOptions = rrule.origOptions;

    if (this.origOptions.bymonthday) {
      var bymonthday = [].concat(this.options.bymonthday);
      var bynmonthday = [].concat(this.options.bynmonthday);
      bymonthday.sort(function (a, b) {
        return a - b;
      });
      bynmonthday.sort(function (a, b) {
        return b - a;
      }); // 1, 2, 3, .., -5, -4, -3, ..

      this.bymonthday = bymonthday.concat(bynmonthday);
      if (!this.bymonthday.length) this.bymonthday = null;
    }

    if ((0, _helpers.isPresent)(this.origOptions.byweekday)) {
      var byweekday = !(0, _helpers.isArray)(this.origOptions.byweekday) ? [this.origOptions.byweekday] : this.origOptions.byweekday;
      var days = String(byweekday);
      this.byweekday = {
        allWeeks: byweekday.filter(function (weekday) {
          return !weekday.n;
        }),
        someWeeks: byweekday.filter(function (weekday) {
          return Boolean(weekday.n);
        }),
        isWeekdays: days.indexOf('MO') !== -1 && days.indexOf('TU') !== -1 && days.indexOf('WE') !== -1 && days.indexOf('TH') !== -1 && days.indexOf('FR') !== -1 && days.indexOf('SA') === -1 && days.indexOf('SU') === -1,
        isEveryDay: days.indexOf('MO') !== -1 && days.indexOf('TU') !== -1 && days.indexOf('WE') !== -1 && days.indexOf('TH') !== -1 && days.indexOf('FR') !== -1 && days.indexOf('SA') !== -1 && days.indexOf('SU') !== -1
      };

      var sortWeekDays = function (a, b) {
        return a.weekday - b.weekday;
      };

      this.byweekday.allWeeks.sort(sortWeekDays);
      this.byweekday.someWeeks.sort(sortWeekDays);
      if (!this.byweekday.allWeeks.length) this.byweekday.allWeeks = null;
      if (!this.byweekday.someWeeks.length) this.byweekday.someWeeks = null;
    } else {
      this.byweekday = null;
    }
  }
  /**
   * Test whether the rrule can be fully converted to text.
   * @param {RRule} rrule
   * @return {Boolean}
   */


  ToText.isFullyConvertible = function (rrule) {
    var canConvert = true;
    if (!(rrule.options.freq in ToText.IMPLEMENTED)) return false;
    if (rrule.origOptions.until && rrule.origOptions.count) return false;

    for (var key in rrule.origOptions) {
      if (contains(['dtstart', 'wkst', 'freq'], key)) return true;
      if (!contains(ToText.IMPLEMENTED[rrule.options.freq], key)) return false;
    }

    return canConvert;
  };

  ToText.prototype.isFullyConvertible = function () {
    return ToText.isFullyConvertible(this.rrule);
  };
  /**
   * Perform the conversion. Only some of the frequencies are supported.
   * If some of the rrule's options aren't supported, they'll
   * be omitted from the output an "(~ approximate)" will be appended.
   * @return {*}
   */


  ToText.prototype.toString = function () {
    var gettext = this.gettext;

    if (!(this.options.freq in ToText.IMPLEMENTED)) {
      return gettext('RRule error: Unable to fully convert this rrule to text');
    }

    this.text = [gettext('every')]; // @ts-ignore

    this[_index.default.FREQUENCIES[this.options.freq]]();

    if (this.options.until) {
      this.add(gettext('until'));
      var until = this.options.until;
      this.add(this.language.monthNames[until.getUTCMonth()]).add(until.getUTCDate() + ',').add(until.getUTCFullYear().toString());
    } else if (this.options.count) {
      this.add(gettext('for')).add(this.options.count.toString()).add(this.plural(this.options.count) ? gettext('times') : gettext('time'));
    }

    if (!this.isFullyConvertible()) this.add(gettext('(~ approximate)'));
    return this.text.join('');
  };

  ToText.prototype.HOURLY = function () {
    var gettext = this.gettext;
    if (this.options.interval !== 1) this.add(this.options.interval.toString());
    this.add(this.plural(this.options.interval) ? gettext('hours') : gettext('hour'));
  };

  ToText.prototype.MINUTELY = function () {
    var gettext = this.gettext;
    if (this.options.interval !== 1) this.add(this.options.interval.toString());
    this.add(this.plural(this.options.interval) ? gettext('minutes') : gettext('minutes'));
  };

  ToText.prototype.DAILY = function () {
    var gettext = this.gettext;
    if (this.options.interval !== 1) this.add(this.options.interval.toString());

    if (this.byweekday && this.byweekday.isWeekdays) {
      this.add(this.plural(this.options.interval) ? gettext('weekdays') : gettext('weekday'));
    } else {
      this.add(this.plural(this.options.interval) ? gettext('days') : gettext('day'));
    }

    if (this.origOptions.bymonth) {
      this.add(gettext('in'));

      this._bymonth();
    }

    if (this.bymonthday) {
      this._bymonthday();
    } else if (this.byweekday) {
      this._byweekday();
    } else if (this.origOptions.byhour) {
      this._byhour();
    }
  };

  ToText.prototype.WEEKLY = function () {
    var gettext = this.gettext;

    if (this.options.interval !== 1) {
      this.add(this.options.interval.toString()).add(this.plural(this.options.interval) ? gettext('weeks') : gettext('week'));
    }

    if (this.byweekday && this.byweekday.isWeekdays) {
      if (this.options.interval === 1) {
        this.add(this.plural(this.options.interval) ? gettext('weekdays') : gettext('weekday'));
      } else {
        this.add(gettext('on')).add(gettext('weekdays'));
      }
    } else if (this.byweekday && this.byweekday.isEveryDay) {
      this.add(this.plural(this.options.interval) ? gettext('days') : gettext('day'));
    } else {
      if (this.options.interval === 1) this.add(gettext('week'));

      if (this.origOptions.bymonth) {
        this.add(gettext('in'));

        this._bymonth();
      }

      if (this.bymonthday) {
        this._bymonthday();
      } else if (this.byweekday) {
        this._byweekday();
      }
    }
  };

  ToText.prototype.MONTHLY = function () {
    var gettext = this.gettext;

    if (this.origOptions.bymonth) {
      if (this.options.interval !== 1) {
        this.add(this.options.interval.toString()).add(gettext('months'));
        if (this.plural(this.options.interval)) this.add(gettext('in'));
      } else {// this.add(gettext('MONTH'))
      }

      this._bymonth();
    } else {
      if (this.options.interval !== 1) this.add(this.options.interval.toString());
      this.add(this.plural(this.options.interval) ? gettext('months') : gettext('month'));
    }

    if (this.bymonthday) {
      this._bymonthday();
    } else if (this.byweekday && this.byweekday.isWeekdays) {
      this.add(gettext('on')).add(gettext('weekdays'));
    } else if (this.byweekday) {
      this._byweekday();
    }
  };

  ToText.prototype.YEARLY = function () {
    var gettext = this.gettext;

    if (this.origOptions.bymonth) {
      if (this.options.interval !== 1) {
        this.add(this.options.interval.toString());
        this.add(gettext('years'));
      } else {// this.add(gettext('YEAR'))
      }

      this._bymonth();
    } else {
      if (this.options.interval !== 1) this.add(this.options.interval.toString());
      this.add(this.plural(this.options.interval) ? gettext('years') : gettext('year'));
    }

    if (this.bymonthday) {
      this._bymonthday();
    } else if (this.byweekday) {
      this._byweekday();
    }

    if (this.options.byyearday) {
      this.add(gettext('on the')).add(this.list(this.options.byyearday, this.nth, gettext('and'))).add(gettext('day'));
    }

    if (this.options.byweekno) {
      this.add(gettext('in')).add(this.plural(this.options.byweekno.length) ? gettext('weeks') : gettext('week')).add(this.list(this.options.byweekno, undefined, gettext('and')));
    }
  };

  ToText.prototype._bymonthday = function () {
    var gettext = this.gettext;

    if (this.byweekday && this.byweekday.allWeeks) {
      this.add(gettext('on')).add(this.list(this.byweekday.allWeeks, this.weekdaytext, gettext('or'))).add(gettext('the')).add(this.list(this.bymonthday, this.nth, gettext('or')));
    } else {
      this.add(gettext('on the')).add(this.list(this.bymonthday, this.nth, gettext('and')));
    } // this.add(gettext('DAY'))

  };

  ToText.prototype._byweekday = function () {
    var gettext = this.gettext;

    if (this.byweekday.allWeeks && !this.byweekday.isWeekdays) {
      this.add(gettext('on')).add(this.list(this.byweekday.allWeeks, this.weekdaytext));
    }

    if (this.byweekday.someWeeks) {
      if (this.byweekday.allWeeks) this.add(gettext('and'));
      this.add(gettext('on the')).add(this.list(this.byweekday.someWeeks, this.weekdaytext, gettext('and')));
    }
  };

  ToText.prototype._byhour = function () {
    var gettext = this.gettext;
    this.add(gettext('at')).add(this.list(this.origOptions.byhour, undefined, gettext('and')));
  };

  ToText.prototype._bymonth = function () {
    this.add(this.list(this.options.bymonth, this.monthtext, this.gettext('and')));
  };

  ToText.prototype.nth = function (n) {
    n = parseInt(n.toString(), 10);
    var nth;
    var npos;
    var gettext = this.gettext;
    if (n === -1) return gettext('last');
    npos = Math.abs(n);

    switch (npos) {
      case 1:
      case 21:
      case 31:
        nth = npos + gettext('st');
        break;

      case 2:
      case 22:
        nth = npos + gettext('nd');
        break;

      case 3:
      case 23:
        nth = npos + gettext('rd');
        break;

      default:
        nth = npos + gettext('th');
    }

    return n < 0 ? nth + ' ' + gettext('last') : nth;
  };

  ToText.prototype.monthtext = function (m) {
    return this.language.monthNames[m - 1];
  };

  ToText.prototype.weekdaytext = function (wday) {
    var weekday = (0, _helpers.isNumber)(wday) ? (wday + 1) % 7 : wday.getJsWeekday();
    return (wday.n ? this.nth(wday.n) + ' ' : '') + this.language.dayNames[weekday];
  };

  ToText.prototype.plural = function (n) {
    return n % 100 !== 1;
  };

  ToText.prototype.add = function (s) {
    this.text.push(' ');
    this.text.push(s);
    return this;
  };

  ToText.prototype.list = function (arr, callback, finalDelim, delim) {
    if (delim === void 0) {
      delim = ',';
    }

    if (!(0, _helpers.isArray)(arr)) {
      arr = [arr];
    }

    var delimJoin = function (array, delimiter, finalDelimiter) {
      var list = '';

      for (var i = 0; i < array.length; i++) {
        if (i !== 0) {
          if (i === array.length - 1) {
            list += ' ' + finalDelimiter + ' ';
          } else {
            list += delimiter + ' ';
          }
        }

        list += array[i];
      }

      return list;
    };

    callback = callback || function (o) {
      return o.toString();
    };

    var self = this;

    var realCallback = function (arg) {
      return callback && callback.call(self, arg);
    };

    if (finalDelim) {
      return delimJoin(arr.map(realCallback), delim, finalDelim);
    } else {
      return arr.map(realCallback).join(delim + ' ');
    }
  };

  return ToText;
}();

var _default = ToText;
exports.default = _default;
},{"./i18n":"evcW","../index":"IVs2","../helpers":"O7gF"}],"w3QR":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseText;

var _i18n = _interopRequireDefault(require("./i18n"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// =============================================================================
// Parser
// =============================================================================
var Parser =
/** @class */
function () {
  function Parser(rules) {
    this.done = true;
    this.rules = rules;
  }

  Parser.prototype.start = function (text) {
    this.text = text;
    this.done = false;
    return this.nextSymbol();
  };

  Parser.prototype.isDone = function () {
    return this.done && this.symbol === null;
  };

  Parser.prototype.nextSymbol = function () {
    var best;
    var bestSymbol;
    var p = this;
    this.symbol = null;
    this.value = null;

    do {
      if (this.done) return false;
      var rule = void 0;
      best = null;

      for (var name_1 in this.rules) {
        rule = this.rules[name_1];
        var match = rule.exec(p.text);

        if (match) {
          if (best === null || match[0].length > best[0].length) {
            best = match;
            bestSymbol = name_1;
          }
        }
      }

      if (best != null) {
        this.text = this.text.substr(best[0].length);
        if (this.text === '') this.done = true;
      }

      if (best == null) {
        this.done = true;
        this.symbol = null;
        this.value = null;
        return;
      } // @ts-ignore

    } while (bestSymbol === 'SKIP'); // @ts-ignore


    this.symbol = bestSymbol;
    this.value = best;
    return true;
  };

  Parser.prototype.accept = function (name) {
    if (this.symbol === name) {
      if (this.value) {
        var v = this.value;
        this.nextSymbol();
        return v;
      }

      this.nextSymbol();
      return true;
    }

    return false;
  };

  Parser.prototype.acceptNumber = function () {
    return this.accept('number');
  };

  Parser.prototype.expect = function (name) {
    if (this.accept(name)) return true;
    throw new Error('expected ' + name + ' but found ' + this.symbol);
  };

  return Parser;
}();

function parseText(text, language) {
  if (language === void 0) {
    language = _i18n.default;
  }

  var options = {};
  var ttr = new Parser(language.tokens);
  if (!ttr.start(text)) return null;
  S();
  return options;

  function S() {
    // every [n]
    ttr.expect('every');
    var n = ttr.acceptNumber();
    if (n) options.interval = parseInt(n[0], 10);
    if (ttr.isDone()) throw new Error('Unexpected end');

    switch (ttr.symbol) {
      case 'day(s)':
        options.freq = _index.default.DAILY;

        if (ttr.nextSymbol()) {
          AT();
          F();
        }

        break;
      // FIXME Note: every 2 weekdays != every two weeks on weekdays.
      // DAILY on weekdays is not a valid rule

      case 'weekday(s)':
        options.freq = _index.default.WEEKLY;
        options.byweekday = [_index.default.MO, _index.default.TU, _index.default.WE, _index.default.TH, _index.default.FR];
        ttr.nextSymbol();
        F();
        break;

      case 'week(s)':
        options.freq = _index.default.WEEKLY;

        if (ttr.nextSymbol()) {
          ON();
          F();
        }

        break;

      case 'hour(s)':
        options.freq = _index.default.HOURLY;

        if (ttr.nextSymbol()) {
          ON();
          F();
        }

        break;

      case 'minute(s)':
        options.freq = _index.default.MINUTELY;

        if (ttr.nextSymbol()) {
          ON();
          F();
        }

        break;

      case 'month(s)':
        options.freq = _index.default.MONTHLY;

        if (ttr.nextSymbol()) {
          ON();
          F();
        }

        break;

      case 'year(s)':
        options.freq = _index.default.YEARLY;

        if (ttr.nextSymbol()) {
          ON();
          F();
        }

        break;

      case 'monday':
      case 'tuesday':
      case 'wednesday':
      case 'thursday':
      case 'friday':
      case 'saturday':
      case 'sunday':
        options.freq = _index.default.WEEKLY;
        var key = ttr.symbol.substr(0, 2).toUpperCase();
        options.byweekday = [_index.default[key]];
        if (!ttr.nextSymbol()) return; // TODO check for duplicates

        while (ttr.accept('comma')) {
          if (ttr.isDone()) throw new Error('Unexpected end');
          var wkd = decodeWKD();

          if (!wkd) {
            throw new Error('Unexpected symbol ' + ttr.symbol + ', expected weekday');
          } // @ts-ignore


          options.byweekday.push(_index.default[wkd]);
          ttr.nextSymbol();
        }

        MDAYs();
        F();
        break;

      case 'january':
      case 'february':
      case 'march':
      case 'april':
      case 'may':
      case 'june':
      case 'july':
      case 'august':
      case 'september':
      case 'october':
      case 'november':
      case 'december':
        options.freq = _index.default.YEARLY;
        options.bymonth = [decodeM()];
        if (!ttr.nextSymbol()) return; // TODO check for duplicates

        while (ttr.accept('comma')) {
          if (ttr.isDone()) throw new Error('Unexpected end');
          var m = decodeM();

          if (!m) {
            throw new Error('Unexpected symbol ' + ttr.symbol + ', expected month');
          }

          options.bymonth.push(m);
          ttr.nextSymbol();
        }

        ON();
        F();
        break;

      default:
        throw new Error('Unknown symbol');
    }
  }

  function ON() {
    var on = ttr.accept('on');
    var the = ttr.accept('the');
    if (!(on || the)) return;

    do {
      var nth = decodeNTH();
      var wkd = decodeWKD();
      var m = decodeM(); // nth <weekday> | <weekday>

      if (nth) {
        // ttr.nextSymbol()
        if (wkd) {
          ttr.nextSymbol();
          if (!options.byweekday) options.byweekday = []; // @ts-ignore

          options.byweekday.push(_index.default[wkd].nth(nth));
        } else {
          if (!options.bymonthday) options.bymonthday = []; // @ts-ignore

          options.bymonthday.push(nth);
          ttr.accept('day(s)');
        } // <weekday>

      } else if (wkd) {
        ttr.nextSymbol();
        if (!options.byweekday) options.byweekday = []; // @ts-ignore

        options.byweekday.push(_index.default[wkd]);
      } else if (ttr.symbol === 'weekday(s)') {
        ttr.nextSymbol();

        if (!options.byweekday) {
          options.byweekday = [_index.default.MO, _index.default.TU, _index.default.WE, _index.default.TH, _index.default.FR];
        }
      } else if (ttr.symbol === 'week(s)') {
        ttr.nextSymbol();
        var n = ttr.acceptNumber();

        if (!n) {
          throw new Error('Unexpected symbol ' + ttr.symbol + ', expected week number');
        }

        options.byweekno = [parseInt(n[0], 10)];

        while (ttr.accept('comma')) {
          n = ttr.acceptNumber();

          if (!n) {
            throw new Error('Unexpected symbol ' + ttr.symbol + '; expected monthday');
          }

          options.byweekno.push(parseInt(n[0], 10));
        }
      } else if (m) {
        ttr.nextSymbol();
        if (!options.bymonth) options.bymonth = []; // @ts-ignore

        options.bymonth.push(m);
      } else {
        return;
      }
    } while (ttr.accept('comma') || ttr.accept('the') || ttr.accept('on'));
  }

  function AT() {
    var at = ttr.accept('at');
    if (!at) return;

    do {
      var n = ttr.acceptNumber();

      if (!n) {
        throw new Error('Unexpected symbol ' + ttr.symbol + ', expected hour');
      }

      options.byhour = [parseInt(n[0], 10)];

      while (ttr.accept('comma')) {
        n = ttr.acceptNumber();

        if (!n) {
          throw new Error('Unexpected symbol ' + ttr.symbol + '; expected hour');
        }

        options.byhour.push(parseInt(n[0], 10));
      }
    } while (ttr.accept('comma') || ttr.accept('at'));
  }

  function decodeM() {
    switch (ttr.symbol) {
      case 'january':
        return 1;

      case 'february':
        return 2;

      case 'march':
        return 3;

      case 'april':
        return 4;

      case 'may':
        return 5;

      case 'june':
        return 6;

      case 'july':
        return 7;

      case 'august':
        return 8;

      case 'september':
        return 9;

      case 'october':
        return 10;

      case 'november':
        return 11;

      case 'december':
        return 12;

      default:
        return false;
    }
  }

  function decodeWKD() {
    switch (ttr.symbol) {
      case 'monday':
      case 'tuesday':
      case 'wednesday':
      case 'thursday':
      case 'friday':
      case 'saturday':
      case 'sunday':
        return ttr.symbol.substr(0, 2).toUpperCase();

      default:
        return false;
    }
  }

  function decodeNTH() {
    switch (ttr.symbol) {
      case 'last':
        ttr.nextSymbol();
        return -1;

      case 'first':
        ttr.nextSymbol();
        return 1;

      case 'second':
        ttr.nextSymbol();
        return ttr.accept('last') ? -2 : 2;

      case 'third':
        ttr.nextSymbol();
        return ttr.accept('last') ? -3 : 3;

      case 'nth':
        var v = parseInt(ttr.value[1], 10);
        if (v < -366 || v > 366) throw new Error('Nth out of range: ' + v);
        ttr.nextSymbol();
        return ttr.accept('last') ? -v : v;

      default:
        return false;
    }
  }

  function MDAYs() {
    ttr.accept('on');
    ttr.accept('the');
    var nth = decodeNTH();
    if (!nth) return;
    options.bymonthday = [nth];
    ttr.nextSymbol();

    while (ttr.accept('comma')) {
      nth = decodeNTH();

      if (!nth) {
        throw new Error('Unexpected symbol ' + ttr.symbol + '; expected monthday');
      }

      options.bymonthday.push(nth);
      ttr.nextSymbol();
    }
  }

  function F() {
    if (ttr.symbol === 'until') {
      var date = Date.parse(ttr.text);
      if (!date) throw new Error('Cannot parse until date:' + ttr.text);
      options.until = new Date(date);
    } else if (ttr.accept('for')) {
      options.count = parseInt(ttr.value[0], 10);
      ttr.expect('number'); // ttr.expect('times')
    }
  }
}
},{"./i18n":"evcW","../index":"IVs2"}],"qiVg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFullyConvertible = exports.fromText = void 0;
Object.defineProperty(exports, "parseText", {
  enumerable: true,
  get: function () {
    return _parsetext.default;
  }
});
exports.toText = void 0;

var _totext = _interopRequireDefault(require("./totext"));

var _parsetext = _interopRequireDefault(require("./parsetext"));

var _index = _interopRequireDefault(require("../index"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
* rrule.js - Library for working with recurrence rules for calendar dates.
* https://github.com/jakubroztocil/rrule
*
* Copyright 2010, Jakub Roztocil and Lars Schoning
* Licenced under the BSD licence.
* https://github.com/jakubroztocil/rrule/blob/master/LICENCE
*
*/

/**
 *
 * Implementation of RRule.fromText() and RRule::toText().
 *
 *
 * On the client side, this file needs to be included
 * when those functions are used.
 *
 */
// =============================================================================
// fromText
// =============================================================================

/**
 * Will be able to convert some of the below described rules from
 * text format to a rule object.
 *
 *
 * RULES
 *
 * Every ([n])
 *       day(s)
 *     | [weekday], ..., (and) [weekday]
 *     | weekday(s)
 *     | week(s)
 *     | month(s)
 *     | [month], ..., (and) [month]
 *     | year(s)
 *
 *
 * Plus 0, 1, or multiple of these:
 *
 * on [weekday], ..., (or) [weekday] the [monthday], [monthday], ... (or) [monthday]
 *
 * on [weekday], ..., (and) [weekday]
 *
 * on the [monthday], [monthday], ... (and) [monthday] (day of the month)
 *
 * on the [nth-weekday], ..., (and) [nth-weekday] (of the month/year)
 *
 *
 * Plus 0 or 1 of these:
 *
 * for [n] time(s)
 *
 * until [date]
 *
 * Plus (.)
 *
 *
 * Definitely no supported for parsing:
 *
 * (for year):
 *     in week(s) [n], ..., (and) [n]
 *
 *     on the [yearday], ..., (and) [n] day of the year
 *     on day [yearday], ..., (and) [n]
 *
 *
 * NON-TERMINALS
 *
 * [n]: 1, 2 ..., one, two, three ..
 * [month]: January, February, March, April, May, ... December
 * [weekday]: Monday, ... Sunday
 * [nth-weekday]: first [weekday], 2nd [weekday], ... last [weekday], ...
 * [monthday]: first, 1., 2., 1st, 2nd, second, ... 31st, last day, 2nd last day, ..
 * [date]:
 *     [month] (0-31(,) ([year])),
 *     (the) 0-31.(1-12.([year])),
 *     (the) 0-31/(1-12/([year])),
 *     [weekday]
 *
 * [year]: 0000, 0001, ... 01, 02, ..
 *
 * Definitely not supported for parsing:
 *
 * [yearday]: first, 1., 2., 1st, 2nd, second, ... 366th, last day, 2nd last day, ..
 *
 * @param {String} text
 * @return {Object, Boolean} the rule, or null.
 */
var fromText = function (text, language) {
  if (language === void 0) {
    language = _i18n.default;
  }

  return new _index.default((0, _parsetext.default)(text, language) || undefined);
};

exports.fromText = fromText;
var common = ['count', 'until', 'interval', 'byweekday', 'bymonthday', 'bymonth'];
_totext.default.IMPLEMENTED = [];
_totext.default.IMPLEMENTED[_index.default.HOURLY] = common;
_totext.default.IMPLEMENTED[_index.default.MINUTELY] = common;
_totext.default.IMPLEMENTED[_index.default.DAILY] = ['byhour'].concat(common);
_totext.default.IMPLEMENTED[_index.default.WEEKLY] = common;
_totext.default.IMPLEMENTED[_index.default.MONTHLY] = common;
_totext.default.IMPLEMENTED[_index.default.YEARLY] = ['byweekno', 'byyearday'].concat(common); // =============================================================================
// Export
// =============================================================================

var toText = function (rrule, gettext, language) {
  return new _totext.default(rrule, gettext, language).toString();
};

exports.toText = toText;
var isFullyConvertible = _totext.default.isFullyConvertible;
exports.isFullyConvertible = isFullyConvertible;
},{"./totext":"fozm","./parsetext":"w3QR","../index":"IVs2","./i18n":"evcW"}],"adWO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultKeys = exports.default = exports.Days = exports.DEFAULT_OPTIONS = void 0;

var _dateutil = _interopRequireDefault(require("./dateutil"));

var _iterinfo = _interopRequireDefault(require("./iterinfo"));

var _helpers = require("./helpers");

var _iterresult = _interopRequireDefault(require("./iterresult"));

var _callbackiterresult = _interopRequireDefault(require("./callbackiterresult"));

var _types = require("./types");

var _parseoptions = require("./parseoptions");

var _parsestring = require("./parsestring");

var _optionstostring = require("./optionstostring");

var _cache = require("./cache");

var _weekday = require("./weekday");

var _luxon = require("luxon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getnlp = function () {
  // Lazy, runtime import to avoid circular refs.
  if (!getnlp._nlp) {
    getnlp._nlp = require('./nlp');
  }

  return getnlp._nlp;
}; // =============================================================================
// RRule
// =============================================================================


var Days = {
  MO: new _weekday.Weekday(0),
  TU: new _weekday.Weekday(1),
  WE: new _weekday.Weekday(2),
  TH: new _weekday.Weekday(3),
  FR: new _weekday.Weekday(4),
  SA: new _weekday.Weekday(5),
  SU: new _weekday.Weekday(6)
};
exports.Days = Days;
var DEFAULT_OPTIONS = {
  freq: _types.Frequency.YEARLY,
  dtstart: null,
  interval: 1,
  wkst: Days.MO,
  count: null,
  until: null,
  tzid: null,
  bysetpos: null,
  bymonth: null,
  bymonthday: null,
  bynmonthday: null,
  byyearday: null,
  byweekno: null,
  byweekday: null,
  bynweekday: null,
  byhour: null,
  byminute: null,
  bysecond: null,
  byeaster: null
};
exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
var defaultKeys = Object.keys(DEFAULT_OPTIONS);
/**
 *
 * @param {Options?} options - see <http://labix.org/python-dateutil/#head-cf004ee9a75592797e076752b2a889c10f445418>
 *        The only required option is `freq`, one of RRule.YEARLY, RRule.MONTHLY, ...
 * @constructor
 */

exports.defaultKeys = defaultKeys;

var RRule =
/** @class */
function () {
  function RRule(options, noCache) {
    if (options === void 0) {
      options = {};
    }

    if (noCache === void 0) {
      noCache = false;
    } // RFC string


    this._string = null;
    this._cache = noCache ? null : new _cache.Cache(); // used by toString()

    this.origOptions = (0, _parseoptions.initializeOptions)(options);

    var _a = (0, _parseoptions.parseOptions)(options),
        parsedOptions = _a.parsedOptions,
        timeset = _a.timeset;

    this.options = parsedOptions;
    this.timeset = timeset;
  }

  RRule.parseText = function (text, language) {
    return getnlp().parseText(text, language);
  };

  RRule.fromText = function (text, language) {
    return getnlp().fromText(text, language);
  };

  RRule.fromString = function (str) {
    return new RRule(RRule.parseString(str) || undefined);
  };

  RRule.prototype._cacheGet = function (what, args) {
    if (!this._cache) return false;
    return this._cache._cacheGet(what, args);
  };

  RRule.prototype._cacheAdd = function (what, value, args) {
    if (!this._cache) return;
    return this._cache._cacheAdd(what, value, args);
  };
  /**
   * @param {Function} iterator - optional function that will be called
   *                   on each date that is added. It can return false
   *                   to stop the iteration.
   * @return Array containing all recurrences.
   */


  RRule.prototype.all = function (iterator) {
    if (iterator) {
      return this._iter(new _callbackiterresult.default('all', {}, iterator));
    } else {
      var result = this._cacheGet('all');

      if (result === false) {
        result = this._iter(new _iterresult.default('all', {}));

        this._cacheAdd('all', result);
      }

      return result;
    }
  };
  /**
   * Returns all the occurrences of the rrule between after and before.
   * The inc keyword defines what happens if after and/or before are
   * themselves occurrences. With inc == True, they will be included in the
   * list, if they are found in the recurrence set.
   * @return Array
   */


  RRule.prototype.between = function (after, before, inc, iterator) {
    if (inc === void 0) {
      inc = false;
    }

    var args = {
      before: before,
      after: after,
      inc: inc
    };

    if (iterator) {
      return this._iter(new _callbackiterresult.default('between', args, iterator));
    }

    var result = this._cacheGet('between', args);

    if (result === false) {
      result = this._iter(new _iterresult.default('between', args));

      this._cacheAdd('between', result, args);
    }

    return result;
  };
  /**
   * Returns the last recurrence before the given datetime instance.
   * The inc keyword defines what happens if dt is an occurrence.
   * With inc == True, if dt itself is an occurrence, it will be returned.
   * @return Date or null
   */


  RRule.prototype.before = function (dt, inc) {
    if (inc === void 0) {
      inc = false;
    }

    var args = {
      dt: dt,
      inc: inc
    };

    var result = this._cacheGet('before', args);

    if (result === false) {
      result = this._iter(new _iterresult.default('before', args));

      this._cacheAdd('before', result, args);
    }

    return result;
  };
  /**
   * Returns the first recurrence after the given datetime instance.
   * The inc keyword defines what happens if dt is an occurrence.
   * With inc == True, if dt itself is an occurrence, it will be returned.
   * @return Date or null
   */


  RRule.prototype.after = function (dt, inc) {
    if (inc === void 0) {
      inc = false;
    }

    var args = {
      dt: dt,
      inc: inc
    };

    var result = this._cacheGet('after', args);

    if (result === false) {
      result = this._iter(new _iterresult.default('after', args));

      this._cacheAdd('after', result, args);
    }

    return result;
  };
  /**
   * Returns the number of recurrences in this set. It will have go trough
   * the whole recurrence, if this hasn't been done before.
   */


  RRule.prototype.count = function () {
    return this.all().length;
  };
  /**
   * Converts the rrule into its string representation
   * @see <http://www.ietf.org/rfc/rfc2445.txt>
   * @return String
   */


  RRule.prototype.toString = function () {
    return (0, _optionstostring.optionsToString)(this.origOptions);
  };
  /**
   * Will convert all rules described in nlp:ToText
   * to text.
   */


  RRule.prototype.toText = function (gettext, language) {
    return getnlp().toText(this, gettext, language);
  };

  RRule.prototype.isFullyConvertibleToText = function () {
    return getnlp().isFullyConvertible(this);
  };
  /**
   * @return a RRule instance with the same freq and options
   *          as this one (cache is not cloned)
   */


  RRule.prototype.clone = function () {
    return new RRule(this.origOptions);
  };

  RRule.prototype._iter = function (iterResult) {
    /* Since JavaScript doesn't have the python's yield operator (<1.7),
        we use the IterResult object that tells us when to stop iterating.
         */
    var _a, _b;

    var dtstart = this.options.dtstart;
    var date = new _dateutil.default.DateTime(dtstart.getUTCFullYear(), dtstart.getUTCMonth() + 1, dtstart.getUTCDate(), dtstart.getUTCHours(), dtstart.getUTCMinutes(), dtstart.getUTCSeconds(), dtstart.valueOf() % 1000); // Some local variables to speed things up a bit

    var _c = this.options,
        freq = _c.freq,
        interval = _c.interval,
        wkst = _c.wkst,
        until = _c.until,
        bymonth = _c.bymonth,
        byweekno = _c.byweekno,
        byyearday = _c.byyearday,
        byweekday = _c.byweekday,
        byeaster = _c.byeaster,
        bymonthday = _c.bymonthday,
        bynmonthday = _c.bynmonthday,
        bysetpos = _c.bysetpos,
        byhour = _c.byhour,
        byminute = _c.byminute,
        bysecond = _c.bysecond;
    var ii = new _iterinfo.default(this);
    ii.rebuild(date.year, date.month);
    var getdayset = (_a = {}, _a[RRule.YEARLY] = ii.ydayset, _a[RRule.MONTHLY] = ii.mdayset, _a[RRule.WEEKLY] = ii.wdayset, _a[RRule.DAILY] = ii.ddayset, _a[RRule.HOURLY] = ii.ddayset, _a[RRule.MINUTELY] = ii.ddayset, _a[RRule.SECONDLY] = ii.ddayset, _a)[freq];
    var timeset;
    var gettimeset;

    if (freq < RRule.HOURLY) {
      timeset = this.timeset;
    } else {
      gettimeset = (_b = {}, _b[RRule.HOURLY] = ii.htimeset, _b[RRule.MINUTELY] = ii.mtimeset, _b[RRule.SECONDLY] = ii.stimeset, _b)[freq];

      if (freq >= RRule.HOURLY && (0, _helpers.notEmpty)(byhour) && !(0, _helpers.includes)(byhour, date.hour) || freq >= RRule.MINUTELY && (0, _helpers.notEmpty)(byminute) && !(0, _helpers.includes)(byminute, date.minute) || freq >= RRule.SECONDLY && (0, _helpers.notEmpty)(bysecond) && !(0, _helpers.includes)(bysecond, date.second)) {
        timeset = [];
      } else {
        timeset = gettimeset.call(ii, date.hour, date.minute, date.second, date.millisecond);
      }
    }

    var currentDay;
    var count = this.options.count;
    var pos;

    while (true) {
      // Get dayset with the right frequency
      var _d = getdayset.call(ii, date.year, date.month, date.day),
          dayset = _d[0],
          start = _d[1],
          end = _d[2]; // Do the "hard" work ;-)


      var filtered = false;

      for (var dayCounter = start; dayCounter < end; dayCounter++) {
        currentDay = dayset[dayCounter];
        filtered = isFiltered(bymonth, ii, currentDay, byweekno, byweekday, byeaster, bymonthday, bynmonthday, byyearday);
        if (filtered) dayset[currentDay] = null;
      } // Output results


      if ((0, _helpers.notEmpty)(bysetpos) && (0, _helpers.notEmpty)(timeset)) {
        var daypos = void 0;
        var timepos = void 0;
        var poslist = [];

        for (var j = 0; j < bysetpos.length; j++) {
          pos = bysetpos[j];

          if (pos < 0) {
            daypos = Math.floor(pos / timeset.length);
            timepos = (0, _helpers.pymod)(pos, timeset.length);
          } else {
            daypos = Math.floor((pos - 1) / timeset.length);
            timepos = (0, _helpers.pymod)(pos - 1, timeset.length);
          }

          var tmp = [];

          for (var k = start; k < end; k++) {
            var val = dayset[k];
            if (!(0, _helpers.isPresent)(val)) continue;
            tmp.push(val);
          }

          var i = void 0;

          if (daypos < 0) {
            // we're trying to emulate python's aList[-n]
            i = tmp.slice(daypos)[0];
          } else {
            i = tmp[daypos];
          }

          var time = timeset[timepos];

          var date_1 = _dateutil.default.fromOrdinal(ii.yearordinal + i);

          var res = _dateutil.default.combine(date_1, time); // XXX: can this ever be in the array?
          // - compare the actual date instead?


          if (!(0, _helpers.includes)(poslist, res)) poslist.push(res);
        }

        _dateutil.default.sort(poslist);

        for (var j = 0; j < poslist.length; j++) {
          var res = poslist[j];

          if (until && res > until) {
            return this.emitResult(iterResult);
          }

          if (res >= dtstart) {
            var rezonedDate = this.rezoneIfNeeded(res);

            if (!iterResult.accept(rezonedDate)) {
              return this.emitResult(iterResult);
            }

            if (count) {
              --count;

              if (!count) {
                return this.emitResult(iterResult);
              }
            }
          }
        }
      } else {
        for (var j = start; j < end; j++) {
          currentDay = dayset[j];

          if (!(0, _helpers.isPresent)(currentDay)) {
            continue;
          }

          var date_2 = _dateutil.default.fromOrdinal(ii.yearordinal + currentDay);

          for (var k = 0; k < timeset.length; k++) {
            var time = timeset[k];

            var res = _dateutil.default.combine(date_2, time);

            if (until && res > until) {
              return this.emitResult(iterResult);
            }

            if (res >= dtstart) {
              var rezonedDate = this.rezoneIfNeeded(res);

              if (!iterResult.accept(rezonedDate)) {
                return this.emitResult(iterResult);
              }

              if (count) {
                --count;

                if (!count) {
                  return this.emitResult(iterResult);
                }
              }
            }
          }
        }
      } // Handle frequency and interval


      if (freq === RRule.YEARLY) {
        date.addYears(interval);
      } else if (freq === RRule.MONTHLY) {
        date.addMonths(interval);
      } else if (freq === RRule.WEEKLY) {
        date.addWeekly(interval, wkst);
      } else if (freq === RRule.DAILY) {
        date.addDaily(interval);
      } else if (freq === RRule.HOURLY) {
        date.addHours(interval, filtered, byhour); // @ts-ignore

        timeset = gettimeset.call(ii, date.hour, date.minute, date.second);
      } else if (freq === RRule.MINUTELY) {
        if (date.addMinutes(interval, filtered, byhour, byminute)) {
          filtered = false;
        } // @ts-ignore


        timeset = gettimeset.call(ii, date.hour, date.minute, date.second);
      } else if (freq === RRule.SECONDLY) {
        if (date.addSeconds(interval, filtered, byhour, byminute, bysecond)) {
          filtered = false;
        } // @ts-ignore


        timeset = gettimeset.call(ii, date.hour, date.minute, date.second);
      }

      if (date.year > _dateutil.default.MAXYEAR) {
        return this.emitResult(iterResult);
      }

      ii.rebuild(date.year, date.month);
    }
  };

  RRule.prototype.emitResult = function (iterResult) {
    this._len = iterResult.total;
    return iterResult.getValue();
  };

  RRule.prototype.rezoneIfNeeded = function (date) {
    var tzid = this.options.tzid;

    if (!tzid) {
      return date;
    }

    try {
      var datetime = _luxon.DateTime.fromJSDate(date);

      var rezoned = datetime.setZone(tzid, {
        keepLocalTime: true
      });
      return rezoned.toJSDate();
    } catch (e) {
      if (e instanceof TypeError) {
        console.error('Using TZID without Luxon available is unsupported. Returned times are in UTC, not the requested time zone');
      }

      return date;
    }
  }; // RRule class 'constants'


  RRule.FREQUENCIES = ['YEARLY', 'MONTHLY', 'WEEKLY', 'DAILY', 'HOURLY', 'MINUTELY', 'SECONDLY'];
  RRule.YEARLY = _types.Frequency.YEARLY;
  RRule.MONTHLY = _types.Frequency.MONTHLY;
  RRule.WEEKLY = _types.Frequency.WEEKLY;
  RRule.DAILY = _types.Frequency.DAILY;
  RRule.HOURLY = _types.Frequency.HOURLY;
  RRule.MINUTELY = _types.Frequency.MINUTELY;
  RRule.SECONDLY = _types.Frequency.SECONDLY;
  RRule.MO = Days.MO;
  RRule.TU = Days.TU;
  RRule.WE = Days.WE;
  RRule.TH = Days.TH;
  RRule.FR = Days.FR;
  RRule.SA = Days.SA;
  RRule.SU = Days.SU;
  RRule.parseString = _parsestring.parseString;
  RRule.optionsToString = _optionstostring.optionsToString;
  return RRule;
}();

var _default = RRule;
exports.default = _default;

function isFiltered(bymonth, ii, currentDay, byweekno, byweekday, byeaster, bymonthday, bynmonthday, byyearday) {
  return (0, _helpers.notEmpty)(bymonth) && !(0, _helpers.includes)(bymonth, ii.mmask[currentDay]) || (0, _helpers.notEmpty)(byweekno) && !ii.wnomask[currentDay] || (0, _helpers.notEmpty)(byweekday) && !(0, _helpers.includes)(byweekday, ii.wdaymask[currentDay]) || (0, _helpers.notEmpty)(ii.nwdaymask) && !ii.nwdaymask[currentDay] || byeaster !== null && !(0, _helpers.includes)(ii.eastermask, currentDay) || ((0, _helpers.notEmpty)(bymonthday) || (0, _helpers.notEmpty)(bynmonthday)) && !(0, _helpers.includes)(bymonthday, ii.mdaymask[currentDay]) && !(0, _helpers.includes)(bynmonthday, ii.nmdaymask[currentDay]) || (0, _helpers.notEmpty)(byyearday) && (currentDay < ii.yearlen && !(0, _helpers.includes)(byyearday, currentDay + 1) && !(0, _helpers.includes)(byyearday, -ii.yearlen + currentDay) || currentDay >= ii.yearlen && !(0, _helpers.includes)(byyearday, currentDay + 1 - ii.yearlen) && !(0, _helpers.includes)(byyearday, -ii.nextyearlen + currentDay - ii.yearlen));
}
},{"./dateutil":"jBj6","./iterinfo":"zJ0F","./helpers":"O7gF","./iterresult":"Ijgv","./callbackiterresult":"UdsQ","./types":"AXHO","./parseoptions":"ewSO","./parsestring":"FKWL","./optionstostring":"C0fI","./cache":"b8OE","./weekday":"EMzM","luxon":"eqBM","./nlp":"qiVg"}],"CxYb":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rrule = _interopRequireDefault(require("./rrule"));

var _dateutil = _interopRequireDefault(require("./dateutil"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };

    return extendStatics(d, b);
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

/**
 *
 * @param {Boolean?} noCache
 *  The same stratagy as RRule on cache, default to false
 * @constructor
 */
var RRuleSet =
/** @class */
function (_super) {
  __extends(RRuleSet, _super);

  function RRuleSet(noCache) {
    if (noCache === void 0) {
      noCache = false;
    }

    var _this = _super.call(this, {}, noCache) || this;

    _this._rrule = [];
    _this._rdate = [];
    _this._exrule = [];
    _this._exdate = [];
    return _this;
  }
  /**
   * Adds an RRule to the set
   *
   * @param {RRule}
   */


  RRuleSet.prototype.rrule = function (rrule) {
    if (!(rrule instanceof _rrule.default)) {
      throw new TypeError(String(rrule) + ' is not RRule instance');
    }

    if (!(0, _helpers.includes)(this._rrule.map(String), String(rrule))) {
      this._rrule.push(rrule);
    }
  };
  /**
   * Adds an RDate to the set
   *
   * @param {Date}
   */


  RRuleSet.prototype.rdate = function (date) {
    if (!(date instanceof Date)) {
      throw new TypeError(String(date) + ' is not Date instance');
    }

    if (!(0, _helpers.includes)(this._rdate.map(Number), Number(date))) {
      this._rdate.push(date);

      _dateutil.default.sort(this._rdate);
    }
  };
  /**
   * Adds an EXRULE to the set
   *
   * @param {RRule}
   */


  RRuleSet.prototype.exrule = function (rrule) {
    if (!(rrule instanceof _rrule.default)) {
      throw new TypeError(String(rrule) + ' is not RRule instance');
    }

    if (!(0, _helpers.includes)(this._exrule.map(String), String(rrule))) {
      this._exrule.push(rrule);
    }
  };
  /**
   * Adds an EXDATE to the set
   *
   * @param {Date}
   */


  RRuleSet.prototype.exdate = function (date) {
    if (!(date instanceof Date)) {
      throw new TypeError(String(date) + ' is not Date instance');
    }

    if (!(0, _helpers.includes)(this._exdate.map(Number), Number(date))) {
      this._exdate.push(date);

      _dateutil.default.sort(this._exdate);
    }
  };

  RRuleSet.prototype.valueOf = function () {
    var result = [];

    if (this._rrule.length) {
      this._rrule.forEach(function (rrule) {
        result.push('RRULE:' + rrule);
      });
    }

    if (this._rdate.length) {
      result.push('RDATE:' + this._rdate.map(function (rdate) {
        return _dateutil.default.timeToUntilString(rdate.valueOf());
      }).join(','));
    }

    if (this._exrule.length) {
      this._exrule.forEach(function (exrule) {
        result.push('EXRULE:' + exrule);
      });
    }

    if (this._exdate.length) {
      result.push('EXDATE:' + this._exdate.map(function (exdate) {
        return _dateutil.default.timeToUntilString(exdate.valueOf());
      }).join(','));
    }

    return result;
  };
  /**
   * to generate recurrence field sush as:
   *   ["RRULE:FREQ=YEARLY;COUNT=2;BYDAY=TU;DTSTART=19970902T010000Z","RRULE:FREQ=YEARLY;COUNT=1;BYDAY=TH;DTSTART=19970902T010000Z"]
   */


  RRuleSet.prototype.toString = function () {
    return JSON.stringify(this.valueOf());
  };

  RRuleSet.prototype._iter = function (iterResult) {
    var _exdateHash = {};
    var _exrule = this._exrule;
    var _accept = iterResult.accept;

    function evalExdate(after, before) {
      _exrule.forEach(function (rrule) {
        rrule.between(after, before, true).forEach(function (date) {
          _exdateHash[Number(date)] = true;
        });
      });
    }

    this._exdate.forEach(function (date) {
      _exdateHash[Number(date)] = true;
    });

    iterResult.accept = function (date) {
      var dt = Number(date);

      if (!_exdateHash[dt]) {
        evalExdate(new Date(dt - 1), new Date(dt + 1));

        if (!_exdateHash[dt]) {
          _exdateHash[dt] = true;
          return _accept.call(this, date);
        }
      }

      return true;
    };

    if (iterResult.method === 'between') {
      evalExdate(iterResult.args.after, iterResult.args.before);

      iterResult.accept = function (date) {
        var dt = Number(date);

        if (!_exdateHash[dt]) {
          _exdateHash[dt] = true;
          return _accept.call(this, date);
        }

        return true;
      };
    }

    for (var i = 0; i < this._rdate.length; i++) {
      if (!iterResult.accept(new Date(this._rdate[i].valueOf()))) break;
    }

    this._rrule.forEach(function (rrule) {
      rrule._iter(iterResult);
    });

    var res = iterResult._result;

    _dateutil.default.sort(res);

    switch (iterResult.method) {
      case 'all':
      case 'between':
        return res;

      case 'before':
        return res.length && res[res.length - 1] || null;

      case 'after':
        return res.length && res[0] || null;

      default:
        return null;
    }
  };
  /**
   * Create a new RRuleSet Object completely base on current instance
   */


  RRuleSet.prototype.clone = function () {
    var rrs = new RRuleSet(!!this._cache);
    var i;

    for (i = 0; i < this._rrule.length; i++) {
      rrs.rrule(this._rrule[i].clone());
    }

    for (i = 0; i < this._rdate.length; i++) {
      rrs.rdate(new Date(this._rdate[i].valueOf()));
    }

    for (i = 0; i < this._exrule.length; i++) {
      rrs.exrule(this._exrule[i].clone());
    }

    for (i = 0; i < this._exdate.length; i++) {
      rrs.exdate(new Date(this._exdate[i].valueOf()));
    }

    return rrs;
  };

  return RRuleSet;
}(_rrule.default);

var _default = RRuleSet;
exports.default = _default;
},{"./rrule":"adWO","./dateutil":"jBj6","./helpers":"O7gF"}],"ZrIQ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rrule = _interopRequireDefault(require("./rrule"));

var _rruleset = _interopRequireDefault(require("./rruleset"));

var _dateutil = _interopRequireDefault(require("./dateutil"));

var _weekday = require("./weekday");

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * RRuleStr
 *  To parse a set of rrule strings
 */
var RRuleStr =
/** @class */
function () {
  function RRuleStr() {
    // tslint:disable:variable-name
    this._handle_BYDAY = this._handle_BYWEEKDAY;
    this._handle_INTERVAL = this._handle_int;
    this._handle_COUNT = this._handle_int;
    this._handle_BYSETPOS = this._handle_int_list;
    this._handle_BYMONTH = this._handle_int_list;
    this._handle_BYMONTHDAY = this._handle_int_list;
    this._handle_BYYEARDAY = this._handle_int_list;
    this._handle_BYEASTER = this._handle_int_list;
    this._handle_BYWEEKNO = this._handle_int_list;
    this._handle_BYHOUR = this._handle_int_list;
    this._handle_BYMINUTE = this._handle_int_list;
    this._handle_BYSECOND = this._handle_int_list; // tslint:enable:variable-name
  } // tslint:disable-next-line:variable-name


  RRuleStr.prototype._handle_DTSTART = function (rrkwargs, _, value, __) {
    var parms = /^DTSTART(?:;TZID=([^:=]+))?(?::|=)(.*)/.exec(value);
    var ___ = parms[0],
        tzid = parms[1],
        dtstart = parms[2];
    rrkwargs['dtstart'] = _dateutil.default.untilStringToDate(dtstart);

    if (tzid) {
      rrkwargs['tzid'] = tzid;
    }
  };

  RRuleStr.prototype._handle_int = function (rrkwargs, name, value) {
    // @ts-ignore
    rrkwargs[name.toLowerCase()] = parseInt(value, 10);
  };

  RRuleStr.prototype._handle_int_list = function (rrkwargs, name, value) {
    // @ts-ignore
    rrkwargs[name.toLowerCase()] = value.split(',').map(function (x) {
      return parseInt(x, 10);
    });
  };

  RRuleStr.prototype._handle_FREQ = function (rrkwargs, _, value, __) {
    rrkwargs['freq'] = RRuleStr._freq_map[value];
  };

  RRuleStr.prototype._handle_UNTIL = function (rrkwargs, _, value, __) {
    try {
      rrkwargs['until'] = _dateutil.default.untilStringToDate(value);
    } catch (error) {
      throw new Error('invalid until date');
    }
  };

  RRuleStr.prototype._handle_WKST = function (rrkwargs, _, value, __) {
    rrkwargs['wkst'] = RRuleStr._weekday_map[value];
  };

  RRuleStr.prototype._handle_BYWEEKDAY = function (rrkwargs, _, value, __) {
    // Two ways to specify this: +1MO or MO(+1)
    var splt;
    var i;
    var j;
    var n;
    var w;
    var wday;
    var l = [];
    var wdays = value.split(',');

    for (i = 0; i < wdays.length; i++) {
      wday = wdays[i];

      if (wday.indexOf('(') > -1) {
        // If it's of the form TH(+1), etc.
        splt = wday.split('(');
        w = splt[0];
        n = parseInt(splt.slice(1, -1)[0], 10);
      } else {
        // # If it's of the form +1MO
        for (j = 0; j < wday.length; j++) {
          if ('+-0123456789'.indexOf(wday[j]) === -1) break;
        }

        n = wday.slice(0, j) || null;
        w = wday.slice(j);
        if (n) n = parseInt(n, 10);
      }

      var weekday = new _weekday.Weekday(RRuleStr._weekday_map[w], n);
      l.push(weekday);
    }

    rrkwargs['byweekday'] = l;
  };

  RRuleStr.prototype._parseRfcRRule = function (line, options) {
    if (options === void 0) {
      options = {};
    }

    options.dtstart = options.dtstart || null;
    options.cache = options.cache || false;
    var name;
    var value;
    var parts;
    var nameRegex = /^([A-Z]+):(.*)$/;
    var nameParts = nameRegex.exec(line);

    if (nameParts && nameParts.length >= 3) {
      name = nameParts[1];
      value = nameParts[2];
      if (name !== 'RRULE') throw new Error("unknown parameter name " + name);
    } else {
      value = line;
    }

    var rrkwargs = {};
    var dtstart = /DTSTART(?:;TZID=[^:]+:)?[^;]+/.exec(line);

    if (dtstart && dtstart.length > 0) {
      var dtstartClause = dtstart[0];

      this._handle_DTSTART(rrkwargs, 'DTSTART', dtstartClause);
    }

    var pairs = value.split(';');

    for (var i = 0; i < pairs.length; i++) {
      parts = pairs[i].split('=');
      name = parts[0].toUpperCase();

      if (/DTSTART|TZID/.test(name)) {
        continue;
      }

      value = parts[1].toUpperCase(); // @ts-ignore

      var paramHandler = this["_handle_" + name];

      if (typeof paramHandler !== 'function') {
        throw new Error("unknown parameter '" + name + "':" + value);
      }

      paramHandler(rrkwargs, name, value);
    }

    rrkwargs.dtstart = rrkwargs.dtstart || options.dtstart;
    rrkwargs.tzid = rrkwargs.tzid || options.tzid;
    return new _rrule.default(rrkwargs, !options.cache);
  };

  RRuleStr.prototype._parseRfc = function (s, options) {
    if (options.compatible) {
      options.forceset = true;
      options.unfold = true;
    }

    s = s && s.trim();
    if (!s) throw new Error('Invalid empty string');
    var i = 0;
    var line;
    var lines; // More info about 'unfold' option
    // Go head to http://www.ietf.org/rfc/rfc2445.txt

    if (options.unfold) {
      lines = s.split('\n');

      while (i < lines.length) {
        // TODO
        line = lines[i] = lines[i].replace(/\s+$/g, '');

        if (!line) {
          lines.splice(i, 1);
        } else if (i > 0 && line[0] === ' ') {
          lines[i - 1] += line.slice(1);
          lines.splice(i, 1);
        } else {
          i += 1;
        }
      }
    } else {
      lines = s.split(/\s/);
    }

    var rrulevals = [];
    var rdatevals = [];
    var exrulevals = [];
    var exdatevals = [];
    var name;
    var value;
    var parts;
    var dtstart;
    var tzid;
    var rset;
    var j;
    var k;
    var datestrs;
    var datestr;

    if (!options.forceset && lines.length === 1 && (s.indexOf(':') === -1 || s.indexOf('RRULE:') === 0)) {
      return this._parseRfcRRule(lines[0], {
        cache: options.cache,
        dtstart: options.dtstart
      });
    } else {
      for (var i_1 = 0; i_1 < lines.length; i_1++) {
        line = lines[i_1];
        if (!line) continue;

        if (line.indexOf(':') === -1) {
          name = 'RRULE';
          value = line;
        } else {
          parts = (0, _helpers.split)(line, ':', 1);
          name = parts[0];
          value = parts[1];
        }

        var parms = name.split(';');
        if (!parms) throw new Error('empty property name');
        name = parms[0].toUpperCase();
        parms = parms.slice(1);

        if (name === 'RRULE') {
          for (j = 0; j < parms.length; j++) {
            var parm = parms[j];
            throw new Error('unsupported RRULE parm: ' + parm);
          }

          rrulevals.push(value);
        } else if (name === 'RDATE') {
          for (j = 0; j < parms.length; j++) {
            var parm = parms[j];

            if (parm !== 'VALUE=DATE-TIME' && parm !== 'VALUE=DATE') {
              throw new Error('unsupported RDATE parm: ' + parm);
            }
          }

          rdatevals.push(value);
        } else if (name === 'EXRULE') {
          for (j = 0; j < parms.length; j++) {
            var parm = parms[j];
            throw new Error('unsupported EXRULE parm: ' + parm);
          }

          exrulevals.push(value);
        } else if (name === 'EXDATE') {
          for (j = 0; j < parms.length; j++) {
            var parm = parms[j];

            if (parm !== 'VALUE=DATE-TIME' && parm !== 'VALUE=DATE') {
              throw new Error('unsupported EXDATE parm: ' + parm);
            }
          }

          exdatevals.push(value);
        } else if (name === 'DTSTART') {
          dtstart = _dateutil.default.untilStringToDate(value);

          if (parms.length) {
            var _a = parms[0].split('='),
                key = _a[0],
                value_1 = _a[1];

            if (key === 'TZID') {
              tzid = value_1;
            }
          }
        } else {
          throw new Error('unsupported property: ' + name);
        }
      }

      if (options.forceset || rrulevals.length > 1 || rdatevals.length || exrulevals.length || exdatevals.length) {
        rset = new _rruleset.default(!options.cache);

        for (j = 0; j < rrulevals.length; j++) {
          rset.rrule(this._parseRfcRRule(rrulevals[j], {
            // @ts-ignore
            dtstart: options.dtstart || dtstart
          }));
        }

        for (j = 0; j < rdatevals.length; j++) {
          datestrs = rdatevals[j].split(',');

          for (k = 0; k < datestrs.length; k++) {
            datestr = datestrs[k];
            rset.rdate(_dateutil.default.untilStringToDate(datestr));
          }
        }

        for (j = 0; j < exrulevals.length; j++) {
          rset.exrule(this._parseRfcRRule(exrulevals[j], {
            // @ts-ignore
            dtstart: options.dtstart || dtstart
          }));
        }

        for (j = 0; j < exdatevals.length; j++) {
          datestrs = exdatevals[j].split(',');

          for (k = 0; k < datestrs.length; k++) {
            datestr = datestrs[k];
            rset.exdate(_dateutil.default.untilStringToDate(datestr));
          }
        } // @ts-ignore


        if (options.compatible && options.dtstart) rset.rdate(dtstart);
        return rset;
      } else {
        return this._parseRfcRRule(rrulevals[0], {
          // @ts-ignore
          dtstart: options.dtstart || dtstart,
          cache: options.cache,
          // @ts-ignore
          tzid: options.tzid || tzid
        });
      }
    }
  };

  RRuleStr.prototype.parse = function (s, options) {
    if (options === void 0) {
      options = {};
    }

    var invalid = [];
    var keys = Object.keys(options);
    var defaultKeys = Object.keys(RRuleStr.DEFAULT_OPTIONS);
    keys.forEach(function (key) {
      if (!(0, _helpers.includes)(defaultKeys, key)) invalid.push(key);
    }, this);

    if (invalid.length) {
      throw new Error('Invalid options: ' + invalid.join(', '));
    } // Merge in default options


    defaultKeys.forEach(function (key) {
      if (!(0, _helpers.includes)(keys, key)) options[key] = RRuleStr.DEFAULT_OPTIONS[key];
    });
    return this._parseRfc(s, options);
  }; // tslint:disable-next-line:variable-name


  RRuleStr._weekday_map = {
    MO: 0,
    TU: 1,
    WE: 2,
    TH: 3,
    FR: 4,
    SA: 5,
    SU: 6
  }; // tslint:disable-next-line:variable-name

  RRuleStr._freq_map = {
    YEARLY: _rrule.default.YEARLY,
    MONTHLY: _rrule.default.MONTHLY,
    WEEKLY: _rrule.default.WEEKLY,
    DAILY: _rrule.default.DAILY,
    HOURLY: _rrule.default.HOURLY,
    MINUTELY: _rrule.default.MINUTELY,
    SECONDLY: _rrule.default.SECONDLY
  };
  RRuleStr.DEFAULT_OPTIONS = {
    dtstart: null,
    cache: false,
    unfold: false,
    forceset: false,
    compatible: false,
    tzid: null
  };
  return RRuleStr;
}();

var _default = RRuleStr;
exports.default = _default;
},{"./rrule":"adWO","./rruleset":"CxYb","./dateutil":"jBj6","./weekday":"EMzM","./helpers":"O7gF"}],"IVs2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Frequency", {
  enumerable: true,
  get: function () {
    return _types.Frequency;
  }
});
Object.defineProperty(exports, "RRule", {
  enumerable: true,
  get: function () {
    return _rrule.default;
  }
});
Object.defineProperty(exports, "RRuleSet", {
  enumerable: true,
  get: function () {
    return _rruleset.default;
  }
});
Object.defineProperty(exports, "Weekday", {
  enumerable: true,
  get: function () {
    return _weekday.Weekday;
  }
});
exports.rrulestr = exports.default = void 0;

var _rrule = _interopRequireDefault(require("./rrule"));

var _rruleset = _interopRequireDefault(require("./rruleset"));

var _rrulestr = _interopRequireDefault(require("./rrulestr"));

var _types = require("./types");

var _weekday = require("./weekday");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * rrule.js - Library for working with recurrence rules for calendar dates.
 * https://github.com/jakubroztocil/rrule
 *
 * Copyright 2010, Jakub Roztocil and Lars Schoning
 * Licenced under the BSD licence.
 * https://github.com/jakubroztocil/rrule/blob/master/LICENCE
 *
 * Based on:
 * python-dateutil - Extensions to the standard Python datetime module.
 * Copyright (c) 2003-2011 - Gustavo Niemeyer <gustavo@niemeyer.net>
 * Copyright (c) 2012 - Tomi Pieviläinen <tomi.pievilainen@iki.fi>
 * https://github.com/jakubroztocil/rrule/blob/master/LICENCE
 *
 */
// =============================================================================
// Export
// =============================================================================
// Only one RRuleStr instance for all rrule string parsing work.
var rruleStr = new _rrulestr.default();

var rrulestr = function () {
  return rruleStr.parse.apply(rruleStr, arguments);
};

exports.rrulestr = rrulestr;
var _default = _rrule.default;
exports.default = _default;
},{"./rrule":"adWO","./rruleset":"CxYb","./rrulestr":"ZrIQ","./types":"AXHO","./weekday":"EMzM"}],"Z6IE":[function(require,module,exports) {
var ical = require('./ical')
  , fs = require('fs')

exports.parseFile = function(filename){
  return ical.parseICS(fs.readFileSync(filename, 'utf8'))
}

var rrule = require('rrule').RRule

ical.objectHandlers['RRULE'] = function(val, params, curr, stack, line){
  curr.rrule = line;
  return curr
}
var originalEnd = ical.objectHandlers['END'];
ical.objectHandlers['END'] = function (val, params, curr, stack) {
	// Recurrence rules are only valid for VEVENT, VTODO, and VJOURNAL.
	// More specifically, we need to filter the VCALENDAR type because we might end up with a defined rrule
	// due to the subtypes.
	if ((val === "VEVENT") || (val === "VTODO") || (val === "VJOURNAL")) {
		if (curr.rrule) {
			var rule = curr.rrule.replace('RRULE:', '');
			if (rule.indexOf('DTSTART') === -1) {

				if (curr.start.length === 8) {
					var comps = /^(\d{4})(\d{2})(\d{2})$/.exec(curr.start);
					if (comps) {
						curr.start = new Date(comps[1], comps[2] - 1, comps[3]);
					}
				}


				if (typeof curr.start.toISOString === 'function') {
					try {
						rule += ';DTSTART=' + curr.start.toISOString().replace(/[-:]/g, '');
						rule = rule.replace(/\.[0-9]{3}/, '');
					} catch (error) {
						console.error("ERROR when trying to convert to ISOString", error);
					}
                } else {
                    console.error("No toISOString function in curr.start", curr.start);
				}
			}
			curr.rrule = rrule.fromString(rule);
		}
	}
  return originalEnd.call(this, val, params, curr, stack);
}

},{"./ical":"dZdQ","fs":"ChoL","rrule":"IVs2"}],"N5Nq":[function(require,module,exports) {
module.exports = require('./ical')

var node = require('./node-ical')

// Copy node functions across to exports
for (var i in node){
  module.exports[i] = node[i]
}  
},{"./ical":"dZdQ","./node-ical":"Z6IE"}],"pX43":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list_ics = exports.fetch_ics = exports.export_ical = void 0;
exports.loadICS = loadICS;
exports.parse_ics = void 0;

var _helper = require("/assets/js/helper.js");

var _app = require("../../app.js");

var export_ical = function export_ical(filename, event_data) {
  if (!navigator.getDeviceStorage) return false;
  var sdcard = navigator.getDeviceStorage("sdcard");
  var request_del = sdcard.delete(filename);

  request_del.onsuccess = function () {};

  setTimeout(function () {
    // convert
    var data = event_data;
    var result = "";
    result += "BEGIN:VCALENDAR" + "\r\n";
    result += "VERSION:2.0" + "\r\n";
    result += "PRODID:GREG" + "\r\n";
    result += "METHOD:PUBLISHED" + "\r\n";
    data.forEach(function (e) {
      var index = -1;

      for (var key in e) {
        index++;
        if (index == 0) result += "BEGIN:VEVENT" + "\r\n";

        if (key != "BEGIN" && key != "END" && key != "date" && key != "time_start" && key != "time_end" && key != "dateStart" && key != "dateEnd" && key != "notification" && key != "alarm" && key != "isSubscription" && key != "multidayevent" && key != "alarmTrigger" && key != "rrule_") {
          result += "".concat(key, ":").concat(e[key]) + "\r\n";
        }

        if (index == Object.keys(e).length - 1) result += "END:VEVENT" + "\r\n";
      }
    });
    result += "END:VCALENDAR" + "\r\n";
    var file = new Blob([result], {
      type: "text/calendar"
    });
    var request = sdcard.addNamed(file, filename);

    request.onsuccess = function () {
      (0, _helper.side_toaster)("<img src='assets/image/E25C.svg'>", 2500);
    };

    request.onerror = function () {
      (0, _helper.toaster)("Unable to write the file", 2000);
    };
  }, 2000);
}; // //////////
// /LIST ICS
// ////////////


exports.export_ical = export_ical;

var list_ics = function list_ics() {
  var file_list = [];

  var cb = function cb(result) {
    file_list.push(result);
    var fn = result.split("/");
    fn = fn[fn.length - 1];
    if (fn == "greg.ics") return false;
    document.querySelector("div#options div#import-text").style.display = "block";
    document.querySelector("div#options div#import-text").insertAdjacentHTML("afterend", '<button class="item dynamic" data-function="import" data-filename="' + result + '">' + fn + "</button>");
  };

  (0, _helper.list_files)("ics", cb);
}; // /////////////
// /PARSE ICS
// /////////////


exports.list_ics = list_ics;

var parse_ics = function parse_ics(data, callback, saveOnDevice, subscription) {
  var ical = require("ical");

  var datas = ical.parseICS(data);
  var last_uid;
  var last_date;

  for (var k in datas) {
    if (datas.hasOwnProperty(k)) {
      var ev = datas[k];

      if (datas[k].type == "VEVENT") {
        //date start
        var dateStart = void 0,
            timeStart = void 0;

        if (ev.start) {
          var DTstart = new Date(ev.start);
          dateStart = DTstart.getFullYear() + "-" + "0".concat(DTstart.getMonth() + 1).slice(-2) + "-" + "0".concat(DTstart.getDate()).slice(-2);
          timeStart = "0".concat(DTstart.getHours()).slice(-2) + ":" + "0".concat(DTstart.getMinutes()).slice(-2) + ":" + "0".concat(DTstart.getSeconds()).slice(-2);
        } //date end


        var dateEnd = void 0,
            timeEnd = void 0;

        if (ev.end) {
          var _DTstart = new Date(ev.end);

          dateEnd = _DTstart.getFullYear() + "-" + "0".concat(_DTstart.getMonth() + 1).slice(-2) + "-" + "0".concat(_DTstart.getDate()).slice(-2);
          timeEnd = "0".concat(_DTstart.getHours()).slice(-2) + ":" + "0".concat(_DTstart.getMinutes()).slice(-2) + ":" + "0".concat(_DTstart.getSeconds()).slice(-2);
        } //multiday event


        var multidayevent = false;

        if (ev.end && ev.start) {
          if (new Date(ev.end) > new Date(ev.start)) {
            console.log(ev.summary + " / " + ev.start + " / " + ev.end);
            multidayevent = true;
          } //all day events have the time 00:00:00 but the start end date consecutive


          if (new Date(ev.end) > new Date(ev.start) && timeStart == "00:00:00" && timeEnd == "00:00:00") {
            multidayevent = false;
          }
        }

        var parse_rrule = function parse_rrule() {
          var feedback = "none";

          if (ev.rrule != null || ev.rrule != undefined) {
            var a = ev.rrule;
            feedback = a.freq;
          }

          return feedback;
        };

        var imp = {
          BEGIN: "VEVENT",
          UID: ev.uid,
          SUMMARY: ev.summary,
          LOCATION: ev.location,
          DESCRIPTION: ev.description,
          ATTACH: ev.attach,
          RRULE: "",
          "LAST-MODIFIED": ev.lastmodified,
          CLASS: ev.class,
          DTSTAMP: ev.dtstamp,
          DTSTART: ev.start,
          DTEND: ev.end,
          END: "VEVENT",
          isSubscription: subscription,
          multidayevent: multidayevent,
          dateStart: dateStart,
          time_start: timeStart,
          dateEnd: dateEnd,
          time_end: timeEnd,
          notification: " ",
          alarm: "none",
          rrule_: parse_rrule()
        };

        _app.events.push(imp);

        last_uid = imp.UID;
        last_date = imp.DTSTART;
      }
    }
  }

  callback(last_uid, last_date);

  if (saveOnDevice) {
    var without_subscription = _app.events.filter(function (events) {
      return events.isSubscription === false;
    });

    localforage.setItem("events", without_subscription).then(function (value) {
      // events = value;
      (0, _helper.side_toaster)("<img src='assets/image/E25C.svg'>", 2500);
    }).catch(function (err) {
      console.log(err);
    });
  }
}; // ///////////
// /FETCH ICS
// /////////


exports.parse_ics = parse_ics;

var fetch_ics = function fetch_ics(url, cb) {
  var xhttp = new XMLHttpRequest({
    mozSystem: true
  });
  xhttp.open("GET", url + "?time=" + new Date().getTime(), true);
  xhttp.timeout = 25000;

  xhttp.onload = function () {
    if (xhttp.readyState === xhttp.DONE && xhttp.status === 200) {
      var data = xhttp.response;
      parse_ics(data, cb, false, true);
      (0, _helper.toaster)("subscriptions loaded", 2000);
    }
  };

  xhttp.onerror = function () {
    (0, _helper.toaster)("subscription could not be loaded", 2000);
  };

  xhttp.send(null);
};

exports.fetch_ics = fetch_ics;

function share(url, name) {
  var activity = new MozActivity({
    name: "share",
    data: {
      type: "text/calendar",
      number: 1,
      blobs: [url],
      filenames: [name]
    }
  });

  activity.onsuccess = function () {};

  activity.onerror = function () {};
} // ///////////////////////
// ///Load ICS///////////
// /////////////////////


function loadICS(filename, callback) {
  var sdcard = navigator.getDeviceStorage("sdcard");
  var request = sdcard.get(filename);

  request.onsuccess = function () {
    var file = this.result;
    var reader = new FileReader();

    reader.onerror = function (event) {
      (0, _helper.toaster)("can't read file", 3000);
      reader.abort();
    };

    reader.onloadend = function (event) {
      parse_ics(event.target.result, callback, true, false);
      document.getElementById("import-text").style.display = "block";
    };

    reader.readAsText(file);
  };

  request.onerror = function () {
    console.warn("Unable to get the file: " + this.error);
  };
}
},{"/assets/js/helper.js":"IWa2","../../app.js":"A2T1","ical":"N5Nq"}],"IuN4":[function(require,module,exports) {
var define;
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsQR"] = factory();
	else
		root["jsQR"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix = /** @class */ (function () {
    function BitMatrix(data, width) {
        this.width = width;
        this.height = data.length / width;
        this.data = data;
    }
    BitMatrix.createEmpty = function (width, height) {
        return new BitMatrix(new Uint8ClampedArray(width * height), width);
    };
    BitMatrix.prototype.get = function (x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        }
        return !!this.data[y * this.width + x];
    };
    BitMatrix.prototype.set = function (x, y, v) {
        this.data[y * this.width + x] = v ? 1 : 0;
    };
    BitMatrix.prototype.setRegion = function (left, top, width, height, v) {
        for (var y = top; y < top + height; y++) {
            for (var x = left; x < left + width; x++) {
                this.set(x, y, !!v);
            }
        }
    };
    return BitMatrix;
}());
exports.BitMatrix = BitMatrix;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GenericGFPoly_1 = __webpack_require__(2);
function addOrSubtractGF(a, b) {
    return a ^ b; // tslint:disable-line:no-bitwise
}
exports.addOrSubtractGF = addOrSubtractGF;
var GenericGF = /** @class */ (function () {
    function GenericGF(primitive, size, genBase) {
        this.primitive = primitive;
        this.size = size;
        this.generatorBase = genBase;
        this.expTable = new Array(this.size);
        this.logTable = new Array(this.size);
        var x = 1;
        for (var i = 0; i < this.size; i++) {
            this.expTable[i] = x;
            x = x * 2;
            if (x >= this.size) {
                x = (x ^ this.primitive) & (this.size - 1); // tslint:disable-line:no-bitwise
            }
        }
        for (var i = 0; i < this.size - 1; i++) {
            this.logTable[this.expTable[i]] = i;
        }
        this.zero = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([0]));
        this.one = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([1]));
    }
    GenericGF.prototype.multiply = function (a, b) {
        if (a === 0 || b === 0) {
            return 0;
        }
        return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
    };
    GenericGF.prototype.inverse = function (a) {
        if (a === 0) {
            throw new Error("Can't invert 0");
        }
        return this.expTable[this.size - this.logTable[a] - 1];
    };
    GenericGF.prototype.buildMonomial = function (degree, coefficient) {
        if (degree < 0) {
            throw new Error("Invalid monomial degree less than 0");
        }
        if (coefficient === 0) {
            return this.zero;
        }
        var coefficients = new Uint8ClampedArray(degree + 1);
        coefficients[0] = coefficient;
        return new GenericGFPoly_1.default(this, coefficients);
    };
    GenericGF.prototype.log = function (a) {
        if (a === 0) {
            throw new Error("Can't take log(0)");
        }
        return this.logTable[a];
    };
    GenericGF.prototype.exp = function (a) {
        return this.expTable[a];
    };
    return GenericGF;
}());
exports.default = GenericGF;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GenericGF_1 = __webpack_require__(1);
var GenericGFPoly = /** @class */ (function () {
    function GenericGFPoly(field, coefficients) {
        if (coefficients.length === 0) {
            throw new Error("No coefficients.");
        }
        this.field = field;
        var coefficientsLength = coefficients.length;
        if (coefficientsLength > 1 && coefficients[0] === 0) {
            // Leading term must be non-zero for anything except the constant polynomial "0"
            var firstNonZero = 1;
            while (firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0) {
                firstNonZero++;
            }
            if (firstNonZero === coefficientsLength) {
                this.coefficients = field.zero.coefficients;
            }
            else {
                this.coefficients = new Uint8ClampedArray(coefficientsLength - firstNonZero);
                for (var i = 0; i < this.coefficients.length; i++) {
                    this.coefficients[i] = coefficients[firstNonZero + i];
                }
            }
        }
        else {
            this.coefficients = coefficients;
        }
    }
    GenericGFPoly.prototype.degree = function () {
        return this.coefficients.length - 1;
    };
    GenericGFPoly.prototype.isZero = function () {
        return this.coefficients[0] === 0;
    };
    GenericGFPoly.prototype.getCoefficient = function (degree) {
        return this.coefficients[this.coefficients.length - 1 - degree];
    };
    GenericGFPoly.prototype.addOrSubtract = function (other) {
        var _a;
        if (this.isZero()) {
            return other;
        }
        if (other.isZero()) {
            return this;
        }
        var smallerCoefficients = this.coefficients;
        var largerCoefficients = other.coefficients;
        if (smallerCoefficients.length > largerCoefficients.length) {
            _a = [largerCoefficients, smallerCoefficients], smallerCoefficients = _a[0], largerCoefficients = _a[1];
        }
        var sumDiff = new Uint8ClampedArray(largerCoefficients.length);
        var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
        for (var i = 0; i < lengthDiff; i++) {
            sumDiff[i] = largerCoefficients[i];
        }
        for (var i = lengthDiff; i < largerCoefficients.length; i++) {
            sumDiff[i] = GenericGF_1.addOrSubtractGF(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
        }
        return new GenericGFPoly(this.field, sumDiff);
    };
    GenericGFPoly.prototype.multiply = function (scalar) {
        if (scalar === 0) {
            return this.field.zero;
        }
        if (scalar === 1) {
            return this;
        }
        var size = this.coefficients.length;
        var product = new Uint8ClampedArray(size);
        for (var i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], scalar);
        }
        return new GenericGFPoly(this.field, product);
    };
    GenericGFPoly.prototype.multiplyPoly = function (other) {
        if (this.isZero() || other.isZero()) {
            return this.field.zero;
        }
        var aCoefficients = this.coefficients;
        var aLength = aCoefficients.length;
        var bCoefficients = other.coefficients;
        var bLength = bCoefficients.length;
        var product = new Uint8ClampedArray(aLength + bLength - 1);
        for (var i = 0; i < aLength; i++) {
            var aCoeff = aCoefficients[i];
            for (var j = 0; j < bLength; j++) {
                product[i + j] = GenericGF_1.addOrSubtractGF(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
            }
        }
        return new GenericGFPoly(this.field, product);
    };
    GenericGFPoly.prototype.multiplyByMonomial = function (degree, coefficient) {
        if (degree < 0) {
            throw new Error("Invalid degree less than 0");
        }
        if (coefficient === 0) {
            return this.field.zero;
        }
        var size = this.coefficients.length;
        var product = new Uint8ClampedArray(size + degree);
        for (var i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], coefficient);
        }
        return new GenericGFPoly(this.field, product);
    };
    GenericGFPoly.prototype.evaluateAt = function (a) {
        var result = 0;
        if (a === 0) {
            // Just return the x^0 coefficient
            return this.getCoefficient(0);
        }
        var size = this.coefficients.length;
        if (a === 1) {
            // Just the sum of the coefficients
            this.coefficients.forEach(function (coefficient) {
                result = GenericGF_1.addOrSubtractGF(result, coefficient);
            });
            return result;
        }
        result = this.coefficients[0];
        for (var i = 1; i < size; i++) {
            result = GenericGF_1.addOrSubtractGF(this.field.multiply(a, result), this.coefficients[i]);
        }
        return result;
    };
    return GenericGFPoly;
}());
exports.default = GenericGFPoly;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binarizer_1 = __webpack_require__(4);
var decoder_1 = __webpack_require__(5);
var extractor_1 = __webpack_require__(11);
var locator_1 = __webpack_require__(12);
function scan(matrix) {
    var locations = locator_1.locate(matrix);
    if (!locations) {
        return null;
    }
    for (var _i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
        var location_1 = locations_1[_i];
        var extracted = extractor_1.extract(matrix, location_1);
        var decoded = decoder_1.decode(extracted.matrix);
        if (decoded) {
            return {
                binaryData: decoded.bytes,
                data: decoded.text,
                chunks: decoded.chunks,
                version: decoded.version,
                location: {
                    topRightCorner: extracted.mappingFunction(location_1.dimension, 0),
                    topLeftCorner: extracted.mappingFunction(0, 0),
                    bottomRightCorner: extracted.mappingFunction(location_1.dimension, location_1.dimension),
                    bottomLeftCorner: extracted.mappingFunction(0, location_1.dimension),
                    topRightFinderPattern: location_1.topRight,
                    topLeftFinderPattern: location_1.topLeft,
                    bottomLeftFinderPattern: location_1.bottomLeft,
                    bottomRightAlignmentPattern: location_1.alignmentPattern,
                },
            };
        }
    }
    return null;
}
var defaultOptions = {
    inversionAttempts: "attemptBoth",
};
function jsQR(data, width, height, providedOptions) {
    if (providedOptions === void 0) { providedOptions = {}; }
    var options = defaultOptions;
    Object.keys(options || {}).forEach(function (opt) {
        options[opt] = providedOptions[opt] || options[opt];
    });
    var shouldInvert = options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst";
    var tryInvertedFirst = options.inversionAttempts === "onlyInvert" || options.inversionAttempts === "invertFirst";
    var _a = binarizer_1.binarize(data, width, height, shouldInvert), binarized = _a.binarized, inverted = _a.inverted;
    var result = scan(tryInvertedFirst ? inverted : binarized);
    if (!result && (options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst")) {
        result = scan(tryInvertedFirst ? binarized : inverted);
    }
    return result;
}
jsQR.default = jsQR;
exports.default = jsQR;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix_1 = __webpack_require__(0);
var REGION_SIZE = 8;
var MIN_DYNAMIC_RANGE = 24;
function numBetween(value, min, max) {
    return value < min ? min : value > max ? max : value;
}
// Like BitMatrix but accepts arbitry Uint8 values
var Matrix = /** @class */ (function () {
    function Matrix(width, height) {
        this.width = width;
        this.data = new Uint8ClampedArray(width * height);
    }
    Matrix.prototype.get = function (x, y) {
        return this.data[y * this.width + x];
    };
    Matrix.prototype.set = function (x, y, value) {
        this.data[y * this.width + x] = value;
    };
    return Matrix;
}());
function binarize(data, width, height, returnInverted) {
    if (data.length !== width * height * 4) {
        throw new Error("Malformed data passed to binarizer.");
    }
    // Convert image to greyscale
    var greyscalePixels = new Matrix(width, height);
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var r = data[((y * width + x) * 4) + 0];
            var g = data[((y * width + x) * 4) + 1];
            var b = data[((y * width + x) * 4) + 2];
            greyscalePixels.set(x, y, 0.2126 * r + 0.7152 * g + 0.0722 * b);
        }
    }
    var horizontalRegionCount = Math.ceil(width / REGION_SIZE);
    var verticalRegionCount = Math.ceil(height / REGION_SIZE);
    var blackPoints = new Matrix(horizontalRegionCount, verticalRegionCount);
    for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
        for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
            var sum = 0;
            var min = Infinity;
            var max = 0;
            for (var y = 0; y < REGION_SIZE; y++) {
                for (var x = 0; x < REGION_SIZE; x++) {
                    var pixelLumosity = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
                    sum += pixelLumosity;
                    min = Math.min(min, pixelLumosity);
                    max = Math.max(max, pixelLumosity);
                }
            }
            var average = sum / (Math.pow(REGION_SIZE, 2));
            if (max - min <= MIN_DYNAMIC_RANGE) {
                // If variation within the block is low, assume this is a block with only light or only
                // dark pixels. In that case we do not want to use the average, as it would divide this
                // low contrast area into black and white pixels, essentially creating data out of noise.
                //
                // Default the blackpoint for these blocks to be half the min - effectively white them out
                average = min / 2;
                if (verticalRegion > 0 && hortizontalRegion > 0) {
                    // Correct the "white background" assumption for blocks that have neighbors by comparing
                    // the pixels in this block to the previously calculated black points. This is based on
                    // the fact that dark barcode symbology is always surrounded by some amount of light
                    // background for which reasonable black point estimates were made. The bp estimated at
                    // the boundaries is used for the interior.
                    // The (min < bp) is arbitrary but works better than other heuristics that were tried.
                    var averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) +
                        (2 * blackPoints.get(hortizontalRegion - 1, verticalRegion)) +
                        blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
                    if (min < averageNeighborBlackPoint) {
                        average = averageNeighborBlackPoint;
                    }
                }
            }
            blackPoints.set(hortizontalRegion, verticalRegion, average);
        }
    }
    var binarized = BitMatrix_1.BitMatrix.createEmpty(width, height);
    var inverted = null;
    if (returnInverted) {
        inverted = BitMatrix_1.BitMatrix.createEmpty(width, height);
    }
    for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
        for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
            var left = numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
            var top_1 = numBetween(verticalRegion, 2, verticalRegionCount - 3);
            var sum = 0;
            for (var xRegion = -2; xRegion <= 2; xRegion++) {
                for (var yRegion = -2; yRegion <= 2; yRegion++) {
                    sum += blackPoints.get(left + xRegion, top_1 + yRegion);
                }
            }
            var threshold = sum / 25;
            for (var xRegion = 0; xRegion < REGION_SIZE; xRegion++) {
                for (var yRegion = 0; yRegion < REGION_SIZE; yRegion++) {
                    var x = hortizontalRegion * REGION_SIZE + xRegion;
                    var y = verticalRegion * REGION_SIZE + yRegion;
                    var lum = greyscalePixels.get(x, y);
                    binarized.set(x, y, lum <= threshold);
                    if (returnInverted) {
                        inverted.set(x, y, !(lum <= threshold));
                    }
                }
            }
        }
    }
    if (returnInverted) {
        return { binarized: binarized, inverted: inverted };
    }
    return { binarized: binarized };
}
exports.binarize = binarize;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix_1 = __webpack_require__(0);
var decodeData_1 = __webpack_require__(6);
var reedsolomon_1 = __webpack_require__(9);
var version_1 = __webpack_require__(10);
// tslint:disable:no-bitwise
function numBitsDiffering(x, y) {
    var z = x ^ y;
    var bitCount = 0;
    while (z) {
        bitCount++;
        z &= z - 1;
    }
    return bitCount;
}
function pushBit(bit, byte) {
    return (byte << 1) | bit;
}
// tslint:enable:no-bitwise
var FORMAT_INFO_TABLE = [
    { bits: 0x5412, formatInfo: { errorCorrectionLevel: 1, dataMask: 0 } },
    { bits: 0x5125, formatInfo: { errorCorrectionLevel: 1, dataMask: 1 } },
    { bits: 0x5E7C, formatInfo: { errorCorrectionLevel: 1, dataMask: 2 } },
    { bits: 0x5B4B, formatInfo: { errorCorrectionLevel: 1, dataMask: 3 } },
    { bits: 0x45F9, formatInfo: { errorCorrectionLevel: 1, dataMask: 4 } },
    { bits: 0x40CE, formatInfo: { errorCorrectionLevel: 1, dataMask: 5 } },
    { bits: 0x4F97, formatInfo: { errorCorrectionLevel: 1, dataMask: 6 } },
    { bits: 0x4AA0, formatInfo: { errorCorrectionLevel: 1, dataMask: 7 } },
    { bits: 0x77C4, formatInfo: { errorCorrectionLevel: 0, dataMask: 0 } },
    { bits: 0x72F3, formatInfo: { errorCorrectionLevel: 0, dataMask: 1 } },
    { bits: 0x7DAA, formatInfo: { errorCorrectionLevel: 0, dataMask: 2 } },
    { bits: 0x789D, formatInfo: { errorCorrectionLevel: 0, dataMask: 3 } },
    { bits: 0x662F, formatInfo: { errorCorrectionLevel: 0, dataMask: 4 } },
    { bits: 0x6318, formatInfo: { errorCorrectionLevel: 0, dataMask: 5 } },
    { bits: 0x6C41, formatInfo: { errorCorrectionLevel: 0, dataMask: 6 } },
    { bits: 0x6976, formatInfo: { errorCorrectionLevel: 0, dataMask: 7 } },
    { bits: 0x1689, formatInfo: { errorCorrectionLevel: 3, dataMask: 0 } },
    { bits: 0x13BE, formatInfo: { errorCorrectionLevel: 3, dataMask: 1 } },
    { bits: 0x1CE7, formatInfo: { errorCorrectionLevel: 3, dataMask: 2 } },
    { bits: 0x19D0, formatInfo: { errorCorrectionLevel: 3, dataMask: 3 } },
    { bits: 0x0762, formatInfo: { errorCorrectionLevel: 3, dataMask: 4 } },
    { bits: 0x0255, formatInfo: { errorCorrectionLevel: 3, dataMask: 5 } },
    { bits: 0x0D0C, formatInfo: { errorCorrectionLevel: 3, dataMask: 6 } },
    { bits: 0x083B, formatInfo: { errorCorrectionLevel: 3, dataMask: 7 } },
    { bits: 0x355F, formatInfo: { errorCorrectionLevel: 2, dataMask: 0 } },
    { bits: 0x3068, formatInfo: { errorCorrectionLevel: 2, dataMask: 1 } },
    { bits: 0x3F31, formatInfo: { errorCorrectionLevel: 2, dataMask: 2 } },
    { bits: 0x3A06, formatInfo: { errorCorrectionLevel: 2, dataMask: 3 } },
    { bits: 0x24B4, formatInfo: { errorCorrectionLevel: 2, dataMask: 4 } },
    { bits: 0x2183, formatInfo: { errorCorrectionLevel: 2, dataMask: 5 } },
    { bits: 0x2EDA, formatInfo: { errorCorrectionLevel: 2, dataMask: 6 } },
    { bits: 0x2BED, formatInfo: { errorCorrectionLevel: 2, dataMask: 7 } },
];
var DATA_MASKS = [
    function (p) { return ((p.y + p.x) % 2) === 0; },
    function (p) { return (p.y % 2) === 0; },
    function (p) { return p.x % 3 === 0; },
    function (p) { return (p.y + p.x) % 3 === 0; },
    function (p) { return (Math.floor(p.y / 2) + Math.floor(p.x / 3)) % 2 === 0; },
    function (p) { return ((p.x * p.y) % 2) + ((p.x * p.y) % 3) === 0; },
    function (p) { return ((((p.y * p.x) % 2) + (p.y * p.x) % 3) % 2) === 0; },
    function (p) { return ((((p.y + p.x) % 2) + (p.y * p.x) % 3) % 2) === 0; },
];
function buildFunctionPatternMask(version) {
    var dimension = 17 + 4 * version.versionNumber;
    var matrix = BitMatrix_1.BitMatrix.createEmpty(dimension, dimension);
    matrix.setRegion(0, 0, 9, 9, true); // Top left finder pattern + separator + format
    matrix.setRegion(dimension - 8, 0, 8, 9, true); // Top right finder pattern + separator + format
    matrix.setRegion(0, dimension - 8, 9, 8, true); // Bottom left finder pattern + separator + format
    // Alignment patterns
    for (var _i = 0, _a = version.alignmentPatternCenters; _i < _a.length; _i++) {
        var x = _a[_i];
        for (var _b = 0, _c = version.alignmentPatternCenters; _b < _c.length; _b++) {
            var y = _c[_b];
            if (!(x === 6 && y === 6 || x === 6 && y === dimension - 7 || x === dimension - 7 && y === 6)) {
                matrix.setRegion(x - 2, y - 2, 5, 5, true);
            }
        }
    }
    matrix.setRegion(6, 9, 1, dimension - 17, true); // Vertical timing pattern
    matrix.setRegion(9, 6, dimension - 17, 1, true); // Horizontal timing pattern
    if (version.versionNumber > 6) {
        matrix.setRegion(dimension - 11, 0, 3, 6, true); // Version info, top right
        matrix.setRegion(0, dimension - 11, 6, 3, true); // Version info, bottom left
    }
    return matrix;
}
function readCodewords(matrix, version, formatInfo) {
    var dataMask = DATA_MASKS[formatInfo.dataMask];
    var dimension = matrix.height;
    var functionPatternMask = buildFunctionPatternMask(version);
    var codewords = [];
    var currentByte = 0;
    var bitsRead = 0;
    // Read columns in pairs, from right to left
    var readingUp = true;
    for (var columnIndex = dimension - 1; columnIndex > 0; columnIndex -= 2) {
        if (columnIndex === 6) { // Skip whole column with vertical alignment pattern;
            columnIndex--;
        }
        for (var i = 0; i < dimension; i++) {
            var y = readingUp ? dimension - 1 - i : i;
            for (var columnOffset = 0; columnOffset < 2; columnOffset++) {
                var x = columnIndex - columnOffset;
                if (!functionPatternMask.get(x, y)) {
                    bitsRead++;
                    var bit = matrix.get(x, y);
                    if (dataMask({ y: y, x: x })) {
                        bit = !bit;
                    }
                    currentByte = pushBit(bit, currentByte);
                    if (bitsRead === 8) { // Whole bytes
                        codewords.push(currentByte);
                        bitsRead = 0;
                        currentByte = 0;
                    }
                }
            }
        }
        readingUp = !readingUp;
    }
    return codewords;
}
function readVersion(matrix) {
    var dimension = matrix.height;
    var provisionalVersion = Math.floor((dimension - 17) / 4);
    if (provisionalVersion <= 6) { // 6 and under dont have version info in the QR code
        return version_1.VERSIONS[provisionalVersion - 1];
    }
    var topRightVersionBits = 0;
    for (var y = 5; y >= 0; y--) {
        for (var x = dimension - 9; x >= dimension - 11; x--) {
            topRightVersionBits = pushBit(matrix.get(x, y), topRightVersionBits);
        }
    }
    var bottomLeftVersionBits = 0;
    for (var x = 5; x >= 0; x--) {
        for (var y = dimension - 9; y >= dimension - 11; y--) {
            bottomLeftVersionBits = pushBit(matrix.get(x, y), bottomLeftVersionBits);
        }
    }
    var bestDifference = Infinity;
    var bestVersion;
    for (var _i = 0, VERSIONS_1 = version_1.VERSIONS; _i < VERSIONS_1.length; _i++) {
        var version = VERSIONS_1[_i];
        if (version.infoBits === topRightVersionBits || version.infoBits === bottomLeftVersionBits) {
            return version;
        }
        var difference = numBitsDiffering(topRightVersionBits, version.infoBits);
        if (difference < bestDifference) {
            bestVersion = version;
            bestDifference = difference;
        }
        difference = numBitsDiffering(bottomLeftVersionBits, version.infoBits);
        if (difference < bestDifference) {
            bestVersion = version;
            bestDifference = difference;
        }
    }
    // We can tolerate up to 3 bits of error since no two version info codewords will
    // differ in less than 8 bits.
    if (bestDifference <= 3) {
        return bestVersion;
    }
}
function readFormatInformation(matrix) {
    var topLeftFormatInfoBits = 0;
    for (var x = 0; x <= 8; x++) {
        if (x !== 6) { // Skip timing pattern bit
            topLeftFormatInfoBits = pushBit(matrix.get(x, 8), topLeftFormatInfoBits);
        }
    }
    for (var y = 7; y >= 0; y--) {
        if (y !== 6) { // Skip timing pattern bit
            topLeftFormatInfoBits = pushBit(matrix.get(8, y), topLeftFormatInfoBits);
        }
    }
    var dimension = matrix.height;
    var topRightBottomRightFormatInfoBits = 0;
    for (var y = dimension - 1; y >= dimension - 7; y--) { // bottom left
        topRightBottomRightFormatInfoBits = pushBit(matrix.get(8, y), topRightBottomRightFormatInfoBits);
    }
    for (var x = dimension - 8; x < dimension; x++) { // top right
        topRightBottomRightFormatInfoBits = pushBit(matrix.get(x, 8), topRightBottomRightFormatInfoBits);
    }
    var bestDifference = Infinity;
    var bestFormatInfo = null;
    for (var _i = 0, FORMAT_INFO_TABLE_1 = FORMAT_INFO_TABLE; _i < FORMAT_INFO_TABLE_1.length; _i++) {
        var _a = FORMAT_INFO_TABLE_1[_i], bits = _a.bits, formatInfo = _a.formatInfo;
        if (bits === topLeftFormatInfoBits || bits === topRightBottomRightFormatInfoBits) {
            return formatInfo;
        }
        var difference = numBitsDiffering(topLeftFormatInfoBits, bits);
        if (difference < bestDifference) {
            bestFormatInfo = formatInfo;
            bestDifference = difference;
        }
        if (topLeftFormatInfoBits !== topRightBottomRightFormatInfoBits) { // also try the other option
            difference = numBitsDiffering(topRightBottomRightFormatInfoBits, bits);
            if (difference < bestDifference) {
                bestFormatInfo = formatInfo;
                bestDifference = difference;
            }
        }
    }
    // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits differing means we found a match
    if (bestDifference <= 3) {
        return bestFormatInfo;
    }
    return null;
}
function getDataBlocks(codewords, version, ecLevel) {
    var ecInfo = version.errorCorrectionLevels[ecLevel];
    var dataBlocks = [];
    var totalCodewords = 0;
    ecInfo.ecBlocks.forEach(function (block) {
        for (var i = 0; i < block.numBlocks; i++) {
            dataBlocks.push({ numDataCodewords: block.dataCodewordsPerBlock, codewords: [] });
            totalCodewords += block.dataCodewordsPerBlock + ecInfo.ecCodewordsPerBlock;
        }
    });
    // In some cases the QR code will be malformed enough that we pull off more or less than we should.
    // If we pull off less there's nothing we can do.
    // If we pull off more we can safely truncate
    if (codewords.length < totalCodewords) {
        return null;
    }
    codewords = codewords.slice(0, totalCodewords);
    var shortBlockSize = ecInfo.ecBlocks[0].dataCodewordsPerBlock;
    // Pull codewords to fill the blocks up to the minimum size
    for (var i = 0; i < shortBlockSize; i++) {
        for (var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++) {
            var dataBlock = dataBlocks_1[_i];
            dataBlock.codewords.push(codewords.shift());
        }
    }
    // If there are any large blocks, pull codewords to fill the last element of those
    if (ecInfo.ecBlocks.length > 1) {
        var smallBlockCount = ecInfo.ecBlocks[0].numBlocks;
        var largeBlockCount = ecInfo.ecBlocks[1].numBlocks;
        for (var i = 0; i < largeBlockCount; i++) {
            dataBlocks[smallBlockCount + i].codewords.push(codewords.shift());
        }
    }
    // Add the rest of the codewords to the blocks. These are the error correction codewords.
    while (codewords.length > 0) {
        for (var _a = 0, dataBlocks_2 = dataBlocks; _a < dataBlocks_2.length; _a++) {
            var dataBlock = dataBlocks_2[_a];
            dataBlock.codewords.push(codewords.shift());
        }
    }
    return dataBlocks;
}
function decodeMatrix(matrix) {
    var version = readVersion(matrix);
    if (!version) {
        return null;
    }
    var formatInfo = readFormatInformation(matrix);
    if (!formatInfo) {
        return null;
    }
    var codewords = readCodewords(matrix, version, formatInfo);
    var dataBlocks = getDataBlocks(codewords, version, formatInfo.errorCorrectionLevel);
    if (!dataBlocks) {
        return null;
    }
    // Count total number of data bytes
    var totalBytes = dataBlocks.reduce(function (a, b) { return a + b.numDataCodewords; }, 0);
    var resultBytes = new Uint8ClampedArray(totalBytes);
    var resultIndex = 0;
    for (var _i = 0, dataBlocks_3 = dataBlocks; _i < dataBlocks_3.length; _i++) {
        var dataBlock = dataBlocks_3[_i];
        var correctedBytes = reedsolomon_1.decode(dataBlock.codewords, dataBlock.codewords.length - dataBlock.numDataCodewords);
        if (!correctedBytes) {
            return null;
        }
        for (var i = 0; i < dataBlock.numDataCodewords; i++) {
            resultBytes[resultIndex++] = correctedBytes[i];
        }
    }
    try {
        return decodeData_1.decode(resultBytes, version.versionNumber);
    }
    catch (_a) {
        return null;
    }
}
function decode(matrix) {
    if (matrix == null) {
        return null;
    }
    var result = decodeMatrix(matrix);
    if (result) {
        return result;
    }
    // Decoding didn't work, try mirroring the QR across the topLeft -> bottomRight line.
    for (var x = 0; x < matrix.width; x++) {
        for (var y = x + 1; y < matrix.height; y++) {
            if (matrix.get(x, y) !== matrix.get(y, x)) {
                matrix.set(x, y, !matrix.get(x, y));
                matrix.set(y, x, !matrix.get(y, x));
            }
        }
    }
    return decodeMatrix(matrix);
}
exports.decode = decode;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-bitwise
var BitStream_1 = __webpack_require__(7);
var shiftJISTable_1 = __webpack_require__(8);
var Mode;
(function (Mode) {
    Mode["Numeric"] = "numeric";
    Mode["Alphanumeric"] = "alphanumeric";
    Mode["Byte"] = "byte";
    Mode["Kanji"] = "kanji";
    Mode["ECI"] = "eci";
})(Mode = exports.Mode || (exports.Mode = {}));
var ModeByte;
(function (ModeByte) {
    ModeByte[ModeByte["Terminator"] = 0] = "Terminator";
    ModeByte[ModeByte["Numeric"] = 1] = "Numeric";
    ModeByte[ModeByte["Alphanumeric"] = 2] = "Alphanumeric";
    ModeByte[ModeByte["Byte"] = 4] = "Byte";
    ModeByte[ModeByte["Kanji"] = 8] = "Kanji";
    ModeByte[ModeByte["ECI"] = 7] = "ECI";
    // StructuredAppend = 0x3,
    // FNC1FirstPosition = 0x5,
    // FNC1SecondPosition = 0x9,
})(ModeByte || (ModeByte = {}));
function decodeNumeric(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [10, 12, 14][size];
    var length = stream.readBits(characterCountSize);
    // Read digits in groups of 3
    while (length >= 3) {
        var num = stream.readBits(10);
        if (num >= 1000) {
            throw new Error("Invalid numeric value above 999");
        }
        var a = Math.floor(num / 100);
        var b = Math.floor(num / 10) % 10;
        var c = num % 10;
        bytes.push(48 + a, 48 + b, 48 + c);
        text += a.toString() + b.toString() + c.toString();
        length -= 3;
    }
    // If the number of digits aren't a multiple of 3, the remaining digits are special cased.
    if (length === 2) {
        var num = stream.readBits(7);
        if (num >= 100) {
            throw new Error("Invalid numeric value above 99");
        }
        var a = Math.floor(num / 10);
        var b = num % 10;
        bytes.push(48 + a, 48 + b);
        text += a.toString() + b.toString();
    }
    else if (length === 1) {
        var num = stream.readBits(4);
        if (num >= 10) {
            throw new Error("Invalid numeric value above 9");
        }
        bytes.push(48 + num);
        text += num.toString();
    }
    return { bytes: bytes, text: text };
}
var AlphanumericCharacterCodes = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8",
    "9", "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    " ", "$", "%", "*", "+", "-", ".", "/", ":",
];
function decodeAlphanumeric(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [9, 11, 13][size];
    var length = stream.readBits(characterCountSize);
    while (length >= 2) {
        var v = stream.readBits(11);
        var a = Math.floor(v / 45);
        var b = v % 45;
        bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0), AlphanumericCharacterCodes[b].charCodeAt(0));
        text += AlphanumericCharacterCodes[a] + AlphanumericCharacterCodes[b];
        length -= 2;
    }
    if (length === 1) {
        var a = stream.readBits(6);
        bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0));
        text += AlphanumericCharacterCodes[a];
    }
    return { bytes: bytes, text: text };
}
function decodeByte(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [8, 16, 16][size];
    var length = stream.readBits(characterCountSize);
    for (var i = 0; i < length; i++) {
        var b = stream.readBits(8);
        bytes.push(b);
    }
    try {
        text += decodeURIComponent(bytes.map(function (b) { return "%" + ("0" + b.toString(16)).substr(-2); }).join(""));
    }
    catch (_a) {
        // failed to decode
    }
    return { bytes: bytes, text: text };
}
function decodeKanji(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [8, 10, 12][size];
    var length = stream.readBits(characterCountSize);
    for (var i = 0; i < length; i++) {
        var k = stream.readBits(13);
        var c = (Math.floor(k / 0xC0) << 8) | (k % 0xC0);
        if (c < 0x1F00) {
            c += 0x8140;
        }
        else {
            c += 0xC140;
        }
        bytes.push(c >> 8, c & 0xFF);
        text += String.fromCharCode(shiftJISTable_1.shiftJISTable[c]);
    }
    return { bytes: bytes, text: text };
}
function decode(data, version) {
    var _a, _b, _c, _d;
    var stream = new BitStream_1.BitStream(data);
    // There are 3 'sizes' based on the version. 1-9 is small (0), 10-26 is medium (1) and 27-40 is large (2).
    var size = version <= 9 ? 0 : version <= 26 ? 1 : 2;
    var result = {
        text: "",
        bytes: [],
        chunks: [],
        version: version,
    };
    while (stream.available() >= 4) {
        var mode = stream.readBits(4);
        if (mode === ModeByte.Terminator) {
            return result;
        }
        else if (mode === ModeByte.ECI) {
            if (stream.readBits(1) === 0) {
                result.chunks.push({
                    type: Mode.ECI,
                    assignmentNumber: stream.readBits(7),
                });
            }
            else if (stream.readBits(1) === 0) {
                result.chunks.push({
                    type: Mode.ECI,
                    assignmentNumber: stream.readBits(14),
                });
            }
            else if (stream.readBits(1) === 0) {
                result.chunks.push({
                    type: Mode.ECI,
                    assignmentNumber: stream.readBits(21),
                });
            }
            else {
                // ECI data seems corrupted
                result.chunks.push({
                    type: Mode.ECI,
                    assignmentNumber: -1,
                });
            }
        }
        else if (mode === ModeByte.Numeric) {
            var numericResult = decodeNumeric(stream, size);
            result.text += numericResult.text;
            (_a = result.bytes).push.apply(_a, numericResult.bytes);
            result.chunks.push({
                type: Mode.Numeric,
                text: numericResult.text,
            });
        }
        else if (mode === ModeByte.Alphanumeric) {
            var alphanumericResult = decodeAlphanumeric(stream, size);
            result.text += alphanumericResult.text;
            (_b = result.bytes).push.apply(_b, alphanumericResult.bytes);
            result.chunks.push({
                type: Mode.Alphanumeric,
                text: alphanumericResult.text,
            });
        }
        else if (mode === ModeByte.Byte) {
            var byteResult = decodeByte(stream, size);
            result.text += byteResult.text;
            (_c = result.bytes).push.apply(_c, byteResult.bytes);
            result.chunks.push({
                type: Mode.Byte,
                bytes: byteResult.bytes,
                text: byteResult.text,
            });
        }
        else if (mode === ModeByte.Kanji) {
            var kanjiResult = decodeKanji(stream, size);
            result.text += kanjiResult.text;
            (_d = result.bytes).push.apply(_d, kanjiResult.bytes);
            result.chunks.push({
                type: Mode.Kanji,
                bytes: kanjiResult.bytes,
                text: kanjiResult.text,
            });
        }
    }
    // If there is no data left, or the remaining bits are all 0, then that counts as a termination marker
    if (stream.available() === 0 || stream.readBits(stream.available()) === 0) {
        return result;
    }
}
exports.decode = decode;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:no-bitwise
Object.defineProperty(exports, "__esModule", { value: true });
var BitStream = /** @class */ (function () {
    function BitStream(bytes) {
        this.byteOffset = 0;
        this.bitOffset = 0;
        this.bytes = bytes;
    }
    BitStream.prototype.readBits = function (numBits) {
        if (numBits < 1 || numBits > 32 || numBits > this.available()) {
            throw new Error("Cannot read " + numBits.toString() + " bits");
        }
        var result = 0;
        // First, read remainder from current byte
        if (this.bitOffset > 0) {
            var bitsLeft = 8 - this.bitOffset;
            var toRead = numBits < bitsLeft ? numBits : bitsLeft;
            var bitsToNotRead = bitsLeft - toRead;
            var mask = (0xFF >> (8 - toRead)) << bitsToNotRead;
            result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
            numBits -= toRead;
            this.bitOffset += toRead;
            if (this.bitOffset === 8) {
                this.bitOffset = 0;
                this.byteOffset++;
            }
        }
        // Next read whole bytes
        if (numBits > 0) {
            while (numBits >= 8) {
                result = (result << 8) | (this.bytes[this.byteOffset] & 0xFF);
                this.byteOffset++;
                numBits -= 8;
            }
            // Finally read a partial byte
            if (numBits > 0) {
                var bitsToNotRead = 8 - numBits;
                var mask = (0xFF >> bitsToNotRead) << bitsToNotRead;
                result = (result << numBits) | ((this.bytes[this.byteOffset] & mask) >> bitsToNotRead);
                this.bitOffset += numBits;
            }
        }
        return result;
    };
    BitStream.prototype.available = function () {
        return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
    };
    return BitStream;
}());
exports.BitStream = BitStream;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftJISTable = {
    0x20: 0x0020,
    0x21: 0x0021,
    0x22: 0x0022,
    0x23: 0x0023,
    0x24: 0x0024,
    0x25: 0x0025,
    0x26: 0x0026,
    0x27: 0x0027,
    0x28: 0x0028,
    0x29: 0x0029,
    0x2A: 0x002A,
    0x2B: 0x002B,
    0x2C: 0x002C,
    0x2D: 0x002D,
    0x2E: 0x002E,
    0x2F: 0x002F,
    0x30: 0x0030,
    0x31: 0x0031,
    0x32: 0x0032,
    0x33: 0x0033,
    0x34: 0x0034,
    0x35: 0x0035,
    0x36: 0x0036,
    0x37: 0x0037,
    0x38: 0x0038,
    0x39: 0x0039,
    0x3A: 0x003A,
    0x3B: 0x003B,
    0x3C: 0x003C,
    0x3D: 0x003D,
    0x3E: 0x003E,
    0x3F: 0x003F,
    0x40: 0x0040,
    0x41: 0x0041,
    0x42: 0x0042,
    0x43: 0x0043,
    0x44: 0x0044,
    0x45: 0x0045,
    0x46: 0x0046,
    0x47: 0x0047,
    0x48: 0x0048,
    0x49: 0x0049,
    0x4A: 0x004A,
    0x4B: 0x004B,
    0x4C: 0x004C,
    0x4D: 0x004D,
    0x4E: 0x004E,
    0x4F: 0x004F,
    0x50: 0x0050,
    0x51: 0x0051,
    0x52: 0x0052,
    0x53: 0x0053,
    0x54: 0x0054,
    0x55: 0x0055,
    0x56: 0x0056,
    0x57: 0x0057,
    0x58: 0x0058,
    0x59: 0x0059,
    0x5A: 0x005A,
    0x5B: 0x005B,
    0x5C: 0x00A5,
    0x5D: 0x005D,
    0x5E: 0x005E,
    0x5F: 0x005F,
    0x60: 0x0060,
    0x61: 0x0061,
    0x62: 0x0062,
    0x63: 0x0063,
    0x64: 0x0064,
    0x65: 0x0065,
    0x66: 0x0066,
    0x67: 0x0067,
    0x68: 0x0068,
    0x69: 0x0069,
    0x6A: 0x006A,
    0x6B: 0x006B,
    0x6C: 0x006C,
    0x6D: 0x006D,
    0x6E: 0x006E,
    0x6F: 0x006F,
    0x70: 0x0070,
    0x71: 0x0071,
    0x72: 0x0072,
    0x73: 0x0073,
    0x74: 0x0074,
    0x75: 0x0075,
    0x76: 0x0076,
    0x77: 0x0077,
    0x78: 0x0078,
    0x79: 0x0079,
    0x7A: 0x007A,
    0x7B: 0x007B,
    0x7C: 0x007C,
    0x7D: 0x007D,
    0x7E: 0x203E,
    0x8140: 0x3000,
    0x8141: 0x3001,
    0x8142: 0x3002,
    0x8143: 0xFF0C,
    0x8144: 0xFF0E,
    0x8145: 0x30FB,
    0x8146: 0xFF1A,
    0x8147: 0xFF1B,
    0x8148: 0xFF1F,
    0x8149: 0xFF01,
    0x814A: 0x309B,
    0x814B: 0x309C,
    0x814C: 0x00B4,
    0x814D: 0xFF40,
    0x814E: 0x00A8,
    0x814F: 0xFF3E,
    0x8150: 0xFFE3,
    0x8151: 0xFF3F,
    0x8152: 0x30FD,
    0x8153: 0x30FE,
    0x8154: 0x309D,
    0x8155: 0x309E,
    0x8156: 0x3003,
    0x8157: 0x4EDD,
    0x8158: 0x3005,
    0x8159: 0x3006,
    0x815A: 0x3007,
    0x815B: 0x30FC,
    0x815C: 0x2015,
    0x815D: 0x2010,
    0x815E: 0xFF0F,
    0x815F: 0x005C,
    0x8160: 0x301C,
    0x8161: 0x2016,
    0x8162: 0xFF5C,
    0x8163: 0x2026,
    0x8164: 0x2025,
    0x8165: 0x2018,
    0x8166: 0x2019,
    0x8167: 0x201C,
    0x8168: 0x201D,
    0x8169: 0xFF08,
    0x816A: 0xFF09,
    0x816B: 0x3014,
    0x816C: 0x3015,
    0x816D: 0xFF3B,
    0x816E: 0xFF3D,
    0x816F: 0xFF5B,
    0x8170: 0xFF5D,
    0x8171: 0x3008,
    0x8172: 0x3009,
    0x8173: 0x300A,
    0x8174: 0x300B,
    0x8175: 0x300C,
    0x8176: 0x300D,
    0x8177: 0x300E,
    0x8178: 0x300F,
    0x8179: 0x3010,
    0x817A: 0x3011,
    0x817B: 0xFF0B,
    0x817C: 0x2212,
    0x817D: 0x00B1,
    0x817E: 0x00D7,
    0x8180: 0x00F7,
    0x8181: 0xFF1D,
    0x8182: 0x2260,
    0x8183: 0xFF1C,
    0x8184: 0xFF1E,
    0x8185: 0x2266,
    0x8186: 0x2267,
    0x8187: 0x221E,
    0x8188: 0x2234,
    0x8189: 0x2642,
    0x818A: 0x2640,
    0x818B: 0x00B0,
    0x818C: 0x2032,
    0x818D: 0x2033,
    0x818E: 0x2103,
    0x818F: 0xFFE5,
    0x8190: 0xFF04,
    0x8191: 0x00A2,
    0x8192: 0x00A3,
    0x8193: 0xFF05,
    0x8194: 0xFF03,
    0x8195: 0xFF06,
    0x8196: 0xFF0A,
    0x8197: 0xFF20,
    0x8198: 0x00A7,
    0x8199: 0x2606,
    0x819A: 0x2605,
    0x819B: 0x25CB,
    0x819C: 0x25CF,
    0x819D: 0x25CE,
    0x819E: 0x25C7,
    0x819F: 0x25C6,
    0x81A0: 0x25A1,
    0x81A1: 0x25A0,
    0x81A2: 0x25B3,
    0x81A3: 0x25B2,
    0x81A4: 0x25BD,
    0x81A5: 0x25BC,
    0x81A6: 0x203B,
    0x81A7: 0x3012,
    0x81A8: 0x2192,
    0x81A9: 0x2190,
    0x81AA: 0x2191,
    0x81AB: 0x2193,
    0x81AC: 0x3013,
    0x81B8: 0x2208,
    0x81B9: 0x220B,
    0x81BA: 0x2286,
    0x81BB: 0x2287,
    0x81BC: 0x2282,
    0x81BD: 0x2283,
    0x81BE: 0x222A,
    0x81BF: 0x2229,
    0x81C8: 0x2227,
    0x81C9: 0x2228,
    0x81CA: 0x00AC,
    0x81CB: 0x21D2,
    0x81CC: 0x21D4,
    0x81CD: 0x2200,
    0x81CE: 0x2203,
    0x81DA: 0x2220,
    0x81DB: 0x22A5,
    0x81DC: 0x2312,
    0x81DD: 0x2202,
    0x81DE: 0x2207,
    0x81DF: 0x2261,
    0x81E0: 0x2252,
    0x81E1: 0x226A,
    0x81E2: 0x226B,
    0x81E3: 0x221A,
    0x81E4: 0x223D,
    0x81E5: 0x221D,
    0x81E6: 0x2235,
    0x81E7: 0x222B,
    0x81E8: 0x222C,
    0x81F0: 0x212B,
    0x81F1: 0x2030,
    0x81F2: 0x266F,
    0x81F3: 0x266D,
    0x81F4: 0x266A,
    0x81F5: 0x2020,
    0x81F6: 0x2021,
    0x81F7: 0x00B6,
    0x81FC: 0x25EF,
    0x824F: 0xFF10,
    0x8250: 0xFF11,
    0x8251: 0xFF12,
    0x8252: 0xFF13,
    0x8253: 0xFF14,
    0x8254: 0xFF15,
    0x8255: 0xFF16,
    0x8256: 0xFF17,
    0x8257: 0xFF18,
    0x8258: 0xFF19,
    0x8260: 0xFF21,
    0x8261: 0xFF22,
    0x8262: 0xFF23,
    0x8263: 0xFF24,
    0x8264: 0xFF25,
    0x8265: 0xFF26,
    0x8266: 0xFF27,
    0x8267: 0xFF28,
    0x8268: 0xFF29,
    0x8269: 0xFF2A,
    0x826A: 0xFF2B,
    0x826B: 0xFF2C,
    0x826C: 0xFF2D,
    0x826D: 0xFF2E,
    0x826E: 0xFF2F,
    0x826F: 0xFF30,
    0x8270: 0xFF31,
    0x8271: 0xFF32,
    0x8272: 0xFF33,
    0x8273: 0xFF34,
    0x8274: 0xFF35,
    0x8275: 0xFF36,
    0x8276: 0xFF37,
    0x8277: 0xFF38,
    0x8278: 0xFF39,
    0x8279: 0xFF3A,
    0x8281: 0xFF41,
    0x8282: 0xFF42,
    0x8283: 0xFF43,
    0x8284: 0xFF44,
    0x8285: 0xFF45,
    0x8286: 0xFF46,
    0x8287: 0xFF47,
    0x8288: 0xFF48,
    0x8289: 0xFF49,
    0x828A: 0xFF4A,
    0x828B: 0xFF4B,
    0x828C: 0xFF4C,
    0x828D: 0xFF4D,
    0x828E: 0xFF4E,
    0x828F: 0xFF4F,
    0x8290: 0xFF50,
    0x8291: 0xFF51,
    0x8292: 0xFF52,
    0x8293: 0xFF53,
    0x8294: 0xFF54,
    0x8295: 0xFF55,
    0x8296: 0xFF56,
    0x8297: 0xFF57,
    0x8298: 0xFF58,
    0x8299: 0xFF59,
    0x829A: 0xFF5A,
    0x829F: 0x3041,
    0x82A0: 0x3042,
    0x82A1: 0x3043,
    0x82A2: 0x3044,
    0x82A3: 0x3045,
    0x82A4: 0x3046,
    0x82A5: 0x3047,
    0x82A6: 0x3048,
    0x82A7: 0x3049,
    0x82A8: 0x304A,
    0x82A9: 0x304B,
    0x82AA: 0x304C,
    0x82AB: 0x304D,
    0x82AC: 0x304E,
    0x82AD: 0x304F,
    0x82AE: 0x3050,
    0x82AF: 0x3051,
    0x82B0: 0x3052,
    0x82B1: 0x3053,
    0x82B2: 0x3054,
    0x82B3: 0x3055,
    0x82B4: 0x3056,
    0x82B5: 0x3057,
    0x82B6: 0x3058,
    0x82B7: 0x3059,
    0x82B8: 0x305A,
    0x82B9: 0x305B,
    0x82BA: 0x305C,
    0x82BB: 0x305D,
    0x82BC: 0x305E,
    0x82BD: 0x305F,
    0x82BE: 0x3060,
    0x82BF: 0x3061,
    0x82C0: 0x3062,
    0x82C1: 0x3063,
    0x82C2: 0x3064,
    0x82C3: 0x3065,
    0x82C4: 0x3066,
    0x82C5: 0x3067,
    0x82C6: 0x3068,
    0x82C7: 0x3069,
    0x82C8: 0x306A,
    0x82C9: 0x306B,
    0x82CA: 0x306C,
    0x82CB: 0x306D,
    0x82CC: 0x306E,
    0x82CD: 0x306F,
    0x82CE: 0x3070,
    0x82CF: 0x3071,
    0x82D0: 0x3072,
    0x82D1: 0x3073,
    0x82D2: 0x3074,
    0x82D3: 0x3075,
    0x82D4: 0x3076,
    0x82D5: 0x3077,
    0x82D6: 0x3078,
    0x82D7: 0x3079,
    0x82D8: 0x307A,
    0x82D9: 0x307B,
    0x82DA: 0x307C,
    0x82DB: 0x307D,
    0x82DC: 0x307E,
    0x82DD: 0x307F,
    0x82DE: 0x3080,
    0x82DF: 0x3081,
    0x82E0: 0x3082,
    0x82E1: 0x3083,
    0x82E2: 0x3084,
    0x82E3: 0x3085,
    0x82E4: 0x3086,
    0x82E5: 0x3087,
    0x82E6: 0x3088,
    0x82E7: 0x3089,
    0x82E8: 0x308A,
    0x82E9: 0x308B,
    0x82EA: 0x308C,
    0x82EB: 0x308D,
    0x82EC: 0x308E,
    0x82ED: 0x308F,
    0x82EE: 0x3090,
    0x82EF: 0x3091,
    0x82F0: 0x3092,
    0x82F1: 0x3093,
    0x8340: 0x30A1,
    0x8341: 0x30A2,
    0x8342: 0x30A3,
    0x8343: 0x30A4,
    0x8344: 0x30A5,
    0x8345: 0x30A6,
    0x8346: 0x30A7,
    0x8347: 0x30A8,
    0x8348: 0x30A9,
    0x8349: 0x30AA,
    0x834A: 0x30AB,
    0x834B: 0x30AC,
    0x834C: 0x30AD,
    0x834D: 0x30AE,
    0x834E: 0x30AF,
    0x834F: 0x30B0,
    0x8350: 0x30B1,
    0x8351: 0x30B2,
    0x8352: 0x30B3,
    0x8353: 0x30B4,
    0x8354: 0x30B5,
    0x8355: 0x30B6,
    0x8356: 0x30B7,
    0x8357: 0x30B8,
    0x8358: 0x30B9,
    0x8359: 0x30BA,
    0x835A: 0x30BB,
    0x835B: 0x30BC,
    0x835C: 0x30BD,
    0x835D: 0x30BE,
    0x835E: 0x30BF,
    0x835F: 0x30C0,
    0x8360: 0x30C1,
    0x8361: 0x30C2,
    0x8362: 0x30C3,
    0x8363: 0x30C4,
    0x8364: 0x30C5,
    0x8365: 0x30C6,
    0x8366: 0x30C7,
    0x8367: 0x30C8,
    0x8368: 0x30C9,
    0x8369: 0x30CA,
    0x836A: 0x30CB,
    0x836B: 0x30CC,
    0x836C: 0x30CD,
    0x836D: 0x30CE,
    0x836E: 0x30CF,
    0x836F: 0x30D0,
    0x8370: 0x30D1,
    0x8371: 0x30D2,
    0x8372: 0x30D3,
    0x8373: 0x30D4,
    0x8374: 0x30D5,
    0x8375: 0x30D6,
    0x8376: 0x30D7,
    0x8377: 0x30D8,
    0x8378: 0x30D9,
    0x8379: 0x30DA,
    0x837A: 0x30DB,
    0x837B: 0x30DC,
    0x837C: 0x30DD,
    0x837D: 0x30DE,
    0x837E: 0x30DF,
    0x8380: 0x30E0,
    0x8381: 0x30E1,
    0x8382: 0x30E2,
    0x8383: 0x30E3,
    0x8384: 0x30E4,
    0x8385: 0x30E5,
    0x8386: 0x30E6,
    0x8387: 0x30E7,
    0x8388: 0x30E8,
    0x8389: 0x30E9,
    0x838A: 0x30EA,
    0x838B: 0x30EB,
    0x838C: 0x30EC,
    0x838D: 0x30ED,
    0x838E: 0x30EE,
    0x838F: 0x30EF,
    0x8390: 0x30F0,
    0x8391: 0x30F1,
    0x8392: 0x30F2,
    0x8393: 0x30F3,
    0x8394: 0x30F4,
    0x8395: 0x30F5,
    0x8396: 0x30F6,
    0x839F: 0x0391,
    0x83A0: 0x0392,
    0x83A1: 0x0393,
    0x83A2: 0x0394,
    0x83A3: 0x0395,
    0x83A4: 0x0396,
    0x83A5: 0x0397,
    0x83A6: 0x0398,
    0x83A7: 0x0399,
    0x83A8: 0x039A,
    0x83A9: 0x039B,
    0x83AA: 0x039C,
    0x83AB: 0x039D,
    0x83AC: 0x039E,
    0x83AD: 0x039F,
    0x83AE: 0x03A0,
    0x83AF: 0x03A1,
    0x83B0: 0x03A3,
    0x83B1: 0x03A4,
    0x83B2: 0x03A5,
    0x83B3: 0x03A6,
    0x83B4: 0x03A7,
    0x83B5: 0x03A8,
    0x83B6: 0x03A9,
    0x83BF: 0x03B1,
    0x83C0: 0x03B2,
    0x83C1: 0x03B3,
    0x83C2: 0x03B4,
    0x83C3: 0x03B5,
    0x83C4: 0x03B6,
    0x83C5: 0x03B7,
    0x83C6: 0x03B8,
    0x83C7: 0x03B9,
    0x83C8: 0x03BA,
    0x83C9: 0x03BB,
    0x83CA: 0x03BC,
    0x83CB: 0x03BD,
    0x83CC: 0x03BE,
    0x83CD: 0x03BF,
    0x83CE: 0x03C0,
    0x83CF: 0x03C1,
    0x83D0: 0x03C3,
    0x83D1: 0x03C4,
    0x83D2: 0x03C5,
    0x83D3: 0x03C6,
    0x83D4: 0x03C7,
    0x83D5: 0x03C8,
    0x83D6: 0x03C9,
    0x8440: 0x0410,
    0x8441: 0x0411,
    0x8442: 0x0412,
    0x8443: 0x0413,
    0x8444: 0x0414,
    0x8445: 0x0415,
    0x8446: 0x0401,
    0x8447: 0x0416,
    0x8448: 0x0417,
    0x8449: 0x0418,
    0x844A: 0x0419,
    0x844B: 0x041A,
    0x844C: 0x041B,
    0x844D: 0x041C,
    0x844E: 0x041D,
    0x844F: 0x041E,
    0x8450: 0x041F,
    0x8451: 0x0420,
    0x8452: 0x0421,
    0x8453: 0x0422,
    0x8454: 0x0423,
    0x8455: 0x0424,
    0x8456: 0x0425,
    0x8457: 0x0426,
    0x8458: 0x0427,
    0x8459: 0x0428,
    0x845A: 0x0429,
    0x845B: 0x042A,
    0x845C: 0x042B,
    0x845D: 0x042C,
    0x845E: 0x042D,
    0x845F: 0x042E,
    0x8460: 0x042F,
    0x8470: 0x0430,
    0x8471: 0x0431,
    0x8472: 0x0432,
    0x8473: 0x0433,
    0x8474: 0x0434,
    0x8475: 0x0435,
    0x8476: 0x0451,
    0x8477: 0x0436,
    0x8478: 0x0437,
    0x8479: 0x0438,
    0x847A: 0x0439,
    0x847B: 0x043A,
    0x847C: 0x043B,
    0x847D: 0x043C,
    0x847E: 0x043D,
    0x8480: 0x043E,
    0x8481: 0x043F,
    0x8482: 0x0440,
    0x8483: 0x0441,
    0x8484: 0x0442,
    0x8485: 0x0443,
    0x8486: 0x0444,
    0x8487: 0x0445,
    0x8488: 0x0446,
    0x8489: 0x0447,
    0x848A: 0x0448,
    0x848B: 0x0449,
    0x848C: 0x044A,
    0x848D: 0x044B,
    0x848E: 0x044C,
    0x848F: 0x044D,
    0x8490: 0x044E,
    0x8491: 0x044F,
    0x849F: 0x2500,
    0x84A0: 0x2502,
    0x84A1: 0x250C,
    0x84A2: 0x2510,
    0x84A3: 0x2518,
    0x84A4: 0x2514,
    0x84A5: 0x251C,
    0x84A6: 0x252C,
    0x84A7: 0x2524,
    0x84A8: 0x2534,
    0x84A9: 0x253C,
    0x84AA: 0x2501,
    0x84AB: 0x2503,
    0x84AC: 0x250F,
    0x84AD: 0x2513,
    0x84AE: 0x251B,
    0x84AF: 0x2517,
    0x84B0: 0x2523,
    0x84B1: 0x2533,
    0x84B2: 0x252B,
    0x84B3: 0x253B,
    0x84B4: 0x254B,
    0x84B5: 0x2520,
    0x84B6: 0x252F,
    0x84B7: 0x2528,
    0x84B8: 0x2537,
    0x84B9: 0x253F,
    0x84BA: 0x251D,
    0x84BB: 0x2530,
    0x84BC: 0x2525,
    0x84BD: 0x2538,
    0x84BE: 0x2542,
    0x889F: 0x4E9C,
    0x88A0: 0x5516,
    0x88A1: 0x5A03,
    0x88A2: 0x963F,
    0x88A3: 0x54C0,
    0x88A4: 0x611B,
    0x88A5: 0x6328,
    0x88A6: 0x59F6,
    0x88A7: 0x9022,
    0x88A8: 0x8475,
    0x88A9: 0x831C,
    0x88AA: 0x7A50,
    0x88AB: 0x60AA,
    0x88AC: 0x63E1,
    0x88AD: 0x6E25,
    0x88AE: 0x65ED,
    0x88AF: 0x8466,
    0x88B0: 0x82A6,
    0x88B1: 0x9BF5,
    0x88B2: 0x6893,
    0x88B3: 0x5727,
    0x88B4: 0x65A1,
    0x88B5: 0x6271,
    0x88B6: 0x5B9B,
    0x88B7: 0x59D0,
    0x88B8: 0x867B,
    0x88B9: 0x98F4,
    0x88BA: 0x7D62,
    0x88BB: 0x7DBE,
    0x88BC: 0x9B8E,
    0x88BD: 0x6216,
    0x88BE: 0x7C9F,
    0x88BF: 0x88B7,
    0x88C0: 0x5B89,
    0x88C1: 0x5EB5,
    0x88C2: 0x6309,
    0x88C3: 0x6697,
    0x88C4: 0x6848,
    0x88C5: 0x95C7,
    0x88C6: 0x978D,
    0x88C7: 0x674F,
    0x88C8: 0x4EE5,
    0x88C9: 0x4F0A,
    0x88CA: 0x4F4D,
    0x88CB: 0x4F9D,
    0x88CC: 0x5049,
    0x88CD: 0x56F2,
    0x88CE: 0x5937,
    0x88CF: 0x59D4,
    0x88D0: 0x5A01,
    0x88D1: 0x5C09,
    0x88D2: 0x60DF,
    0x88D3: 0x610F,
    0x88D4: 0x6170,
    0x88D5: 0x6613,
    0x88D6: 0x6905,
    0x88D7: 0x70BA,
    0x88D8: 0x754F,
    0x88D9: 0x7570,
    0x88DA: 0x79FB,
    0x88DB: 0x7DAD,
    0x88DC: 0x7DEF,
    0x88DD: 0x80C3,
    0x88DE: 0x840E,
    0x88DF: 0x8863,
    0x88E0: 0x8B02,
    0x88E1: 0x9055,
    0x88E2: 0x907A,
    0x88E3: 0x533B,
    0x88E4: 0x4E95,
    0x88E5: 0x4EA5,
    0x88E6: 0x57DF,
    0x88E7: 0x80B2,
    0x88E8: 0x90C1,
    0x88E9: 0x78EF,
    0x88EA: 0x4E00,
    0x88EB: 0x58F1,
    0x88EC: 0x6EA2,
    0x88ED: 0x9038,
    0x88EE: 0x7A32,
    0x88EF: 0x8328,
    0x88F0: 0x828B,
    0x88F1: 0x9C2F,
    0x88F2: 0x5141,
    0x88F3: 0x5370,
    0x88F4: 0x54BD,
    0x88F5: 0x54E1,
    0x88F6: 0x56E0,
    0x88F7: 0x59FB,
    0x88F8: 0x5F15,
    0x88F9: 0x98F2,
    0x88FA: 0x6DEB,
    0x88FB: 0x80E4,
    0x88FC: 0x852D,
    0x8940: 0x9662,
    0x8941: 0x9670,
    0x8942: 0x96A0,
    0x8943: 0x97FB,
    0x8944: 0x540B,
    0x8945: 0x53F3,
    0x8946: 0x5B87,
    0x8947: 0x70CF,
    0x8948: 0x7FBD,
    0x8949: 0x8FC2,
    0x894A: 0x96E8,
    0x894B: 0x536F,
    0x894C: 0x9D5C,
    0x894D: 0x7ABA,
    0x894E: 0x4E11,
    0x894F: 0x7893,
    0x8950: 0x81FC,
    0x8951: 0x6E26,
    0x8952: 0x5618,
    0x8953: 0x5504,
    0x8954: 0x6B1D,
    0x8955: 0x851A,
    0x8956: 0x9C3B,
    0x8957: 0x59E5,
    0x8958: 0x53A9,
    0x8959: 0x6D66,
    0x895A: 0x74DC,
    0x895B: 0x958F,
    0x895C: 0x5642,
    0x895D: 0x4E91,
    0x895E: 0x904B,
    0x895F: 0x96F2,
    0x8960: 0x834F,
    0x8961: 0x990C,
    0x8962: 0x53E1,
    0x8963: 0x55B6,
    0x8964: 0x5B30,
    0x8965: 0x5F71,
    0x8966: 0x6620,
    0x8967: 0x66F3,
    0x8968: 0x6804,
    0x8969: 0x6C38,
    0x896A: 0x6CF3,
    0x896B: 0x6D29,
    0x896C: 0x745B,
    0x896D: 0x76C8,
    0x896E: 0x7A4E,
    0x896F: 0x9834,
    0x8970: 0x82F1,
    0x8971: 0x885B,
    0x8972: 0x8A60,
    0x8973: 0x92ED,
    0x8974: 0x6DB2,
    0x8975: 0x75AB,
    0x8976: 0x76CA,
    0x8977: 0x99C5,
    0x8978: 0x60A6,
    0x8979: 0x8B01,
    0x897A: 0x8D8A,
    0x897B: 0x95B2,
    0x897C: 0x698E,
    0x897D: 0x53AD,
    0x897E: 0x5186,
    0x8980: 0x5712,
    0x8981: 0x5830,
    0x8982: 0x5944,
    0x8983: 0x5BB4,
    0x8984: 0x5EF6,
    0x8985: 0x6028,
    0x8986: 0x63A9,
    0x8987: 0x63F4,
    0x8988: 0x6CBF,
    0x8989: 0x6F14,
    0x898A: 0x708E,
    0x898B: 0x7114,
    0x898C: 0x7159,
    0x898D: 0x71D5,
    0x898E: 0x733F,
    0x898F: 0x7E01,
    0x8990: 0x8276,
    0x8991: 0x82D1,
    0x8992: 0x8597,
    0x8993: 0x9060,
    0x8994: 0x925B,
    0x8995: 0x9D1B,
    0x8996: 0x5869,
    0x8997: 0x65BC,
    0x8998: 0x6C5A,
    0x8999: 0x7525,
    0x899A: 0x51F9,
    0x899B: 0x592E,
    0x899C: 0x5965,
    0x899D: 0x5F80,
    0x899E: 0x5FDC,
    0x899F: 0x62BC,
    0x89A0: 0x65FA,
    0x89A1: 0x6A2A,
    0x89A2: 0x6B27,
    0x89A3: 0x6BB4,
    0x89A4: 0x738B,
    0x89A5: 0x7FC1,
    0x89A6: 0x8956,
    0x89A7: 0x9D2C,
    0x89A8: 0x9D0E,
    0x89A9: 0x9EC4,
    0x89AA: 0x5CA1,
    0x89AB: 0x6C96,
    0x89AC: 0x837B,
    0x89AD: 0x5104,
    0x89AE: 0x5C4B,
    0x89AF: 0x61B6,
    0x89B0: 0x81C6,
    0x89B1: 0x6876,
    0x89B2: 0x7261,
    0x89B3: 0x4E59,
    0x89B4: 0x4FFA,
    0x89B5: 0x5378,
    0x89B6: 0x6069,
    0x89B7: 0x6E29,
    0x89B8: 0x7A4F,
    0x89B9: 0x97F3,
    0x89BA: 0x4E0B,
    0x89BB: 0x5316,
    0x89BC: 0x4EEE,
    0x89BD: 0x4F55,
    0x89BE: 0x4F3D,
    0x89BF: 0x4FA1,
    0x89C0: 0x4F73,
    0x89C1: 0x52A0,
    0x89C2: 0x53EF,
    0x89C3: 0x5609,
    0x89C4: 0x590F,
    0x89C5: 0x5AC1,
    0x89C6: 0x5BB6,
    0x89C7: 0x5BE1,
    0x89C8: 0x79D1,
    0x89C9: 0x6687,
    0x89CA: 0x679C,
    0x89CB: 0x67B6,
    0x89CC: 0x6B4C,
    0x89CD: 0x6CB3,
    0x89CE: 0x706B,
    0x89CF: 0x73C2,
    0x89D0: 0x798D,
    0x89D1: 0x79BE,
    0x89D2: 0x7A3C,
    0x89D3: 0x7B87,
    0x89D4: 0x82B1,
    0x89D5: 0x82DB,
    0x89D6: 0x8304,
    0x89D7: 0x8377,
    0x89D8: 0x83EF,
    0x89D9: 0x83D3,
    0x89DA: 0x8766,
    0x89DB: 0x8AB2,
    0x89DC: 0x5629,
    0x89DD: 0x8CA8,
    0x89DE: 0x8FE6,
    0x89DF: 0x904E,
    0x89E0: 0x971E,
    0x89E1: 0x868A,
    0x89E2: 0x4FC4,
    0x89E3: 0x5CE8,
    0x89E4: 0x6211,
    0x89E5: 0x7259,
    0x89E6: 0x753B,
    0x89E7: 0x81E5,
    0x89E8: 0x82BD,
    0x89E9: 0x86FE,
    0x89EA: 0x8CC0,
    0x89EB: 0x96C5,
    0x89EC: 0x9913,
    0x89ED: 0x99D5,
    0x89EE: 0x4ECB,
    0x89EF: 0x4F1A,
    0x89F0: 0x89E3,
    0x89F1: 0x56DE,
    0x89F2: 0x584A,
    0x89F3: 0x58CA,
    0x89F4: 0x5EFB,
    0x89F5: 0x5FEB,
    0x89F6: 0x602A,
    0x89F7: 0x6094,
    0x89F8: 0x6062,
    0x89F9: 0x61D0,
    0x89FA: 0x6212,
    0x89FB: 0x62D0,
    0x89FC: 0x6539,
    0x8A40: 0x9B41,
    0x8A41: 0x6666,
    0x8A42: 0x68B0,
    0x8A43: 0x6D77,
    0x8A44: 0x7070,
    0x8A45: 0x754C,
    0x8A46: 0x7686,
    0x8A47: 0x7D75,
    0x8A48: 0x82A5,
    0x8A49: 0x87F9,
    0x8A4A: 0x958B,
    0x8A4B: 0x968E,
    0x8A4C: 0x8C9D,
    0x8A4D: 0x51F1,
    0x8A4E: 0x52BE,
    0x8A4F: 0x5916,
    0x8A50: 0x54B3,
    0x8A51: 0x5BB3,
    0x8A52: 0x5D16,
    0x8A53: 0x6168,
    0x8A54: 0x6982,
    0x8A55: 0x6DAF,
    0x8A56: 0x788D,
    0x8A57: 0x84CB,
    0x8A58: 0x8857,
    0x8A59: 0x8A72,
    0x8A5A: 0x93A7,
    0x8A5B: 0x9AB8,
    0x8A5C: 0x6D6C,
    0x8A5D: 0x99A8,
    0x8A5E: 0x86D9,
    0x8A5F: 0x57A3,
    0x8A60: 0x67FF,
    0x8A61: 0x86CE,
    0x8A62: 0x920E,
    0x8A63: 0x5283,
    0x8A64: 0x5687,
    0x8A65: 0x5404,
    0x8A66: 0x5ED3,
    0x8A67: 0x62E1,
    0x8A68: 0x64B9,
    0x8A69: 0x683C,
    0x8A6A: 0x6838,
    0x8A6B: 0x6BBB,
    0x8A6C: 0x7372,
    0x8A6D: 0x78BA,
    0x8A6E: 0x7A6B,
    0x8A6F: 0x899A,
    0x8A70: 0x89D2,
    0x8A71: 0x8D6B,
    0x8A72: 0x8F03,
    0x8A73: 0x90ED,
    0x8A74: 0x95A3,
    0x8A75: 0x9694,
    0x8A76: 0x9769,
    0x8A77: 0x5B66,
    0x8A78: 0x5CB3,
    0x8A79: 0x697D,
    0x8A7A: 0x984D,
    0x8A7B: 0x984E,
    0x8A7C: 0x639B,
    0x8A7D: 0x7B20,
    0x8A7E: 0x6A2B,
    0x8A80: 0x6A7F,
    0x8A81: 0x68B6,
    0x8A82: 0x9C0D,
    0x8A83: 0x6F5F,
    0x8A84: 0x5272,
    0x8A85: 0x559D,
    0x8A86: 0x6070,
    0x8A87: 0x62EC,
    0x8A88: 0x6D3B,
    0x8A89: 0x6E07,
    0x8A8A: 0x6ED1,
    0x8A8B: 0x845B,
    0x8A8C: 0x8910,
    0x8A8D: 0x8F44,
    0x8A8E: 0x4E14,
    0x8A8F: 0x9C39,
    0x8A90: 0x53F6,
    0x8A91: 0x691B,
    0x8A92: 0x6A3A,
    0x8A93: 0x9784,
    0x8A94: 0x682A,
    0x8A95: 0x515C,
    0x8A96: 0x7AC3,
    0x8A97: 0x84B2,
    0x8A98: 0x91DC,
    0x8A99: 0x938C,
    0x8A9A: 0x565B,
    0x8A9B: 0x9D28,
    0x8A9C: 0x6822,
    0x8A9D: 0x8305,
    0x8A9E: 0x8431,
    0x8A9F: 0x7CA5,
    0x8AA0: 0x5208,
    0x8AA1: 0x82C5,
    0x8AA2: 0x74E6,
    0x8AA3: 0x4E7E,
    0x8AA4: 0x4F83,
    0x8AA5: 0x51A0,
    0x8AA6: 0x5BD2,
    0x8AA7: 0x520A,
    0x8AA8: 0x52D8,
    0x8AA9: 0x52E7,
    0x8AAA: 0x5DFB,
    0x8AAB: 0x559A,
    0x8AAC: 0x582A,
    0x8AAD: 0x59E6,
    0x8AAE: 0x5B8C,
    0x8AAF: 0x5B98,
    0x8AB0: 0x5BDB,
    0x8AB1: 0x5E72,
    0x8AB2: 0x5E79,
    0x8AB3: 0x60A3,
    0x8AB4: 0x611F,
    0x8AB5: 0x6163,
    0x8AB6: 0x61BE,
    0x8AB7: 0x63DB,
    0x8AB8: 0x6562,
    0x8AB9: 0x67D1,
    0x8ABA: 0x6853,
    0x8ABB: 0x68FA,
    0x8ABC: 0x6B3E,
    0x8ABD: 0x6B53,
    0x8ABE: 0x6C57,
    0x8ABF: 0x6F22,
    0x8AC0: 0x6F97,
    0x8AC1: 0x6F45,
    0x8AC2: 0x74B0,
    0x8AC3: 0x7518,
    0x8AC4: 0x76E3,
    0x8AC5: 0x770B,
    0x8AC6: 0x7AFF,
    0x8AC7: 0x7BA1,
    0x8AC8: 0x7C21,
    0x8AC9: 0x7DE9,
    0x8ACA: 0x7F36,
    0x8ACB: 0x7FF0,
    0x8ACC: 0x809D,
    0x8ACD: 0x8266,
    0x8ACE: 0x839E,
    0x8ACF: 0x89B3,
    0x8AD0: 0x8ACC,
    0x8AD1: 0x8CAB,
    0x8AD2: 0x9084,
    0x8AD3: 0x9451,
    0x8AD4: 0x9593,
    0x8AD5: 0x9591,
    0x8AD6: 0x95A2,
    0x8AD7: 0x9665,
    0x8AD8: 0x97D3,
    0x8AD9: 0x9928,
    0x8ADA: 0x8218,
    0x8ADB: 0x4E38,
    0x8ADC: 0x542B,
    0x8ADD: 0x5CB8,
    0x8ADE: 0x5DCC,
    0x8ADF: 0x73A9,
    0x8AE0: 0x764C,
    0x8AE1: 0x773C,
    0x8AE2: 0x5CA9,
    0x8AE3: 0x7FEB,
    0x8AE4: 0x8D0B,
    0x8AE5: 0x96C1,
    0x8AE6: 0x9811,
    0x8AE7: 0x9854,
    0x8AE8: 0x9858,
    0x8AE9: 0x4F01,
    0x8AEA: 0x4F0E,
    0x8AEB: 0x5371,
    0x8AEC: 0x559C,
    0x8AED: 0x5668,
    0x8AEE: 0x57FA,
    0x8AEF: 0x5947,
    0x8AF0: 0x5B09,
    0x8AF1: 0x5BC4,
    0x8AF2: 0x5C90,
    0x8AF3: 0x5E0C,
    0x8AF4: 0x5E7E,
    0x8AF5: 0x5FCC,
    0x8AF6: 0x63EE,
    0x8AF7: 0x673A,
    0x8AF8: 0x65D7,
    0x8AF9: 0x65E2,
    0x8AFA: 0x671F,
    0x8AFB: 0x68CB,
    0x8AFC: 0x68C4,
    0x8B40: 0x6A5F,
    0x8B41: 0x5E30,
    0x8B42: 0x6BC5,
    0x8B43: 0x6C17,
    0x8B44: 0x6C7D,
    0x8B45: 0x757F,
    0x8B46: 0x7948,
    0x8B47: 0x5B63,
    0x8B48: 0x7A00,
    0x8B49: 0x7D00,
    0x8B4A: 0x5FBD,
    0x8B4B: 0x898F,
    0x8B4C: 0x8A18,
    0x8B4D: 0x8CB4,
    0x8B4E: 0x8D77,
    0x8B4F: 0x8ECC,
    0x8B50: 0x8F1D,
    0x8B51: 0x98E2,
    0x8B52: 0x9A0E,
    0x8B53: 0x9B3C,
    0x8B54: 0x4E80,
    0x8B55: 0x507D,
    0x8B56: 0x5100,
    0x8B57: 0x5993,
    0x8B58: 0x5B9C,
    0x8B59: 0x622F,
    0x8B5A: 0x6280,
    0x8B5B: 0x64EC,
    0x8B5C: 0x6B3A,
    0x8B5D: 0x72A0,
    0x8B5E: 0x7591,
    0x8B5F: 0x7947,
    0x8B60: 0x7FA9,
    0x8B61: 0x87FB,
    0x8B62: 0x8ABC,
    0x8B63: 0x8B70,
    0x8B64: 0x63AC,
    0x8B65: 0x83CA,
    0x8B66: 0x97A0,
    0x8B67: 0x5409,
    0x8B68: 0x5403,
    0x8B69: 0x55AB,
    0x8B6A: 0x6854,
    0x8B6B: 0x6A58,
    0x8B6C: 0x8A70,
    0x8B6D: 0x7827,
    0x8B6E: 0x6775,
    0x8B6F: 0x9ECD,
    0x8B70: 0x5374,
    0x8B71: 0x5BA2,
    0x8B72: 0x811A,
    0x8B73: 0x8650,
    0x8B74: 0x9006,
    0x8B75: 0x4E18,
    0x8B76: 0x4E45,
    0x8B77: 0x4EC7,
    0x8B78: 0x4F11,
    0x8B79: 0x53CA,
    0x8B7A: 0x5438,
    0x8B7B: 0x5BAE,
    0x8B7C: 0x5F13,
    0x8B7D: 0x6025,
    0x8B7E: 0x6551,
    0x8B80: 0x673D,
    0x8B81: 0x6C42,
    0x8B82: 0x6C72,
    0x8B83: 0x6CE3,
    0x8B84: 0x7078,
    0x8B85: 0x7403,
    0x8B86: 0x7A76,
    0x8B87: 0x7AAE,
    0x8B88: 0x7B08,
    0x8B89: 0x7D1A,
    0x8B8A: 0x7CFE,
    0x8B8B: 0x7D66,
    0x8B8C: 0x65E7,
    0x8B8D: 0x725B,
    0x8B8E: 0x53BB,
    0x8B8F: 0x5C45,
    0x8B90: 0x5DE8,
    0x8B91: 0x62D2,
    0x8B92: 0x62E0,
    0x8B93: 0x6319,
    0x8B94: 0x6E20,
    0x8B95: 0x865A,
    0x8B96: 0x8A31,
    0x8B97: 0x8DDD,
    0x8B98: 0x92F8,
    0x8B99: 0x6F01,
    0x8B9A: 0x79A6,
    0x8B9B: 0x9B5A,
    0x8B9C: 0x4EA8,
    0x8B9D: 0x4EAB,
    0x8B9E: 0x4EAC,
    0x8B9F: 0x4F9B,
    0x8BA0: 0x4FA0,
    0x8BA1: 0x50D1,
    0x8BA2: 0x5147,
    0x8BA3: 0x7AF6,
    0x8BA4: 0x5171,
    0x8BA5: 0x51F6,
    0x8BA6: 0x5354,
    0x8BA7: 0x5321,
    0x8BA8: 0x537F,
    0x8BA9: 0x53EB,
    0x8BAA: 0x55AC,
    0x8BAB: 0x5883,
    0x8BAC: 0x5CE1,
    0x8BAD: 0x5F37,
    0x8BAE: 0x5F4A,
    0x8BAF: 0x602F,
    0x8BB0: 0x6050,
    0x8BB1: 0x606D,
    0x8BB2: 0x631F,
    0x8BB3: 0x6559,
    0x8BB4: 0x6A4B,
    0x8BB5: 0x6CC1,
    0x8BB6: 0x72C2,
    0x8BB7: 0x72ED,
    0x8BB8: 0x77EF,
    0x8BB9: 0x80F8,
    0x8BBA: 0x8105,
    0x8BBB: 0x8208,
    0x8BBC: 0x854E,
    0x8BBD: 0x90F7,
    0x8BBE: 0x93E1,
    0x8BBF: 0x97FF,
    0x8BC0: 0x9957,
    0x8BC1: 0x9A5A,
    0x8BC2: 0x4EF0,
    0x8BC3: 0x51DD,
    0x8BC4: 0x5C2D,
    0x8BC5: 0x6681,
    0x8BC6: 0x696D,
    0x8BC7: 0x5C40,
    0x8BC8: 0x66F2,
    0x8BC9: 0x6975,
    0x8BCA: 0x7389,
    0x8BCB: 0x6850,
    0x8BCC: 0x7C81,
    0x8BCD: 0x50C5,
    0x8BCE: 0x52E4,
    0x8BCF: 0x5747,
    0x8BD0: 0x5DFE,
    0x8BD1: 0x9326,
    0x8BD2: 0x65A4,
    0x8BD3: 0x6B23,
    0x8BD4: 0x6B3D,
    0x8BD5: 0x7434,
    0x8BD6: 0x7981,
    0x8BD7: 0x79BD,
    0x8BD8: 0x7B4B,
    0x8BD9: 0x7DCA,
    0x8BDA: 0x82B9,
    0x8BDB: 0x83CC,
    0x8BDC: 0x887F,
    0x8BDD: 0x895F,
    0x8BDE: 0x8B39,
    0x8BDF: 0x8FD1,
    0x8BE0: 0x91D1,
    0x8BE1: 0x541F,
    0x8BE2: 0x9280,
    0x8BE3: 0x4E5D,
    0x8BE4: 0x5036,
    0x8BE5: 0x53E5,
    0x8BE6: 0x533A,
    0x8BE7: 0x72D7,
    0x8BE8: 0x7396,
    0x8BE9: 0x77E9,
    0x8BEA: 0x82E6,
    0x8BEB: 0x8EAF,
    0x8BEC: 0x99C6,
    0x8BED: 0x99C8,
    0x8BEE: 0x99D2,
    0x8BEF: 0x5177,
    0x8BF0: 0x611A,
    0x8BF1: 0x865E,
    0x8BF2: 0x55B0,
    0x8BF3: 0x7A7A,
    0x8BF4: 0x5076,
    0x8BF5: 0x5BD3,
    0x8BF6: 0x9047,
    0x8BF7: 0x9685,
    0x8BF8: 0x4E32,
    0x8BF9: 0x6ADB,
    0x8BFA: 0x91E7,
    0x8BFB: 0x5C51,
    0x8BFC: 0x5C48,
    0x8C40: 0x6398,
    0x8C41: 0x7A9F,
    0x8C42: 0x6C93,
    0x8C43: 0x9774,
    0x8C44: 0x8F61,
    0x8C45: 0x7AAA,
    0x8C46: 0x718A,
    0x8C47: 0x9688,
    0x8C48: 0x7C82,
    0x8C49: 0x6817,
    0x8C4A: 0x7E70,
    0x8C4B: 0x6851,
    0x8C4C: 0x936C,
    0x8C4D: 0x52F2,
    0x8C4E: 0x541B,
    0x8C4F: 0x85AB,
    0x8C50: 0x8A13,
    0x8C51: 0x7FA4,
    0x8C52: 0x8ECD,
    0x8C53: 0x90E1,
    0x8C54: 0x5366,
    0x8C55: 0x8888,
    0x8C56: 0x7941,
    0x8C57: 0x4FC2,
    0x8C58: 0x50BE,
    0x8C59: 0x5211,
    0x8C5A: 0x5144,
    0x8C5B: 0x5553,
    0x8C5C: 0x572D,
    0x8C5D: 0x73EA,
    0x8C5E: 0x578B,
    0x8C5F: 0x5951,
    0x8C60: 0x5F62,
    0x8C61: 0x5F84,
    0x8C62: 0x6075,
    0x8C63: 0x6176,
    0x8C64: 0x6167,
    0x8C65: 0x61A9,
    0x8C66: 0x63B2,
    0x8C67: 0x643A,
    0x8C68: 0x656C,
    0x8C69: 0x666F,
    0x8C6A: 0x6842,
    0x8C6B: 0x6E13,
    0x8C6C: 0x7566,
    0x8C6D: 0x7A3D,
    0x8C6E: 0x7CFB,
    0x8C6F: 0x7D4C,
    0x8C70: 0x7D99,
    0x8C71: 0x7E4B,
    0x8C72: 0x7F6B,
    0x8C73: 0x830E,
    0x8C74: 0x834A,
    0x8C75: 0x86CD,
    0x8C76: 0x8A08,
    0x8C77: 0x8A63,
    0x8C78: 0x8B66,
    0x8C79: 0x8EFD,
    0x8C7A: 0x981A,
    0x8C7B: 0x9D8F,
    0x8C7C: 0x82B8,
    0x8C7D: 0x8FCE,
    0x8C7E: 0x9BE8,
    0x8C80: 0x5287,
    0x8C81: 0x621F,
    0x8C82: 0x6483,
    0x8C83: 0x6FC0,
    0x8C84: 0x9699,
    0x8C85: 0x6841,
    0x8C86: 0x5091,
    0x8C87: 0x6B20,
    0x8C88: 0x6C7A,
    0x8C89: 0x6F54,
    0x8C8A: 0x7A74,
    0x8C8B: 0x7D50,
    0x8C8C: 0x8840,
    0x8C8D: 0x8A23,
    0x8C8E: 0x6708,
    0x8C8F: 0x4EF6,
    0x8C90: 0x5039,
    0x8C91: 0x5026,
    0x8C92: 0x5065,
    0x8C93: 0x517C,
    0x8C94: 0x5238,
    0x8C95: 0x5263,
    0x8C96: 0x55A7,
    0x8C97: 0x570F,
    0x8C98: 0x5805,
    0x8C99: 0x5ACC,
    0x8C9A: 0x5EFA,
    0x8C9B: 0x61B2,
    0x8C9C: 0x61F8,
    0x8C9D: 0x62F3,
    0x8C9E: 0x6372,
    0x8C9F: 0x691C,
    0x8CA0: 0x6A29,
    0x8CA1: 0x727D,
    0x8CA2: 0x72AC,
    0x8CA3: 0x732E,
    0x8CA4: 0x7814,
    0x8CA5: 0x786F,
    0x8CA6: 0x7D79,
    0x8CA7: 0x770C,
    0x8CA8: 0x80A9,
    0x8CA9: 0x898B,
    0x8CAA: 0x8B19,
    0x8CAB: 0x8CE2,
    0x8CAC: 0x8ED2,
    0x8CAD: 0x9063,
    0x8CAE: 0x9375,
    0x8CAF: 0x967A,
    0x8CB0: 0x9855,
    0x8CB1: 0x9A13,
    0x8CB2: 0x9E78,
    0x8CB3: 0x5143,
    0x8CB4: 0x539F,
    0x8CB5: 0x53B3,
    0x8CB6: 0x5E7B,
    0x8CB7: 0x5F26,
    0x8CB8: 0x6E1B,
    0x8CB9: 0x6E90,
    0x8CBA: 0x7384,
    0x8CBB: 0x73FE,
    0x8CBC: 0x7D43,
    0x8CBD: 0x8237,
    0x8CBE: 0x8A00,
    0x8CBF: 0x8AFA,
    0x8CC0: 0x9650,
    0x8CC1: 0x4E4E,
    0x8CC2: 0x500B,
    0x8CC3: 0x53E4,
    0x8CC4: 0x547C,
    0x8CC5: 0x56FA,
    0x8CC6: 0x59D1,
    0x8CC7: 0x5B64,
    0x8CC8: 0x5DF1,
    0x8CC9: 0x5EAB,
    0x8CCA: 0x5F27,
    0x8CCB: 0x6238,
    0x8CCC: 0x6545,
    0x8CCD: 0x67AF,
    0x8CCE: 0x6E56,
    0x8CCF: 0x72D0,
    0x8CD0: 0x7CCA,
    0x8CD1: 0x88B4,
    0x8CD2: 0x80A1,
    0x8CD3: 0x80E1,
    0x8CD4: 0x83F0,
    0x8CD5: 0x864E,
    0x8CD6: 0x8A87,
    0x8CD7: 0x8DE8,
    0x8CD8: 0x9237,
    0x8CD9: 0x96C7,
    0x8CDA: 0x9867,
    0x8CDB: 0x9F13,
    0x8CDC: 0x4E94,
    0x8CDD: 0x4E92,
    0x8CDE: 0x4F0D,
    0x8CDF: 0x5348,
    0x8CE0: 0x5449,
    0x8CE1: 0x543E,
    0x8CE2: 0x5A2F,
    0x8CE3: 0x5F8C,
    0x8CE4: 0x5FA1,
    0x8CE5: 0x609F,
    0x8CE6: 0x68A7,
    0x8CE7: 0x6A8E,
    0x8CE8: 0x745A,
    0x8CE9: 0x7881,
    0x8CEA: 0x8A9E,
    0x8CEB: 0x8AA4,
    0x8CEC: 0x8B77,
    0x8CED: 0x9190,
    0x8CEE: 0x4E5E,
    0x8CEF: 0x9BC9,
    0x8CF0: 0x4EA4,
    0x8CF1: 0x4F7C,
    0x8CF2: 0x4FAF,
    0x8CF3: 0x5019,
    0x8CF4: 0x5016,
    0x8CF5: 0x5149,
    0x8CF6: 0x516C,
    0x8CF7: 0x529F,
    0x8CF8: 0x52B9,
    0x8CF9: 0x52FE,
    0x8CFA: 0x539A,
    0x8CFB: 0x53E3,
    0x8CFC: 0x5411,
    0x8D40: 0x540E,
    0x8D41: 0x5589,
    0x8D42: 0x5751,
    0x8D43: 0x57A2,
    0x8D44: 0x597D,
    0x8D45: 0x5B54,
    0x8D46: 0x5B5D,
    0x8D47: 0x5B8F,
    0x8D48: 0x5DE5,
    0x8D49: 0x5DE7,
    0x8D4A: 0x5DF7,
    0x8D4B: 0x5E78,
    0x8D4C: 0x5E83,
    0x8D4D: 0x5E9A,
    0x8D4E: 0x5EB7,
    0x8D4F: 0x5F18,
    0x8D50: 0x6052,
    0x8D51: 0x614C,
    0x8D52: 0x6297,
    0x8D53: 0x62D8,
    0x8D54: 0x63A7,
    0x8D55: 0x653B,
    0x8D56: 0x6602,
    0x8D57: 0x6643,
    0x8D58: 0x66F4,
    0x8D59: 0x676D,
    0x8D5A: 0x6821,
    0x8D5B: 0x6897,
    0x8D5C: 0x69CB,
    0x8D5D: 0x6C5F,
    0x8D5E: 0x6D2A,
    0x8D5F: 0x6D69,
    0x8D60: 0x6E2F,
    0x8D61: 0x6E9D,
    0x8D62: 0x7532,
    0x8D63: 0x7687,
    0x8D64: 0x786C,
    0x8D65: 0x7A3F,
    0x8D66: 0x7CE0,
    0x8D67: 0x7D05,
    0x8D68: 0x7D18,
    0x8D69: 0x7D5E,
    0x8D6A: 0x7DB1,
    0x8D6B: 0x8015,
    0x8D6C: 0x8003,
    0x8D6D: 0x80AF,
    0x8D6E: 0x80B1,
    0x8D6F: 0x8154,
    0x8D70: 0x818F,
    0x8D71: 0x822A,
    0x8D72: 0x8352,
    0x8D73: 0x884C,
    0x8D74: 0x8861,
    0x8D75: 0x8B1B,
    0x8D76: 0x8CA2,
    0x8D77: 0x8CFC,
    0x8D78: 0x90CA,
    0x8D79: 0x9175,
    0x8D7A: 0x9271,
    0x8D7B: 0x783F,
    0x8D7C: 0x92FC,
    0x8D7D: 0x95A4,
    0x8D7E: 0x964D,
    0x8D80: 0x9805,
    0x8D81: 0x9999,
    0x8D82: 0x9AD8,
    0x8D83: 0x9D3B,
    0x8D84: 0x525B,
    0x8D85: 0x52AB,
    0x8D86: 0x53F7,
    0x8D87: 0x5408,
    0x8D88: 0x58D5,
    0x8D89: 0x62F7,
    0x8D8A: 0x6FE0,
    0x8D8B: 0x8C6A,
    0x8D8C: 0x8F5F,
    0x8D8D: 0x9EB9,
    0x8D8E: 0x514B,
    0x8D8F: 0x523B,
    0x8D90: 0x544A,
    0x8D91: 0x56FD,
    0x8D92: 0x7A40,
    0x8D93: 0x9177,
    0x8D94: 0x9D60,
    0x8D95: 0x9ED2,
    0x8D96: 0x7344,
    0x8D97: 0x6F09,
    0x8D98: 0x8170,
    0x8D99: 0x7511,
    0x8D9A: 0x5FFD,
    0x8D9B: 0x60DA,
    0x8D9C: 0x9AA8,
    0x8D9D: 0x72DB,
    0x8D9E: 0x8FBC,
    0x8D9F: 0x6B64,
    0x8DA0: 0x9803,
    0x8DA1: 0x4ECA,
    0x8DA2: 0x56F0,
    0x8DA3: 0x5764,
    0x8DA4: 0x58BE,
    0x8DA5: 0x5A5A,
    0x8DA6: 0x6068,
    0x8DA7: 0x61C7,
    0x8DA8: 0x660F,
    0x8DA9: 0x6606,
    0x8DAA: 0x6839,
    0x8DAB: 0x68B1,
    0x8DAC: 0x6DF7,
    0x8DAD: 0x75D5,
    0x8DAE: 0x7D3A,
    0x8DAF: 0x826E,
    0x8DB0: 0x9B42,
    0x8DB1: 0x4E9B,
    0x8DB2: 0x4F50,
    0x8DB3: 0x53C9,
    0x8DB4: 0x5506,
    0x8DB5: 0x5D6F,
    0x8DB6: 0x5DE6,
    0x8DB7: 0x5DEE,
    0x8DB8: 0x67FB,
    0x8DB9: 0x6C99,
    0x8DBA: 0x7473,
    0x8DBB: 0x7802,
    0x8DBC: 0x8A50,
    0x8DBD: 0x9396,
    0x8DBE: 0x88DF,
    0x8DBF: 0x5750,
    0x8DC0: 0x5EA7,
    0x8DC1: 0x632B,
    0x8DC2: 0x50B5,
    0x8DC3: 0x50AC,
    0x8DC4: 0x518D,
    0x8DC5: 0x6700,
    0x8DC6: 0x54C9,
    0x8DC7: 0x585E,
    0x8DC8: 0x59BB,
    0x8DC9: 0x5BB0,
    0x8DCA: 0x5F69,
    0x8DCB: 0x624D,
    0x8DCC: 0x63A1,
    0x8DCD: 0x683D,
    0x8DCE: 0x6B73,
    0x8DCF: 0x6E08,
    0x8DD0: 0x707D,
    0x8DD1: 0x91C7,
    0x8DD2: 0x7280,
    0x8DD3: 0x7815,
    0x8DD4: 0x7826,
    0x8DD5: 0x796D,
    0x8DD6: 0x658E,
    0x8DD7: 0x7D30,
    0x8DD8: 0x83DC,
    0x8DD9: 0x88C1,
    0x8DDA: 0x8F09,
    0x8DDB: 0x969B,
    0x8DDC: 0x5264,
    0x8DDD: 0x5728,
    0x8DDE: 0x6750,
    0x8DDF: 0x7F6A,
    0x8DE0: 0x8CA1,
    0x8DE1: 0x51B4,
    0x8DE2: 0x5742,
    0x8DE3: 0x962A,
    0x8DE4: 0x583A,
    0x8DE5: 0x698A,
    0x8DE6: 0x80B4,
    0x8DE7: 0x54B2,
    0x8DE8: 0x5D0E,
    0x8DE9: 0x57FC,
    0x8DEA: 0x7895,
    0x8DEB: 0x9DFA,
    0x8DEC: 0x4F5C,
    0x8DED: 0x524A,
    0x8DEE: 0x548B,
    0x8DEF: 0x643E,
    0x8DF0: 0x6628,
    0x8DF1: 0x6714,
    0x8DF2: 0x67F5,
    0x8DF3: 0x7A84,
    0x8DF4: 0x7B56,
    0x8DF5: 0x7D22,
    0x8DF6: 0x932F,
    0x8DF7: 0x685C,
    0x8DF8: 0x9BAD,
    0x8DF9: 0x7B39,
    0x8DFA: 0x5319,
    0x8DFB: 0x518A,
    0x8DFC: 0x5237,
    0x8E40: 0x5BDF,
    0x8E41: 0x62F6,
    0x8E42: 0x64AE,
    0x8E43: 0x64E6,
    0x8E44: 0x672D,
    0x8E45: 0x6BBA,
    0x8E46: 0x85A9,
    0x8E47: 0x96D1,
    0x8E48: 0x7690,
    0x8E49: 0x9BD6,
    0x8E4A: 0x634C,
    0x8E4B: 0x9306,
    0x8E4C: 0x9BAB,
    0x8E4D: 0x76BF,
    0x8E4E: 0x6652,
    0x8E4F: 0x4E09,
    0x8E50: 0x5098,
    0x8E51: 0x53C2,
    0x8E52: 0x5C71,
    0x8E53: 0x60E8,
    0x8E54: 0x6492,
    0x8E55: 0x6563,
    0x8E56: 0x685F,
    0x8E57: 0x71E6,
    0x8E58: 0x73CA,
    0x8E59: 0x7523,
    0x8E5A: 0x7B97,
    0x8E5B: 0x7E82,
    0x8E5C: 0x8695,
    0x8E5D: 0x8B83,
    0x8E5E: 0x8CDB,
    0x8E5F: 0x9178,
    0x8E60: 0x9910,
    0x8E61: 0x65AC,
    0x8E62: 0x66AB,
    0x8E63: 0x6B8B,
    0x8E64: 0x4ED5,
    0x8E65: 0x4ED4,
    0x8E66: 0x4F3A,
    0x8E67: 0x4F7F,
    0x8E68: 0x523A,
    0x8E69: 0x53F8,
    0x8E6A: 0x53F2,
    0x8E6B: 0x55E3,
    0x8E6C: 0x56DB,
    0x8E6D: 0x58EB,
    0x8E6E: 0x59CB,
    0x8E6F: 0x59C9,
    0x8E70: 0x59FF,
    0x8E71: 0x5B50,
    0x8E72: 0x5C4D,
    0x8E73: 0x5E02,
    0x8E74: 0x5E2B,
    0x8E75: 0x5FD7,
    0x8E76: 0x601D,
    0x8E77: 0x6307,
    0x8E78: 0x652F,
    0x8E79: 0x5B5C,
    0x8E7A: 0x65AF,
    0x8E7B: 0x65BD,
    0x8E7C: 0x65E8,
    0x8E7D: 0x679D,
    0x8E7E: 0x6B62,
    0x8E80: 0x6B7B,
    0x8E81: 0x6C0F,
    0x8E82: 0x7345,
    0x8E83: 0x7949,
    0x8E84: 0x79C1,
    0x8E85: 0x7CF8,
    0x8E86: 0x7D19,
    0x8E87: 0x7D2B,
    0x8E88: 0x80A2,
    0x8E89: 0x8102,
    0x8E8A: 0x81F3,
    0x8E8B: 0x8996,
    0x8E8C: 0x8A5E,
    0x8E8D: 0x8A69,
    0x8E8E: 0x8A66,
    0x8E8F: 0x8A8C,
    0x8E90: 0x8AEE,
    0x8E91: 0x8CC7,
    0x8E92: 0x8CDC,
    0x8E93: 0x96CC,
    0x8E94: 0x98FC,
    0x8E95: 0x6B6F,
    0x8E96: 0x4E8B,
    0x8E97: 0x4F3C,
    0x8E98: 0x4F8D,
    0x8E99: 0x5150,
    0x8E9A: 0x5B57,
    0x8E9B: 0x5BFA,
    0x8E9C: 0x6148,
    0x8E9D: 0x6301,
    0x8E9E: 0x6642,
    0x8E9F: 0x6B21,
    0x8EA0: 0x6ECB,
    0x8EA1: 0x6CBB,
    0x8EA2: 0x723E,
    0x8EA3: 0x74BD,
    0x8EA4: 0x75D4,
    0x8EA5: 0x78C1,
    0x8EA6: 0x793A,
    0x8EA7: 0x800C,
    0x8EA8: 0x8033,
    0x8EA9: 0x81EA,
    0x8EAA: 0x8494,
    0x8EAB: 0x8F9E,
    0x8EAC: 0x6C50,
    0x8EAD: 0x9E7F,
    0x8EAE: 0x5F0F,
    0x8EAF: 0x8B58,
    0x8EB0: 0x9D2B,
    0x8EB1: 0x7AFA,
    0x8EB2: 0x8EF8,
    0x8EB3: 0x5B8D,
    0x8EB4: 0x96EB,
    0x8EB5: 0x4E03,
    0x8EB6: 0x53F1,
    0x8EB7: 0x57F7,
    0x8EB8: 0x5931,
    0x8EB9: 0x5AC9,
    0x8EBA: 0x5BA4,
    0x8EBB: 0x6089,
    0x8EBC: 0x6E7F,
    0x8EBD: 0x6F06,
    0x8EBE: 0x75BE,
    0x8EBF: 0x8CEA,
    0x8EC0: 0x5B9F,
    0x8EC1: 0x8500,
    0x8EC2: 0x7BE0,
    0x8EC3: 0x5072,
    0x8EC4: 0x67F4,
    0x8EC5: 0x829D,
    0x8EC6: 0x5C61,
    0x8EC7: 0x854A,
    0x8EC8: 0x7E1E,
    0x8EC9: 0x820E,
    0x8ECA: 0x5199,
    0x8ECB: 0x5C04,
    0x8ECC: 0x6368,
    0x8ECD: 0x8D66,
    0x8ECE: 0x659C,
    0x8ECF: 0x716E,
    0x8ED0: 0x793E,
    0x8ED1: 0x7D17,
    0x8ED2: 0x8005,
    0x8ED3: 0x8B1D,
    0x8ED4: 0x8ECA,
    0x8ED5: 0x906E,
    0x8ED6: 0x86C7,
    0x8ED7: 0x90AA,
    0x8ED8: 0x501F,
    0x8ED9: 0x52FA,
    0x8EDA: 0x5C3A,
    0x8EDB: 0x6753,
    0x8EDC: 0x707C,
    0x8EDD: 0x7235,
    0x8EDE: 0x914C,
    0x8EDF: 0x91C8,
    0x8EE0: 0x932B,
    0x8EE1: 0x82E5,
    0x8EE2: 0x5BC2,
    0x8EE3: 0x5F31,
    0x8EE4: 0x60F9,
    0x8EE5: 0x4E3B,
    0x8EE6: 0x53D6,
    0x8EE7: 0x5B88,
    0x8EE8: 0x624B,
    0x8EE9: 0x6731,
    0x8EEA: 0x6B8A,
    0x8EEB: 0x72E9,
    0x8EEC: 0x73E0,
    0x8EED: 0x7A2E,
    0x8EEE: 0x816B,
    0x8EEF: 0x8DA3,
    0x8EF0: 0x9152,
    0x8EF1: 0x9996,
    0x8EF2: 0x5112,
    0x8EF3: 0x53D7,
    0x8EF4: 0x546A,
    0x8EF5: 0x5BFF,
    0x8EF6: 0x6388,
    0x8EF7: 0x6A39,
    0x8EF8: 0x7DAC,
    0x8EF9: 0x9700,
    0x8EFA: 0x56DA,
    0x8EFB: 0x53CE,
    0x8EFC: 0x5468,
    0x8F40: 0x5B97,
    0x8F41: 0x5C31,
    0x8F42: 0x5DDE,
    0x8F43: 0x4FEE,
    0x8F44: 0x6101,
    0x8F45: 0x62FE,
    0x8F46: 0x6D32,
    0x8F47: 0x79C0,
    0x8F48: 0x79CB,
    0x8F49: 0x7D42,
    0x8F4A: 0x7E4D,
    0x8F4B: 0x7FD2,
    0x8F4C: 0x81ED,
    0x8F4D: 0x821F,
    0x8F4E: 0x8490,
    0x8F4F: 0x8846,
    0x8F50: 0x8972,
    0x8F51: 0x8B90,
    0x8F52: 0x8E74,
    0x8F53: 0x8F2F,
    0x8F54: 0x9031,
    0x8F55: 0x914B,
    0x8F56: 0x916C,
    0x8F57: 0x96C6,
    0x8F58: 0x919C,
    0x8F59: 0x4EC0,
    0x8F5A: 0x4F4F,
    0x8F5B: 0x5145,
    0x8F5C: 0x5341,
    0x8F5D: 0x5F93,
    0x8F5E: 0x620E,
    0x8F5F: 0x67D4,
    0x8F60: 0x6C41,
    0x8F61: 0x6E0B,
    0x8F62: 0x7363,
    0x8F63: 0x7E26,
    0x8F64: 0x91CD,
    0x8F65: 0x9283,
    0x8F66: 0x53D4,
    0x8F67: 0x5919,
    0x8F68: 0x5BBF,
    0x8F69: 0x6DD1,
    0x8F6A: 0x795D,
    0x8F6B: 0x7E2E,
    0x8F6C: 0x7C9B,
    0x8F6D: 0x587E,
    0x8F6E: 0x719F,
    0x8F6F: 0x51FA,
    0x8F70: 0x8853,
    0x8F71: 0x8FF0,
    0x8F72: 0x4FCA,
    0x8F73: 0x5CFB,
    0x8F74: 0x6625,
    0x8F75: 0x77AC,
    0x8F76: 0x7AE3,
    0x8F77: 0x821C,
    0x8F78: 0x99FF,
    0x8F79: 0x51C6,
    0x8F7A: 0x5FAA,
    0x8F7B: 0x65EC,
    0x8F7C: 0x696F,
    0x8F7D: 0x6B89,
    0x8F7E: 0x6DF3,
    0x8F80: 0x6E96,
    0x8F81: 0x6F64,
    0x8F82: 0x76FE,
    0x8F83: 0x7D14,
    0x8F84: 0x5DE1,
    0x8F85: 0x9075,
    0x8F86: 0x9187,
    0x8F87: 0x9806,
    0x8F88: 0x51E6,
    0x8F89: 0x521D,
    0x8F8A: 0x6240,
    0x8F8B: 0x6691,
    0x8F8C: 0x66D9,
    0x8F8D: 0x6E1A,
    0x8F8E: 0x5EB6,
    0x8F8F: 0x7DD2,
    0x8F90: 0x7F72,
    0x8F91: 0x66F8,
    0x8F92: 0x85AF,
    0x8F93: 0x85F7,
    0x8F94: 0x8AF8,
    0x8F95: 0x52A9,
    0x8F96: 0x53D9,
    0x8F97: 0x5973,
    0x8F98: 0x5E8F,
    0x8F99: 0x5F90,
    0x8F9A: 0x6055,
    0x8F9B: 0x92E4,
    0x8F9C: 0x9664,
    0x8F9D: 0x50B7,
    0x8F9E: 0x511F,
    0x8F9F: 0x52DD,
    0x8FA0: 0x5320,
    0x8FA1: 0x5347,
    0x8FA2: 0x53EC,
    0x8FA3: 0x54E8,
    0x8FA4: 0x5546,
    0x8FA5: 0x5531,
    0x8FA6: 0x5617,
    0x8FA7: 0x5968,
    0x8FA8: 0x59BE,
    0x8FA9: 0x5A3C,
    0x8FAA: 0x5BB5,
    0x8FAB: 0x5C06,
    0x8FAC: 0x5C0F,
    0x8FAD: 0x5C11,
    0x8FAE: 0x5C1A,
    0x8FAF: 0x5E84,
    0x8FB0: 0x5E8A,
    0x8FB1: 0x5EE0,
    0x8FB2: 0x5F70,
    0x8FB3: 0x627F,
    0x8FB4: 0x6284,
    0x8FB5: 0x62DB,
    0x8FB6: 0x638C,
    0x8FB7: 0x6377,
    0x8FB8: 0x6607,
    0x8FB9: 0x660C,
    0x8FBA: 0x662D,
    0x8FBB: 0x6676,
    0x8FBC: 0x677E,
    0x8FBD: 0x68A2,
    0x8FBE: 0x6A1F,
    0x8FBF: 0x6A35,
    0x8FC0: 0x6CBC,
    0x8FC1: 0x6D88,
    0x8FC2: 0x6E09,
    0x8FC3: 0x6E58,
    0x8FC4: 0x713C,
    0x8FC5: 0x7126,
    0x8FC6: 0x7167,
    0x8FC7: 0x75C7,
    0x8FC8: 0x7701,
    0x8FC9: 0x785D,
    0x8FCA: 0x7901,
    0x8FCB: 0x7965,
    0x8FCC: 0x79F0,
    0x8FCD: 0x7AE0,
    0x8FCE: 0x7B11,
    0x8FCF: 0x7CA7,
    0x8FD0: 0x7D39,
    0x8FD1: 0x8096,
    0x8FD2: 0x83D6,
    0x8FD3: 0x848B,
    0x8FD4: 0x8549,
    0x8FD5: 0x885D,
    0x8FD6: 0x88F3,
    0x8FD7: 0x8A1F,
    0x8FD8: 0x8A3C,
    0x8FD9: 0x8A54,
    0x8FDA: 0x8A73,
    0x8FDB: 0x8C61,
    0x8FDC: 0x8CDE,
    0x8FDD: 0x91A4,
    0x8FDE: 0x9266,
    0x8FDF: 0x937E,
    0x8FE0: 0x9418,
    0x8FE1: 0x969C,
    0x8FE2: 0x9798,
    0x8FE3: 0x4E0A,
    0x8FE4: 0x4E08,
    0x8FE5: 0x4E1E,
    0x8FE6: 0x4E57,
    0x8FE7: 0x5197,
    0x8FE8: 0x5270,
    0x8FE9: 0x57CE,
    0x8FEA: 0x5834,
    0x8FEB: 0x58CC,
    0x8FEC: 0x5B22,
    0x8FED: 0x5E38,
    0x8FEE: 0x60C5,
    0x8FEF: 0x64FE,
    0x8FF0: 0x6761,
    0x8FF1: 0x6756,
    0x8FF2: 0x6D44,
    0x8FF3: 0x72B6,
    0x8FF4: 0x7573,
    0x8FF5: 0x7A63,
    0x8FF6: 0x84B8,
    0x8FF7: 0x8B72,
    0x8FF8: 0x91B8,
    0x8FF9: 0x9320,
    0x8FFA: 0x5631,
    0x8FFB: 0x57F4,
    0x8FFC: 0x98FE,
    0x9040: 0x62ED,
    0x9041: 0x690D,
    0x9042: 0x6B96,
    0x9043: 0x71ED,
    0x9044: 0x7E54,
    0x9045: 0x8077,
    0x9046: 0x8272,
    0x9047: 0x89E6,
    0x9048: 0x98DF,
    0x9049: 0x8755,
    0x904A: 0x8FB1,
    0x904B: 0x5C3B,
    0x904C: 0x4F38,
    0x904D: 0x4FE1,
    0x904E: 0x4FB5,
    0x904F: 0x5507,
    0x9050: 0x5A20,
    0x9051: 0x5BDD,
    0x9052: 0x5BE9,
    0x9053: 0x5FC3,
    0x9054: 0x614E,
    0x9055: 0x632F,
    0x9056: 0x65B0,
    0x9057: 0x664B,
    0x9058: 0x68EE,
    0x9059: 0x699B,
    0x905A: 0x6D78,
    0x905B: 0x6DF1,
    0x905C: 0x7533,
    0x905D: 0x75B9,
    0x905E: 0x771F,
    0x905F: 0x795E,
    0x9060: 0x79E6,
    0x9061: 0x7D33,
    0x9062: 0x81E3,
    0x9063: 0x82AF,
    0x9064: 0x85AA,
    0x9065: 0x89AA,
    0x9066: 0x8A3A,
    0x9067: 0x8EAB,
    0x9068: 0x8F9B,
    0x9069: 0x9032,
    0x906A: 0x91DD,
    0x906B: 0x9707,
    0x906C: 0x4EBA,
    0x906D: 0x4EC1,
    0x906E: 0x5203,
    0x906F: 0x5875,
    0x9070: 0x58EC,
    0x9071: 0x5C0B,
    0x9072: 0x751A,
    0x9073: 0x5C3D,
    0x9074: 0x814E,
    0x9075: 0x8A0A,
    0x9076: 0x8FC5,
    0x9077: 0x9663,
    0x9078: 0x976D,
    0x9079: 0x7B25,
    0x907A: 0x8ACF,
    0x907B: 0x9808,
    0x907C: 0x9162,
    0x907D: 0x56F3,
    0x907E: 0x53A8,
    0x9080: 0x9017,
    0x9081: 0x5439,
    0x9082: 0x5782,
    0x9083: 0x5E25,
    0x9084: 0x63A8,
    0x9085: 0x6C34,
    0x9086: 0x708A,
    0x9087: 0x7761,
    0x9088: 0x7C8B,
    0x9089: 0x7FE0,
    0x908A: 0x8870,
    0x908B: 0x9042,
    0x908C: 0x9154,
    0x908D: 0x9310,
    0x908E: 0x9318,
    0x908F: 0x968F,
    0x9090: 0x745E,
    0x9091: 0x9AC4,
    0x9092: 0x5D07,
    0x9093: 0x5D69,
    0x9094: 0x6570,
    0x9095: 0x67A2,
    0x9096: 0x8DA8,
    0x9097: 0x96DB,
    0x9098: 0x636E,
    0x9099: 0x6749,
    0x909A: 0x6919,
    0x909B: 0x83C5,
    0x909C: 0x9817,
    0x909D: 0x96C0,
    0x909E: 0x88FE,
    0x909F: 0x6F84,
    0x90A0: 0x647A,
    0x90A1: 0x5BF8,
    0x90A2: 0x4E16,
    0x90A3: 0x702C,
    0x90A4: 0x755D,
    0x90A5: 0x662F,
    0x90A6: 0x51C4,
    0x90A7: 0x5236,
    0x90A8: 0x52E2,
    0x90A9: 0x59D3,
    0x90AA: 0x5F81,
    0x90AB: 0x6027,
    0x90AC: 0x6210,
    0x90AD: 0x653F,
    0x90AE: 0x6574,
    0x90AF: 0x661F,
    0x90B0: 0x6674,
    0x90B1: 0x68F2,
    0x90B2: 0x6816,
    0x90B3: 0x6B63,
    0x90B4: 0x6E05,
    0x90B5: 0x7272,
    0x90B6: 0x751F,
    0x90B7: 0x76DB,
    0x90B8: 0x7CBE,
    0x90B9: 0x8056,
    0x90BA: 0x58F0,
    0x90BB: 0x88FD,
    0x90BC: 0x897F,
    0x90BD: 0x8AA0,
    0x90BE: 0x8A93,
    0x90BF: 0x8ACB,
    0x90C0: 0x901D,
    0x90C1: 0x9192,
    0x90C2: 0x9752,
    0x90C3: 0x9759,
    0x90C4: 0x6589,
    0x90C5: 0x7A0E,
    0x90C6: 0x8106,
    0x90C7: 0x96BB,
    0x90C8: 0x5E2D,
    0x90C9: 0x60DC,
    0x90CA: 0x621A,
    0x90CB: 0x65A5,
    0x90CC: 0x6614,
    0x90CD: 0x6790,
    0x90CE: 0x77F3,
    0x90CF: 0x7A4D,
    0x90D0: 0x7C4D,
    0x90D1: 0x7E3E,
    0x90D2: 0x810A,
    0x90D3: 0x8CAC,
    0x90D4: 0x8D64,
    0x90D5: 0x8DE1,
    0x90D6: 0x8E5F,
    0x90D7: 0x78A9,
    0x90D8: 0x5207,
    0x90D9: 0x62D9,
    0x90DA: 0x63A5,
    0x90DB: 0x6442,
    0x90DC: 0x6298,
    0x90DD: 0x8A2D,
    0x90DE: 0x7A83,
    0x90DF: 0x7BC0,
    0x90E0: 0x8AAC,
    0x90E1: 0x96EA,
    0x90E2: 0x7D76,
    0x90E3: 0x820C,
    0x90E4: 0x8749,
    0x90E5: 0x4ED9,
    0x90E6: 0x5148,
    0x90E7: 0x5343,
    0x90E8: 0x5360,
    0x90E9: 0x5BA3,
    0x90EA: 0x5C02,
    0x90EB: 0x5C16,
    0x90EC: 0x5DDD,
    0x90ED: 0x6226,
    0x90EE: 0x6247,
    0x90EF: 0x64B0,
    0x90F0: 0x6813,
    0x90F1: 0x6834,
    0x90F2: 0x6CC9,
    0x90F3: 0x6D45,
    0x90F4: 0x6D17,
    0x90F5: 0x67D3,
    0x90F6: 0x6F5C,
    0x90F7: 0x714E,
    0x90F8: 0x717D,
    0x90F9: 0x65CB,
    0x90FA: 0x7A7F,
    0x90FB: 0x7BAD,
    0x90FC: 0x7DDA,
    0x9140: 0x7E4A,
    0x9141: 0x7FA8,
    0x9142: 0x817A,
    0x9143: 0x821B,
    0x9144: 0x8239,
    0x9145: 0x85A6,
    0x9146: 0x8A6E,
    0x9147: 0x8CCE,
    0x9148: 0x8DF5,
    0x9149: 0x9078,
    0x914A: 0x9077,
    0x914B: 0x92AD,
    0x914C: 0x9291,
    0x914D: 0x9583,
    0x914E: 0x9BAE,
    0x914F: 0x524D,
    0x9150: 0x5584,
    0x9151: 0x6F38,
    0x9152: 0x7136,
    0x9153: 0x5168,
    0x9154: 0x7985,
    0x9155: 0x7E55,
    0x9156: 0x81B3,
    0x9157: 0x7CCE,
    0x9158: 0x564C,
    0x9159: 0x5851,
    0x915A: 0x5CA8,
    0x915B: 0x63AA,
    0x915C: 0x66FE,
    0x915D: 0x66FD,
    0x915E: 0x695A,
    0x915F: 0x72D9,
    0x9160: 0x758F,
    0x9161: 0x758E,
    0x9162: 0x790E,
    0x9163: 0x7956,
    0x9164: 0x79DF,
    0x9165: 0x7C97,
    0x9166: 0x7D20,
    0x9167: 0x7D44,
    0x9168: 0x8607,
    0x9169: 0x8A34,
    0x916A: 0x963B,
    0x916B: 0x9061,
    0x916C: 0x9F20,
    0x916D: 0x50E7,
    0x916E: 0x5275,
    0x916F: 0x53CC,
    0x9170: 0x53E2,
    0x9171: 0x5009,
    0x9172: 0x55AA,
    0x9173: 0x58EE,
    0x9174: 0x594F,
    0x9175: 0x723D,
    0x9176: 0x5B8B,
    0x9177: 0x5C64,
    0x9178: 0x531D,
    0x9179: 0x60E3,
    0x917A: 0x60F3,
    0x917B: 0x635C,
    0x917C: 0x6383,
    0x917D: 0x633F,
    0x917E: 0x63BB,
    0x9180: 0x64CD,
    0x9181: 0x65E9,
    0x9182: 0x66F9,
    0x9183: 0x5DE3,
    0x9184: 0x69CD,
    0x9185: 0x69FD,
    0x9186: 0x6F15,
    0x9187: 0x71E5,
    0x9188: 0x4E89,
    0x9189: 0x75E9,
    0x918A: 0x76F8,
    0x918B: 0x7A93,
    0x918C: 0x7CDF,
    0x918D: 0x7DCF,
    0x918E: 0x7D9C,
    0x918F: 0x8061,
    0x9190: 0x8349,
    0x9191: 0x8358,
    0x9192: 0x846C,
    0x9193: 0x84BC,
    0x9194: 0x85FB,
    0x9195: 0x88C5,
    0x9196: 0x8D70,
    0x9197: 0x9001,
    0x9198: 0x906D,
    0x9199: 0x9397,
    0x919A: 0x971C,
    0x919B: 0x9A12,
    0x919C: 0x50CF,
    0x919D: 0x5897,
    0x919E: 0x618E,
    0x919F: 0x81D3,
    0x91A0: 0x8535,
    0x91A1: 0x8D08,
    0x91A2: 0x9020,
    0x91A3: 0x4FC3,
    0x91A4: 0x5074,
    0x91A5: 0x5247,
    0x91A6: 0x5373,
    0x91A7: 0x606F,
    0x91A8: 0x6349,
    0x91A9: 0x675F,
    0x91AA: 0x6E2C,
    0x91AB: 0x8DB3,
    0x91AC: 0x901F,
    0x91AD: 0x4FD7,
    0x91AE: 0x5C5E,
    0x91AF: 0x8CCA,
    0x91B0: 0x65CF,
    0x91B1: 0x7D9A,
    0x91B2: 0x5352,
    0x91B3: 0x8896,
    0x91B4: 0x5176,
    0x91B5: 0x63C3,
    0x91B6: 0x5B58,
    0x91B7: 0x5B6B,
    0x91B8: 0x5C0A,
    0x91B9: 0x640D,
    0x91BA: 0x6751,
    0x91BB: 0x905C,
    0x91BC: 0x4ED6,
    0x91BD: 0x591A,
    0x91BE: 0x592A,
    0x91BF: 0x6C70,
    0x91C0: 0x8A51,
    0x91C1: 0x553E,
    0x91C2: 0x5815,
    0x91C3: 0x59A5,
    0x91C4: 0x60F0,
    0x91C5: 0x6253,
    0x91C6: 0x67C1,
    0x91C7: 0x8235,
    0x91C8: 0x6955,
    0x91C9: 0x9640,
    0x91CA: 0x99C4,
    0x91CB: 0x9A28,
    0x91CC: 0x4F53,
    0x91CD: 0x5806,
    0x91CE: 0x5BFE,
    0x91CF: 0x8010,
    0x91D0: 0x5CB1,
    0x91D1: 0x5E2F,
    0x91D2: 0x5F85,
    0x91D3: 0x6020,
    0x91D4: 0x614B,
    0x91D5: 0x6234,
    0x91D6: 0x66FF,
    0x91D7: 0x6CF0,
    0x91D8: 0x6EDE,
    0x91D9: 0x80CE,
    0x91DA: 0x817F,
    0x91DB: 0x82D4,
    0x91DC: 0x888B,
    0x91DD: 0x8CB8,
    0x91DE: 0x9000,
    0x91DF: 0x902E,
    0x91E0: 0x968A,
    0x91E1: 0x9EDB,
    0x91E2: 0x9BDB,
    0x91E3: 0x4EE3,
    0x91E4: 0x53F0,
    0x91E5: 0x5927,
    0x91E6: 0x7B2C,
    0x91E7: 0x918D,
    0x91E8: 0x984C,
    0x91E9: 0x9DF9,
    0x91EA: 0x6EDD,
    0x91EB: 0x7027,
    0x91EC: 0x5353,
    0x91ED: 0x5544,
    0x91EE: 0x5B85,
    0x91EF: 0x6258,
    0x91F0: 0x629E,
    0x91F1: 0x62D3,
    0x91F2: 0x6CA2,
    0x91F3: 0x6FEF,
    0x91F4: 0x7422,
    0x91F5: 0x8A17,
    0x91F6: 0x9438,
    0x91F7: 0x6FC1,
    0x91F8: 0x8AFE,
    0x91F9: 0x8338,
    0x91FA: 0x51E7,
    0x91FB: 0x86F8,
    0x91FC: 0x53EA,
    0x9240: 0x53E9,
    0x9241: 0x4F46,
    0x9242: 0x9054,
    0x9243: 0x8FB0,
    0x9244: 0x596A,
    0x9245: 0x8131,
    0x9246: 0x5DFD,
    0x9247: 0x7AEA,
    0x9248: 0x8FBF,
    0x9249: 0x68DA,
    0x924A: 0x8C37,
    0x924B: 0x72F8,
    0x924C: 0x9C48,
    0x924D: 0x6A3D,
    0x924E: 0x8AB0,
    0x924F: 0x4E39,
    0x9250: 0x5358,
    0x9251: 0x5606,
    0x9252: 0x5766,
    0x9253: 0x62C5,
    0x9254: 0x63A2,
    0x9255: 0x65E6,
    0x9256: 0x6B4E,
    0x9257: 0x6DE1,
    0x9258: 0x6E5B,
    0x9259: 0x70AD,
    0x925A: 0x77ED,
    0x925B: 0x7AEF,
    0x925C: 0x7BAA,
    0x925D: 0x7DBB,
    0x925E: 0x803D,
    0x925F: 0x80C6,
    0x9260: 0x86CB,
    0x9261: 0x8A95,
    0x9262: 0x935B,
    0x9263: 0x56E3,
    0x9264: 0x58C7,
    0x9265: 0x5F3E,
    0x9266: 0x65AD,
    0x9267: 0x6696,
    0x9268: 0x6A80,
    0x9269: 0x6BB5,
    0x926A: 0x7537,
    0x926B: 0x8AC7,
    0x926C: 0x5024,
    0x926D: 0x77E5,
    0x926E: 0x5730,
    0x926F: 0x5F1B,
    0x9270: 0x6065,
    0x9271: 0x667A,
    0x9272: 0x6C60,
    0x9273: 0x75F4,
    0x9274: 0x7A1A,
    0x9275: 0x7F6E,
    0x9276: 0x81F4,
    0x9277: 0x8718,
    0x9278: 0x9045,
    0x9279: 0x99B3,
    0x927A: 0x7BC9,
    0x927B: 0x755C,
    0x927C: 0x7AF9,
    0x927D: 0x7B51,
    0x927E: 0x84C4,
    0x9280: 0x9010,
    0x9281: 0x79E9,
    0x9282: 0x7A92,
    0x9283: 0x8336,
    0x9284: 0x5AE1,
    0x9285: 0x7740,
    0x9286: 0x4E2D,
    0x9287: 0x4EF2,
    0x9288: 0x5B99,
    0x9289: 0x5FE0,
    0x928A: 0x62BD,
    0x928B: 0x663C,
    0x928C: 0x67F1,
    0x928D: 0x6CE8,
    0x928E: 0x866B,
    0x928F: 0x8877,
    0x9290: 0x8A3B,
    0x9291: 0x914E,
    0x9292: 0x92F3,
    0x9293: 0x99D0,
    0x9294: 0x6A17,
    0x9295: 0x7026,
    0x9296: 0x732A,
    0x9297: 0x82E7,
    0x9298: 0x8457,
    0x9299: 0x8CAF,
    0x929A: 0x4E01,
    0x929B: 0x5146,
    0x929C: 0x51CB,
    0x929D: 0x558B,
    0x929E: 0x5BF5,
    0x929F: 0x5E16,
    0x92A0: 0x5E33,
    0x92A1: 0x5E81,
    0x92A2: 0x5F14,
    0x92A3: 0x5F35,
    0x92A4: 0x5F6B,
    0x92A5: 0x5FB4,
    0x92A6: 0x61F2,
    0x92A7: 0x6311,
    0x92A8: 0x66A2,
    0x92A9: 0x671D,
    0x92AA: 0x6F6E,
    0x92AB: 0x7252,
    0x92AC: 0x753A,
    0x92AD: 0x773A,
    0x92AE: 0x8074,
    0x92AF: 0x8139,
    0x92B0: 0x8178,
    0x92B1: 0x8776,
    0x92B2: 0x8ABF,
    0x92B3: 0x8ADC,
    0x92B4: 0x8D85,
    0x92B5: 0x8DF3,
    0x92B6: 0x929A,
    0x92B7: 0x9577,
    0x92B8: 0x9802,
    0x92B9: 0x9CE5,
    0x92BA: 0x52C5,
    0x92BB: 0x6357,
    0x92BC: 0x76F4,
    0x92BD: 0x6715,
    0x92BE: 0x6C88,
    0x92BF: 0x73CD,
    0x92C0: 0x8CC3,
    0x92C1: 0x93AE,
    0x92C2: 0x9673,
    0x92C3: 0x6D25,
    0x92C4: 0x589C,
    0x92C5: 0x690E,
    0x92C6: 0x69CC,
    0x92C7: 0x8FFD,
    0x92C8: 0x939A,
    0x92C9: 0x75DB,
    0x92CA: 0x901A,
    0x92CB: 0x585A,
    0x92CC: 0x6802,
    0x92CD: 0x63B4,
    0x92CE: 0x69FB,
    0x92CF: 0x4F43,
    0x92D0: 0x6F2C,
    0x92D1: 0x67D8,
    0x92D2: 0x8FBB,
    0x92D3: 0x8526,
    0x92D4: 0x7DB4,
    0x92D5: 0x9354,
    0x92D6: 0x693F,
    0x92D7: 0x6F70,
    0x92D8: 0x576A,
    0x92D9: 0x58F7,
    0x92DA: 0x5B2C,
    0x92DB: 0x7D2C,
    0x92DC: 0x722A,
    0x92DD: 0x540A,
    0x92DE: 0x91E3,
    0x92DF: 0x9DB4,
    0x92E0: 0x4EAD,
    0x92E1: 0x4F4E,
    0x92E2: 0x505C,
    0x92E3: 0x5075,
    0x92E4: 0x5243,
    0x92E5: 0x8C9E,
    0x92E6: 0x5448,
    0x92E7: 0x5824,
    0x92E8: 0x5B9A,
    0x92E9: 0x5E1D,
    0x92EA: 0x5E95,
    0x92EB: 0x5EAD,
    0x92EC: 0x5EF7,
    0x92ED: 0x5F1F,
    0x92EE: 0x608C,
    0x92EF: 0x62B5,
    0x92F0: 0x633A,
    0x92F1: 0x63D0,
    0x92F2: 0x68AF,
    0x92F3: 0x6C40,
    0x92F4: 0x7887,
    0x92F5: 0x798E,
    0x92F6: 0x7A0B,
    0x92F7: 0x7DE0,
    0x92F8: 0x8247,
    0x92F9: 0x8A02,
    0x92FA: 0x8AE6,
    0x92FB: 0x8E44,
    0x92FC: 0x9013,
    0x9340: 0x90B8,
    0x9341: 0x912D,
    0x9342: 0x91D8,
    0x9343: 0x9F0E,
    0x9344: 0x6CE5,
    0x9345: 0x6458,
    0x9346: 0x64E2,
    0x9347: 0x6575,
    0x9348: 0x6EF4,
    0x9349: 0x7684,
    0x934A: 0x7B1B,
    0x934B: 0x9069,
    0x934C: 0x93D1,
    0x934D: 0x6EBA,
    0x934E: 0x54F2,
    0x934F: 0x5FB9,
    0x9350: 0x64A4,
    0x9351: 0x8F4D,
    0x9352: 0x8FED,
    0x9353: 0x9244,
    0x9354: 0x5178,
    0x9355: 0x586B,
    0x9356: 0x5929,
    0x9357: 0x5C55,
    0x9358: 0x5E97,
    0x9359: 0x6DFB,
    0x935A: 0x7E8F,
    0x935B: 0x751C,
    0x935C: 0x8CBC,
    0x935D: 0x8EE2,
    0x935E: 0x985B,
    0x935F: 0x70B9,
    0x9360: 0x4F1D,
    0x9361: 0x6BBF,
    0x9362: 0x6FB1,
    0x9363: 0x7530,
    0x9364: 0x96FB,
    0x9365: 0x514E,
    0x9366: 0x5410,
    0x9367: 0x5835,
    0x9368: 0x5857,
    0x9369: 0x59AC,
    0x936A: 0x5C60,
    0x936B: 0x5F92,
    0x936C: 0x6597,
    0x936D: 0x675C,
    0x936E: 0x6E21,
    0x936F: 0x767B,
    0x9370: 0x83DF,
    0x9371: 0x8CED,
    0x9372: 0x9014,
    0x9373: 0x90FD,
    0x9374: 0x934D,
    0x9375: 0x7825,
    0x9376: 0x783A,
    0x9377: 0x52AA,
    0x9378: 0x5EA6,
    0x9379: 0x571F,
    0x937A: 0x5974,
    0x937B: 0x6012,
    0x937C: 0x5012,
    0x937D: 0x515A,
    0x937E: 0x51AC,
    0x9380: 0x51CD,
    0x9381: 0x5200,
    0x9382: 0x5510,
    0x9383: 0x5854,
    0x9384: 0x5858,
    0x9385: 0x5957,
    0x9386: 0x5B95,
    0x9387: 0x5CF6,
    0x9388: 0x5D8B,
    0x9389: 0x60BC,
    0x938A: 0x6295,
    0x938B: 0x642D,
    0x938C: 0x6771,
    0x938D: 0x6843,
    0x938E: 0x68BC,
    0x938F: 0x68DF,
    0x9390: 0x76D7,
    0x9391: 0x6DD8,
    0x9392: 0x6E6F,
    0x9393: 0x6D9B,
    0x9394: 0x706F,
    0x9395: 0x71C8,
    0x9396: 0x5F53,
    0x9397: 0x75D8,
    0x9398: 0x7977,
    0x9399: 0x7B49,
    0x939A: 0x7B54,
    0x939B: 0x7B52,
    0x939C: 0x7CD6,
    0x939D: 0x7D71,
    0x939E: 0x5230,
    0x939F: 0x8463,
    0x93A0: 0x8569,
    0x93A1: 0x85E4,
    0x93A2: 0x8A0E,
    0x93A3: 0x8B04,
    0x93A4: 0x8C46,
    0x93A5: 0x8E0F,
    0x93A6: 0x9003,
    0x93A7: 0x900F,
    0x93A8: 0x9419,
    0x93A9: 0x9676,
    0x93AA: 0x982D,
    0x93AB: 0x9A30,
    0x93AC: 0x95D8,
    0x93AD: 0x50CD,
    0x93AE: 0x52D5,
    0x93AF: 0x540C,
    0x93B0: 0x5802,
    0x93B1: 0x5C0E,
    0x93B2: 0x61A7,
    0x93B3: 0x649E,
    0x93B4: 0x6D1E,
    0x93B5: 0x77B3,
    0x93B6: 0x7AE5,
    0x93B7: 0x80F4,
    0x93B8: 0x8404,
    0x93B9: 0x9053,
    0x93BA: 0x9285,
    0x93BB: 0x5CE0,
    0x93BC: 0x9D07,
    0x93BD: 0x533F,
    0x93BE: 0x5F97,
    0x93BF: 0x5FB3,
    0x93C0: 0x6D9C,
    0x93C1: 0x7279,
    0x93C2: 0x7763,
    0x93C3: 0x79BF,
    0x93C4: 0x7BE4,
    0x93C5: 0x6BD2,
    0x93C6: 0x72EC,
    0x93C7: 0x8AAD,
    0x93C8: 0x6803,
    0x93C9: 0x6A61,
    0x93CA: 0x51F8,
    0x93CB: 0x7A81,
    0x93CC: 0x6934,
    0x93CD: 0x5C4A,
    0x93CE: 0x9CF6,
    0x93CF: 0x82EB,
    0x93D0: 0x5BC5,
    0x93D1: 0x9149,
    0x93D2: 0x701E,
    0x93D3: 0x5678,
    0x93D4: 0x5C6F,
    0x93D5: 0x60C7,
    0x93D6: 0x6566,
    0x93D7: 0x6C8C,
    0x93D8: 0x8C5A,
    0x93D9: 0x9041,
    0x93DA: 0x9813,
    0x93DB: 0x5451,
    0x93DC: 0x66C7,
    0x93DD: 0x920D,
    0x93DE: 0x5948,
    0x93DF: 0x90A3,
    0x93E0: 0x5185,
    0x93E1: 0x4E4D,
    0x93E2: 0x51EA,
    0x93E3: 0x8599,
    0x93E4: 0x8B0E,
    0x93E5: 0x7058,
    0x93E6: 0x637A,
    0x93E7: 0x934B,
    0x93E8: 0x6962,
    0x93E9: 0x99B4,
    0x93EA: 0x7E04,
    0x93EB: 0x7577,
    0x93EC: 0x5357,
    0x93ED: 0x6960,
    0x93EE: 0x8EDF,
    0x93EF: 0x96E3,
    0x93F0: 0x6C5D,
    0x93F1: 0x4E8C,
    0x93F2: 0x5C3C,
    0x93F3: 0x5F10,
    0x93F4: 0x8FE9,
    0x93F5: 0x5302,
    0x93F6: 0x8CD1,
    0x93F7: 0x8089,
    0x93F8: 0x8679,
    0x93F9: 0x5EFF,
    0x93FA: 0x65E5,
    0x93FB: 0x4E73,
    0x93FC: 0x5165,
    0x9440: 0x5982,
    0x9441: 0x5C3F,
    0x9442: 0x97EE,
    0x9443: 0x4EFB,
    0x9444: 0x598A,
    0x9445: 0x5FCD,
    0x9446: 0x8A8D,
    0x9447: 0x6FE1,
    0x9448: 0x79B0,
    0x9449: 0x7962,
    0x944A: 0x5BE7,
    0x944B: 0x8471,
    0x944C: 0x732B,
    0x944D: 0x71B1,
    0x944E: 0x5E74,
    0x944F: 0x5FF5,
    0x9450: 0x637B,
    0x9451: 0x649A,
    0x9452: 0x71C3,
    0x9453: 0x7C98,
    0x9454: 0x4E43,
    0x9455: 0x5EFC,
    0x9456: 0x4E4B,
    0x9457: 0x57DC,
    0x9458: 0x56A2,
    0x9459: 0x60A9,
    0x945A: 0x6FC3,
    0x945B: 0x7D0D,
    0x945C: 0x80FD,
    0x945D: 0x8133,
    0x945E: 0x81BF,
    0x945F: 0x8FB2,
    0x9460: 0x8997,
    0x9461: 0x86A4,
    0x9462: 0x5DF4,
    0x9463: 0x628A,
    0x9464: 0x64AD,
    0x9465: 0x8987,
    0x9466: 0x6777,
    0x9467: 0x6CE2,
    0x9468: 0x6D3E,
    0x9469: 0x7436,
    0x946A: 0x7834,
    0x946B: 0x5A46,
    0x946C: 0x7F75,
    0x946D: 0x82AD,
    0x946E: 0x99AC,
    0x946F: 0x4FF3,
    0x9470: 0x5EC3,
    0x9471: 0x62DD,
    0x9472: 0x6392,
    0x9473: 0x6557,
    0x9474: 0x676F,
    0x9475: 0x76C3,
    0x9476: 0x724C,
    0x9477: 0x80CC,
    0x9478: 0x80BA,
    0x9479: 0x8F29,
    0x947A: 0x914D,
    0x947B: 0x500D,
    0x947C: 0x57F9,
    0x947D: 0x5A92,
    0x947E: 0x6885,
    0x9480: 0x6973,
    0x9481: 0x7164,
    0x9482: 0x72FD,
    0x9483: 0x8CB7,
    0x9484: 0x58F2,
    0x9485: 0x8CE0,
    0x9486: 0x966A,
    0x9487: 0x9019,
    0x9488: 0x877F,
    0x9489: 0x79E4,
    0x948A: 0x77E7,
    0x948B: 0x8429,
    0x948C: 0x4F2F,
    0x948D: 0x5265,
    0x948E: 0x535A,
    0x948F: 0x62CD,
    0x9490: 0x67CF,
    0x9491: 0x6CCA,
    0x9492: 0x767D,
    0x9493: 0x7B94,
    0x9494: 0x7C95,
    0x9495: 0x8236,
    0x9496: 0x8584,
    0x9497: 0x8FEB,
    0x9498: 0x66DD,
    0x9499: 0x6F20,
    0x949A: 0x7206,
    0x949B: 0x7E1B,
    0x949C: 0x83AB,
    0x949D: 0x99C1,
    0x949E: 0x9EA6,
    0x949F: 0x51FD,
    0x94A0: 0x7BB1,
    0x94A1: 0x7872,
    0x94A2: 0x7BB8,
    0x94A3: 0x8087,
    0x94A4: 0x7B48,
    0x94A5: 0x6AE8,
    0x94A6: 0x5E61,
    0x94A7: 0x808C,
    0x94A8: 0x7551,
    0x94A9: 0x7560,
    0x94AA: 0x516B,
    0x94AB: 0x9262,
    0x94AC: 0x6E8C,
    0x94AD: 0x767A,
    0x94AE: 0x9197,
    0x94AF: 0x9AEA,
    0x94B0: 0x4F10,
    0x94B1: 0x7F70,
    0x94B2: 0x629C,
    0x94B3: 0x7B4F,
    0x94B4: 0x95A5,
    0x94B5: 0x9CE9,
    0x94B6: 0x567A,
    0x94B7: 0x5859,
    0x94B8: 0x86E4,
    0x94B9: 0x96BC,
    0x94BA: 0x4F34,
    0x94BB: 0x5224,
    0x94BC: 0x534A,
    0x94BD: 0x53CD,
    0x94BE: 0x53DB,
    0x94BF: 0x5E06,
    0x94C0: 0x642C,
    0x94C1: 0x6591,
    0x94C2: 0x677F,
    0x94C3: 0x6C3E,
    0x94C4: 0x6C4E,
    0x94C5: 0x7248,
    0x94C6: 0x72AF,
    0x94C7: 0x73ED,
    0x94C8: 0x7554,
    0x94C9: 0x7E41,
    0x94CA: 0x822C,
    0x94CB: 0x85E9,
    0x94CC: 0x8CA9,
    0x94CD: 0x7BC4,
    0x94CE: 0x91C6,
    0x94CF: 0x7169,
    0x94D0: 0x9812,
    0x94D1: 0x98EF,
    0x94D2: 0x633D,
    0x94D3: 0x6669,
    0x94D4: 0x756A,
    0x94D5: 0x76E4,
    0x94D6: 0x78D0,
    0x94D7: 0x8543,
    0x94D8: 0x86EE,
    0x94D9: 0x532A,
    0x94DA: 0x5351,
    0x94DB: 0x5426,
    0x94DC: 0x5983,
    0x94DD: 0x5E87,
    0x94DE: 0x5F7C,
    0x94DF: 0x60B2,
    0x94E0: 0x6249,
    0x94E1: 0x6279,
    0x94E2: 0x62AB,
    0x94E3: 0x6590,
    0x94E4: 0x6BD4,
    0x94E5: 0x6CCC,
    0x94E6: 0x75B2,
    0x94E7: 0x76AE,
    0x94E8: 0x7891,
    0x94E9: 0x79D8,
    0x94EA: 0x7DCB,
    0x94EB: 0x7F77,
    0x94EC: 0x80A5,
    0x94ED: 0x88AB,
    0x94EE: 0x8AB9,
    0x94EF: 0x8CBB,
    0x94F0: 0x907F,
    0x94F1: 0x975E,
    0x94F2: 0x98DB,
    0x94F3: 0x6A0B,
    0x94F4: 0x7C38,
    0x94F5: 0x5099,
    0x94F6: 0x5C3E,
    0x94F7: 0x5FAE,
    0x94F8: 0x6787,
    0x94F9: 0x6BD8,
    0x94FA: 0x7435,
    0x94FB: 0x7709,
    0x94FC: 0x7F8E,
    0x9540: 0x9F3B,
    0x9541: 0x67CA,
    0x9542: 0x7A17,
    0x9543: 0x5339,
    0x9544: 0x758B,
    0x9545: 0x9AED,
    0x9546: 0x5F66,
    0x9547: 0x819D,
    0x9548: 0x83F1,
    0x9549: 0x8098,
    0x954A: 0x5F3C,
    0x954B: 0x5FC5,
    0x954C: 0x7562,
    0x954D: 0x7B46,
    0x954E: 0x903C,
    0x954F: 0x6867,
    0x9550: 0x59EB,
    0x9551: 0x5A9B,
    0x9552: 0x7D10,
    0x9553: 0x767E,
    0x9554: 0x8B2C,
    0x9555: 0x4FF5,
    0x9556: 0x5F6A,
    0x9557: 0x6A19,
    0x9558: 0x6C37,
    0x9559: 0x6F02,
    0x955A: 0x74E2,
    0x955B: 0x7968,
    0x955C: 0x8868,
    0x955D: 0x8A55,
    0x955E: 0x8C79,
    0x955F: 0x5EDF,
    0x9560: 0x63CF,
    0x9561: 0x75C5,
    0x9562: 0x79D2,
    0x9563: 0x82D7,
    0x9564: 0x9328,
    0x9565: 0x92F2,
    0x9566: 0x849C,
    0x9567: 0x86ED,
    0x9568: 0x9C2D,
    0x9569: 0x54C1,
    0x956A: 0x5F6C,
    0x956B: 0x658C,
    0x956C: 0x6D5C,
    0x956D: 0x7015,
    0x956E: 0x8CA7,
    0x956F: 0x8CD3,
    0x9570: 0x983B,
    0x9571: 0x654F,
    0x9572: 0x74F6,
    0x9573: 0x4E0D,
    0x9574: 0x4ED8,
    0x9575: 0x57E0,
    0x9576: 0x592B,
    0x9577: 0x5A66,
    0x9578: 0x5BCC,
    0x9579: 0x51A8,
    0x957A: 0x5E03,
    0x957B: 0x5E9C,
    0x957C: 0x6016,
    0x957D: 0x6276,
    0x957E: 0x6577,
    0x9580: 0x65A7,
    0x9581: 0x666E,
    0x9582: 0x6D6E,
    0x9583: 0x7236,
    0x9584: 0x7B26,
    0x9585: 0x8150,
    0x9586: 0x819A,
    0x9587: 0x8299,
    0x9588: 0x8B5C,
    0x9589: 0x8CA0,
    0x958A: 0x8CE6,
    0x958B: 0x8D74,
    0x958C: 0x961C,
    0x958D: 0x9644,
    0x958E: 0x4FAE,
    0x958F: 0x64AB,
    0x9590: 0x6B66,
    0x9591: 0x821E,
    0x9592: 0x8461,
    0x9593: 0x856A,
    0x9594: 0x90E8,
    0x9595: 0x5C01,
    0x9596: 0x6953,
    0x9597: 0x98A8,
    0x9598: 0x847A,
    0x9599: 0x8557,
    0x959A: 0x4F0F,
    0x959B: 0x526F,
    0x959C: 0x5FA9,
    0x959D: 0x5E45,
    0x959E: 0x670D,
    0x959F: 0x798F,
    0x95A0: 0x8179,
    0x95A1: 0x8907,
    0x95A2: 0x8986,
    0x95A3: 0x6DF5,
    0x95A4: 0x5F17,
    0x95A5: 0x6255,
    0x95A6: 0x6CB8,
    0x95A7: 0x4ECF,
    0x95A8: 0x7269,
    0x95A9: 0x9B92,
    0x95AA: 0x5206,
    0x95AB: 0x543B,
    0x95AC: 0x5674,
    0x95AD: 0x58B3,
    0x95AE: 0x61A4,
    0x95AF: 0x626E,
    0x95B0: 0x711A,
    0x95B1: 0x596E,
    0x95B2: 0x7C89,
    0x95B3: 0x7CDE,
    0x95B4: 0x7D1B,
    0x95B5: 0x96F0,
    0x95B6: 0x6587,
    0x95B7: 0x805E,
    0x95B8: 0x4E19,
    0x95B9: 0x4F75,
    0x95BA: 0x5175,
    0x95BB: 0x5840,
    0x95BC: 0x5E63,
    0x95BD: 0x5E73,
    0x95BE: 0x5F0A,
    0x95BF: 0x67C4,
    0x95C0: 0x4E26,
    0x95C1: 0x853D,
    0x95C2: 0x9589,
    0x95C3: 0x965B,
    0x95C4: 0x7C73,
    0x95C5: 0x9801,
    0x95C6: 0x50FB,
    0x95C7: 0x58C1,
    0x95C8: 0x7656,
    0x95C9: 0x78A7,
    0x95CA: 0x5225,
    0x95CB: 0x77A5,
    0x95CC: 0x8511,
    0x95CD: 0x7B86,
    0x95CE: 0x504F,
    0x95CF: 0x5909,
    0x95D0: 0x7247,
    0x95D1: 0x7BC7,
    0x95D2: 0x7DE8,
    0x95D3: 0x8FBA,
    0x95D4: 0x8FD4,
    0x95D5: 0x904D,
    0x95D6: 0x4FBF,
    0x95D7: 0x52C9,
    0x95D8: 0x5A29,
    0x95D9: 0x5F01,
    0x95DA: 0x97AD,
    0x95DB: 0x4FDD,
    0x95DC: 0x8217,
    0x95DD: 0x92EA,
    0x95DE: 0x5703,
    0x95DF: 0x6355,
    0x95E0: 0x6B69,
    0x95E1: 0x752B,
    0x95E2: 0x88DC,
    0x95E3: 0x8F14,
    0x95E4: 0x7A42,
    0x95E5: 0x52DF,
    0x95E6: 0x5893,
    0x95E7: 0x6155,
    0x95E8: 0x620A,
    0x95E9: 0x66AE,
    0x95EA: 0x6BCD,
    0x95EB: 0x7C3F,
    0x95EC: 0x83E9,
    0x95ED: 0x5023,
    0x95EE: 0x4FF8,
    0x95EF: 0x5305,
    0x95F0: 0x5446,
    0x95F1: 0x5831,
    0x95F2: 0x5949,
    0x95F3: 0x5B9D,
    0x95F4: 0x5CF0,
    0x95F5: 0x5CEF,
    0x95F6: 0x5D29,
    0x95F7: 0x5E96,
    0x95F8: 0x62B1,
    0x95F9: 0x6367,
    0x95FA: 0x653E,
    0x95FB: 0x65B9,
    0x95FC: 0x670B,
    0x9640: 0x6CD5,
    0x9641: 0x6CE1,
    0x9642: 0x70F9,
    0x9643: 0x7832,
    0x9644: 0x7E2B,
    0x9645: 0x80DE,
    0x9646: 0x82B3,
    0x9647: 0x840C,
    0x9648: 0x84EC,
    0x9649: 0x8702,
    0x964A: 0x8912,
    0x964B: 0x8A2A,
    0x964C: 0x8C4A,
    0x964D: 0x90A6,
    0x964E: 0x92D2,
    0x964F: 0x98FD,
    0x9650: 0x9CF3,
    0x9651: 0x9D6C,
    0x9652: 0x4E4F,
    0x9653: 0x4EA1,
    0x9654: 0x508D,
    0x9655: 0x5256,
    0x9656: 0x574A,
    0x9657: 0x59A8,
    0x9658: 0x5E3D,
    0x9659: 0x5FD8,
    0x965A: 0x5FD9,
    0x965B: 0x623F,
    0x965C: 0x66B4,
    0x965D: 0x671B,
    0x965E: 0x67D0,
    0x965F: 0x68D2,
    0x9660: 0x5192,
    0x9661: 0x7D21,
    0x9662: 0x80AA,
    0x9663: 0x81A8,
    0x9664: 0x8B00,
    0x9665: 0x8C8C,
    0x9666: 0x8CBF,
    0x9667: 0x927E,
    0x9668: 0x9632,
    0x9669: 0x5420,
    0x966A: 0x982C,
    0x966B: 0x5317,
    0x966C: 0x50D5,
    0x966D: 0x535C,
    0x966E: 0x58A8,
    0x966F: 0x64B2,
    0x9670: 0x6734,
    0x9671: 0x7267,
    0x9672: 0x7766,
    0x9673: 0x7A46,
    0x9674: 0x91E6,
    0x9675: 0x52C3,
    0x9676: 0x6CA1,
    0x9677: 0x6B86,
    0x9678: 0x5800,
    0x9679: 0x5E4C,
    0x967A: 0x5954,
    0x967B: 0x672C,
    0x967C: 0x7FFB,
    0x967D: 0x51E1,
    0x967E: 0x76C6,
    0x9680: 0x6469,
    0x9681: 0x78E8,
    0x9682: 0x9B54,
    0x9683: 0x9EBB,
    0x9684: 0x57CB,
    0x9685: 0x59B9,
    0x9686: 0x6627,
    0x9687: 0x679A,
    0x9688: 0x6BCE,
    0x9689: 0x54E9,
    0x968A: 0x69D9,
    0x968B: 0x5E55,
    0x968C: 0x819C,
    0x968D: 0x6795,
    0x968E: 0x9BAA,
    0x968F: 0x67FE,
    0x9690: 0x9C52,
    0x9691: 0x685D,
    0x9692: 0x4EA6,
    0x9693: 0x4FE3,
    0x9694: 0x53C8,
    0x9695: 0x62B9,
    0x9696: 0x672B,
    0x9697: 0x6CAB,
    0x9698: 0x8FC4,
    0x9699: 0x4FAD,
    0x969A: 0x7E6D,
    0x969B: 0x9EBF,
    0x969C: 0x4E07,
    0x969D: 0x6162,
    0x969E: 0x6E80,
    0x969F: 0x6F2B,
    0x96A0: 0x8513,
    0x96A1: 0x5473,
    0x96A2: 0x672A,
    0x96A3: 0x9B45,
    0x96A4: 0x5DF3,
    0x96A5: 0x7B95,
    0x96A6: 0x5CAC,
    0x96A7: 0x5BC6,
    0x96A8: 0x871C,
    0x96A9: 0x6E4A,
    0x96AA: 0x84D1,
    0x96AB: 0x7A14,
    0x96AC: 0x8108,
    0x96AD: 0x5999,
    0x96AE: 0x7C8D,
    0x96AF: 0x6C11,
    0x96B0: 0x7720,
    0x96B1: 0x52D9,
    0x96B2: 0x5922,
    0x96B3: 0x7121,
    0x96B4: 0x725F,
    0x96B5: 0x77DB,
    0x96B6: 0x9727,
    0x96B7: 0x9D61,
    0x96B8: 0x690B,
    0x96B9: 0x5A7F,
    0x96BA: 0x5A18,
    0x96BB: 0x51A5,
    0x96BC: 0x540D,
    0x96BD: 0x547D,
    0x96BE: 0x660E,
    0x96BF: 0x76DF,
    0x96C0: 0x8FF7,
    0x96C1: 0x9298,
    0x96C2: 0x9CF4,
    0x96C3: 0x59EA,
    0x96C4: 0x725D,
    0x96C5: 0x6EC5,
    0x96C6: 0x514D,
    0x96C7: 0x68C9,
    0x96C8: 0x7DBF,
    0x96C9: 0x7DEC,
    0x96CA: 0x9762,
    0x96CB: 0x9EBA,
    0x96CC: 0x6478,
    0x96CD: 0x6A21,
    0x96CE: 0x8302,
    0x96CF: 0x5984,
    0x96D0: 0x5B5F,
    0x96D1: 0x6BDB,
    0x96D2: 0x731B,
    0x96D3: 0x76F2,
    0x96D4: 0x7DB2,
    0x96D5: 0x8017,
    0x96D6: 0x8499,
    0x96D7: 0x5132,
    0x96D8: 0x6728,
    0x96D9: 0x9ED9,
    0x96DA: 0x76EE,
    0x96DB: 0x6762,
    0x96DC: 0x52FF,
    0x96DD: 0x9905,
    0x96DE: 0x5C24,
    0x96DF: 0x623B,
    0x96E0: 0x7C7E,
    0x96E1: 0x8CB0,
    0x96E2: 0x554F,
    0x96E3: 0x60B6,
    0x96E4: 0x7D0B,
    0x96E5: 0x9580,
    0x96E6: 0x5301,
    0x96E7: 0x4E5F,
    0x96E8: 0x51B6,
    0x96E9: 0x591C,
    0x96EA: 0x723A,
    0x96EB: 0x8036,
    0x96EC: 0x91CE,
    0x96ED: 0x5F25,
    0x96EE: 0x77E2,
    0x96EF: 0x5384,
    0x96F0: 0x5F79,
    0x96F1: 0x7D04,
    0x96F2: 0x85AC,
    0x96F3: 0x8A33,
    0x96F4: 0x8E8D,
    0x96F5: 0x9756,
    0x96F6: 0x67F3,
    0x96F7: 0x85AE,
    0x96F8: 0x9453,
    0x96F9: 0x6109,
    0x96FA: 0x6108,
    0x96FB: 0x6CB9,
    0x96FC: 0x7652,
    0x9740: 0x8AED,
    0x9741: 0x8F38,
    0x9742: 0x552F,
    0x9743: 0x4F51,
    0x9744: 0x512A,
    0x9745: 0x52C7,
    0x9746: 0x53CB,
    0x9747: 0x5BA5,
    0x9748: 0x5E7D,
    0x9749: 0x60A0,
    0x974A: 0x6182,
    0x974B: 0x63D6,
    0x974C: 0x6709,
    0x974D: 0x67DA,
    0x974E: 0x6E67,
    0x974F: 0x6D8C,
    0x9750: 0x7336,
    0x9751: 0x7337,
    0x9752: 0x7531,
    0x9753: 0x7950,
    0x9754: 0x88D5,
    0x9755: 0x8A98,
    0x9756: 0x904A,
    0x9757: 0x9091,
    0x9758: 0x90F5,
    0x9759: 0x96C4,
    0x975A: 0x878D,
    0x975B: 0x5915,
    0x975C: 0x4E88,
    0x975D: 0x4F59,
    0x975E: 0x4E0E,
    0x975F: 0x8A89,
    0x9760: 0x8F3F,
    0x9761: 0x9810,
    0x9762: 0x50AD,
    0x9763: 0x5E7C,
    0x9764: 0x5996,
    0x9765: 0x5BB9,
    0x9766: 0x5EB8,
    0x9767: 0x63DA,
    0x9768: 0x63FA,
    0x9769: 0x64C1,
    0x976A: 0x66DC,
    0x976B: 0x694A,
    0x976C: 0x69D8,
    0x976D: 0x6D0B,
    0x976E: 0x6EB6,
    0x976F: 0x7194,
    0x9770: 0x7528,
    0x9771: 0x7AAF,
    0x9772: 0x7F8A,
    0x9773: 0x8000,
    0x9774: 0x8449,
    0x9775: 0x84C9,
    0x9776: 0x8981,
    0x9777: 0x8B21,
    0x9778: 0x8E0A,
    0x9779: 0x9065,
    0x977A: 0x967D,
    0x977B: 0x990A,
    0x977C: 0x617E,
    0x977D: 0x6291,
    0x977E: 0x6B32,
    0x9780: 0x6C83,
    0x9781: 0x6D74,
    0x9782: 0x7FCC,
    0x9783: 0x7FFC,
    0x9784: 0x6DC0,
    0x9785: 0x7F85,
    0x9786: 0x87BA,
    0x9787: 0x88F8,
    0x9788: 0x6765,
    0x9789: 0x83B1,
    0x978A: 0x983C,
    0x978B: 0x96F7,
    0x978C: 0x6D1B,
    0x978D: 0x7D61,
    0x978E: 0x843D,
    0x978F: 0x916A,
    0x9790: 0x4E71,
    0x9791: 0x5375,
    0x9792: 0x5D50,
    0x9793: 0x6B04,
    0x9794: 0x6FEB,
    0x9795: 0x85CD,
    0x9796: 0x862D,
    0x9797: 0x89A7,
    0x9798: 0x5229,
    0x9799: 0x540F,
    0x979A: 0x5C65,
    0x979B: 0x674E,
    0x979C: 0x68A8,
    0x979D: 0x7406,
    0x979E: 0x7483,
    0x979F: 0x75E2,
    0x97A0: 0x88CF,
    0x97A1: 0x88E1,
    0x97A2: 0x91CC,
    0x97A3: 0x96E2,
    0x97A4: 0x9678,
    0x97A5: 0x5F8B,
    0x97A6: 0x7387,
    0x97A7: 0x7ACB,
    0x97A8: 0x844E,
    0x97A9: 0x63A0,
    0x97AA: 0x7565,
    0x97AB: 0x5289,
    0x97AC: 0x6D41,
    0x97AD: 0x6E9C,
    0x97AE: 0x7409,
    0x97AF: 0x7559,
    0x97B0: 0x786B,
    0x97B1: 0x7C92,
    0x97B2: 0x9686,
    0x97B3: 0x7ADC,
    0x97B4: 0x9F8D,
    0x97B5: 0x4FB6,
    0x97B6: 0x616E,
    0x97B7: 0x65C5,
    0x97B8: 0x865C,
    0x97B9: 0x4E86,
    0x97BA: 0x4EAE,
    0x97BB: 0x50DA,
    0x97BC: 0x4E21,
    0x97BD: 0x51CC,
    0x97BE: 0x5BEE,
    0x97BF: 0x6599,
    0x97C0: 0x6881,
    0x97C1: 0x6DBC,
    0x97C2: 0x731F,
    0x97C3: 0x7642,
    0x97C4: 0x77AD,
    0x97C5: 0x7A1C,
    0x97C6: 0x7CE7,
    0x97C7: 0x826F,
    0x97C8: 0x8AD2,
    0x97C9: 0x907C,
    0x97CA: 0x91CF,
    0x97CB: 0x9675,
    0x97CC: 0x9818,
    0x97CD: 0x529B,
    0x97CE: 0x7DD1,
    0x97CF: 0x502B,
    0x97D0: 0x5398,
    0x97D1: 0x6797,
    0x97D2: 0x6DCB,
    0x97D3: 0x71D0,
    0x97D4: 0x7433,
    0x97D5: 0x81E8,
    0x97D6: 0x8F2A,
    0x97D7: 0x96A3,
    0x97D8: 0x9C57,
    0x97D9: 0x9E9F,
    0x97DA: 0x7460,
    0x97DB: 0x5841,
    0x97DC: 0x6D99,
    0x97DD: 0x7D2F,
    0x97DE: 0x985E,
    0x97DF: 0x4EE4,
    0x97E0: 0x4F36,
    0x97E1: 0x4F8B,
    0x97E2: 0x51B7,
    0x97E3: 0x52B1,
    0x97E4: 0x5DBA,
    0x97E5: 0x601C,
    0x97E6: 0x73B2,
    0x97E7: 0x793C,
    0x97E8: 0x82D3,
    0x97E9: 0x9234,
    0x97EA: 0x96B7,
    0x97EB: 0x96F6,
    0x97EC: 0x970A,
    0x97ED: 0x9E97,
    0x97EE: 0x9F62,
    0x97EF: 0x66A6,
    0x97F0: 0x6B74,
    0x97F1: 0x5217,
    0x97F2: 0x52A3,
    0x97F3: 0x70C8,
    0x97F4: 0x88C2,
    0x97F5: 0x5EC9,
    0x97F6: 0x604B,
    0x97F7: 0x6190,
    0x97F8: 0x6F23,
    0x97F9: 0x7149,
    0x97FA: 0x7C3E,
    0x97FB: 0x7DF4,
    0x97FC: 0x806F,
    0x9840: 0x84EE,
    0x9841: 0x9023,
    0x9842: 0x932C,
    0x9843: 0x5442,
    0x9844: 0x9B6F,
    0x9845: 0x6AD3,
    0x9846: 0x7089,
    0x9847: 0x8CC2,
    0x9848: 0x8DEF,
    0x9849: 0x9732,
    0x984A: 0x52B4,
    0x984B: 0x5A41,
    0x984C: 0x5ECA,
    0x984D: 0x5F04,
    0x984E: 0x6717,
    0x984F: 0x697C,
    0x9850: 0x6994,
    0x9851: 0x6D6A,
    0x9852: 0x6F0F,
    0x9853: 0x7262,
    0x9854: 0x72FC,
    0x9855: 0x7BED,
    0x9856: 0x8001,
    0x9857: 0x807E,
    0x9858: 0x874B,
    0x9859: 0x90CE,
    0x985A: 0x516D,
    0x985B: 0x9E93,
    0x985C: 0x7984,
    0x985D: 0x808B,
    0x985E: 0x9332,
    0x985F: 0x8AD6,
    0x9860: 0x502D,
    0x9861: 0x548C,
    0x9862: 0x8A71,
    0x9863: 0x6B6A,
    0x9864: 0x8CC4,
    0x9865: 0x8107,
    0x9866: 0x60D1,
    0x9867: 0x67A0,
    0x9868: 0x9DF2,
    0x9869: 0x4E99,
    0x986A: 0x4E98,
    0x986B: 0x9C10,
    0x986C: 0x8A6B,
    0x986D: 0x85C1,
    0x986E: 0x8568,
    0x986F: 0x6900,
    0x9870: 0x6E7E,
    0x9871: 0x7897,
    0x9872: 0x8155,
    0x989F: 0x5F0C,
    0x98A0: 0x4E10,
    0x98A1: 0x4E15,
    0x98A2: 0x4E2A,
    0x98A3: 0x4E31,
    0x98A4: 0x4E36,
    0x98A5: 0x4E3C,
    0x98A6: 0x4E3F,
    0x98A7: 0x4E42,
    0x98A8: 0x4E56,
    0x98A9: 0x4E58,
    0x98AA: 0x4E82,
    0x98AB: 0x4E85,
    0x98AC: 0x8C6B,
    0x98AD: 0x4E8A,
    0x98AE: 0x8212,
    0x98AF: 0x5F0D,
    0x98B0: 0x4E8E,
    0x98B1: 0x4E9E,
    0x98B2: 0x4E9F,
    0x98B3: 0x4EA0,
    0x98B4: 0x4EA2,
    0x98B5: 0x4EB0,
    0x98B6: 0x4EB3,
    0x98B7: 0x4EB6,
    0x98B8: 0x4ECE,
    0x98B9: 0x4ECD,
    0x98BA: 0x4EC4,
    0x98BB: 0x4EC6,
    0x98BC: 0x4EC2,
    0x98BD: 0x4ED7,
    0x98BE: 0x4EDE,
    0x98BF: 0x4EED,
    0x98C0: 0x4EDF,
    0x98C1: 0x4EF7,
    0x98C2: 0x4F09,
    0x98C3: 0x4F5A,
    0x98C4: 0x4F30,
    0x98C5: 0x4F5B,
    0x98C6: 0x4F5D,
    0x98C7: 0x4F57,
    0x98C8: 0x4F47,
    0x98C9: 0x4F76,
    0x98CA: 0x4F88,
    0x98CB: 0x4F8F,
    0x98CC: 0x4F98,
    0x98CD: 0x4F7B,
    0x98CE: 0x4F69,
    0x98CF: 0x4F70,
    0x98D0: 0x4F91,
    0x98D1: 0x4F6F,
    0x98D2: 0x4F86,
    0x98D3: 0x4F96,
    0x98D4: 0x5118,
    0x98D5: 0x4FD4,
    0x98D6: 0x4FDF,
    0x98D7: 0x4FCE,
    0x98D8: 0x4FD8,
    0x98D9: 0x4FDB,
    0x98DA: 0x4FD1,
    0x98DB: 0x4FDA,
    0x98DC: 0x4FD0,
    0x98DD: 0x4FE4,
    0x98DE: 0x4FE5,
    0x98DF: 0x501A,
    0x98E0: 0x5028,
    0x98E1: 0x5014,
    0x98E2: 0x502A,
    0x98E3: 0x5025,
    0x98E4: 0x5005,
    0x98E5: 0x4F1C,
    0x98E6: 0x4FF6,
    0x98E7: 0x5021,
    0x98E8: 0x5029,
    0x98E9: 0x502C,
    0x98EA: 0x4FFE,
    0x98EB: 0x4FEF,
    0x98EC: 0x5011,
    0x98ED: 0x5006,
    0x98EE: 0x5043,
    0x98EF: 0x5047,
    0x98F0: 0x6703,
    0x98F1: 0x5055,
    0x98F2: 0x5050,
    0x98F3: 0x5048,
    0x98F4: 0x505A,
    0x98F5: 0x5056,
    0x98F6: 0x506C,
    0x98F7: 0x5078,
    0x98F8: 0x5080,
    0x98F9: 0x509A,
    0x98FA: 0x5085,
    0x98FB: 0x50B4,
    0x98FC: 0x50B2,
    0x9940: 0x50C9,
    0x9941: 0x50CA,
    0x9942: 0x50B3,
    0x9943: 0x50C2,
    0x9944: 0x50D6,
    0x9945: 0x50DE,
    0x9946: 0x50E5,
    0x9947: 0x50ED,
    0x9948: 0x50E3,
    0x9949: 0x50EE,
    0x994A: 0x50F9,
    0x994B: 0x50F5,
    0x994C: 0x5109,
    0x994D: 0x5101,
    0x994E: 0x5102,
    0x994F: 0x5116,
    0x9950: 0x5115,
    0x9951: 0x5114,
    0x9952: 0x511A,
    0x9953: 0x5121,
    0x9954: 0x513A,
    0x9955: 0x5137,
    0x9956: 0x513C,
    0x9957: 0x513B,
    0x9958: 0x513F,
    0x9959: 0x5140,
    0x995A: 0x5152,
    0x995B: 0x514C,
    0x995C: 0x5154,
    0x995D: 0x5162,
    0x995E: 0x7AF8,
    0x995F: 0x5169,
    0x9960: 0x516A,
    0x9961: 0x516E,
    0x9962: 0x5180,
    0x9963: 0x5182,
    0x9964: 0x56D8,
    0x9965: 0x518C,
    0x9966: 0x5189,
    0x9967: 0x518F,
    0x9968: 0x5191,
    0x9969: 0x5193,
    0x996A: 0x5195,
    0x996B: 0x5196,
    0x996C: 0x51A4,
    0x996D: 0x51A6,
    0x996E: 0x51A2,
    0x996F: 0x51A9,
    0x9970: 0x51AA,
    0x9971: 0x51AB,
    0x9972: 0x51B3,
    0x9973: 0x51B1,
    0x9974: 0x51B2,
    0x9975: 0x51B0,
    0x9976: 0x51B5,
    0x9977: 0x51BD,
    0x9978: 0x51C5,
    0x9979: 0x51C9,
    0x997A: 0x51DB,
    0x997B: 0x51E0,
    0x997C: 0x8655,
    0x997D: 0x51E9,
    0x997E: 0x51ED,
    0x9980: 0x51F0,
    0x9981: 0x51F5,
    0x9982: 0x51FE,
    0x9983: 0x5204,
    0x9984: 0x520B,
    0x9985: 0x5214,
    0x9986: 0x520E,
    0x9987: 0x5227,
    0x9988: 0x522A,
    0x9989: 0x522E,
    0x998A: 0x5233,
    0x998B: 0x5239,
    0x998C: 0x524F,
    0x998D: 0x5244,
    0x998E: 0x524B,
    0x998F: 0x524C,
    0x9990: 0x525E,
    0x9991: 0x5254,
    0x9992: 0x526A,
    0x9993: 0x5274,
    0x9994: 0x5269,
    0x9995: 0x5273,
    0x9996: 0x527F,
    0x9997: 0x527D,
    0x9998: 0x528D,
    0x9999: 0x5294,
    0x999A: 0x5292,
    0x999B: 0x5271,
    0x999C: 0x5288,
    0x999D: 0x5291,
    0x999E: 0x8FA8,
    0x999F: 0x8FA7,
    0x99A0: 0x52AC,
    0x99A1: 0x52AD,
    0x99A2: 0x52BC,
    0x99A3: 0x52B5,
    0x99A4: 0x52C1,
    0x99A5: 0x52CD,
    0x99A6: 0x52D7,
    0x99A7: 0x52DE,
    0x99A8: 0x52E3,
    0x99A9: 0x52E6,
    0x99AA: 0x98ED,
    0x99AB: 0x52E0,
    0x99AC: 0x52F3,
    0x99AD: 0x52F5,
    0x99AE: 0x52F8,
    0x99AF: 0x52F9,
    0x99B0: 0x5306,
    0x99B1: 0x5308,
    0x99B2: 0x7538,
    0x99B3: 0x530D,
    0x99B4: 0x5310,
    0x99B5: 0x530F,
    0x99B6: 0x5315,
    0x99B7: 0x531A,
    0x99B8: 0x5323,
    0x99B9: 0x532F,
    0x99BA: 0x5331,
    0x99BB: 0x5333,
    0x99BC: 0x5338,
    0x99BD: 0x5340,
    0x99BE: 0x5346,
    0x99BF: 0x5345,
    0x99C0: 0x4E17,
    0x99C1: 0x5349,
    0x99C2: 0x534D,
    0x99C3: 0x51D6,
    0x99C4: 0x535E,
    0x99C5: 0x5369,
    0x99C6: 0x536E,
    0x99C7: 0x5918,
    0x99C8: 0x537B,
    0x99C9: 0x5377,
    0x99CA: 0x5382,
    0x99CB: 0x5396,
    0x99CC: 0x53A0,
    0x99CD: 0x53A6,
    0x99CE: 0x53A5,
    0x99CF: 0x53AE,
    0x99D0: 0x53B0,
    0x99D1: 0x53B6,
    0x99D2: 0x53C3,
    0x99D3: 0x7C12,
    0x99D4: 0x96D9,
    0x99D5: 0x53DF,
    0x99D6: 0x66FC,
    0x99D7: 0x71EE,
    0x99D8: 0x53EE,
    0x99D9: 0x53E8,
    0x99DA: 0x53ED,
    0x99DB: 0x53FA,
    0x99DC: 0x5401,
    0x99DD: 0x543D,
    0x99DE: 0x5440,
    0x99DF: 0x542C,
    0x99E0: 0x542D,
    0x99E1: 0x543C,
    0x99E2: 0x542E,
    0x99E3: 0x5436,
    0x99E4: 0x5429,
    0x99E5: 0x541D,
    0x99E6: 0x544E,
    0x99E7: 0x548F,
    0x99E8: 0x5475,
    0x99E9: 0x548E,
    0x99EA: 0x545F,
    0x99EB: 0x5471,
    0x99EC: 0x5477,
    0x99ED: 0x5470,
    0x99EE: 0x5492,
    0x99EF: 0x547B,
    0x99F0: 0x5480,
    0x99F1: 0x5476,
    0x99F2: 0x5484,
    0x99F3: 0x5490,
    0x99F4: 0x5486,
    0x99F5: 0x54C7,
    0x99F6: 0x54A2,
    0x99F7: 0x54B8,
    0x99F8: 0x54A5,
    0x99F9: 0x54AC,
    0x99FA: 0x54C4,
    0x99FB: 0x54C8,
    0x99FC: 0x54A8,
    0x9A40: 0x54AB,
    0x9A41: 0x54C2,
    0x9A42: 0x54A4,
    0x9A43: 0x54BE,
    0x9A44: 0x54BC,
    0x9A45: 0x54D8,
    0x9A46: 0x54E5,
    0x9A47: 0x54E6,
    0x9A48: 0x550F,
    0x9A49: 0x5514,
    0x9A4A: 0x54FD,
    0x9A4B: 0x54EE,
    0x9A4C: 0x54ED,
    0x9A4D: 0x54FA,
    0x9A4E: 0x54E2,
    0x9A4F: 0x5539,
    0x9A50: 0x5540,
    0x9A51: 0x5563,
    0x9A52: 0x554C,
    0x9A53: 0x552E,
    0x9A54: 0x555C,
    0x9A55: 0x5545,
    0x9A56: 0x5556,
    0x9A57: 0x5557,
    0x9A58: 0x5538,
    0x9A59: 0x5533,
    0x9A5A: 0x555D,
    0x9A5B: 0x5599,
    0x9A5C: 0x5580,
    0x9A5D: 0x54AF,
    0x9A5E: 0x558A,
    0x9A5F: 0x559F,
    0x9A60: 0x557B,
    0x9A61: 0x557E,
    0x9A62: 0x5598,
    0x9A63: 0x559E,
    0x9A64: 0x55AE,
    0x9A65: 0x557C,
    0x9A66: 0x5583,
    0x9A67: 0x55A9,
    0x9A68: 0x5587,
    0x9A69: 0x55A8,
    0x9A6A: 0x55DA,
    0x9A6B: 0x55C5,
    0x9A6C: 0x55DF,
    0x9A6D: 0x55C4,
    0x9A6E: 0x55DC,
    0x9A6F: 0x55E4,
    0x9A70: 0x55D4,
    0x9A71: 0x5614,
    0x9A72: 0x55F7,
    0x9A73: 0x5616,
    0x9A74: 0x55FE,
    0x9A75: 0x55FD,
    0x9A76: 0x561B,
    0x9A77: 0x55F9,
    0x9A78: 0x564E,
    0x9A79: 0x5650,
    0x9A7A: 0x71DF,
    0x9A7B: 0x5634,
    0x9A7C: 0x5636,
    0x9A7D: 0x5632,
    0x9A7E: 0x5638,
    0x9A80: 0x566B,
    0x9A81: 0x5664,
    0x9A82: 0x562F,
    0x9A83: 0x566C,
    0x9A84: 0x566A,
    0x9A85: 0x5686,
    0x9A86: 0x5680,
    0x9A87: 0x568A,
    0x9A88: 0x56A0,
    0x9A89: 0x5694,
    0x9A8A: 0x568F,
    0x9A8B: 0x56A5,
    0x9A8C: 0x56AE,
    0x9A8D: 0x56B6,
    0x9A8E: 0x56B4,
    0x9A8F: 0x56C2,
    0x9A90: 0x56BC,
    0x9A91: 0x56C1,
    0x9A92: 0x56C3,
    0x9A93: 0x56C0,
    0x9A94: 0x56C8,
    0x9A95: 0x56CE,
    0x9A96: 0x56D1,
    0x9A97: 0x56D3,
    0x9A98: 0x56D7,
    0x9A99: 0x56EE,
    0x9A9A: 0x56F9,
    0x9A9B: 0x5700,
    0x9A9C: 0x56FF,
    0x9A9D: 0x5704,
    0x9A9E: 0x5709,
    0x9A9F: 0x5708,
    0x9AA0: 0x570B,
    0x9AA1: 0x570D,
    0x9AA2: 0x5713,
    0x9AA3: 0x5718,
    0x9AA4: 0x5716,
    0x9AA5: 0x55C7,
    0x9AA6: 0x571C,
    0x9AA7: 0x5726,
    0x9AA8: 0x5737,
    0x9AA9: 0x5738,
    0x9AAA: 0x574E,
    0x9AAB: 0x573B,
    0x9AAC: 0x5740,
    0x9AAD: 0x574F,
    0x9AAE: 0x5769,
    0x9AAF: 0x57C0,
    0x9AB0: 0x5788,
    0x9AB1: 0x5761,
    0x9AB2: 0x577F,
    0x9AB3: 0x5789,
    0x9AB4: 0x5793,
    0x9AB5: 0x57A0,
    0x9AB6: 0x57B3,
    0x9AB7: 0x57A4,
    0x9AB8: 0x57AA,
    0x9AB9: 0x57B0,
    0x9ABA: 0x57C3,
    0x9ABB: 0x57C6,
    0x9ABC: 0x57D4,
    0x9ABD: 0x57D2,
    0x9ABE: 0x57D3,
    0x9ABF: 0x580A,
    0x9AC0: 0x57D6,
    0x9AC1: 0x57E3,
    0x9AC2: 0x580B,
    0x9AC3: 0x5819,
    0x9AC4: 0x581D,
    0x9AC5: 0x5872,
    0x9AC6: 0x5821,
    0x9AC7: 0x5862,
    0x9AC8: 0x584B,
    0x9AC9: 0x5870,
    0x9ACA: 0x6BC0,
    0x9ACB: 0x5852,
    0x9ACC: 0x583D,
    0x9ACD: 0x5879,
    0x9ACE: 0x5885,
    0x9ACF: 0x58B9,
    0x9AD0: 0x589F,
    0x9AD1: 0x58AB,
    0x9AD2: 0x58BA,
    0x9AD3: 0x58DE,
    0x9AD4: 0x58BB,
    0x9AD5: 0x58B8,
    0x9AD6: 0x58AE,
    0x9AD7: 0x58C5,
    0x9AD8: 0x58D3,
    0x9AD9: 0x58D1,
    0x9ADA: 0x58D7,
    0x9ADB: 0x58D9,
    0x9ADC: 0x58D8,
    0x9ADD: 0x58E5,
    0x9ADE: 0x58DC,
    0x9ADF: 0x58E4,
    0x9AE0: 0x58DF,
    0x9AE1: 0x58EF,
    0x9AE2: 0x58FA,
    0x9AE3: 0x58F9,
    0x9AE4: 0x58FB,
    0x9AE5: 0x58FC,
    0x9AE6: 0x58FD,
    0x9AE7: 0x5902,
    0x9AE8: 0x590A,
    0x9AE9: 0x5910,
    0x9AEA: 0x591B,
    0x9AEB: 0x68A6,
    0x9AEC: 0x5925,
    0x9AED: 0x592C,
    0x9AEE: 0x592D,
    0x9AEF: 0x5932,
    0x9AF0: 0x5938,
    0x9AF1: 0x593E,
    0x9AF2: 0x7AD2,
    0x9AF3: 0x5955,
    0x9AF4: 0x5950,
    0x9AF5: 0x594E,
    0x9AF6: 0x595A,
    0x9AF7: 0x5958,
    0x9AF8: 0x5962,
    0x9AF9: 0x5960,
    0x9AFA: 0x5967,
    0x9AFB: 0x596C,
    0x9AFC: 0x5969,
    0x9B40: 0x5978,
    0x9B41: 0x5981,
    0x9B42: 0x599D,
    0x9B43: 0x4F5E,
    0x9B44: 0x4FAB,
    0x9B45: 0x59A3,
    0x9B46: 0x59B2,
    0x9B47: 0x59C6,
    0x9B48: 0x59E8,
    0x9B49: 0x59DC,
    0x9B4A: 0x598D,
    0x9B4B: 0x59D9,
    0x9B4C: 0x59DA,
    0x9B4D: 0x5A25,
    0x9B4E: 0x5A1F,
    0x9B4F: 0x5A11,
    0x9B50: 0x5A1C,
    0x9B51: 0x5A09,
    0x9B52: 0x5A1A,
    0x9B53: 0x5A40,
    0x9B54: 0x5A6C,
    0x9B55: 0x5A49,
    0x9B56: 0x5A35,
    0x9B57: 0x5A36,
    0x9B58: 0x5A62,
    0x9B59: 0x5A6A,
    0x9B5A: 0x5A9A,
    0x9B5B: 0x5ABC,
    0x9B5C: 0x5ABE,
    0x9B5D: 0x5ACB,
    0x9B5E: 0x5AC2,
    0x9B5F: 0x5ABD,
    0x9B60: 0x5AE3,
    0x9B61: 0x5AD7,
    0x9B62: 0x5AE6,
    0x9B63: 0x5AE9,
    0x9B64: 0x5AD6,
    0x9B65: 0x5AFA,
    0x9B66: 0x5AFB,
    0x9B67: 0x5B0C,
    0x9B68: 0x5B0B,
    0x9B69: 0x5B16,
    0x9B6A: 0x5B32,
    0x9B6B: 0x5AD0,
    0x9B6C: 0x5B2A,
    0x9B6D: 0x5B36,
    0x9B6E: 0x5B3E,
    0x9B6F: 0x5B43,
    0x9B70: 0x5B45,
    0x9B71: 0x5B40,
    0x9B72: 0x5B51,
    0x9B73: 0x5B55,
    0x9B74: 0x5B5A,
    0x9B75: 0x5B5B,
    0x9B76: 0x5B65,
    0x9B77: 0x5B69,
    0x9B78: 0x5B70,
    0x9B79: 0x5B73,
    0x9B7A: 0x5B75,
    0x9B7B: 0x5B78,
    0x9B7C: 0x6588,
    0x9B7D: 0x5B7A,
    0x9B7E: 0x5B80,
    0x9B80: 0x5B83,
    0x9B81: 0x5BA6,
    0x9B82: 0x5BB8,
    0x9B83: 0x5BC3,
    0x9B84: 0x5BC7,
    0x9B85: 0x5BC9,
    0x9B86: 0x5BD4,
    0x9B87: 0x5BD0,
    0x9B88: 0x5BE4,
    0x9B89: 0x5BE6,
    0x9B8A: 0x5BE2,
    0x9B8B: 0x5BDE,
    0x9B8C: 0x5BE5,
    0x9B8D: 0x5BEB,
    0x9B8E: 0x5BF0,
    0x9B8F: 0x5BF6,
    0x9B90: 0x5BF3,
    0x9B91: 0x5C05,
    0x9B92: 0x5C07,
    0x9B93: 0x5C08,
    0x9B94: 0x5C0D,
    0x9B95: 0x5C13,
    0x9B96: 0x5C20,
    0x9B97: 0x5C22,
    0x9B98: 0x5C28,
    0x9B99: 0x5C38,
    0x9B9A: 0x5C39,
    0x9B9B: 0x5C41,
    0x9B9C: 0x5C46,
    0x9B9D: 0x5C4E,
    0x9B9E: 0x5C53,
    0x9B9F: 0x5C50,
    0x9BA0: 0x5C4F,
    0x9BA1: 0x5B71,
    0x9BA2: 0x5C6C,
    0x9BA3: 0x5C6E,
    0x9BA4: 0x4E62,
    0x9BA5: 0x5C76,
    0x9BA6: 0x5C79,
    0x9BA7: 0x5C8C,
    0x9BA8: 0x5C91,
    0x9BA9: 0x5C94,
    0x9BAA: 0x599B,
    0x9BAB: 0x5CAB,
    0x9BAC: 0x5CBB,
    0x9BAD: 0x5CB6,
    0x9BAE: 0x5CBC,
    0x9BAF: 0x5CB7,
    0x9BB0: 0x5CC5,
    0x9BB1: 0x5CBE,
    0x9BB2: 0x5CC7,
    0x9BB3: 0x5CD9,
    0x9BB4: 0x5CE9,
    0x9BB5: 0x5CFD,
    0x9BB6: 0x5CFA,
    0x9BB7: 0x5CED,
    0x9BB8: 0x5D8C,
    0x9BB9: 0x5CEA,
    0x9BBA: 0x5D0B,
    0x9BBB: 0x5D15,
    0x9BBC: 0x5D17,
    0x9BBD: 0x5D5C,
    0x9BBE: 0x5D1F,
    0x9BBF: 0x5D1B,
    0x9BC0: 0x5D11,
    0x9BC1: 0x5D14,
    0x9BC2: 0x5D22,
    0x9BC3: 0x5D1A,
    0x9BC4: 0x5D19,
    0x9BC5: 0x5D18,
    0x9BC6: 0x5D4C,
    0x9BC7: 0x5D52,
    0x9BC8: 0x5D4E,
    0x9BC9: 0x5D4B,
    0x9BCA: 0x5D6C,
    0x9BCB: 0x5D73,
    0x9BCC: 0x5D76,
    0x9BCD: 0x5D87,
    0x9BCE: 0x5D84,
    0x9BCF: 0x5D82,
    0x9BD0: 0x5DA2,
    0x9BD1: 0x5D9D,
    0x9BD2: 0x5DAC,
    0x9BD3: 0x5DAE,
    0x9BD4: 0x5DBD,
    0x9BD5: 0x5D90,
    0x9BD6: 0x5DB7,
    0x9BD7: 0x5DBC,
    0x9BD8: 0x5DC9,
    0x9BD9: 0x5DCD,
    0x9BDA: 0x5DD3,
    0x9BDB: 0x5DD2,
    0x9BDC: 0x5DD6,
    0x9BDD: 0x5DDB,
    0x9BDE: 0x5DEB,
    0x9BDF: 0x5DF2,
    0x9BE0: 0x5DF5,
    0x9BE1: 0x5E0B,
    0x9BE2: 0x5E1A,
    0x9BE3: 0x5E19,
    0x9BE4: 0x5E11,
    0x9BE5: 0x5E1B,
    0x9BE6: 0x5E36,
    0x9BE7: 0x5E37,
    0x9BE8: 0x5E44,
    0x9BE9: 0x5E43,
    0x9BEA: 0x5E40,
    0x9BEB: 0x5E4E,
    0x9BEC: 0x5E57,
    0x9BED: 0x5E54,
    0x9BEE: 0x5E5F,
    0x9BEF: 0x5E62,
    0x9BF0: 0x5E64,
    0x9BF1: 0x5E47,
    0x9BF2: 0x5E75,
    0x9BF3: 0x5E76,
    0x9BF4: 0x5E7A,
    0x9BF5: 0x9EBC,
    0x9BF6: 0x5E7F,
    0x9BF7: 0x5EA0,
    0x9BF8: 0x5EC1,
    0x9BF9: 0x5EC2,
    0x9BFA: 0x5EC8,
    0x9BFB: 0x5ED0,
    0x9BFC: 0x5ECF,
    0x9C40: 0x5ED6,
    0x9C41: 0x5EE3,
    0x9C42: 0x5EDD,
    0x9C43: 0x5EDA,
    0x9C44: 0x5EDB,
    0x9C45: 0x5EE2,
    0x9C46: 0x5EE1,
    0x9C47: 0x5EE8,
    0x9C48: 0x5EE9,
    0x9C49: 0x5EEC,
    0x9C4A: 0x5EF1,
    0x9C4B: 0x5EF3,
    0x9C4C: 0x5EF0,
    0x9C4D: 0x5EF4,
    0x9C4E: 0x5EF8,
    0x9C4F: 0x5EFE,
    0x9C50: 0x5F03,
    0x9C51: 0x5F09,
    0x9C52: 0x5F5D,
    0x9C53: 0x5F5C,
    0x9C54: 0x5F0B,
    0x9C55: 0x5F11,
    0x9C56: 0x5F16,
    0x9C57: 0x5F29,
    0x9C58: 0x5F2D,
    0x9C59: 0x5F38,
    0x9C5A: 0x5F41,
    0x9C5B: 0x5F48,
    0x9C5C: 0x5F4C,
    0x9C5D: 0x5F4E,
    0x9C5E: 0x5F2F,
    0x9C5F: 0x5F51,
    0x9C60: 0x5F56,
    0x9C61: 0x5F57,
    0x9C62: 0x5F59,
    0x9C63: 0x5F61,
    0x9C64: 0x5F6D,
    0x9C65: 0x5F73,
    0x9C66: 0x5F77,
    0x9C67: 0x5F83,
    0x9C68: 0x5F82,
    0x9C69: 0x5F7F,
    0x9C6A: 0x5F8A,
    0x9C6B: 0x5F88,
    0x9C6C: 0x5F91,
    0x9C6D: 0x5F87,
    0x9C6E: 0x5F9E,
    0x9C6F: 0x5F99,
    0x9C70: 0x5F98,
    0x9C71: 0x5FA0,
    0x9C72: 0x5FA8,
    0x9C73: 0x5FAD,
    0x9C74: 0x5FBC,
    0x9C75: 0x5FD6,
    0x9C76: 0x5FFB,
    0x9C77: 0x5FE4,
    0x9C78: 0x5FF8,
    0x9C79: 0x5FF1,
    0x9C7A: 0x5FDD,
    0x9C7B: 0x60B3,
    0x9C7C: 0x5FFF,
    0x9C7D: 0x6021,
    0x9C7E: 0x6060,
    0x9C80: 0x6019,
    0x9C81: 0x6010,
    0x9C82: 0x6029,
    0x9C83: 0x600E,
    0x9C84: 0x6031,
    0x9C85: 0x601B,
    0x9C86: 0x6015,
    0x9C87: 0x602B,
    0x9C88: 0x6026,
    0x9C89: 0x600F,
    0x9C8A: 0x603A,
    0x9C8B: 0x605A,
    0x9C8C: 0x6041,
    0x9C8D: 0x606A,
    0x9C8E: 0x6077,
    0x9C8F: 0x605F,
    0x9C90: 0x604A,
    0x9C91: 0x6046,
    0x9C92: 0x604D,
    0x9C93: 0x6063,
    0x9C94: 0x6043,
    0x9C95: 0x6064,
    0x9C96: 0x6042,
    0x9C97: 0x606C,
    0x9C98: 0x606B,
    0x9C99: 0x6059,
    0x9C9A: 0x6081,
    0x9C9B: 0x608D,
    0x9C9C: 0x60E7,
    0x9C9D: 0x6083,
    0x9C9E: 0x609A,
    0x9C9F: 0x6084,
    0x9CA0: 0x609B,
    0x9CA1: 0x6096,
    0x9CA2: 0x6097,
    0x9CA3: 0x6092,
    0x9CA4: 0x60A7,
    0x9CA5: 0x608B,
    0x9CA6: 0x60E1,
    0x9CA7: 0x60B8,
    0x9CA8: 0x60E0,
    0x9CA9: 0x60D3,
    0x9CAA: 0x60B4,
    0x9CAB: 0x5FF0,
    0x9CAC: 0x60BD,
    0x9CAD: 0x60C6,
    0x9CAE: 0x60B5,
    0x9CAF: 0x60D8,
    0x9CB0: 0x614D,
    0x9CB1: 0x6115,
    0x9CB2: 0x6106,
    0x9CB3: 0x60F6,
    0x9CB4: 0x60F7,
    0x9CB5: 0x6100,
    0x9CB6: 0x60F4,
    0x9CB7: 0x60FA,
    0x9CB8: 0x6103,
    0x9CB9: 0x6121,
    0x9CBA: 0x60FB,
    0x9CBB: 0x60F1,
    0x9CBC: 0x610D,
    0x9CBD: 0x610E,
    0x9CBE: 0x6147,
    0x9CBF: 0x613E,
    0x9CC0: 0x6128,
    0x9CC1: 0x6127,
    0x9CC2: 0x614A,
    0x9CC3: 0x613F,
    0x9CC4: 0x613C,
    0x9CC5: 0x612C,
    0x9CC6: 0x6134,
    0x9CC7: 0x613D,
    0x9CC8: 0x6142,
    0x9CC9: 0x6144,
    0x9CCA: 0x6173,
    0x9CCB: 0x6177,
    0x9CCC: 0x6158,
    0x9CCD: 0x6159,
    0x9CCE: 0x615A,
    0x9CCF: 0x616B,
    0x9CD0: 0x6174,
    0x9CD1: 0x616F,
    0x9CD2: 0x6165,
    0x9CD3: 0x6171,
    0x9CD4: 0x615F,
    0x9CD5: 0x615D,
    0x9CD6: 0x6153,
    0x9CD7: 0x6175,
    0x9CD8: 0x6199,
    0x9CD9: 0x6196,
    0x9CDA: 0x6187,
    0x9CDB: 0x61AC,
    0x9CDC: 0x6194,
    0x9CDD: 0x619A,
    0x9CDE: 0x618A,
    0x9CDF: 0x6191,
    0x9CE0: 0x61AB,
    0x9CE1: 0x61AE,
    0x9CE2: 0x61CC,
    0x9CE3: 0x61CA,
    0x9CE4: 0x61C9,
    0x9CE5: 0x61F7,
    0x9CE6: 0x61C8,
    0x9CE7: 0x61C3,
    0x9CE8: 0x61C6,
    0x9CE9: 0x61BA,
    0x9CEA: 0x61CB,
    0x9CEB: 0x7F79,
    0x9CEC: 0x61CD,
    0x9CED: 0x61E6,
    0x9CEE: 0x61E3,
    0x9CEF: 0x61F6,
    0x9CF0: 0x61FA,
    0x9CF1: 0x61F4,
    0x9CF2: 0x61FF,
    0x9CF3: 0x61FD,
    0x9CF4: 0x61FC,
    0x9CF5: 0x61FE,
    0x9CF6: 0x6200,
    0x9CF7: 0x6208,
    0x9CF8: 0x6209,
    0x9CF9: 0x620D,
    0x9CFA: 0x620C,
    0x9CFB: 0x6214,
    0x9CFC: 0x621B,
    0x9D40: 0x621E,
    0x9D41: 0x6221,
    0x9D42: 0x622A,
    0x9D43: 0x622E,
    0x9D44: 0x6230,
    0x9D45: 0x6232,
    0x9D46: 0x6233,
    0x9D47: 0x6241,
    0x9D48: 0x624E,
    0x9D49: 0x625E,
    0x9D4A: 0x6263,
    0x9D4B: 0x625B,
    0x9D4C: 0x6260,
    0x9D4D: 0x6268,
    0x9D4E: 0x627C,
    0x9D4F: 0x6282,
    0x9D50: 0x6289,
    0x9D51: 0x627E,
    0x9D52: 0x6292,
    0x9D53: 0x6293,
    0x9D54: 0x6296,
    0x9D55: 0x62D4,
    0x9D56: 0x6283,
    0x9D57: 0x6294,
    0x9D58: 0x62D7,
    0x9D59: 0x62D1,
    0x9D5A: 0x62BB,
    0x9D5B: 0x62CF,
    0x9D5C: 0x62FF,
    0x9D5D: 0x62C6,
    0x9D5E: 0x64D4,
    0x9D5F: 0x62C8,
    0x9D60: 0x62DC,
    0x9D61: 0x62CC,
    0x9D62: 0x62CA,
    0x9D63: 0x62C2,
    0x9D64: 0x62C7,
    0x9D65: 0x629B,
    0x9D66: 0x62C9,
    0x9D67: 0x630C,
    0x9D68: 0x62EE,
    0x9D69: 0x62F1,
    0x9D6A: 0x6327,
    0x9D6B: 0x6302,
    0x9D6C: 0x6308,
    0x9D6D: 0x62EF,
    0x9D6E: 0x62F5,
    0x9D6F: 0x6350,
    0x9D70: 0x633E,
    0x9D71: 0x634D,
    0x9D72: 0x641C,
    0x9D73: 0x634F,
    0x9D74: 0x6396,
    0x9D75: 0x638E,
    0x9D76: 0x6380,
    0x9D77: 0x63AB,
    0x9D78: 0x6376,
    0x9D79: 0x63A3,
    0x9D7A: 0x638F,
    0x9D7B: 0x6389,
    0x9D7C: 0x639F,
    0x9D7D: 0x63B5,
    0x9D7E: 0x636B,
    0x9D80: 0x6369,
    0x9D81: 0x63BE,
    0x9D82: 0x63E9,
    0x9D83: 0x63C0,
    0x9D84: 0x63C6,
    0x9D85: 0x63E3,
    0x9D86: 0x63C9,
    0x9D87: 0x63D2,
    0x9D88: 0x63F6,
    0x9D89: 0x63C4,
    0x9D8A: 0x6416,
    0x9D8B: 0x6434,
    0x9D8C: 0x6406,
    0x9D8D: 0x6413,
    0x9D8E: 0x6426,
    0x9D8F: 0x6436,
    0x9D90: 0x651D,
    0x9D91: 0x6417,
    0x9D92: 0x6428,
    0x9D93: 0x640F,
    0x9D94: 0x6467,
    0x9D95: 0x646F,
    0x9D96: 0x6476,
    0x9D97: 0x644E,
    0x9D98: 0x652A,
    0x9D99: 0x6495,
    0x9D9A: 0x6493,
    0x9D9B: 0x64A5,
    0x9D9C: 0x64A9,
    0x9D9D: 0x6488,
    0x9D9E: 0x64BC,
    0x9D9F: 0x64DA,
    0x9DA0: 0x64D2,
    0x9DA1: 0x64C5,
    0x9DA2: 0x64C7,
    0x9DA3: 0x64BB,
    0x9DA4: 0x64D8,
    0x9DA5: 0x64C2,
    0x9DA6: 0x64F1,
    0x9DA7: 0x64E7,
    0x9DA8: 0x8209,
    0x9DA9: 0x64E0,
    0x9DAA: 0x64E1,
    0x9DAB: 0x62AC,
    0x9DAC: 0x64E3,
    0x9DAD: 0x64EF,
    0x9DAE: 0x652C,
    0x9DAF: 0x64F6,
    0x9DB0: 0x64F4,
    0x9DB1: 0x64F2,
    0x9DB2: 0x64FA,
    0x9DB3: 0x6500,
    0x9DB4: 0x64FD,
    0x9DB5: 0x6518,
    0x9DB6: 0x651C,
    0x9DB7: 0x6505,
    0x9DB8: 0x6524,
    0x9DB9: 0x6523,
    0x9DBA: 0x652B,
    0x9DBB: 0x6534,
    0x9DBC: 0x6535,
    0x9DBD: 0x6537,
    0x9DBE: 0x6536,
    0x9DBF: 0x6538,
    0x9DC0: 0x754B,
    0x9DC1: 0x6548,
    0x9DC2: 0x6556,
    0x9DC3: 0x6555,
    0x9DC4: 0x654D,
    0x9DC5: 0x6558,
    0x9DC6: 0x655E,
    0x9DC7: 0x655D,
    0x9DC8: 0x6572,
    0x9DC9: 0x6578,
    0x9DCA: 0x6582,
    0x9DCB: 0x6583,
    0x9DCC: 0x8B8A,
    0x9DCD: 0x659B,
    0x9DCE: 0x659F,
    0x9DCF: 0x65AB,
    0x9DD0: 0x65B7,
    0x9DD1: 0x65C3,
    0x9DD2: 0x65C6,
    0x9DD3: 0x65C1,
    0x9DD4: 0x65C4,
    0x9DD5: 0x65CC,
    0x9DD6: 0x65D2,
    0x9DD7: 0x65DB,
    0x9DD8: 0x65D9,
    0x9DD9: 0x65E0,
    0x9DDA: 0x65E1,
    0x9DDB: 0x65F1,
    0x9DDC: 0x6772,
    0x9DDD: 0x660A,
    0x9DDE: 0x6603,
    0x9DDF: 0x65FB,
    0x9DE0: 0x6773,
    0x9DE1: 0x6635,
    0x9DE2: 0x6636,
    0x9DE3: 0x6634,
    0x9DE4: 0x661C,
    0x9DE5: 0x664F,
    0x9DE6: 0x6644,
    0x9DE7: 0x6649,
    0x9DE8: 0x6641,
    0x9DE9: 0x665E,
    0x9DEA: 0x665D,
    0x9DEB: 0x6664,
    0x9DEC: 0x6667,
    0x9DED: 0x6668,
    0x9DEE: 0x665F,
    0x9DEF: 0x6662,
    0x9DF0: 0x6670,
    0x9DF1: 0x6683,
    0x9DF2: 0x6688,
    0x9DF3: 0x668E,
    0x9DF4: 0x6689,
    0x9DF5: 0x6684,
    0x9DF6: 0x6698,
    0x9DF7: 0x669D,
    0x9DF8: 0x66C1,
    0x9DF9: 0x66B9,
    0x9DFA: 0x66C9,
    0x9DFB: 0x66BE,
    0x9DFC: 0x66BC,
    0x9E40: 0x66C4,
    0x9E41: 0x66B8,
    0x9E42: 0x66D6,
    0x9E43: 0x66DA,
    0x9E44: 0x66E0,
    0x9E45: 0x663F,
    0x9E46: 0x66E6,
    0x9E47: 0x66E9,
    0x9E48: 0x66F0,
    0x9E49: 0x66F5,
    0x9E4A: 0x66F7,
    0x9E4B: 0x670F,
    0x9E4C: 0x6716,
    0x9E4D: 0x671E,
    0x9E4E: 0x6726,
    0x9E4F: 0x6727,
    0x9E50: 0x9738,
    0x9E51: 0x672E,
    0x9E52: 0x673F,
    0x9E53: 0x6736,
    0x9E54: 0x6741,
    0x9E55: 0x6738,
    0x9E56: 0x6737,
    0x9E57: 0x6746,
    0x9E58: 0x675E,
    0x9E59: 0x6760,
    0x9E5A: 0x6759,
    0x9E5B: 0x6763,
    0x9E5C: 0x6764,
    0x9E5D: 0x6789,
    0x9E5E: 0x6770,
    0x9E5F: 0x67A9,
    0x9E60: 0x677C,
    0x9E61: 0x676A,
    0x9E62: 0x678C,
    0x9E63: 0x678B,
    0x9E64: 0x67A6,
    0x9E65: 0x67A1,
    0x9E66: 0x6785,
    0x9E67: 0x67B7,
    0x9E68: 0x67EF,
    0x9E69: 0x67B4,
    0x9E6A: 0x67EC,
    0x9E6B: 0x67B3,
    0x9E6C: 0x67E9,
    0x9E6D: 0x67B8,
    0x9E6E: 0x67E4,
    0x9E6F: 0x67DE,
    0x9E70: 0x67DD,
    0x9E71: 0x67E2,
    0x9E72: 0x67EE,
    0x9E73: 0x67B9,
    0x9E74: 0x67CE,
    0x9E75: 0x67C6,
    0x9E76: 0x67E7,
    0x9E77: 0x6A9C,
    0x9E78: 0x681E,
    0x9E79: 0x6846,
    0x9E7A: 0x6829,
    0x9E7B: 0x6840,
    0x9E7C: 0x684D,
    0x9E7D: 0x6832,
    0x9E7E: 0x684E,
    0x9E80: 0x68B3,
    0x9E81: 0x682B,
    0x9E82: 0x6859,
    0x9E83: 0x6863,
    0x9E84: 0x6877,
    0x9E85: 0x687F,
    0x9E86: 0x689F,
    0x9E87: 0x688F,
    0x9E88: 0x68AD,
    0x9E89: 0x6894,
    0x9E8A: 0x689D,
    0x9E8B: 0x689B,
    0x9E8C: 0x6883,
    0x9E8D: 0x6AAE,
    0x9E8E: 0x68B9,
    0x9E8F: 0x6874,
    0x9E90: 0x68B5,
    0x9E91: 0x68A0,
    0x9E92: 0x68BA,
    0x9E93: 0x690F,
    0x9E94: 0x688D,
    0x9E95: 0x687E,
    0x9E96: 0x6901,
    0x9E97: 0x68CA,
    0x9E98: 0x6908,
    0x9E99: 0x68D8,
    0x9E9A: 0x6922,
    0x9E9B: 0x6926,
    0x9E9C: 0x68E1,
    0x9E9D: 0x690C,
    0x9E9E: 0x68CD,
    0x9E9F: 0x68D4,
    0x9EA0: 0x68E7,
    0x9EA1: 0x68D5,
    0x9EA2: 0x6936,
    0x9EA3: 0x6912,
    0x9EA4: 0x6904,
    0x9EA5: 0x68D7,
    0x9EA6: 0x68E3,
    0x9EA7: 0x6925,
    0x9EA8: 0x68F9,
    0x9EA9: 0x68E0,
    0x9EAA: 0x68EF,
    0x9EAB: 0x6928,
    0x9EAC: 0x692A,
    0x9EAD: 0x691A,
    0x9EAE: 0x6923,
    0x9EAF: 0x6921,
    0x9EB0: 0x68C6,
    0x9EB1: 0x6979,
    0x9EB2: 0x6977,
    0x9EB3: 0x695C,
    0x9EB4: 0x6978,
    0x9EB5: 0x696B,
    0x9EB6: 0x6954,
    0x9EB7: 0x697E,
    0x9EB8: 0x696E,
    0x9EB9: 0x6939,
    0x9EBA: 0x6974,
    0x9EBB: 0x693D,
    0x9EBC: 0x6959,
    0x9EBD: 0x6930,
    0x9EBE: 0x6961,
    0x9EBF: 0x695E,
    0x9EC0: 0x695D,
    0x9EC1: 0x6981,
    0x9EC2: 0x696A,
    0x9EC3: 0x69B2,
    0x9EC4: 0x69AE,
    0x9EC5: 0x69D0,
    0x9EC6: 0x69BF,
    0x9EC7: 0x69C1,
    0x9EC8: 0x69D3,
    0x9EC9: 0x69BE,
    0x9ECA: 0x69CE,
    0x9ECB: 0x5BE8,
    0x9ECC: 0x69CA,
    0x9ECD: 0x69DD,
    0x9ECE: 0x69BB,
    0x9ECF: 0x69C3,
    0x9ED0: 0x69A7,
    0x9ED1: 0x6A2E,
    0x9ED2: 0x6991,
    0x9ED3: 0x69A0,
    0x9ED4: 0x699C,
    0x9ED5: 0x6995,
    0x9ED6: 0x69B4,
    0x9ED7: 0x69DE,
    0x9ED8: 0x69E8,
    0x9ED9: 0x6A02,
    0x9EDA: 0x6A1B,
    0x9EDB: 0x69FF,
    0x9EDC: 0x6B0A,
    0x9EDD: 0x69F9,
    0x9EDE: 0x69F2,
    0x9EDF: 0x69E7,
    0x9EE0: 0x6A05,
    0x9EE1: 0x69B1,
    0x9EE2: 0x6A1E,
    0x9EE3: 0x69ED,
    0x9EE4: 0x6A14,
    0x9EE5: 0x69EB,
    0x9EE6: 0x6A0A,
    0x9EE7: 0x6A12,
    0x9EE8: 0x6AC1,
    0x9EE9: 0x6A23,
    0x9EEA: 0x6A13,
    0x9EEB: 0x6A44,
    0x9EEC: 0x6A0C,
    0x9EED: 0x6A72,
    0x9EEE: 0x6A36,
    0x9EEF: 0x6A78,
    0x9EF0: 0x6A47,
    0x9EF1: 0x6A62,
    0x9EF2: 0x6A59,
    0x9EF3: 0x6A66,
    0x9EF4: 0x6A48,
    0x9EF5: 0x6A38,
    0x9EF6: 0x6A22,
    0x9EF7: 0x6A90,
    0x9EF8: 0x6A8D,
    0x9EF9: 0x6AA0,
    0x9EFA: 0x6A84,
    0x9EFB: 0x6AA2,
    0x9EFC: 0x6AA3,
    0x9F40: 0x6A97,
    0x9F41: 0x8617,
    0x9F42: 0x6ABB,
    0x9F43: 0x6AC3,
    0x9F44: 0x6AC2,
    0x9F45: 0x6AB8,
    0x9F46: 0x6AB3,
    0x9F47: 0x6AAC,
    0x9F48: 0x6ADE,
    0x9F49: 0x6AD1,
    0x9F4A: 0x6ADF,
    0x9F4B: 0x6AAA,
    0x9F4C: 0x6ADA,
    0x9F4D: 0x6AEA,
    0x9F4E: 0x6AFB,
    0x9F4F: 0x6B05,
    0x9F50: 0x8616,
    0x9F51: 0x6AFA,
    0x9F52: 0x6B12,
    0x9F53: 0x6B16,
    0x9F54: 0x9B31,
    0x9F55: 0x6B1F,
    0x9F56: 0x6B38,
    0x9F57: 0x6B37,
    0x9F58: 0x76DC,
    0x9F59: 0x6B39,
    0x9F5A: 0x98EE,
    0x9F5B: 0x6B47,
    0x9F5C: 0x6B43,
    0x9F5D: 0x6B49,
    0x9F5E: 0x6B50,
    0x9F5F: 0x6B59,
    0x9F60: 0x6B54,
    0x9F61: 0x6B5B,
    0x9F62: 0x6B5F,
    0x9F63: 0x6B61,
    0x9F64: 0x6B78,
    0x9F65: 0x6B79,
    0x9F66: 0x6B7F,
    0x9F67: 0x6B80,
    0x9F68: 0x6B84,
    0x9F69: 0x6B83,
    0x9F6A: 0x6B8D,
    0x9F6B: 0x6B98,
    0x9F6C: 0x6B95,
    0x9F6D: 0x6B9E,
    0x9F6E: 0x6BA4,
    0x9F6F: 0x6BAA,
    0x9F70: 0x6BAB,
    0x9F71: 0x6BAF,
    0x9F72: 0x6BB2,
    0x9F73: 0x6BB1,
    0x9F74: 0x6BB3,
    0x9F75: 0x6BB7,
    0x9F76: 0x6BBC,
    0x9F77: 0x6BC6,
    0x9F78: 0x6BCB,
    0x9F79: 0x6BD3,
    0x9F7A: 0x6BDF,
    0x9F7B: 0x6BEC,
    0x9F7C: 0x6BEB,
    0x9F7D: 0x6BF3,
    0x9F7E: 0x6BEF,
    0x9F80: 0x9EBE,
    0x9F81: 0x6C08,
    0x9F82: 0x6C13,
    0x9F83: 0x6C14,
    0x9F84: 0x6C1B,
    0x9F85: 0x6C24,
    0x9F86: 0x6C23,
    0x9F87: 0x6C5E,
    0x9F88: 0x6C55,
    0x9F89: 0x6C62,
    0x9F8A: 0x6C6A,
    0x9F8B: 0x6C82,
    0x9F8C: 0x6C8D,
    0x9F8D: 0x6C9A,
    0x9F8E: 0x6C81,
    0x9F8F: 0x6C9B,
    0x9F90: 0x6C7E,
    0x9F91: 0x6C68,
    0x9F92: 0x6C73,
    0x9F93: 0x6C92,
    0x9F94: 0x6C90,
    0x9F95: 0x6CC4,
    0x9F96: 0x6CF1,
    0x9F97: 0x6CD3,
    0x9F98: 0x6CBD,
    0x9F99: 0x6CD7,
    0x9F9A: 0x6CC5,
    0x9F9B: 0x6CDD,
    0x9F9C: 0x6CAE,
    0x9F9D: 0x6CB1,
    0x9F9E: 0x6CBE,
    0x9F9F: 0x6CBA,
    0x9FA0: 0x6CDB,
    0x9FA1: 0x6CEF,
    0x9FA2: 0x6CD9,
    0x9FA3: 0x6CEA,
    0x9FA4: 0x6D1F,
    0x9FA5: 0x884D,
    0x9FA6: 0x6D36,
    0x9FA7: 0x6D2B,
    0x9FA8: 0x6D3D,
    0x9FA9: 0x6D38,
    0x9FAA: 0x6D19,
    0x9FAB: 0x6D35,
    0x9FAC: 0x6D33,
    0x9FAD: 0x6D12,
    0x9FAE: 0x6D0C,
    0x9FAF: 0x6D63,
    0x9FB0: 0x6D93,
    0x9FB1: 0x6D64,
    0x9FB2: 0x6D5A,
    0x9FB3: 0x6D79,
    0x9FB4: 0x6D59,
    0x9FB5: 0x6D8E,
    0x9FB6: 0x6D95,
    0x9FB7: 0x6FE4,
    0x9FB8: 0x6D85,
    0x9FB9: 0x6DF9,
    0x9FBA: 0x6E15,
    0x9FBB: 0x6E0A,
    0x9FBC: 0x6DB5,
    0x9FBD: 0x6DC7,
    0x9FBE: 0x6DE6,
    0x9FBF: 0x6DB8,
    0x9FC0: 0x6DC6,
    0x9FC1: 0x6DEC,
    0x9FC2: 0x6DDE,
    0x9FC3: 0x6DCC,
    0x9FC4: 0x6DE8,
    0x9FC5: 0x6DD2,
    0x9FC6: 0x6DC5,
    0x9FC7: 0x6DFA,
    0x9FC8: 0x6DD9,
    0x9FC9: 0x6DE4,
    0x9FCA: 0x6DD5,
    0x9FCB: 0x6DEA,
    0x9FCC: 0x6DEE,
    0x9FCD: 0x6E2D,
    0x9FCE: 0x6E6E,
    0x9FCF: 0x6E2E,
    0x9FD0: 0x6E19,
    0x9FD1: 0x6E72,
    0x9FD2: 0x6E5F,
    0x9FD3: 0x6E3E,
    0x9FD4: 0x6E23,
    0x9FD5: 0x6E6B,
    0x9FD6: 0x6E2B,
    0x9FD7: 0x6E76,
    0x9FD8: 0x6E4D,
    0x9FD9: 0x6E1F,
    0x9FDA: 0x6E43,
    0x9FDB: 0x6E3A,
    0x9FDC: 0x6E4E,
    0x9FDD: 0x6E24,
    0x9FDE: 0x6EFF,
    0x9FDF: 0x6E1D,
    0x9FE0: 0x6E38,
    0x9FE1: 0x6E82,
    0x9FE2: 0x6EAA,
    0x9FE3: 0x6E98,
    0x9FE4: 0x6EC9,
    0x9FE5: 0x6EB7,
    0x9FE6: 0x6ED3,
    0x9FE7: 0x6EBD,
    0x9FE8: 0x6EAF,
    0x9FE9: 0x6EC4,
    0x9FEA: 0x6EB2,
    0x9FEB: 0x6ED4,
    0x9FEC: 0x6ED5,
    0x9FED: 0x6E8F,
    0x9FEE: 0x6EA5,
    0x9FEF: 0x6EC2,
    0x9FF0: 0x6E9F,
    0x9FF1: 0x6F41,
    0x9FF2: 0x6F11,
    0x9FF3: 0x704C,
    0x9FF4: 0x6EEC,
    0x9FF5: 0x6EF8,
    0x9FF6: 0x6EFE,
    0x9FF7: 0x6F3F,
    0x9FF8: 0x6EF2,
    0x9FF9: 0x6F31,
    0x9FFA: 0x6EEF,
    0x9FFB: 0x6F32,
    0x9FFC: 0x6ECC,
    0xA1: 0xFF61,
    0xA2: 0xFF62,
    0xA3: 0xFF63,
    0xA4: 0xFF64,
    0xA5: 0xFF65,
    0xA6: 0xFF66,
    0xA7: 0xFF67,
    0xA8: 0xFF68,
    0xA9: 0xFF69,
    0xAA: 0xFF6A,
    0xAB: 0xFF6B,
    0xAC: 0xFF6C,
    0xAD: 0xFF6D,
    0xAE: 0xFF6E,
    0xAF: 0xFF6F,
    0xB0: 0xFF70,
    0xB1: 0xFF71,
    0xB2: 0xFF72,
    0xB3: 0xFF73,
    0xB4: 0xFF74,
    0xB5: 0xFF75,
    0xB6: 0xFF76,
    0xB7: 0xFF77,
    0xB8: 0xFF78,
    0xB9: 0xFF79,
    0xBA: 0xFF7A,
    0xBB: 0xFF7B,
    0xBC: 0xFF7C,
    0xBD: 0xFF7D,
    0xBE: 0xFF7E,
    0xBF: 0xFF7F,
    0xC0: 0xFF80,
    0xC1: 0xFF81,
    0xC2: 0xFF82,
    0xC3: 0xFF83,
    0xC4: 0xFF84,
    0xC5: 0xFF85,
    0xC6: 0xFF86,
    0xC7: 0xFF87,
    0xC8: 0xFF88,
    0xC9: 0xFF89,
    0xCA: 0xFF8A,
    0xCB: 0xFF8B,
    0xCC: 0xFF8C,
    0xCD: 0xFF8D,
    0xCE: 0xFF8E,
    0xCF: 0xFF8F,
    0xD0: 0xFF90,
    0xD1: 0xFF91,
    0xD2: 0xFF92,
    0xD3: 0xFF93,
    0xD4: 0xFF94,
    0xD5: 0xFF95,
    0xD6: 0xFF96,
    0xD7: 0xFF97,
    0xD8: 0xFF98,
    0xD9: 0xFF99,
    0xDA: 0xFF9A,
    0xDB: 0xFF9B,
    0xDC: 0xFF9C,
    0xDD: 0xFF9D,
    0xDE: 0xFF9E,
    0xDF: 0xFF9F,
    0xE040: 0x6F3E,
    0xE041: 0x6F13,
    0xE042: 0x6EF7,
    0xE043: 0x6F86,
    0xE044: 0x6F7A,
    0xE045: 0x6F78,
    0xE046: 0x6F81,
    0xE047: 0x6F80,
    0xE048: 0x6F6F,
    0xE049: 0x6F5B,
    0xE04A: 0x6FF3,
    0xE04B: 0x6F6D,
    0xE04C: 0x6F82,
    0xE04D: 0x6F7C,
    0xE04E: 0x6F58,
    0xE04F: 0x6F8E,
    0xE050: 0x6F91,
    0xE051: 0x6FC2,
    0xE052: 0x6F66,
    0xE053: 0x6FB3,
    0xE054: 0x6FA3,
    0xE055: 0x6FA1,
    0xE056: 0x6FA4,
    0xE057: 0x6FB9,
    0xE058: 0x6FC6,
    0xE059: 0x6FAA,
    0xE05A: 0x6FDF,
    0xE05B: 0x6FD5,
    0xE05C: 0x6FEC,
    0xE05D: 0x6FD4,
    0xE05E: 0x6FD8,
    0xE05F: 0x6FF1,
    0xE060: 0x6FEE,
    0xE061: 0x6FDB,
    0xE062: 0x7009,
    0xE063: 0x700B,
    0xE064: 0x6FFA,
    0xE065: 0x7011,
    0xE066: 0x7001,
    0xE067: 0x700F,
    0xE068: 0x6FFE,
    0xE069: 0x701B,
    0xE06A: 0x701A,
    0xE06B: 0x6F74,
    0xE06C: 0x701D,
    0xE06D: 0x7018,
    0xE06E: 0x701F,
    0xE06F: 0x7030,
    0xE070: 0x703E,
    0xE071: 0x7032,
    0xE072: 0x7051,
    0xE073: 0x7063,
    0xE074: 0x7099,
    0xE075: 0x7092,
    0xE076: 0x70AF,
    0xE077: 0x70F1,
    0xE078: 0x70AC,
    0xE079: 0x70B8,
    0xE07A: 0x70B3,
    0xE07B: 0x70AE,
    0xE07C: 0x70DF,
    0xE07D: 0x70CB,
    0xE07E: 0x70DD,
    0xE080: 0x70D9,
    0xE081: 0x7109,
    0xE082: 0x70FD,
    0xE083: 0x711C,
    0xE084: 0x7119,
    0xE085: 0x7165,
    0xE086: 0x7155,
    0xE087: 0x7188,
    0xE088: 0x7166,
    0xE089: 0x7162,
    0xE08A: 0x714C,
    0xE08B: 0x7156,
    0xE08C: 0x716C,
    0xE08D: 0x718F,
    0xE08E: 0x71FB,
    0xE08F: 0x7184,
    0xE090: 0x7195,
    0xE091: 0x71A8,
    0xE092: 0x71AC,
    0xE093: 0x71D7,
    0xE094: 0x71B9,
    0xE095: 0x71BE,
    0xE096: 0x71D2,
    0xE097: 0x71C9,
    0xE098: 0x71D4,
    0xE099: 0x71CE,
    0xE09A: 0x71E0,
    0xE09B: 0x71EC,
    0xE09C: 0x71E7,
    0xE09D: 0x71F5,
    0xE09E: 0x71FC,
    0xE09F: 0x71F9,
    0xE0A0: 0x71FF,
    0xE0A1: 0x720D,
    0xE0A2: 0x7210,
    0xE0A3: 0x721B,
    0xE0A4: 0x7228,
    0xE0A5: 0x722D,
    0xE0A6: 0x722C,
    0xE0A7: 0x7230,
    0xE0A8: 0x7232,
    0xE0A9: 0x723B,
    0xE0AA: 0x723C,
    0xE0AB: 0x723F,
    0xE0AC: 0x7240,
    0xE0AD: 0x7246,
    0xE0AE: 0x724B,
    0xE0AF: 0x7258,
    0xE0B0: 0x7274,
    0xE0B1: 0x727E,
    0xE0B2: 0x7282,
    0xE0B3: 0x7281,
    0xE0B4: 0x7287,
    0xE0B5: 0x7292,
    0xE0B6: 0x7296,
    0xE0B7: 0x72A2,
    0xE0B8: 0x72A7,
    0xE0B9: 0x72B9,
    0xE0BA: 0x72B2,
    0xE0BB: 0x72C3,
    0xE0BC: 0x72C6,
    0xE0BD: 0x72C4,
    0xE0BE: 0x72CE,
    0xE0BF: 0x72D2,
    0xE0C0: 0x72E2,
    0xE0C1: 0x72E0,
    0xE0C2: 0x72E1,
    0xE0C3: 0x72F9,
    0xE0C4: 0x72F7,
    0xE0C5: 0x500F,
    0xE0C6: 0x7317,
    0xE0C7: 0x730A,
    0xE0C8: 0x731C,
    0xE0C9: 0x7316,
    0xE0CA: 0x731D,
    0xE0CB: 0x7334,
    0xE0CC: 0x732F,
    0xE0CD: 0x7329,
    0xE0CE: 0x7325,
    0xE0CF: 0x733E,
    0xE0D0: 0x734E,
    0xE0D1: 0x734F,
    0xE0D2: 0x9ED8,
    0xE0D3: 0x7357,
    0xE0D4: 0x736A,
    0xE0D5: 0x7368,
    0xE0D6: 0x7370,
    0xE0D7: 0x7378,
    0xE0D8: 0x7375,
    0xE0D9: 0x737B,
    0xE0DA: 0x737A,
    0xE0DB: 0x73C8,
    0xE0DC: 0x73B3,
    0xE0DD: 0x73CE,
    0xE0DE: 0x73BB,
    0xE0DF: 0x73C0,
    0xE0E0: 0x73E5,
    0xE0E1: 0x73EE,
    0xE0E2: 0x73DE,
    0xE0E3: 0x74A2,
    0xE0E4: 0x7405,
    0xE0E5: 0x746F,
    0xE0E6: 0x7425,
    0xE0E7: 0x73F8,
    0xE0E8: 0x7432,
    0xE0E9: 0x743A,
    0xE0EA: 0x7455,
    0xE0EB: 0x743F,
    0xE0EC: 0x745F,
    0xE0ED: 0x7459,
    0xE0EE: 0x7441,
    0xE0EF: 0x745C,
    0xE0F0: 0x7469,
    0xE0F1: 0x7470,
    0xE0F2: 0x7463,
    0xE0F3: 0x746A,
    0xE0F4: 0x7476,
    0xE0F5: 0x747E,
    0xE0F6: 0x748B,
    0xE0F7: 0x749E,
    0xE0F8: 0x74A7,
    0xE0F9: 0x74CA,
    0xE0FA: 0x74CF,
    0xE0FB: 0x74D4,
    0xE0FC: 0x73F1,
    0xE140: 0x74E0,
    0xE141: 0x74E3,
    0xE142: 0x74E7,
    0xE143: 0x74E9,
    0xE144: 0x74EE,
    0xE145: 0x74F2,
    0xE146: 0x74F0,
    0xE147: 0x74F1,
    0xE148: 0x74F8,
    0xE149: 0x74F7,
    0xE14A: 0x7504,
    0xE14B: 0x7503,
    0xE14C: 0x7505,
    0xE14D: 0x750C,
    0xE14E: 0x750E,
    0xE14F: 0x750D,
    0xE150: 0x7515,
    0xE151: 0x7513,
    0xE152: 0x751E,
    0xE153: 0x7526,
    0xE154: 0x752C,
    0xE155: 0x753C,
    0xE156: 0x7544,
    0xE157: 0x754D,
    0xE158: 0x754A,
    0xE159: 0x7549,
    0xE15A: 0x755B,
    0xE15B: 0x7546,
    0xE15C: 0x755A,
    0xE15D: 0x7569,
    0xE15E: 0x7564,
    0xE15F: 0x7567,
    0xE160: 0x756B,
    0xE161: 0x756D,
    0xE162: 0x7578,
    0xE163: 0x7576,
    0xE164: 0x7586,
    0xE165: 0x7587,
    0xE166: 0x7574,
    0xE167: 0x758A,
    0xE168: 0x7589,
    0xE169: 0x7582,
    0xE16A: 0x7594,
    0xE16B: 0x759A,
    0xE16C: 0x759D,
    0xE16D: 0x75A5,
    0xE16E: 0x75A3,
    0xE16F: 0x75C2,
    0xE170: 0x75B3,
    0xE171: 0x75C3,
    0xE172: 0x75B5,
    0xE173: 0x75BD,
    0xE174: 0x75B8,
    0xE175: 0x75BC,
    0xE176: 0x75B1,
    0xE177: 0x75CD,
    0xE178: 0x75CA,
    0xE179: 0x75D2,
    0xE17A: 0x75D9,
    0xE17B: 0x75E3,
    0xE17C: 0x75DE,
    0xE17D: 0x75FE,
    0xE17E: 0x75FF,
    0xE180: 0x75FC,
    0xE181: 0x7601,
    0xE182: 0x75F0,
    0xE183: 0x75FA,
    0xE184: 0x75F2,
    0xE185: 0x75F3,
    0xE186: 0x760B,
    0xE187: 0x760D,
    0xE188: 0x7609,
    0xE189: 0x761F,
    0xE18A: 0x7627,
    0xE18B: 0x7620,
    0xE18C: 0x7621,
    0xE18D: 0x7622,
    0xE18E: 0x7624,
    0xE18F: 0x7634,
    0xE190: 0x7630,
    0xE191: 0x763B,
    0xE192: 0x7647,
    0xE193: 0x7648,
    0xE194: 0x7646,
    0xE195: 0x765C,
    0xE196: 0x7658,
    0xE197: 0x7661,
    0xE198: 0x7662,
    0xE199: 0x7668,
    0xE19A: 0x7669,
    0xE19B: 0x766A,
    0xE19C: 0x7667,
    0xE19D: 0x766C,
    0xE19E: 0x7670,
    0xE19F: 0x7672,
    0xE1A0: 0x7676,
    0xE1A1: 0x7678,
    0xE1A2: 0x767C,
    0xE1A3: 0x7680,
    0xE1A4: 0x7683,
    0xE1A5: 0x7688,
    0xE1A6: 0x768B,
    0xE1A7: 0x768E,
    0xE1A8: 0x7696,
    0xE1A9: 0x7693,
    0xE1AA: 0x7699,
    0xE1AB: 0x769A,
    0xE1AC: 0x76B0,
    0xE1AD: 0x76B4,
    0xE1AE: 0x76B8,
    0xE1AF: 0x76B9,
    0xE1B0: 0x76BA,
    0xE1B1: 0x76C2,
    0xE1B2: 0x76CD,
    0xE1B3: 0x76D6,
    0xE1B4: 0x76D2,
    0xE1B5: 0x76DE,
    0xE1B6: 0x76E1,
    0xE1B7: 0x76E5,
    0xE1B8: 0x76E7,
    0xE1B9: 0x76EA,
    0xE1BA: 0x862F,
    0xE1BB: 0x76FB,
    0xE1BC: 0x7708,
    0xE1BD: 0x7707,
    0xE1BE: 0x7704,
    0xE1BF: 0x7729,
    0xE1C0: 0x7724,
    0xE1C1: 0x771E,
    0xE1C2: 0x7725,
    0xE1C3: 0x7726,
    0xE1C4: 0x771B,
    0xE1C5: 0x7737,
    0xE1C6: 0x7738,
    0xE1C7: 0x7747,
    0xE1C8: 0x775A,
    0xE1C9: 0x7768,
    0xE1CA: 0x776B,
    0xE1CB: 0x775B,
    0xE1CC: 0x7765,
    0xE1CD: 0x777F,
    0xE1CE: 0x777E,
    0xE1CF: 0x7779,
    0xE1D0: 0x778E,
    0xE1D1: 0x778B,
    0xE1D2: 0x7791,
    0xE1D3: 0x77A0,
    0xE1D4: 0x779E,
    0xE1D5: 0x77B0,
    0xE1D6: 0x77B6,
    0xE1D7: 0x77B9,
    0xE1D8: 0x77BF,
    0xE1D9: 0x77BC,
    0xE1DA: 0x77BD,
    0xE1DB: 0x77BB,
    0xE1DC: 0x77C7,
    0xE1DD: 0x77CD,
    0xE1DE: 0x77D7,
    0xE1DF: 0x77DA,
    0xE1E0: 0x77DC,
    0xE1E1: 0x77E3,
    0xE1E2: 0x77EE,
    0xE1E3: 0x77FC,
    0xE1E4: 0x780C,
    0xE1E5: 0x7812,
    0xE1E6: 0x7926,
    0xE1E7: 0x7820,
    0xE1E8: 0x792A,
    0xE1E9: 0x7845,
    0xE1EA: 0x788E,
    0xE1EB: 0x7874,
    0xE1EC: 0x7886,
    0xE1ED: 0x787C,
    0xE1EE: 0x789A,
    0xE1EF: 0x788C,
    0xE1F0: 0x78A3,
    0xE1F1: 0x78B5,
    0xE1F2: 0x78AA,
    0xE1F3: 0x78AF,
    0xE1F4: 0x78D1,
    0xE1F5: 0x78C6,
    0xE1F6: 0x78CB,
    0xE1F7: 0x78D4,
    0xE1F8: 0x78BE,
    0xE1F9: 0x78BC,
    0xE1FA: 0x78C5,
    0xE1FB: 0x78CA,
    0xE1FC: 0x78EC,
    0xE240: 0x78E7,
    0xE241: 0x78DA,
    0xE242: 0x78FD,
    0xE243: 0x78F4,
    0xE244: 0x7907,
    0xE245: 0x7912,
    0xE246: 0x7911,
    0xE247: 0x7919,
    0xE248: 0x792C,
    0xE249: 0x792B,
    0xE24A: 0x7940,
    0xE24B: 0x7960,
    0xE24C: 0x7957,
    0xE24D: 0x795F,
    0xE24E: 0x795A,
    0xE24F: 0x7955,
    0xE250: 0x7953,
    0xE251: 0x797A,
    0xE252: 0x797F,
    0xE253: 0x798A,
    0xE254: 0x799D,
    0xE255: 0x79A7,
    0xE256: 0x9F4B,
    0xE257: 0x79AA,
    0xE258: 0x79AE,
    0xE259: 0x79B3,
    0xE25A: 0x79B9,
    0xE25B: 0x79BA,
    0xE25C: 0x79C9,
    0xE25D: 0x79D5,
    0xE25E: 0x79E7,
    0xE25F: 0x79EC,
    0xE260: 0x79E1,
    0xE261: 0x79E3,
    0xE262: 0x7A08,
    0xE263: 0x7A0D,
    0xE264: 0x7A18,
    0xE265: 0x7A19,
    0xE266: 0x7A20,
    0xE267: 0x7A1F,
    0xE268: 0x7980,
    0xE269: 0x7A31,
    0xE26A: 0x7A3B,
    0xE26B: 0x7A3E,
    0xE26C: 0x7A37,
    0xE26D: 0x7A43,
    0xE26E: 0x7A57,
    0xE26F: 0x7A49,
    0xE270: 0x7A61,
    0xE271: 0x7A62,
    0xE272: 0x7A69,
    0xE273: 0x9F9D,
    0xE274: 0x7A70,
    0xE275: 0x7A79,
    0xE276: 0x7A7D,
    0xE277: 0x7A88,
    0xE278: 0x7A97,
    0xE279: 0x7A95,
    0xE27A: 0x7A98,
    0xE27B: 0x7A96,
    0xE27C: 0x7AA9,
    0xE27D: 0x7AC8,
    0xE27E: 0x7AB0,
    0xE280: 0x7AB6,
    0xE281: 0x7AC5,
    0xE282: 0x7AC4,
    0xE283: 0x7ABF,
    0xE284: 0x9083,
    0xE285: 0x7AC7,
    0xE286: 0x7ACA,
    0xE287: 0x7ACD,
    0xE288: 0x7ACF,
    0xE289: 0x7AD5,
    0xE28A: 0x7AD3,
    0xE28B: 0x7AD9,
    0xE28C: 0x7ADA,
    0xE28D: 0x7ADD,
    0xE28E: 0x7AE1,
    0xE28F: 0x7AE2,
    0xE290: 0x7AE6,
    0xE291: 0x7AED,
    0xE292: 0x7AF0,
    0xE293: 0x7B02,
    0xE294: 0x7B0F,
    0xE295: 0x7B0A,
    0xE296: 0x7B06,
    0xE297: 0x7B33,
    0xE298: 0x7B18,
    0xE299: 0x7B19,
    0xE29A: 0x7B1E,
    0xE29B: 0x7B35,
    0xE29C: 0x7B28,
    0xE29D: 0x7B36,
    0xE29E: 0x7B50,
    0xE29F: 0x7B7A,
    0xE2A0: 0x7B04,
    0xE2A1: 0x7B4D,
    0xE2A2: 0x7B0B,
    0xE2A3: 0x7B4C,
    0xE2A4: 0x7B45,
    0xE2A5: 0x7B75,
    0xE2A6: 0x7B65,
    0xE2A7: 0x7B74,
    0xE2A8: 0x7B67,
    0xE2A9: 0x7B70,
    0xE2AA: 0x7B71,
    0xE2AB: 0x7B6C,
    0xE2AC: 0x7B6E,
    0xE2AD: 0x7B9D,
    0xE2AE: 0x7B98,
    0xE2AF: 0x7B9F,
    0xE2B0: 0x7B8D,
    0xE2B1: 0x7B9C,
    0xE2B2: 0x7B9A,
    0xE2B3: 0x7B8B,
    0xE2B4: 0x7B92,
    0xE2B5: 0x7B8F,
    0xE2B6: 0x7B5D,
    0xE2B7: 0x7B99,
    0xE2B8: 0x7BCB,
    0xE2B9: 0x7BC1,
    0xE2BA: 0x7BCC,
    0xE2BB: 0x7BCF,
    0xE2BC: 0x7BB4,
    0xE2BD: 0x7BC6,
    0xE2BE: 0x7BDD,
    0xE2BF: 0x7BE9,
    0xE2C0: 0x7C11,
    0xE2C1: 0x7C14,
    0xE2C2: 0x7BE6,
    0xE2C3: 0x7BE5,
    0xE2C4: 0x7C60,
    0xE2C5: 0x7C00,
    0xE2C6: 0x7C07,
    0xE2C7: 0x7C13,
    0xE2C8: 0x7BF3,
    0xE2C9: 0x7BF7,
    0xE2CA: 0x7C17,
    0xE2CB: 0x7C0D,
    0xE2CC: 0x7BF6,
    0xE2CD: 0x7C23,
    0xE2CE: 0x7C27,
    0xE2CF: 0x7C2A,
    0xE2D0: 0x7C1F,
    0xE2D1: 0x7C37,
    0xE2D2: 0x7C2B,
    0xE2D3: 0x7C3D,
    0xE2D4: 0x7C4C,
    0xE2D5: 0x7C43,
    0xE2D6: 0x7C54,
    0xE2D7: 0x7C4F,
    0xE2D8: 0x7C40,
    0xE2D9: 0x7C50,
    0xE2DA: 0x7C58,
    0xE2DB: 0x7C5F,
    0xE2DC: 0x7C64,
    0xE2DD: 0x7C56,
    0xE2DE: 0x7C65,
    0xE2DF: 0x7C6C,
    0xE2E0: 0x7C75,
    0xE2E1: 0x7C83,
    0xE2E2: 0x7C90,
    0xE2E3: 0x7CA4,
    0xE2E4: 0x7CAD,
    0xE2E5: 0x7CA2,
    0xE2E6: 0x7CAB,
    0xE2E7: 0x7CA1,
    0xE2E8: 0x7CA8,
    0xE2E9: 0x7CB3,
    0xE2EA: 0x7CB2,
    0xE2EB: 0x7CB1,
    0xE2EC: 0x7CAE,
    0xE2ED: 0x7CB9,
    0xE2EE: 0x7CBD,
    0xE2EF: 0x7CC0,
    0xE2F0: 0x7CC5,
    0xE2F1: 0x7CC2,
    0xE2F2: 0x7CD8,
    0xE2F3: 0x7CD2,
    0xE2F4: 0x7CDC,
    0xE2F5: 0x7CE2,
    0xE2F6: 0x9B3B,
    0xE2F7: 0x7CEF,
    0xE2F8: 0x7CF2,
    0xE2F9: 0x7CF4,
    0xE2FA: 0x7CF6,
    0xE2FB: 0x7CFA,
    0xE2FC: 0x7D06,
    0xE340: 0x7D02,
    0xE341: 0x7D1C,
    0xE342: 0x7D15,
    0xE343: 0x7D0A,
    0xE344: 0x7D45,
    0xE345: 0x7D4B,
    0xE346: 0x7D2E,
    0xE347: 0x7D32,
    0xE348: 0x7D3F,
    0xE349: 0x7D35,
    0xE34A: 0x7D46,
    0xE34B: 0x7D73,
    0xE34C: 0x7D56,
    0xE34D: 0x7D4E,
    0xE34E: 0x7D72,
    0xE34F: 0x7D68,
    0xE350: 0x7D6E,
    0xE351: 0x7D4F,
    0xE352: 0x7D63,
    0xE353: 0x7D93,
    0xE354: 0x7D89,
    0xE355: 0x7D5B,
    0xE356: 0x7D8F,
    0xE357: 0x7D7D,
    0xE358: 0x7D9B,
    0xE359: 0x7DBA,
    0xE35A: 0x7DAE,
    0xE35B: 0x7DA3,
    0xE35C: 0x7DB5,
    0xE35D: 0x7DC7,
    0xE35E: 0x7DBD,
    0xE35F: 0x7DAB,
    0xE360: 0x7E3D,
    0xE361: 0x7DA2,
    0xE362: 0x7DAF,
    0xE363: 0x7DDC,
    0xE364: 0x7DB8,
    0xE365: 0x7D9F,
    0xE366: 0x7DB0,
    0xE367: 0x7DD8,
    0xE368: 0x7DDD,
    0xE369: 0x7DE4,
    0xE36A: 0x7DDE,
    0xE36B: 0x7DFB,
    0xE36C: 0x7DF2,
    0xE36D: 0x7DE1,
    0xE36E: 0x7E05,
    0xE36F: 0x7E0A,
    0xE370: 0x7E23,
    0xE371: 0x7E21,
    0xE372: 0x7E12,
    0xE373: 0x7E31,
    0xE374: 0x7E1F,
    0xE375: 0x7E09,
    0xE376: 0x7E0B,
    0xE377: 0x7E22,
    0xE378: 0x7E46,
    0xE379: 0x7E66,
    0xE37A: 0x7E3B,
    0xE37B: 0x7E35,
    0xE37C: 0x7E39,
    0xE37D: 0x7E43,
    0xE37E: 0x7E37,
    0xE380: 0x7E32,
    0xE381: 0x7E3A,
    0xE382: 0x7E67,
    0xE383: 0x7E5D,
    0xE384: 0x7E56,
    0xE385: 0x7E5E,
    0xE386: 0x7E59,
    0xE387: 0x7E5A,
    0xE388: 0x7E79,
    0xE389: 0x7E6A,
    0xE38A: 0x7E69,
    0xE38B: 0x7E7C,
    0xE38C: 0x7E7B,
    0xE38D: 0x7E83,
    0xE38E: 0x7DD5,
    0xE38F: 0x7E7D,
    0xE390: 0x8FAE,
    0xE391: 0x7E7F,
    0xE392: 0x7E88,
    0xE393: 0x7E89,
    0xE394: 0x7E8C,
    0xE395: 0x7E92,
    0xE396: 0x7E90,
    0xE397: 0x7E93,
    0xE398: 0x7E94,
    0xE399: 0x7E96,
    0xE39A: 0x7E8E,
    0xE39B: 0x7E9B,
    0xE39C: 0x7E9C,
    0xE39D: 0x7F38,
    0xE39E: 0x7F3A,
    0xE39F: 0x7F45,
    0xE3A0: 0x7F4C,
    0xE3A1: 0x7F4D,
    0xE3A2: 0x7F4E,
    0xE3A3: 0x7F50,
    0xE3A4: 0x7F51,
    0xE3A5: 0x7F55,
    0xE3A6: 0x7F54,
    0xE3A7: 0x7F58,
    0xE3A8: 0x7F5F,
    0xE3A9: 0x7F60,
    0xE3AA: 0x7F68,
    0xE3AB: 0x7F69,
    0xE3AC: 0x7F67,
    0xE3AD: 0x7F78,
    0xE3AE: 0x7F82,
    0xE3AF: 0x7F86,
    0xE3B0: 0x7F83,
    0xE3B1: 0x7F88,
    0xE3B2: 0x7F87,
    0xE3B3: 0x7F8C,
    0xE3B4: 0x7F94,
    0xE3B5: 0x7F9E,
    0xE3B6: 0x7F9D,
    0xE3B7: 0x7F9A,
    0xE3B8: 0x7FA3,
    0xE3B9: 0x7FAF,
    0xE3BA: 0x7FB2,
    0xE3BB: 0x7FB9,
    0xE3BC: 0x7FAE,
    0xE3BD: 0x7FB6,
    0xE3BE: 0x7FB8,
    0xE3BF: 0x8B71,
    0xE3C0: 0x7FC5,
    0xE3C1: 0x7FC6,
    0xE3C2: 0x7FCA,
    0xE3C3: 0x7FD5,
    0xE3C4: 0x7FD4,
    0xE3C5: 0x7FE1,
    0xE3C6: 0x7FE6,
    0xE3C7: 0x7FE9,
    0xE3C8: 0x7FF3,
    0xE3C9: 0x7FF9,
    0xE3CA: 0x98DC,
    0xE3CB: 0x8006,
    0xE3CC: 0x8004,
    0xE3CD: 0x800B,
    0xE3CE: 0x8012,
    0xE3CF: 0x8018,
    0xE3D0: 0x8019,
    0xE3D1: 0x801C,
    0xE3D2: 0x8021,
    0xE3D3: 0x8028,
    0xE3D4: 0x803F,
    0xE3D5: 0x803B,
    0xE3D6: 0x804A,
    0xE3D7: 0x8046,
    0xE3D8: 0x8052,
    0xE3D9: 0x8058,
    0xE3DA: 0x805A,
    0xE3DB: 0x805F,
    0xE3DC: 0x8062,
    0xE3DD: 0x8068,
    0xE3DE: 0x8073,
    0xE3DF: 0x8072,
    0xE3E0: 0x8070,
    0xE3E1: 0x8076,
    0xE3E2: 0x8079,
    0xE3E3: 0x807D,
    0xE3E4: 0x807F,
    0xE3E5: 0x8084,
    0xE3E6: 0x8086,
    0xE3E7: 0x8085,
    0xE3E8: 0x809B,
    0xE3E9: 0x8093,
    0xE3EA: 0x809A,
    0xE3EB: 0x80AD,
    0xE3EC: 0x5190,
    0xE3ED: 0x80AC,
    0xE3EE: 0x80DB,
    0xE3EF: 0x80E5,
    0xE3F0: 0x80D9,
    0xE3F1: 0x80DD,
    0xE3F2: 0x80C4,
    0xE3F3: 0x80DA,
    0xE3F4: 0x80D6,
    0xE3F5: 0x8109,
    0xE3F6: 0x80EF,
    0xE3F7: 0x80F1,
    0xE3F8: 0x811B,
    0xE3F9: 0x8129,
    0xE3FA: 0x8123,
    0xE3FB: 0x812F,
    0xE3FC: 0x814B,
    0xE440: 0x968B,
    0xE441: 0x8146,
    0xE442: 0x813E,
    0xE443: 0x8153,
    0xE444: 0x8151,
    0xE445: 0x80FC,
    0xE446: 0x8171,
    0xE447: 0x816E,
    0xE448: 0x8165,
    0xE449: 0x8166,
    0xE44A: 0x8174,
    0xE44B: 0x8183,
    0xE44C: 0x8188,
    0xE44D: 0x818A,
    0xE44E: 0x8180,
    0xE44F: 0x8182,
    0xE450: 0x81A0,
    0xE451: 0x8195,
    0xE452: 0x81A4,
    0xE453: 0x81A3,
    0xE454: 0x815F,
    0xE455: 0x8193,
    0xE456: 0x81A9,
    0xE457: 0x81B0,
    0xE458: 0x81B5,
    0xE459: 0x81BE,
    0xE45A: 0x81B8,
    0xE45B: 0x81BD,
    0xE45C: 0x81C0,
    0xE45D: 0x81C2,
    0xE45E: 0x81BA,
    0xE45F: 0x81C9,
    0xE460: 0x81CD,
    0xE461: 0x81D1,
    0xE462: 0x81D9,
    0xE463: 0x81D8,
    0xE464: 0x81C8,
    0xE465: 0x81DA,
    0xE466: 0x81DF,
    0xE467: 0x81E0,
    0xE468: 0x81E7,
    0xE469: 0x81FA,
    0xE46A: 0x81FB,
    0xE46B: 0x81FE,
    0xE46C: 0x8201,
    0xE46D: 0x8202,
    0xE46E: 0x8205,
    0xE46F: 0x8207,
    0xE470: 0x820A,
    0xE471: 0x820D,
    0xE472: 0x8210,
    0xE473: 0x8216,
    0xE474: 0x8229,
    0xE475: 0x822B,
    0xE476: 0x8238,
    0xE477: 0x8233,
    0xE478: 0x8240,
    0xE479: 0x8259,
    0xE47A: 0x8258,
    0xE47B: 0x825D,
    0xE47C: 0x825A,
    0xE47D: 0x825F,
    0xE47E: 0x8264,
    0xE480: 0x8262,
    0xE481: 0x8268,
    0xE482: 0x826A,
    0xE483: 0x826B,
    0xE484: 0x822E,
    0xE485: 0x8271,
    0xE486: 0x8277,
    0xE487: 0x8278,
    0xE488: 0x827E,
    0xE489: 0x828D,
    0xE48A: 0x8292,
    0xE48B: 0x82AB,
    0xE48C: 0x829F,
    0xE48D: 0x82BB,
    0xE48E: 0x82AC,
    0xE48F: 0x82E1,
    0xE490: 0x82E3,
    0xE491: 0x82DF,
    0xE492: 0x82D2,
    0xE493: 0x82F4,
    0xE494: 0x82F3,
    0xE495: 0x82FA,
    0xE496: 0x8393,
    0xE497: 0x8303,
    0xE498: 0x82FB,
    0xE499: 0x82F9,
    0xE49A: 0x82DE,
    0xE49B: 0x8306,
    0xE49C: 0x82DC,
    0xE49D: 0x8309,
    0xE49E: 0x82D9,
    0xE49F: 0x8335,
    0xE4A0: 0x8334,
    0xE4A1: 0x8316,
    0xE4A2: 0x8332,
    0xE4A3: 0x8331,
    0xE4A4: 0x8340,
    0xE4A5: 0x8339,
    0xE4A6: 0x8350,
    0xE4A7: 0x8345,
    0xE4A8: 0x832F,
    0xE4A9: 0x832B,
    0xE4AA: 0x8317,
    0xE4AB: 0x8318,
    0xE4AC: 0x8385,
    0xE4AD: 0x839A,
    0xE4AE: 0x83AA,
    0xE4AF: 0x839F,
    0xE4B0: 0x83A2,
    0xE4B1: 0x8396,
    0xE4B2: 0x8323,
    0xE4B3: 0x838E,
    0xE4B4: 0x8387,
    0xE4B5: 0x838A,
    0xE4B6: 0x837C,
    0xE4B7: 0x83B5,
    0xE4B8: 0x8373,
    0xE4B9: 0x8375,
    0xE4BA: 0x83A0,
    0xE4BB: 0x8389,
    0xE4BC: 0x83A8,
    0xE4BD: 0x83F4,
    0xE4BE: 0x8413,
    0xE4BF: 0x83EB,
    0xE4C0: 0x83CE,
    0xE4C1: 0x83FD,
    0xE4C2: 0x8403,
    0xE4C3: 0x83D8,
    0xE4C4: 0x840B,
    0xE4C5: 0x83C1,
    0xE4C6: 0x83F7,
    0xE4C7: 0x8407,
    0xE4C8: 0x83E0,
    0xE4C9: 0x83F2,
    0xE4CA: 0x840D,
    0xE4CB: 0x8422,
    0xE4CC: 0x8420,
    0xE4CD: 0x83BD,
    0xE4CE: 0x8438,
    0xE4CF: 0x8506,
    0xE4D0: 0x83FB,
    0xE4D1: 0x846D,
    0xE4D2: 0x842A,
    0xE4D3: 0x843C,
    0xE4D4: 0x855A,
    0xE4D5: 0x8484,
    0xE4D6: 0x8477,
    0xE4D7: 0x846B,
    0xE4D8: 0x84AD,
    0xE4D9: 0x846E,
    0xE4DA: 0x8482,
    0xE4DB: 0x8469,
    0xE4DC: 0x8446,
    0xE4DD: 0x842C,
    0xE4DE: 0x846F,
    0xE4DF: 0x8479,
    0xE4E0: 0x8435,
    0xE4E1: 0x84CA,
    0xE4E2: 0x8462,
    0xE4E3: 0x84B9,
    0xE4E4: 0x84BF,
    0xE4E5: 0x849F,
    0xE4E6: 0x84D9,
    0xE4E7: 0x84CD,
    0xE4E8: 0x84BB,
    0xE4E9: 0x84DA,
    0xE4EA: 0x84D0,
    0xE4EB: 0x84C1,
    0xE4EC: 0x84C6,
    0xE4ED: 0x84D6,
    0xE4EE: 0x84A1,
    0xE4EF: 0x8521,
    0xE4F0: 0x84FF,
    0xE4F1: 0x84F4,
    0xE4F2: 0x8517,
    0xE4F3: 0x8518,
    0xE4F4: 0x852C,
    0xE4F5: 0x851F,
    0xE4F6: 0x8515,
    0xE4F7: 0x8514,
    0xE4F8: 0x84FC,
    0xE4F9: 0x8540,
    0xE4FA: 0x8563,
    0xE4FB: 0x8558,
    0xE4FC: 0x8548,
    0xE540: 0x8541,
    0xE541: 0x8602,
    0xE542: 0x854B,
    0xE543: 0x8555,
    0xE544: 0x8580,
    0xE545: 0x85A4,
    0xE546: 0x8588,
    0xE547: 0x8591,
    0xE548: 0x858A,
    0xE549: 0x85A8,
    0xE54A: 0x856D,
    0xE54B: 0x8594,
    0xE54C: 0x859B,
    0xE54D: 0x85EA,
    0xE54E: 0x8587,
    0xE54F: 0x859C,
    0xE550: 0x8577,
    0xE551: 0x857E,
    0xE552: 0x8590,
    0xE553: 0x85C9,
    0xE554: 0x85BA,
    0xE555: 0x85CF,
    0xE556: 0x85B9,
    0xE557: 0x85D0,
    0xE558: 0x85D5,
    0xE559: 0x85DD,
    0xE55A: 0x85E5,
    0xE55B: 0x85DC,
    0xE55C: 0x85F9,
    0xE55D: 0x860A,
    0xE55E: 0x8613,
    0xE55F: 0x860B,
    0xE560: 0x85FE,
    0xE561: 0x85FA,
    0xE562: 0x8606,
    0xE563: 0x8622,
    0xE564: 0x861A,
    0xE565: 0x8630,
    0xE566: 0x863F,
    0xE567: 0x864D,
    0xE568: 0x4E55,
    0xE569: 0x8654,
    0xE56A: 0x865F,
    0xE56B: 0x8667,
    0xE56C: 0x8671,
    0xE56D: 0x8693,
    0xE56E: 0x86A3,
    0xE56F: 0x86A9,
    0xE570: 0x86AA,
    0xE571: 0x868B,
    0xE572: 0x868C,
    0xE573: 0x86B6,
    0xE574: 0x86AF,
    0xE575: 0x86C4,
    0xE576: 0x86C6,
    0xE577: 0x86B0,
    0xE578: 0x86C9,
    0xE579: 0x8823,
    0xE57A: 0x86AB,
    0xE57B: 0x86D4,
    0xE57C: 0x86DE,
    0xE57D: 0x86E9,
    0xE57E: 0x86EC,
    0xE580: 0x86DF,
    0xE581: 0x86DB,
    0xE582: 0x86EF,
    0xE583: 0x8712,
    0xE584: 0x8706,
    0xE585: 0x8708,
    0xE586: 0x8700,
    0xE587: 0x8703,
    0xE588: 0x86FB,
    0xE589: 0x8711,
    0xE58A: 0x8709,
    0xE58B: 0x870D,
    0xE58C: 0x86F9,
    0xE58D: 0x870A,
    0xE58E: 0x8734,
    0xE58F: 0x873F,
    0xE590: 0x8737,
    0xE591: 0x873B,
    0xE592: 0x8725,
    0xE593: 0x8729,
    0xE594: 0x871A,
    0xE595: 0x8760,
    0xE596: 0x875F,
    0xE597: 0x8778,
    0xE598: 0x874C,
    0xE599: 0x874E,
    0xE59A: 0x8774,
    0xE59B: 0x8757,
    0xE59C: 0x8768,
    0xE59D: 0x876E,
    0xE59E: 0x8759,
    0xE59F: 0x8753,
    0xE5A0: 0x8763,
    0xE5A1: 0x876A,
    0xE5A2: 0x8805,
    0xE5A3: 0x87A2,
    0xE5A4: 0x879F,
    0xE5A5: 0x8782,
    0xE5A6: 0x87AF,
    0xE5A7: 0x87CB,
    0xE5A8: 0x87BD,
    0xE5A9: 0x87C0,
    0xE5AA: 0x87D0,
    0xE5AB: 0x96D6,
    0xE5AC: 0x87AB,
    0xE5AD: 0x87C4,
    0xE5AE: 0x87B3,
    0xE5AF: 0x87C7,
    0xE5B0: 0x87C6,
    0xE5B1: 0x87BB,
    0xE5B2: 0x87EF,
    0xE5B3: 0x87F2,
    0xE5B4: 0x87E0,
    0xE5B5: 0x880F,
    0xE5B6: 0x880D,
    0xE5B7: 0x87FE,
    0xE5B8: 0x87F6,
    0xE5B9: 0x87F7,
    0xE5BA: 0x880E,
    0xE5BB: 0x87D2,
    0xE5BC: 0x8811,
    0xE5BD: 0x8816,
    0xE5BE: 0x8815,
    0xE5BF: 0x8822,
    0xE5C0: 0x8821,
    0xE5C1: 0x8831,
    0xE5C2: 0x8836,
    0xE5C3: 0x8839,
    0xE5C4: 0x8827,
    0xE5C5: 0x883B,
    0xE5C6: 0x8844,
    0xE5C7: 0x8842,
    0xE5C8: 0x8852,
    0xE5C9: 0x8859,
    0xE5CA: 0x885E,
    0xE5CB: 0x8862,
    0xE5CC: 0x886B,
    0xE5CD: 0x8881,
    0xE5CE: 0x887E,
    0xE5CF: 0x889E,
    0xE5D0: 0x8875,
    0xE5D1: 0x887D,
    0xE5D2: 0x88B5,
    0xE5D3: 0x8872,
    0xE5D4: 0x8882,
    0xE5D5: 0x8897,
    0xE5D6: 0x8892,
    0xE5D7: 0x88AE,
    0xE5D8: 0x8899,
    0xE5D9: 0x88A2,
    0xE5DA: 0x888D,
    0xE5DB: 0x88A4,
    0xE5DC: 0x88B0,
    0xE5DD: 0x88BF,
    0xE5DE: 0x88B1,
    0xE5DF: 0x88C3,
    0xE5E0: 0x88C4,
    0xE5E1: 0x88D4,
    0xE5E2: 0x88D8,
    0xE5E3: 0x88D9,
    0xE5E4: 0x88DD,
    0xE5E5: 0x88F9,
    0xE5E6: 0x8902,
    0xE5E7: 0x88FC,
    0xE5E8: 0x88F4,
    0xE5E9: 0x88E8,
    0xE5EA: 0x88F2,
    0xE5EB: 0x8904,
    0xE5EC: 0x890C,
    0xE5ED: 0x890A,
    0xE5EE: 0x8913,
    0xE5EF: 0x8943,
    0xE5F0: 0x891E,
    0xE5F1: 0x8925,
    0xE5F2: 0x892A,
    0xE5F3: 0x892B,
    0xE5F4: 0x8941,
    0xE5F5: 0x8944,
    0xE5F6: 0x893B,
    0xE5F7: 0x8936,
    0xE5F8: 0x8938,
    0xE5F9: 0x894C,
    0xE5FA: 0x891D,
    0xE5FB: 0x8960,
    0xE5FC: 0x895E,
    0xE640: 0x8966,
    0xE641: 0x8964,
    0xE642: 0x896D,
    0xE643: 0x896A,
    0xE644: 0x896F,
    0xE645: 0x8974,
    0xE646: 0x8977,
    0xE647: 0x897E,
    0xE648: 0x8983,
    0xE649: 0x8988,
    0xE64A: 0x898A,
    0xE64B: 0x8993,
    0xE64C: 0x8998,
    0xE64D: 0x89A1,
    0xE64E: 0x89A9,
    0xE64F: 0x89A6,
    0xE650: 0x89AC,
    0xE651: 0x89AF,
    0xE652: 0x89B2,
    0xE653: 0x89BA,
    0xE654: 0x89BD,
    0xE655: 0x89BF,
    0xE656: 0x89C0,
    0xE657: 0x89DA,
    0xE658: 0x89DC,
    0xE659: 0x89DD,
    0xE65A: 0x89E7,
    0xE65B: 0x89F4,
    0xE65C: 0x89F8,
    0xE65D: 0x8A03,
    0xE65E: 0x8A16,
    0xE65F: 0x8A10,
    0xE660: 0x8A0C,
    0xE661: 0x8A1B,
    0xE662: 0x8A1D,
    0xE663: 0x8A25,
    0xE664: 0x8A36,
    0xE665: 0x8A41,
    0xE666: 0x8A5B,
    0xE667: 0x8A52,
    0xE668: 0x8A46,
    0xE669: 0x8A48,
    0xE66A: 0x8A7C,
    0xE66B: 0x8A6D,
    0xE66C: 0x8A6C,
    0xE66D: 0x8A62,
    0xE66E: 0x8A85,
    0xE66F: 0x8A82,
    0xE670: 0x8A84,
    0xE671: 0x8AA8,
    0xE672: 0x8AA1,
    0xE673: 0x8A91,
    0xE674: 0x8AA5,
    0xE675: 0x8AA6,
    0xE676: 0x8A9A,
    0xE677: 0x8AA3,
    0xE678: 0x8AC4,
    0xE679: 0x8ACD,
    0xE67A: 0x8AC2,
    0xE67B: 0x8ADA,
    0xE67C: 0x8AEB,
    0xE67D: 0x8AF3,
    0xE67E: 0x8AE7,
    0xE680: 0x8AE4,
    0xE681: 0x8AF1,
    0xE682: 0x8B14,
    0xE683: 0x8AE0,
    0xE684: 0x8AE2,
    0xE685: 0x8AF7,
    0xE686: 0x8ADE,
    0xE687: 0x8ADB,
    0xE688: 0x8B0C,
    0xE689: 0x8B07,
    0xE68A: 0x8B1A,
    0xE68B: 0x8AE1,
    0xE68C: 0x8B16,
    0xE68D: 0x8B10,
    0xE68E: 0x8B17,
    0xE68F: 0x8B20,
    0xE690: 0x8B33,
    0xE691: 0x97AB,
    0xE692: 0x8B26,
    0xE693: 0x8B2B,
    0xE694: 0x8B3E,
    0xE695: 0x8B28,
    0xE696: 0x8B41,
    0xE697: 0x8B4C,
    0xE698: 0x8B4F,
    0xE699: 0x8B4E,
    0xE69A: 0x8B49,
    0xE69B: 0x8B56,
    0xE69C: 0x8B5B,
    0xE69D: 0x8B5A,
    0xE69E: 0x8B6B,
    0xE69F: 0x8B5F,
    0xE6A0: 0x8B6C,
    0xE6A1: 0x8B6F,
    0xE6A2: 0x8B74,
    0xE6A3: 0x8B7D,
    0xE6A4: 0x8B80,
    0xE6A5: 0x8B8C,
    0xE6A6: 0x8B8E,
    0xE6A7: 0x8B92,
    0xE6A8: 0x8B93,
    0xE6A9: 0x8B96,
    0xE6AA: 0x8B99,
    0xE6AB: 0x8B9A,
    0xE6AC: 0x8C3A,
    0xE6AD: 0x8C41,
    0xE6AE: 0x8C3F,
    0xE6AF: 0x8C48,
    0xE6B0: 0x8C4C,
    0xE6B1: 0x8C4E,
    0xE6B2: 0x8C50,
    0xE6B3: 0x8C55,
    0xE6B4: 0x8C62,
    0xE6B5: 0x8C6C,
    0xE6B6: 0x8C78,
    0xE6B7: 0x8C7A,
    0xE6B8: 0x8C82,
    0xE6B9: 0x8C89,
    0xE6BA: 0x8C85,
    0xE6BB: 0x8C8A,
    0xE6BC: 0x8C8D,
    0xE6BD: 0x8C8E,
    0xE6BE: 0x8C94,
    0xE6BF: 0x8C7C,
    0xE6C0: 0x8C98,
    0xE6C1: 0x621D,
    0xE6C2: 0x8CAD,
    0xE6C3: 0x8CAA,
    0xE6C4: 0x8CBD,
    0xE6C5: 0x8CB2,
    0xE6C6: 0x8CB3,
    0xE6C7: 0x8CAE,
    0xE6C8: 0x8CB6,
    0xE6C9: 0x8CC8,
    0xE6CA: 0x8CC1,
    0xE6CB: 0x8CE4,
    0xE6CC: 0x8CE3,
    0xE6CD: 0x8CDA,
    0xE6CE: 0x8CFD,
    0xE6CF: 0x8CFA,
    0xE6D0: 0x8CFB,
    0xE6D1: 0x8D04,
    0xE6D2: 0x8D05,
    0xE6D3: 0x8D0A,
    0xE6D4: 0x8D07,
    0xE6D5: 0x8D0F,
    0xE6D6: 0x8D0D,
    0xE6D7: 0x8D10,
    0xE6D8: 0x9F4E,
    0xE6D9: 0x8D13,
    0xE6DA: 0x8CCD,
    0xE6DB: 0x8D14,
    0xE6DC: 0x8D16,
    0xE6DD: 0x8D67,
    0xE6DE: 0x8D6D,
    0xE6DF: 0x8D71,
    0xE6E0: 0x8D73,
    0xE6E1: 0x8D81,
    0xE6E2: 0x8D99,
    0xE6E3: 0x8DC2,
    0xE6E4: 0x8DBE,
    0xE6E5: 0x8DBA,
    0xE6E6: 0x8DCF,
    0xE6E7: 0x8DDA,
    0xE6E8: 0x8DD6,
    0xE6E9: 0x8DCC,
    0xE6EA: 0x8DDB,
    0xE6EB: 0x8DCB,
    0xE6EC: 0x8DEA,
    0xE6ED: 0x8DEB,
    0xE6EE: 0x8DDF,
    0xE6EF: 0x8DE3,
    0xE6F0: 0x8DFC,
    0xE6F1: 0x8E08,
    0xE6F2: 0x8E09,
    0xE6F3: 0x8DFF,
    0xE6F4: 0x8E1D,
    0xE6F5: 0x8E1E,
    0xE6F6: 0x8E10,
    0xE6F7: 0x8E1F,
    0xE6F8: 0x8E42,
    0xE6F9: 0x8E35,
    0xE6FA: 0x8E30,
    0xE6FB: 0x8E34,
    0xE6FC: 0x8E4A,
    0xE740: 0x8E47,
    0xE741: 0x8E49,
    0xE742: 0x8E4C,
    0xE743: 0x8E50,
    0xE744: 0x8E48,
    0xE745: 0x8E59,
    0xE746: 0x8E64,
    0xE747: 0x8E60,
    0xE748: 0x8E2A,
    0xE749: 0x8E63,
    0xE74A: 0x8E55,
    0xE74B: 0x8E76,
    0xE74C: 0x8E72,
    0xE74D: 0x8E7C,
    0xE74E: 0x8E81,
    0xE74F: 0x8E87,
    0xE750: 0x8E85,
    0xE751: 0x8E84,
    0xE752: 0x8E8B,
    0xE753: 0x8E8A,
    0xE754: 0x8E93,
    0xE755: 0x8E91,
    0xE756: 0x8E94,
    0xE757: 0x8E99,
    0xE758: 0x8EAA,
    0xE759: 0x8EA1,
    0xE75A: 0x8EAC,
    0xE75B: 0x8EB0,
    0xE75C: 0x8EC6,
    0xE75D: 0x8EB1,
    0xE75E: 0x8EBE,
    0xE75F: 0x8EC5,
    0xE760: 0x8EC8,
    0xE761: 0x8ECB,
    0xE762: 0x8EDB,
    0xE763: 0x8EE3,
    0xE764: 0x8EFC,
    0xE765: 0x8EFB,
    0xE766: 0x8EEB,
    0xE767: 0x8EFE,
    0xE768: 0x8F0A,
    0xE769: 0x8F05,
    0xE76A: 0x8F15,
    0xE76B: 0x8F12,
    0xE76C: 0x8F19,
    0xE76D: 0x8F13,
    0xE76E: 0x8F1C,
    0xE76F: 0x8F1F,
    0xE770: 0x8F1B,
    0xE771: 0x8F0C,
    0xE772: 0x8F26,
    0xE773: 0x8F33,
    0xE774: 0x8F3B,
    0xE775: 0x8F39,
    0xE776: 0x8F45,
    0xE777: 0x8F42,
    0xE778: 0x8F3E,
    0xE779: 0x8F4C,
    0xE77A: 0x8F49,
    0xE77B: 0x8F46,
    0xE77C: 0x8F4E,
    0xE77D: 0x8F57,
    0xE77E: 0x8F5C,
    0xE780: 0x8F62,
    0xE781: 0x8F63,
    0xE782: 0x8F64,
    0xE783: 0x8F9C,
    0xE784: 0x8F9F,
    0xE785: 0x8FA3,
    0xE786: 0x8FAD,
    0xE787: 0x8FAF,
    0xE788: 0x8FB7,
    0xE789: 0x8FDA,
    0xE78A: 0x8FE5,
    0xE78B: 0x8FE2,
    0xE78C: 0x8FEA,
    0xE78D: 0x8FEF,
    0xE78E: 0x9087,
    0xE78F: 0x8FF4,
    0xE790: 0x9005,
    0xE791: 0x8FF9,
    0xE792: 0x8FFA,
    0xE793: 0x9011,
    0xE794: 0x9015,
    0xE795: 0x9021,
    0xE796: 0x900D,
    0xE797: 0x901E,
    0xE798: 0x9016,
    0xE799: 0x900B,
    0xE79A: 0x9027,
    0xE79B: 0x9036,
    0xE79C: 0x9035,
    0xE79D: 0x9039,
    0xE79E: 0x8FF8,
    0xE79F: 0x904F,
    0xE7A0: 0x9050,
    0xE7A1: 0x9051,
    0xE7A2: 0x9052,
    0xE7A3: 0x900E,
    0xE7A4: 0x9049,
    0xE7A5: 0x903E,
    0xE7A6: 0x9056,
    0xE7A7: 0x9058,
    0xE7A8: 0x905E,
    0xE7A9: 0x9068,
    0xE7AA: 0x906F,
    0xE7AB: 0x9076,
    0xE7AC: 0x96A8,
    0xE7AD: 0x9072,
    0xE7AE: 0x9082,
    0xE7AF: 0x907D,
    0xE7B0: 0x9081,
    0xE7B1: 0x9080,
    0xE7B2: 0x908A,
    0xE7B3: 0x9089,
    0xE7B4: 0x908F,
    0xE7B5: 0x90A8,
    0xE7B6: 0x90AF,
    0xE7B7: 0x90B1,
    0xE7B8: 0x90B5,
    0xE7B9: 0x90E2,
    0xE7BA: 0x90E4,
    0xE7BB: 0x6248,
    0xE7BC: 0x90DB,
    0xE7BD: 0x9102,
    0xE7BE: 0x9112,
    0xE7BF: 0x9119,
    0xE7C0: 0x9132,
    0xE7C1: 0x9130,
    0xE7C2: 0x914A,
    0xE7C3: 0x9156,
    0xE7C4: 0x9158,
    0xE7C5: 0x9163,
    0xE7C6: 0x9165,
    0xE7C7: 0x9169,
    0xE7C8: 0x9173,
    0xE7C9: 0x9172,
    0xE7CA: 0x918B,
    0xE7CB: 0x9189,
    0xE7CC: 0x9182,
    0xE7CD: 0x91A2,
    0xE7CE: 0x91AB,
    0xE7CF: 0x91AF,
    0xE7D0: 0x91AA,
    0xE7D1: 0x91B5,
    0xE7D2: 0x91B4,
    0xE7D3: 0x91BA,
    0xE7D4: 0x91C0,
    0xE7D5: 0x91C1,
    0xE7D6: 0x91C9,
    0xE7D7: 0x91CB,
    0xE7D8: 0x91D0,
    0xE7D9: 0x91D6,
    0xE7DA: 0x91DF,
    0xE7DB: 0x91E1,
    0xE7DC: 0x91DB,
    0xE7DD: 0x91FC,
    0xE7DE: 0x91F5,
    0xE7DF: 0x91F6,
    0xE7E0: 0x921E,
    0xE7E1: 0x91FF,
    0xE7E2: 0x9214,
    0xE7E3: 0x922C,
    0xE7E4: 0x9215,
    0xE7E5: 0x9211,
    0xE7E6: 0x925E,
    0xE7E7: 0x9257,
    0xE7E8: 0x9245,
    0xE7E9: 0x9249,
    0xE7EA: 0x9264,
    0xE7EB: 0x9248,
    0xE7EC: 0x9295,
    0xE7ED: 0x923F,
    0xE7EE: 0x924B,
    0xE7EF: 0x9250,
    0xE7F0: 0x929C,
    0xE7F1: 0x9296,
    0xE7F2: 0x9293,
    0xE7F3: 0x929B,
    0xE7F4: 0x925A,
    0xE7F5: 0x92CF,
    0xE7F6: 0x92B9,
    0xE7F7: 0x92B7,
    0xE7F8: 0x92E9,
    0xE7F9: 0x930F,
    0xE7FA: 0x92FA,
    0xE7FB: 0x9344,
    0xE7FC: 0x932E,
    0xE840: 0x9319,
    0xE841: 0x9322,
    0xE842: 0x931A,
    0xE843: 0x9323,
    0xE844: 0x933A,
    0xE845: 0x9335,
    0xE846: 0x933B,
    0xE847: 0x935C,
    0xE848: 0x9360,
    0xE849: 0x937C,
    0xE84A: 0x936E,
    0xE84B: 0x9356,
    0xE84C: 0x93B0,
    0xE84D: 0x93AC,
    0xE84E: 0x93AD,
    0xE84F: 0x9394,
    0xE850: 0x93B9,
    0xE851: 0x93D6,
    0xE852: 0x93D7,
    0xE853: 0x93E8,
    0xE854: 0x93E5,
    0xE855: 0x93D8,
    0xE856: 0x93C3,
    0xE857: 0x93DD,
    0xE858: 0x93D0,
    0xE859: 0x93C8,
    0xE85A: 0x93E4,
    0xE85B: 0x941A,
    0xE85C: 0x9414,
    0xE85D: 0x9413,
    0xE85E: 0x9403,
    0xE85F: 0x9407,
    0xE860: 0x9410,
    0xE861: 0x9436,
    0xE862: 0x942B,
    0xE863: 0x9435,
    0xE864: 0x9421,
    0xE865: 0x943A,
    0xE866: 0x9441,
    0xE867: 0x9452,
    0xE868: 0x9444,
    0xE869: 0x945B,
    0xE86A: 0x9460,
    0xE86B: 0x9462,
    0xE86C: 0x945E,
    0xE86D: 0x946A,
    0xE86E: 0x9229,
    0xE86F: 0x9470,
    0xE870: 0x9475,
    0xE871: 0x9477,
    0xE872: 0x947D,
    0xE873: 0x945A,
    0xE874: 0x947C,
    0xE875: 0x947E,
    0xE876: 0x9481,
    0xE877: 0x947F,
    0xE878: 0x9582,
    0xE879: 0x9587,
    0xE87A: 0x958A,
    0xE87B: 0x9594,
    0xE87C: 0x9596,
    0xE87D: 0x9598,
    0xE87E: 0x9599,
    0xE880: 0x95A0,
    0xE881: 0x95A8,
    0xE882: 0x95A7,
    0xE883: 0x95AD,
    0xE884: 0x95BC,
    0xE885: 0x95BB,
    0xE886: 0x95B9,
    0xE887: 0x95BE,
    0xE888: 0x95CA,
    0xE889: 0x6FF6,
    0xE88A: 0x95C3,
    0xE88B: 0x95CD,
    0xE88C: 0x95CC,
    0xE88D: 0x95D5,
    0xE88E: 0x95D4,
    0xE88F: 0x95D6,
    0xE890: 0x95DC,
    0xE891: 0x95E1,
    0xE892: 0x95E5,
    0xE893: 0x95E2,
    0xE894: 0x9621,
    0xE895: 0x9628,
    0xE896: 0x962E,
    0xE897: 0x962F,
    0xE898: 0x9642,
    0xE899: 0x964C,
    0xE89A: 0x964F,
    0xE89B: 0x964B,
    0xE89C: 0x9677,
    0xE89D: 0x965C,
    0xE89E: 0x965E,
    0xE89F: 0x965D,
    0xE8A0: 0x965F,
    0xE8A1: 0x9666,
    0xE8A2: 0x9672,
    0xE8A3: 0x966C,
    0xE8A4: 0x968D,
    0xE8A5: 0x9698,
    0xE8A6: 0x9695,
    0xE8A7: 0x9697,
    0xE8A8: 0x96AA,
    0xE8A9: 0x96A7,
    0xE8AA: 0x96B1,
    0xE8AB: 0x96B2,
    0xE8AC: 0x96B0,
    0xE8AD: 0x96B4,
    0xE8AE: 0x96B6,
    0xE8AF: 0x96B8,
    0xE8B0: 0x96B9,
    0xE8B1: 0x96CE,
    0xE8B2: 0x96CB,
    0xE8B3: 0x96C9,
    0xE8B4: 0x96CD,
    0xE8B5: 0x894D,
    0xE8B6: 0x96DC,
    0xE8B7: 0x970D,
    0xE8B8: 0x96D5,
    0xE8B9: 0x96F9,
    0xE8BA: 0x9704,
    0xE8BB: 0x9706,
    0xE8BC: 0x9708,
    0xE8BD: 0x9713,
    0xE8BE: 0x970E,
    0xE8BF: 0x9711,
    0xE8C0: 0x970F,
    0xE8C1: 0x9716,
    0xE8C2: 0x9719,
    0xE8C3: 0x9724,
    0xE8C4: 0x972A,
    0xE8C5: 0x9730,
    0xE8C6: 0x9739,
    0xE8C7: 0x973D,
    0xE8C8: 0x973E,
    0xE8C9: 0x9744,
    0xE8CA: 0x9746,
    0xE8CB: 0x9748,
    0xE8CC: 0x9742,
    0xE8CD: 0x9749,
    0xE8CE: 0x975C,
    0xE8CF: 0x9760,
    0xE8D0: 0x9764,
    0xE8D1: 0x9766,
    0xE8D2: 0x9768,
    0xE8D3: 0x52D2,
    0xE8D4: 0x976B,
    0xE8D5: 0x9771,
    0xE8D6: 0x9779,
    0xE8D7: 0x9785,
    0xE8D8: 0x977C,
    0xE8D9: 0x9781,
    0xE8DA: 0x977A,
    0xE8DB: 0x9786,
    0xE8DC: 0x978B,
    0xE8DD: 0x978F,
    0xE8DE: 0x9790,
    0xE8DF: 0x979C,
    0xE8E0: 0x97A8,
    0xE8E1: 0x97A6,
    0xE8E2: 0x97A3,
    0xE8E3: 0x97B3,
    0xE8E4: 0x97B4,
    0xE8E5: 0x97C3,
    0xE8E6: 0x97C6,
    0xE8E7: 0x97C8,
    0xE8E8: 0x97CB,
    0xE8E9: 0x97DC,
    0xE8EA: 0x97ED,
    0xE8EB: 0x9F4F,
    0xE8EC: 0x97F2,
    0xE8ED: 0x7ADF,
    0xE8EE: 0x97F6,
    0xE8EF: 0x97F5,
    0xE8F0: 0x980F,
    0xE8F1: 0x980C,
    0xE8F2: 0x9838,
    0xE8F3: 0x9824,
    0xE8F4: 0x9821,
    0xE8F5: 0x9837,
    0xE8F6: 0x983D,
    0xE8F7: 0x9846,
    0xE8F8: 0x984F,
    0xE8F9: 0x984B,
    0xE8FA: 0x986B,
    0xE8FB: 0x986F,
    0xE8FC: 0x9870,
    0xE940: 0x9871,
    0xE941: 0x9874,
    0xE942: 0x9873,
    0xE943: 0x98AA,
    0xE944: 0x98AF,
    0xE945: 0x98B1,
    0xE946: 0x98B6,
    0xE947: 0x98C4,
    0xE948: 0x98C3,
    0xE949: 0x98C6,
    0xE94A: 0x98E9,
    0xE94B: 0x98EB,
    0xE94C: 0x9903,
    0xE94D: 0x9909,
    0xE94E: 0x9912,
    0xE94F: 0x9914,
    0xE950: 0x9918,
    0xE951: 0x9921,
    0xE952: 0x991D,
    0xE953: 0x991E,
    0xE954: 0x9924,
    0xE955: 0x9920,
    0xE956: 0x992C,
    0xE957: 0x992E,
    0xE958: 0x993D,
    0xE959: 0x993E,
    0xE95A: 0x9942,
    0xE95B: 0x9949,
    0xE95C: 0x9945,
    0xE95D: 0x9950,
    0xE95E: 0x994B,
    0xE95F: 0x9951,
    0xE960: 0x9952,
    0xE961: 0x994C,
    0xE962: 0x9955,
    0xE963: 0x9997,
    0xE964: 0x9998,
    0xE965: 0x99A5,
    0xE966: 0x99AD,
    0xE967: 0x99AE,
    0xE968: 0x99BC,
    0xE969: 0x99DF,
    0xE96A: 0x99DB,
    0xE96B: 0x99DD,
    0xE96C: 0x99D8,
    0xE96D: 0x99D1,
    0xE96E: 0x99ED,
    0xE96F: 0x99EE,
    0xE970: 0x99F1,
    0xE971: 0x99F2,
    0xE972: 0x99FB,
    0xE973: 0x99F8,
    0xE974: 0x9A01,
    0xE975: 0x9A0F,
    0xE976: 0x9A05,
    0xE977: 0x99E2,
    0xE978: 0x9A19,
    0xE979: 0x9A2B,
    0xE97A: 0x9A37,
    0xE97B: 0x9A45,
    0xE97C: 0x9A42,
    0xE97D: 0x9A40,
    0xE97E: 0x9A43,
    0xE980: 0x9A3E,
    0xE981: 0x9A55,
    0xE982: 0x9A4D,
    0xE983: 0x9A5B,
    0xE984: 0x9A57,
    0xE985: 0x9A5F,
    0xE986: 0x9A62,
    0xE987: 0x9A65,
    0xE988: 0x9A64,
    0xE989: 0x9A69,
    0xE98A: 0x9A6B,
    0xE98B: 0x9A6A,
    0xE98C: 0x9AAD,
    0xE98D: 0x9AB0,
    0xE98E: 0x9ABC,
    0xE98F: 0x9AC0,
    0xE990: 0x9ACF,
    0xE991: 0x9AD1,
    0xE992: 0x9AD3,
    0xE993: 0x9AD4,
    0xE994: 0x9ADE,
    0xE995: 0x9ADF,
    0xE996: 0x9AE2,
    0xE997: 0x9AE3,
    0xE998: 0x9AE6,
    0xE999: 0x9AEF,
    0xE99A: 0x9AEB,
    0xE99B: 0x9AEE,
    0xE99C: 0x9AF4,
    0xE99D: 0x9AF1,
    0xE99E: 0x9AF7,
    0xE99F: 0x9AFB,
    0xE9A0: 0x9B06,
    0xE9A1: 0x9B18,
    0xE9A2: 0x9B1A,
    0xE9A3: 0x9B1F,
    0xE9A4: 0x9B22,
    0xE9A5: 0x9B23,
    0xE9A6: 0x9B25,
    0xE9A7: 0x9B27,
    0xE9A8: 0x9B28,
    0xE9A9: 0x9B29,
    0xE9AA: 0x9B2A,
    0xE9AB: 0x9B2E,
    0xE9AC: 0x9B2F,
    0xE9AD: 0x9B32,
    0xE9AE: 0x9B44,
    0xE9AF: 0x9B43,
    0xE9B0: 0x9B4F,
    0xE9B1: 0x9B4D,
    0xE9B2: 0x9B4E,
    0xE9B3: 0x9B51,
    0xE9B4: 0x9B58,
    0xE9B5: 0x9B74,
    0xE9B6: 0x9B93,
    0xE9B7: 0x9B83,
    0xE9B8: 0x9B91,
    0xE9B9: 0x9B96,
    0xE9BA: 0x9B97,
    0xE9BB: 0x9B9F,
    0xE9BC: 0x9BA0,
    0xE9BD: 0x9BA8,
    0xE9BE: 0x9BB4,
    0xE9BF: 0x9BC0,
    0xE9C0: 0x9BCA,
    0xE9C1: 0x9BB9,
    0xE9C2: 0x9BC6,
    0xE9C3: 0x9BCF,
    0xE9C4: 0x9BD1,
    0xE9C5: 0x9BD2,
    0xE9C6: 0x9BE3,
    0xE9C7: 0x9BE2,
    0xE9C8: 0x9BE4,
    0xE9C9: 0x9BD4,
    0xE9CA: 0x9BE1,
    0xE9CB: 0x9C3A,
    0xE9CC: 0x9BF2,
    0xE9CD: 0x9BF1,
    0xE9CE: 0x9BF0,
    0xE9CF: 0x9C15,
    0xE9D0: 0x9C14,
    0xE9D1: 0x9C09,
    0xE9D2: 0x9C13,
    0xE9D3: 0x9C0C,
    0xE9D4: 0x9C06,
    0xE9D5: 0x9C08,
    0xE9D6: 0x9C12,
    0xE9D7: 0x9C0A,
    0xE9D8: 0x9C04,
    0xE9D9: 0x9C2E,
    0xE9DA: 0x9C1B,
    0xE9DB: 0x9C25,
    0xE9DC: 0x9C24,
    0xE9DD: 0x9C21,
    0xE9DE: 0x9C30,
    0xE9DF: 0x9C47,
    0xE9E0: 0x9C32,
    0xE9E1: 0x9C46,
    0xE9E2: 0x9C3E,
    0xE9E3: 0x9C5A,
    0xE9E4: 0x9C60,
    0xE9E5: 0x9C67,
    0xE9E6: 0x9C76,
    0xE9E7: 0x9C78,
    0xE9E8: 0x9CE7,
    0xE9E9: 0x9CEC,
    0xE9EA: 0x9CF0,
    0xE9EB: 0x9D09,
    0xE9EC: 0x9D08,
    0xE9ED: 0x9CEB,
    0xE9EE: 0x9D03,
    0xE9EF: 0x9D06,
    0xE9F0: 0x9D2A,
    0xE9F1: 0x9D26,
    0xE9F2: 0x9DAF,
    0xE9F3: 0x9D23,
    0xE9F4: 0x9D1F,
    0xE9F5: 0x9D44,
    0xE9F6: 0x9D15,
    0xE9F7: 0x9D12,
    0xE9F8: 0x9D41,
    0xE9F9: 0x9D3F,
    0xE9FA: 0x9D3E,
    0xE9FB: 0x9D46,
    0xE9FC: 0x9D48,
    0xEA40: 0x9D5D,
    0xEA41: 0x9D5E,
    0xEA42: 0x9D64,
    0xEA43: 0x9D51,
    0xEA44: 0x9D50,
    0xEA45: 0x9D59,
    0xEA46: 0x9D72,
    0xEA47: 0x9D89,
    0xEA48: 0x9D87,
    0xEA49: 0x9DAB,
    0xEA4A: 0x9D6F,
    0xEA4B: 0x9D7A,
    0xEA4C: 0x9D9A,
    0xEA4D: 0x9DA4,
    0xEA4E: 0x9DA9,
    0xEA4F: 0x9DB2,
    0xEA50: 0x9DC4,
    0xEA51: 0x9DC1,
    0xEA52: 0x9DBB,
    0xEA53: 0x9DB8,
    0xEA54: 0x9DBA,
    0xEA55: 0x9DC6,
    0xEA56: 0x9DCF,
    0xEA57: 0x9DC2,
    0xEA58: 0x9DD9,
    0xEA59: 0x9DD3,
    0xEA5A: 0x9DF8,
    0xEA5B: 0x9DE6,
    0xEA5C: 0x9DED,
    0xEA5D: 0x9DEF,
    0xEA5E: 0x9DFD,
    0xEA5F: 0x9E1A,
    0xEA60: 0x9E1B,
    0xEA61: 0x9E1E,
    0xEA62: 0x9E75,
    0xEA63: 0x9E79,
    0xEA64: 0x9E7D,
    0xEA65: 0x9E81,
    0xEA66: 0x9E88,
    0xEA67: 0x9E8B,
    0xEA68: 0x9E8C,
    0xEA69: 0x9E92,
    0xEA6A: 0x9E95,
    0xEA6B: 0x9E91,
    0xEA6C: 0x9E9D,
    0xEA6D: 0x9EA5,
    0xEA6E: 0x9EA9,
    0xEA6F: 0x9EB8,
    0xEA70: 0x9EAA,
    0xEA71: 0x9EAD,
    0xEA72: 0x9761,
    0xEA73: 0x9ECC,
    0xEA74: 0x9ECE,
    0xEA75: 0x9ECF,
    0xEA76: 0x9ED0,
    0xEA77: 0x9ED4,
    0xEA78: 0x9EDC,
    0xEA79: 0x9EDE,
    0xEA7A: 0x9EDD,
    0xEA7B: 0x9EE0,
    0xEA7C: 0x9EE5,
    0xEA7D: 0x9EE8,
    0xEA7E: 0x9EEF,
    0xEA80: 0x9EF4,
    0xEA81: 0x9EF6,
    0xEA82: 0x9EF7,
    0xEA83: 0x9EF9,
    0xEA84: 0x9EFB,
    0xEA85: 0x9EFC,
    0xEA86: 0x9EFD,
    0xEA87: 0x9F07,
    0xEA88: 0x9F08,
    0xEA89: 0x76B7,
    0xEA8A: 0x9F15,
    0xEA8B: 0x9F21,
    0xEA8C: 0x9F2C,
    0xEA8D: 0x9F3E,
    0xEA8E: 0x9F4A,
    0xEA8F: 0x9F52,
    0xEA90: 0x9F54,
    0xEA91: 0x9F63,
    0xEA92: 0x9F5F,
    0xEA93: 0x9F60,
    0xEA94: 0x9F61,
    0xEA95: 0x9F66,
    0xEA96: 0x9F67,
    0xEA97: 0x9F6C,
    0xEA98: 0x9F6A,
    0xEA99: 0x9F77,
    0xEA9A: 0x9F72,
    0xEA9B: 0x9F76,
    0xEA9C: 0x9F95,
    0xEA9D: 0x9F9C,
    0xEA9E: 0x9FA0,
    0xEA9F: 0x582F,
    0xEAA0: 0x69C7,
    0xEAA1: 0x9059,
    0xEAA2: 0x7464,
    0xEAA3: 0x51DC,
    0xEAA4: 0x7199,
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GenericGF_1 = __webpack_require__(1);
var GenericGFPoly_1 = __webpack_require__(2);
function runEuclideanAlgorithm(field, a, b, R) {
    var _a;
    // Assume a's degree is >= b's
    if (a.degree() < b.degree()) {
        _a = [b, a], a = _a[0], b = _a[1];
    }
    var rLast = a;
    var r = b;
    var tLast = field.zero;
    var t = field.one;
    // Run Euclidean algorithm until r's degree is less than R/2
    while (r.degree() >= R / 2) {
        var rLastLast = rLast;
        var tLastLast = tLast;
        rLast = r;
        tLast = t;
        // Divide rLastLast by rLast, with quotient in q and remainder in r
        if (rLast.isZero()) {
            // Euclidean algorithm already terminated?
            return null;
        }
        r = rLastLast;
        var q = field.zero;
        var denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
        var dltInverse = field.inverse(denominatorLeadingTerm);
        while (r.degree() >= rLast.degree() && !r.isZero()) {
            var degreeDiff = r.degree() - rLast.degree();
            var scale = field.multiply(r.getCoefficient(r.degree()), dltInverse);
            q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
            r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
        }
        t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
        if (r.degree() >= rLast.degree()) {
            return null;
        }
    }
    var sigmaTildeAtZero = t.getCoefficient(0);
    if (sigmaTildeAtZero === 0) {
        return null;
    }
    var inverse = field.inverse(sigmaTildeAtZero);
    return [t.multiply(inverse), r.multiply(inverse)];
}
function findErrorLocations(field, errorLocator) {
    // This is a direct application of Chien's search
    var numErrors = errorLocator.degree();
    if (numErrors === 1) {
        return [errorLocator.getCoefficient(1)];
    }
    var result = new Array(numErrors);
    var errorCount = 0;
    for (var i = 1; i < field.size && errorCount < numErrors; i++) {
        if (errorLocator.evaluateAt(i) === 0) {
            result[errorCount] = field.inverse(i);
            errorCount++;
        }
    }
    if (errorCount !== numErrors) {
        return null;
    }
    return result;
}
function findErrorMagnitudes(field, errorEvaluator, errorLocations) {
    // This is directly applying Forney's Formula
    var s = errorLocations.length;
    var result = new Array(s);
    for (var i = 0; i < s; i++) {
        var xiInverse = field.inverse(errorLocations[i]);
        var denominator = 1;
        for (var j = 0; j < s; j++) {
            if (i !== j) {
                denominator = field.multiply(denominator, GenericGF_1.addOrSubtractGF(1, field.multiply(errorLocations[j], xiInverse)));
            }
        }
        result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
        if (field.generatorBase !== 0) {
            result[i] = field.multiply(result[i], xiInverse);
        }
    }
    return result;
}
function decode(bytes, twoS) {
    var outputBytes = new Uint8ClampedArray(bytes.length);
    outputBytes.set(bytes);
    var field = new GenericGF_1.default(0x011D, 256, 0); // x^8 + x^4 + x^3 + x^2 + 1
    var poly = new GenericGFPoly_1.default(field, outputBytes);
    var syndromeCoefficients = new Uint8ClampedArray(twoS);
    var error = false;
    for (var s = 0; s < twoS; s++) {
        var evaluation = poly.evaluateAt(field.exp(s + field.generatorBase));
        syndromeCoefficients[syndromeCoefficients.length - 1 - s] = evaluation;
        if (evaluation !== 0) {
            error = true;
        }
    }
    if (!error) {
        return outputBytes;
    }
    var syndrome = new GenericGFPoly_1.default(field, syndromeCoefficients);
    var sigmaOmega = runEuclideanAlgorithm(field, field.buildMonomial(twoS, 1), syndrome, twoS);
    if (sigmaOmega === null) {
        return null;
    }
    var errorLocations = findErrorLocations(field, sigmaOmega[0]);
    if (errorLocations == null) {
        return null;
    }
    var errorMagnitudes = findErrorMagnitudes(field, sigmaOmega[1], errorLocations);
    for (var i = 0; i < errorLocations.length; i++) {
        var position = outputBytes.length - 1 - field.log(errorLocations[i]);
        if (position < 0) {
            return null;
        }
        outputBytes[position] = GenericGF_1.addOrSubtractGF(outputBytes[position], errorMagnitudes[i]);
    }
    return outputBytes;
}
exports.decode = decode;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSIONS = [
    {
        infoBits: null,
        versionNumber: 1,
        alignmentPatternCenters: [],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 7,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 19 }],
            },
            {
                ecCodewordsPerBlock: 10,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
            },
            {
                ecCodewordsPerBlock: 13,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 13 }],
            },
            {
                ecCodewordsPerBlock: 17,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 9 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 2,
        alignmentPatternCenters: [6, 18],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 10,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 34 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 28 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 22 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 3,
        alignmentPatternCenters: [6, 22],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 15,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 55 }],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 44 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 17 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 13 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 4,
        alignmentPatternCenters: [6, 26],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 80 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 32 }],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 24 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 9 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 5,
        alignmentPatternCenters: [6, 30],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 108 }],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 43 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                    { numBlocks: 2, dataCodewordsPerBlock: 16 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 11 },
                    { numBlocks: 2, dataCodewordsPerBlock: 12 },
                ],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 6,
        alignmentPatternCenters: [6, 34],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 68 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 27 }],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 19 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 15 }],
            },
        ],
    },
    {
        infoBits: 0x07C94,
        versionNumber: 7,
        alignmentPatternCenters: [6, 22, 38],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 78 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 31 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 4, dataCodewordsPerBlock: 15 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 13 },
                    { numBlocks: 1, dataCodewordsPerBlock: 14 },
                ],
            },
        ],
    },
    {
        infoBits: 0x085BC,
        versionNumber: 8,
        alignmentPatternCenters: [6, 24, 42],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 97 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 38 },
                    { numBlocks: 2, dataCodewordsPerBlock: 39 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 18 },
                    { numBlocks: 2, dataCodewordsPerBlock: 19 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 14 },
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x09A99,
        versionNumber: 9,
        alignmentPatternCenters: [6, 26, 46],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 116 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 36 },
                    { numBlocks: 2, dataCodewordsPerBlock: 37 },
                ],
            },
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 16 },
                    { numBlocks: 4, dataCodewordsPerBlock: 17 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 12 },
                    { numBlocks: 4, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0A4D3,
        versionNumber: 10,
        alignmentPatternCenters: [6, 28, 50],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 68 },
                    { numBlocks: 2, dataCodewordsPerBlock: 69 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 43 },
                    { numBlocks: 1, dataCodewordsPerBlock: 44 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 19 },
                    { numBlocks: 2, dataCodewordsPerBlock: 20 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 15 },
                    { numBlocks: 2, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0BBF6,
        versionNumber: 11,
        alignmentPatternCenters: [6, 30, 54],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 81 }],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 50 },
                    { numBlocks: 4, dataCodewordsPerBlock: 51 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 22 },
                    { numBlocks: 4, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 12 },
                    { numBlocks: 8, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0C762,
        versionNumber: 12,
        alignmentPatternCenters: [6, 32, 58],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 92 },
                    { numBlocks: 2, dataCodewordsPerBlock: 93 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 36 },
                    { numBlocks: 2, dataCodewordsPerBlock: 37 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 20 },
                    { numBlocks: 6, dataCodewordsPerBlock: 21 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 14 },
                    { numBlocks: 4, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0D847,
        versionNumber: 13,
        alignmentPatternCenters: [6, 34, 62],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 107 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 37 },
                    { numBlocks: 1, dataCodewordsPerBlock: 38 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 20 },
                    { numBlocks: 4, dataCodewordsPerBlock: 21 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 11 },
                    { numBlocks: 4, dataCodewordsPerBlock: 12 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0E60D,
        versionNumber: 14,
        alignmentPatternCenters: [6, 26, 46, 66],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 115 },
                    { numBlocks: 1, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 40 },
                    { numBlocks: 5, dataCodewordsPerBlock: 41 },
                ],
            },
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 16 },
                    { numBlocks: 5, dataCodewordsPerBlock: 17 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 12 },
                    { numBlocks: 5, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0F928,
        versionNumber: 15,
        alignmentPatternCenters: [6, 26, 48, 70],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 87 },
                    { numBlocks: 1, dataCodewordsPerBlock: 88 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 41 },
                    { numBlocks: 5, dataCodewordsPerBlock: 42 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 24 },
                    { numBlocks: 7, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 12 },
                    { numBlocks: 7, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x10B78,
        versionNumber: 16,
        alignmentPatternCenters: [6, 26, 50, 74],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 98 },
                    { numBlocks: 1, dataCodewordsPerBlock: 99 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 45 },
                    { numBlocks: 3, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 19 },
                    { numBlocks: 2, dataCodewordsPerBlock: 20 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 15 },
                    { numBlocks: 13, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1145D,
        versionNumber: 17,
        alignmentPatternCenters: [6, 30, 54, 78],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 107 },
                    { numBlocks: 5, dataCodewordsPerBlock: 108 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 46 },
                    { numBlocks: 1, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 22 },
                    { numBlocks: 15, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 17, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x12A17,
        versionNumber: 18,
        alignmentPatternCenters: [6, 30, 56, 82],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 120 },
                    { numBlocks: 1, dataCodewordsPerBlock: 121 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 9, dataCodewordsPerBlock: 43 },
                    { numBlocks: 4, dataCodewordsPerBlock: 44 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 22 },
                    { numBlocks: 1, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x13532,
        versionNumber: 19,
        alignmentPatternCenters: [6, 30, 58, 86],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 113 },
                    { numBlocks: 4, dataCodewordsPerBlock: 114 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 44 },
                    { numBlocks: 11, dataCodewordsPerBlock: 45 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 21 },
                    { numBlocks: 4, dataCodewordsPerBlock: 22 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 9, dataCodewordsPerBlock: 13 },
                    { numBlocks: 16, dataCodewordsPerBlock: 14 },
                ],
            },
        ],
    },
    {
        infoBits: 0x149A6,
        versionNumber: 20,
        alignmentPatternCenters: [6, 34, 62, 90],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 107 },
                    { numBlocks: 5, dataCodewordsPerBlock: 108 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 41 },
                    { numBlocks: 13, dataCodewordsPerBlock: 42 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 24 },
                    { numBlocks: 5, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 15 },
                    { numBlocks: 10, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x15683,
        versionNumber: 21,
        alignmentPatternCenters: [6, 28, 50, 72, 94],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 116 },
                    { numBlocks: 4, dataCodewordsPerBlock: 117 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 42 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 22 },
                    { numBlocks: 6, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 16 },
                    { numBlocks: 6, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x168C9,
        versionNumber: 22,
        alignmentPatternCenters: [6, 26, 50, 74, 98],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 111 },
                    { numBlocks: 7, dataCodewordsPerBlock: 112 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 46 }],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 24 },
                    { numBlocks: 16, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 34, dataCodewordsPerBlock: 13 }],
            },
        ],
    },
    {
        infoBits: 0x177EC,
        versionNumber: 23,
        alignmentPatternCenters: [6, 30, 54, 74, 102],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 121 },
                    { numBlocks: 5, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 47 },
                    { numBlocks: 14, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 16, dataCodewordsPerBlock: 15 },
                    { numBlocks: 14, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x18EC4,
        versionNumber: 24,
        alignmentPatternCenters: [6, 28, 54, 80, 106],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 117 },
                    { numBlocks: 4, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 45 },
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 24 },
                    { numBlocks: 16, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 30, dataCodewordsPerBlock: 16 },
                    { numBlocks: 2, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x191E1,
        versionNumber: 25,
        alignmentPatternCenters: [6, 32, 58, 84, 110],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 106 },
                    { numBlocks: 4, dataCodewordsPerBlock: 107 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 47 },
                    { numBlocks: 13, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 24 },
                    { numBlocks: 22, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 15 },
                    { numBlocks: 13, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1AFAB,
        versionNumber: 26,
        alignmentPatternCenters: [6, 30, 58, 86, 114],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 114 },
                    { numBlocks: 2, dataCodewordsPerBlock: 115 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 46 },
                    { numBlocks: 4, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 28, dataCodewordsPerBlock: 22 },
                    { numBlocks: 6, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 33, dataCodewordsPerBlock: 16 },
                    { numBlocks: 4, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1B08E,
        versionNumber: 27,
        alignmentPatternCenters: [6, 34, 62, 90, 118],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 122 },
                    { numBlocks: 4, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 45 },
                    { numBlocks: 3, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 23 },
                    { numBlocks: 26, dataCodewordsPerBlock: 24 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 15 },
                    { numBlocks: 28, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1CC1A,
        versionNumber: 28,
        alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 117 },
                    { numBlocks: 10, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 45 },
                    { numBlocks: 23, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 24 },
                    { numBlocks: 31, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 15 },
                    { numBlocks: 31, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1D33F,
        versionNumber: 29,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 116 },
                    { numBlocks: 7, dataCodewordsPerBlock: 117 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 21, dataCodewordsPerBlock: 45 },
                    { numBlocks: 7, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 23 },
                    { numBlocks: 37, dataCodewordsPerBlock: 24 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                    { numBlocks: 26, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1ED75,
        versionNumber: 30,
        alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 115 },
                    { numBlocks: 10, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 47 },
                    { numBlocks: 10, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 24 },
                    { numBlocks: 25, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 23, dataCodewordsPerBlock: 15 },
                    { numBlocks: 25, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1F250,
        versionNumber: 31,
        alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 115 },
                    { numBlocks: 3, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 46 },
                    { numBlocks: 29, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 42, dataCodewordsPerBlock: 24 },
                    { numBlocks: 1, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 23, dataCodewordsPerBlock: 15 },
                    { numBlocks: 28, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x209D5,
        versionNumber: 32,
        alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 115 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 46 },
                    { numBlocks: 23, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 24 },
                    { numBlocks: 35, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                    { numBlocks: 35, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x216F0,
        versionNumber: 33,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 115 },
                    { numBlocks: 1, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                    { numBlocks: 21, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 29, dataCodewordsPerBlock: 24 },
                    { numBlocks: 19, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 15 },
                    { numBlocks: 46, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x228BA,
        versionNumber: 34,
        alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 115 },
                    { numBlocks: 6, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                    { numBlocks: 23, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 44, dataCodewordsPerBlock: 24 },
                    { numBlocks: 7, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 59, dataCodewordsPerBlock: 16 },
                    { numBlocks: 1, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x2379F,
        versionNumber: 35,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 121 },
                    { numBlocks: 7, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 47 },
                    { numBlocks: 26, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 39, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 15 },
                    { numBlocks: 41, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x24B0B,
        versionNumber: 36,
        alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 121 },
                    { numBlocks: 14, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 47 },
                    { numBlocks: 34, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 46, dataCodewordsPerBlock: 24 },
                    { numBlocks: 10, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                    { numBlocks: 64, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x2542E,
        versionNumber: 37,
        alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 122 },
                    { numBlocks: 4, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 29, dataCodewordsPerBlock: 46 },
                    { numBlocks: 14, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 49, dataCodewordsPerBlock: 24 },
                    { numBlocks: 10, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 24, dataCodewordsPerBlock: 15 },
                    { numBlocks: 46, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x26A64,
        versionNumber: 38,
        alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 122 },
                    { numBlocks: 18, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 46 },
                    { numBlocks: 32, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 48, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 42, dataCodewordsPerBlock: 15 },
                    { numBlocks: 32, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x27541,
        versionNumber: 39,
        alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 20, dataCodewordsPerBlock: 117 },
                    { numBlocks: 4, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 40, dataCodewordsPerBlock: 47 },
                    { numBlocks: 7, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 43, dataCodewordsPerBlock: 24 },
                    { numBlocks: 22, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 15 },
                    { numBlocks: 67, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x28C69,
        versionNumber: 40,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 118 },
                    { numBlocks: 6, dataCodewordsPerBlock: 119 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 18, dataCodewordsPerBlock: 47 },
                    { numBlocks: 31, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 34, dataCodewordsPerBlock: 24 },
                    { numBlocks: 34, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 20, dataCodewordsPerBlock: 15 },
                    { numBlocks: 61, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
];


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix_1 = __webpack_require__(0);
function squareToQuadrilateral(p1, p2, p3, p4) {
    var dx3 = p1.x - p2.x + p3.x - p4.x;
    var dy3 = p1.y - p2.y + p3.y - p4.y;
    if (dx3 === 0 && dy3 === 0) { // Affine
        return {
            a11: p2.x - p1.x,
            a12: p2.y - p1.y,
            a13: 0,
            a21: p3.x - p2.x,
            a22: p3.y - p2.y,
            a23: 0,
            a31: p1.x,
            a32: p1.y,
            a33: 1,
        };
    }
    else {
        var dx1 = p2.x - p3.x;
        var dx2 = p4.x - p3.x;
        var dy1 = p2.y - p3.y;
        var dy2 = p4.y - p3.y;
        var denominator = dx1 * dy2 - dx2 * dy1;
        var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
        var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
        return {
            a11: p2.x - p1.x + a13 * p2.x,
            a12: p2.y - p1.y + a13 * p2.y,
            a13: a13,
            a21: p4.x - p1.x + a23 * p4.x,
            a22: p4.y - p1.y + a23 * p4.y,
            a23: a23,
            a31: p1.x,
            a32: p1.y,
            a33: 1,
        };
    }
}
function quadrilateralToSquare(p1, p2, p3, p4) {
    // Here, the adjoint serves as the inverse:
    var sToQ = squareToQuadrilateral(p1, p2, p3, p4);
    return {
        a11: sToQ.a22 * sToQ.a33 - sToQ.a23 * sToQ.a32,
        a12: sToQ.a13 * sToQ.a32 - sToQ.a12 * sToQ.a33,
        a13: sToQ.a12 * sToQ.a23 - sToQ.a13 * sToQ.a22,
        a21: sToQ.a23 * sToQ.a31 - sToQ.a21 * sToQ.a33,
        a22: sToQ.a11 * sToQ.a33 - sToQ.a13 * sToQ.a31,
        a23: sToQ.a13 * sToQ.a21 - sToQ.a11 * sToQ.a23,
        a31: sToQ.a21 * sToQ.a32 - sToQ.a22 * sToQ.a31,
        a32: sToQ.a12 * sToQ.a31 - sToQ.a11 * sToQ.a32,
        a33: sToQ.a11 * sToQ.a22 - sToQ.a12 * sToQ.a21,
    };
}
function times(a, b) {
    return {
        a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
        a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
        a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
        a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
        a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
        a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
        a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
        a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
        a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33,
    };
}
function extract(image, location) {
    var qToS = quadrilateralToSquare({ x: 3.5, y: 3.5 }, { x: location.dimension - 3.5, y: 3.5 }, { x: location.dimension - 6.5, y: location.dimension - 6.5 }, { x: 3.5, y: location.dimension - 3.5 });
    var sToQ = squareToQuadrilateral(location.topLeft, location.topRight, location.alignmentPattern, location.bottomLeft);
    var transform = times(sToQ, qToS);
    var matrix = BitMatrix_1.BitMatrix.createEmpty(location.dimension, location.dimension);
    var mappingFunction = function (x, y) {
        var denominator = transform.a13 * x + transform.a23 * y + transform.a33;
        return {
            x: (transform.a11 * x + transform.a21 * y + transform.a31) / denominator,
            y: (transform.a12 * x + transform.a22 * y + transform.a32) / denominator,
        };
    };
    for (var y = 0; y < location.dimension; y++) {
        for (var x = 0; x < location.dimension; x++) {
            var xValue = x + 0.5;
            var yValue = y + 0.5;
            var sourcePixel = mappingFunction(xValue, yValue);
            matrix.set(x, y, image.get(Math.floor(sourcePixel.x), Math.floor(sourcePixel.y)));
        }
    }
    return {
        matrix: matrix,
        mappingFunction: mappingFunction,
    };
}
exports.extract = extract;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MAX_FINDERPATTERNS_TO_SEARCH = 4;
var MIN_QUAD_RATIO = 0.5;
var MAX_QUAD_RATIO = 1.5;
var distance = function (a, b) { return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2)); };
function sum(values) {
    return values.reduce(function (a, b) { return a + b; });
}
// Takes three finder patterns and organizes them into topLeft, topRight, etc
function reorderFinderPatterns(pattern1, pattern2, pattern3) {
    var _a, _b, _c, _d;
    // Find distances between pattern centers
    var oneTwoDistance = distance(pattern1, pattern2);
    var twoThreeDistance = distance(pattern2, pattern3);
    var oneThreeDistance = distance(pattern1, pattern3);
    var bottomLeft;
    var topLeft;
    var topRight;
    // Assume one closest to other two is B; A and C will just be guesses at first
    if (twoThreeDistance >= oneTwoDistance && twoThreeDistance >= oneThreeDistance) {
        _a = [pattern2, pattern1, pattern3], bottomLeft = _a[0], topLeft = _a[1], topRight = _a[2];
    }
    else if (oneThreeDistance >= twoThreeDistance && oneThreeDistance >= oneTwoDistance) {
        _b = [pattern1, pattern2, pattern3], bottomLeft = _b[0], topLeft = _b[1], topRight = _b[2];
    }
    else {
        _c = [pattern1, pattern3, pattern2], bottomLeft = _c[0], topLeft = _c[1], topRight = _c[2];
    }
    // Use cross product to figure out whether bottomLeft (A) and topRight (C) are correct or flipped in relation to topLeft (B)
    // This asks whether BC x BA has a positive z component, which is the arrangement we want. If it's negative, then
    // we've got it flipped around and should swap topRight and bottomLeft.
    if (((topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y)) - ((topRight.y - topLeft.y) * (bottomLeft.x - topLeft.x)) < 0) {
        _d = [topRight, bottomLeft], bottomLeft = _d[0], topRight = _d[1];
    }
    return { bottomLeft: bottomLeft, topLeft: topLeft, topRight: topRight };
}
// Computes the dimension (number of modules on a side) of the QR Code based on the position of the finder patterns
function computeDimension(topLeft, topRight, bottomLeft, matrix) {
    var moduleSize = (sum(countBlackWhiteRun(topLeft, bottomLeft, matrix, 5)) / 7 + // Divide by 7 since the ratio is 1:1:3:1:1
        sum(countBlackWhiteRun(topLeft, topRight, matrix, 5)) / 7 +
        sum(countBlackWhiteRun(bottomLeft, topLeft, matrix, 5)) / 7 +
        sum(countBlackWhiteRun(topRight, topLeft, matrix, 5)) / 7) / 4;
    if (moduleSize < 1) {
        throw new Error("Invalid module size");
    }
    var topDimension = Math.round(distance(topLeft, topRight) / moduleSize);
    var sideDimension = Math.round(distance(topLeft, bottomLeft) / moduleSize);
    var dimension = Math.floor((topDimension + sideDimension) / 2) + 7;
    switch (dimension % 4) {
        case 0:
            dimension++;
            break;
        case 2:
            dimension--;
            break;
    }
    return { dimension: dimension, moduleSize: moduleSize };
}
// Takes an origin point and an end point and counts the sizes of the black white run from the origin towards the end point.
// Returns an array of elements, representing the pixel size of the black white run.
// Uses a variant of http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
function countBlackWhiteRunTowardsPoint(origin, end, matrix, length) {
    var switchPoints = [{ x: Math.floor(origin.x), y: Math.floor(origin.y) }];
    var steep = Math.abs(end.y - origin.y) > Math.abs(end.x - origin.x);
    var fromX;
    var fromY;
    var toX;
    var toY;
    if (steep) {
        fromX = Math.floor(origin.y);
        fromY = Math.floor(origin.x);
        toX = Math.floor(end.y);
        toY = Math.floor(end.x);
    }
    else {
        fromX = Math.floor(origin.x);
        fromY = Math.floor(origin.y);
        toX = Math.floor(end.x);
        toY = Math.floor(end.y);
    }
    var dx = Math.abs(toX - fromX);
    var dy = Math.abs(toY - fromY);
    var error = Math.floor(-dx / 2);
    var xStep = fromX < toX ? 1 : -1;
    var yStep = fromY < toY ? 1 : -1;
    var currentPixel = true;
    // Loop up until x == toX, but not beyond
    for (var x = fromX, y = fromY; x !== toX + xStep; x += xStep) {
        // Does current pixel mean we have moved white to black or vice versa?
        // Scanning black in state 0,2 and white in state 1, so if we find the wrong
        // color, advance to next state or end if we are in state 2 already
        var realX = steep ? y : x;
        var realY = steep ? x : y;
        if (matrix.get(realX, realY) !== currentPixel) {
            currentPixel = !currentPixel;
            switchPoints.push({ x: realX, y: realY });
            if (switchPoints.length === length + 1) {
                break;
            }
        }
        error += dy;
        if (error > 0) {
            if (y === toY) {
                break;
            }
            y += yStep;
            error -= dx;
        }
    }
    var distances = [];
    for (var i = 0; i < length; i++) {
        if (switchPoints[i] && switchPoints[i + 1]) {
            distances.push(distance(switchPoints[i], switchPoints[i + 1]));
        }
        else {
            distances.push(0);
        }
    }
    return distances;
}
// Takes an origin point and an end point and counts the sizes of the black white run in the origin point
// along the line that intersects with the end point. Returns an array of elements, representing the pixel sizes
// of the black white run. Takes a length which represents the number of switches from black to white to look for.
function countBlackWhiteRun(origin, end, matrix, length) {
    var _a;
    var rise = end.y - origin.y;
    var run = end.x - origin.x;
    var towardsEnd = countBlackWhiteRunTowardsPoint(origin, end, matrix, Math.ceil(length / 2));
    var awayFromEnd = countBlackWhiteRunTowardsPoint(origin, { x: origin.x - run, y: origin.y - rise }, matrix, Math.ceil(length / 2));
    var middleValue = towardsEnd.shift() + awayFromEnd.shift() - 1; // Substract one so we don't double count a pixel
    return (_a = awayFromEnd.concat(middleValue)).concat.apply(_a, towardsEnd);
}
// Takes in a black white run and an array of expected ratios. Returns the average size of the run as well as the "error" -
// that is the amount the run diverges from the expected ratio
function scoreBlackWhiteRun(sequence, ratios) {
    var averageSize = sum(sequence) / sum(ratios);
    var error = 0;
    ratios.forEach(function (ratio, i) {
        error += Math.pow((sequence[i] - ratio * averageSize), 2);
    });
    return { averageSize: averageSize, error: error };
}
// Takes an X,Y point and an array of sizes and scores the point against those ratios.
// For example for a finder pattern takes the ratio list of 1:1:3:1:1 and checks horizontal, vertical and diagonal ratios
// against that.
function scorePattern(point, ratios, matrix) {
    try {
        var horizontalRun = countBlackWhiteRun(point, { x: -1, y: point.y }, matrix, ratios.length);
        var verticalRun = countBlackWhiteRun(point, { x: point.x, y: -1 }, matrix, ratios.length);
        var topLeftPoint = {
            x: Math.max(0, point.x - point.y) - 1,
            y: Math.max(0, point.y - point.x) - 1,
        };
        var topLeftBottomRightRun = countBlackWhiteRun(point, topLeftPoint, matrix, ratios.length);
        var bottomLeftPoint = {
            x: Math.min(matrix.width, point.x + point.y) + 1,
            y: Math.min(matrix.height, point.y + point.x) + 1,
        };
        var bottomLeftTopRightRun = countBlackWhiteRun(point, bottomLeftPoint, matrix, ratios.length);
        var horzError = scoreBlackWhiteRun(horizontalRun, ratios);
        var vertError = scoreBlackWhiteRun(verticalRun, ratios);
        var diagDownError = scoreBlackWhiteRun(topLeftBottomRightRun, ratios);
        var diagUpError = scoreBlackWhiteRun(bottomLeftTopRightRun, ratios);
        var ratioError = Math.sqrt(horzError.error * horzError.error +
            vertError.error * vertError.error +
            diagDownError.error * diagDownError.error +
            diagUpError.error * diagUpError.error);
        var avgSize = (horzError.averageSize + vertError.averageSize + diagDownError.averageSize + diagUpError.averageSize) / 4;
        var sizeError = (Math.pow((horzError.averageSize - avgSize), 2) +
            Math.pow((vertError.averageSize - avgSize), 2) +
            Math.pow((diagDownError.averageSize - avgSize), 2) +
            Math.pow((diagUpError.averageSize - avgSize), 2)) / avgSize;
        return ratioError + sizeError;
    }
    catch (_a) {
        return Infinity;
    }
}
function recenterLocation(matrix, p) {
    var leftX = Math.round(p.x);
    while (matrix.get(leftX, Math.round(p.y))) {
        leftX--;
    }
    var rightX = Math.round(p.x);
    while (matrix.get(rightX, Math.round(p.y))) {
        rightX++;
    }
    var x = (leftX + rightX) / 2;
    var topY = Math.round(p.y);
    while (matrix.get(Math.round(x), topY)) {
        topY--;
    }
    var bottomY = Math.round(p.y);
    while (matrix.get(Math.round(x), bottomY)) {
        bottomY++;
    }
    var y = (topY + bottomY) / 2;
    return { x: x, y: y };
}
function locate(matrix) {
    var finderPatternQuads = [];
    var activeFinderPatternQuads = [];
    var alignmentPatternQuads = [];
    var activeAlignmentPatternQuads = [];
    var _loop_1 = function (y) {
        var length_1 = 0;
        var lastBit = false;
        var scans = [0, 0, 0, 0, 0];
        var _loop_2 = function (x) {
            var v = matrix.get(x, y);
            if (v === lastBit) {
                length_1++;
            }
            else {
                scans = [scans[1], scans[2], scans[3], scans[4], length_1];
                length_1 = 1;
                lastBit = v;
                // Do the last 5 color changes ~ match the expected ratio for a finder pattern? 1:1:3:1:1 of b:w:b:w:b
                var averageFinderPatternBlocksize = sum(scans) / 7;
                var validFinderPattern = Math.abs(scans[0] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    Math.abs(scans[1] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    Math.abs(scans[2] - 3 * averageFinderPatternBlocksize) < 3 * averageFinderPatternBlocksize &&
                    Math.abs(scans[3] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    Math.abs(scans[4] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    !v; // And make sure the current pixel is white since finder patterns are bordered in white
                // Do the last 3 color changes ~ match the expected ratio for an alignment pattern? 1:1:1 of w:b:w
                var averageAlignmentPatternBlocksize = sum(scans.slice(-3)) / 3;
                var validAlignmentPattern = Math.abs(scans[2] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                    Math.abs(scans[3] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                    Math.abs(scans[4] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                    v; // Is the current pixel black since alignment patterns are bordered in black
                if (validFinderPattern) {
                    // Compute the start and end x values of the large center black square
                    var endX_1 = x - scans[3] - scans[4];
                    var startX_1 = endX_1 - scans[2];
                    var line = { startX: startX_1, endX: endX_1, y: y };
                    // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                    // that line as the starting point.
                    var matchingQuads = activeFinderPatternQuads.filter(function (q) {
                        return (startX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX) ||
                            (endX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX) ||
                            (startX_1 <= q.bottom.startX && endX_1 >= q.bottom.endX && ((scans[2] / (q.bottom.endX - q.bottom.startX)) < MAX_QUAD_RATIO &&
                                (scans[2] / (q.bottom.endX - q.bottom.startX)) > MIN_QUAD_RATIO));
                    });
                    if (matchingQuads.length > 0) {
                        matchingQuads[0].bottom = line;
                    }
                    else {
                        activeFinderPatternQuads.push({ top: line, bottom: line });
                    }
                }
                if (validAlignmentPattern) {
                    // Compute the start and end x values of the center black square
                    var endX_2 = x - scans[4];
                    var startX_2 = endX_2 - scans[3];
                    var line = { startX: startX_2, y: y, endX: endX_2 };
                    // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                    // that line as the starting point.
                    var matchingQuads = activeAlignmentPatternQuads.filter(function (q) {
                        return (startX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX) ||
                            (endX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX) ||
                            (startX_2 <= q.bottom.startX && endX_2 >= q.bottom.endX && ((scans[2] / (q.bottom.endX - q.bottom.startX)) < MAX_QUAD_RATIO &&
                                (scans[2] / (q.bottom.endX - q.bottom.startX)) > MIN_QUAD_RATIO));
                    });
                    if (matchingQuads.length > 0) {
                        matchingQuads[0].bottom = line;
                    }
                    else {
                        activeAlignmentPatternQuads.push({ top: line, bottom: line });
                    }
                }
            }
        };
        for (var x = -1; x <= matrix.width; x++) {
            _loop_2(x);
        }
        finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) { return q.bottom.y !== y && q.bottom.y - q.top.y >= 2; }));
        activeFinderPatternQuads = activeFinderPatternQuads.filter(function (q) { return q.bottom.y === y; });
        alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads.filter(function (q) { return q.bottom.y !== y; }));
        activeAlignmentPatternQuads = activeAlignmentPatternQuads.filter(function (q) { return q.bottom.y === y; });
    };
    for (var y = 0; y <= matrix.height; y++) {
        _loop_1(y);
    }
    finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) { return q.bottom.y - q.top.y >= 2; }));
    alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads);
    var finderPatternGroups = finderPatternQuads
        .filter(function (q) { return q.bottom.y - q.top.y >= 2; }) // All quads must be at least 2px tall since the center square is larger than a block
        .map(function (q) {
        var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
        var y = (q.top.y + q.bottom.y + 1) / 2;
        if (!matrix.get(Math.round(x), Math.round(y))) {
            return;
        }
        var lengths = [q.top.endX - q.top.startX, q.bottom.endX - q.bottom.startX, q.bottom.y - q.top.y + 1];
        var size = sum(lengths) / lengths.length;
        var score = scorePattern({ x: Math.round(x), y: Math.round(y) }, [1, 1, 3, 1, 1], matrix);
        return { score: score, x: x, y: y, size: size };
    })
        .filter(function (q) { return !!q; }) // Filter out any rejected quads from above
        .sort(function (a, b) { return a.score - b.score; })
        // Now take the top finder pattern options and try to find 2 other options with a similar size.
        .map(function (point, i, finderPatterns) {
        if (i > MAX_FINDERPATTERNS_TO_SEARCH) {
            return null;
        }
        var otherPoints = finderPatterns
            .filter(function (p, ii) { return i !== ii; })
            .map(function (p) { return ({ x: p.x, y: p.y, score: p.score + (Math.pow((p.size - point.size), 2)) / point.size, size: p.size }); })
            .sort(function (a, b) { return a.score - b.score; });
        if (otherPoints.length < 2) {
            return null;
        }
        var score = point.score + otherPoints[0].score + otherPoints[1].score;
        return { points: [point].concat(otherPoints.slice(0, 2)), score: score };
    })
        .filter(function (q) { return !!q; }) // Filter out any rejected finder patterns from above
        .sort(function (a, b) { return a.score - b.score; });
    if (finderPatternGroups.length === 0) {
        return null;
    }
    var _a = reorderFinderPatterns(finderPatternGroups[0].points[0], finderPatternGroups[0].points[1], finderPatternGroups[0].points[2]), topRight = _a.topRight, topLeft = _a.topLeft, bottomLeft = _a.bottomLeft;
    var alignment = findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft);
    var result = [];
    if (alignment) {
        result.push({
            alignmentPattern: { x: alignment.alignmentPattern.x, y: alignment.alignmentPattern.y },
            bottomLeft: { x: bottomLeft.x, y: bottomLeft.y },
            dimension: alignment.dimension,
            topLeft: { x: topLeft.x, y: topLeft.y },
            topRight: { x: topRight.x, y: topRight.y },
        });
    }
    // We normally use the center of the quads as the location of the tracking points, which is optimal for most cases and will account
    // for a skew in the image. However, In some cases, a slight skew might not be real and instead be caused by image compression
    // errors and/or low resolution. For those cases, we'd be better off centering the point exactly in the middle of the black area. We
    // compute and return the location data for the naively centered points as it is little additional work and allows for multiple
    // attempts at decoding harder images.
    var midTopRight = recenterLocation(matrix, topRight);
    var midTopLeft = recenterLocation(matrix, topLeft);
    var midBottomLeft = recenterLocation(matrix, bottomLeft);
    var centeredAlignment = findAlignmentPattern(matrix, alignmentPatternQuads, midTopRight, midTopLeft, midBottomLeft);
    if (centeredAlignment) {
        result.push({
            alignmentPattern: { x: centeredAlignment.alignmentPattern.x, y: centeredAlignment.alignmentPattern.y },
            bottomLeft: { x: midBottomLeft.x, y: midBottomLeft.y },
            topLeft: { x: midTopLeft.x, y: midTopLeft.y },
            topRight: { x: midTopRight.x, y: midTopRight.y },
            dimension: centeredAlignment.dimension,
        });
    }
    if (result.length === 0) {
        return null;
    }
    return result;
}
exports.locate = locate;
function findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft) {
    var _a;
    // Now that we've found the three finder patterns we can determine the blockSize and the size of the QR code.
    // We'll use these to help find the alignment pattern but also later when we do the extraction.
    var dimension;
    var moduleSize;
    try {
        (_a = computeDimension(topLeft, topRight, bottomLeft, matrix), dimension = _a.dimension, moduleSize = _a.moduleSize);
    }
    catch (e) {
        return null;
    }
    // Now find the alignment pattern
    var bottomRightFinderPattern = {
        x: topRight.x - topLeft.x + bottomLeft.x,
        y: topRight.y - topLeft.y + bottomLeft.y,
    };
    var modulesBetweenFinderPatterns = ((distance(topLeft, bottomLeft) + distance(topLeft, topRight)) / 2 / moduleSize);
    var correctionToTopLeft = 1 - (3 / modulesBetweenFinderPatterns);
    var expectedAlignmentPattern = {
        x: topLeft.x + correctionToTopLeft * (bottomRightFinderPattern.x - topLeft.x),
        y: topLeft.y + correctionToTopLeft * (bottomRightFinderPattern.y - topLeft.y),
    };
    var alignmentPatterns = alignmentPatternQuads
        .map(function (q) {
        var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
        var y = (q.top.y + q.bottom.y + 1) / 2;
        if (!matrix.get(Math.floor(x), Math.floor(y))) {
            return;
        }
        var lengths = [q.top.endX - q.top.startX, q.bottom.endX - q.bottom.startX, (q.bottom.y - q.top.y + 1)];
        var size = sum(lengths) / lengths.length;
        var sizeScore = scorePattern({ x: Math.floor(x), y: Math.floor(y) }, [1, 1, 1], matrix);
        var score = sizeScore + distance({ x: x, y: y }, expectedAlignmentPattern);
        return { x: x, y: y, score: score };
    })
        .filter(function (v) { return !!v; })
        .sort(function (a, b) { return a.score - b.score; });
    // If there are less than 15 modules between finder patterns it's a version 1 QR code and as such has no alignmemnt pattern
    // so we can only use our best guess.
    var alignmentPattern = modulesBetweenFinderPatterns >= 15 && alignmentPatterns.length ? alignmentPatterns[0] : expectedAlignmentPattern;
    return { alignmentPattern: alignmentPattern, dimension: dimension };
}


/***/ })
/******/ ])["default"];
});
},{}],"Wsof":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stop_scan = exports.start_scan = void 0;

var _helper = require("/assets/js/helper.js");

var _jsqr = _interopRequireDefault(require("jsqr"));

var _app = require("../../app.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var video;
var intv;

var stop_scan = function stop_scan() {
  // status.views = "subscription";
  document.getElementById("qr-screen").style.display = "none";
  /*
  const stream = video.srcObject;
  const tracks = stream.getTracks();
   tracks.forEach(function (track) {
    track.stop();
    document.getElementById("qr-screen").style.display = "none";
  });
   video.srcObject = null;
  */
};

exports.stop_scan = stop_scan;

var start_scan = function start_scan(callback) {
  document.getElementById("qr-screen").style.display = "block";
  console.log("start");
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia({
      audio: false,
      video: {
        width: 200,
        height: 200
      }
    }, function (stream) {
      video = document.querySelector("video");
      video.srcObject = stream;

      video.onloadedmetadata = function (e) {
        video.play();
        var barcodeCanvas = document.createElement("canvas");
        intv = setInterval(function () {
          barcodeCanvas.width = video.videoWidth;
          barcodeCanvas.height = video.videoHeight;
          var barcodeContext = barcodeCanvas.getContext("2d");
          var imageWidth = Math.max(1, Math.floor(video.videoWidth)),
              imageHeight = Math.max(1, Math.floor(video.videoHeight));
          barcodeContext.drawImage(video, 0, 0, imageWidth, imageHeight);
          var imageData = barcodeContext.getImageData(0, 0, imageWidth, imageHeight);
          var idd = imageData.data;
          var code = (0, _jsqr.default)(idd, imageWidth, imageHeight);
          console.log(code);

          if (code) {
            stop_scan();
            callback(code.data);
            clearInterval(intv);
          }
        }, 1000);
      };
    }, function (err) {
      console.log("The following error occurred: " + err.name);
    });
  } else {
    console.log("getUserMedia not supported");
  }
};

exports.start_scan = start_scan;
},{"/assets/js/helper.js":"IWa2","jsqr":"IuN4","../../app.js":"A2T1"}],"A2T1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.events = void 0;

var _localforage = _interopRequireDefault(require("localforage"));

var _mustache = _interopRequireDefault(require("mustache"));

var _helper = require("/assets/js/helper.js");

var _getMoonPhase = require("/assets/js/getMoonPhase.js");

var _eximport = require("/assets/js/eximport.js");

var _scan = require("/assets/js/scan.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var currentDay = today.getDate();
var monthAndYear = document.getElementById("monthAndYear");
var once = false;
var status = {
  view: "month",
  selected_day: "",
  visible: false,
  update_event_id: ""
};
var settings = {};
var blob = "";
var events = []; //ads || ads free
//KaioOs ads

exports.events = events;

var getManifest = function getManifest(callback) {
  if (!navigator.mozApps) {
    return false;
  }

  var self = navigator.mozApps.getSelf();

  self.onsuccess = function () {
    callback(self.result);
  };

  self.onerror = function () {};
};

var self; //KaiOs store true||false

function manifest(a) {
  self = a.origin;
  var t = document.getElementById("KaiOsAds-Wrapper");

  if (a.installOrigin == "app://kaios-plus.kaiostech.com") {
    document.querySelector("#KaiOsAds-Wrapper iframe").src = "ads.html";
  } else {
    console.log("Ads free");
    t.style.display = "none";
  }
}

getManifest(manifest); // ////////
// finde closest event to selected date in list view
// ////////

var find_closest_date = function find_closest_date(search_term) {
  var t = 0;
  var search = new Date(search_term).getTime();

  for (var i = 0; i < events.length; i++) {
    var item = new Date(events[i].dateStart).getTime();

    if (search < item) {
      t = events[i - 1].dateStart;
      i = events.length;
    } //after last event
    //focus last event


    if (search > new Date(events[events.length - 1].dateStart).getTime()) {
      t = events[events.length - 1].dateStart;
      i = events.length;
    }
  }

  document.querySelectorAll("div#list-view article[data-date='" + t + "']")[0].focus();
  return t;
}; // check if has event


var event_check = function event_check(date) {
  var feedback = {
    date: "",
    event: false,
    subscription: false,
    multidayevent: false,
    rrule: "none"
  };

  for (var _t = 0; _t < events.length; _t++) {
    if (_typeof(events[_t]) === "object") {
      feedback.event = false;
      feedback.subscription = false;
      feedback.multidayevent = false;
      feedback.rrule = false;
      feedback.date = date;
      var a = new Date(events[_t].dateStart).getTime();
      var b = new Date(events[_t].dateEnd).getTime();
      var c = new Date(date).getTime(); // multi day event

      if (events[_t]["rrule_"] == "none") {
        if (a === c || b === c || a < c && b > c) {
          feedback.event = true;

          if (events[_t].isSubscription === true) {
            feedback.subscription = true;
          }

          if (events[_t].multidayevent === true) {
            feedback.multidayevent = true;
          }

          _t = events.length;
        }
      }
    }
  }

  return feedback;
}; // check if has event


var rrule_check = function rrule_check(date) {
  var feedback = {
    date: "",
    event: false,
    subscription: false,
    multidayevent: false,
    rrule: "none"
  };

  for (var _t2 = 0; _t2 < events.length; _t2++) {
    if (_typeof(events[_t2]) === "object") {
      feedback.event = false;
      feedback.subscription = false;
      feedback.multidayevent = false;
      feedback.rrule = false;
      feedback.date = date;
      var a = new Date(events[_t2].dateStart).getTime();
      var b = new Date(events[_t2].dateEnd).getTime();
      var c = new Date(date).getTime(); //recurrences

      if (typeof events[_t2]["rrule_"] !== "undefined" && events[_t2]["rrule_"] !== undefined) {
        if (new Date(events[_t2].dateStart).getTime() <= new Date(date).getTime() && new Date(date).getTime() <= new Date(events[_t2].dateEnd).getTime()) {
          if (events[_t2].rrule_ == "MONTHLY") {
            if (new Date(events[_t2].dateStart).getDate() === new Date(date).getDate()) {
              feedback.rrule = true;
              _t2 = events.length;
              return feedback;
            }
          }

          if (events[_t2]["rrule_"] == "DAILY") {
            feedback.rrule = true;
            _t2 = events.length;
            return feedback;
          }

          if (events[_t2].rrule_ == "WEEKLY") {
            if (new Date(events[_t2].dateStart).getDay() === new Date(date).getDay()) {
              feedback.rrule = true;
              _t2 = events.length;
              return feedback;
            }
          }

          if (events[_t2].rrule_ == "YEARLY") {
            var tt = new Date(events[_t2].dateStart);
            var pp = new Date(date);

            if (tt.getDate() + "-" + tt.getMonth() === pp.getDate() + "-" + pp.getMonth()) {
              feedback.rrule = true;
              _t2 = events.length;
              return feedback;
            }
          }
        }
      }
    }
  }

  return feedback;
}; //////////////////
//event slider
///////////


var slider = [];
var slider_index = 0;

var event_check_day = function event_check_day(date) {
  slider = [];
  var k = document.querySelector("div#event-slider-indicator div");
  k.innerHTML = ""; //hide all

  var item = document.querySelectorAll("div#event-slider article");

  for (var i = 0; i < item.length; i++) {
    item[i].style.display = "none";
    var a = new Date(item[i].getAttribute("data-date")).getTime();
    var b = new Date(item[i].getAttribute("data-date-end")).getTime();
    var c = new Date(date).getTime(); //hide/show alarm icon

    if (item[i].getAttribute("data-alarm")) {
      if (item[i].getAttribute("data-alarm") == "none") item[i].querySelector("div.icons-bar img.bell").style.display = "none";
    } //all day event


    if (item[i].getAttribute("data-time-start") == "00:00:00" && item[i].getAttribute("data-time-end") == "00:00:00") {
      item[i].querySelector("div.time").innerHTML = "All day";
    }

    var _d = item[i].getAttribute("data-rrule");

    if (_d === "none" || _d === "") {
      if (a === c || b === c || a < c && b > c) {
        slider.push(item[i]);
        slider[0].style.display = "block";
        k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
      }
    } else {
      if (a === c || b === c || a < c && b > c && _d) {
        //recurrences
        //YEAR
        if (_d == "YEARLY") {
          var tt = new Date(item[i].getAttribute("data-date"));
          var pp = new Date(date);

          if (tt.getDate() + "-" + tt.getMonth() === pp.getDate() + "-" + pp.getMonth()) {
            slider.push(item[i]);
            slider[0].style.display = "block";
            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        } //WEEK


        if (_d == "WEEKLY") {
          if (new Date(item[i].getAttribute("data-date")).getDay() == new Date(date).getDay()) {
            slider.push(item[i]);
            slider[0].style.display = "block";
            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        } //MONTH


        if (_d == "MONTHLY") {
          if (new Date(item[i].getAttribute("data-date")).getDate() == new Date(date).getDate()) {
            slider.push(item[i]);
            slider[0].style.display = "block";
            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        }

        if (_d == "DAILY") {
          if (a === c || b === c || a < c && b > c) {
            slider.push(item[i]);
            slider[0].style.display = "block";
            k.insertAdjacentHTML("beforeend", "<div class='indicator'></div>");
          }
        }
      }
    }
  }

  if (slider != "" && slider.length > 0) {
    k.style.opacity = 100;
  } else {
    k.style.opacity = 0;
  }
};

var slider_navigation = function slider_navigation() {
  var p = document.querySelectorAll("div#event-slider-indicator div div");

  if (slider_index == slider.length - 1) {
    slider_index = -1;
  }

  slider_index++;
  slider.forEach(function (item) {
    item.style.display = "none";
  });
  slider[slider_index].style.display = "block";
  p.forEach(function (item) {
    item.classList.remove("active");
  });
  p[slider_index].classList.add("active");
}; ////
// JUMP TO TODAY
////


var jump_to_today = function jump_to_today() {
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();
  showCalendar(currentMonth, currentYear);
  event_check_day(status.selected_day);
  status.selected_day = document.activeElement.getAttribute("data-date");
};

function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
  event_check_day(status.selected_day);
}

function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
  event_check_day(status.selected_day);
} //////////////
//BUILD CALENDAR
//////////////
// get weeknumber


Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0); // Thursday in current week decides the year.

  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7); // January 4 is always in week 1.

  var week1 = new Date(date.getFullYear(), 0, 4); // Adjust to Thursday in week 1 and count number of weeks from date to week1.

  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

var showCalendar = function showCalendar(month, year) {
  (0, _helper.bottom_bar)("add", "events", "options");
  var firstDay = new Date(year, month).getDay();
  var daysInMonth = 32 - new Date(year, month, 32).getDate();
  var tbl = document.getElementById("calendar-body"); // clearing all previous cells

  tbl.innerHTML = ""; // filing data about month and in the page via DOM.

  monthAndYear.innerHTML = months[month] + " " + year; // creating all cells

  var date = 1;

  for (var i = 0; i < 6; i++) {
    // creates a table row
    var row = document.createElement("div");
    row.classList.add("flex");
    row.classList.add("row");
    row.classList.add("width-100"); // creating individual cells, filing them up with data.

    for (var j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        var cell = document.createElement("div");
        var cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        var _cell = document.createElement("div");

        var span = document.createElement("span");
        var moon = document.createElement("div");

        var _cellText = document.createTextNode(date);

        _cell.appendChild(_cellText);

        _cell.appendChild(span); // set tabindex


        _cell.setAttribute("tabindex", date - 1); // store date with leading 0
        // because input type date
        // accept only day month with leading zero


        var mmonth = "0".concat(month + 1).slice(-2);
        var day = "0".concat(date).slice(-2);
        var p = year + "-" + mmonth + "-" + day;
        moon.classList.add("moon-phase-" + (0, _getMoonPhase.getMoonPhase)(year, month, date));

        _cell.appendChild(moon);

        _cell.setAttribute("data-date", p);

        _cell.setAttribute("data-index", new Date(p).toISOString()); // check if has event


        if (events.length > 0) {
          if (event_check(p).event) {
            _cell.classList.add("event");
          }

          if (rrule_check(p).rrule) {
            _cell.classList.add("event");
          } // check if has event + subscription


          if (event_check(p).subscription == true) {
            _cell.classList.add("subscription");
          }
        }

        _cell.classList.add("item");

        row.appendChild(_cell);
        date++;
      }
    } // add weeknumbers


    var week = document.createElement("span");
    week.classList.add("weeknumber");
    var weekText = document.createTextNode(new Date(year, month, date).getWeek());
    week.appendChild(weekText);
    row.appendChild(week); //add row

    tbl.appendChild(row);
  }

  document.querySelectorAll(".item")[0].focus();
  status.selected_day = document.activeElement.getAttribute("data-date"); // highlight current day

  if (today.getMonth() == month && today.getFullYear() == year) {
    document.querySelectorAll(".item")[currentDay - 1].focus();
    document.querySelectorAll(".item")[currentDay - 1].classList.add("today");
  }
};

var set_tabindex = function set_tabindex() {
  document.querySelectorAll("div#list-view article").forEach(function (i, p) {
    i.setAttribute("tabindex", p);
  });
}; //RENDER


function renderHello(arr) {
  document.getElementById("event-slider").style.opacity = 0;
  (0, _helper.sort_array)(arr, "dateStart", "date");
  var template = document.getElementById("template").innerHTML;

  var rendered = _mustache.default.render(template, {
    data: arr
  });

  document.getElementById("list-view").innerHTML = rendered;
  document.getElementById("event-slider").innerHTML = rendered;
  document.getElementById("event-slider").style.opacity = 100;
  set_tabindex(); //event_check_day(document.activeElement.getAttribute("data-date"));
  //format date

  document.querySelectorAll("article").forEach(function (index) {
    var w = index.getAttribute("data-time-start");
    var s = index.getAttribute("data-time-end");

    if (w == "00:00:00" && s == "00:00:00") {
      index.querySelector("div.time").innerHTML = "All day";
    }

    var t = new Date(index.getAttribute("data-date"));
    var n = new Date(index.getAttribute("data-date-end"));
    var d = weekday[t.getDay()] + ", " + t.getFullYear() + " " + months[t.getMonth()] + " " + t.getDate();
    var m = weekday[n.getDay()] + ", " + n.getFullYear() + " " + months[n.getMonth()] + " " + n.getDate(); // to do singel day event or not

    if (index.classList.contains("multidayevent")) {
      index.querySelector("div.date").innerText = d + " - " + m;
    } else {
      index.querySelector("div.date").innerText = d;
    }
  });
}

var clear_form = function clear_form() {
  document.querySelectorAll("div#add-edit-event input").forEach(function (e) {
    e.value = "";
    document.getElementById("form-image").src = "";
    blob = "";
  });
};
/*
 ///////////////
// ///////////////
// /////////////////
// /ROUTER
// ///////////////
// ///////////////
// //////////////
*/


var month = document.getElementById("calendar");
var add_edit_event = document.getElementById("add-edit-event");
var list_view = document.getElementById("list-view");
var options = document.getElementById("options");

var option_button_bar = function option_button_bar() {
  setTimeout(function () {
    if (status.view == "options") {
      if (document.activeElement.getAttribute("data-function") == "subscription") {
        (0, _helper.bottom_bar)("delete", "select", "");
        return true;
      } else {
        (0, _helper.bottom_bar)("", "select", "");
        return true;
      }
    }
  }, 500);
};

var pages = document.querySelectorAll(".page");

var router = function router(view) {
  pages.forEach(function (index) {
    index.style.display = "none";
  });

  if (view == "view") {
    if (status.view == "month") {
      status.view = "list-view";
    } else {
      status.view = "month";
    }
  } // add event view


  if (status.view == "add-edit-event") {
    if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
    document.getElementById("event-date").value = status.selected_day;
    add_edit_event.style.display = "block";
    document.querySelectorAll("div#add-edit-event .item").forEach(function (i, p) {
      i.setAttribute("tabindex", p);
    });
    add_edit_event.querySelectorAll(".item")[0].focus();
    (0, _helper.bottom_bar)("", "edit", "");

    if (document.getElementById("event-date-end").value == "") {
      document.getElementById("event-date-end").value = document.getElementById("event-date").value;
    }

    if (status.edit_event) {
      document.getElementById("save-event").innerText = "update";
    }

    console.log(status.edit_event);

    if (!status.edit_event) {
      document.getElementById("save-event").innerText = "save";
      document.getElementById("event-notification-time").value = settings.default_notification;
    }

    return true;
  } // month view


  if (status.view == "month") {
    if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
    options.style.display = "none";
    month.style.display = "block";
    (0, _helper.bottom_bar)("add", "events", "options");
    status.edit_event = false;

    var _t3 = new Date(status.selected_day);

    currentMonth = _t3.getMonth();
    currentYear = _t3.getFullYear();
    var k = status.selected_day;
    showCalendar(currentMonth, currentYear);
    document.querySelectorAll("div#calendar-body div.item").forEach(function (item) {
      if (item.getAttribute("data-date") == k) {
        item.focus();
        event_check_day(k);
      }
    });
    clear_form();
  } // list view


  if (status.view == "list-view") {
    if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
    options.style.display = "none";
    status.edit_event = false;
    clear_form();
    (0, _helper.bottom_bar)("edit", "month", "options");
    list_view.style.display = "block";
    setTimeout(function () {
      var articles = document.querySelectorAll("div#list-view article");
      var success = false;

      for (var k = 0; k < articles.length; k++) {
        if (articles[k].getAttribute("data-date") == status.selected_day) {
          articles[k].focus();
          k = articles.length;
          success = true;
        }
      }

      for (var k = 0; k < articles.length; k++) {
        console.log(articles[k].getAttribute("data-alarm"));

        if (articles[k].getAttribute("data-alarm") == "none") {
          articles[k].querySelector("img.bell").style.display = "none";
        }
      }

      if (!success) {
        document.querySelectorAll("div#list-view article")[0].focus();
        find_closest_date(status.selected_day);
      }

      var rect = document.activeElement.getBoundingClientRect();
      var elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
      document.activeElement.parentNode.scrollBy({
        left: 0,
        top: elY - window.innerHeight / 2,
        behavior: "smooth"
      });
    }, 1000);
  }

  if (status.view == "options") {
    if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");

    if (!once) {
      (0, _eximport.list_ics)();
      list_subscriptions();
      once = true;
    }

    document.getElementById("options").style.display = "block";
    document.querySelectorAll("div#options .item")[0].focus();
    document.getElementById("options").style.opacity = "1";
    document.getElementById("subscription-form").style.display = "none";
    setTimeout(function () {
      Array.from(document.querySelectorAll("div#options .item")).forEach(function (i, p) {
        i.setAttribute("tabindex", p);
      });
    }, 2000);
    option_button_bar();
  }

  if (status.view == "subscription") {
    document.getElementById("options").style.opacity = "0.3";
    document.getElementById("subscription-form").style.display = "block";
    document.querySelectorAll("div#subscription-form div.item input")[0].focus();
    (0, _helper.bottom_bar)("QR", "", "save");
  }
};

var list_subscriptions = function list_subscriptions() {
  if (subscriptions == null) return false;
  subscriptions.forEach(function (item) {
    document.querySelector("div#options div#subscription-text").insertAdjacentHTML("afterend", '<button class="item dynamic" data-function="subscription">' + item.name + "</button>");
    document.querySelectorAll("div#options button").forEach(function (i, p) {
      i.setAttribute("tabindex", p);
    });
  });
};

var lp = 0;

var load_subscriptions = function load_subscriptions() {
  if (subscriptions == null || subscriptions.lenght == -1 || subscriptions.lenght == "undefined") return false;

  if (lp < subscriptions.length) {
    (0, _eximport.fetch_ics)(subscriptions[lp].url, load_subscriptions);
    lp++;
  } else {}

  jump_to_today();
  renderHello(events);
  event_check_day(document.activeElement.getAttribute("data-date"));
  if (document.activeElement.hasAttribute("data-date")) status.selected_day = document.activeElement.getAttribute("data-date");
};

var callback_scan = function callback_scan(url) {
  (0, _helper.bottom_bar)("QR", "", "save");
  status.view = "subscription";
  document.querySelector("div#subscription-form input#cal-subs-url").value = url;
};

var subscriptions = new Array();

var store_subscription = function store_subscription() {
  if ((0, _helper.validate)(document.getElementById("cal-subs-url").value) && document.getElementById("cal-subs-name").value != "") {
    subscriptions = [];
    subscriptions.push({
      url: document.getElementById("cal-subs-url").value,
      name: document.getElementById("cal-subs-name").value
    });
    document.querySelector("input#cal-subs-name").val = "";
    document.querySelector("input#cal-subs-url").val = "";

    _localforage.default.setItem("subscriptions", subscriptions).then(function (value) {
      document.getElementById("subscription-form").style.display = "none";
      (0, _helper.toaster)("subscription stored", 2000);
      status.view = "options";
      router();
    }).catch(function (err) {
      // This code runs if there were any errors
      console.log(err);
    });

    load_subscriptions();
    list_subscriptions();
  } else {
    (0, _helper.toaster)("Please enter a name and a valid url", 2000);
  }
};

var delete_subscription = function delete_subscription() {
  var updated_subscriptions = subscriptions.filter(function (e) {
    return e.name != document.activeElement.innerText;
  });

  _localforage.default.setItem("subscriptions", updated_subscriptions).then(function (value) {
    //Do other things once the value has been saved.
    console.log("saved: " + value);
    (0, _helper.toaster)("subscription deleted", 2000);
    status.view = "month";
    router();
  }).catch(function (err) {
    // This code runs if there were any errors
    (0, _helper.toaster)(err, 2000);
  });

  document.activeElement.remove();
};

_localforage.default.getItem("events").then(function (value) {
  if (value != null) exports.events = events = value;
  renderHello(events);
  jump_to_today();
}).catch(function (err) {
  jump_to_today();
});

_localforage.default.getItem("subscriptions").then(function (value) {
  subscriptions = value;
  setTimeout(function () {
    if (subscriptions == null) return false;
    load_subscriptions();
    console.log(subscriptions);
  }, 2000);
}).catch(function (err) {
  // This code runs if there were any errors
  console.log(err);
});

_localforage.default.getItem("settings").then(function (value) {
  if (value == null) return false;
  settings = value;
  document.getElementById("default-notification-time").value = settings.default_notification;
}).catch(function (err) {
  // This code runs if there were any errors
  console.log(err);
});

function handleVisibilityChange() {
  if (document.visibilityState === "hidden") {
    status.visible = false;
  } else {
    setTimeout(function () {
      status.visible = true;
    }, 1000);
  }
}

handleVisibilityChange(); /////////////////
///NAVIGATION
/////////////////

var nav = function nav(move) {
  if (document.activeElement.nodeName == "SELECT" || document.activeElement.type == "date" || document.activeElement.type == "time") return false;
  var currentIndex = document.activeElement.tabIndex;
  var next = currentIndex + move;
  var items = 0;

  if (status.view == "month") {
    var b = document.activeElement.parentNode.parentNode;
    items = b.querySelectorAll(".item");
  }

  if (status.view == "list-view") {
    var _b = document.activeElement.parentNode;
    items = _b.querySelectorAll("div#list-view article");
  }

  if (status.view == "subscription") {
    items = document.querySelectorAll("div#subscription-form > div.item");
  }

  if (status.view == "add-edit-event" || status.view == "options") {
    var _b2 = document.activeElement.parentNode;
    items = _b2.querySelectorAll(".item");

    if (document.activeElement.parentNode.classList.contains("input-parent")) {
      document.activeElement.parentNode.focus();
      return true;
    } else {
      document.getElementById("add-edit-event").firstElementChild.focus();
    }
  }

  var targetElement = 0;

  if (next <= items.length) {
    targetElement = items[next];
    targetElement.focus();
  }

  if (next == items.length) {
    targetElement = items[0];
    targetElement.focus();
  }

  var rect = document.activeElement.getBoundingClientRect();
  var elY = rect.top - document.body.getBoundingClientRect().top + rect.height / 2;
  document.activeElement.parentNode.scrollBy({
    left: 0,
    top: elY - window.innerHeight / 2,
    behavior: "smooth"
  });

  if (status.view == "month" || status.view == "list-view") {
    if (targetElement.hasAttribute("data-date")) {
      status.selected_day = targetElement.getAttribute("data-date");
      status.selected_day_id = targetElement.getAttribute("data-id");
      event_check_day(status.selected_day);
    }

    return true;
  }

  if (document.activeElement.id == "form-image-wrapper" && status.view == "add-edit-event") {
    (0, _helper.bottom_bar)("", "remove image", "");
    return true;
  }

  if (document.activeElement.id != "form-image-wrapper" && status.view == "add-edit-event") {
    (0, _helper.bottom_bar)("", "edit", "");
    return true;
  }
}; // foram actions
// after selection


document.getElementById("event-notification-time").addEventListener("change", function (event) {
  setTimeout(function () {
    document.getElementById("event-notification-time").parentElement.focus();
  }, 500);
}); //default when is not set

settings.default_notification = "none";
document.getElementById("default-notification-time").addEventListener("change", function (event) {
  var l = document.getElementById("default-notification-time").value;
  settings.default_notification = l;

  _localforage.default.setItem("settings", settings).then(function (value) {}).catch(function (err) {
    console.log(err);
  });

  setTimeout(function () {
    document.getElementById("default-notification-time").parentElement.focus();
  }, 500);
});
document.querySelectorAll('input[type="time"]').forEach(function (item) {
  item.addEventListener("change", function (event) {
    setTimeout(function () {
      item.parentElement.focus();
    }, 500);
  });
});
document.querySelectorAll('input[type="date"]').forEach(function (item) {
  item.addEventListener("change", function (event) {
    setTimeout(function () {
      item.parentElement.focus();
    }, 500);
  });
});

var add_alarm = function add_alarm(date, message_text, id) {
  // KaiOs  2.xx
  if (navigator.mozAlarms) {
    // This is arbitrary data pass to the alarm
    var data = {
      foo: message_text,
      event_id: id
    }; // The "honorTimezone" string is what make the alarm honoring it

    var request = navigator.mozAlarms.add(date, "honorTimezone", data);

    request.onsuccess = function () {// console.log(this.result);
    };

    request.onerror = function () {
      console.log("An error occurred: " + this.error.name);
    };
  }
}; // may better to compare all alarms
// with all events
// to clean


var remove_alarm = function remove_alarm(id) {
  // KaiOs  2.xx
  if (navigator.mozAlarms) {
    var request = navigator.mozAlarms.getAll();

    request.onsuccess = function () {
      this.result.forEach(function (alarm) {
        if (alarm.data.event_id == id) {
          var req = navigator.mozAlarms.remove(alarm.id);

          req.onsuccess = function () {
            console.log("removed");
          };

          req.onerror = function () {
            console.log("An error occurred: " + this.error.name);
          };
        } else {
          console.log("no alarm founded");
        }
      });
    };

    request.onerror = function () {
      console.log("An error occurred:", this.error.name);
    };
  }
};

var test_alarm = function test_alarm() {
  if (navigator.mozAlarms) {
    var request = navigator.mozAlarms.getAll();

    request.onsuccess = function () {
      this.result.forEach(function (alarm) {
        console.log("Id:", alarm.id);
        console.log("date:", alarm.date);
        console.log("respectTimezone:", alarm.respectTimezone);
        console.log("data:", JSON.stringify(alarm.data));
      });
    };

    request.onerror = function () {
      console.log("An error occurred:", this.error.name);
    };
  }
}; // //////////////////
// //BUILD EVENT-LIST
// /////////////////
// /////////////
// /////////////
// STORE EVENTS//
// /////////////
// /////////////


var convert_ics_date = function convert_ics_date(t) {
  var nn = t.replace(/-/g, "");
  nn = nn.replace(/:/g, "");
  nn = nn.replace(" ", "T");
  nn = nn + "00";
  return nn;
};

var export_data = [];

var store_event = function store_event() {
  var start_time = "00:00:00";

  if (document.getElementById("event-time-start").value != "") {
    start_time = document.getElementById("event-time-start").value;
  }

  var end_time = "00:00:00";

  if (document.getElementById("event-time-end").value != "") {
    end_time = document.getElementById("event-time-end").value;
  }

  var convert_dt_start = document.getElementById("event-date").value + " " + start_time;
  if (document.getElementById("event-date-end").value == "") document.getElementById("event-date-end").value = document.getElementById("event-date").value;
  var convert_dt_end = document.getElementById("event-date-end").value + " " + end_time; // notification before event

  var notification_time = document.getElementById("event-notification-time").value;
  var calc_notification;

  if (notification_time != "none") {
    calc_notification = new Date(convert_dt_start);
    calc_notification.setMinutes(calc_notification.getMinutes() - notification_time);
    notification_time = convert_ics_date(calc_notification.toISOString());
  }

  var multidayevent = false;
  var a = new Date(document.getElementById("event-date").value).getTime();
  var b = new Date(document.getElementById("event-date-end").value).getTime();

  if (a != b) {
    multidayevent = true;
  }

  var rrule_convert = function rrule_convert() {
    var p = document.getElementById("event-recur").value;
    var r;

    if (p != "" || p != "none") {
      r = "FREQ=" + document.getElementById("event-recur").value + ";UNTIL=" + convert_ics_date(convert_dt_end);
    }

    return r;
  };

  var event = {
    UID: (0, _helper.uid)(),
    SUMMARY: document.getElementById("event-title").value,
    LOCATION: document.getElementById("event-location").value,
    DESCRIPTION: document.getElementById("event-description").value,
    CLASS: "PRIVATE",
    DTSTAMP: convert_ics_date(convert_dt_start),
    DTSTART: convert_ics_date(convert_dt_start),
    DTEND: convert_ics_date(convert_dt_end),
    RRULE: rrule_convert(),
    rrule_: document.getElementById("event-recur").value,
    dateStart: document.getElementById("event-date").value,
    dateEnd: document.getElementById("event-date-end").value,
    time_start: document.getElementById("event-time-start").value,
    time_end: document.getElementById("event-time-end").value,
    alarm: document.getElementById("event-notification-time").value,
    alarmTrigger: notification_time,
    isSubscription: false,
    multidayevent: multidayevent,
    ATTACH: blob
  };

  if (event.alarm != "none") {
    event.BEGIN = "VALARM";
    event["TRIGGER;VALUE=DATE-TIME"] = notification_time;
    event.ACTION = "AUDIO";
    event.END = "VALARM";
    add_alarm(calc_notification, event.SUMMARY, event.UID);
  }

  events.push(event);
  var without_subscription = events.filter(function (events) {
    return events.isSubscription === false;
  });

  _localforage.default.setItem("events", without_subscription).then(function (value) {
    // clean form
    clear_form();
    renderHello(events);
    (0, _eximport.export_ical)("greg.ics", without_subscription);
  }).catch(function (err) {
    console.log(err);
  });

  status.view = "month";
  router();
}; // ////////////
// UPDATE EVENT
// /////////


var update_event = function update_event() {
  events.forEach(function (index) {
    var a = new Date(document.getElementById("event-date").value).getTime();
    var b = new Date(document.getElementById("event-date-end").value).getTime();
    var multidayevent = false;

    if (a != b) {
      multidayevent = true;
    }

    if (index.UID == status.selected_day_id) {
      var start_time = "00:00:00";

      if (document.getElementById("event-time-start").value != "") {
        start_time = document.getElementById("event-time-start").value;
      }

      var end_time = "00:00:00";

      if (document.getElementById("event-time-end").value != "") {
        end_time = document.getElementById("event-time-end").value;
      }

      var convert_dt_start = document.getElementById("event-date").value + " " + start_time;
      var convert_dt_end = document.getElementById("event-date").value + " " + end_time; // notification before event

      var notification_time = document.getElementById("event-notification-time").value;
      var calc_notification = "";

      if (notification_time != "none") {
        calc_notification = new Date(convert_dt_start);
        calc_notification.setMinutes(calc_notification.getMinutes() - notification_time);
        notification_time = convert_ics_date(calc_notification.toISOString());
      }

      var rrule_convert = function rrule_convert() {
        var p = document.getElementById("event-recur").value;
        var r;

        if (p != "" || p != "none") {
          r = "FREQ=" + document.getElementById("event-recur").value + ";UNTIL=" + convert_ics_date(convert_dt_end);
        }

        return r;
      };

      index.SUMMARY = document.getElementById("event-title").value;
      index.DESCRIPTION = document.getElementById("event-description").value;
      index.LOCATION = document.getElementById("event-location").value;
      index.DTSTART = convert_ics_date(convert_dt_start);
      index.DTEND = convert_ics_date(convert_dt_end);
      index.dateEnd = document.getElementById("event-date-end").value;
      index.dateStart = document.getElementById("event-date").value;
      index.time_start = document.getElementById("event-time-start").value;
      index.time_end = document.getElementById("event-time-end").value;
      index.RRULE = rrule_convert();
      index.rrule_ = document.getElementById("event-recur").value;
      index.isSubscription = false;
      index.multidayevent = multidayevent;
      index.alarm = document.getElementById("event-notification-time").value;
      index.alarmTrigger = notification_time;
      if (blob != "") index.ATTACH = blob;

      if (index.alarm != "none") {
        remove_alarm(index.UID);
        index.BEGIN = "VALARM";
        index["TRIGGER;VALUE=DATE-TIME:"] = notification_time;
        index.ACTION = "AUDIO";
        index.END = "VALARM";
        add_alarm(calc_notification, index.SUMMARY, index.UID);
      }
    }
  });
  var without_subscription = events.filter(function (events) {
    return events.isSubscription === false;
  });

  _localforage.default.setItem("events", without_subscription).then(function (value) {
    // clean form
    renderHello(events);
    (0, _eximport.export_ical)("greg.ics", value);
    status.view = "month";
    router();
    clear_form();
  }).catch(function (err) {});
}; // ////////////
// EDIT EVENT
// /////////


var edit_event = function edit_event() {
  document.getElementById("delete-event").style.display = "block";
  document.getElementById("export-event").style.display = "block";
  events.forEach(function (index) {
    if (index.UID == status.selected_day_id) {
      document.getElementById("event-title").value = index.SUMMARY;
      document.getElementById("event-date").value = index.dateStart;
      document.getElementById("event-date-end").value = index.dateEnd;
      document.getElementById("event-time-start").value = index.time_start;
      document.getElementById("event-time-end").value = index.time_end;
      document.getElementById("event-description").value = index.DESCRIPTION;
      document.getElementById("event-location").value = index.LOCATION;
      document.querySelector("#event-notification-time").value = index.alarm;
      document.getElementById("form-image").src = index.ATTACH;
      document.getElementById("event-recur").value = index.rrule_;
    }
  });
}; //////////////
//DELETE EVENT
///////////


var delete_event = function delete_event() {
  var f = false;
  exports.events = events = events.filter(function (person) {
    return person.UID != status.selected_day_id;
  });
  remove_alarm(status.selected_day_id);
  f = true;
  status.edit_event = false;
  var without_subscription = events.filter(function (events) {
    return events.isSubscription === false;
  });
  clear_form();

  _localforage.default.setItem("events", without_subscription).then(function (value) {
    renderHello(events);
    (0, _eximport.export_ical)("greg.ics", value);
  }).catch(function (err) {
    // This code runs if there were any errors
    console.log(err);
  });

  return f;
}; // event slider


var t = new Date();
var m = "0".concat(t.getMonth() + 1).slice(-2);
var d = "0".concat(t.getDate()).slice(-2);
var y = t.getFullYear();
event_check_day(y + "-" + m + "-" + d); // callback import event

var import_event = function import_event(id, date) {
  (0, _helper.toaster)("done", 2000);
  (0, _helper.bottom_bar)("edit", "", ""); //renderHello(events);

  var without_subscription = events.filter(function (events) {
    return events.isSubscription === false;
  });

  _localforage.default.setItem("events", without_subscription).then(function (value) {
    renderHello(events);
    (0, _eximport.export_ical)("greg.ics", without_subscription);
  }).catch(function (err) {});
};

var set_datetime_form = function set_datetime_form() {
  var d = new Date();
  var d_h = "0".concat(d.getHours()).slice(-2);
  var d_m = "0".concat(d.getMinutes()).slice(-2);
  var p = d_h + ":" + d_m;
  var d_h_ = "0".concat(d.getHours() + 1).slice(-2);
  var d_m_ = "0".concat(d.getMinutes()).slice(-2);
  if (d_h_ > 23) d_h_ = "23";
  var pp = d_h_ + ":" + d_m_;
  document.getElementById("event-time-start").value = p;
  document.getElementById("event-time-end").value = pp;
};

var pick_image_callback = function pick_image_callback(resultBlob) {
  var t = document.getElementById("form-image");
  t.src = URL.createObjectURL(resultBlob);
  document.getElementById("form-image-wrapper").classList.add("item");
  document.querySelectorAll("div#add-edit-event .item").forEach(function (i, p) {
    i.setAttribute("tabindex", p);
  });
  var fr = new FileReader();

  fr.onload = function () {
    blob = fr.result;
  };

  fr.readAsDataURL(resultBlob);
}; // ////////////////////////////
// //KEYPAD HANDLER////////////
// ////////////////////////////


var longpress = false;
var longpress_timespan = 1000;
var timeout;

function repeat_action(param) {
  switch (param.key) {
    case "0":
      break;
  }
} // ////////////
// //LONGPRESS
// ///////////


function longpress_action(param) {
  switch (param.key) {
    case "0":
      break;

    case "Backspace":
      window.close();
      break;

    case "ArrowLeft":
      if (status.view == "list-view") {}

      break;
  }
} // /////////////
// //SHORTPRESS
// ////////////


function shortpress_action(param) {
  switch (param.key) {
    case "*":
      jump_to_today();
      break;

    case "ArrowUp":
      if (status.view == "month") {
        nav(-7);
      }

      if (status.view == "add-edit-event" || status.view == "list-view" || status.view == "options" || status.view == "subscription") {
        nav(-1);
      }

      break;

    case "ArrowDown":
      if (status.view == "month") {
        nav(+7);
      }

      if (status.view == "add-edit-event" || status.view == "list-view" || status.view == "options" || status.view == "subscription") {
        nav(+1);
      }

      break;

    case "ArrowRight":
      if (status.view != "month") return true;
      nav(1);
      break;

    case "ArrowLeft":
      if (status.view != "month") return true;
      nav(-1);
      break;

    case "1":
      previous();
      break;

    case "3":
      next();
      break;

    case "2":
      slider_navigation();
      break;

    case "#":
      document.querySelectorAll("div#calendar div#calendar-body div div [class^='moon-phase-']").forEach(function (e) {
        e.classList.toggle("active");
      });
      break;

    case "7":
      break;

    case "SoftRight":
    case "Alt":
      console.log(status.view);

      if (status.view == "month") {
        status.view = "options";
        router();
        return true;
      }

      if (status.view == "subscription") {
        // store subscription
        store_subscription();
        return true;
      }

      break;

    case "SoftLeft":
    case "Control":
      if (status.view == "list-view") {
        if (document.activeElement.classList.contains("subscription")) {
          (0, _helper.toaster)("a subscription cannot be edited", 2000);
          return false;
        }

        status.selected_day_id = document.activeElement.getAttribute("data-id");
        status.edit_event = true;
        edit_event();
        status.view = "add-edit-event";
        router();
      }

      if (status.view == "subscription") {
        (0, _scan.start_scan)(callback_scan);
        status.view = "scan";
        return true;
      }

      if (status.view == "options") {
        delete_subscription();
        return true;
      }

      if (status.view == "month") {
        status.view = "add-edit-event";
        router(); // when new event
        // set time

        set_datetime_form();
        return true;
      }

      break;

    case "Enter":
      if (!status.visible) return false;

      if (document.activeElement.classList.contains("input-parent")) {
        document.activeElement.children[1].focus();
        return true;
      }

      if (document.activeElement.id == "export-event") {
        events.forEach(function (index) {
          if (index.UID == status.selected_day_id) {
            export_data.push(index);
          }
        });
        (0, _eximport.export_ical)(export_data[0].UID + ".ics", export_data);
        (0, _helper.toaster)("event exported", 2000);
        return true;
      }

      if (document.activeElement.id == "select-image") {
        (0, _helper.pick_image)(pick_image_callback);
        return true;
      }

      if (document.activeElement.id == "form-image-wrapper") {
        document.getElementById("form-image").src = "";
        blob = "";
        return true;
      }

      if (document.activeElement.getAttribute("data-function") == "add-subscription") {
        status.view = "subscription";
        router();
        return true;
      } // same button with different text and action


      if (document.activeElement.id == "save-event") {
        if (status.edit_event) {
          update_event();
        } else {
          store_event();
        }

        return true;
      }

      if (document.activeElement.id == "delete-event") {
        if (delete_event()) {
          status.view = "month";
          router();
        }

        return true;
      }

      if (status.view == "options") {
        if (document.activeElement.getAttribute("data-function") == "export") {
          _localforage.default.getItem("events").then(function (value) {
            (0, _eximport.export_ical)("greg.ics", value);
          }).catch(function (err) {
            console.log(err);
          });
        }

        if (document.activeElement.getAttribute("data-function") == "import") {
          (0, _eximport.loadICS)(document.activeElement.getAttribute("data-filename"), import_event);
        }

        return true;
      }

      if (status.view == "month" || status.view == "list-view") router("view");
      break;

    case "Backspace":
      if (status.view == "add-edit-event" && document.activeElement.tagName != "INPUT") {
        status.view = "month";
        router();
      }

      if (status.view == "options") {
        status.view = "month";
        router();
      }

      if (status.view == "scan") {
        status.views = "subscription";
        (0, _scan.stop_scan)();
        router();
      }

      break;
  }
} // ///////////////////////////////
// //shortpress / longpress logic
// //////////////////////////////


function handleKeyDown(evt) {
  option_button_bar();

  if (evt.key === "Backspace") {
    if (status.view == "options" || status.view == "add-edit-event" || status.view == "scan") {
      evt.preventDefault();
    }
  }

  if (evt.key === "EndCall") {
    evt.preventDefault();
    window.close();
  }

  if (!evt.repeat) {
    longpress = false;
    timeout = setTimeout(function () {
      longpress = true;
      longpress_action(evt);
    }, longpress_timespan);
  }

  if (evt.repeat) {
    if (evt.key == "Backspace") longpress = false;
    repeat_action(evt);
  }
}

function handleKeyUp(evt) {
  if (status.visible === false) return false;

  if (evt.key == "Backspace" && document.activeElement.tagName == "INPUT") {}

  clearTimeout(timeout);

  if (!longpress) {
    shortpress_action(evt);
  }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
document.addEventListener("visibilitychange", handleVisibilityChange, false);
},{"localforage":"EM1A","mustache":"gZU7","/assets/js/helper.js":"IWa2","/assets/js/getMoonPhase.js":"eYm5","/assets/js/eximport.js":"pX43","/assets/js/scan.js":"Wsof"}]},{},["A2T1"], null)