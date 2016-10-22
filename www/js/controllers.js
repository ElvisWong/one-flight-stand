angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state, $ionicModal, System, UserService, $ionicPopup) {
  // variables
  $scope.isBluetoothConnected = false;
  $scope.isMenuOpen = false;
  $scope.user = {email: 'cykwongaa@connect.ust.hk', password: '123456'};
  $scope.newUser = {email: 'cykwongaa@connect.ust.hk', password: '123456'};
  $scope.updateUser = {
      'firstname': null,
      'lastname': null,
      'nationality': null,
      'date_of_birth': null,
      'passport_number': null,
      'visa_number': null,
      'gender': null,
      'address': null,
  };
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
  };

  $scope.login = function() {
    console.log('$scope.login()');
    $scope.api_call = new System.login();

    $scope.params = $scope.user;

    console.log($scope.params);

    $scope.api_call.save($scope.params, function(response){
        console.log(response);
        UserService.setTokens(response.access_token);
        $scope.modal.hide();
    });
  };

  $scope.signUp = function() {
    console.log('$scope.signup()');
    $scope.api_call = new System.register();

    $scope.params = $scope.newUser;

    $scope.api_call.save($scope.params, function(response){
        console.log(response);
        UserService.setTokens(response.access_token);
        $scope.user = $scope.newUser;
        $scope.login();
    });
  };

/*
    $scope.update = function () {
    $scope.api_call = new System.update();

    $scope.params = $scope.updateUser;

    $scope.api_call.save($scope.params, function(response){
        console.log(response);
    });
  }
*/
  $scope.searchBluetooth = function() {
    angular.element(document.getElementsByClassName('search-profile')).css('-webkit-animation', 'avatar 0.8s');
    $scope.isBluetoothConnected = true;

  };
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
  $scope.user = {
    username: 'Elvis Wong',
    jobTitle: 'JS Developer',
    email: 'tywongao@gmail.com'
  };
  // $scope.settings = {
  //   enableFriends: true
  // };
});
