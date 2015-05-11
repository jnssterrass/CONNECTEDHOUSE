'use strict';

var app = angular.module('connectedHouseApp',  ['mongolabResourceHttp']);

app.constant('MONGOLAB_CONFIG',{API_KEY:'2UkXrp3c_Kk9rJgB3PBfNL1zH2lg_xSd', DB_NAME:'ch-repo'});

app.factory('Devices', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('devices');
});

app.factory('Actions', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('actions');
});

app.factory('Status', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('status');
});

app.controller('PortadaCtrl', function ($scope, $http, Devices, Actions, Status) {

      $http.get('http://localhost:9000/findAlldevices').
        success(function(data, status, headers, config) {
          $scope.devices = data;
      }).error(function(data, status, headers, config) {
          alert('Error!');
      });

      Devices.all().then(function(devices){
        $scope.devices_info = devices;
      });

      Actions.all().then(function(actions){
        $scope.actions_info = actions;
      });

      Status.all().then(function(status){
        $scope.status_info = status;
      });

      $scope.newtask = function(deviceid,action){
        $http.post('http://localhost:9000/newtask',
            {device_id: deviceid,action : action}
        ).success(function(data, status, headers, config) {

        }).error(function(data, status, headers, config) {
        });
      }


      $scope.newname = function(deviceid,devicename){
        var path = 'http://localhost:9000/changename' + deviceid;
        alert(path);
        $http.post(path,
            {name: devicename}
        ).success(function(data, status, headers, config) {

        }).error(function(data, status, headers, config) {
        });
      }

});
