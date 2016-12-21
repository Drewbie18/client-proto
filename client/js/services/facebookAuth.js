/**
 * Client Side Facebook Authentication for login.
 *
 * Details
 * App ID: 1321078801257340
 * App Secret: e9ef9d2630a73eeb790adf361f467c93
 */

(function () {

    var facebookAuth = function ($log, $http, $cookies, $window) {

        var factory = {};

        $log.debug('Facebook init function has run');

        //wrapping the fbInit code in an angular service method
        factory.fbAsyncInit = function () {

            $log.debug('Facebook init function has run');

            //use the angular window object
            $window.fbAsyncInit = function () {
                FB.init({
                    //id of the app
                    appId: '1321078801257340',
                    xfbml: true,
                    version: 'v2.8'
                });
                FB.AppEvents.logPageView();
            };

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

        };


        return factory;
    };

    facebookAuth.$inject = ['$log', '$http', '$cookies', '$window'];
    angular.module('angular-app').factory('facebookAuth', facebookAuth);
}());


