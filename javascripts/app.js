'use strict';

angular.module('app', [
  'ui.router',
  'ngResource',
  'ngAnimate',
  'ngFileUpload',
  'cgNotify',
  'ui.bootstrap'
])
  .config(require('./routing.js'))
  .run(require('./routSetting.js'))
  .filter('nameFilter', require('./nameFil.js'))
  .filter('toolFilter', require('./toolFil.js'));