/**
 * Created by Drew on 2016-10-29.
 */

(function () {

    //put all controller logic and services to be used in this function
    //this will then be registered to the module.
    var clientRegController = function ($scope, $http, $log) {


        $log.debug('client registration controller is here');


    };

    //use the inject service to ensure that is there is minification the injected
    //services are not overwritten to s and h as minifiers tend to do.
    clientRegController.$inject = ['$scope', '$http', '$log'];

    //register the controller with the angular module
    angular.module('angular-app').controller('client-reg-ctrl', clientRegController);


}());
