'use strict';

angular.module('calls').controller('SearchController', ['$scope', 'Search',
  function ($scope, search) {
    init();

    $scope.search = function () {
      if ($scope.searchString.length > 0) {
        $scope.error = null;
        $scope.searching = true;
        search($scope.searchString).success(function (searchResults) {
          var data = prepareItems(searchResults.results),
              results = [];

          _.each(_.groupBy(data, 'call'), function(group, index){
            var item = group[0];
            results.push({
              call: index,
              name: item.name,
              date: item.date,
              records: group
            });
          });

          $scope.results = results;
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

    function prepareItems(items){
      return _.map(items, function(item){
        item.date = moment(item.date);
        return item;
      });
    }

    function init(){
      $scope.searchString = '';
      $scope.error = null;
      $scope.results = null;
      $scope.searching = false;
    }
  }]);