/**
 * Created by Drew on 2016-10-30.
 */


(function () {

    //this is the function that is the factory,
    // but this returns the object 'factory' that has the method getCustomers
    //so in essense this factory functionality is whatever the method on the  factory object is
    //simpleFactory is merely returning that
    var regService = function ($log, $http) {

        var factory = {};

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