'use strict';

var setting = ['$rootScope', '$state', '$interval', '$localStorage', 'notify',
  function ($rootScope, $state, $interval, $localStorage, notify) {
    $rootScope.out = function () {
      $localStorage.isLogin = false;
      $state.go('login');
      return false;
    };
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