!function(a){function t(e){if(n[e])return n[e].exports;var s=n[e]={exports:{},id:e,loaded:!1};return a[e].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}var n={};return t.m=a,t.c=n,t.p="",t(0)}([function(a,t,n){"use strict";angular.module("app",["ui.router","ngResource","ngAnimate","ngDialog","ngFileUpload","cgNotify"]).config(n(1)).filter("nameFilter",n(10)).filter("toolFilter",n(11))},function(a,t,n){"use strict";a.exports=["$stateProvider","$urlRouterProvider",function(a,t){t.otherwise(""),a.state("index",{url:"",views:{main:{template:n(2),controller:n(3)}}}).state("index.player",{url:"/player",views:{tab:{template:n(4),controller:n(5)}}}).state("index.setting",{url:"/setting",views:{tab:{template:n(6),controller:n(7)}}}).state("index.saw",{url:"/saw",views:{tab:{template:n(8),controller:n(9)}}})}]},function(a,t){a.exports='<div class="content-title">\r\n  <ul class="nav nav-pills">\r\n    <li ng-class="sref==\'index.player\'? \'active\' : \'default\'" ng-click="change($event)">\r\n      <a ui-sref="index.player">选手看板设置</a>\r\n    </li>\r\n    <li ng-class="sref==\'index.setting\'? \'active\' : \'default\'" ng-click="change($event)">\r\n      <a ui-sref="index.setting">活动设置</a>\r\n    </li>\r\n    <li ng-class="sref==\'index.saw\'? \'active\' : \'default\'" ng-click="change($event)">\r\n      <a ui-sref="index.saw">可见设置</a>\r\n    </li>\r\n  </ul>\r\n</div>\r\n<div class="content-ad">\r\n  <div class="row">\r\n    <div class="col-sm-3"></div>\r\n    <div class="col-sm-6">\r\n      <div class="input-group">\r\n        <input type="text" class="form-control ad-input" placeholder="公告输入" ng-model="notice">\r\n        <span class="input-group-btn">\r\n          <button class="btn btn-oppo" type="button" ng-click="sendNotice()">发送公告</button>\r\n        </span>\r\n      </div>\r\n    </div>\r\n    <div class="col-sm-3">\r\n      <div class="input-group">\r\n        <span class="input-group-btn">\r\n          <button class="btn btn-oppo" type="button" ng-click="seeNotice()">查看公告</button>\r\n        </span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class="tab-content">\r\n  <div ui-view="tab"></div>\r\n</div>\r\n<script type="text/ng-template" id="notice_dialog">\r\n  <div class="alert" ng-class="{\'alert-success\': $odd, \'alert-info\': $even}" ng-repeat="data in noticeList">\r\n    {{data.create_time}} : {{data.content}}\r\n  </div>\r\n</script>'},function(a,t){"use strict";a.exports=["$scope","$state","notify","$resource","ngDialog",function(a,t,n,e,s){"index"===t.current.name?(t.go("index.player"),a.sref="index.player"):a.sref=t.current.name,a.change=function(t){a.sref=t.target.getAttribute("ui-sref")},a.sendNotice=function(){return a.notice?void 0:(n({message:"请填写公告",duration:1e4,classes:"alert-danger"}),!1)},a.seeNotice=function(){e("/walker/setting/notification/ ").query(function(t){a.noticeList=t,a.showNotice()},function(a){n({message:"获取公告失败",duration:1e4,classes:"alert-danger"})})},a.showNotice=function(){s.open({template:"notice_dialog",scope:a,className:"ngdialog-theme-default notice-dialog",showClose:!1,closeByDocument:!0})}}]},function(a,t){a.exports='<div class="row">\r\n  <button class="btn btn-primary ml20" ng-click="getPlayers()">刷新（每30s自动刷新一次）</button>\r\n</div>\r\n<div class="row">\r\n  <div class="content-content content-content-list1" ng-repeat="data in list1">\r\n    <div class="row content-content-1">\r\n      <div class="col-sm-8">\r\n        <div class="img img-list1">\r\n          <img ng-src="{{data.player.avatar}}" alt="" class="avatar">\r\n          <div class="name" title="{{data.player.name}}">{{data.player.name | nameFilter}}</div>\r\n          <div class="count">{{data.player.audience}}人</div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-4">\r\n        <div class="remark remark-list1">{{data.player.role}}</div>\r\n        <div class="remark remark-list1">{{data.player.status}}</div>\r\n      </div>\r\n    </div>\r\n    <div class="content-content-2">\r\n      <div class="row color1">\r\n        <div class="col-sm-3">人气值</div>\r\n        <div class="col-sm-3">排名</div>\r\n        <div class="col-sm-3">土豆值</div>\r\n        <div class="col-sm-3">排名</div>\r\n      </div>\r\n      <div class="row color2 rank-list1">\r\n        <div class="col-sm-3">{{data.player.money}}</div>\r\n        <div class="col-sm-3">{{data.player.rank}}</div>\r\n        <div class="col-sm-3">{{data.player.tudou}}</div>\r\n        <div class="col-sm-3">{{data.player.moneyRank}}</div>\r\n      </div>\r\n    </div>\r\n    <div class="content-content-3">\r\n      <div class="row edit-info" ng-click="editInfo(data)">\r\n        修改信息\r\n      </div>\r\n    </div>\r\n    <div class="content-content-4">\r\n      <div class="row content-content-4-list" ng-repeat="data in data.items | toolFilter">\r\n        <div class="col-sm-4">\r\n          <img class="tools" ng-src="{{data.picUrl}}" alt="" title="{{data.title}}">\r\n        </div>\r\n        <div class="col-sm-4">\r\n          {{data.usedAmount}}\r\n        </div>\r\n        <div class="col-sm-4">\r\n          {{data.mixAmount}}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class="row">\r\n  <div class="content-content" ng-repeat="data in list2">\r\n    <div class="row content-content-1">\r\n      <div class="col-sm-8">\r\n        <div class="img">\r\n          <img ng-src="{{data.player.avatar}}" alt="" class="avatar">\r\n          <div class="name" title="{{data.player.name}}">{{data.player.name | nameFilter}}</div>\r\n          <div class="count">{{data.player.audience}}人</div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-4">\r\n        <div class="remark">{{data.player.role}}</div>\r\n        <div class="remark">{{data.player.status}}</div>\r\n      </div>\r\n    </div>\r\n    <div class="content-content-2">\r\n      <div class="row color1">\r\n        <div class="col-sm-3">人气值</div>\r\n        <div class="col-sm-3">排名</div>\r\n        <div class="col-sm-3">土豆值</div>\r\n        <div class="col-sm-3">排名</div>\r\n      </div>\r\n      <div class="row color2">\r\n        <div class="col-sm-3">{{data.player.money}}</div>\r\n        <div class="col-sm-3">{{data.player.rank}}</div>\r\n        <div class="col-sm-3">{{data.player.tudou}}</div>\r\n        <div class="col-sm-3">{{data.player.moneyRank}}</div>\r\n      </div>\r\n    </div>\r\n    <div class="content-content-3">\r\n      <div class="row edit-info" ng-click="editInfo(data)">\r\n        修改信息\r\n      </div>\r\n    </div>\r\n    <div class="content-content-4">\r\n      <div class="row content-content-4-list" ng-repeat="data in data.items | toolFilter">\r\n        <div class="col-sm-4">\r\n          <img class="tools" ng-src="{{data.picUrl}}" alt="" title="{{data.title}}">\r\n        </div>\r\n        <div class="col-sm-4">\r\n          {{data.usedAmount}}\r\n        </div>\r\n        <div class="col-sm-4">\r\n          {{data.mixAmount}}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class="row">\r\n  <div class="content-content content-content-list3" ng-repeat="data in list3">\r\n    <div class="row content-content-1">\r\n      <div class="col-sm-8">\r\n        <div class="img img-list3">\r\n          <img ng-src="{{data.player.avatar}}" alt="" class="avatar">\r\n          <div class="name" title="{{data.player.name}}">{{data.player.name | nameFilter}}</div>\r\n          <div class="count">{{data.player.audience}}人</div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-4">\r\n        <div class="remark remark-list3">{{data.player.role}}</div>\r\n        <div class="remark remark-list3">{{data.player.status}}</div>\r\n      </div>\r\n    </div>\r\n    <div class="content-content-2">\r\n      <div class="row">\r\n        <div class="col-sm-3">人气值</div>\r\n        <div class="col-sm-3">排名</div>\r\n        <div class="col-sm-3">土豆值</div>\r\n        <div class="col-sm-3">排名</div>\r\n      </div>\r\n      <div class="row color2 rank-list3">\r\n        <div class="col-sm-3">{{data.player.money}}</div>\r\n        <div class="col-sm-3">{{data.player.rank}}</div>\r\n        <div class="col-sm-3">{{data.player.tudou}}</div>\r\n        <div class="col-sm-3">{{data.player.moneyRank}}</div>\r\n      </div>\r\n    </div>\r\n    <div class="content-content-3">\r\n      <div class="row edit-info" ng-click="editInfo(data)">\r\n        修改信息\r\n      </div>\r\n    </div>\r\n    <div class="content-content-4">\r\n      <div class="row content-content-4-list" ng-repeat="data in data.items | toolFilter">\r\n        <div class="col-sm-4">\r\n          <img class="tools" ng-src="{{data.picUrl}}" alt="" title="{{data.title}}">\r\n        </div>\r\n        <div class="col-sm-4">\r\n          {{data.usedAmount}}\r\n        </div>\r\n        <div class="col-sm-4">\r\n          {{data.mixAmount}}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<script type="text/ng-template" id="dialog">\r\n  <div class="row dialog-layer-1">\r\n    <div class="col-sm-2">\r\n      <div class="img">\r\n        <img ng-src="{{editData.player.avatar}}" alt="" class="avatar">\r\n        <div>{{editData.player.name | nameFilter}}</div>\r\n        <div>{{editData.player.audience}}人</div>\r\n      </div>\r\n    </div>\r\n    <div class="col-sm-2 remark">\r\n      {{editData.player.role}}\r\n    </div>\r\n    <div class="col-sm-6">\r\n      <div class="row color1">\r\n        <div class="col-sm-3">人气值</div>\r\n        <div class="col-sm-3">排名</div>\r\n        <div class="col-sm-3">土豆值</div>\r\n        <div class="col-sm-3">排名</div>\r\n      </div>\r\n      <div class="row color2">\r\n        <div class="col-sm-3">{{editData.player.money}}</div>\r\n        <div class="col-sm-3">{{editData.player.rank}}</div>\r\n        <div class="col-sm-3">{{editData.player.tudou}}</div>\r\n        <div class="col-sm-3">{{editData.player.moneyRank}}</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class="row dialog-layer-2">\r\n    <div class="col-sm-6">\r\n      <div class="row">\r\n        <div class="col-sm-3">\r\n          角色\r\n        </div>\r\n        <div class="col-sm-4">\r\n          <select class="form-control select-check" ng-options="role.name as role.name for role in roleList" ng-model="editData.player.role">\r\n          </select>\r\n        </div>\r\n        <div class="col-sm-2">\r\n        </div>\r\n        <div class="col-sm-3 dialog-layer-2-line">\r\n          <button class="btn btn-dialog-2" ng-click="editRole()">确定</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class="col-sm-6">\r\n      <div class="row">\r\n        <div class="col-sm-3">\r\n          状态\r\n        </div>\r\n        <div class="col-sm-4">\r\n          <select class="form-control select-check" ng-options="status.name as status.name for status in statusList" ng-model="editData.player.status">\r\n          </select>\r\n        </div>\r\n        <div class="col-sm-2">\r\n        </div>\r\n        <div class="col-sm-3">\r\n          <button class="btn btn-dialog-2" ng-click="editStatus()">确定</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class="row dialog-layer-3">\r\n    <div class="mt30">\r\n      <div class="wd50 fl" ng-repeat="data in editData.items">\r\n        <div class="col-sm-1">\r\n          <span ng-if="data.playerNeed !== 0">急</span>\r\n        </div>\r\n        <div class="col-sm-2">\r\n          <img src="" alt="" class="avatar" ng-src="{{data.picUrl}}" title="{{data.title}}">\r\n        </div>\r\n        <div class="col-sm-4">\r\n          <div class="progress mt16">\r\n            <div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuenow="80" aria-valuemin="0"\r\n              aria-valuemax="100" \r\n              ng-class="{\'wd0\': (data.currentAmount/data.fundTotalAmount < 0.2), \'wd20\': (data.currentAmount/data.fundTotalAmount < 0.4 && data.currentAmount/data.fundTotalAmount >= 0.2), \r\n              \'wd40\': (data.currentAmount/data.fundTotalAmount < 0.6 && data.currentAmount/data.fundTotalAmount >= 0.4), \'wd60\': (data.currentAmount/data.fundTotalAmount < 0.8 && data.currentAmount/data.fundTotalAmount >= 0.6),\r\n              \'wd80\': (data.currentAmount/data.fundTotalAmount < 1 && data.currentAmount/data.fundTotalAmount >= 0.8), \'wd100\': (data.currentAmount/data.fundTotalAmount == 1)}">\r\n              <span class="sr-only">80% Complete (danger)</span>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class="col-sm-2 ml20 crp mt12" ng-click="showInput(data)" ng-hide="data.isClick">{{data.usedAmount}}/{{data.mixAmount}}</div>\r\n        <div class="col-sm-2 ml20 mt7">\r\n          <input type="text" class="form-control" ng-model="data.usedAmount" ng-show="data.isClick">\r\n        </div>\r\n        <div class="col-sm-1 mt7">\r\n          <button class="btn btn-default" ng-show="data.isClick" ng-click="editNum(editData, data)">确定</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</script>'},function(a,t){"use strict";a.exports=["$scope","$state","ngDialog","notify","$resource","$interval",function(a,t,n,e,s,r){a.getPlayers=function(){s("/walker/player/list").get(function(t){a.list1=t["追捕者"],a.list2=t["逃亡者"],a.list3=t["候补者"]},function(a){e({message:"获取数据失败,请刷新",duration:1e4,classes:"alert-danger"})})},a.getPlayers(),a.editInfo=function(t){a.editDataOrigin=t,a.editData=angular.copy(t),a.isShowDiv=!0,n.open({template:"dialog",scope:a,className:"ngdialog-theme-default",showClose:!0,closeByDocument:!1,trapFocus:!1})},a.roleList=[{name:"逃亡者"},{name:"追捕者"},{name:"候补者"}],a.statusList=[{name:"正常"},{name:"入狱"},{name:"淘汰"}],a.editRole=function(){s("/walker/player/:id").save({id:a.editData.player.playerid},{role:a.editData.player.role},function(t){e({message:"角色修改成功",duration:1e4,classes:"alert-success"}),a.getPlayers()},function(a){e({message:"角色修改失败",duration:1e4,classes:"alert-danger"})})},a.editStatus=function(){s("/walker/player/:id").save({id:a.editData.player.playerid},{status:a.editData.player.status}).$promise.then(function(t){e({message:"状态修改成功",duration:1e4,classes:"alert-success"}),a.editDataOrigin.player.status=a.editData.player.status},function(a){e({message:"状态修改失败",duration:1e4,classes:"alert-danger"})})},a.showInput=function(a){a.isClick=!0},a.editNum=function(t,n){s("/walker/player/:id/:itemId").save({id:t.player.playerid,itemId:n.itemId},{usedAmount:parseInt(n.usedAmount,10)}).$promise.then(function(t){e({message:"数目修改成功",duration:1e4,classes:"alert-success"}),n.isClick=!1,a.getPlayers()},function(a){e({message:"数目修改失败",duration:1e4,classes:"alert-danger"})})}}]},function(a,t){a.exports='<div class="set">\r\n  <div class="role-set">地图元素维护</div>\r\n  <div class="map-title-set">默认区域设置</div>\r\n  <table class="table map-table table-hover">\r\n    <thead>\r\n      <tr>\r\n        <th class="">区域中心</th>\r\n        <th class="">半径</th>\r\n        <th class="">美化系数（乘）</th>\r\n        <th class="">美化系数（加）</th>\r\n        <th class="">距离提醒（开关）</th>\r\n        <th class="">距离提醒（距离）</th>\r\n        <th class="">操作</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr>\r\n        <td>\r\n          <span>{{settings.center.lng}},{{settings.center.lat}}</span>\r\n          <span name="edit_map" class="glyphicon glyphicon-map-marker set-font-size" title="点击修改坐标" ng-click="show_map_dialog(settings)"></span>\r\n        </td>\r\n        <td>\r\n          <span>{{settings.radius}}</span>\r\n        </td>\r\n        <td>\r\n          <span>{{settings.add}}</span>\r\n        </td>\r\n        <td>\r\n          <span>{{settings.mul}}</span>\r\n        </td>\r\n        <td>\r\n          <span>{{settings.distanceWarning.warningSwitch === \'on\' ? \'开\' : \'关\'}}</span>\r\n        </td>\r\n        <td>\r\n          <span>{{settings.distanceWarning.distance}}</span>\r\n        </td>\r\n        <td>\r\n          <a href="javascript:;" ng-click="edit_setting()">修改</a>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n  <div class="map-title-set">特殊建筑维护</div>\r\n  <table class="table map-table table-hover">\r\n    <thead>\r\n      <tr>\r\n        <th class="wd17">建筑图标</th>\r\n        <th class="wd11">名称</th>\r\n        <th class="wd11">角色</th>\r\n        <th class="wd11">电话号码</th>\r\n        <th class="wd32">坐标</th>\r\n        <th class="wd18">操作</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr ng-repeat="data in buildings">\r\n        <td><img src="" alt="" ng-src="{{data.avatar}}"></td>\r\n        <td>{{data.name}}</td>\r\n        <td>{{data.role}}</td>\r\n        <td>{{data.tel}}</td>\r\n        <td>\r\n          <span>{{data.lng}}, {{data.lat}}</span>\r\n          <span name="edit_map" class="glyphicon glyphicon-map-marker set-font-size" title="点击修改坐标" ng-click="show_map_dialog(data)"></span>\r\n        </td>\r\n        <td>\r\n          <a href="javascript:;" ng-click="edit_build(data)">修改</a>\r\n          <a class="btn-del" href="javascript:;" ng-click="del_build(data.playerid)">删除</a>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td>\r\n          <img src="" alt="" ng-src="{{build.avatar}}">\r\n          <div class="upload" type="file" ngf-select="upload_build($file)" accept="image/*" ngf-max-height="100000" ngf-max-size="10MB">上传图标</div>\r\n        </td>\r\n        <td><input type="text" class="form-control" placeholder="请输入名称" ng-model="build.name"></td>\r\n        <td>\r\n          <select class="form-control" ng-options="role.name as role.name for role in roleList" ng-model="build.role"></select>\r\n        </td>\r\n        <td>\r\n          <input type="text" class="form-control" placeholder="请输入电话号码" ng-model="build.tel">\r\n        </td>\r\n        <td>\r\n          <span>{{data.lng}}, {{data.lat}}</span>\r\n          <span class="glyphicon glyphicon-map-marker set-font-size" title="点击设置坐标" ng-click="show_map_dialog(data)"></span>\r\n        </td>\r\n        <td>\r\n          <button class="btn btn-oppo" ng-click="add_build()" ng-disabled="isAddBuild">添加特殊建筑</button>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n  <div class="map-title-set">选手维护</div>\r\n  <table class="table map-table table-hover">\r\n    <thead>\r\n      <tr>\r\n        <th>头像</th>\r\n        <th>姓名</th>\r\n        <th>性别</th>\r\n        <th>手机号</th>\r\n        <th>操作</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr ng-repeat="data in players">\r\n        <td class="wd18">\r\n          <img ng-src="{{data.avatar}}" alt="">\r\n        </td>\r\n        <td class="wd20">{{data.name}}</td>\r\n        <td class="wd20">{{data.tel}}</td>\r\n        <td class="wd20">{{data.role}}</td>\r\n        <td class="wd22">\r\n          <a href="javascript:;" ng-click="edit_player(data)">修改</a>\r\n          <a class="btn-del" href="javascript:;" ng-click="del_player(data.playerid)">删除</a>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td>\r\n          <img src="" alt="" ng-src="{{player.avatar}}">\r\n          <div class="upload" type="file" ngf-select="upload_player($file)" accept="image/*" ngf-max-height="100000" ngf-max-size="10MB">上传头像</div>\r\n        </td>\r\n        <td><input type="text" class="form-control" placeholder="请输入姓名" ng-model="player.name"></td>\r\n        <td><input type="text" class="form-control" placeholder="请输入手机号" ng-model="player.tel"></td>\r\n        <td>\r\n          <select class="form-control" ng-model="player.role">\r\n            <option value="逃亡者">逃亡者</option>\r\n            <option value="追击者">追击者</option>\r\n          </select>\r\n        </td>\r\n        <td>\r\n          <button class="btn btn-oppo" ng-click="add_player()" ng-disabled="isAddPlayer">添加选手</button>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n<!--区域设置 修改框-->\r\n<script type="text/ng-template" id="edit_setting_dialog">\r\n  <div class="row mb10">\r\n    <label class="col-sm-4">半径</label>\r\n    <div class="col-sm-8">\r\n      <input type="text" class="form-control" placeholder="请输入半径" ng-model="settingEdit.radius">\r\n    </div>\r\n  </div>\r\n  <div class="row mb10">\r\n    <label class="col-sm-4">美化系数（乘）</label>\r\n    <div class="col-sm-8">\r\n      <input type="text" class="form-control" placeholder="请输入美化系数" ng-model="settingEdit.mul">\r\n    </div>\r\n  </div>\r\n  <div class="row mb10">\r\n    <label class="col-sm-4">美化系数（加）</label>\r\n    <div class="col-sm-8">\r\n      <input type="text" class="form-control" placeholder="请输入美化系数" ng-model="settingEdit.add">\r\n    </div>\r\n  </div>\r\n  <div class="row mb10">\r\n    <label class="col-sm-4">距离提醒（开关）</label>\r\n    <div class="col-sm-8">\r\n      <select class="form-control select-check" ng-model="settingEdit.switch">\r\n        <option value="on">开</option>\r\n        <option value="off">关</option>\r\n      </select>\r\n    </div>\r\n  </div>\r\n  <div class="row mb10">\r\n    <label class="col-sm-4">距离提醒（距离）</label>\r\n    <div class="col-sm-8">\r\n      <input type="text" class="form-control" placeholder="请输入距离" ng-model="settingEdit.distance">\r\n    </div>\r\n  </div>\r\n  <div class="row">\r\n    <button class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">关闭</button>\r\n    <button class="ngdialog-button ngdialog-button-primary" ng-click="update_setting()">保存</button>\r\n  </div>\r\n</script>\r\n<!--特殊建筑维护 修改框-->\r\n<script type="text/ng-template" id="edit_build_dialog">\r\n  <div class="row edit_build_dialog mb10">\r\n    <label class="col-sm-3">建筑图标</label>\r\n    <div class="col-sm-9">\r\n      <img src="" alt="" ng-src="{{buildEdit.avatar}}">\r\n      <div class="upload dialog-upload" type="file" ngf-select="edit_upload_build($file)" accept="image/*" ngf-max-height="100000"\r\n        ngf-max-size="10MB">上传图标</div>\r\n    </div>\r\n  </div>\r\n  <div class="row mb10">\r\n    <label class="col-sm-3">名称</label>\r\n    <div class="col-sm-9">\r\n      <input type="text" class="form-control" placeholder="请输入名称" ng-model="buildEdit.name">\r\n    </div>\r\n  </div>\r\n  <div class="row mb10">\r\n    <label class="col-sm-3">角色</label>\r\n    <div class="col-sm-9">\r\n      <select class="form-control" ng-options="role.name as role.name for role in roleList" ng-model="buildEdit.role"></select>\r\n    </div>\r\n  </div>\r\n  <div class="row mb10">\r\n    <label class="col-sm-3">电话</label>\r\n    <div class="col-sm-9">\r\n      <input type="text" class="form-control" placeholder="请输入电话" ng-model="buildEdit.tel">\r\n    </div>\r\n  </div>\r\n  <div class="row">\r\n    <button class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">关闭</button>\r\n    <button class="ngdialog-button ngdialog-button-primary" ng-click="update_build()">保存</button>\r\n  </div>\r\n</script>\r\n<!--选手维护 修改框-->\r\n<script type="text/ng-template" id="edit_player_dialog">\r\n  <div class="row edit_build_dialog mb10">\r\n    <label class="col-sm-3">选手头像</label>\r\n    <div class="col-sm-9">\r\n      <img src="" alt="" ng-src="{{playerEdit.avatar}}">\r\n      <div class="upload dialog-upload" type="file" ngf-select="edit_upload_player($file)" accept="image/*" ngf-max-height="100000"\r\n        ngf-max-size="10MB">上传头像</div>\r\n    </div>\r\n  </div>\r\n  <div class="row mb10">\r\n    <label class="col-sm-3">姓名</label>\r\n    <div class="col-sm-9">\r\n      <input type="text" class="form-control" placeholder="请输入姓名" ng-model="playerEdit.name">\r\n    </div>\r\n  </div>\r\n  <div class="row mb10">\r\n    <label class="col-sm-3">手机号</label>\r\n    <div class="col-sm-9">\r\n      <input type="text" class="form-control" placeholder="请输入手机号" ng-model="playerEdit.tel">\r\n    </div>\r\n  </div>\r\n  <div class="row mb10">\r\n    <label class="col-sm-3">角色</label>\r\n    <div class="col-sm-9">\r\n      <select class="form-control" ng-model="playerEdit.role">\r\n        <option value="逃亡者">逃亡者</option>\r\n        <option value="追击者">追击者</option>\r\n      </select>\r\n    </div>\r\n  </div>\r\n  <div class="row">\r\n    <button class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">关闭</button>\r\n    <button class="ngdialog-button ngdialog-button-primary" ng-click="update_player()">保存</button>\r\n  </div>\r\n</script>\r\n<!--地图 -->\r\n<script type="text/ng-template" id="map_dialog">\r\n  <div class="row tac mb10">\r\n    <div class="map" id="mapContainer"></div>\r\n  </div>\r\n  <div class="row">\r\n    <button class="ngdialog-button ngdialog-button-primary" ng-click="set_map_position_colse()">关闭</button>\r\n    <button class="ngdialog-button ngdialog-button-primary" ng-click="set_map_position()">保存</button>\r\n  </div>\r\n</script>'},function(a,t){"use strict";a.exports=["$scope","$state","Upload","notify","$resource","ngDialog",function(a,t,n,e,s,r){a.clickPosition=null,a.show_map_dialog=function(t){t&&t.coordinate?(a.editBuildData=t,a.edit_build_mode=!0):t&&t.center&&(a.editSettingData=t,a.edit_setting_mode=!0),r.open({template:"map_dialog",scope:a,className:"ngdialog-theme-default",showClose:!1,closeByDocument:!1})},a.$on("ngDialog.opened",function(t,n){var e=new AMap.Map("mapContainer");if(e.r){if(e.setZoom(10),a.edit_build_mode){var s=new AMap.LngLat(a.editBuildData.lng,a.editBuildData.lat);e.setCenter([a.editBuildData.lng,a.editBuildData.lat]),new AMap.Marker({position:s,map:e})}else if(a.edit_setting_mode){var s=new AMap.LngLat(a.editSettingData.center.lng,a.editSettingData.center.lat);e.setCenter([a.editSettingData.center.lng,a.editSettingData.center.lat]),new AMap.Marker({position:s,map:e})}else e.setCenter([120.619914,31.297599]);var r=function(t){e.clearMap(),new AMap.Marker({position:t.lnglat,map:e}),a.clickPositionLng=t.lnglat.lng,a.clickPositionLat=t.lnglat.lat};e.on("click",r)}}),a.set_map_position=function(){a.edit_build_mode?(a.editBuildData.lng=a.clickPositionLng,a.editBuildData.lat=a.clickPositionLat,a.edit_build_mode=!1):a.edit_setting_mode?s("/walker/setting/ ").save({},{centerLng:a.clickPositionLng+"",centerLat:a.clickPositionLat+""}).$promise.then(function(t){a.settings.center.lng=a.clickPositionLng,a.settings.center.lat=a.clickPositionLat,a.edit_setting_mode=!1,e({message:"修改成功",duration:1e4,classes:"alert-success"}),r.close()},function(a){e({message:"出错啦",duration:1e4,classes:"alert-danger"})}):(a.build.lng=a.clickPositionLng,a.build.lat=a.clickPositionLat),r.close()},a.set_map_position_colse=function(){a.edit_setting_mode=!1,a.edit_build_mode=!1,r.close()},a.query_setting=function(){s("/walker/setting/ ").get().$promise.then(function(t){a.settings=t},function(a){e({message:"出错啦",duration:1e4,classes:"alert-danger"})})},a.query_setting(),a.edit_setting=function(){var t=a.settings;a.settingEdit={radius:t.radius,mul:t.mul,add:t.add,"switch":t.distanceWarning.warningSwitch,distance:t.distanceWarning.distance},r.open({template:"edit_setting_dialog",scope:a,className:"ngdialog-theme-default edit_setting_dialog",showClose:!1,closeByDocument:!1})},a.update_setting=function(){var t=a.settingEdit;s("/walker/setting/ ").save({},{radius:parseInt(t.radius),add:parseInt(t.add),mul:parseInt(t.mul),warningSwitch:t["switch"],warningDistance:parseInt(t.distance)}).$promise.then(function(n){a.settings.radius=t.radius,a.settings.add=t.add,a.settings.mul=t.mul,a.settings.distanceWarning.warningSwitch=t["switch"],a.settings.distanceWarning.distance=t.distance,e({message:"修改成功",duration:1e4,classes:"alert-success"}),r.close()},function(a){e({message:"出错啦",duration:1e4,classes:"alert-danger"})})},a.roleList=[{name:" 基地"},{name:"监狱"},{name:"赌场"},{name:"安全屋"},{name:"角斗场"},{name:"移动商贩"},{name:"天眼"}],a.build={avatar:"",name:"",role:"",tel:"",lng:"",lat:""},a.isAddBuild=!1,a.query_build=function(){a.buildings=[{playerid:"1",avatar:"http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg",name:"赌场",role:"赌场",tel:"123123123",lng:"121.49393",lat:"31.192231"},{playerid:"2",avatar:"http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg",name:"监狱",role:"监狱",tel:"33333333",lng:"121.651858",lat:"31.044096"},{playerid:"3",avatar:"http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg",name:"角斗场",role:"角斗场",tel:"44444444444",lng:"120.621969",lat:"31.281598"}]},a.query_build(),a.upload_build=function(t){t&&n.upload({url:"/v1/img/upload",method:"POST",data:{image:t}}).then(function(t){var t=t.data;"success"===t.status?(a.build.avatar=t.url,e({message:"图标上传成功",duration:1e4,classes:"alert-success"})):e({message:"图标上传失败",duration:1e4,classes:"alert-danger"})},function(a){e({message:"图标上传失败",duration:1e4,classes:"alert-danger"})},function(a){})},a.valid_build=function(){return a.build.avatar?a.build.name?a.build.role?a.build.tel?a.build.lng&&a.build.lat?!0:(e({message:"请填写建筑坐标",duration:1e4,classes:"alert-danger"}),!1):(e({message:"请填写电话",duration:1e4,classes:"alert-danger"}),!1):(e({message:"请填写建筑角色",duration:1e4,classes:"alert-danger"}),!1):(e({message:"请填写建筑名称",duration:1e4,classes:"alert-danger"}),!1):(e({message:"请上传建筑图标",duration:1e4,classes:"alert-danger"}),!1)},a.add_build=function(){if(a.valid_build()){a.isAddBuild=!0;var t={};t.avatar=a.build.avatar,t.name=a.build.name,t.role=a.build.role,t.tel=a.build.tel,t.lng=a.build.lng,t.lat=a.build.lat,s("/walker/player/ ").save({},{data:t}).$promise.then(function(t){t.success?(e({message:"添加特殊建筑成功",duration:2e3,classes:"alert-success"}),r.close()):e({message:"添加特殊建筑失败："+t.data,duration:1e4,classes:"alert-danger"}),a.isAddBuild=!1,a.build={avatar:"",name:"",role:"",tel:"",lng:"",lat:""}})}},a.del_build=function(a){s("/walker/player/building").remove({},{id:a}).$promise.then(function(a){a.success?(e({message:"删除特殊建筑成功",duration:2e3,classes:"alert-success"}),r.close()):e({message:"删除特殊建筑失败："+a.data,duration:1e4,classes:"alert-danger"})})},a.buildEdit={},a.edit_build=function(t){a.editBuildData=t,a.buildEditId=t.playerid,a.buildEdit={avatar:t.avatar,name:t.name,role:t.role,tel:t.tel},r.open({template:"edit_build_dialog",scope:a,className:"ngdialog-theme-default edit_build_dialog",showClose:!0,closeByDocument:!1})},a.edit_upload_build=function(t){t&&n.upload({url:"/v1/img/upload",method:"POST",data:{image:t}}).then(function(t){var t=t.data;"success"===t.status?(a.buildEdit.avatar=t.url,e({message:"图标上传成功",duration:1e4,classes:"alert-success"})):e({message:"图标上传失败",duration:1e4,classes:"alert-danger"})},function(a){e({message:"图标上传失败",duration:1e4,classes:"alert-danger"})},function(a){})},a.update_build=function(){a.editBuildData.avatar=a.buildEdit.avatar,a.editBuildData.name=a.buildEdit.name,a.editBuildData.role=a.buildEdit.role,a.editBuildData.tel=a.buildEdit.tel,r.close(),s("/walker/player/building").save({id:a.buildEditId},{data:a.buildEdit}).$promise.then(function(a){e(a.success?{message:"修改成功",duration:1e4,classes:"alert-success"}:{message:"出错啦",duration:1e4,classes:"alert-danger"})},function(a){e({message:"出错啦",duration:1e4,classes:"alert-danger"})})},a.player={avatar:"",name:"",tel:"",role:""},a.isAddPlayer=!1,a.query_player=function(){a.players=[{playerid:"1",avatar:"http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg",name:"小明",tel:"123456789",role:"逃亡者"},{playerid:"2",avatar:"http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg",name:"旺财",tel:"546895248",role:"追击者"},{playerid:"3",avatar:"http://picset.tudou.com/2016-04-30/1461998878190-2089056432-diyup.jpg",name:"静静",tel:"7895468924",role:"追击者"}]},a.query_player(),a.upload_player=function(t){t&&n.upload({url:"/v1/img/upload",method:"POST",data:{image:t}}).then(function(t){var t=t.data;"success"===t.status?(a.player.avatar=t.url,e({message:"头像上传成功",duration:1e4,classes:"alert-success"})):e({message:"头像上传失败",duration:1e4,classes:"alert-danger"})},function(a){e({message:"头像上传失败",duration:1e4,classes:"alert-danger"})},function(a){})},a.valid_player=function(){return a.player.avatar?a.player.name?a.player.tel?a.player.role?!0:(e({message:"请填写选手角色",duration:1e4,classes:"alert-danger"}),!1):(e({message:"请填写选手手机号码",duration:1e4,
classes:"alert-danger"}),!1):(e({message:"请填写选手姓名",duration:1e4,classes:"alert-danger"}),!1):(e({message:"请上传选手头像",duration:1e4,classes:"alert-danger"}),!1)},a.add_player=function(){if(a.valid_player()){a.isAddPlayer=!0;var t={};t.avatar=a.player.avatar,t.name=a.player.name,t.tel=a.player.tel,t.role=a.player.role,s("/walker/player").save({},{data:t}).$promise.then(function(t){t.success?(e({message:"添加选手成功",duration:2e3,classes:"alert-success"}),r.close()):e({message:"添加选手失败："+t.data,duration:1e4,classes:"alert-danger"}),a.isAddPlayer=!1,a.player={avatar:"",name:"",sex:"",phone:"",role:""}})}},a.del_player=function(a){s("/walker/player").remove({},{id:a}).$promise.then(function(a){a.success?(e({message:"删除选手成功",duration:2e3,classes:"alert-success"}),r.close()):e({message:"删除选手失败："+a.data,duration:1e4,classes:"alert-danger"})})},a.playerEdit={},a.edit_player=function(t){a.playerEditId=t.playerid,a.playerEditData=t,a.playerEdit={avatar:t.avatar,name:t.name,tel:t.tel,role:t.role},r.open({template:"edit_player_dialog",scope:a,className:"ngdialog-theme-default edit_build_dialog",showClose:!0,closeByDocument:!1})},a.edit_upload_player=function(t){t&&n.upload({url:"/v1/img/upload",method:"POST",data:{image:t}}).then(function(t){var t=t.data;"success"===t.status?(a.playerEdit.avatar=t.url,e({message:"头像上传成功",duration:1e4,classes:"alert-success"})):e({message:"头像上传失败",duration:1e4,classes:"alert-danger"})},function(a){e({message:"头像上传失败",duration:1e4,classes:"alert-danger"})},function(a){})},a.update_player=function(){a.playerEditData.avatar=a.playerEdit.avatar,a.playerEditData.name=a.playerEdit.name,a.playerEditData.tel=a.playerEdit.tel,a.playerEditData.role=a.playerEdit.role,r.close()}}]},function(a,t){a.exports='  <div class="saw-setting">\r\n  <table class="table table-hover">\r\n    <thead>\r\n      <tr>\r\n        <th></th>\r\n        <th ng-repeat="data in players">{{data.name}}</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr ng-repeat="player in players">\r\n        <td>{{player.name}}</td>\r\n        <td ng-repeat=" data in datas[$index]">\r\n          <input type="checkbox" class="dpn chk" id="{{data.objectId}}-{{data.subjectId}}" ng-checked="data.checked" ng-model="data.checked" ng-click="edit($event, data)">\r\n          <label for="{{data.objectId}}-{{data.subjectId}}"></label>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n  </div>'},function(a,t){"use strict";a.exports=["$scope","$state","notify","$resource",function(a,t,n,e){a.getUserSet=function(){e("/walker/setting/visible/ ").get({}).$promise.then(function(t){a.players=t.players,a.settings=t.visibleSettings,a.setData()},function(a){n({message:"获取设置失败",duration:1e4,classes:"alert-danger"})})},a.setData=function(){var t=[];angular.forEach(a.players,function(n,e){angular.forEach(a.players,function(s,r){var l=!1,i=!1;angular.forEach(a.settings,function(a,t){l||a.objectId===n.playerid&&a.subjectId===s.playerid&&(i=!!a.visible,l=!0)}),t[e]||(t[e]=[]),t[e].push({name:n.name,subname:s.name,objectId:n.playerid,subjectId:s.playerid,checked:i})})}),a.datas=t},a.getUserSet(),a.edit=function(a,t){e("/walker/setting/visible/:objectId/:subjectId/:visible").get({objectId:t.objectId,subjectId:t.subjectId,visible:t.checked?1:0},{}).$promise.then(function(a){var e=t.name+(t.checked?"可以看见":"不可以看见")+t.subname;n({message:e,duration:1e4,classes:"alert-success"})},function(a){n({message:"状态修改失败，请稍后重试",duration:1e4,classes:"alert-danger"}),t.checked=!t.checked})}}]},function(a,t){"use strict";a.exports=function(){return function(a){var t="";return t=a.length<=3?a:a.substring(0,3)+"..."}}},function(a,t){"use strict";a.exports=function(){return function(a){var t=[];return angular.forEach(a,function(a,n,e){a.mixAmount!==a.usedAmount&&t.push(a)}),t}}}]);