'use strict';


angular.module('connectedHouseApp', [])
  .controller('PortadaCtrl', function ($scope)  {

    $scope.devices = [];

    //Populate devices
    $scope.devices.push("34");
    $scope.devices.push("51");
    $scope.devices.push("8");
    $scope.devices.push("7");

    



  });
