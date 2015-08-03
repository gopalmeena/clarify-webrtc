'use strict';

angular.module('calls').controller('ContactsController', ['$scope', 'Contacts', 'Socket', 'Auth', '$location',
  function ($scope, Contacts, Socket, Auth, $location) {
    var user;
    $scope.online = {};

    Socket.emit('contacts.online');

    $scope.find = function () {
      $scope.contacts = Contacts.query();
    };

    $scope.isOnline = function (id) {
      return id in $scope.online;
    };

    Auth.get().then(function (u) {
      user = u;
    });

    $scope.call = function (id) {
      Contacts.get({id: id}, function (contact) {
        $scope.contact = contact;

        Contacts.call({id: id}, function (call) {
          $location.path('/call/' + user._id + '/' + id + '/outgoing/' + call._id);
        });
      });
    };

    $scope.me = function (id) {
      return user && (id === user.id);
    };

    Socket.on('user.authorize', function () {
      Socket.emit('user.authorize.response', user);
    });

    Socket.on('call', function (message) {
      $location.path('/call/' + message.from + '/' + user._id + '/incoming/' + message.call);
    });

    Socket.on('contacts.online', function (contacts) {
      $scope.online = contacts;
    });
  }]);