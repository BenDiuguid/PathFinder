'use strict';

angular.module('pathFinderApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/beacons', {
        template: '<beacons></beacons>'
      });
  });
