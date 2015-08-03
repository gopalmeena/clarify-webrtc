'use strict';

angular.module('calls').controller('ShellController', ['$scope', 'Auth', 'Calls',
  function ($scope) {
    $scope.tab = '/';
    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $scope.tab = toState.url;
    });
  }]);