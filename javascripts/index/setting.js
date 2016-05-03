'use strict';

module.exports = ['$scope', '$state', 'Upload', 'notify', '$resource', 'ngDialog',
  function ($scope, $state, Upload, notify, $resource, ngDialog) {
    //------------------地图模块开始----------------------
    $scope.clickPosition = null;
    $scope.show_map_dialog = function (data) {
      if (data && data.coordinate) {
        $scope.editBuildData = data;
        $scope.edit_build_mode = true;
      } else if (data && data.center) {
        $scope.editSettingData = data;
        $scope.edit_setting_mode = true;
      }
      ngDialog.open({
        template: 'map_dialog',
        scope: $scope,
        className: 'ngdialog-theme-default',
        showClose: false,
        closeByDocument: false
      });
    };
    $scope.$on('ngDialog.opened', function (e, $dialog) {
      var map = new AMap.Map('mapContainer');
      if (map.r) {
        map.setZoom(10);
        if ($scope.edit_build_mode) {
          var position = new AMap.LngLat($scope.editBuildData.lng, $scope.editBuildData.lat);
          map.setCenter([$scope.editBuildData.lng, $scope.editBuildData.lat]);
          new AMap.Marker({
            position: position,
            map: map
          });
        } else if ($scope.edit_setting_mode) {
          var position = new AMap.LngLat($scope.editSettingData.center.lng, $scope.editSettingData.center.lat);
          map.setCenter([$scope.editSettingData.center.lng, $scope.editSettingData.center.lat]);
          new AMap.Marker({
            position: position,
            map: map
          });
        } else {
          map.setCenter([120.619914, 31.297599]);
        }
        var _onClick = function (e) {
          map.clearMap();
          new AMap.Marker({
            position: e.lnglat,
            map: map
          });
          $scope.clickPositionLng = e.lnglat.lng; //经度 - lng
          $scope.clickPositionLat = e.lnglat.lat; //纬度 - lat
        };
        map.on('click', _onClick);
      }
    });
    $scope.set_map_position = function () {
      if ($scope.edit_build_mode) {
        $scope.editBuildData.lng = $scope.clickPositionLng;
        $scope.editBuildData.lat = $scope.clickPositionLat;
        $scope.edit_build_mode = false;
        //TODO update 坐标的数据
      } else if ($scope.edit_setting_mode) {
        $resource('/walker/setting/ ').save({

        }, {
            centerLng: $scope.clickPositionLng + '',
            centerLat: $scope.clickPositionLat + ''
          }).$promise.then(function (req) {
            $scope.settings.center.lng = $scope.clickPositionLng;
            $scope.settings.center.lat = $scope.clickPositionLat;
            $scope.edit_setting_mode = false;
            notify({ message: '修改成功', duration: 10000, classes: 'alert-success' });
            ngDialog.close();
          }, function (data) {
            notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
          });
      } else {
        $scope.build.lng = $scope.clickPositionLng;
        $scope.build.lat = $scope.clickPositionLat;
      }
      ngDialog.close();
    };
    $scope.set_map_position_colse = function () {
      $scope.edit_setting_mode = false;
      $scope.edit_build_mode = false;
      ngDialog.close();
    };
    //-----------------------地图模块结束-----------------------
    //------------------区域设置模块开始----------------------
    $scope.query_setting = function () {
      $resource('/walker/setting/ ').get().$promise.then(function (data) {
        $scope.settings = data;
      }, function (data) {
        notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
      });
    };
    $scope.query_setting();
    $scope.edit_setting = function () {
      var data = $scope.settings;
      $scope.settingEdit = {
        radius: data.radius,
        mul: data.mul,
        add: data.add,
        switch: data.distanceWarning.warningSwitch,
        distance: data.distanceWarning.distance
      };
      ngDialog.open({
        template: 'edit_setting_dialog',
        scope: $scope,
        className: 'ngdialog-theme-default edit_setting_dialog',
        showClose: false,
        closeByDocument: false
      });
    };
    $scope.update_setting = function () {
      var data = $scope.settingEdit;
      $resource('/walker/setting/ ').save({
      }, {
          radius: parseInt(data.radius),
          add: parseInt(data.add),
          mul: parseInt(data.mul),
          warningSwitch: data.switch,
          warningDistance: parseInt(data.distance)
        }).$promise.then(function (req) {
          $scope.settings.radius = data.radius;
          $scope.settings.add = data.add;
          $scope.settings.mul = data.mul;
          $scope.settings.distanceWarning.warningSwitch = data.switch;
          $scope.settings.distanceWarning.distance = data.distance;
          notify({ message: '修改成功', duration: 10000, classes: 'alert-success' });
          ngDialog.close();
        }, function (data) {
          notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
        });
    };
    //------------------区域设置模块结束----------------------
    //------------------建筑模块开始----------------------
    $scope.roleList = [{
      name: ' 基地'
    }, {
        name: '监狱'
      }, {
        name: '赌场'
      }, {
        name: '安全屋'
      }, {
        name: '角斗场'
      }, {
        name: '移动商贩'
      }, {
        name: '天眼'
      }];
    $scope.build = {
      avatar: '',
      name: '',
      role: '',
      tel: '',
      lng: '',
      lat: ''
    };
    $scope.isAddBuild = false;
    // 查询建筑物
    $scope.query_build = function () {
      // $resource('/walker/player/building').get({

      // }).$promise.then(function (data) {
      //   if (data.success) {
          $scope.buildings = [{
            playerid: '1',
            avatar: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
            name: '赌场',
            role: '赌场',
            tel: '123123123',
            lng: '121.49393',
            lat: '31.192231'
          }, {
              playerid: '2',
              avatar: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
              name: '监狱',
              role: '监狱',
              tel: '33333333',
              lng: '121.651858',
              lat: '31.044096'
            }, {
              playerid: '3',
              avatar: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
              name: '角斗场',
              role: '角斗场',
              tel: '44444444444',
              lng: '120.621969',
              lat: '31.281598'
            }
          ];
      //   } else {
      //     notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
      //   }
      // }, function (data) {
      //   notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
      // });
    };
    $scope.query_build();
    // 增加建筑物时 -- 上传图标
    $scope.upload_build = function (file) {
      if (file) {
        Upload.upload({
          url: '/v1/img/upload',
          method: 'POST',
          data: {
            image: file
          }
        }).then(function (data) {
          var data = data.data;
          if (data.status === 'success') {
            $scope.build.avatar = data.url;
            notify({ message: '图标上传成功', duration: 10000, classes: 'alert-success' });
          } else {
            notify({ message: '图标上传失败', duration: 10000, classes: 'alert-danger' });
          }
        }, function (data) {
          notify({ message: '图标上传失败', duration: 10000, classes: 'alert-danger' });
        }, function (evt) {

        });
      }
    };
    // 增加建筑物时 -- 校验必填项
    $scope.valid_build = function () {
      if (!$scope.build.avatar) {
        notify({ message: '请上传建筑图标', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!($scope.build.name)) {
        notify({ message: '请填写建筑名称', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!($scope.build.role)) {
        notify({ message: '请填写建筑角色', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!($scope.build.tel)) {
        notify({ message: '请填写电话', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!($scope.build.lng && $scope.build.lat)) {
        notify({ message: '请填写建筑坐标', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      return true;
    };
    // 增加建筑物
    $scope.add_build = function () {
      if ($scope.valid_build()) {
        $scope.isAddBuild = true;
        var data = {};
        data.avatar = $scope.build.avatar;
        data.name = $scope.build.name;
        data.role = $scope.build.role;
        data.tel = $scope.build.tel;
        data.lng = $scope.build.lng;
        data.lat = $scope.build.lat;
        $resource('/walker/player/ ').save({

        }, {
            data: data
          }).$promise.then(function (data) {
            if (data.success) {
              notify({ message: '添加特殊建筑成功', duration: 2000, classes: 'alert-success' });
              ngDialog.close();
            } else {
              notify({ message: '添加特殊建筑失败：' + data.data, duration: 10000, classes: 'alert-danger' });
            }
            $scope.isAddBuild = false;
            $scope.build = {
              avatar: '',
              name: '',
              role: '',
              tel: '',
              lng: '',
              lat: ''
            };
          });
      }
    };
    // 删除建筑物
    $scope.del_build = function (id) {
      $resource('/walker/player/building').remove({

      }, {
          id: id
        }).$promise.then(function (data) {
          if (data.success) {
            notify({ message: '删除特殊建筑成功', duration: 2000, classes: 'alert-success' });
            ngDialog.close();
          } else {
            notify({ message: '删除特殊建筑失败：' + data.data, duration: 10000, classes: 'alert-danger' });
          }
        });
    };
    $scope.buildEdit = {};
    // 编辑建筑物时 -- 弹窗
    $scope.edit_build = function (data) {
      $scope.editBuildData = data;
      $scope.buildEditId = data.playerid;
      $scope.buildEdit = {
        avatar: data.avatar,
        name: data.name,
        role: data.role,
        tel: data.tel
      };
      ngDialog.open({
        template: 'edit_build_dialog',
        scope: $scope,
        className: 'ngdialog-theme-default edit_build_dialog',
        showClose: true,
        closeByDocument: false
      });
    };
    // 编辑建筑物时  --  上传图标
    $scope.edit_upload_build = function (file) {
      if (file) {
        Upload.upload({
          url: '/v1/img/upload',
          method: 'POST',
          data: {
            image: file
          }
        }).then(function (data) {
          var data = data.data;
          if (data.status === 'success') {
            $scope.buildEdit.avatar = data.url;
            notify({ message: '图标上传成功', duration: 10000, classes: 'alert-success' });
          } else {
            notify({ message: '图标上传失败', duration: 10000, classes: 'alert-danger' });
          }
        }, function (data) {
          notify({ message: '图标上传失败', duration: 10000, classes: 'alert-danger' });
        }, function (evt) {

        });
      }
    };
    // 修改建筑物
    $scope.update_build = function () {
      $scope.editBuildData.avatar = $scope.buildEdit.avatar;
      $scope.editBuildData.name = $scope.buildEdit.name;
      $scope.editBuildData.role = $scope.buildEdit.role;
      $scope.editBuildData.tel = $scope.buildEdit.tel;
      ngDialog.close();
      $resource('/walker/player/building').save({
        id: $scope.buildEditId
      }, {
          data: $scope.buildEdit
        }).$promise.then(function (data) {
          if (data.success) {
            notify({ message: '修改成功', duration: 10000, classes: 'alert-success' });
          } else {
            notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
          }
        }, function (data) {
          notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
        });
    };
    //------------------建筑模块开始----------------------
    //------------------选手模块开始----------------------
    $scope.player = {
      avatar: '',
      name: '',
      tel: '',
      role: ''
    };
    $scope.isAddPlayer = false;
    // 查询选手
    $scope.query_player = function () {
      //  $resource('/walker/player').get({
      //   type: 'car'
      // }).$promise.then(function (data) {
      //   if (data.success) {
      $scope.players = [{
        playerid: '1',
        avatar: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
        name: '小明',
        tel: '123456789',
        role: '逃亡者'
      }, {
          playerid: '2',
          avatar: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
          name: '旺财',
          tel: '546895248',
          role: '追击者'
        }, {
          playerid: '3',
          avatar: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
          name: '静静',
          tel: '7895468924',
          role: '追击者'
        }
      ];
      //   } else {
      //     notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
      //   }
      // }, function (data) {
      //   notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
      // });
    };
    $scope.query_player();
    // 增加选手时 -- 上传头像
    $scope.upload_player = function (file) {
      if (file) {
        Upload.upload({
          url: '/v1/img/upload',
          method: 'POST',
          data: {
            image: file
          }
        }).then(function (data) {
          var data = data.data;
          if (data.status === 'success') {
            $scope.player.avatar = data.url;
            notify({ message: '头像上传成功', duration: 10000, classes: 'alert-success' });
          } else {
            notify({ message: '头像上传失败', duration: 10000, classes: 'alert-danger' });
          }
        }, function (data) {
          notify({ message: '头像上传失败', duration: 10000, classes: 'alert-danger' });
        }, function (evt) {

        });
      }
    };
    // 增加选手时 -- 校验必填
    $scope.valid_player = function () {
      if (!$scope.player.avatar) {
        notify({ message: '请上传选手头像', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!($scope.player.name)) {
        notify({ message: '请填写选手姓名', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!$scope.player.tel) {
        notify({ message: '请填写选手手机号码', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!$scope.player.role) {
        notify({ message: '请填写选手角色', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      return true;
    };
    // 增加选手
    $scope.add_player = function () {
      if ($scope.valid_player()) {
        $scope.isAddPlayer = true;
        var data = {};
        data.avatar = $scope.player.avatar;
        data.name = $scope.player.name;
        data.tel = $scope.player.tel;
        data.role = $scope.player.role;
        $resource('/walker/player').save({

        }, {
            data: data
          }).$promise.then(function (data) {
            if (data.success) {
              notify({ message: '添加选手成功', duration: 2000, classes: 'alert-success' });
              ngDialog.close();
            } else {
              notify({ message: '添加选手失败：' + data.data, duration: 10000, classes: 'alert-danger' });
            }
            $scope.isAddPlayer = false;
            $scope.player = {
              avatar: '',
              name: '',
              sex: '',
              phone: '',
              role: ''
            };
          });
      }
    };
    // 删除选手
    $scope.del_player = function (id) {
      $resource('/walker/player').remove({

      }, {
          id: id
        }).$promise.then(function (data) {
          if (data.success) {
            notify({ message: '删除选手成功', duration: 2000, classes: 'alert-success' });
            ngDialog.close();
          } else {
            notify({ message: '删除选手失败：' + data.data, duration: 10000, classes: 'alert-danger' });
          }
        });
    };
    $scope.playerEdit = {};
    // 编辑选手
    $scope.edit_player = function (data) {
      $scope.playerEditId = data.playerid;
      $scope.playerEditData = data;
      $scope.playerEdit = {
        avatar: data.avatar,
        name: data.name,
        tel: data.tel,
        role: data.role
      };
      ngDialog.open({
        template: 'edit_player_dialog',
        scope: $scope,
        className: 'ngdialog-theme-default edit_build_dialog',
        showClose: true,
        closeByDocument: false
      });
    };
    // 编辑选手时 -- 上传头像
    $scope.edit_upload_player = function (file) {
      if (file) {
        Upload.upload({
          url: '/v1/img/upload',
          method: 'POST',
          data: {
            image: file
          }
        }).then(function (data) {
          var data = data.data;
          if (data.status === 'success') {
            $scope.playerEdit.avatar = data.url;
            notify({ message: '头像上传成功', duration: 10000, classes: 'alert-success' });
          } else {
            notify({ message: '头像上传失败', duration: 10000, classes: 'alert-danger' });
          }
        }, function (data) {
          notify({ message: '头像上传失败', duration: 10000, classes: 'alert-danger' });
        }, function (evt) {

        });
      }
    };
    // 修改选手
    $scope.update_player = function () {
      $scope.playerEditData.avatar = $scope.playerEdit.avatar;
      $scope.playerEditData.name = $scope.playerEdit.name;
      $scope.playerEditData.tel = $scope.playerEdit.tel;
      $scope.playerEditData.role = $scope.playerEdit.role;
      ngDialog.close();
      // $resource('/walker/player').update({
      //   type: 'car',
      //   id: $scope.playerEditId
      // }, {
      //     data: $scope.playerEdit
      //   }).$promise.then(function (data) {
      //     if (data.success) {
      //       notify({ message: '修改成功', duration: 10000, classes: 'alert-success' });
      //     } else {
      //       notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
      //     }
      //   }, function (data) {
      //     notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
      //   });
    };
    //------------------选手模块开始----------------------
  }
];