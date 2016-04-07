'use strict';

describe('Component: PathsComponent', function () {

  // load the controller's module
  beforeEach(module('pathFinderApp'));

  var PathsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PathsComponent = $componentController('PathsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
