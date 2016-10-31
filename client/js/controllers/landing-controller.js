/**
 * Created by Drew on 2016-08-31.
 */


(function () {

    //put all conroller logic and services to be used in this function
    //this will then be registered to the module.
    var landingController = function ($scope, $http, $log) {

        $log.debug('landing-controller is here');


        //debugging function to test the mongo connection
        $scope.testMongo = function () {

            $http({
                method: 'GET',
                url: '/api/mongo-connect'

            }).then(function successCallback(response) {

                $log.debug(response);
            }, function errorCallback(response) {
                $log.debug('There was an error', response);

            });

        }

    };

    //use the inject service to ensure that is there is minification the injected
    //services are not overwritten to s and h as minifiers tend to do.
    landingController.$inject = ['$scope', '$http', '$log'];

    //register the controller with the angular module
    angular.module('angular-app').controller('landing-ctrl', landingController);


}());

