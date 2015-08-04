'use strict';

angular.module('calls').controller('ShellController', ['$scope', '$rootScope',
  function ($scope, $rootScope) {
    $scope.tab = '/';
    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $scope.tab = toState.url;
    });

    $scope.tabClick = function(url){
      $rootScope.$broadcast('$tabClick', url);
    }
  }]);