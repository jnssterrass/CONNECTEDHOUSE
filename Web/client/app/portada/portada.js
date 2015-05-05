'use strict';

angular.module('connectedHouseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('portada', {
        url: '/portada',
        templateUrl: 'app/portada/portada.html',
        controller: 'PortadaCtrl'
      });
  });