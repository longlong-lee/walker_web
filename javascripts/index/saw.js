'use strict';

module.exports = ['$scope', '$state', 'notify', '$resource',
  function ($scope, $state, notify, $resource) {
    $scope.getUserSet = function () {
      $resource('/walker/setting/visible/ ').get({

      }).$promise.then(function (data) {
        $scope.players = data.players;
        $scope.settings = data.visibleSettings;
        $scope.setData();
      }, function (data) {
        notify({ message: '获取设置失败', duration: 10000, classes: 'alert-danger' });
      });
    };
    $scope.setData = function () {
      var datas = [];
      angular.forEach($scope.players, function (value, index) {
        //行列
        angular.forEach($scope.players, function (val, idx) {
          //竖列
          var keepGoing = false, checked = false;
          angular.forEach($scope.settings, function (v, k) {
            //判断是否开启
            if (!keepGoing) {
              if (v.objectId === value.playerid && v.subjectId === val.playerid) {
                checked = (v.visible ? true : false);
                keepGoing = true;
              }
            }
          });
          if (!datas[index]) {
            datas[index] = [];
          }
          datas[index].push({
            name: value.name,
            objectId: value.playerid,
            subjectId: val.playerid,
            checked: checked
          });
        });
      });
      $scope.datas = datas;
    };
    $scope.getUserSet();
    $scope.edit = function ($e, data) {
      $resource('/walker/setting/visible/:objectId/:subjectId/:visible').get({
        objectId: data.objectId,
          subjectId: data.subjectId,
          visible: data.checked ? 1 : 0
      }, {
          
        }).$promise.then(function (res) {
          notify({ message: '状态修改成功', duration: 10000, classes: 'alert-success' });
        }, function (data) {
          notify({ message: '状态修改失败', duration: 10000, classes: 'alert-danger' });
          data.checked = (data.checked ? false : true);
        });
    };
  }
];