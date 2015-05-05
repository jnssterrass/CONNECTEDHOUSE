'use strict';

angular.module('connectedHouseApp', [])
  .controller('PortadaCtrl', function ($scope, $http, socket)  {
    $scope.message = 'Hello';
    $scope.hola = 'angular funciona';
  });
