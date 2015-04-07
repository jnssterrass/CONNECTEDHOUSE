'use strict';

angular.module('connectedHouseApp')
  .directive('polymer', function () {
    return {
      templateUrl: 'app/polymer/polymer.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });