'use strict';

angular.module('pathFinderApp.auth', [
  'pathFinderApp.constants',
  'pathFinderApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
