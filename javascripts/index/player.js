'use strict';

module.exports = ['$scope', '$rootScope', 'notify', '$resource', '$interval', '$uibModal', '$localStorage',
  function ($scope, $rootScope, notify, $resource, $interval, $uibModal, $localStorage) {
    if (!$localStorage.isLogin) {
      $rootScope.out();
    }
    $scope.getPlayers = function () {
      $resource('/walker/player/list')
        .get(function (data) {
          if (data.code === 401) {
            $rootScope.out();
          } else {
            $scope.list1 = data["猫"];
            $scope.list2 = data["鼠"];
            $scope.list3 = data["候补者"];
          }
        }, function (data) {
          notify({ message: '获取数据失败,请刷新', duration: 10000, classes: 'alert-danger' });
        });
    };
    $scope.getPlayers();
    $rootScope.timer = $interval($scope.getPlayers, 30000);
    $scope.editInfo = function (data) {
      $scope.editDataOrigin = data;
      $resource('/walker/player/:id')
        .get({
          id: data.player.playerid
        }, function (res) {
          if (res.code === 401) {
            $rootScope.out();
          } else {
            $scope.editData = res;
            $scope.isShowDiv = true;
            $uibModal.open({
              templateUrl: 'dialog',
              scope: $scope,
              size: 'md'
            });
          }
        }, function (res) {
          notify({ message: '获取数据失败,请刷新', duration: 10000, classes: 'alert-danger' });
        });

    };
    $scope.roleList = [{
      name: '鼠'
    }, {
        name: '猫'
      }, {
        name: '候补者'
      }];
    $scope.statusList = [{
      name: '活跃状态'
    }, {
        name: '监狱状态'
      }, {
        name: '待激活状态'
      }];
    $scope.editRole = function () {
      $resource('/walker/player/:id').save({
        id: $scope.editData.player.playerid
      }, {
          role: $scope.editData.player.role
        }, function (data) {
          if (data.code === 401) {
            $rootScope.out();
          } else {
            notify({ message: '角色修改成功', duration: 10000, classes: 'alert-success' });
            $scope.getPlayers();
          }
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
          if (data.code === 401) {
            $rootScope.out();
          } else {
            notify({ message: '状态修改成功', duration: 10000, classes: 'alert-success' });
            $scope.editDataOrigin.player.status = $scope.editData.player.status;
          }
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
          if (data.code === 401) {
            $rootScope.out();
          } else {
            notify({ message: '数目修改成功', duration: 10000, classes: 'alert-success' });
            part.isClick = false;
            $scope.getPlayers();
          }
        }, function (data) {
          notify({ message: '数目修改失败', duration: 10000, classes: 'alert-danger' });
        });
    };
    $scope.isEditTuDou = false;
    $scope.showEditTuDou = function () {
      $scope.isEditTuDou = true;
      $scope.editData.player.edit_tuDou = 0;
    };
    $scope.editTuDou = function () {
      $resource('/walker/player/:id').save({
        id: $scope.editData.player.playerid
      }, {
          tudou: parseInt($scope.editData.player.edit_tuDou, 10)
        }).$promise.then(function (data) {
          if (data.code === 401) {
            $rootScope.out();
          } else {
            notify({ message: '金币修改成功', duration: 10000, classes: 'alert-success' });
            $scope.editData.player.tudou = parseInt($scope.editData.player.tudou, 10) + parseInt($scope.editData.player.edit_tuDou, 10);
            $scope.editDataOrigin.player.tudou = $scope.editData.player.tudou;
            $scope.isEditTuDou = false;
            $scope.getPlayers();
          }
        }, function (data) {
          notify({ message: '金币修改失败', duration: 10000, classes: 'alert-danger' });
        });
    };
    $scope.cancle_editTuDou = function () {
      $scope.isEditTuDou = false;
    };
  }
];