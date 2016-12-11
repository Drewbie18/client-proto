/**
 * Created by Drew on 2016-11-01.
 */

(function () {

    var userLoginController = function ($scope, $http, $log, loginService, authService) {
        $log.debug('user-login-controller is here');

        $scope.login = function (userName, password) {

            //verify the fields have data
            //TODO handle errors if login form info is missing
            if (userName == undefined || password == undefined) {
                $log.debug('Username or password is undefined');
                return;
            }

            loginService.login(userName, password)
                .then(function successCallback(response) {
                    $log.debug(response.headers());
                    $log.debug(response.data);

                    //on success create cookie with token, set auth status to true
                    var token = response.headers('x-auth');

                    //refresh token is in response body.
                    var refreshToken = response.data.refreshToken;

                    authService.createAuthTokenCookie(token);
                    authService.setAuthStatus(true);
                    authService.createRefreshTokenCookie(refreshToken);

                }, function errorCallback(response) {

                    //TODO handle failed login  - 401 unauthorized
                    $log.debug('LOGIN - There was an error', response);

                    //verify auth status is false
                    authService.setAuthStatus(false);

                });

        }

    };

    //make sure the injection args line up with function args
    userLoginController.$inject = ['$scope', '$http', '$log', 'loginService', 'authService'];
    //register the controller with the angular module
    angular.module('angular-app').controller('user-login-ctrl', userLoginController);
}());


