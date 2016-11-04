(function () {

    var navController = function ($scope, $http, $log, $rootScope) {
        $log.debug('nav-controller is here');
    };

    navController.$inject = ['$scope', '$http', '$log', '$rootScope'];
    //register the controller with the angular module
    angular.module('angular-app').controller('nav-ctrl', navController);
}());


