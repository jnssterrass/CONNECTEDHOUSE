'use strict';


angular.module('resource', ['ngResource'])
  .factory('devices', function ($resource) {
    var devices = $resource('  https://api.mongolab.com/api/1/databases/ch-repo/collections/devices:id',
    {
      apiKey:'2UkXrp3c_Kk9rJgB3PBfNL1zH2lg_xSd',
      id:'@_id.$oid'
    });
    return devices;
});


angular.module('resource1', ['ngResource'])
  .factory('devices', function ($resource) {
    var devices = $resource('https://api.mongolab.com/api/1/databases/ch-repo/collections/status:id',
    {
      apiKey:'2UkXrp3c_Kk9rJgB3PBfNL1zH2lg_xSd',
      id:'@_id.$oid'
    });
    return status;
});

angular.module('connectedHouseApp', [])
  .controller('PortadaCtrl', function ($scope, $http)  {

    $scope.devices = [];
    //Populate devices -> aqui en vez de llenar el array con datos
    //locales hay que leer de la BD y todos los ID's que hay en el
    //sistema y guardarlos en devices
    $scope.devices.push("34");
    $scope.devices.push("51");
    $scope.devices.push("8");
    $scope.devices.push("7");







    /*
    $http.post('/api/repo/', { name: ALBERT });
    */


    /*
    https://api.mongolab.com/api/1/databases/ch-repo/
        collections/devices?apiKey=2UkXrp3c_Kk9rJgB3PBfNL1zH2lg_xSd
    */





    $scope.device_info = function(device) {
      if(device =="34") {
        $info.name = "Lavadora";
      }else {
        $info.name = "Horno";
      }

    };

  });
