myApp.factory("cookieService", [
    "$cookies", function($cookies) {
        var userName = "";
        var userCountry = "";

        return {
            setCookieData: function(username, country) {
                userName = username;
                userCountry = country;
                $cookies.put("userName", username);
                $cookies.put("userCountry", country);
            },
            getUserName: function() {
                return $cookies.get("userName");
            },
            getUserCountry: function() {
                return $cookies.get("userCountry");
            },
            clearCookieData: function() {
                userName = "";
                userCountry = "";

                $cookies.put("userName", "");
                $cookies.put("userCountry", "");


            }
        }
    }
]);