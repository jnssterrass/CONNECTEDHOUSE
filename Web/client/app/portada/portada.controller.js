'use strict';

var app = angular.module('connectedHouseApp',  []);

/*
app.factory('Devices_info', function ($resource) {
   var Devices_info = $resource('https://api.mongolab.com/api/1/databases/ch-repo/collections/devices:id',
   {
     apiKey:'2UkXrp3c_Kk9rJgB3PBfNL1zH2lg_xSd',
     id:'@_id.$oid'
   });
   return Devices_info;
});
*/

app.controller('PortadaCtrl', function ($scope, $http) {
      $scope.action = "test";
      $http.get('http://localhost:9000/findAlldevices').
        success(function(data, status, headers, config) {
          $scope.devices = data;
      }).error(function(data, status, headers, config) {
          alert('Error!');
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
