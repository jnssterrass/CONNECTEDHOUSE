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

      $scope.toggle = true;

      $http.get('http://localhost:9000/findAlldevices').
        success(function(data, status, headers, config) {
          $scope.devices = data;
      }).error(function(data, status, headers, config) {
          alert('Error!');
      });

      $http.get('http://localhost:9000/findAllUsers').
        success(function(data, status, headers, config) {
          $scope.users = data;
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


      $scope.newname = function(deviceid,devicename,device_id,address,status){

        var path = 'http://localhost:9000/changestatus' + deviceid;
        $http.put(path,
           { name: devicename,
             device_id : device_id,
             address: address,
             status:status
            }
        ).success(function(data, status, headers, config) {

        }).error(function(data, status, headers, config) {
          alert('Error!');
        });
      }
});
