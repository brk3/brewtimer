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

  $scope.appVersion = 0.1;

  $scope.timerStyle = {'color':'black'}

  $scope.alarm = ngAudio.load('sounds/alarm.mp3');
  $scope.alarm.loop = true;

  $scope.showAlert = false;

  $scope.timerButtonText = 'Start';

  $scope.brewAdditions = [
    {
      'ingredient': '',
      'mins': 60,
      'amount': 14,
      'unit': 'g',
      'added': false
    },
    {
      'ingredient': '',
      'mins': 10,
      'amount': 28,
      'unit': 'g',
      'added': false,
    },
    {
      'ingredient': '',
      'mins': 0,
      'amount': 28,
      'unit': 'g',
      'added': false,
    }
  ];

  // Instantiate the bloodhound suggestion engine
  var sampleAdditions = new Bloodhound({
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.addition); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: allAdditions });

  sampleAdditions.initialize();

  // Typeahead options object
  $scope.ingredientInputOptions = {
    highlight: true
  };

  $scope.ingredientInputData = {
    displayKey: 'addition',
    source: sampleAdditions.ttAdapter()
  };

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
      $scope.resetTimer();
      $scope.brewAdditions.forEach(function(item) {
        item.added = false;
      });
    }
  };

  $scope.resetTimer = function() {
    // NOTE(bourke): hacky way to reset timer
    $scope.$broadcast('timer-stop');
    $scope.$broadcast('timer-start');
    $scope.$broadcast('timer-stop');

    $scope.timerStyle = {'color':'black'}
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
        $scope.timerStyle = {'color':'red'}
        $scope.alarm.play();
      }
    });
  });

  $scope.onAlertClick = function() {
    $scope.alarm.stop();
    $scope.showAlert = false;
    $scope.nextAddition.added = true;
  };

  $scope.addBrewAddition = function() {
    $scope.brewAdditions.push({
        'ingredient': '',
        'mins': 0,
        'amount': 28,
        'unit': 'g'
    });
  };

  $scope.removeBrewAddition = function() {
    $scope.brewAdditions.pop();
  };
});
