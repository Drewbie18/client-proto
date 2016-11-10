/**
 * Created by Drew on 2016-10-30.
 */


(function () {

    var regService = function ($log, $http) {

        var factory = {};

        factory.hello = function () {
            $log.debug('hello');
        };

        //see if the data given to the form was undefined
        factory.inspectData = function (data) {

            if (data == null || data == undefined) {
                $log.debug('The response data is null or undefined');
                return "-";
            }
            return data;

        };

        factory.get = function () {
            return $http.get('/api/users');
        };

        factory.create = function (userData) {
            return $http.post('/api/users', userData);
        };

        factory.delete = function (id) {
            return $http.delete('/api/users/' + id);
        };

        return factory;
    };


    regService.$inject = ['$log', '$http'];

    angular.module('angular-app').factory('regService', regService);

}());