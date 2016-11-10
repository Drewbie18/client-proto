/**
 * Created by Drew on 2016-08-31.
 */
(function () {

    //function containing controller logic
    var landingController = function ($scope, $http, $log, $cookies) {

        //quick verification script is loaded
        $log.debug('landing-controller is here');

        //debugging function to test the mongo connection
        $scope.testFindSession = function () {

            var sessionId = '4617a640-a623-11e6-83c8-a1f11f1dd9b5';
            //var sessionId = '3a68fe40-a2f7-11e6-ab3d-f5e7a9215068';
            //var sessionId = 'fake';

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
        };


        //test login with dunny data
        $scope.testSession = function () {
            var data = {
                userId: 'test2'
            };

            $http.post('/api/session', data).then(function successCallback(response) {
                $log.debug(response);
            }, function errorCallback(response) {
                $log.debug('There was an error', response);
            });

        }

        $scope.createCookie = function () {

            $log.debug('cookie btn pressed');
            $cookies.put('aCookie', 'someData');
            $cookies.put('aCookie2', 'someData2');

            var all = $cookies.getAll();
            $log.debug(all);

            var cookie = $cookies.get('aCookie');
            $log.debug(cookie);


            var noCookie = $cookies.get('noCookie');
            $log.debug(noCookie);


        }


    };
    //use the inject service to ensure that is there is minification the injected
    landingController.$inject = ['$scope', '$http', '$log', '$cookies'];

    //register the controller with the angular module
    angular.module('angular-app').controller('landing-ctrl', landingController);

}());

