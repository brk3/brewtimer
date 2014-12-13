'use strict';

/**
 * @ngdoc overview
 * @name brewtimerApp
 * @description
 * # brewtimerApp
 *
 * Main module of the application.
 */
angular
  .module('brewtimerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngAudio',
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
