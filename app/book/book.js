'use strict';

angular.module('myApp.book', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add', {
      templateUrl: 'book/add_book.html',
      controller: 'BookAddCtrl'
  }).when('/edit', {
      templateUrl: 'book/edit_book.html',
      controller: 'BookEditCtrl'
  }).when('/book', {
    templateUrl: 'book/book.html',
    controller: 'BookCtrl'
  });
}])

.controller('BookAddCtrl', function ($scope, $location, $log, $http, $resource) {

    $scope.Book =  $resource('http://localhost:10000/plain/:id', { id:'@id'},
        {'get':    {method:'GET'},
            'save':   {method:'POST'},
            'edit':   {method:'PUT'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}});

    $scope.addBook = function() {
        // call static get() method of Friend class

        var payload = {
            title : $scope.title,
            published : $scope.published
        };

        console.log(payload);

        $scope.Book.save(payload, function() {
            console.log("add");
           // $scope.IsVisible = false;
           // $scope.listBooks();
            $location.path("/book");
        }, function(err) {
            console.log("Add error : "+err);
        });
    };

})


.controller('BookEditCtrl', function ($scope, $location, $log, $http, $resource) {

    $scope.Book =  $resource('http://localhost:10000/plain/:id', { id:'@id'},
        {'get':    {method:'GET'},
            'save':   {method:'POST'},
            'edit':   {method:'PUT'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}});

    $scope.editBook = function() {
        // call static get() method of Friend class

        console.log($scope.title);
        console.log($scope.published);

        var payload = {
            title : $scope.title,
            published : $scope.published
        };

        console.log(payload);

       /* $scope.Book.edit(({ 'id': $scope.bookId }, payload), function() {
            $location.path("/book");
        }, function(err) {
            console.log("Book.get() error : "+err);
        });*/


        $resource('http://localhost:10000/plain/:id', { id:$scope.bookId},
            {
                "update": {
                    method: 'PUT'
                }
            }
        ).update(
            {},
            payload,
            function () {
                $location.path("/book");
            },
            function (err) {
                console.log("Add error : "+err);
            }
    );


       // $location.path("/book");

       /* $scope.Book.edit(payload, function() {
            console.log("add");
            // $scope.IsVisible = false;
            // $scope.listBooks();
            $location.path("/book");
        }, function(err) {
            console.log("Add error : "+err);
        });*/
    };

    $scope.getBook = function(id) {

        $scope.bookId = id;

        $scope.Book.get({'id': id}, function(data) {
            $scope.book = data;
        }, function(err) {
            console.log("Book.get() error : "+err);
        });
    };

    $scope.getBook(1);

})

.controller('BookCtrl', function ($scope, $location, $log, $http, $resource) {


    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = !$scope.IsVisible;
    };


    $scope.Book =  $resource('http://localhost:10000/plain/:id', { id:'@id'},
            {'get':    {method:'GET'},
            'save':   {method:'POST'},
            'edit':   {method:'PUT'},
            'query':  {method:'GET', isArray:true},
            'remove': {method:'DELETE'},
            'delete': {method:'DELETE'}});



    console.log("Book Controller");

//Notes.update({ id:$id }, note);

   /* $scope.editBook = function(book) {
        // call static get() method of Friend class
        $scope.Book.edit({'id': id}, function(data) {
            //$scope.setSelectedBook(data);
            $location.path("/edit");
        }, function(err) {
            console.log("Friend.get() error : "+err);
        });
    };*/




    $scope.listBooks = function() {
        // call static query() method of Friend class
        console.log("listBooks");

        $scope.Book.query(function (data) {
            $scope.books = data;
        }, function(err) {
            console.log("Book.query() error : "+err);
        });
        $location.path("/book");
    };

    $scope.listBooks();

    $scope.deleteBook = function(id) {
        // call static remove() method of Friend class
        $scope.Book.remove({'id': id}, function() {
            $scope.listBooks();
        }, function(err) {
            console.log("Book.remove() error : "+err);
        });
    };



    $scope.getBook = function(id) {

        $scope.Book.get({'id': id}, function(data) {
            $scope.book = data;
        }, function(err) {
            console.log("Book.query() error : "+err);
        });



        /* var promise = todoFactory.get().$promise.then(function(user) {
             console.log("Session service call logout VVVVVV"+user.title);
             //$scope.title = user.title;
             return user;
         });
         return promise;



         // call static remove() method of Friend class
         $scope.Friend.remove({'id': id}, function(data) {
             $scope.setSelectedFriend(null);
             $scope.listFriends();
         }, function(err) {
             console.log("Friend.remove() error : "+err);
         });*/
    };



   /* $scope.isAuthenticated = function() {
        SessionService.isLoggedIn()
    };

    $scope.isAuthenticated();

    $scope.logout = function() {
        SessionService.logout();
    };

    $scope.login = function() {
        console.log("Book");

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
            $scope.book = SessionService.protectedResource(payload);
            console.log("BB " + $scope.book.title);
        }

    };*/
});
