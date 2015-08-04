'use strict';

angular.module('calls').controller('SearchController', ['$scope', 'Search',
  function ($scope, search) {
    init();

    $scope.search = function () {
      if ($scope.searchString.length > 0) {
        $scope.error = null;
        $scope.searching = true;
        search($scope.searchString).success(function (searchResults) {
          $scope.results = searchResults.results;
          $scope.searching = false;
        }).error(function (err) {
          $scope.error = err.responseText;
        });
      }
    };

    $scope.$on('$tabClick', function(e, url){
      if (url=='/search'){
        init();
      }
    });

    function init(){
      $scope.searchString = '';
      $scope.error = null;
      $scope.results = null;
      $scope.searching = false;
    }
  }]);