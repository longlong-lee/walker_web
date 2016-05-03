'use strict';

module.exports = ['$scope', '$state', 'notify', '$resource', 'ngDialog',
  function ($scope, $state, notify, $resource, ngDialog) {
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
          debugger;
          notify({ message: '公告发送成功', duration: 10000, classes: 'alert-success' });
        }, function (data) {
          debugger;
          notify({ message: '公告发送失败', duration: 10000, classes: 'alert-danger' });
        });
    };
    $scope.seeNotice = function () {
      $resource('/walker/setting/notification/ ')
        .query(function (data) {
          $scope.noticeList = data;
          $scope.showNotice();
        }, function (data) {
          notify({ message: '获取公告失败', duration: 10000, classes: 'alert-danger' });
        });
    };
    $scope.showNotice = function () {
      ngDialog.open({
        template: 'notice_dialog',
        scope: $scope,
        className: 'ngdialog-theme-default notice-dialog',
        showClose: false,
        closeByDocument: true
      });
    };
  }
];