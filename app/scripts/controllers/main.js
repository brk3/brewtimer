'use strict';

angular.module('brewtimerApp')
  .controller('MainCtrl', function ($scope) {

    $scope.brewAdditions = [
      {
          'ingredient': '',
          'mins': 60,
          'amount': 28.34,
      },
      {
          'ingredient': '',
          'mins': 10,
          'amount': 28.34,
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
      var curTime_s = args.millis / 1000;
      $scope.brewAdditions.forEach(function(item) {
        if (item.mins * 60 === curTime_s) {
          console.log('Time to add ' + item.ingredient);
        }
      });
    });

  }, ['timer']);
