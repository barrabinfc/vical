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

	'use strict';

	var _fade = __webpack_require__(2);

	var rot = __webpack_require__(6);
	var Barba = __webpack_require__(3);

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

	    // Page transition loader
	    Barba.Pjax.Dom.wrapperId = 'page-trans-wrapper';
	    Barba.Pjax.Dom.containerClass = 'page-container';

	    Barba.Pjax.getTransition = function () {
	      return (0, _fade.GeneralTransition)('fade-in', 'fade-out', 2000);
	    };
	    Barba.Pjax.start();
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Barba = __webpack_require__(3);
	var TWEEN = __webpack_require__(4);

	var GeneralTransition = exports.GeneralTransition = function GeneralTransition() {
	    var InClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fade-in';
	    var OutClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'fade-out';
	    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1500;
	    return Barba.BaseTransition.extend({
	        start: function start() {
	            /**
	             * This function is automatically called as soon the Transition starts
	             * this.newContainerLoading is a Promise for the loading of the new container
	             * (Barba.js also comes with an handy Promise polyfill!)
	             */

	            // As soon the loading is finished and the old page is faded out, let's fade the new page
	            Promise.all([this.newContainerLoading, this.fadeOut.bind(this)()]).then(this.fadeIn.bind(this));
	        },

	        fadeOut: function fadeOut() {
	            /**
	             * WHAAAT
	             * this.oldContainer is the HTMLElement of the old Container
	             */
	            var el = this.oldContainer;

	            return new Promise(function (resolve, reject) {
	                requestAnimationFrame(function () {
	                    el.classList.remove(InClass);
	                    el.classList.add(OutClass);
	                });
	                setTimeout(function () {
	                    return resolve();
	                }, duration);
	            });
	        },

	        fadeIn: function fadeIn() {
	            var _this2 = this;

	            /**
	             * this.newContainer is the HTMLElement of the new Container
	             * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
	             * Please note, newContainer is available just after newContainerLoading is resolved!
	             */

	            var _this = this;
	            var el = this.newContainer;

	            this.oldContainer.style.visibility = 'hidden';
	            el.style.visibility = 'visible';

	            requestAnimationFrame(function () {
	                el.classList.add(InClass);
	            });
	            setTimeout(function () {
	                _this2.done();
	            }, duration);
	        }

	    });
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define("Barba", [], factory);
		else if(typeof exports === 'object')
			exports["Barba"] = factory();
		else
			root["Barba"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
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
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "http://localhost:8080/dist";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		//Promise polyfill https://github.com/taylorhakes/promise-polyfill
		
		if (typeof Promise !== 'function') {
		 window.Promise = __webpack_require__(1);
		}
		
		var Barba = {
		  version: '1.0.0',
		  BaseTransition: __webpack_require__(4),
		  BaseView: __webpack_require__(6),
		  BaseCache: __webpack_require__(8),
		  Dispatcher: __webpack_require__(7),
		  HistoryManager: __webpack_require__(9),
		  Pjax: __webpack_require__(10),
		  Prefetch: __webpack_require__(13),
		  Utils: __webpack_require__(5)
		};
		
		module.exports = Barba;


	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {
		
		  // Store setTimeout reference so promise-polyfill will be unaffected by
		  // other code modifying setTimeout (like sinon.useFakeTimers())
		  var setTimeoutFunc = setTimeout;
		
		  function noop() {
		  }
		
		  // Use polyfill for setImmediate for performance gains
		  var asap = (typeof setImmediate === 'function' && setImmediate) ||
		    function (fn) {
		      setTimeoutFunc(fn, 0);
		    };
		
		  var onUnhandledRejection = function onUnhandledRejection(err) {
		    if (typeof console !== 'undefined' && console) {
		      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
		    }
		  };
		
		  // Polyfill for Function.prototype.bind
		  function bind(fn, thisArg) {
		    return function () {
		      fn.apply(thisArg, arguments);
		    };
		  }
		
		  function Promise(fn) {
		    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
		    if (typeof fn !== 'function') throw new TypeError('not a function');
		    this._state = 0;
		    this._handled = false;
		    this._value = undefined;
		    this._deferreds = [];
		
		    doResolve(fn, this);
		  }
		
		  function handle(self, deferred) {
		    while (self._state === 3) {
		      self = self._value;
		    }
		    if (self._state === 0) {
		      self._deferreds.push(deferred);
		      return;
		    }
		    self._handled = true;
		    asap(function () {
		      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
		      if (cb === null) {
		        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
		        return;
		      }
		      var ret;
		      try {
		        ret = cb(self._value);
		      } catch (e) {
		        reject(deferred.promise, e);
		        return;
		      }
		      resolve(deferred.promise, ret);
		    });
		  }
		
		  function resolve(self, newValue) {
		    try {
		      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
		      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
		      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
		        var then = newValue.then;
		        if (newValue instanceof Promise) {
		          self._state = 3;
		          self._value = newValue;
		          finale(self);
		          return;
		        } else if (typeof then === 'function') {
		          doResolve(bind(then, newValue), self);
		          return;
		        }
		      }
		      self._state = 1;
		      self._value = newValue;
		      finale(self);
		    } catch (e) {
		      reject(self, e);
		    }
		  }
		
		  function reject(self, newValue) {
		    self._state = 2;
		    self._value = newValue;
		    finale(self);
		  }
		
		  function finale(self) {
		    if (self._state === 2 && self._deferreds.length === 0) {
		      asap(function() {
		        if (!self._handled) {
		          onUnhandledRejection(self._value);
		        }
		      });
		    }
		
		    for (var i = 0, len = self._deferreds.length; i < len; i++) {
		      handle(self, self._deferreds[i]);
		    }
		    self._deferreds = null;
		  }
		
		  function Handler(onFulfilled, onRejected, promise) {
		    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
		    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
		    this.promise = promise;
		  }
		
		  /**
		   * Take a potentially misbehaving resolver function and make sure
		   * onFulfilled and onRejected are only called once.
		   *
		   * Makes no guarantees about asynchrony.
		   */
		  function doResolve(fn, self) {
		    var done = false;
		    try {
		      fn(function (value) {
		        if (done) return;
		        done = true;
		        resolve(self, value);
		      }, function (reason) {
		        if (done) return;
		        done = true;
		        reject(self, reason);
		      });
		    } catch (ex) {
		      if (done) return;
		      done = true;
		      reject(self, ex);
		    }
		  }
		
		  Promise.prototype['catch'] = function (onRejected) {
		    return this.then(null, onRejected);
		  };
		
		  Promise.prototype.then = function (onFulfilled, onRejected) {
		    var prom = new (this.constructor)(noop);
		
		    handle(this, new Handler(onFulfilled, onRejected, prom));
		    return prom;
		  };
		
		  Promise.all = function (arr) {
		    var args = Array.prototype.slice.call(arr);
		
		    return new Promise(function (resolve, reject) {
		      if (args.length === 0) return resolve([]);
		      var remaining = args.length;
		
		      function res(i, val) {
		        try {
		          if (val && (typeof val === 'object' || typeof val === 'function')) {
		            var then = val.then;
		            if (typeof then === 'function') {
		              then.call(val, function (val) {
		                res(i, val);
		              }, reject);
		              return;
		            }
		          }
		          args[i] = val;
		          if (--remaining === 0) {
		            resolve(args);
		          }
		        } catch (ex) {
		          reject(ex);
		        }
		      }
		
		      for (var i = 0; i < args.length; i++) {
		        res(i, args[i]);
		      }
		    });
		  };
		
		  Promise.resolve = function (value) {
		    if (value && typeof value === 'object' && value.constructor === Promise) {
		      return value;
		    }
		
		    return new Promise(function (resolve) {
		      resolve(value);
		    });
		  };
		
		  Promise.reject = function (value) {
		    return new Promise(function (resolve, reject) {
		      reject(value);
		    });
		  };
		
		  Promise.race = function (values) {
		    return new Promise(function (resolve, reject) {
		      for (var i = 0, len = values.length; i < len; i++) {
		        values[i].then(resolve, reject);
		      }
		    });
		  };
		
		  /**
		   * Set the immediate function to execute callbacks
		   * @param fn {function} Function to execute
		   * @private
		   */
		  Promise._setImmediateFn = function _setImmediateFn(fn) {
		    asap = fn;
		  };
		
		  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
		    onUnhandledRejection = fn;
		  };
		
		  if (typeof module !== 'undefined' && module.exports) {
		    module.exports = Promise;
		  } else if (!root.Promise) {
		    root.Promise = Promise;
		  }
		
		})(this);
		
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate))

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(3).nextTick;
		var apply = Function.prototype.apply;
		var slice = Array.prototype.slice;
		var immediateIds = {};
		var nextImmediateId = 0;
		
		// DOM APIs, for completeness
		
		exports.setTimeout = function() {
		  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
		};
		exports.setInterval = function() {
		  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
		};
		exports.clearTimeout =
		exports.clearInterval = function(timeout) { timeout.close(); };
		
		function Timeout(id, clearFn) {
		  this._id = id;
		  this._clearFn = clearFn;
		}
		Timeout.prototype.unref = Timeout.prototype.ref = function() {};
		Timeout.prototype.close = function() {
		  this._clearFn.call(window, this._id);
		};
		
		// Does not start the time, just sets up the members needed.
		exports.enroll = function(item, msecs) {
		  clearTimeout(item._idleTimeoutId);
		  item._idleTimeout = msecs;
		};
		
		exports.unenroll = function(item) {
		  clearTimeout(item._idleTimeoutId);
		  item._idleTimeout = -1;
		};
		
		exports._unrefActive = exports.active = function(item) {
		  clearTimeout(item._idleTimeoutId);
		
		  var msecs = item._idleTimeout;
		  if (msecs >= 0) {
		    item._idleTimeoutId = setTimeout(function onTimeout() {
		      if (item._onTimeout)
		        item._onTimeout();
		    }, msecs);
		  }
		};
		
		// That's not how node.js implements it but the exposed api is the same.
		exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
		  var id = nextImmediateId++;
		  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
		
		  immediateIds[id] = true;
		
		  nextTick(function onNextTick() {
		    if (immediateIds[id]) {
		      // fn.call() is faster so we optimize for the common use-case
		      // @see http://jsperf.com/call-apply-segu
		      if (args) {
		        fn.apply(null, args);
		      } else {
		        fn.call(null);
		      }
		      // Prevent ids from leaking
		      exports.clearImmediate(id);
		    }
		  });
		
		  return id;
		};
		
		exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
		  delete immediateIds[id];
		};
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, __webpack_require__(2).clearImmediate))

	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		// shim for using process in browser
		
		var process = module.exports = {};
		
		// cached from whatever global is present so that test runners that stub it
		// don't break things.  But we need to wrap it in a try catch in case it is
		// wrapped in strict mode code which doesn't define any globals.  It's inside a
		// function because try/catches deoptimize in certain engines.
		
		var cachedSetTimeout;
		var cachedClearTimeout;
		
		(function () {
		  try {
		    cachedSetTimeout = setTimeout;
		  } catch (e) {
		    cachedSetTimeout = function () {
		      throw new Error('setTimeout is not defined');
		    }
		  }
		  try {
		    cachedClearTimeout = clearTimeout;
		  } catch (e) {
		    cachedClearTimeout = function () {
		      throw new Error('clearTimeout is not defined');
		    }
		  }
		} ())
		var queue = [];
		var draining = false;
		var currentQueue;
		var queueIndex = -1;
		
		function cleanUpNextTick() {
		    if (!draining || !currentQueue) {
		        return;
		    }
		    draining = false;
		    if (currentQueue.length) {
		        queue = currentQueue.concat(queue);
		    } else {
		        queueIndex = -1;
		    }
		    if (queue.length) {
		        drainQueue();
		    }
		}
		
		function drainQueue() {
		    if (draining) {
		        return;
		    }
		    var timeout = cachedSetTimeout(cleanUpNextTick);
		    draining = true;
		
		    var len = queue.length;
		    while(len) {
		        currentQueue = queue;
		        queue = [];
		        while (++queueIndex < len) {
		            if (currentQueue) {
		                currentQueue[queueIndex].run();
		            }
		        }
		        queueIndex = -1;
		        len = queue.length;
		    }
		    currentQueue = null;
		    draining = false;
		    cachedClearTimeout(timeout);
		}
		
		process.nextTick = function (fun) {
		    var args = new Array(arguments.length - 1);
		    if (arguments.length > 1) {
		        for (var i = 1; i < arguments.length; i++) {
		            args[i - 1] = arguments[i];
		        }
		    }
		    queue.push(new Item(fun, args));
		    if (queue.length === 1 && !draining) {
		        cachedSetTimeout(drainQueue, 0);
		    }
		};
		
		// v8 likes predictible objects
		function Item(fun, array) {
		    this.fun = fun;
		    this.array = array;
		}
		Item.prototype.run = function () {
		    this.fun.apply(null, this.array);
		};
		process.title = 'browser';
		process.browser = true;
		process.env = {};
		process.argv = [];
		process.version = ''; // empty string to avoid regexp issues
		process.versions = {};
		
		function noop() {}
		
		process.on = noop;
		process.addListener = noop;
		process.once = noop;
		process.off = noop;
		process.removeListener = noop;
		process.removeAllListeners = noop;
		process.emit = noop;
		
		process.binding = function (name) {
		    throw new Error('process.binding is not supported');
		};
		
		process.cwd = function () { return '/' };
		process.chdir = function (dir) {
		    throw new Error('process.chdir is not supported');
		};
		process.umask = function() { return 0; };


	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		var Utils = __webpack_require__(5);
		
		/**
		 * BaseTransition to extend
		 *
		 * @namespace Barba.BaseTransition
		 * @type {Object}
		 */
		var BaseTransition = {
		  /**
		   * @memberOf Barba.BaseTransition
		   * @type {HTMLElement}
		   */
		  oldContainer: undefined,
		
		  /**
		   * @memberOf Barba.BaseTransition
		   * @type {HTMLElement}
		   */
		  newContainer: undefined,
		
		  /**
		   * @memberOf Barba.BaseTransition
		   * @type {Promise}
		   */
		  newContainerLoading: undefined,
		
		  /**
		   * Helper to extend the object
		   *
		   * @memberOf Barba.BaseTransition
		   * @param  {Object} newObject
		   * @return {Object} newInheritObject
		   */
		  extend: function(obj){
		    return Utils.extend(this, obj);
		  },
		
		  /**
		   * This function is called from Pjax module to initialize
		   * the transition.
		   *
		   * @memberOf Barba.BaseTransition
		   * @private
		   * @param  {HTMLElement} oldContainer
		   * @param  {Promise} newContainer
		   * @return {Promise}
		   */
		  init: function(oldContainer, newContainer) {
		    var _this = this;
		
		    this.oldContainer = oldContainer;
		    this._newContainerPromise = newContainer;
		
		    this.deferred = Utils.deferred();
		    this.newContainerReady = Utils.deferred();
		    this.newContainerLoading = this.newContainerReady.promise;
		
		    this.start();
		
		    this._newContainerPromise.then(function(newContainer) {
		      _this.newContainer = newContainer;
		      _this.newContainerReady.resolve();
		    });
		
		    return this.deferred.promise;
		  },
		
		  /**
		   * This function needs to be called as soon the Transition is finished
		   *
		   * @memberOf Barba.BaseTransition
		   */
		  done: function() {
		    this.oldContainer.parentNode.removeChild(this.oldContainer);
		    this.newContainer.style.visibility = 'visible';
		    this.deferred.resolve();
		  },
		
		  /**
		   * Constructor for your Transition
		   *
		   * @memberOf Barba.BaseTransition
		   * @abstract
		   */
		  start: function() {},
		};
		
		module.exports = BaseTransition;


	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		/**
		 * Just an object with some helpful functions
		 *
		 * @type {Object}
		 * @namespace Barba.Utils
		 */
		var Utils = {
		  /**
		   * Return the current url
		   *
		   * @memberOf Barba.Utils
		   * @return {String} currentUrl
		   */
		  getCurrentUrl: function() {
		    return window.location.protocol + '//' +
		           window.location.host +
		           window.location.pathname +
		           window.location.search;
		  },
		
		  /**
		   * Given an url, return it without the hash
		   *
		   * @memberOf Barba.Utils
		   * @private
		   * @param  {String} url
		   * @return {String} newCleanUrl
		   */
		  cleanLink: function(url) {
		    return url.replace(/#.*/, '');
		  },
		
		  /**
		   * Time in millisecond after the xhr request goes in timeout
		   *
		   * @memberOf Barba.Utils
		   * @type {Number}
		   * @default
		   */
		  xhrTimeout: 5000,
		
		  /**
		   * Start an XMLHttpRequest() and return a Promise
		   *
		   * @memberOf Barba.Utils
		   * @param  {String} url
		   * @return {Promise}
		   */
		  xhr: function(url) {
		    var deferred = this.deferred();
		    var req = new XMLHttpRequest();
		
		    req.onreadystatechange = function() {
		      if (req.readyState === 4) {
		        if (req.status === 200) {
		          return deferred.resolve(req.responseText);
		        } else {
		          return deferred.reject(new Error('xhr: HTTP code is not 200'));
		        }
		      }
		    };
		
		    req.ontimeout = function() {
		      return deferred.reject(new Error('xhr: Timeout exceeded'));
		    };
		
		    req.open('GET', url);
		    req.timeout = this.xhrTimeout;
		    req.setRequestHeader('x-barba', 'yes');
		    req.send();
		
		    return deferred.promise;
		  },
		
		  /**
		   * Get obj and props and return a new object with the property merged
		   *
		   * @memberOf Barba.Utils
		   * @param  {object} obj
		   * @param  {object} props
		   * @return {object}
		   */
		  extend: function(obj, props) {
		    var newObj = Object.create(obj);
		
		    for(var prop in props) {
		      if(props.hasOwnProperty(prop)) {
		        newObj[prop] = props[prop];
		      }
		    }
		
		    return newObj;
		  },
		
		  /**
		   * Return a new "Deferred" object
		   * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
		   *
		   * @memberOf Barba.Utils
		   * @return {Deferred}
		   */
		  deferred: function() {
		    return new function() {
		      this.resolve = null;
		      this.reject = null;
		
		      this.promise = new Promise(function(resolve, reject) {
		        this.resolve = resolve;
		        this.reject = reject;
		      }.bind(this));
		    };
		  },
		
		  /**
		   * Return the port number normalized, eventually you can pass a string to be normalized.
		   *
		   * @memberOf Barba.Utils
		   * @private
		   * @param  {String} p
		   * @return {Int} port
		   */
		  getPort: function(p) {
		    var port = typeof p !== 'undefined' ? p : window.location.port;
		    var protocol = window.location.protocol;
		
		    if (port != '')
		      return parseInt(port);
		
		    if (protocol === 'http:')
		      return 80;
		
		    if (protocol === 'https:')
		      return 443;
		  }
		};
		
		module.exports = Utils;


	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		var Dispatcher = __webpack_require__(7);
		var Utils = __webpack_require__(5);
		
		/**
		 * BaseView to be extended
		 *
		 * @namespace Barba.BaseView
		 * @type {Object}
		 */
		var BaseView  = {
		  /**
		   * Namespace of the view.
		   * (need to be associated with the data-namespace of the container)
		   *
		   * @memberOf Barba.BaseView
		   * @type {String}
		   */
		  namespace: null,
		
		  /**
		   * Helper to extend the object
		   *
		   * @memberOf Barba.BaseView
		   * @param  {Object} newObject
		   * @return {Object} newInheritObject
		   */
		  extend: function(obj){
		    return Utils.extend(this, obj);
		  },
		
		  /**
		   * Init the view.
		   * P.S. Is suggested to init the view before starting Barba.Pjax.start(),
		   * in this way .onEnter() and .onEnterCompleted() will be fired for the current
		   * container when the page is loaded.
		   *
		   * @memberOf Barba.BaseView
		   */
		  init: function() {
		    var _this = this;
		
		    Dispatcher.on('initStateChange',
		      function(newStatus, oldStatus) {
		        if (oldStatus && oldStatus.namespace === _this.namespace)
		          _this.onLeave();
		      }
		    );
		
		    Dispatcher.on('newPageReady',
		      function(newStatus, oldStatus, container) {
		        _this.container = container;
		
		        if (newStatus.namespace === _this.namespace)
		          _this.onEnter();
		      }
		    );
		
		    Dispatcher.on('transitionCompleted',
		      function(newStatus, oldStatus) {
		        if (newStatus.namespace === _this.namespace)
		          _this.onEnterCompleted();
		
		        if (oldStatus && oldStatus.namespace === _this.namespace)
		          _this.onLeaveCompleted();
		      }
		    );
		  },
		
		 /**
		  * This function will be fired when the container
		  * is ready and attached to the DOM.
		  *
		  * @memberOf Barba.BaseView
		  * @abstract
		  */
		  onEnter: function() {},
		
		  /**
		   * This function will be fired when the transition
		   * to this container has just finished.
		   *
		   * @memberOf Barba.BaseView
		   * @abstract
		   */
		  onEnterCompleted: function() {},
		
		  /**
		   * This function will be fired when the transition
		   * to a new container has just started.
		   *
		   * @memberOf Barba.BaseView
		   * @abstract
		   */
		  onLeave: function() {},
		
		  /**
		   * This function will be fired when the container
		   * has just been removed from the DOM.
		   *
		   * @memberOf Barba.BaseView
		   * @abstract
		   */
		  onLeaveCompleted: function() {}
		}
		
		module.exports = BaseView;


	/***/ },
	/* 7 */
	/***/ function(module, exports) {

		/**
		 * Little Dispatcher inspired by MicroEvent.js
		 *
		 * @namespace Barba.Dispatcher
		 * @type {Object}
		 */
		var Dispatcher = {
		  /**
		   * Object that keeps all the events
		   *
		   * @memberOf Barba.Dispatcher
		   * @readOnly
		   * @type {Object}
		   */
		  events: {},
		
		  /**
		   * Bind a callback to an event
		   *
		   * @memberOf Barba.Dispatcher
		   * @param  {String} eventName
		   * @param  {Function} function
		   */
		  on: function(e, f) {
		    this.events[e] = this.events[e] || [];
		    this.events[e].push(f);
		  },
		
		  /**
		   * Unbind event
		   *
		   * @memberOf Barba.Dispatcher
		   * @param  {String} eventName
		   * @param  {Function} function
		   */
		  off: function(e, f) {
		    if(e in this.events === false)
		      return;
		
		    this.events[e].splice(this.events[e].indexOf(f), 1);
		  },
		
		  /**
		   * Fire the event running all the event associated to it
		   *
		   * @memberOf Barba.Dispatcher
		   * @param  {String} eventName
		   * @param  {...*} args
		   */
		  trigger: function(e) {//e, ...args
		    if (e in this.events === false)
		      return;
		
		    for(var i = 0; i < this.events[e].length; i++){
		      this.events[e][i].apply(this, Array.prototype.slice.call(arguments, 1));
		    }
		  }
		};
		
		module.exports = Dispatcher;


	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		var Utils = __webpack_require__(5);
		
		/**
		 * BaseCache it's a simple static cache
		 *
		 * @namespace Barba.BaseCache
		 * @type {Object}
		 */
		var BaseCache = {
		  /**
		   * The Object that keeps all the key value information
		   *
		   * @memberOf Barba.BaseCache
		   * @type {Object}
		   */
		  data: {},
		
		  /**
		   * Helper to extend this object
		   *
		   * @memberOf Barba.BaseCache
		   * @private
		   * @param  {Object} newObject
		   * @return {Object} newInheritObject
		   */
		  extend: function(obj) {
		    return Utils.extend(this, obj);
		  },
		
		  /**
		   * Set a key and value data, mainly Barba is going to save promises
		   *
		   * @memberOf Barba.BaseCache
		   * @param {String} key
		   * @param {*} value
		   */
		  set: function(key, val) {
		    this.data[key] = val;
		  },
		
		  /**
		   * Retrieve the data using the key
		   *
		   * @memberOf Barba.BaseCache
		   * @param  {String} key
		   * @return {*}
		   */
		  get: function(key) {
		    return this.data[key];
		  },
		
		  /**
		   * Flush the cache
		   *
		   * @memberOf Barba.BaseCache
		   */
		  reset: function() {
		    this.data = {};
		  }
		};
		
		module.exports = BaseCache;


	/***/ },
	/* 9 */
	/***/ function(module, exports) {

		/**
		 * HistoryManager helps to keep track of the navigation
		 *
		 * @namespace Barba.HistoryManager
		 * @type {Object}
		 */
		var HistoryManager = {
		  /**
		   * Keep track of the status in historic order
		   *
		   * @memberOf Barba.HistoryManager
		   * @readOnly
		   * @type {Array}
		   */
		  history: [],
		
		  /**
		   * Add a new set of url and namespace
		   *
		   * @memberOf Barba.HistoryManager
		   * @param {String} url
		   * @param {String} namespace
		   * @private
		   */
		  add: function(url, namespace) {
		    if (!namespace)
		      namespace = undefined;
		
		    this.history.push({
		      url: url,
		      namespace: namespace
		    });
		  },
		
		  /**
		   * Return information about the current status
		   *
		   * @memberOf Barba.HistoryManager
		   * @return {Object}
		   */
		  currentStatus: function() {
		    return this.history[this.history.length - 1];
		  },
		
		  /**
		   * Return information about the previous status
		   *
		   * @memberOf Barba.HistoryManager
		   * @return {Object}
		   */
		  prevStatus: function() {
		    var history = this.history;
		
		    if (history.length < 2)
		      return null;
		
		    return history[history.length - 2];
		  }
		};
		
		module.exports = HistoryManager;


	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		var Utils = __webpack_require__(5);
		var Dispatcher = __webpack_require__(7);
		var HideShowTransition = __webpack_require__(11);
		var BaseCache = __webpack_require__(8);
		
		var HistoryManager = __webpack_require__(9);
		var Dom = __webpack_require__(12);
		
		/**
		 * Pjax is a static object with main function
		 *
		 * @namespace Barba.Pjax
		 * @borrows Dom as Dom
		 * @type {Object}
		 */
		var Pjax = {
		  Dom: Dom,
		  History: HistoryManager,
		  Cache: BaseCache,
		
		  /**
		   * Indicate wether or not use the cache
		   *
		   * @memberOf Barba.Pjax
		   * @type {Boolean}
		   * @default
		   */
		  cacheEnabled: true,
		
		  /**
		   * Indicate if there is an animation in progress
		   *
		   * @memberOf Barba.Pjax
		   * @readOnly
		   * @type {Boolean}
		   */
		  transitionProgress: false,
		
		  /**
		   * Class name used to ignore links
		   *
		   * @memberOf Barba.Pjax
		   * @type {String}
		   * @default
		   */
		  ignoreClassLink: 'no-barba',
		
		  /**
		   * Function to be called to start Pjax
		   *
		   * @memberOf Barba.Pjax
		   */
		  start: function() {
		    this.init();
		  },
		
		  /**
		   * Init the events
		   *
		   * @memberOf Barba.Pjax
		   * @private
		   */
		  init: function() {
		    var container = this.Dom.getContainer();
		    var wrapper = this.Dom.getWrapper();
		
		    wrapper.setAttribute('aria-live', 'polite');
		
		    this.History.add(
		      this.getCurrentUrl(),
		      this.Dom.getNamespace(container)
		    );
		
		    //Fire for the current view.
		    Dispatcher.trigger('initStateChange', this.History.currentStatus());
		    Dispatcher.trigger('newPageReady',
		      this.History.currentStatus(),
		      {},
		      container,
		      this.Dom.currentHTML
		    );
		    Dispatcher.trigger('transitionCompleted', this.History.currentStatus());
		
		    this.bindEvents();
		  },
		
		  /**
		   * Attach the eventlisteners
		   *
		   * @memberOf Barba.Pjax
		   * @private
		   */
		  bindEvents: function() {
		    document.addEventListener('click',
		      this.onLinkClick.bind(this)
		    );
		
		    window.addEventListener('popstate',
		      this.onStateChange.bind(this)
		    );
		  },
		
		  /**
		   * Return the currentURL cleaned
		   *
		   * @memberOf Barba.Pjax
		   * @return {String} currentUrl
		   */
		  getCurrentUrl: function() {
		    return Utils.cleanLink(
		      Utils.getCurrentUrl()
		    );
		  },
		
		  /**
		   * Change the URL with pushstate and trigger the state change
		   *
		   * @memberOf Barba.Pjax
		   * @param {String} newUrl
		   */
		  goTo: function(url) {
		    window.history.pushState(null, null, url);
		    this.onStateChange();
		  },
		
		  /**
		   * Force the browser to go to a certain url
		   *
		   * @memberOf Barba.Pjax
		   * @param {String} url
		   * @private
		   */
		  forceGoTo: function(url) {
		    window.location = url;
		  },
		
		  /**
		   * Load an url, will start an xhr request or load from the cache
		   *
		   * @memberOf Barba.Pjax
		   * @private
		   * @param  {String} url
		   * @return {Promise}
		   */
		  load: function(url) {
		    var deferred = Utils.deferred();
		    var _this = this;
		    var xhr;
		
		    xhr = this.Cache.get(url);
		
		    if (!xhr) {
		      xhr = Utils.xhr(url);
		      this.Cache.set(url, xhr);
		    }
		
		    xhr.then(
		      function(data) {
		        var container = _this.Dom.parseResponse(data);
		
		        _this.Dom.putContainer(container);
		
		        if (!_this.cacheEnabled)
		          _this.Cache.reset();
		
		        deferred.resolve(container);
		      },
		      function() {
		        //Something went wrong (timeout, 404, 505...)
		        _this.forceGoTo(url);
		
		        deferred.reject();
		      }
		    );
		
		    return deferred.promise;
		  },
		
		  /**
		   * Get the .href parameter out of an element
		   * and handle special cases (like xlink:href)
		   *
		   * @private
		   * @memberOf Barba.Pjax
		   * @param  {HTMLElement} el
		   * @return {String} href
		   */
		  getHref: function(el) {
		    if (!el) {
		      return undefined;
		    }
		
		    if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
		      return el.getAttribute('xlink:href');
		    }
		
		    if (typeof el.href === 'string') {
		      return el.href;
		    }
		
		    return undefined;
		  },
		
		  /**
		   * Callback called from click event
		   *
		   * @memberOf Barba.Pjax
		   * @private
		   * @param {MouseEvent} evt
		   */
		  onLinkClick: function(evt) {
		    var el = evt.target;
		
		    //Go up in the nodelist until we
		    //find something with an href
		    while (el && !this.getHref(el)) {
		      el = el.parentNode;
		    }
		
		    if (this.preventCheck(evt, el)) {
		      evt.stopPropagation();
		      evt.preventDefault();
		
		      Dispatcher.trigger('linkClicked', el, evt);
		
		      var href = this.getHref(el);
		      this.goTo(href);
		    }
		  },
		
		  /**
		   * Determine if the link should be followed
		   *
		   * @memberOf Barba.Pjax
		   * @param  {MouseEvent} evt
		   * @param  {HTMLElement} element
		   * @return {Boolean}
		   */
		  preventCheck: function(evt, element) {
		    if (!window.history.pushState)
		      return false;
		
		    var href = this.getHref(element);
		
		    //User
		    if (!element || !href)
		      return false;
		
		    //Middle click, cmd click, and ctrl click
		    if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey)
		      return false;
		
		    //Ignore target with _blank target
		    if (element.target && element.target === '_blank')
		      return false;
		
		    //Check if it's the same domain
		    if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname)
		      return false;
		
		    //Check if the port is the same
		    if (Utils.getPort() !== Utils.getPort(element.port))
		      return false;
		
		    //Ignore case when a hash is being tacked on the current URL
		    if (href.indexOf('#') > -1)
		      return false;
		
		    //Ignore case where there is download attribute
		    if (element.getAttribute && typeof element.getAttribute('download') === 'string')
		      return false;
		
		    //In case you're trying to load the same page
		    if (Utils.cleanLink(href) == Utils.cleanLink(location.href))
		      return false;
		
		    if (element.classList.contains(this.ignoreClassLink))
		      return false;
		
		    return true;
		  },
		
		  /**
		   * Return a transition object
		   *
		   * @memberOf Barba.Pjax
		   * @return {Barba.Transition} Transition object
		   */
		  getTransition: function() {
		    //User customizable
		    return HideShowTransition;
		  },
		
		  /**
		   * Method called after a 'popstate' or from .goTo()
		   *
		   * @memberOf Barba.Pjax
		   * @private
		   */
		  onStateChange: function() {
		    var newUrl = this.getCurrentUrl();
		
		    if (this.transitionProgress)
		      this.forceGoTo(newUrl);
		
		    if (this.History.currentStatus().url === newUrl)
		      return false;
		
		    this.History.add(newUrl);
		
		    var newContainer = this.load(newUrl);
		    var transition = Object.create(this.getTransition());
		
		    this.transitionProgress = true;
		
		    Dispatcher.trigger('initStateChange',
		      this.History.currentStatus(),
		      this.History.prevStatus()
		    );
		
		    var transitionInstance = transition.init(
		      this.Dom.getContainer(),
		      newContainer
		    );
		
		    newContainer.then(
		      this.onNewContainerLoaded.bind(this)
		    );
		
		    transitionInstance.then(
		      this.onTransitionEnd.bind(this)
		    );
		  },
		
		  /**
		   * Function called as soon the new container is ready
		   *
		   * @memberOf Barba.Pjax
		   * @private
		   * @param {HTMLElement} container
		   */
		  onNewContainerLoaded: function(container) {
		    var currentStatus = this.History.currentStatus();
		    currentStatus.namespace = this.Dom.getNamespace(container);
		
		    Dispatcher.trigger('newPageReady',
		      this.History.currentStatus(),
		      this.History.prevStatus(),
		      container,
		      this.Dom.currentHTML
		    );
		  },
		
		  /**
		   * Function called as soon the transition is finished
		   *
		   * @memberOf Barba.Pjax
		   * @private
		   */
		  onTransitionEnd: function() {
		    this.transitionProgress = false;
		
		    Dispatcher.trigger('transitionCompleted',
		      this.History.currentStatus(),
		      this.History.prevStatus()
		    );
		  }
		};
		
		module.exports = Pjax;


	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {

		var BaseTransition = __webpack_require__(4);
		
		/**
		 * Basic Transition object, wait for the new Container to be ready,
		 * scroll top, and finish the transition (removing the old container and displaying the new one)
		 *
		 * @private
		 * @namespace Barba.HideShowTransition
		 * @augments Barba.BaseTransition
		 */
		var HideShowTransition = BaseTransition.extend({
		  start: function() {
		    this.newContainerLoading.then(this.finish.bind(this));
		  },
		
		  finish: function() {
		    document.body.scrollTop = 0;
		    this.done();
		  }
		});
		
		module.exports = HideShowTransition;


	/***/ },
	/* 12 */
	/***/ function(module, exports) {

		/**
		 * Object that is going to deal with DOM parsing/manipulation
		 *
		 * @namespace Barba.Pjax.Dom
		 * @type {Object}
		 */
		var Dom = {
		  /**
		   * The name of the data attribute on the container
		   *
		   * @memberOf Barba.Pjax.Dom
		   * @type {String}
		   * @default
		   */
		  dataNamespace: 'namespace',
		
		  /**
		   * Id of the main wrapper
		   *
		   * @memberOf Barba.Pjax.Dom
		   * @type {String}
		   * @default
		   */
		  wrapperId: 'barba-wrapper',
		
		  /**
		   * Class name used to identify the containers
		   *
		   * @memberOf Barba.Pjax.Dom
		   * @type {String}
		   * @default
		   */
		  containerClass: 'barba-container',
		
		  /**
		   * Full HTML String of the current page.
		   * By default is the innerHTML of the initial loaded page.
		   *
		   * Each time a new page is loaded, the value is the response of the xhr call.
		   *
		   * @memberOf Barba.Pjax.Dom
		   * @type {String}
		   */
		  currentHTML: document.documentElement.innerHTML,
		
		  /**
		   * Parse the responseText obtained from the xhr call
		   *
		   * @memberOf Barba.Pjax.Dom
		   * @private
		   * @param  {String} responseText
		   * @return {HTMLElement}
		   */
		  parseResponse: function(responseText) {
		    this.currentHTML = responseText;
		
		    var wrapper = document.createElement('div');
		    wrapper.innerHTML = responseText;
		
		    var titleEl = wrapper.querySelector('title');
		
		    if (titleEl)
		      document.title = titleEl.textContent;
		
		    return this.getContainer(wrapper);
		  },
		
		  /**
		   * Get the main barba wrapper by the ID `wrapperId`
		   *
		   * @memberOf Barba.Pjax.Dom
		   * @return {HTMLElement} element
		   */
		  getWrapper: function() {
		    var wrapper = document.getElementById(this.wrapperId);
		
		    if (!wrapper)
		      throw new Error('Barba.js: wrapper not found!');
		
		    return wrapper;
		  },
		
		  /**
		   * Get the container on the current DOM,
		   * or from an HTMLElement passed via argument
		   *
		   * @memberOf Barba.Pjax.Dom
		   * @private
		   * @param  {HTMLElement} element
		   * @return {HTMLElement}
		   */
		  getContainer: function(element) {
		    if (!element)
		      element = document.body;
		
		    if (!element)
		      throw new Error('Barba.js: DOM not ready!');
		
		    var container = this.parseContainer(element);
		
		    if (container && container.jquery)
		      container = container[0];
		
		    if (!container)
		      throw new Error('Barba.js: no container found');
		
		    return container;
		  },
		
		  /**
		   * Get the namespace of the container
		   *
		   * @memberOf Barba.Pjax.Dom
		   * @private
		   * @param  {HTMLElement} element
		   * @return {String}
		   */
		  getNamespace: function(element) {
		    if (element && element.dataset) {
		      return element.dataset[this.dataNamespace];
		    } else if (element) {
		      return element.getAttribute('data-' + this.dataNamespace);
		    }
		
		    return null;
		  },
		
		  /**
		   * Put the container on the page
		   *
		   * @memberOf Barba.Pjax.Dom
		   * @private
		   * @param  {HTMLElement} element
		   */
		  putContainer: function(element) {
		    element.style.visibility = 'hidden';
		
		    var wrapper = this.getWrapper();
		    wrapper.appendChild(element);
		  },
		
		  /**
		   * Get container selector
		   *
		   * @memberOf Barba.Pjax.Dom
		   * @private
		   * @param  {HTMLElement} element
		   * @return {HTMLElement} element
		   */
		  parseContainer: function(element) {
		    return element.querySelector('.' + this.containerClass);
		  }
		};
		
		module.exports = Dom;


	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {

		var Utils = __webpack_require__(5);
		var Pjax = __webpack_require__(10);
		
		/**
		 * Prefetch
		 *
		 * @namespace Barba.Prefetch
		 * @type {Object}
		 */
		var Prefetch = {
		  /**
		   * Class name used to ignore prefetch on links
		   *
		   * @memberOf Barba.Prefetch
		   * @type {String}
		   * @default
		   */
		  ignoreClassLink: 'no-barba-prefetch',
		
		  /**
		   * Init the event listener on mouseover and touchstart
		   * for the prefetch
		   *
		   * @memberOf Barba.Prefetch
		   */
		  init: function() {
		    if (!window.history.pushState) {
		      return false;
		    }
		
		    document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
		    document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
		  },
		
		  /**
		   * Callback for the mousehover/touchstart
		   *
		   * @memberOf Barba.Prefetch
		   * @private
		   * @param  {Object} evt
		   */
		  onLinkEnter: function(evt) {
		    var el = evt.target;
		
		    while (el && !Pjax.getHref(el)) {
		      el = el.parentNode;
		    }
		
		    if (!el || el.classList.contains(this.ignoreClassLink)) {
		      return;
		    }
		
		    var url = Pjax.getHref(el);
		
		    //Check if the link is elegible for Pjax
		    if (Pjax.preventCheck(evt, el) && !Pjax.Cache.get(url)) {
		      var xhr = Utils.xhr(url);
		      Pjax.Cache.set(url, xhr);
		    }
		  }
		};
		
		module.exports = Prefetch;


	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=barba.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Tween.js - Licensed under the MIT license
	 * https://github.com/tweenjs/tween.js
	 * ----------------------------------------------
	 *
	 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
	 * Thank you all, you're awesome!
	 */


	var _Group = function () {
		this._tweens = {};
		this._tweensAddedDuringUpdate = {};
	};

	_Group.prototype = {
		getAll: function () {

			return Object.keys(this._tweens).map(function (tweenId) {
				return this._tweens[tweenId];
			}.bind(this));

		},

		removeAll: function () {

			this._tweens = {};

		},

		add: function (tween) {

			this._tweens[tween.getId()] = tween;
			this._tweensAddedDuringUpdate[tween.getId()] = tween;

		},

		remove: function (tween) {

			delete this._tweens[tween.getId()];
			delete this._tweensAddedDuringUpdate[tween.getId()];

		},

		update: function (time, preserve) {

			var tweenIds = Object.keys(this._tweens);

			if (tweenIds.length === 0) {
				return false;
			}

			time = time !== undefined ? time : TWEEN.now();

			// Tweens are updated in "batches". If you add a new tween during an update, then the
			// new tween will be updated in the next batch.
			// If you remove a tween during an update, it may or may not be updated. However,
			// if the removed tween was added during the current batch, then it will not be updated.
			while (tweenIds.length > 0) {
				this._tweensAddedDuringUpdate = {};

				for (var i = 0; i < tweenIds.length; i++) {

					var tween = this._tweens[tweenIds[i]];

					if (tween && tween.update(time) === false) {
						tween._isPlaying = false;

						if (!preserve) {
							delete this._tweens[tweenIds[i]];
						}
					}
				}

				tweenIds = Object.keys(this._tweensAddedDuringUpdate);
			}

			return true;

		}
	};

	var TWEEN = new _Group();

	TWEEN.Group = _Group;
	TWEEN._nextId = 0;
	TWEEN.nextId = function () {
		return TWEEN._nextId++;
	};


	// Include a performance.now polyfill.
	// In node.js, use process.hrtime.
	if (typeof (window) === 'undefined' && typeof (process) !== 'undefined') {
		TWEEN.now = function () {
			var time = process.hrtime();

			// Convert [seconds, nanoseconds] to milliseconds.
			return time[0] * 1000 + time[1] / 1000000;
		};
	}
	// In a browser, use window.performance.now if it is available.
	else if (typeof (window) !== 'undefined' &&
	         window.performance !== undefined &&
			 window.performance.now !== undefined) {
		// This must be bound, because directly assigning this function
		// leads to an invocation exception in Chrome.
		TWEEN.now = window.performance.now.bind(window.performance);
	}
	// Use Date.now if it is available.
	else if (Date.now !== undefined) {
		TWEEN.now = Date.now;
	}
	// Otherwise, use 'new Date().getTime()'.
	else {
		TWEEN.now = function () {
			return new Date().getTime();
		};
	}


	TWEEN.Tween = function (object, group) {
		this._object = object;
		this._valuesStart = {};
		this._valuesEnd = {};
		this._valuesStartRepeat = {};
		this._duration = 1000;
		this._repeat = 0;
		this._repeatDelayTime = undefined;
		this._yoyo = false;
		this._isPlaying = false;
		this._reversed = false;
		this._delayTime = 0;
		this._startTime = null;
		this._easingFunction = TWEEN.Easing.Linear.None;
		this._interpolationFunction = TWEEN.Interpolation.Linear;
		this._chainedTweens = [];
		this._onStartCallback = null;
		this._onStartCallbackFired = false;
		this._onUpdateCallback = null;
		this._onCompleteCallback = null;
		this._onStopCallback = null;
		this._group = group || TWEEN;
		this._id = TWEEN.nextId();

	};

	TWEEN.Tween.prototype = {
		getId: function getId() {
			return this._id;
		},

		isPlaying: function isPlaying() {
			return this._isPlaying;
		},

		to: function to(properties, duration) {

			this._valuesEnd = properties;

			if (duration !== undefined) {
				this._duration = duration;
			}

			return this;

		},

		start: function start(time) {

			this._group.add(this);

			this._isPlaying = true;

			this._onStartCallbackFired = false;

			this._startTime = time !== undefined ? typeof time === 'string' ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
			this._startTime += this._delayTime;

			for (var property in this._valuesEnd) {

				// Check if an Array was provided as property value
				if (this._valuesEnd[property] instanceof Array) {

					if (this._valuesEnd[property].length === 0) {
						continue;
					}

					// Create a local copy of the Array with the start value at the front
					this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);

				}

				// If `to()` specifies a property that doesn't exist in the source object,
				// we should not set that property in the object
				if (this._object[property] === undefined) {
					continue;
				}

				// Save the starting value.
				this._valuesStart[property] = this._object[property];

				if ((this._valuesStart[property] instanceof Array) === false) {
					this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
				}

				this._valuesStartRepeat[property] = this._valuesStart[property] || 0;

			}

			return this;

		},

		stop: function stop() {

			if (!this._isPlaying) {
				return this;
			}

			this._group.remove(this);
			this._isPlaying = false;

			if (this._onStopCallback !== null) {
				this._onStopCallback(this._object);
			}

			this.stopChainedTweens();
			return this;

		},

		end: function end() {

			this.update(this._startTime + this._duration);
			return this;

		},

		stopChainedTweens: function stopChainedTweens() {

			for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
				this._chainedTweens[i].stop();
			}

		},

		group: function group(group) {
			this._group = group;
			return this;
		},

		delay: function delay(amount) {

			this._delayTime = amount;
			return this;

		},

		repeat: function repeat(times) {

			this._repeat = times;
			return this;

		},

		repeatDelay: function repeatDelay(amount) {

			this._repeatDelayTime = amount;
			return this;

		},

		yoyo: function yoyo(yy) {

			this._yoyo = yy;
			return this;

		},

		easing: function easing(eas) {

			this._easingFunction = eas;
			return this;

		},

		interpolation: function interpolation(inter) {

			this._interpolationFunction = inter;
			return this;

		},

		chain: function chain() {

			this._chainedTweens = arguments;
			return this;

		},

		onStart: function onStart(callback) {

			this._onStartCallback = callback;
			return this;

		},

		onUpdate: function onUpdate(callback) {

			this._onUpdateCallback = callback;
			return this;

		},

		onComplete: function onComplete(callback) {

			this._onCompleteCallback = callback;
			return this;

		},

		onStop: function onStop(callback) {

			this._onStopCallback = callback;
			return this;

		},

		update: function update(time) {

			var property;
			var elapsed;
			var value;

			if (time < this._startTime) {
				return true;
			}

			if (this._onStartCallbackFired === false) {

				if (this._onStartCallback !== null) {
					this._onStartCallback(this._object);
				}

				this._onStartCallbackFired = true;
			}

			elapsed = (time - this._startTime) / this._duration;
			elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

			value = this._easingFunction(elapsed);

			for (property in this._valuesEnd) {

				// Don't update properties that do not exist in the source object
				if (this._valuesStart[property] === undefined) {
					continue;
				}

				var start = this._valuesStart[property] || 0;
				var end = this._valuesEnd[property];

				if (end instanceof Array) {

					this._object[property] = this._interpolationFunction(end, value);

				} else {

					// Parses relative end values with start as base (e.g.: +10, -3)
					if (typeof (end) === 'string') {

						if (end.charAt(0) === '+' || end.charAt(0) === '-') {
							end = start + parseFloat(end);
						} else {
							end = parseFloat(end);
						}
					}

					// Protect against non numeric properties.
					if (typeof (end) === 'number') {
						this._object[property] = start + (end - start) * value;
					}

				}

			}

			if (this._onUpdateCallback !== null) {
				this._onUpdateCallback(this._object);
			}

			if (elapsed === 1) {

				if (this._repeat > 0) {

					if (isFinite(this._repeat)) {
						this._repeat--;
					}

					// Reassign starting values, restart by making startTime = now
					for (property in this._valuesStartRepeat) {

						if (typeof (this._valuesEnd[property]) === 'string') {
							this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
						}

						if (this._yoyo) {
							var tmp = this._valuesStartRepeat[property];

							this._valuesStartRepeat[property] = this._valuesEnd[property];
							this._valuesEnd[property] = tmp;
						}

						this._valuesStart[property] = this._valuesStartRepeat[property];

					}

					if (this._yoyo) {
						this._reversed = !this._reversed;
					}

					if (this._repeatDelayTime !== undefined) {
						this._startTime = time + this._repeatDelayTime;
					} else {
						this._startTime = time + this._delayTime;
					}

					return true;

				} else {

					if (this._onCompleteCallback !== null) {

						this._onCompleteCallback(this._object);
					}

					for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
						// Make the chained tweens start exactly at the time they should,
						// even if the `update()` method was called way past the duration of the tween
						this._chainedTweens[i].start(this._startTime + this._duration);
					}

					return false;

				}

			}

			return true;

		}
	};


	TWEEN.Easing = {

		Linear: {

			None: function (k) {

				return k;

			}

		},

		Quadratic: {

			In: function (k) {

				return k * k;

			},

			Out: function (k) {

				return k * (2 - k);

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k;
				}

				return - 0.5 * (--k * (k - 2) - 1);

			}

		},

		Cubic: {

			In: function (k) {

				return k * k * k;

			},

			Out: function (k) {

				return --k * k * k + 1;

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k;
				}

				return 0.5 * ((k -= 2) * k * k + 2);

			}

		},

		Quartic: {

			In: function (k) {

				return k * k * k * k;

			},

			Out: function (k) {

				return 1 - (--k * k * k * k);

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k;
				}

				return - 0.5 * ((k -= 2) * k * k * k - 2);

			}

		},

		Quintic: {

			In: function (k) {

				return k * k * k * k * k;

			},

			Out: function (k) {

				return --k * k * k * k * k + 1;

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return 0.5 * k * k * k * k * k;
				}

				return 0.5 * ((k -= 2) * k * k * k * k + 2);

			}

		},

		Sinusoidal: {

			In: function (k) {

				return 1 - Math.cos(k * Math.PI / 2);

			},

			Out: function (k) {

				return Math.sin(k * Math.PI / 2);

			},

			InOut: function (k) {

				return 0.5 * (1 - Math.cos(Math.PI * k));

			}

		},

		Exponential: {

			In: function (k) {

				return k === 0 ? 0 : Math.pow(1024, k - 1);

			},

			Out: function (k) {

				return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

			},

			InOut: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				if ((k *= 2) < 1) {
					return 0.5 * Math.pow(1024, k - 1);
				}

				return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

			}

		},

		Circular: {

			In: function (k) {

				return 1 - Math.sqrt(1 - k * k);

			},

			Out: function (k) {

				return Math.sqrt(1 - (--k * k));

			},

			InOut: function (k) {

				if ((k *= 2) < 1) {
					return - 0.5 * (Math.sqrt(1 - k * k) - 1);
				}

				return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

			}

		},

		Elastic: {

			In: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

			},

			Out: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

			},

			InOut: function (k) {

				if (k === 0) {
					return 0;
				}

				if (k === 1) {
					return 1;
				}

				k *= 2;

				if (k < 1) {
					return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
				}

				return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

			}

		},

		Back: {

			In: function (k) {

				var s = 1.70158;

				return k * k * ((s + 1) * k - s);

			},

			Out: function (k) {

				var s = 1.70158;

				return --k * k * ((s + 1) * k + s) + 1;

			},

			InOut: function (k) {

				var s = 1.70158 * 1.525;

				if ((k *= 2) < 1) {
					return 0.5 * (k * k * ((s + 1) * k - s));
				}

				return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

			}

		},

		Bounce: {

			In: function (k) {

				return 1 - TWEEN.Easing.Bounce.Out(1 - k);

			},

			Out: function (k) {

				if (k < (1 / 2.75)) {
					return 7.5625 * k * k;
				} else if (k < (2 / 2.75)) {
					return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
				} else if (k < (2.5 / 2.75)) {
					return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
				} else {
					return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
				}

			},

			InOut: function (k) {

				if (k < 0.5) {
					return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
				}

				return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

			}

		}

	};

	TWEEN.Interpolation = {

		Linear: function (v, k) {

			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.Linear;

			if (k < 0) {
				return fn(v[0], v[1], f);
			}

			if (k > 1) {
				return fn(v[m], v[m - 1], m - f);
			}

			return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

		},

		Bezier: function (v, k) {

			var b = 0;
			var n = v.length - 1;
			var pw = Math.pow;
			var bn = TWEEN.Interpolation.Utils.Bernstein;

			for (var i = 0; i <= n; i++) {
				b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
			}

			return b;

		},

		CatmullRom: function (v, k) {

			var m = v.length - 1;
			var f = m * k;
			var i = Math.floor(f);
			var fn = TWEEN.Interpolation.Utils.CatmullRom;

			if (v[0] === v[m]) {

				if (k < 0) {
					i = Math.floor(f = m * (1 + k));
				}

				return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

			} else {

				if (k < 0) {
					return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
				}

				if (k > 1) {
					return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
				}

				return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

			}

		},

		Utils: {

			Linear: function (p0, p1, t) {

				return (p1 - p0) * t + p0;

			},

			Bernstein: function (n, i) {

				var fc = TWEEN.Interpolation.Utils.Factorial;

				return fc(n) / fc(i) / fc(n - i);

			},

			Factorial: (function () {

				var a = [1];

				return function (n) {

					var s = 1;

					if (a[n]) {
						return a[n];
					}

					for (var i = n; i > 1; i--) {
						s *= i;
					}

					a[n] = s;
					return s;

				};

			})(),

			CatmullRom: function (p0, p1, p2, p3, t) {

				var v0 = (p2 - p0) * 0.5;
				var v1 = (p3 - p1) * 0.5;
				var t2 = t * t;
				var t3 = t * t2;

				return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

			}

		}

	};

	// UMD (Universal Module Definition)
	(function (root) {

		if (true) {

			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return TWEEN;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

		} else if (typeof module !== 'undefined' && typeof exports === 'object') {

			// Node.js
			module.exports = TWEEN;

		} else if (root !== undefined) {

			// Global variable
			root.TWEEN = TWEEN;

		}

	})(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 6 */
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)(module), (function() { return this; }())))

/***/ }),
/* 7 */
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