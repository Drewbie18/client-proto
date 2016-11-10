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
            $http.post('/user/login/local', data)
                .then(function successCallback(response) {

                    $log.debug(response);

                    //if returns a success call the create session and send it the userId
                    return {
                        userId: response.userId,
                        status: true
                    };

                }, function errorCallback(response) {

                    $log.debug('There was an error', response);

                    return {
                        status: false,
                        response: response
                    };

                });
        };

        return factory;
    };

    loginService.$inject = ['$log', '$http'];

    angular.module('angular-app').factory('loginService', loginService);

}());