myApp.factory('SessionService', function ($http, $location, $resource, cookieService, alertService) {

    var session_service = {};

    session_service.login = function (payload) {
        console.log("Session service call login");

        var config = {
            headers: {
                "X-Main-Client-Id": "Smart-Settings-GUI",
                "X-Requesting-User": "KJKLJKLJKL"
            }
        };

        $http.post('./client/rest/login', payload)
            .error(function (data, status) {
                if (status === 400) {
                    angular.forEach(data, function (value, key) {
                        if (key === 'username' || key === 'password' || key === 'country') {
                            alertService.add('danger', key + ' : ' + value);
                        } else {
                            alertService.add('danger', value.message);
                        }
                    });
                } else if (status === 401) {
                    alertService.add('danger', 'Invalid login or password!');
                } else if (status === 500) {
                    alertService.add('danger', 'Internal server error!');
                } else {
                    alertService.add('danger', data);
                }
            })
            .success(function (data) {
                if (data.hasOwnProperty('success')) {
                    console.log("Success login in LoginCtrl" + payload.username)
                    cookieService.setCookieData(payload.username, payload.country)
                    console.log("Success login in LoginCtrl dd")
                    $location.path('/main');
                }
            });
    }

    session_service.logout = function () {

        console.log("Session service call logout")

        $http.get('./client/rest/logout')
            .error(function () {
                console.log("error maintenance is not logged in reroute to login")
            })
            .success(function (data) {
                if (data.hasOwnProperty('success')) {
                    console.log("maintenance is not logged in reroute to login")
                }
            });

        cookieService.clearCookieData()
        $location.path('/login');

    }

    session_service.isLoggedIn = function () {

        console.log("Session service call isLoggedIn");
        return true;

        $http.get('./client/rest/isauthenticated')
            .error(function () {
                console.log("Session service call isLoggedIn false, clear cookie")
                cookieService.clearCookieData()
               return false;
            })
            .success(function (data) {

                if (data.hasOwnProperty('success')) {
                     return true;
                }
                console.log("Session service call isLoggedIn success but wrong server response, clear cookie")
                cookieService.clearCookieData()
               return false;
            });
    }



    // public interface
    return {
        login: function (payload) {
            session_service.login(payload);
        },
        logout: function () {
            session_service.logout();
        },
        isLoggedIn: function () {
            session_service.isLoggedIn();
        },


    };

});
