'use strict';

/**
 * @ngdoc function
 * @name pnChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pnChatApp
 */
angular.module('angularCoursePubnubChatApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', 'Pubnub', function ($scope, $rootScope, $location, Pubnub) {
   	var _ref;
    if (!Pubnub.initialized) {
      $location.path('/join');
    }

    // Control channel to collect channel creation messages
    $scope.controlChannel = '__controlchannel';

    $scope.channels = [];

    // Publish Chat
    $scope.publish = function(){
    	if(!$scope.selectedChannel){
   			return;
   		}
   		Pubnub.ngPublish({
   			channel: $scope.selectedChannel,
   			message: {
   				text:$scope.newMessage,
   				user: $scope.data.username
   			}
   		});
   		return $scope.newMessage = '';
    }

   	// Create Channel
   	$scope.createChannel = function(){
   		var channel;
   		console.log('Creating Channel...');
   		channel = $scope.newChannel;

   		$scope.newChannel = '';

   		Pubnub.ngGrant({
   			channel: channel,
   			read: true,
   			write: true,
   			callback: function(){
   				return console.log(channel + 'All Set', arguments);
   			}
   		});

   		Pubnub.ngGrant({
   			channel: channel+'-pnpres',
   			read: true,
   			write: false,
   			callback: function(){
   				return console.log(channel + 'Presence All Set', arguments);
   			}
   		});

   		Pubnub.ngPublish({
   			channel: $scope.controlChannel,
   			message: channel
   		});

   		return setTimeout(function(){
   			$scope.subscribe(channel);
   			return $scope.showCreate = false;
   		}, 100);
   	}

   	$scope.subscribe = function(channel){
   		var _ref;
   		console.log('Subscribing...');
   		if(channel === $scope.selectedChannel){
   			return;
   		}
   		if($scope.selectedChannel){
   			Pubnub.ngUnsubscribe({
   				channel: $scope.selectedChannel
   			});
   		}
   		$scope.selectedChannel = channel;
   		$scope.messages = ['Welcome to '+channel];
   		Pubnub.ngSubscribe({
   			channel: $scope.selectedChannel,
   			state:{
   				"city": ((_ref = $rootScope.data) != null ? _ref.city : void 0) || 'unknown'
   			},
   			error: function(){
   				return console.log(arguments);
   			}
   		});

   		$rootScope.$on(Pubnub.ngPrsEv($scope.selectedChannel), function(ngEvent, payload) {
        return $scope.$apply(function() {
          var newData, userData;
          userData = Pubnub.ngPresenceData($scope.selectedChannel);
          newData = {};
          $scope.users = Pubnub.map(Pubnub.ngListPresence($scope.selectedChannel), function(x) {
            var newX;
            newX = x;
            if (x.replace) {
              newX = x.replace(/\w+__/, "");
            }
            if (x.uuid) {
              newX = x.uuid.replace(/\w+__/, "");
            }
            newData[newX] = userData[x] || {};
            return newX;
          });
          return $scope.userData = newData;
        });
      });

      Pubnub.ngHereNow({
        channel: $scope.selectedChannel
      });

      $rootScope.$on(Pubnub.ngMsgEv($scope.selectedChannel), function(ngEvent, payload) {
        var msg;
        msg = payload.message.user ? "[" + payload.message.user + "] " + payload.message.text : "[unknown] " + payload.message;
        return $scope.$apply(function() {
          return $scope.messages.unshift(msg);
        });
      });

      return Pubnub.ngHistory({
        channel: $scope.selectedChannel,
        auth_key: $scope.authKey,
        count: 500
      });
    };


    // Subscribe to retrieve channels from "control channel"
    Pubnub.ngSubscribe({
      channel: $scope.controlChannel
    });


    // Register for channel creation message events
    $rootScope.$on(Pubnub.ngMsgEv($scope.controlChannel), function(ngEvent, payload) {
      return $scope.$apply(function() {
        if ($scope.channels.indexOf(payload.message) < 0) {
          return $scope.channels.push(payload.message);
        }
      });
    });


    // Get a reasonable historical backlog of messages to populate the channels list
    Pubnub.ngHistory({
      channel: $scope.controlChannel,
      count: 500
    });

    // Create "Waiting Room" Channel
    $scope.newChannel = 'WaitingRoom';
    return $scope.createChannel();
  }]);
