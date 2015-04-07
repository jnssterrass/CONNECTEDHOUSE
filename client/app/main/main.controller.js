'use strict';

angular.module('connectedHouseApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.actionThing = function() {
      $http.post('/api/things', { name: "1423" });
    };

    $scope.setStyle = function() {
        $scope.subLeft = {'padding-left':'80px'};
    }

    $scope.nactionThing = function() {
      $http.delete('/api/things/' + "1423");
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
