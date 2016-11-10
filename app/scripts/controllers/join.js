'use strict';

/**
 * @ngdoc function
 * @name angularCoursePubnubChatApp.controller:JoinCtrl
 * @description
 * # JoinCtrl
 * Controller of the angularCoursePubnubChatApp
 */
angular.module('angularCoursePubnubChatApp')
  .controller('JoinCtrl', ['$scope', '$rootScope', '$location', 'Pubnub', function ($scope, $rootScope, $location, Pubnub) {
    $scope.data = {
      username: 'User_' + Math.floor(Math.random() * 1000),
    };

    $scope.join = function () {
      var _ref, _ref2;

      $rootScope.data || ($rootScope.data = {});
      $rootScope.data.username = (_ref = $scope.data) != null ? _ref.username : void 0;
      $rootScope.data.city = (_ref2 = $scope.data) != null ? _ref2.city : void 0;
      $rootScope.data.uuid = Math.floor(Math.random() * 1000000) + '__' + $scope.data.username;

      Pubnub.init({
        subscribe_key: 'sub-c-41842d68-a76a-11e6-a114-0619f8945a4f',
        publish_key: 'pub-c-59e5a603-0866-4d63-9752-72238fb73f4e',
        uuid: $rootScope.data.uuid
      });

      return $location.path('/main');
    };
  }]);
