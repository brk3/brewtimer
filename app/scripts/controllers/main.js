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

    $scope.timerRunning = false;

    $scope.onTimerButtonClick = function () {
      if ($scope.timerRunning) {
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
      } else {
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
      }
    };

    $scope.$on('timer-tick', function (event, args) {
      console.log(' - event.name = '
        + event.name
        + ', timeoutId = '
        + args.timeoutId
        + ', millis = '
        + args.millis / 1000
        +'\n'
        );
    });
  }, ['timer']);
