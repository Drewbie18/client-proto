/**
 * Created by Drew on 2016-11-01.
 */

(function () {
    var userProfileController = function ($scope, $http, $log) {

        $log.debug('user-profile-controller is here');







    };

    userProfileController.$inject = ['$scope', '$http', '$log'];

    //register the controller with the angular module
    angular.module('angular-app').controller('user-profile-ctrl', userProfileController);


}());
