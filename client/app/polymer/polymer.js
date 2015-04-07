'use strict';

angular.module('connectedHouseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('polymer', {
        url: '/polymer',
        templateUrl: 'app/polymer/polymer.html',
        controller: 'PolymerCtrl'
      });
  });