/**
 * Created by Drew on 2016-10-27.
 */
/**
 * Created by Drew on 2016-08-29.
 * This file will contain the basic angular setup
 *
 *
 * This is where we define the name of our module that we are adding to the html tag,
 * we are also injecting any modules that we are dependent on-> ngRoute and all other kinds
 *
 */


var angularApp = angular.module('angular-app', ['ngRoute', 'ngAnimate']);


//add logging logic (turn off and on)


angularApp.config(function ($logProvider) {

    $logProvider.debugEnabled(true);

});



angularApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'client/views/landing.html',
            controller: 'landing-ctrl'
        })
        .when('/about', {
            templateUrl: 'client/views/about.html',
            controller: 'about-ctrl'
        })
        .when('/user-reg', {
            templateUrl: 'client/views/client-registration.html',
            controller: 'client-reg-ctrl'
        })
        .when('/client-reg', {
            templateUrl: 'client/views/user-registration.html',
            controller: 'user-reg-ctrl'
        })
});






