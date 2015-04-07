'use strict';

describe('Directive: polymer', function () {

  // load the directive's module and view
  beforeEach(module('connectedHouseApp'));
  beforeEach(module('app/polymer/polymer.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<polymer></polymer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the polymer directive');
  }));
});