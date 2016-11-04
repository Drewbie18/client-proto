/**
 * Created by Drew on 2016-08-31.
 */
(function () {

    //function containing controller logic
    var landingController = function ($scope, $http, $log) {

        //quick verification script is loaded
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
        };


        //test login with dunny data
        $scope.testLogin = function () {

            var data = {
                name: 'user-781',
                password: '1234'
            };

            $http.post('/user/login/local', data).then(function successCallback(response) {
                $log.debug(response);
            }, function errorCallback(response) {
                $log.debug('There was an error', response);
            });

        }

    };
    //use the inject service to ensure that is there is minification the injected
    landingController.$inject = ['$scope', '$http', '$log'];

    //register the controller with the angular module
    angular.module('angular-app').controller('landing-ctrl', landingController);

}());

