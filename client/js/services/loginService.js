(function () {

    //LOGIN CREDS FOR TESTING
    //name: apayette
    //pwrd: admin


//used to login a user. If successful this will call the create Session from authService
    var loginService = function ($log, $http) {

        var factory = {};

        factory.loginHere = function () {
            $log.debug('login service works');
        };

        factory.login = function (username, password) {

            //take username and password from UI
            var data = {
                name: username,
                password: password
            };

            //post to login API
           return $http.post('/user/login/local', data)
        };

        return factory;
    };

    loginService.$inject = ['$log', '$http'];

    angular.module('angular-app').factory('loginService', loginService);

}());