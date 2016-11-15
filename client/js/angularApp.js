/**
 * Created by Drew on 2016-10-27.
 */
/**
 * Created by Drew on  2016-10-27.
 * This file will contain the basic angular setup
 *
 *
 * This is where we define the name of our module that we are adding to the html tag,
 * we are also injecting any modules that we are dependent on-> ngRoute and all other kinds
 *
 */


var angularApp = angular.module('angular-app', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngCookies']);

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
        .when('/client-reg', {
            templateUrl: 'client/views/client-reg.html',
            controller: 'client-reg-ctrl'
        })
        .when('/user-reg', {
            templateUrl: 'client/views/user-reg.html',
            controller: 'user-reg-ctrl'
        })
        .when('/user-profile', {
            templateUrl: 'client/views/profile.html',
            controller: 'user-profile-ctrl'
        })
        .when('/user-login', {
            templateUrl: 'client/views/user-login.html',
            controller: 'user-login-ctrl'
        })
        .when('/test', {
            templateUrl: 'client/views/test-page.html',
            controller: 'test-ctrl'
        })


});

//http://stackoverflow.com/questions/11541695/redirecting-to-a-certain-route-based-on-condition



