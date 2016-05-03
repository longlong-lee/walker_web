'use strict';

module.exports = ['$scope', '$state', 'ngDialog', 'notify', '$resource', '$interval',
  function ($scope, $state, ngDialog, notify, $resource, $interval) {
    $scope.getPlayers = function () {
      $resource('/walker/player/list')
        .get(function (data) {
          $scope.list1 = data["追捕者"];
          $scope.list2 = data["逃亡者"];
          $scope.list3 = data["候补者"];
        }, function (data) {
          notify({ message: '获取数据失败,请刷新', duration: 10000, classes: 'alert-danger' });
        });
    };
    $scope.getPlayers();
    //$interval($scope.getPlayers, 3000);
    $scope.editInfo = function (data) {
      $scope.editDataOrigin = data;
      $scope.editData = angular.copy(data);
      $scope.isShowDiv = true;
      ngDialog.open({
        template: 'dialog',
        scope: $scope,
        className: 'ngdialog-theme-default',
        showClose: true,
        closeByDocument: false,
        trapFocus: false
      });
    };
    $scope.roleList = [{
      name: '逃亡者'
    }, {
        name: '追捕者'
      }, {
        name: '候补者'
      }];
    $scope.statusList = [{
      name: '正常'
    }, {
        name: '入狱'
      }, {
        name: '淘汰'
      }];
    $scope.editRole = function () {
      $resource('/walker/player/:id').save({
        id: $scope.editData.player.playerid
      }, {
          role: $scope.editData.player.role
        }, function (data) {
          notify({ message: '角色修改成功', duration: 10000, classes: 'alert-success' });
          $scope.getPlayers();
        }, function (data) {
          notify({ message: '角色修改失败', duration: 10000, classes: 'alert-danger' });
        });
    };
    $scope.editStatus = function () {
      $resource('/walker/player/:id').save({
        id: $scope.editData.player.playerid
      }, {
          status: $scope.editData.player.status
        }).$promise.then(function (data) {
          notify({ message: '状态修改成功', duration: 10000, classes: 'alert-success' });
          $scope.editDataOrigin.player.status = $scope.editData.player.status;
        }, function (data) {
          notify({ message: '状态修改失败', duration: 10000, classes: 'alert-danger' });
        });
    };
    $scope.showInput = function (data) {
      data.isClick = true;
    };
    $scope.editNum = function (all, part) {
      $resource('/walker/player/:id/:itemId').save({
        id: all.player.playerid,
        itemId: part.itemId
      }, {
          usedAmount: parseInt(part.usedAmount, 10)
        }).$promise.then(function (data) {
          notify({ message: '数目修改成功', duration: 10000, classes: 'alert-success' });
          part.isClick = false;
          $scope.getPlayers();
        }, function (data) {
          notify({ message: '数目修改失败', duration: 10000, classes: 'alert-danger' });
        });
    };
    $scope.isEditTuDou = false;
    $scope.showEditTuDou = function () {
      $scope.isEditTuDou = true;
    };
    $scope.editTuDou = function () {
      $resource('/walker/player/:id').save({
        id: $scope.editData.player.playerid
      }, {
          tudou: $scope.editData.player.tudou
        }).$promise.then(function (data) {
          notify({ message: '土豆值修改成功', duration: 10000, classes: 'alert-success' });
          $scope.editDataOrigin.player.tudou = $scope.editData.player.tudou;
          $scope.isEditTuDou = false;
          $scope.getPlayers();
        }, function (data) {
          notify({ message: '土豆值修改失败', duration: 10000, classes: 'alert-danger' });
        });
    };
  }
];