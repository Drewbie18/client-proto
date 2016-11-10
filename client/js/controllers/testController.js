(function () {

    var testController = function ($scope, $http, $log, authService) {
        $log.debug('test-controller is here');


        $scope.checkStatus = function () {
            $log.debug(authService.getAuthStatus());
        };

        $scope.authTrue = function () {
            authService.setAuthStatus(true);
        };

        $scope.authFalse = function () {
            authService.setAuthStatus(false);
        };





    };

    testController.$inject = ['$scope', '$http', '$log', 'authService'];
    //register the controller with the angular module
    angular.module('angular-app').controller('test-ctrl', testController);
}());
