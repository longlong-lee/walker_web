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
          var coordinate = $scope.editBuildData.coordinate.split(',');
          var position = new AMap.LngLat(coordinate[0], coordinate[1]);
          map.setCenter([coordinate[0], coordinate[1]]);
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
          $scope.clickPosition = e.lnglat.lng + ',' + e.lnglat.lat//经度 - lng   纬度 - lat
        };
        map.on('click', _onClick);
      }
    });
    $scope.set_map_position = function () {
      if ($scope.edit_build_mode) {
        $scope.editBuildData.coordinate = $scope.clickPosition;
        $scope.edit_build_mode = false;
        //TODO update 坐标的数据
      } else if ($scope.edit_setting_mode) {
        var data = $scope.clickPosition.split(',');
        $resource('/walker/setting/ ').save({

        }, {
            centerLng: data[0] + '',
            centerLat: data[1] + ''
          }).$promise.then(function (req) {
            $scope.settings.center.lng = data[0];
            $scope.settings.center.lat = data[1];
            $scope.edit_setting_mode = false;
            notify({ message: '修改成功', duration: 10000, classes: 'alert-success' });
            ngDialog.close();
          }, function (data) {
            notify({ message: '出错啦', duration: 10000, classes: 'alert-danger' });
          });
      } else {
        $scope.build.coordinate = $scope.clickPosition;
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
      imgUrl: '',
      name: '',
      coordinate: ''
    };
    $scope.isAddBuild = false;
    // 查询建筑物
    $scope.query_build = function () {
      // queryService.get({
      //   type: 'car'
      // }).$promise.then(function (data) {
      //   if (data.success) {
      $scope.buildings = [{
        id: '1',
        imgUrl: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
        name: '仓库',
        coordinate: '121.49393,31.192231'
      }, {
          id: '2',
          imgUrl: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
          name: '监狱',
          coordinate: '121.651858,31.044096'
        }, {
          id: '3',
          imgUrl: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
          name: '餐厅',
          coordinate: '120.621969,31.281598'
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
            $scope.build.imgUrl = data.url;
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
      if (!$scope.build.imgUrl) {
        notify({ message: '请上传建筑图标', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!($scope.build.name)) {
        notify({ message: '请填写建筑名称', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!$scope.build.coordinate) {
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
        data.imgUrl = $scope.build.imgUrl;
        data.name = $scope.build.name;
        data.coordinate = $scope.build.coordinate;
        queryService.save({
          type: 'car'
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
              imgUrl: '',
              name: '',
              coordinate: ''
            };
          });
      }
    };
    // 删除建筑物
    $scope.del_build = function (id) {
      queryService.remove({
        type: 'car'
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
      $scope.buildEditId = data.id;
      $scope.buildEdit = {
        imgUrl: data.imgUrl,
        name: data.name
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
          url: 'http://testapi.kids.youku.com/v1/img/upload',
          method: 'POST',
          data: {
            image: file
          }
        }).then(function (data) {
          var data = data.data;
          if (data.status === 'success') {
            $scope.buildEdit.imgUrl = data.url;
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
      $scope.editBuildData.imgUrl = $scope.buildEdit.imgUrl;
      $scope.editBuildData.name = $scope.buildEdit.name;
      ngDialog.close();
      // queryService.update({
      //   type: 'car',
      //   id: $scope.buildEditId
      // }, {
      //     data: $scope.buildEdit
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
    //------------------建筑模块开始----------------------
    //------------------选手模块开始----------------------
    $scope.player = {
      imgUrl: '',
      name: '',
      sex: '',
      phone: '',
      role: ''
    };
    $scope.isAddPlayer = false;
    // 查询选手
    $scope.query_player = function () {
      // queryService.get({
      //   type: 'car'
      // }).$promise.then(function (data) {
      //   if (data.success) {
      $scope.players = [{
        id: '1',
        imgUrl: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
        name: '小明',
        sex: '男',
        phone: '123456789',
        role: '逃亡者'
      }, {
          id: '2',
          imgUrl: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
          name: '旺财',
          sex: '女',
          phone: '546895248',
          role: '追击者'
        }, {
          id: '3',
          imgUrl: 'http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg',
          name: '静静',
          sex: '女',
          phone: '7895468924',
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
          url: 'http://testapi.kids.youku.com/v1/img/upload',
          method: 'POST',
          data: {
            image: file
          }
        }).then(function (data) {
          var data = data.data;
          if (data.status === 'success') {
            $scope.player.imgUrl = data.url;
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
      if (!$scope.player.imgUrl) {
        notify({ message: '请上传选手头像', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!($scope.player.name)) {
        notify({ message: '请填写选手姓名', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!$scope.player.sex) {
        notify({ message: '请填写选手性别', duration: 10000, classes: 'alert-danger' });
        return false;
      }
      if (!$scope.player.phone) {
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
        data.imgUrl = $scope.player.imgUrl;
        data.name = $scope.player.name;
        data.sex = $scope.player.sex;
        data.phone = $scope.player.phone;
        data.role = $scope.player.role;
        queryService.save({
          type: 'car'
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
              imgUrl: '',
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
      queryService.remove({
        type: 'car'
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
      $scope.playerEditId = data.id;
      $scope.playerEditData = data;
      $scope.playerEdit = {
        imgUrl: data.imgUrl,
        name: data.name,
        sex: data.sex,
        phone: data.phone,
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
          url: 'http://testapi.kids.youku.com/v1/img/upload',
          method: 'POST',
          data: {
            image: file
          }
        }).then(function (data) {
          var data = data.data;
          if (data.status === 'success') {
            $scope.playerEdit.imgUrl = data.url;
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
      $scope.playerEditData.imgUrl = $scope.playerEdit.imgUrl;
      $scope.playerEditData.name = $scope.playerEdit.name;
      $scope.playerEditData.sex = $scope.playerEdit.sex;
      $scope.playerEditData.phone = $scope.playerEdit.phone;
      $scope.playerEditData.role = $scope.playerEdit.role;
      ngDialog.close();
      // queryService.update({
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