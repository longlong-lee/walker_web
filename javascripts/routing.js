'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', '$httpProvider',  function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('');
  $stateProvider.state('login',{
    url: '/login',
    views: {
      main: {
        template: require('../views/login.html'),
        controller: require('./index/login.js')
      }
    }
  });
  $stateProvider.state('index',{
    url: '',
    views: {
      main: {
        template: require('../views/index.html'),
        controller: require('./index/index.js')
      }
    }
  })
  .state('index.player', {
    url: '/player',
    views: {
      tab: {
        template: require('../views/player.html'),
        controller: require('./index/player.js')
      }
    }
  })
  .state('index.setting', {
    url: '/setting',
    views: {
      tab: {
        template: require('../views/setting.html'),
        controller: require('./index/setting.js')
      }
    }
  })
  .state('index.saw', {
    url: '/saw',
    views: {
      tab: {
        template: require('../views/saw.html'),
        controller: require('./index/saw.js')
      }
    }
  });
}];