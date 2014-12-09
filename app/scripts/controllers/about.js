'use strict';

/**
 * @ngdoc function
 * @name brewtimerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the brewtimerApp
 */
angular.module('brewtimerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
