"use strict";
exports.__esModule = true;
var DEFAULT_NAMESPACE = 'Server';
var info = function (message, namespace) {
    if (typeof message === 'string') {
        console.log("[" + getDate() + "] [" + (namespace || DEFAULT_NAMESPACE) + "] [INFO] " + message);
    }
    else {
        console.log("[" + getDate() + "] [" + (namespace || DEFAULT_NAMESPACE) + "] [INFO]", message);
    }
};
var warn = function (message, namespace) {
    if (typeof message === 'string') {
        console.log("[" + getDate() + "] [" + (namespace || DEFAULT_NAMESPACE) + "] [WARN] " + message);
    }
    else {
        console.log("[" + getDate() + "] [" + (namespace || DEFAULT_NAMESPACE) + "] [WARN]", message);
    }
};
var error = function (message, namespace) {
    if (typeof message === 'string') {
        console.log("[" + getDate() + "] [" + (namespace || DEFAULT_NAMESPACE) + "] [ERROR] " + message);
    }
    else {
        console.log("[" + getDate() + "] [" + (namespace || DEFAULT_NAMESPACE) + "] [ERROR]", message);
    }
};
var getDate = function () {
    return new Date().toISOString();
};
var logging = { info: info, warn: warn, error: error };
exports["default"] = logging;
