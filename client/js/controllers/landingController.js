/**
 * Created by Drew on 2016-08-31.
 */
(function () {

    //function containing controller logic
    var landingController = function ($scope, $http, $log) {

        //quick verification script is loaded
        $log.debug('landing-controller is here');

        //debugging function to test the mongo connection
        $scope.testFindSession = function () {

            var sessionId = '3a68fe40-a2f7-11e6-ab3d-f5e7a9215068';

            $http({
                method: 'GET',
                url: '/api/session/' + sessionId

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


        //test login with dunny data
        $scope.testSession = function () {

            var data = {
                userId: '5819678294399702846914fa'
            };

            $http.post('/api/session', data).then(function successCallback(response) {
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

