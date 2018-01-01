myApp.factory('BookService', function ($http, $location, $resource, cookieService, alertService, todoFactory) {

    var service = {};


    service.get = function (payload) {


        var config = {
            headers: {
                "X-Main-Client-Id": "Smart-Settings-GUI",
                "X-Requesting-User": "KJKLJKLJKL"
            }
        }

        console.log("Session service call logout fff 3"+ payload)

        return todoFactory.get('3');


        /*var promise = todoFactory.get().$promise.then(function(user) {
            console.log("Session service call logout VVVVVV"+user.title);
            //$scope.title = user.title;
            return user;
        });
        return promise;*/



       /* $http.get('http:localhost:10000/protected')
            .error(function () {
                console.log("error maintenance is not logged in reroute to login")
            })
            .success(function (data) {
                if (data.hasOwnProperty('success')) {
                    console.log("maintenance is not logged in reroute to login")
                }
            });

        //cookieService.clearCookieData()*/
        //$location.path('/main');

    };

    service.listBooks = function (payload) {


        var config = {
            headers: {
                "X-Main-Client-Id": "Smart-Settings-GUI",
                "X-Requesting-User": "KJKLJKLJKL"
            }
        }

        console.log("Session service call logout fff" + payload);

        return todoFactory.query();
    }


    // public interface
    return {
        get: function (payload) {
            service.get(payload);
        },
        query: function () {
            service.listBooks();
        }/*,
        delete: function (payload) {
            service.isLoggedIn();
        },
        put: function (payload) {
            service.isLoggedIn();
        },
        post: function (payload) {
            service.protectedResource(payload);
        }*/

    };

});
