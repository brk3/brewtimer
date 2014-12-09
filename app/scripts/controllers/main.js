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

    //$scope.onResetButtonClick = function() {
        //$scope.$broadcast('timer-clear');
        //$scope.timerRunning = false;
    //};

    $scope.$on('timer-tick', function (event, args) {
      var curTimeSeconds = args.millis / 1000;
      $scope.brewAdditions.forEach(function(item) {
        if (item.mins * 60 === curTimeSeconds) {
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

    $scope.removeBrewAddition = function() {
      $scope.brewAdditions.pop();
    };

    $scope.onAlertClick = function() {
      $scope.alarm.stop();
      $scope.showAlert = false;
    };
  });
