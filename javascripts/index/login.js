'use strict';

module.exports = ['$scope', '$state', 'notify', '$resource', '$rootScope', '$localStorage',
  function ($scope, $state, notify, $resource, $rootScope, $localStorage) {
    $scope.user = {};
    $scope.keyLogin = function ($evt) {
      if ($evt.keyCode === 13) {
        $scope.login();
      }
    };
    $scope.login = function () {
      $resource('/walker/user/login')
        .save({},$scope.user,function (data) {
          $localStorage.isLogin = true;
          $state.go('index');
        }, function (data) {
          $localStorage.isLogin = false;
          notify({ message: '用户名或密码错误', duration: 2000, classes: 'alert-danger' });
        });
    };
  }
];