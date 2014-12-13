'use strict';

/**
 * @ngdoc function
 * @name brewtimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the brewtimerApp
 */
angular.module('brewtimerApp')
    .controller('MainCtrl', function ($scope, ngAudio) {

  $scope.alarm = ngAudio.load('sounds/alarm.mp3');
  $scope.alarm.loop = true;

  $scope.showAlert = false;

  $scope.timerButtonText = 'Start';

  $scope.brewAdditions = [
    {
      'ingredient': '',
      'mins': 60,
      'amount': 14,
      'unit': 'g'
    },
    {
      'ingredient': '',
      'mins': 10,
      'amount': 28,
      'unit': 'g'
    },
    {
      'ingredient': '',
      'mins': 0,
      'amount': 28,
      'unit': 'g'
    }
  ];

  $scope.onTimerButtonClick = function () {
    if ($scope.timerButtonText === 'Pause') {
      $scope.$broadcast('timer-stop');
      $scope.timerButtonText = 'Start';
    } else if ($scope.timerButtonText === 'Start') {
      $scope.$broadcast('timer-start');
      $scope.timerButtonText = 'Pause';
    } else if ($scope.timerButtonText === 'Stop') {
      $scope.alarm.stop();
      $scope.showAlert = false;
      $scope.timerButtonText = 'Start';
      // NOTE(bourke): hacky way to reset timer
      $scope.$broadcast('timer-stop');
      $scope.$broadcast('timer-start');
      $scope.$broadcast('timer-stop');
    }
  };

  $scope.$on('timer-tick', function (event, args) {
    var curTimeSeconds = args.millis / 1000;
    $scope.brewAdditions.forEach(function(item) {
      if (item.mins * 60 === curTimeSeconds) {
        $scope.alarm.play();
        $scope.nextAddition = item;
        $scope.showAlert = true;
      }
      if (curTimeSeconds === 0) {
        $scope.timerButtonText = 'Stop';
      }
    });
  });

  $scope.onAlertClick = function() {
    $scope.alarm.stop();
    $scope.showAlert = false;
  };

  $scope.addBrewAddition = function() {
    $scope.brewAdditions.push({
        'ingredient': '',
        'mins': 0,
        'amount': 28.34,
        'unit': 'g'
    });
  };

  $scope.removeBrewAddition = function() {
    $scope.brewAdditions.pop();
  };
});
