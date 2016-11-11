/**
 * Created by Drew on 2016-11-09.
 */
/**
 * Created by Drew on 2016-10-30.
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

            return (sessionId == undefined);
        };

        //should only be called if cookie exists else this will error
        factory.verifySession = function () {

            var sessionId = $cookies.get('s');

            return $http({
                method: 'GET',
                url: '/api/session/' + sessionId
            })

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
        factory.createSessionCookie = function (sessionToken) {
            $cookies.put('s', sessionToken.sessionId);
            $log.debug('cookie with sessionId created: ', sessionToken.sessionId);
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