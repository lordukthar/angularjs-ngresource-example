'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', function ($scope, $location, $log, $http, alertService, SessionService) {



    $scope.isAuthenticated = function() {
        SessionService.isLoggedIn()
    };

    $scope.isAuthenticated();

    $scope.logout = function() {
        SessionService.logout();
    };

    $scope.login = function() {
        console.log("kdlfjslkfjlkds");

        var payload = {
            username : this.username,
            password : this.password,
            country : $scope.country
        };

        if (payload.username == null) {
            alertService.add('danger', 'I think you just forgot the username');
            $location.path('/login');
        } else if (payload.password == null) {
            alertService.add('danger', 'I think you just forgot the password');
            $location.path('/login');
        } else {
            $scope.book = SessionService.login(payload);
            console.log("BB " + $scope.book.title);
        }

    };
});
