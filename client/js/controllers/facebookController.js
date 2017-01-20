(function () {

    var fbController = function ($scope, $http, $log, authService, testService, facebookAuth) {
        $log.debug('facebook controller is here');

       $scope.$on('$viewContentLoaded', facebookAuth.fbAsyncInit);

        $scope.facebookAuth = facebookAuth.fbAsyncInit;

        $scope.loginFb = function () {
            $http({
                method: 'GET',
                url: '/v1/auth/facebook'
            }).then(function successCallback(response) {

                $log.debug('This is the auth token test response: ', response.data);

            }, function errorCallback(err) {

                $log.debug('There was an error logging in or register with facebook', err);

            });
        };

    };

    fbController.$inject = ['$scope', '$http', '$log', 'authService', 'testService', 'facebookAuth'];
    //register the controller with the angular module
    angular.module('angular-app').controller('fb-ctrl', fbController);
}());
