'use strict';

angular.module('calls').controller('ContactsController', ['$scope', 'Contacts', 'Socket', 'Auth', '$location',
  function($scope, Contacts, Socket, Auth, $location){
    var user;
    $scope.online = {};

    Socket.emit('contacts.online');

    $scope.find = function() {
      $scope.contacts = Contacts.query();
    };

    $scope.isOnline = function(id) {
      return id in $scope.online;
    };

    Auth.get().then(function(u){
      user = u;
    });

    $scope.call = function(id) {
      console.log('OUT', user._id);
      $location.path('/call/' + user._id + '/' + id + '/outgoing');
    };

    $scope.me = function(id) {
      return user && (id === user.id);
    };

    Socket.on('user.authorize', function(){
      Socket.emit('user.authorize.response', user);
    });

    Socket.on('call', function(from){
      console.log('IN', from);
      $location.path('/call/' + from._id + '/' + user._id + '/incoming');
    });

    Socket.on('contacts.online', function(contacts){
      $scope.online = contacts;
    });
}]);