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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/*!
	 * A lightweight and dependency-free javascript plugin
	 * for particle backgrounds.
	 * 
	 * @author Marc Brüderlin <hello@marcbruederlin.com>
	 * @version 1.0.0
	 * @license MIT
	 * @see https://marcbruederlin.github.io/particles.js/
	 */
	var Particles = function (window, document) {
	  'use strict';

	  // Global variables

	  var Plugin, Particle, canvas, context, config;

	  Plugin = function Plugin() {
	    // Particle storage, all particles will be stored in this array
	    this.storage = [];

	    // Default settings, will be overridden by the users options
	    this.defaults = {
	      maxParticles: 100,
	      sizeVariations: 3,
	      speed: 0.5,
	      color: '#000000',
	      minDistance: 120,
	      connectParticles: false
	    };

	    /**
	     * The plugins startup function. This method prepares the global config object,
	     * the canvas and an event handler for resize events.
	     * 
	     * @param {Object} options - the user options
	     */
	    this.init = function (options) {
	      // Setup an event handler for resize events
	      window.addEventListener('resize', this.resize.bind(this), false);

	      // Check if options and a selector are specified
	      if (options === undefined || !options.selector) {
	        console.warn('particles.js: No selector is specified! Check https://github.com/marcbruederlin/particles.js#options');
	        return false;
	      }

	      // Setup the global configuration
	      config = _mergeObjects(this.defaults, options);
	      config.color = _hex2rgb(config.color);

	      // Setup the canvas
	      canvas = document.querySelector(config.selector);
	      context = canvas.getContext('2d');

	      // Set the canvas dimensions
	      canvas.width = window.innerWidth;
	      canvas.height = window.innerHeight;

	      // Fill the storage with the given amount of particle instances
	      for (var i = config.maxParticles; i--;) {
	        this.storage.push(new Particle());
	      }

	      // Run the plugins animation method
	      this.animate();
	    };

	    /**
	     * Calls the draw method 60 times per second.
	     */
	    this.animate = function () {
	      this.draw();
	      window.requestAnimFrame(this.animate.bind(this));
	    };

	    /**
	     * Clears the canvas and calls the draw method of every particle.
	     */
	    this.draw = function () {
	      context.clearRect(0, 0, canvas.width, canvas.height);

	      for (var i = this.storage.length; i--;) {
	        var particle = this.storage[i];
	        particle.draw();
	      }

	      this.update();
	    };

	    /**
	     * Calculates the position and movement for each particle.
	     */
	    this.update = function () {
	      for (var i = this.storage.length; i--;) {
	        var particle = this.storage[i];

	        particle.x += particle.vx;
	        particle.y += particle.vy;

	        if (particle.x + particle.radius > canvas.width) {
	          particle.x = particle.radius;
	        } else if (particle.x - particle.radius < 0) {
	          particle.x = canvas.width - particle.radius;
	        }

	        if (particle.y + particle.radius > canvas.height) {
	          particle.y = particle.radius;
	        } else if (particle.y - particle.radius < 0) {
	          particle.y = canvas.height - particle.radius;
	        }

	        if (config.connectParticles) {
	          for (var j = i + 1; j < this.storage.length; j++) {
	            var particle2 = this.storage[j];

	            this.distance(particle, particle2);
	          }
	        }
	      }
	    };

	    /**
	     * Calculates the distance between p1 and p2
	     */
	    this.distance = function (p1, p2) {
	      var n,
	          r = p1.x - p2.x,
	          dy = p1.y - p2.y;

	      n = Math.sqrt(r * r + dy * dy);

	      // Draw a connective line between this two points if the distance is lesser or equal the minimum distance
	      if (n <= config.minDistance) {
	        context.beginPath();
	        context.strokeStyle = 'rgba(' + config.color.r + ', ' + config.color.g + ', ' + config.color.b + ', ' + (1.2 - n / config.minDistance) + ')';
	        context.moveTo(p1.x, p1.y);
	        context.lineTo(p2.x, p2.y);
	        context.stroke();
	        context.closePath();
	      }
	    };

	    /**
	     * Gets called via the event handler and sets the canvas dimensions
	     */
	    this.resize = function () {
	      canvas.width = window.innerWidth;
	      canvas.height = window.innerHeight;

	      this.draw();
	    };
	  };

	  Particle = function Particle() {
	    // Setup random attributes
	    this.x = Math.random() * canvas.width;
	    this.y = Math.random() * canvas.height;
	    this.vx = Math.random() * config.speed * 2 - config.speed;
	    this.vy = Math.random() * config.speed * 2 - config.speed;
	    this.radius = Math.random() * Math.random() * config.sizeVariations;

	    /**
	     * The particles draw method.
	     */
	    this.draw = function () {
	      context.fillStyle = 'rgb(' + config.color.r + ', ' + config.color.g + ', ' + config.color.b + ')';
	      context.beginPath();
	      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	      context.fill();
	    };

	    this.draw();
	  };

	  /**
	   * Merge the keys of two objects and return a comined object.
	   *
	   * @param {Object} source - object with the default keys
	   * @param {Object} obj - object with additional keys who will extend the source
	   *
	   * @return {Object} combined object
	   */
	  function _mergeObjects(source, obj) {
	    Object.keys(obj).forEach(function (key) {
	      source[key] = obj[key];
	    });
	    return source;
	  }

	  /**
	   * Converts a hex string to a rgb object.
	   *
	   * @param {String} hex - hex value who should be converted
	   *
	   * @return {Object} object with all seperate color channels
	   */
	  function _hex2rgb(hex) {
	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	    return result ? {
	      r: parseInt(result[1], 16),
	      g: parseInt(result[2], 16),
	      b: parseInt(result[3], 16)
	    } : null;
	  }

	  /**
	   * A polyfill for requestAnimationFrame.
	   */
	  window.requestAnimFrame = function () {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	      window.setTimeout(callback, 1000 / 60);
	    };
	  }();

	  /**
	   * Return a new plugin instance.
	   */
	  return new Plugin();
	}(window, document);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/* Particle Library */
	window.onload = function () {
	    Particles.init({
	        selector: '#myCanvas',
	        maxParticles: 300,
	        sizeVariations: 5,
	        speed: 0.9,
	        minDistance: 200
	    });
	};

	var gh = "https://api.greenhouse.io/v1/boards/indexexchange/offices";

	$.ajax({
	    url: gh,

	    dataType: 'json'

	}).done(function (data) {

	    checkData(data);
	}).fail(function (err) {
	    console.log("error", err);
	}).always(function () {
	    console.log("complete");
	});

	function checkData(data) {
	    var offices = data.offices;

	    offices = offices.filter(function (office) {

	        if (office.name !== "No Office") {
	            return office.name;
	        }
	    });

	    offices.forEach(function (office) {
	        console.log(office);

	        var departments = office.departments;
	        $('.careers-dept-listing').append($('<ul>').attr("id", office.id.toString()));
	        $('#' + office.id.toString()).append($('<h1>').text(office.name));

	        departments.forEach(function (dept) {
	            if (dept.name !== "No Department" && dept.jobs.length !== 0) {
	                //console.log(dept);

	                $('#' + office.id.toString()).append($('<h2>').text(dept.name).addClass(dept.id));
	                var deptArr = dept;
	                //console.log(deptArr);
	                var jobs = dept.jobs;

	                jobs.forEach(function (job) {

	                    $('#' + office.id.toString()).append($('<li>').append($('<a>').text(job.title).attr("href", job.absolute_url)));

	                    // console.log(job);
	                });
	            }
	        });
	    });
	}

/***/ }
/******/ ]);