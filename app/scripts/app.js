'use strict';

angular
  .module('brewtimerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'timer'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
