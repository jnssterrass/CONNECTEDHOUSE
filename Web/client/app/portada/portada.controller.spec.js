'use strict';

describe('Controller: PortadaCtrl', function () {

  // load the controller's module
  beforeEach(module('connectedHouseApp'));

  var PortadaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PortadaCtrl = $controller('PortadaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
