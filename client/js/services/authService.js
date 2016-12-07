/**
 * Created by Drew on 2016-11-09.
 *
 * TODO - verify that setting the authStatus variable in a service cannot be exploited.
 */

(function () {

    var authService = function ($log, $http, $cookies) {

        var factory = {};
        //the authorization status variable that will change, but only by the setAuthStatus method.
        var authStatus = false;

        //set the authorized status of the user to true/false
        factory.setAuthStatus = function (status) {

            $log.debug('AUTH STATUS SET TO:', status);
            authStatus = status;

        };

        //allows the app to quickly check the auth status
        factory.getAuthStatus = function () {
            $log.debug('AUTH STATUS SET TO:', authStatus);
            return authStatus;
        };


        factory.change = function () {

            $log.debug('The change function has run');
            factory.getAuthStatus();

        };


        /**
         *This method will check to see if an auth token is stored in a local cookie.
         * If it is it will verify that the token is still valid
         *
         * If there is no cookie or the auth token is no longer valid this will return 'false'
         * If there is a cookie with a valid auth token this will return true, and set the user as
         * logged in.
         **/
        factory.verifyAuthToken = function () {

            var token = $cookies.get('t-5');

            if (token != undefined) {
                $http({
                    method: 'GET',
                    url: '/api/token/verify',
                    headers: {'x-auth': token}
                }).then(function successCallback(response) {

                    $log.debug('The auth token was verified', response);
                    authStatus = true;
                    return true;


                }, function errorCallback(response) {

                    $log.debug('Auth token is not valid', response);

                    authStatus = false;
                    return false;

                });
            } else {
                $log.debug('VERIFY TOKEN COOKIE  - cookie was undefined, user is not logged in.');
                authStatus = false;
                return false;
            }

        };

        /**
         *This method will check to see if an refresh token is stored in a local cookie.
         * If it is it will verify that the token is still valid
         *
         * If there is no cookie or the refresh token is no longer valid this will return 'false'
         * If there is a cookie with a valid auth token this will return true, and set the user as
         * logged in.
         **/
        factory.verifyRefreshToken = function () {

            var token = $cookies.get('r-5');

            var data = {
                refreshToken: token
            };

            if (token != undefined) {
                $http({
                    method: 'POST',
                    url: '/api/token/verify',
                    data: data
                }).then(function successCallback(response) {

                    $log.debug('The refresh token was verified', response);
                    authStatus = true;
                    return true;


                }, function errorCallback(response) {

                    $log.debug('Refresh token was not valid', response);

                    authStatus = false;
                    return false;
                });
            } else {
                $log.debug('VERIFY TOKEN COOKIE  - cookie was undefined, user is not logged in.');
                authStatus = false;
                return false;
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

        /**
         *If a new login occurs or a new auth token is given to the user a new cookie will need to
         *saved in local storage
         **/
        factory.createAuthTokenCookie = function (token) {
            $cookies.put('t-5', token);
            $log.debug('auth token cookie created: ', token);
        };

        //Delete cookie on invalid or user logs out.
        factory.deleteAuthTokenCookie = function () {

            $cookies.remove('t-5');
            $log.debug('auth token cookie removed');
        };


        /**
         *When the user receives a new refresh token it will need to be saved in local storage
         **/
        factory.createRefreshTokenCookie = function (token) {
            $cookies.put('r-5', token);
            $log.debug('refresh token cookie created', token);
        };
        //Delete cookie on invalid or user logs out.
        factory.deleteRefreshTokenCookie = function () {

            $cookies.remove('r-5');
            $log.debug('refresh token cookie removed');
        };

        return factory;
    };

    authService.$inject = ['$log', '$http', '$cookies'];

    angular.module('angular-app').factory('authService', authService);

}());