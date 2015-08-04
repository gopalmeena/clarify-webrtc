'use strict';

(function () {

  angular.module('calls').directive('loading', loading);

  function loading(){
    return {
      restrict: 'A',
      scope:{
        loading: '=loading'
      },
      link: function (scope, element, attrs) {
        var text = $(element).text(),
            loadingText = attrs.loadingText || 'Loading...';

        scope.$watch('loading', function(val){
          if (val){
            $(element).text(loadingText);
          } else {
            $(element).text(text);
          }
        });
      }
    };
  }

})();