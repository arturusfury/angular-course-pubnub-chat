'use strict';

/**
 * @ngdoc function
 * @name angularCoursePubnubChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularCoursePubnubChatApp
 */
angular.module('angularCoursePubnubChatApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', 'Pubnub', function ($scope, $rootScope, $location, Pubnub) {
    var _ref;

    if (!Pubnub.initialized()) {
      $location.path('/join');
    }

    $scope.controlChannel = '__controlchannel';

    $scope.channels = [];

    // Create Channel
    $scope.createChannel = function () {
      var channel;

      console.log("Creating Channel");

      channel = $scope.newChannel;
    }
  }]);
