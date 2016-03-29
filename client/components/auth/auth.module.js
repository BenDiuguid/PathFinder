'use strict';

angular.module('pathFinderApp.auth', [
  'pathFinderApp.constants',
  'pathFinderApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
