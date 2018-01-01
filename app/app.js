'use strict';



// Declare app level module which depends on views, and components
var myApp =  angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.login',
  'myApp.book',
  'myApp.version',
  'ngResource'
]);


myApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider/*.when('/login', {
      templateUrl: 'login/login.html',
      controller: 'LoginCtrl'
  }).when('/book', {
      templateUrl: 'book/book.html',
      controller: 'BookCtrl'
  })*/.otherwise({redirectTo: '/login'});
}]);


