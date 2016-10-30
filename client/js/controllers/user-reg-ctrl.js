/**
 * Created by Drew on 2016-10-30.
 */
(function () {

    //put all controller logic and services to be used in this function
    //this will then be registered to the module.
    var userRegController = function ($scope, $http, $log) {


        $log.debug('user registration controller is here');

        //get the data that was entered in the UI








    };

    //use the inject service to ensure that is there is minification the injected
    //services are not overwritten to s and h as minifiers tend to do.
    userRegController.$inject = ['$scope', '$http', '$log'];

    //register the controller with the angular module
    angular.module('angular-app').controller('user-reg-ctrl', userRegController);

}());
