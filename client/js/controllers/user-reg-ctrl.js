/**
 * Created by Drew on 2016-10-30.
 */
(function () {

    //put all controller logic and services to be used in this function
    //this will then be registered to the module.
    var userRegController = function ($scope, $http, $log, regService) {


        $log.debug('user registration controller is here');

        //get the data that was entered in the UI


        $scope.submitUser = function (firstName, lastName, userName, email, mobilePhone, password) {

            $log.debug(firstName, lastName, userName, email, password);

            var userRegData = {
                firstName: regService.inspectData(firstName),
                lastName: regService.inspectData(lastName),
                userName: regService.inspectData(userName),
                email: regService.inspectData(email),
                mobilePhone: regService.inspectData(mobilePhone),
                password: regService.inspectData(password)
            };

            $log.debug(userRegData);


            $http({
                method: 'POST',
                url: '/api/high-5/create/user',
                data: userRegData

            }).then(function successCallback(response) {

                $log.debug(response);

            }, function errorCallback(response) {

                $log.debug('There was an error', response);

            });

        }


    };

    //use the inject service to ensure that is there is minification the injected
    //services are not overwritten to s and h as minifiers tend to do.
    userRegController.$inject = ['$scope', '$http', '$log', 'regService'];

    //register the controller with the angular module
    angular.module('angular-app').controller('user-reg-ctrl', userRegController);

}());
