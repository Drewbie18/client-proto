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

        $scope.deleteAllSessions = function () {
            $http({
                method: 'GET',
                url: '/api/session/delete/all'
            }).then(function successCallback(response) {

                $log.debug('DELETE SESSION-', response);

            }, function errorCallback(response) {

                $log.debug('DELETE SESSIONS- There was an error', response);
            });
        };

        $scope.verifySessionTest = function () {

            //returns true if cookie is undefined
            var cookieExists = authService.verifyCookieExists();

            if (!cookieExists) {
                authService.verifySession().then(function successCallback(response) {

                    $log.debug('VERIFY SESSION-', response);

                    if (response.status == 200) {
                        authService.setAuthStatus(true);
                    }

                }, function errorCallback(response) {

                    $log.debug('VERIFY SESSION- There was an error', response);
                    authService.setAuthStatus(false);

                });
            } else {
                //if cookie does not exist set auth status to false
                authService.setAuthStatus(false);
            }
        }

    };

    testController.$inject = ['$scope', '$http', '$log', 'authService'];
    //register the controller with the angular module
    angular.module('angular-app').controller('test-ctrl', testController);
}());
