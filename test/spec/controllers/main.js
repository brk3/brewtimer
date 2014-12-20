'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('brewtimerApp'));
  beforeEach(module('ngAudio'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  describe('$scope.onTimerButtonClick', function() {
    beforeEach(function() {
      spyOn(scope, '$broadcast');
      spyOn(scope, 'resetTimer');
    });

    describe('when clicked with text "Pause"', function() {
      beforeEach(function() {
        scope.timerButtonText = 'Pause';
        scope.onTimerButtonClick();
      });

      it('broadcasts a timer-stop event', function() {
        expect(scope.$broadcast).toHaveBeenCalledWith('timer-stop');
      });

      it('sets the timer button text to "Start"', function() {
        expect(scope.timerButtonText).toEqual('Start');
      });
    });

    describe('when clicked with text "Start"', function() {
      beforeEach(function() {
        scope.timerButtonText = 'Start';
        scope.onTimerButtonClick();
      });

      it('broadcasts a timer-start event', function() {
        expect(scope.$broadcast).toHaveBeenCalledWith('timer-start');
      });

      it('sets the timer button text to "Pause"', function() {
        expect(scope.timerButtonText).toEqual('Pause');
      });
    });

    describe('when clicked with text "Stop"', function() {
      beforeEach(function() {
        scope.timerButtonText = 'Stop';
        scope.onTimerButtonClick();
      });

      //it('stops the alarm', function() {
        //expect(scope.alarm.stop).toHaveBeenCalled();
      //});

      it('removes the timer alert', function() {
        expect(scope.showAlert).toBe(false);
      });

      it('sets the timer button text to "Start"', function() {
        expect(scope.timerButtonText).toEqual('Start');
      });

      it('calls resets the timer', function() {
        expect(scope.resetTimer).toHaveBeenCalled();
      });

      it('resets each of the brewAdditions added status to false', function() {
        scope.brewAdditions.forEach(function(item) {
          expect(item.added).toBe(false);
        });
      });
    });

  });
});
