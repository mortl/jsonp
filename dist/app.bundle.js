!function(n){function o(t){if(e[t])return e[t].exports;var r=e[t]={exports:{},id:t,loaded:!1};return n[t].call(r.exports,r,r.exports,o),r.loaded=!0,r.exports}var e={};return o.m=n,o.c=e,o.p="",o(0)}([function(n,o){"use strict";function e(n,o){if(!(n instanceof o))throw new TypeError("Cannot call a class as a function")}function t(n){console.log(n)}function r(n){var o=n.offices;o=o.filter(function(n){if("No Office"!==n.name)return n.name});for(var e=0;e<o.length;e++)f.setLocationList=o[e].name;console.log("Location Array",f.locationList),o.forEach(function(n){console.log(n);var o=n.departments;o.forEach(function(n){if("No Department"!==n.name&&0!==n.jobs.length){var o=n;console.log(o);var e=n.jobs;e.forEach(function(n){t(n)})}})})}var i=function(){function n(n,o){for(var e=0;e<o.length;e++){var t=o[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(o,e,t){return e&&n(o.prototype,e),t&&n(o,t),o}}(),c="https://api.greenhouse.io/v1/boards/indexexchange/offices",a=function(){function n(){e(this,n),this.loc=[]}return i(n,[{key:"locationList",get:function(){return this.loc}},{key:"setLocationList",set:function(n){this.loc.push(n)}}]),n}(),f=new a;$.ajax({url:c,dataType:"json"}).done(function(n){r(n)}).fail(function(n){console.log("error",n)}).always(function(){console.log("complete")})}]);