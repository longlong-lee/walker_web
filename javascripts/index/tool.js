'use strict';

module.exports = ['$scope', '$state', 'notify', '$resource', '$rootScope', '$localStorage',
  function ($scope, $state, notify, $resource, $rootScope, $localStorage) {
    if (!$localStorage.isLogin) {
      $rootScope.out();
    }
    $scope.allOpen = function () {
      $resource('/walker/setting/playeritem/all/allow').get({
      }).$promise.then(function (data) {
        if (data.code === 401) {
          $rootScope.out();
        } else {
          $scope.getToolSet();
        }
      }, function (data) {
        $rootScope.out();
        notify({ message: '全部开启道具设置失败', duration: 10000, classes: 'alert-danger' });
      });
    };
    $scope.allClose = function () {
      $resource('/walker/setting/playeritem/all/disallow').get({
      }).$promise.then(function (data) {
        if (data.code === 401) {
          $rootScope.out();
        } else {
          $scope.getToolSet();
        }
      }, function (data) {
        $rootScope.out();
        notify({ message: '全部关闭道具设置失败', duration: 10000, classes: 'alert-danger' });
      });
    };
    $scope.getToolSet = function () {
      $resource('/walker/setting/playeritem/ ').get({

      }).$promise.then(function (data) {
        if (data.code === 401) {
          $rootScope.out();
        } else {
          $scope.players = data.players;
          $scope.items = data.items;
          $scope.allow = data.allow;
          $scope.setData();
        }
      }, function (data) {
        notify({ message: '获取道具设置失败', duration: 10000, classes: 'alert-danger' });
      });
    };
    $scope.setData = function () {
      var datas = [];
      //行列
      angular.forEach($scope.players, function (value, index) {
        //竖列
        angular.forEach($scope.items, function (val, idx) {
          var keepGoing = false, checked = false;
          angular.forEach($scope.allow, function (v, k) {
            //判断是否开启
            if (!keepGoing) {
              if (v.id === val.id && v.playerid === value.playerid) {
                checked = (v.allow === '1' ? true : false);
                keepGoing = true;
              }
            }
          });
          if (!datas[index]) {
            datas[index] = [];
          }
          datas[index].push({
            subname: value.name,
            name: val.title,
            subjectId: value.playerid,
            objectId: val.id,
            checked: checked
          });
        });
      });
      $scope.datas = datas;
    };
    $scope.getToolSet();
    $scope.edit = function ($e, data) {
      $resource('/walker/setting/playeritem/:subjectId/:objectId/:visible').get({
        objectId: data.objectId,
        subjectId: data.subjectId,
        visible: data.checked ? '1' : '2'
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