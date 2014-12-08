'use strict';

angular.module('brewtimerApp')
  .controller('MainCtrl', function ($scope, ngAudio) {

    $scope.alarm = ngAudio.load('sounds/alarm.mp3');
    $scope.alarm.loop = true;
    $scope.showAlert = false;

    $scope.brewAdditions = [
      {
          'ingredient': '',
          'mins': 60,
          'amount': 28.34,
          'unit': 'g'
      },
      {
          'ingredient': '',
          'mins': 10,
          'amount': 28.34,
          'unit': 'g'
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
          $scope.alarm.play();
          $scope.nextAddition = item;
          $scope.showAlert = true;
        }
      });
    });

    $scope.addBrewAddition = function() {
      $scope.brewAdditions.push({
          'ingredient': '',
          'mins': 0,
          'amount': 28.34,
          'unit': 'g'
      });
    };

    $scope.onAlertClick = function() {
      $scope.alarm.stop();
      $scope.showAlert = false;
    };

  });
