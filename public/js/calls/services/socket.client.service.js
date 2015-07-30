'use strict';

/* globals io */

angular.module('calls').factory('Socket', ['socketFactory',
  function (socketFactory) {
    return socketFactory({
      prefix: '',
      ioSocket: io.connect()
    });
  }
]);
