(function () {

    var testController = function ($scope, $http, $log, authService, testService, facebookAuth) {
        $log.debug('test-controller is here');


        $scope.$on('$viewContentLoaded', facebookAuth.fbAsyncInit);

        $scope.facebookAuth = facebookAuth.fbAsyncInit;


        $scope.checkStatus = function () {
            $log.debug(authService.getAuthStatus());
        };

        $scope.authTrue = function () {
            authService.setAuthStatus(true);
        };

        $scope.authFalse = function () {
            authService.setAuthStatus(false);
        };


        var token;

        $scope.getTestAuthToken = function () {
            $http({
                method: 'GET',
                url: '/api/user/me'
            }).then(function successCallback(response) {

                $log.debug('This is the auth token test response: ', response.headers());
                token = response.headers('x-auth');
            }, function errorCallback(response) {
            });
        };


        $scope.sendTestAuthToken = function () {
            $http({
                method: 'GET',
                url: '/api/user/token/send',
                headers: {'x-auth': token}
            }).then(function successCallback(response) {
                $log.debug('This is the auth token test response: ', response.data);
                token = response.data;
            }, function errorCallback(response) {
            });
        };


        $scope.createTestAuthToken = function () {
            var data = {
                expiryDate: new Date(Date.now() + (60 * 60)),
                issuer: 'High-5',
                siteUrl: 'localhost',
                state: 'ACTIVE'
            };

            $http({
                method: 'POST',
                url: '/api/local/auth/token',
                data: data
            }).then(function successCallback(response) {
                $log.debug('This is the create auth token test response: ', response.data);

            }, function errorCallback(response) {
            });
        };


        $scope.testRefreshToken = authService.verifyRefreshToken;


        $scope.deleteRefreshToken = function () {
            var token = authService.getRefreshToken();

            data = {refreshToken: token};

            $http({
                method: 'PUT',
                url: '/api/token/refresh/delete',
                data: data
            }).then(function successCallback(response) {
                $log.debug('This is the auth token test response: ', response.data);

            }, function errorCallback(response) {

                $log.debug('there was an error', response);
            });


        }

    };

    testController.$inject = ['$scope', '$http', '$log', 'authService', 'testService', 'facebookAuth'];
    //register the controller with the angular module
    angular.module('angular-app').controller('test-ctrl', testController);
}());
