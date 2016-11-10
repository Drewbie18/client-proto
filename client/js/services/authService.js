/**
 * Created by Drew on 2016-11-09.
 */
/**
 * Created by Drew on 2016-10-30.
 */


(function () {

    var authService = function ($log, $http) {

        var factory = {};
        //the authorization status variable that will change, but only by the setAuthStatus method.
        var authStatus = false;

        //set the authorized status of the user to true/false
        factory.setAuthStatus = function (status) {
            authStatus = status;

        };

        //allows the app to quickly check the auth status
        factory.getAuthStatus = function () {
            return authStatus;
        };
        return factory;
    };


    authService.$inject = ['$log', '$http'];

    angular.module('angular-app').factory('authService', authService);

}());