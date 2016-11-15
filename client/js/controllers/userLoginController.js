/**
 * Created by Drew on 2016-11-01.
 */

(function () {

    var userLoginController = function ($scope, $http, $log, loginService, authService, regService) {
        $log.debug('user-login-controller is here');

        regService.hello();
        loginService.loginHere();

        $scope.login = function (userName, password) {

            $log.debug(userName, password);

            if (userName == undefined || password == undefined) {
                $log.debug('Username or password is undefined');
                return;
            }


            $log.debug('login button pressed');


            loginService.login(userName, password)

                .then(function successCallback(response) {

                    $log.debug('login success: ', response.data.userId);
                    authService.createSession(response.data.userId, authService.createSessionCookie);
                    authService.setAuthStatus(true);


                }, function errorCallback(response) {

                    $log.debug('LOGIN - There was an error', response);


                });

        }

    };

    //make sure the injection args line up with function args
    userLoginController.$inject = ['$scope', '$http', '$log', 'loginService', 'authService', 'regService'];
    //register the controller with the angular module
    angular.module('angular-app').controller('user-login-ctrl', userLoginController);
}());


