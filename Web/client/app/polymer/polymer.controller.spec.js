'use strict';

describe('Controller: PolymerCtrl', function () {

  // load the controller's module
  beforeEach(module('connectedHouseApp'));

  var PolymerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PolymerCtrl = $controller('PolymerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
