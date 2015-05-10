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

      $scope.devices = [];
      $scope.devices.push("34");
      $scope.devices.push("51");
      $scope.devices.push("8");
      $scope.devices.push("7");


  });
