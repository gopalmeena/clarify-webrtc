'use strict';

angular.module('calls').service('Search', ['$http',
  function ($http) {
    return function (query) {
      return $http.post('/records/search', {
        query: query
      });
    };
  }
]);
