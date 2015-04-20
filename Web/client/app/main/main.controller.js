'use strict';

angular.module('connectedHouseApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.gadgets = [];
    $scope.cards = [];

    /*
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });
    */
    $scope.add_card = function(gadget_id) {
      var card = [];
      if(gadget_id === "111") {
        card.push("Door");
        card.push(gadget_id);
        card.push("action1");
        card.push("action2");
      }
      else {
        card.push("Window");
        card.push(gadget_id);
        card.push("action1");
        card.push("action2");
      }
      $scope.cards.push(card);
    };


    $scope.add_gadget = function() {
      $http.post('/api/repo/', { name: $scope.gadget_id });
      $scope.gadgets.push($scope.gadget_id);
      $scope.add_card($scope.gadget_id);
      $scope.gadget_id=" ";

    };

    $scope.change_status = function() {
      $http.post('/api/things', { name: $scope.newThing });
    };


  });
