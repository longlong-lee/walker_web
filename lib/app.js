/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	angular.module('app', ['ui.router', 'ngResource', 'ngAnimate', 'ngDialog', 'ngFileUpload', 'cgNotify']).config(__webpack_require__(1)).filter('nameFilter', __webpack_require__(10)).filter('toolFilter', __webpack_require__(11));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.otherwise('');
	  $stateProvider.state('index', {
	    url: '',
	    views: {
	      main: {
	        template: __webpack_require__(2),
	        controller: __webpack_require__(3)
	      }
	    }
	  }).state('index.player', {
	    url: '/player',
	    views: {
	      tab: {
	        template: __webpack_require__(4),
	        controller: __webpack_require__(5)
	      }
	    }
	  }).state('index.setting', {
	    url: '/setting',
	    views: {
	      tab: {
	        template: __webpack_require__(6),
	        controller: __webpack_require__(7)
	      }
	    }
	  }).state('index.saw', {
	    url: '/saw',
	    views: {
	      tab: {
	        template: __webpack_require__(8),
	        controller: __webpack_require__(9)
	      }
	    }
	  });
	}];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<div class=\"content-title\">\r\n  <ul class=\"nav nav-pills\">\r\n    <li ng-class=\"sref=='index.player'? 'active' : 'default'\" ng-click=\"change($event)\">\r\n      <a ui-sref=\"index.player\">选手看板设置</a>\r\n    </li>\r\n    <li ng-class=\"sref=='index.setting'? 'active' : 'default'\" ng-click=\"change($event)\">\r\n      <a ui-sref=\"index.setting\">活动设置</a>\r\n    </li>\r\n    <li ng-class=\"sref=='index.saw'? 'active' : 'default'\" ng-click=\"change($event)\">\r\n      <a ui-sref=\"index.saw\">可见设置</a>\r\n    </li>\r\n  </ul>\r\n</div>\r\n<div class=\"content-ad\">\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-3\"></div>\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"input-group\">\r\n        <input type=\"text\" class=\"form-control ad-input\" placeholder=\"公告输入\" ng-model=\"notice\">\r\n        <span class=\"input-group-btn\">\r\n          <button class=\"btn btn-oppo\" type=\"button\" ng-click=\"sendNotice()\">发送公告</button>\r\n        </span>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-3\">\r\n      <div class=\"input-group\">\r\n        <span class=\"input-group-btn\">\r\n          <button class=\"btn btn-oppo\" type=\"button\" ng-click=\"seeNotice()\">查看公告</button>\r\n        </span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"tab-content\">\r\n  <div ui-view=\"tab\"></div>\r\n</div>\r\n<script type=\"text/ng-template\" id=\"notice_dialog\">\r\n  <div class=\"alert\" ng-class=\"{'alert-success': $odd, 'alert-info': $even}\" ng-repeat=\"data in noticeList\">\r\n    {{data.create_time}} : {{data.content}}\r\n  </div>\r\n</script>"

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ['$scope', '$state', 'notify', '$resource', 'ngDialog', function ($scope, $state, notify, $resource, ngDialog) {
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
	    $resource('/walker/setting/notification/ ').save({}, $scope.notice).$promise.then(function (data) {
	      debugger;
	      notify({ message: '公告发送成功', duration: 10000, classes: 'alert-success' });
	    }, function (data) {
	      debugger;
	      notify({ message: '公告发送失败', duration: 10000, classes: 'alert-danger' });
	    });
	  };
	  $scope.seeNotice = function () {
	    $resource('/walker/setting/notification/ ').query(function (data) {
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
	}];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div class=\"row\">\r\n  <button class=\"btn btn-primary ml20\" ng-click=\"getPlayers()\">刷新（每30s自动刷新一次）</button>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"content-content content-content-list1\" ng-repeat=\"data in list1\">\r\n    <div class=\"row content-content-1\">\r\n      <div class=\"col-sm-8\">\r\n        <div class=\"img img-list1\">\r\n          <img ng-src=\"{{data.player.avatar}}\" alt=\"\" class=\"avatar\">\r\n          <div class=\"name\" title=\"{{data.player.name}}\">{{data.player.name | nameFilter}}</div>\r\n          <div class=\"count\">{{data.player.audience}}人</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-4\">\r\n        <div class=\"remark remark-list1\">{{data.player.role}}</div>\r\n        <div class=\"remark remark-list1\">{{data.player.status}}</div>\r\n      </div>\r\n    </div>\r\n    <div class=\"content-content-2\">\r\n      <div class=\"row color1\">\r\n        <div class=\"col-sm-3\">人气值</div>\r\n        <div class=\"col-sm-3\">排名</div>\r\n        <div class=\"col-sm-3\">土豆值</div>\r\n        <div class=\"col-sm-3\">排名</div>\r\n      </div>\r\n      <div class=\"row color2 rank-list1\">\r\n        <div class=\"col-sm-3\">{{data.player.money}}</div>\r\n        <div class=\"col-sm-3\">{{data.player.rank}}</div>\r\n        <div class=\"col-sm-3\">{{data.player.tudou}}</div>\r\n        <div class=\"col-sm-3\">{{data.player.moneyRank}}</div>\r\n      </div>\r\n    </div>\r\n    <div class=\"content-content-3\">\r\n      <div class=\"row edit-info\" ng-click=\"editInfo(data)\">\r\n        修改信息\r\n      </div>\r\n    </div>\r\n    <div class=\"content-content-4\">\r\n      <div class=\"row content-content-4-list\" ng-repeat=\"data in data.items | toolFilter\">\r\n        <div class=\"col-sm-4\">\r\n          <img class=\"tools\" ng-src=\"{{data.picUrl}}\" alt=\"\" title=\"{{data.title}}\">\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          {{data.usedAmount}}\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          {{data.mixAmount}}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"content-content\" ng-repeat=\"data in list2\">\r\n    <div class=\"row content-content-1\">\r\n      <div class=\"col-sm-8\">\r\n        <div class=\"img\">\r\n          <img ng-src=\"{{data.player.avatar}}\" alt=\"\" class=\"avatar\">\r\n          <div class=\"name\" title=\"{{data.player.name}}\">{{data.player.name | nameFilter}}</div>\r\n          <div class=\"count\">{{data.player.audience}}人</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-4\">\r\n        <div class=\"remark\">{{data.player.role}}</div>\r\n        <div class=\"remark\">{{data.player.status}}</div>\r\n      </div>\r\n    </div>\r\n    <div class=\"content-content-2\">\r\n      <div class=\"row color1\">\r\n        <div class=\"col-sm-3\">人气值</div>\r\n        <div class=\"col-sm-3\">排名</div>\r\n        <div class=\"col-sm-3\">土豆值</div>\r\n        <div class=\"col-sm-3\">排名</div>\r\n      </div>\r\n      <div class=\"row color2\">\r\n        <div class=\"col-sm-3\">{{data.player.money}}</div>\r\n        <div class=\"col-sm-3\">{{data.player.rank}}</div>\r\n        <div class=\"col-sm-3\">{{data.player.tudou}}</div>\r\n        <div class=\"col-sm-3\">{{data.player.moneyRank}}</div>\r\n      </div>\r\n    </div>\r\n    <div class=\"content-content-3\">\r\n      <div class=\"row edit-info\" ng-click=\"editInfo(data)\">\r\n        修改信息\r\n      </div>\r\n    </div>\r\n    <div class=\"content-content-4\">\r\n      <div class=\"row content-content-4-list\" ng-repeat=\"data in data.items | toolFilter\">\r\n        <div class=\"col-sm-4\">\r\n          <img class=\"tools\" ng-src=\"{{data.picUrl}}\" alt=\"\" title=\"{{data.title}}\">\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          {{data.usedAmount}}\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          {{data.mixAmount}}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"content-content content-content-list3\" ng-repeat=\"data in list3\">\r\n    <div class=\"row content-content-1\">\r\n      <div class=\"col-sm-8\">\r\n        <div class=\"img img-list3\">\r\n          <img ng-src=\"{{data.player.avatar}}\" alt=\"\" class=\"avatar\">\r\n          <div class=\"name\" title=\"{{data.player.name}}\">{{data.player.name | nameFilter}}</div>\r\n          <div class=\"count\">{{data.player.audience}}人</div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-4\">\r\n        <div class=\"remark remark-list3\">{{data.player.role}}</div>\r\n        <div class=\"remark remark-list3\">{{data.player.status}}</div>\r\n      </div>\r\n    </div>\r\n    <div class=\"content-content-2\">\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-3\">人气值</div>\r\n        <div class=\"col-sm-3\">排名</div>\r\n        <div class=\"col-sm-3\">土豆值</div>\r\n        <div class=\"col-sm-3\">排名</div>\r\n      </div>\r\n      <div class=\"row color2 rank-list3\">\r\n        <div class=\"col-sm-3\">{{data.player.money}}</div>\r\n        <div class=\"col-sm-3\">{{data.player.rank}}</div>\r\n        <div class=\"col-sm-3\">{{data.player.tudou}}</div>\r\n        <div class=\"col-sm-3\">{{data.player.moneyRank}}</div>\r\n      </div>\r\n    </div>\r\n    <div class=\"content-content-3\">\r\n      <div class=\"row edit-info\" ng-click=\"editInfo(data)\">\r\n        修改信息\r\n      </div>\r\n    </div>\r\n    <div class=\"content-content-4\">\r\n      <div class=\"row content-content-4-list\" ng-repeat=\"data in data.items | toolFilter\">\r\n        <div class=\"col-sm-4\">\r\n          <img class=\"tools\" ng-src=\"{{data.picUrl}}\" alt=\"\" title=\"{{data.title}}\">\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          {{data.usedAmount}}\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          {{data.mixAmount}}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<script type=\"text/ng-template\" id=\"dialog\">\r\n  <div class=\"row dialog-layer-1\">\r\n    <div class=\"col-sm-2\">\r\n      <div class=\"img\">\r\n        <img ng-src=\"{{editData.player.avatar}}\" alt=\"\" class=\"avatar\">\r\n        <div>{{editData.player.name | nameFilter}}</div>\r\n        <div>{{editData.player.audience}}人</div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-2 remark\">\r\n     <div>{{editData.player.role}}</div>\r\n     <div>{{editData.player.status}}</div>\r\n    </div>\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"row color1\">\r\n        <div class=\"col-sm-3\">人气值</div>\r\n        <div class=\"col-sm-3\">排名</div>\r\n        <div class=\"col-sm-3\">土豆值</div>\r\n        <div class=\"col-sm-3\">排名</div>\r\n      </div>\r\n      <div class=\"row color2\">\r\n        <div class=\"col-sm-3\">{{editData.player.money}}</div>\r\n        <div class=\"col-sm-3\">{{editData.player.rank}}</div>\r\n        <div class=\"col-sm-3\">\r\n          <span ng-hide=\"isEditTuDou\" class=\"crp\" ng-click=\"showEditTuDou()\">{{editData.player.tudou}}</span>\r\n          <span ng-show=\"isEditTuDou\">\r\n            <input type=\"text\"class=\"form-control\" ng-model=\"editData.player.tudou\" ng-blur=\"editTuDou()\"></span>\r\n        </div>\r\n        <div class=\"col-sm-3\">{{editData.player.moneyRank}}</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row dialog-layer-2\">\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-3\">\r\n          角色\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          <select class=\"form-control select-check\" ng-options=\"role.name as role.name for role in roleList\" ng-model=\"editData.player.role\">\r\n          </select>\r\n        </div>\r\n        <div class=\"col-sm-2\">\r\n        </div>\r\n        <div class=\"col-sm-3 dialog-layer-2-line\">\r\n          <button class=\"btn btn-dialog-2\" ng-click=\"editRole()\">确定</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-3\">\r\n          状态\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          <select class=\"form-control select-check\" ng-options=\"status.name as status.name for status in statusList\" ng-model=\"editData.player.status\">\r\n          </select>\r\n        </div>\r\n        <div class=\"col-sm-2\">\r\n        </div>\r\n        <div class=\"col-sm-3\">\r\n          <button class=\"btn btn-dialog-2\" ng-click=\"editStatus()\">确定</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row dialog-layer-3\">\r\n    <div class=\"mt30\">\r\n      <div class=\"wd50 fl\" ng-repeat=\"data in editData.items\">\r\n        <div class=\"col-sm-1\">\r\n          <span ng-if=\"data.playerNeed !== 0\">急</span>\r\n        </div>\r\n        <div class=\"col-sm-2\">\r\n          <img src=\"\" alt=\"\" class=\"avatar\" ng-src=\"{{data.picUrl}}\" title=\"{{data.title}}\">\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          <div class=\"progress mt16\">\r\n            <div class=\"progress-bar progress-bar-danger progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"80\" aria-valuemin=\"0\"\r\n              aria-valuemax=\"100\" \r\n              ng-class=\"{'wd0': (data.currentAmount/data.fundTotalAmount < 0.2), 'wd20': (data.currentAmount/data.fundTotalAmount < 0.4 && data.currentAmount/data.fundTotalAmount >= 0.2), \r\n              'wd40': (data.currentAmount/data.fundTotalAmount < 0.6 && data.currentAmount/data.fundTotalAmount >= 0.4), 'wd60': (data.currentAmount/data.fundTotalAmount < 0.8 && data.currentAmount/data.fundTotalAmount >= 0.6),\r\n              'wd80': (data.currentAmount/data.fundTotalAmount < 1 && data.currentAmount/data.fundTotalAmount >= 0.8), 'wd100': (data.currentAmount/data.fundTotalAmount == 1)}\">\r\n              <span class=\"sr-only\">80% Complete (danger)</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-sm-2 ml20 crp mt12\" ng-click=\"showInput(data)\" ng-hide=\"data.isClick\">{{data.usedAmount}}/{{data.mixAmount}}</div>\r\n        <div class=\"col-sm-2 ml20 mt7\">\r\n          <input type=\"text\" class=\"form-control\" ng-model=\"data.usedAmount\" ng-show=\"data.isClick\">\r\n        </div>\r\n        <div class=\"col-sm-1 mt7\">\r\n          <button class=\"btn btn-default\" ng-show=\"data.isClick\" ng-click=\"editNum(editData, data)\">确定</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</script>"

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ['$scope', '$state', 'ngDialog', 'notify', '$resource', '$interval', function ($scope, $state, ngDialog, notify, $resource, $interval) {
	  $scope.getPlayers = function () {
	    $resource('/walker/player/list').get(function (data) {
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
	}];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div class=\"set\">\r\n  <div class=\"role-set\">地图元素维护</div>\r\n  <div class=\"map-title-set\">默认区域设置</div>\r\n  <table class=\"table map-table table-hover\">\r\n    <thead>\r\n      <tr>\r\n        <th class=\"\">区域中心</th>\r\n        <th class=\"\">半径</th>\r\n        <th class=\"\">美化系数（乘）</th>\r\n        <th class=\"\">美化系数（加）</th>\r\n        <th class=\"\">距离提醒（开关）</th>\r\n        <th class=\"\">距离提醒（距离）</th>\r\n        <th class=\"\">操作</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr>\r\n        <td>\r\n          <span>{{settings.center.lng}},{{settings.center.lat}}</span>\r\n          <span name=\"edit_map\" class=\"glyphicon glyphicon-map-marker set-font-size\" title=\"点击修改坐标\" ng-click=\"show_map_dialog(settings)\"></span>\r\n        </td>\r\n        <td>\r\n          <span>{{settings.radius}}</span>\r\n        </td>\r\n        <td>\r\n          <span>{{settings.add}}</span>\r\n        </td>\r\n        <td>\r\n          <span>{{settings.mul}}</span>\r\n        </td>\r\n        <td>\r\n          <span>{{settings.distanceWarning.warningSwitch === 'on' ? '开' : '关'}}</span>\r\n        </td>\r\n        <td>\r\n          <span>{{settings.distanceWarning.distance}}</span>\r\n        </td>\r\n        <td>\r\n          <a href=\"javascript:;\" ng-click=\"edit_setting()\">修改</a>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n  <div class=\"map-title-set\">特殊建筑维护</div>\r\n  <table class=\"table map-table table-hover\">\r\n    <thead>\r\n      <tr>\r\n        <th class=\"wd17\">建筑图标</th>\r\n        <th class=\"wd11\">名称</th>\r\n        <th class=\"wd11\">角色</th>\r\n        <th class=\"wd11\">电话号码</th>\r\n        <th class=\"wd32\">坐标</th>\r\n        <th class=\"wd18\">操作</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr ng-repeat=\"data in buildings\">\r\n        <td><img src=\"\" alt=\"\" ng-src=\"{{data.avatar}}\"></td>\r\n        <td>{{data.name}}</td>\r\n        <td>{{data.role}}</td>\r\n        <td>{{data.tel}}</td>\r\n        <td>\r\n          <span>{{data.lng}}, {{data.lat}}</span>\r\n          <span name=\"edit_map\" class=\"glyphicon glyphicon-map-marker set-font-size\" title=\"点击修改坐标\" ng-click=\"show_map_dialog(data)\"></span>\r\n        </td>\r\n        <td>\r\n          <a href=\"javascript:;\" ng-click=\"edit_build(data)\">修改</a>\r\n          <a class=\"btn-del\" href=\"javascript:;\" ng-click=\"del_build(data.playerid)\">删除</a>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td>\r\n          <img src=\"\" alt=\"\" ng-src=\"{{build.avatar}}\">\r\n          <div class=\"upload\" type=\"file\" ngf-select=\"upload_build($file)\" accept=\"image/*\" ngf-max-height=\"100000\" ngf-max-size=\"10MB\">上传图标</div>\r\n        </td>\r\n        <td><input type=\"text\" class=\"form-control\" placeholder=\"请输入名称\" ng-model=\"build.name\"></td>\r\n        <td>\r\n          <select class=\"form-control\" ng-options=\"role.name as role.name for role in roleList\" ng-model=\"build.role\"></select>\r\n        </td>\r\n        <td>\r\n          <input type=\"text\" class=\"form-control\" placeholder=\"请输入电话号码\" ng-model=\"build.tel\">\r\n        </td>\r\n        <td>\r\n          <span>{{data.lng}}, {{data.lat}}</span>\r\n          <span class=\"glyphicon glyphicon-map-marker set-font-size\" title=\"点击设置坐标\" ng-click=\"show_map_dialog(data)\"></span>\r\n        </td>\r\n        <td>\r\n          <button class=\"btn btn-oppo\" ng-click=\"add_build()\" ng-disabled=\"isAddBuild\">添加特殊建筑</button>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n  <div class=\"map-title-set\">选手维护</div>\r\n  <table class=\"table map-table table-hover\">\r\n    <thead>\r\n      <tr>\r\n        <th>头像</th>\r\n        <th>姓名</th>\r\n        <th>性别</th>\r\n        <th>手机号</th>\r\n        <th>操作</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr ng-repeat=\"data in players\">\r\n        <td class=\"wd18\">\r\n          <img ng-src=\"{{data.avatar}}\" alt=\"\">\r\n        </td>\r\n        <td class=\"wd20\">{{data.name}}</td>\r\n        <td class=\"wd20\">{{data.tel}}</td>\r\n        <td class=\"wd20\">{{data.role}}</td>\r\n        <td class=\"wd22\">\r\n          <a href=\"javascript:;\" ng-click=\"edit_player(data)\">修改</a>\r\n          <a class=\"btn-del\" href=\"javascript:;\" ng-click=\"del_player(data.playerid)\">删除</a>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td>\r\n          <img src=\"\" alt=\"\" ng-src=\"{{player.avatar}}\">\r\n          <div class=\"upload\" type=\"file\" ngf-select=\"upload_player($file)\" accept=\"image/*\" ngf-max-height=\"100000\" ngf-max-size=\"10MB\">上传头像</div>\r\n        </td>\r\n        <td><input type=\"text\" class=\"form-control\" placeholder=\"请输入姓名\" ng-model=\"player.name\"></td>\r\n        <td><input type=\"text\" class=\"form-control\" placeholder=\"请输入手机号\" ng-model=\"player.tel\"></td>\r\n        <td>\r\n          <select class=\"form-control\" ng-model=\"player.role\">\r\n            <option value=\"逃亡者\">逃亡者</option>\r\n            <option value=\"追击者\">追击者</option>\r\n          </select>\r\n        </td>\r\n        <td>\r\n          <button class=\"btn btn-oppo\" ng-click=\"add_player()\" ng-disabled=\"isAddPlayer\">添加选手</button>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n<!--区域设置 修改框-->\r\n<script type=\"text/ng-template\" id=\"edit_setting_dialog\">\r\n  <div class=\"row mb10\">\r\n    <label class=\"col-sm-4\">半径</label>\r\n    <div class=\"col-sm-8\">\r\n      <input type=\"text\" class=\"form-control\" placeholder=\"请输入半径\" ng-model=\"settingEdit.radius\">\r\n    </div>\r\n  </div>\r\n  <div class=\"row mb10\">\r\n    <label class=\"col-sm-4\">美化系数（乘）</label>\r\n    <div class=\"col-sm-8\">\r\n      <input type=\"text\" class=\"form-control\" placeholder=\"请输入美化系数\" ng-model=\"settingEdit.mul\">\r\n    </div>\r\n  </div>\r\n  <div class=\"row mb10\">\r\n    <label class=\"col-sm-4\">美化系数（加）</label>\r\n    <div class=\"col-sm-8\">\r\n      <input type=\"text\" class=\"form-control\" placeholder=\"请输入美化系数\" ng-model=\"settingEdit.add\">\r\n    </div>\r\n  </div>\r\n  <div class=\"row mb10\">\r\n    <label class=\"col-sm-4\">距离提醒（开关）</label>\r\n    <div class=\"col-sm-8\">\r\n      <select class=\"form-control select-check\" ng-model=\"settingEdit.switch\">\r\n        <option value=\"on\">开</option>\r\n        <option value=\"off\">关</option>\r\n      </select>\r\n    </div>\r\n  </div>\r\n  <div class=\"row mb10\">\r\n    <label class=\"col-sm-4\">距离提醒（距离）</label>\r\n    <div class=\"col-sm-8\">\r\n      <input type=\"text\" class=\"form-control\" placeholder=\"请输入距离\" ng-model=\"settingEdit.distance\">\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <button class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"closeThisDialog(0)\">关闭</button>\r\n    <button class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"update_setting()\">保存</button>\r\n  </div>\r\n</script>\r\n<!--特殊建筑维护 修改框-->\r\n<script type=\"text/ng-template\" id=\"edit_build_dialog\">\r\n  <div class=\"row edit_build_dialog mb10\">\r\n    <label class=\"col-sm-3\">建筑图标</label>\r\n    <div class=\"col-sm-9\">\r\n      <img src=\"\" alt=\"\" ng-src=\"{{buildEdit.avatar}}\">\r\n      <div class=\"upload dialog-upload\" type=\"file\" ngf-select=\"edit_upload_build($file)\" accept=\"image/*\" ngf-max-height=\"100000\"\r\n        ngf-max-size=\"10MB\">上传图标</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row mb10\">\r\n    <label class=\"col-sm-3\">名称</label>\r\n    <div class=\"col-sm-9\">\r\n      <input type=\"text\" class=\"form-control\" placeholder=\"请输入名称\" ng-model=\"buildEdit.name\">\r\n    </div>\r\n  </div>\r\n  <div class=\"row mb10\">\r\n    <label class=\"col-sm-3\">角色</label>\r\n    <div class=\"col-sm-9\">\r\n      <select class=\"form-control\" ng-options=\"role.name as role.name for role in roleList\" ng-model=\"buildEdit.role\"></select>\r\n    </div>\r\n  </div>\r\n  <div class=\"row mb10\">\r\n    <label class=\"col-sm-3\">电话</label>\r\n    <div class=\"col-sm-9\">\r\n      <input type=\"text\" class=\"form-control\" placeholder=\"请输入电话\" ng-model=\"buildEdit.tel\">\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <button class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"closeThisDialog(0)\">关闭</button>\r\n    <button class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"update_build()\">保存</button>\r\n  </div>\r\n</script>\r\n<!--选手维护 修改框-->\r\n<script type=\"text/ng-template\" id=\"edit_player_dialog\">\r\n  <div class=\"row edit_build_dialog mb10\">\r\n    <label class=\"col-sm-3\">选手头像</label>\r\n    <div class=\"col-sm-9\">\r\n      <img src=\"\" alt=\"\" ng-src=\"{{playerEdit.avatar}}\">\r\n      <div class=\"upload dialog-upload\" type=\"file\" ngf-select=\"edit_upload_player($file)\" accept=\"image/*\" ngf-max-height=\"100000\"\r\n        ngf-max-size=\"10MB\">上传头像</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row mb10\">\r\n    <label class=\"col-sm-3\">姓名</label>\r\n    <div class=\"col-sm-9\">\r\n      <input type=\"text\" class=\"form-control\" placeholder=\"请输入姓名\" ng-model=\"playerEdit.name\">\r\n    </div>\r\n  </div>\r\n  <div class=\"row mb10\">\r\n    <label class=\"col-sm-3\">手机号</label>\r\n    <div class=\"col-sm-9\">\r\n      <input type=\"text\" class=\"form-control\" placeholder=\"请输入手机号\" ng-model=\"playerEdit.tel\">\r\n    </div>\r\n  </div>\r\n  <div class=\"row mb10\">\r\n    <label class=\"col-sm-3\">角色</label>\r\n    <div class=\"col-sm-9\">\r\n      <select class=\"form-control\" ng-model=\"playerEdit.role\">\r\n        <option value=\"逃亡者\">逃亡者</option>\r\n        <option value=\"追击者\">追击者</option>\r\n      </select>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <button class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"closeThisDialog(0)\">关闭</button>\r\n    <button class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"update_player()\">保存</button>\r\n  </div>\r\n</script>\r\n<!--地图 -->\r\n<script type=\"text/ng-template\" id=\"map_dialog\">\r\n  <div class=\"row tac mb10\">\r\n    <div class=\"map\" id=\"mapContainer\"></div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <button class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"set_map_position_colse()\">关闭</button>\r\n    <button class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"set_map_position()\">保存</button>\r\n  </div>\r\n</script>"

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ['$scope', '$state', 'Upload', 'notify', '$resource', 'ngDialog', function ($scope, $state, Upload, notify, $resource, ngDialog) {
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
	        $resource('/walker/setting/ ').save({}, {
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
	    $resource('/walker/setting/ ').save({}, {
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
	    }];
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
	      }, function (evt) {});
	    }
	  };
	  // 增加建筑物时 -- 校验必填项
	  $scope.valid_build = function () {
	    if (!$scope.build.avatar) {
	      notify({ message: '请上传建筑图标', duration: 10000, classes: 'alert-danger' });
	      return false;
	    }
	    if (!$scope.build.name) {
	      notify({ message: '请填写建筑名称', duration: 10000, classes: 'alert-danger' });
	      return false;
	    }
	    if (!$scope.build.role) {
	      notify({ message: '请填写建筑角色', duration: 10000, classes: 'alert-danger' });
	      return false;
	    }
	    if (!$scope.build.tel) {
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
	      $resource('/walker/player/ ').save({}, {
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
	    $resource('/walker/player/building').remove({}, {
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
	      }, function (evt) {});
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
	    }];
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
	      }, function (evt) {});
	    }
	  };
	  // 增加选手时 -- 校验必填
	  $scope.valid_player = function () {
	    if (!$scope.player.avatar) {
	      notify({ message: '请上传选手头像', duration: 10000, classes: 'alert-danger' });
	      return false;
	    }
	    if (!$scope.player.name) {
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
	      $resource('/walker/player').save({}, {
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
	    $resource('/walker/player').remove({}, {
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
	      }, function (evt) {});
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
	}];

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "  <div class=\"saw-setting\">\r\n  <table class=\"table table-hover\">\r\n    <thead>\r\n      <tr>\r\n        <th></th>\r\n        <th ng-repeat=\"data in players\">{{data.name}}</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr ng-repeat=\"player in players\">\r\n        <td>{{player.name}}</td>\r\n        <td ng-repeat=\" data in datas[$index]\">\r\n          <input type=\"checkbox\" class=\"dpn chk\" id=\"{{data.objectId}}-{{data.subjectId}}\" ng-checked=\"data.checked\" ng-model=\"data.checked\" ng-click=\"edit($event, data)\">\r\n          <label for=\"{{data.objectId}}-{{data.subjectId}}\"></label>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n  </div>"

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	module.exports = ['$scope', '$state', 'notify', '$resource', function ($scope, $state, notify, $resource) {
	  $scope.getUserSet = function () {
	    $resource('/walker/setting/visible/ ').get({}).$promise.then(function (data) {
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
	        var keepGoing = false,
	            checked = false;
	        angular.forEach($scope.settings, function (v, k) {
	          //判断是否开启
	          if (!keepGoing) {
	            if (v.objectId === value.playerid && v.subjectId === val.playerid) {
	              checked = v.visible ? true : false;
	              keepGoing = true;
	            }
	          }
	        });
	        if (!datas[index]) {
	          datas[index] = [];
	        }
	        datas[index].push({
	          name: value.name,
	          subname: val.name,
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
	    }, {}).$promise.then(function (res) {
	      var msg = data.name + (data.checked ? '可以看见' : '不可以看见') + data.subname;
	      notify({ message: msg, duration: 10000, classes: 'alert-success' });
	    }, function (res) {
	      notify({ message: '状态修改失败，请稍后重试', duration: 10000, classes: 'alert-danger' });
	      data.checked = data.checked ? false : true;
	    });
	  };
	}];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	  return function (input) {
	    var data = '';
	    if (input.length <= 3) {
	      data = input;
	    } else {
	      data = input.substring(0, 3) + '...';
	    }
	    return data;
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	  return function (input) {
	    var data = [];
	    angular.forEach(input, function (a, b, c) {
	      if (a.mixAmount !== a.usedAmount) {
	        data.push(a);
	      }
	    });
	    return data;
	  };
	};

/***/ }
/******/ ]);