'use strict';

angular.module('calls').controller('SearchController', ['$scope', 'Search',
    function ($scope, search) {
        $scope.query = '';
        $scope.error = null;
        $scope.results = null;

        $scope.search = function(){
            if ($scope.query.length > 0){
                $scope.error = null;
                search($scope.query).success(function(searchResults){
                    $scope.results = searchResults.results;
                }).error(function(err){
                    $scope.error = err.responseText;
                });
            }
        };
    }]);