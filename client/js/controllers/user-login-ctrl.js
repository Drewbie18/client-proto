/**
 * Created by Drew on 2016-11-01.
 */

(function () {

    var userLoginController = function ($scope, $http, $log) {
        $log.debug('user-login-controller is here');

        $scope.loginUser = function (username, password) {
            $log.debug('The login button has been pressed');
        }

    };

    userLoginController.$inject = ['$scope', '$http', '$log'];
    //register the controller with the angular module
    angular.module('angular-app').controller('user-login-ctrl', userLoginController);
}());


