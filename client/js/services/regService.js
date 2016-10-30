/**
 * Created by Drew on 2016-10-30.
 */


(function () {

    //this is the function that is the factory,
    // but this returns the object 'factory' that has the method getCustomers
    //so in essense this factory functionality is whatever the method on the  factory object is
    //simpleFactory is merely returning that
    var regService = function ($log) {

        var factory = {};

        //see if the data given to the form was undefined
        factory.inspectData = function (data) {

            if (data == null || data == undefined) {
                $log.debug('The response data is null or undefined');
                return "-";
            }
            return data;

        };

        return factory;
    };


    regService.$inject = ['$log'];

    angular.module('angular-app').factory('regService', regService);

}());