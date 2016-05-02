'use strict';

angular.module('app', [
  'ui.router',
  'ngResource',
  'ngAnimate',
  'ngDialog',
  'ngFileUpload',
  'cgNotify'
  ])
  .config(require('./routing.js'))
  .filter('nameFilter', require('./nameFil.js'))
  .filter('toolFilter', require('./toolFil.js'));