'use strict';

angular.module('brewtimerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.ingredientEntries = [
      {
          'time': 'time1',
          'defaultTime': '60',
          'ingredient': 'ingredient1',
      },
      {
          'time': 'time2',
          'defaultTime': '10',
          'ingredient': 'ingredient2',
      },
      {
          'time': 'time3',
          'defaultTime': '0',
          'ingredient': 'ingredient3',
      }
    ];
  });
