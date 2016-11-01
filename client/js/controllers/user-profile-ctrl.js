/**
 * Created by Drew on 2016-11-01.
 */

(function () {
    var userProfileController = function ($scope, $http, $log) {

        $log.debug('user-profile-controller is here');

        //test get request
        $scope.getUsers = function () {
            $http({
                method: 'GET',
                url: '/api/users'
            }).then(function successCallback(response) {

                $log.debug(response);

            }, function errorCallback(response) {

                $log.debug(response);

            });
        };

//test get request by id
        $scope.getUserById = function () {
            var userId = '58191535b51893212467b6d0';

            $http({
                method: 'GET',
                url: '/api/users/'+ userId
            }).then(function successCallback(response) {

                $log.debug(response);

            }, function errorCallback(response) {

                $log.debug(response);

            });
        };


    }

    userProfileController.$inject = ['$scope', '$http', '$log'];

    //register the controller with the angular module
    angular.module('angular-app').controller('user-profile-ctrl', userProfileController);


}());
