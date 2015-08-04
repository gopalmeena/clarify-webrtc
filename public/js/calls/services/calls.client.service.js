'use strict';

angular.module('calls').service('Calls', ['$http',
  function ($http) {

    function history() {
      return $http.get('/calls/history');
    }

    function remove(id){
      return $http.delete('/calls/' + id);
    }

    return {
      history: history,
      remove: remove
    };
  }
]);
