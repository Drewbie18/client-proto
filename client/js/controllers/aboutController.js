(function () {

    var aboutController = function ($scope, $http, $log) {
        $log.debug('about-controller is here');
    };

    aboutController.$inject = ['$scope', '$http', '$log'];
    //register the controller with the angular module
    angular.module('angular-app').controller('about-ctrl', aboutController);
}());


