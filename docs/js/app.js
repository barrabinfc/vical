/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var rot = __webpack_require__(2);

	var docStyle = document.documentElement.style;
	var pointerClick = document.ontouchstart === undefined ? "click" : "touchstart";

	function start() {
	  requestIdleCallback(function () {
	    scrollListener();
	    fixHrefTarget(document);
	  });

	  requestAnimationFrame(function () {
	    // Page loaded animation
	    document.body.classList.add('page-loaded');
	  });

	  /* Get relative address of page */
	  var address = location.href.split("/").filter(function (t) {
	    return t != "" && t != "http:";
	  }).splice(1, 10).join("/");

	  /* Specific actions for Specific pages */
	}

	/*
	 * Listen to scroll-y, update css --scrolly variable
	 */
	function scrollListener() {}
	/* add passive listener
	const scrollHandler = document.addEventListener("scroll", (ev) => {
	  docStyle.setProperty("--scrolly", document.body.scrollTop)
	}, {passive: true})
	*/


	/**
	 * fixHrefTarget
	 *  Mimics :target behaviour using class toggling.
	 *  in CSS use :is-target, instead of :target
	 */
	function fixHrefTarget(container) {
	  var tgtClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ":is-target";

	  var linksWithHash = container.querySelectorAll('a[href^="#"]');
	  var target = undefined;

	  function add(tgt, klass) {
	    tgt.classList.add(klass);
	  }
	  function rm(tgt, klass) {
	    tgt.classList.remove(klass);
	  }

	  linksWithHash.forEach(function (link) {
	    link.addEventListener(pointerClick, function (e) {
	      e.preventDefault();

	      // set new target
	      var newTgt = this.getAttribute("href");
	      if (newTgt != "#") {
	        target = container.querySelector(newTgt);

	        // remove or add new class
	        if (target.classList.contains(tgtClass)) rm(target, tgtClass);else add(target, tgtClass);
	      }
	    });
	  });
	}

	/**
	 * Add class .in / out based on 'hover' of element
	 */
	function hoverInOut(container) {
	  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "hoverable";
	  var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;

	  var hoveredEls = container.querySelectorAll(selector);
	  hoveredEls.forEach(function (el) {
	    var is_hovered = false;
	    el.addEventListener("mouseover", function (ev) {
	      is_hovered = true;
	      el.classList.remove("out");
	      el.classList.add("in");
	    });
	    el.addEventListener("mouseout", function (ev) {
	      is_hovered = false;
	      el.classList.add("out");
	      el.classList.remove("in");
	    });
	  });
	}

	/**
	 * Ceasar cryptography to avoid spammers reading my mail address
	 *
	 * Acts on:
	 * Links with role['link-encrypted'] and data property
	 * All elements with class [ .ceasar .says ]
	 */
	function unlockMail() {

	  /* Links */
	  var links = document.querySelectorAll('a[role="link-encrypted"]');
	  links.forEach(function (el) {
	    var mailEncrypted = el.getAttribute("data");
	    var mailPlaintext = rot(mailEncrypted, -12);

	    requestAnimationFrame(function () {
	      el.href = mailPlaintext;
	    });
	  });

	  /* Plain txt */
	  var txts = document.querySelectorAll(".ceasar.says");
	  txts.forEach(function (el) {
	    var encrypted = el.innerHTML;
	    var plaintext = rot(encrypted, -12);
	    requestAnimationFrame(function () {
	      el.innerHTML = plaintext;
	    });
	  });
	}
	/* Export */
	window.unlockMail = unlockMail;

	document.addEventListener("DOMContentLoaded", start);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! http://mths.be/rot v0.1.0 by @mathias | MIT license */
	;(function(root) {

		// Detect free variables `exports`
		var freeExports = typeof exports == 'object' && exports;

		// Detect free variable `module`
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var lowercase = 'abcdefghijklmnopqrstuvwxyz';
		var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var regexLowercase = /[a-z]/;
		var regexUppercase = /[A-Z]/;

		var rot = function(string, n) {
			if (n == null) {
				// use ROT-13 by default
				n = 13;
			}
			n = Number(n);
			string = String(string);
			if (n == 0) {
				return string;
			}
			if (n < 0) { // decode instead of encode
				n += 26;
			}
			var length = string.length; // note: no need to account for astral symbols
			var index = -1;
			var result = '';
			var character;
			var currentPosition;
			var shiftedPosition;
			while (++index < length) {
				character = string.charAt(index);
				if (regexLowercase.test(character)) {
					currentPosition = lowercase.indexOf(character);
					shiftedPosition = (currentPosition + n) % 26;
					result += lowercase.charAt(shiftedPosition);
				} else if (regexUppercase.test(character)) {
					currentPosition = uppercase.indexOf(character);
					shiftedPosition = (currentPosition + n) % 26;
					result += uppercase.charAt(shiftedPosition);
				} else {
					result += character;
				}
			}
			return result;
		};

		rot.version = '0.1.0';

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return rot;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = rot;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (var key in rot) {
					rot.hasOwnProperty(key) && (freeExports[key] = rot[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.rot = rot;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module), (function() { return this; }())))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ })
/******/ ]);