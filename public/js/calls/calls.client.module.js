'use strict';

var app = angular.module('calls', ['ngResource', 'ui.router', 'btford.socket-io'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('listContacts', {
            url: '/',
            templateUrl: '/views/contacts.client.view.html'
        }).state('call', {
            url: '/call/:from/:to/:direction/:call',
            templateUrl: '/views/call.client.view.html'
        }).state('history', {
            url: '/history',
            templateUrl: '/views/history.client.view.html'
        }).state('search', {
            url: '/search',
            templateUrl: '/views/search.client.view.html'
        });
    }]);
