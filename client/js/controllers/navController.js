(function () {

    var navController = function ($scope, $http, $log, $rootScope, authService) {

        if (!authService.getAuthStatus()) {
            authService.verifySessionCookie();
        }


        $log.debug('nav-controller is here');
    };

    navController.$inject = ['$scope', '$http', '$log', '$rootScope', 'authService'];
    //register the controller with the angular module
    angular.module('angular-app').controller('nav-ctrl', navController);
}());


