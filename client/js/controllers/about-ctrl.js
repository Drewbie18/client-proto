/**
 * Created by Drew on 2016-10-27.
 * Controller in IIFE method
 *
 */

(function () {

    //put all controller logic and services to be used in this function
    //this will then be registered to the module.
    var aboutController = function ($scope, $http, $log) {


        $log.debug('about-controller is here');


    };

    //use the inject service to ensure that is there is minification the injected
    //services are not overwritten to s and h as minifiers tend to do.
    aboutController.$inject = ['$scope', '$http', '$log'];

    //register the controller with the angular module
    angular.module('angular-app').controller('about-ctrl', aboutController);


}());


