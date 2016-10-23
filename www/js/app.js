// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'ngResource', 'ja.qr', 'monospaced.elastic', 'angularMoment'])

.run(function($ionicPlatform, $timeout, $cordovaDialogs) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $timeout(function() {
      bluetoothSerial.isEnabled(function() {
        $cordovaDialogs.alert("Bluetooth LE is enabled", "Bluetooth LE", "GREAT!");
      }, function() {
         $cordovaDialogs.alert("Bluetooth LE is NOT enabled", "Bluetooth LE", "Oops!");
      });
    }, 750);

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$ionicConfigProvider', function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // values: top, bottom
}])


.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Starter page
  .state('starter', {
    url: '/starter',
    templateUrl: 'templates/starter.html',
    controller: 'StarterCtrl'
  })

  // Home page - check for bluetooth connection and connect to airplane
  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'HomeCtrl'
  })

  .state('account', {
    url: '/account',
    templateUrl: 'templates/account.html',
    controller: 'AccountCtrl'
  })

  .state('immigration', {
    url: '/immigration',
    templateUrl: 'templates/immigration.html',
    controller: 'ImmigrationCtrl'
  })

  .state('chatroom', {
    url: '/chatroom',
    templateUrl: 'templates/chatroom.html',
    controller: 'ChatroomCtrl'
  })

  .state('catering', {
    url: '/catering',
    templateUrl: 'templates/catering.html',
    controller: 'CateringCtrl'
  })

  .state('notification', {
    url: '/notification',
    templateUrl: 'templates/notification.html',
    controller: 'NotificationCtrl'
  })

  .state('blackbox', {
    url: '/blackbox',
    templateUrl: 'templates/blackbox.html',
    controller: 'BlackboxCtrl'
  })

  .state('redemption', {
    url: '/redemption',
    templateUrl: 'templates/redemption.html',
    controller: 'RedemptionCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('chats', {
      url: '/chats',
      templateUrl: 'templates/tab-chats.html',
      controller: 'ChatsCtrl'

    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

});
