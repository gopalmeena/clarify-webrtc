'use strict';

angular.module('calls').controller('HistoryController', ['$scope', 'Auth', 'Calls', 'Socket',
  function ($scope, Auth, Calls, Socket) {
    var user;

    $scope.calls = [];

    Auth.get().then(function (u) {
      user = u;
    });

    Calls.history().success(function (result) {
      var calls = _.filter(result.calls, function(call) {
        return call.records.length > 0;
      });

      calls.forEach(prepareCall);
      $scope.calls = calls;
    });

    Socket.on('call.accepted', function(call){
      updateCallById(prepareCall(call));
    });

    Socket.on('call.indexed', function(call){
      updateCallById(prepareCall(call));
    });

    $scope.duration = function(call) {
      var maxDuration = 0;
      for (var i in call.records) {
        var record = call.records[i];
        if (record.clarify === undefined) return -1;
        if (record.clarify.duration === undefined) return -1;
        if (record.clarify.duration > maxDuration) {
          maxDuration = record.clarify.duration;
        }
      }
      return maxDuration;
    };

    $scope.cost = function(call) {
      var cost = 0;
      for (var i in call.records) {
        var record = call.records[i];
        if (record.clarify === undefined) return -1;
        if (record.clarify.processing_cost === undefined) return -1;

        cost += record.clarify.processing_cost;
      }
      return cost;
    };

    $scope.remove = function(call){
      Calls.remove(call._id).success(function(removed){
        if (removed) {
          var c = _.first(_.where($scope.calls, {id: removed._id}));
          if (c) {
            var index = $scope.calls.indexOf(c);
            $scope.calls.splice(index, 1);
          }
        }
      });
    };

    function prepareCall(call){
      call.date = moment(call.date);
      return call;
    }

    function updateCallById(call){
      var c = _.first(_.where($scope.calls, {id: call.id}));
      if (c){
        var index = $scope.calls.indexOf(c);
        $scope.calls[index] = call;
      }
    }
  }
]);