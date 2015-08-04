'use strict';

(function () {

  angular.module('calls').directive('focus', focus);

  focus.$inject = ['$timeout'];

  function focus($timeout){
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        $timeout(function(){
          element[0].focus();
        }, 0);
      }
    };
  }

})();