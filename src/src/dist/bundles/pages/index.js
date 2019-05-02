module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ ({

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: [BABEL] /Volumes/Data/project/web/React Js/ventures/src/pages/index.js: Cannot find module 'babel-plugin-syntax-decorators' (While processing: \"/Volumes/Data/project/web/React Js/ventures/node_modules/babel-plugin-transform-decorators-legacy/lib/index.js\")\n    at Function.Module._resolveFilename (module.js:547:15)\n    at Function.Module._load (module.js:474:25)\n    at Module.require (module.js:596:17)\n    at require (internal/module.js:11:18)\n    at exports.default (/Volumes/Data/project/web/React Js/ventures/node_modules/babel-plugin-transform-decorators-legacy/lib/index.js:184:19)\n    at /Volumes/Data/project/web/React Js/ventures/node_modules/@babel/core/lib/config/full.js:163:14\n    at cachedFunction (/Volumes/Data/project/web/React Js/ventures/node_modules/@babel/core/lib/config/caching.js:40:17)\n    at loadPluginDescriptor (/Volumes/Data/project/web/React Js/ventures/node_modules/@babel/core/lib/config/full.js:198:28)\n    at /Volumes/Data/project/web/React Js/ventures/node_modules/@babel/core/lib/config/full.js:54:16\n    at Array.map (<anonymous>)\n    at recurseDescriptors (/Volumes/Data/project/web/React Js/ventures/node_modules/@babel/core/lib/config/full.js:53:36)\n    at loadFullConfig (/Volumes/Data/project/web/React Js/ventures/node_modules/@babel/core/lib/config/full.js:103:6)\n    at /Volumes/Data/project/web/React Js/ventures/node_modules/@babel/core/lib/transform.js:26:33\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.js.map