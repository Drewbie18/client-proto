/**
 * Created by Drew on 2016-11-09.
 */


(function () {

    var authService = function ($log, $http, $cookies) {

        var factory = {};
        //the authorization status variable that will change, but only by the setAuthStatus method.
        var authStatus = false;

        //set the authorized status of the user to true/false
        factory.setAuthStatus = function (status) {

            $log.debug('AUTH STATUS SET TO:', status)
            authStatus = status;

        };

        //allows the app to quickly check the auth status
        factory.getAuthStatus = function () {
            return authStatus;
        };


        //on landing verify if a session cookie exists.
        factory.verifyCookieExists = function () {
            var sessionId = $cookies.get('s');

            //return true if there is a session Id cookie.
            return (sessionId != undefined);
        };

        //TODO  - should you obfuscate the api route somehow?
        factory.verifyTokenCookie = function () {

            var token = $cookies.get('t-5');

            if (token != undefined) {
                $http({
                    method: 'GET',
                    url: '/api/token/verify',
                    headers: {'x-auth': token}
                }).then(function successCallback(response) {

                    $log.debug('The Cookie exists and the ssison was verified.', response)
                    authStatus = true;


                }, function errorCallback(response) {

                    $log.debug('Session is expired or does not exist', response);

                    authStatus = false;

                });
            }


        };


        //used when user logs in (from login service)
        //the callback for a success is to create a Session cookie
        factory.createSession = function (userId, next) {

            $log.debug('create Session: ', userId);

            var data = {userId: userId};

            //only need to send userId the session uuid will be generated servier side and sent back
            $http.post('/api/session', data)
                .then(function successCallback(response) {
                    $log.debug('createSession-', response);

                    //if a session is created successfully a session cookie should be created.
                    next(response.data);

                }, function errorCallback(response) {
                    $log.debug('createSession - There was an error', response);
                });
        };


        //if a new session is created a cookie with the session uuid should be created
        factory.createTokenCookie = function (token) {
            $cookies.put('t-5', token);
            $log.debug('cookie with sessionId created: ', token);
        };



        //if the session stored in the current session cookie is expired it should be deleted
        factory.deleteSessionCookie = function (next) {

            $cookies.remove('s');
            $log.debug('cookie removed');
        };

        return factory;
    };


    authService.$inject = ['$log', '$http', '$cookies'];

    angular.module('angular-app').factory('authService', authService);

}());