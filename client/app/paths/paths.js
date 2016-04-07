'use strict';

angular.module('pathFinderApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/paths', {
        template: '<paths></paths>'
      });
  });
