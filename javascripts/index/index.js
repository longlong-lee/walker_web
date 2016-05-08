'use strict';

module.exports = ['$scope', '$state', 'notify', '$resource', '$uibModal', '$localStorage', '$rootScope',
  function ($scope, $state, notify, $resource, $uibModal, $localStorage, $rootScope) {
    $scope.isLogin = $localStorage.isLogin;
    if (!$localStorage.isLogin) {
      $rootScope.out();
    }
    if ($state.current.name === 'index') {
      $state.go('index.player');
      $scope.sref = 'index.player';
    } else {
      $scope.sref = $state.current.name;
    }
    $scope.change = function ($evt) {
      $scope.sref = $evt.target.getAttribute('ui-sref');
    };
    $scope.sendNotice = function () {
      if (!$scope.notice) {
        notify({ message: '请填写公告', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      $resource('/walker/setting/notification/ ').save({

      }, $scope.notice)
        .$promise.then(function (data) {
          if (data.code === 401) {
            $rootScope.out();
          } else {
            notify({ message: '公告发送成功', duration: 10000, classes: 'alert-success' });
          }
        }, function (data) {
          $rootScope.out();
          notify({ message: '公告发送失败', duration: 10000, classes: 'alert-danger' });
        });
    };
    $scope.seeNotice = function () {
      $resource('/walker/setting/notification/ ')
        .query(function (data) {
          if (data.code === 401) {
            $rootScope.out();
          } else {
            $scope.noticeList = data;
            $scope.showNotice();
          }
        }, function (data) {
          $rootScope.out();
          notify({ message: '获取公告失败', duration: 10000, classes: 'alert-danger' });
        });
    };
    $scope.showNotice = function () {
      $uibModal.open({
        templateUrl: 'notice_dialog',
        scope: $scope,
        size: 'notice-dialog'
      });
    };
    $scope.logout = function () {
      $resource('/walker/user/logout')
        .get(function (data) {
          $rootScope.out();
        }, function (data) {
          $rootScope.out();
        });
    };
  }
];