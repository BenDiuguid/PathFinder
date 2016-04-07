'use strict';

describe('Component: BeaconsComponent', function () {

  // load the controller's module
  beforeEach(module('pathFinderApp'));

  var BeaconsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    BeaconsComponent = $componentController('BeaconsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
