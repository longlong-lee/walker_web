'use strict';

module.exports = ['$scope', '$state', 'notify', '$resource', '$rootScope', '$localStorage',
  function ($scope, $state, notify, $resource, $rootScope, $localStorage) {
    if (!$localStorage.isLogin) {
      $rootScope.out();
    }
    $scope.allOpen = function () {
      $resource('/walker/setting/visible/all/on').get({
      }).$promise.then(function (data) {
        if (data.code === 401) {
          $rootScope.out();
        } else {
          notify({ message: '全部开启设置成功', duration: 10000, classes: 'alert-info' });
          $scope.getUserSet();
        }
      }, function (data) {
        $rootScope.out();
        notify({ message: '全部开启设置失败', duration: 10000, classes: 'alert-danger' });
      });
    };
    $scope.allClose = function () {
      $resource('/walker/setting/visible/all/off').get({
      }).$promise.then(function (data) {
        if (data.code === 401) {
          $rootScope.out();
        } else {
          notify({ message: '全部关闭设置成功', duration: 10000, classes: 'alert-info' });
          $scope.getUserSet();
        }
      }, function (data) {
        $rootScope.out();
        notify({ message: '全部关闭设置失败', duration: 10000, classes: 'alert-danger' });
      });
    };
    $scope.getUserSet = function () {
      $resource('/walker/setting/visible/ ').get({

      }).$promise.then(function (data) {
        $scope.playerList = [];
        if (data.code === 401) {
          $rootScope.out();
        } else {
          var player = data.players;
          for (var key in player) {
            if (player[key].playerid !== "-1") {
              $scope.playerList.push(player[key]);
            }
          }
          $scope.players = data.players;
          $scope.settings = data.visibleSettings;
          $scope.setData();
        }
      }, function (data) {
        notify({ message: '获取设置失败', duration: 10000, classes: 'alert-danger' });
      });
    };
    $scope.setData = function () {
      var datas = [];
      angular.forEach($scope.players, function (value, index) {
        //行列
        angular.forEach($scope.playerList, function (val, idx) {
          //竖列
          var keepGoing = false, checked = false;
          angular.forEach($scope.settings, function (v, k) {
            //判断是否开启
            if (!keepGoing) {
              if (v.subjectId === value.playerid && v.objectId === val.playerid) {
                checked = (v.visible ? true : false);
                keepGoing = true;
              }
            }
          });
          if (!datas[index]) {
            datas[index] = [];
          }
          datas[index].push({
            subname: value.name,
            name: val.name,
            subjectId: value.playerid,
            objectId: val.playerid,
            checked: checked
          });
        });
      });
      $scope.datas = datas;
    };
    $scope.getUserSet();
    $scope.edit = function ($e, data) {
      $resource('/walker/setting/visible/:subjectId/:objectId/:visible').get({
        objectId: data.objectId,
        subjectId: data.subjectId,
        visible: data.checked ? 1 : 0
      }, {

        }).$promise.then(function (res) {
          if (res.code === 401) {
            $rootScope.out();
          } else {
            var msg = data.subname + (data.checked ? '可以看见' : '不可以看见') + data.name;
            notify({ message: msg, duration: 10000, classes: 'alert-success' });
          }
        }, function (res) {
          notify({ message: '状态修改失败，请稍后重试', duration: 10000, classes: 'alert-danger' });
          data.checked = (data.checked ? false : true);
        });
    };
  }
];