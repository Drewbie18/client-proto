(function () {

    var fbController = function ($scope, $http, $log, authService, testService, facebookAuth) {
        $log.debug('facebook controller is here');

        $scope.$on('$viewContentLoaded', facebookAuth.fbAsyncInit);

        $scope.facebookAuth = facebookAuth.fbAsyncInit;



    };

    fbController.$inject = ['$scope', '$http', '$log', 'authService', 'testService', 'facebookAuth'];
    //register the controller with the angular module
    angular.module('angular-app').controller('fb-ctrl', fbController);
}());
