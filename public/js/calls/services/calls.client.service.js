'use strict';

angular.module('calls').service('Calls', ['$http',
  function ($http) {

    function history() {
      return $http.get('/calls/history');
    }

    return {
      history: history
    };
  }
]);
