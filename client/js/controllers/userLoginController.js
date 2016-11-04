/**
 * Created by Drew on 2016-11-01.
 */

(function () {

    var userLoginController = function ($scope, $http, $log) {
        $log.debug('user-login-controller is here');

        $scope.loginUser = function (username, password) {



                var data = {
                    name: username,
                    password: password
                };

                $http.post('/user/login/local', data).then(function successCallback(response) {

                    $log.debug(response);

                }, function errorCallback(response) {

                    $log.debug('There was an error', response);
                });


        }

    };

    userLoginController.$inject = ['$scope', '$http', '$log'];
    //register the controller with the angular module
    angular.module('angular-app').controller('user-login-ctrl', userLoginController);
}());


