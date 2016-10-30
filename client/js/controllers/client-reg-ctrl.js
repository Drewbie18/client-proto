/**
 * Created by Drew on 2016-10-29.
 */

(function () {

    //put all controller logic and services to be used in this function
    //this will then be registered to the module.
    var clientRegController = function ($scope, $http, $log, regService) {


        $log.debug('client registration controller is here');


        $scope.submitClient = function (companyName, pageUrl, firstName, lastName, email, phone, password) {

            $log.debug(companyName, pageUrl, firstName, lastName, email, phone, password);

            var clientRegData = {
                companyName: regService.inspectData(companyName),
                pageUrl: regService.inspectData(pageUrl),
                firstName: regService.inspectData(firstName),
                lastName: regService.inspectData(lastName),
                email: regService.inspectData(email),
                phone: regService.inspectData(phone),
                password: regService.inspectData(password)
            };

            $log.debug(clientRegData);

            $http({
                method: 'POST',
                url: '/api/high-5/create/client',
                data: clientRegData

            }).then(function successCallback(response) {

                $log.debug(response);
            }, function errorCallback(response) {
                $log.debug('There was an error', response);

            });
        }

    };

    //use the inject service to ensure that is there is minification the injected
    //services are not overwritten to s and h as minifiers tend to do.
    clientRegController.$inject = ['$scope', '$http', '$log', 'regService'];

    //register the controller with the angular module
    angular.module('angular-app').controller('client-reg-ctrl', clientRegController);


}());
