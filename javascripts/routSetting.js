'use strict';

var setting = ['$rootScope', '$state', '$interval',
  function ($rootScope, $state, $interval) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (toState.name !== 'index.player') {
        if ($rootScope.timer) {
          $interval.cancel($rootScope.timer);
        }
      }
    });
  }];

module.exports = setting;