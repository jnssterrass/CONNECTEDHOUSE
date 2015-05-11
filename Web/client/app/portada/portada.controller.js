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
      $scope.action = "test";
      $http.get('http://localhost:9000/findAlldevices').
        success(function(data, status, headers, config) {
          $scope.devices = data;
      }).error(function(data, status, headers, config) {
          alert('Error!');
      });

      Devices.all().then(function(devices){
        $scope.devices_info = devices;
      });

      Actions.all().then(function(devices){
        $scope.actions_info = actions;
      });


      $scope.newtask = function(deviceid,action){
        $http.post('http://localhost:9000/newtask',
            {device_id: deviceid,action   : action}
        ).success(function(data, status, headers, config) {
          alert('SomethingGoodHappens!');
        }).error(function(data, status, headers, config) {
          alert('Error!');
        });
        alert(deviceid);
      }
});
