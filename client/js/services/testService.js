/**
 * Created by Drew on 2016-11-09.
 *
 * TODO - verify that setting the authStatus variable in a service cannot be exploited.
 */

(function () {

    var testService = function ($log, $http, $cookies) {

        var factory = {//the authorization status variable that will change, but only by the setAuthStatus method.

            authStatus: false,

            //set the authorized status of the user to true/false
            setAuthStatus: function (status) {

                $log.debug('AUTH STATUS SET TO:', status);
                this.authStatus = status;

            },

            //allows the app to quickly check the auth status
            getAuthStatus: function () {
                $log.debug('AUTH STATUS BEING GOTTEN FUCK TO:', this.authStatus);
                return this.authStatus;
            },

            change: function () {
                factory.getAuthStatus();
            }
        }

        return factory;

    };

    testService.$inject = ['$log', '$http', '$cookies'];

    angular.module('angular-app').factory('testService', testService);

}());