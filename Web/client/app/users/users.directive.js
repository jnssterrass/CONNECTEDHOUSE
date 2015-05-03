'use strict';

angular.module('connectedHouseApp')
  .directive('users', function () {
    return {
      templateUrl: 'app/users/users.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });