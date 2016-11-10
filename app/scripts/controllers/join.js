'use strict';

/**
 * @ngdoc function
 * @name angularCoursePubnubChatApp.controller:JoinCtrl
 * @description
 * # JoinCtrl
 * Controller of the angularCoursePubnubChatApp
 */
angular.module('angularCoursePubnubChatApp')
  .controller('JoinCtrl', ['$scope', '$rootScope', '$location', 'PubNub', function ($scope, $rootScope, $location, PubNub) {
    $scope.data = {
      username: 'User_' + Math.floor(Math.random() * 1000),
    }

    $scope.join = function () {

    };
  }]);
