'use strict';

angular.module('calls').factory('Contacts', ['$resource',
  function($resource) {
    return $resource('contacts/:id', {
      id: '@_id'
    }, {
      call: {
        method: 'GET',
        url: '/contacts/:id/call'
      }
    });
  }
]);
