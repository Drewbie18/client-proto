/**
 * Created by Drew on 2016-11-01.
 */

(function () {

    var userLoginController = function ($scope, $http, $log, loginService, authService, regService) {
        $log.debug('user-login-controller is here');

        regService.hello();

        $scope.login = function (userName, password) {

            $log.debug('login button pressed');

            /*
             var login = loginService.login(userName, password);

             //if login succeeded the status is true, so create a session cookie
             if (login.status ==true) {
             authService.createSession(login.userId, authService.createSessionCookie);

             //if login failed log the response
             } else if(login.status ==false) {
             $log.debug(login.response);
             //if the return isn't define there was an error

             }else{
             $log.debug('login fail', login);
             }
             */
        }

    };

    userLoginController.$inject = ['$scope', '$http', '$log', 'loginService', 'authService', 'regService'];
    //register the controller with the angular module
    angular.module('angular-app').controller('user-login-ctrl', userLoginController);
}());


