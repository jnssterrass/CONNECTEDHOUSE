'use strict';

angular.module('connectedHouseApp', [])
  /*.factory('Devices_info', function ($resource) {
    var Devices_info = $resource('https://api.mongolab.com/api/1/databases/ch-repo/collections/devices:id',
    {
      apiKey:'2UkXrp3c_Kk9rJgB3PBfNL1zH2lg_xSd',
      id:'@_id.$oid'
    });
    return Devices_info;
});*/

  .controller('PortadaCtrl', function ($scope, $http /*,Devices_info*/)  {
    /*  $scope.Devices_info = Devices_info.query();*/
      $scope.devices = [];
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

});
