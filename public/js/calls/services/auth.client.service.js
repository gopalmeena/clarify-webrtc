'use strict';

angular.module('calls').factory('Auth', ['$http', '$q',
  function ($http, $q) {
    return {
      get: function () {
        var deferred = $q.defer();
        $http.get('/authorize')
          .success(function (data) {
            deferred.resolve(data);
          }).error(function (data, status) {
            deferred.reject(status);
          });
        return deferred.promise;
      }
    };
  }
]);
