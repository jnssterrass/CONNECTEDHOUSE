'use strict';


angular.module('connectedHouseApp', [])
  .controller('PortadaCtrl', function ($scope)  {

    $scope.devices = [];
    //Populate devices -> aqui en vez de llenar el array con datos
    //locales hay que leer de la BD y todos los ID's que hay en el
    //sistema y guardarlos en devices
    $scope.devices.push("34");
    $scope.devices.push("51");
    $scope.devices.push("8");
    $scope.devices.push("7");



    $scope.device_info = function(device) {
      if(device =="34") {
        $info.name = "Lavadora";
      }else {
        $info.name = "Horno";
      }

    };


  /*  $scope.$watch("deviceid",function(newValue, oldValue)) {
        if(newValue, oldValue) {
          return;
        }
        $scope.name="Lavadora";
    });
*/


  });
