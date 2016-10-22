angular.module('starter.controllers', [])

.controller('StarterCtrl', function($scope) {

})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {

  $scope.login = function() {
    LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
          $state.go('home');
      }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
              title: 'Login failed!',
              template: 'Please check your credentials!'
          });
      });
  }
})

.controller('HomeCtrl', function($scope, $state, $ionicModal, LoginService, $ionicPopup) {
  // variables
  $scope.isBluetoothConnected = false;
  $scope.isMenuOpen = false;
  $scope.user = {username: 'Elvis Wong'};
  $scope.newUser = {};
  $scope.showLogin = true;
  $scope.modalTitle = "Login";
  $scope.hasLogin = true;

  // bluetoothSerial.available(function() {
  //   bluetoothSerial.enable(function() {
  //     bluetoothSerial.connect('', function() {
  //       console.log("successfully connected bluetooth!");
  //     }, function() {
  //       console.log("Error in connecting bluetooth!");
  //     });
  //     console.log("Bluetooth enabled!");
  //   }, function() {
  //     console.log("Bluetooth cannot enabled");
  //   });
  // },function() {
  //   console.log("Bluetooth are not available!");
  // });

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.navigateTo = function(state) {
    $state.go(state);
  };

  $scope.changeTo = function(title) {
    $scope.modalTitle = title;
    if (title === 'Login')
      $scope.showLogin = true;
    else
      $scope.showLogin = false;
  }
  $scope.login = function() {
    if (!$scope.hasLogin) {
      LoginService.loginUser($scope.user.username, $scope.user.password).success(function(data) {
          var successPopup = $ionicPopup.alert({
            title: 'Successful Login',
            template: 'Welcome, ' + data.name
          });
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    } else {
      $scope.modal.hide();
      $state.go('account');
    }
  };

  $scope.signUp = function(newUser) {
    $scope.newUser = newUser;
    $scope.modal.hide();
  };

  $scope.searchBluetooth = function() {
    angular.element(document.getElementsByClassName('search-profile')).css('-webkit-animation', 'avatar 0.8s');
    $scope.isBluetoothConnected = true;

  }
})

.controller('ImmigrationCtrl', function($scope) {
  $scope.data = {
    name: 'Elvis Wong',
    flight_number_to: 'UX001',
    flight_number_back: 'UX002',
    local_address: 'Room 406, UG Hall V, HKUST, Clear Water Bay, Kowloon, Hong Kong',
    foreign_address: '6127 Tudor Pl, Linden, NC, 28356',
    origin: 'Hong Kong',
    destination: 'USA',
    duration: '22/10/2016-29/10/2016',
    last_visit_country: 'Japan',
    next_visit_country: 'USA'
  };
})

.controller('ChatroomCtrl', function($scope) {})

.controller('CateringCtrl', function($scope) {})

.controller('NotificationCtrl', function($scope) {})

.controller('BlackboxCtrl', function($scope) {})

.controller('RedemptionCtrl', function($scope, $ionicHistory) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  // $scope.settings = {
  //   enableFriends: true
  // };
});
