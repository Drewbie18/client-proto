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
        .when('/fb-login', {
        templateUrl: 'client/views/fb-test.html',
        controller: 'fb-ctrl'
    })


});

angularApp.run(function ($rootScope, $location, authService) {

    //routeChangeStart is broadcasted when the route is about to change.
    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        if (!authService.getAuthStatus()) {
            //if the user is not logged in and if they were going to the profile page, redirect them to home
            if (next.templateUrl === "client/views/profile.html") {
                $location.path("/");
            }
        }
    })

});

//http://fdietz.github.io/recipes-with-angular-js/urls-routing-and-partials/listening-on-route-changes-to-implement-a-login-mechanism.html
//http://stackoverflow.com/questions/11541695/redirecting-to-a-certain-route-based-on-condition



