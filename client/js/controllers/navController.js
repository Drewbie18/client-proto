/*
 * This will serve the nav/auth controller as it will be active on every page in this iteration
 * of the app.
 *
 * Auth steps
 * 1. check the authorization status of the user
 * 2.
 *
 *
 * */


(function () {

    var navController = function ($scope, $http, $log, $rootScope, authService) {

        //if the user is not logged in
        if (!authService.getAuthStatus()) {

            $log.debug('NAV Controller - running the verifyAuthToken');
            authService.verifyAuthToken();
        }

    };

    navController.$inject = ['$scope', '$http', '$log', '$rootScope', 'authService'];
    //register the controller with the angular module
    angular.module('angular-app').controller('nav-ctrl', navController);
}());


