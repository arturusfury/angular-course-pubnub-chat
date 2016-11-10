'use strict';

/**
 * @ngdoc overview
 * @name angularCoursePubnubChatApp
 * @description
 * # angularCoursePubnubChatApp
 *
 * Main module of the application.
 */
angular
  .module('angularCoursePubnubChatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pubnub.angular.service'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
      })
      .when('/join', {
        templateUrl: 'views/join.html',
        controller: 'JoinCtrl',
      })
      .otherwise({
        redirectTo: '/join'
      });
  });
