angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state, $ionicModal, System, UserService, TripService, $ionicPopup, $http) {
  // variables
  $scope.isBluetoothConnected = false;
  $scope.isMenuOpen = false;
  $scope.user = {email: 'cykwongaa@connect.ust.hk', password: '123456'};
  $scope.newUser = {email: 'cykwongaa@connect.ust.hk', password: '123456'};
  $scope.updateUser = {
      'firstname': 'CY',
      'lastname': 'Kwong',
      'nationality': null,
      'date_of_birth': null,
      'passport_number': null,
      'visa_number': null,
      'gender': null,
      'address': 'Hong Kong'
  };
    
  $scope.trip = {
    "flight_number_to": null,
    "foreign_address": null,
    "update_time": "2016-10-22T10:09:27.500811",
    "user_info": {},
    "create_time": "2016-10-22T10:09:27.500785",
    "from_date": null,
    "destination": null,
    "to_date": null,
    "owner": 5629499534213120,
    "uid": 5891733057437696,
    "flight_number_back": null,
    "last_visit_country": null,
    "next_visit_country": null
  };

  $scope.showLogin = true;
  $scope.modalTitle = "Login";
  $scope.hasLogin = true;
    
  $scope.qrcode_string = 'www.acesobee.com';
  $scope.size = 150;
  $scope.correctionLevel = '';
  $scope.typeNumber = 0;
  $scope.inputMode = '';
  $scope.image = true;

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
        UserService.setUser(response);
        $scope.modal.hide();
    });
  };

  $scope.signUp = function() {
    console.log('$scope.signup()');
    $scope.api_call = new System.register();

    $scope.params = $scope.newUser;

    $scope.api_call.save($scope.params, function(response){
        console.log(response);
        UserService.setUser(response);
        $scope.user = $scope.newUser;
        $scope.login();
    });
  };

  $scope.update = function () {
    var params = {
        method: 'PUT',
        url: 'http://cathay-pacific-146715.appspot.com/api/v1/users',
        headers: {
            'X-WALKER-ACCESS-TOKEN': UserService.getUser().access_token
        },
        data: $scope.updateUser
    }

    console.log($scope.params);
      
    $http(params).then(function(response){
        console.log(response);
    }, function(response){
        console.log(response);
    });
  }
  
  $scope.searchBluetooth = function() {
    angular.element(document.getElementsByClassName('search-profile')).css('-webkit-animation', 'avatar 0.8s');
    $scope.isBluetoothConnected = true;
  };
})

.controller('ImmigrationCtrl', function($scope, TripService, UserService, $http) {
  $scope.data = {
    "flight_number_to": null,
    "foreign_address": null,
    "update_time": "2016-10-22T10:09:27.500811",
    "user_info": null,
    "create_time": "2016-10-22T10:09:27.500785",
    "from_date": null,
    "destination": null,
    "to_date": null,
    "owner": 5629499534213120,
    "uid": 5891733057437696,
    "flight_number_back": null,
    "last_visit_country": null,
    "next_visit_country": null
  };

  $scope.init = function () {
      $scope.setTrip();
  }
    
  $scope.setTrip = function () {
      
    $scope.trip = $scope.data;
    $scope.trip.user_info = UserService.getUser();
    
    var params = {
        method: 'POST',
        url: 'http://cathay-pacific-146715.appspot.com/api/v1/trips',
        headers: {
            'X-WALKER-ACCESS-TOKEN': UserService.getUser().access_token
        },
        data: $scope.trip
    }

    console.log($scope.params);
      
    $http(params).then(function(response){
        console.log(response);
    }, function(response){
        console.log(response);
    });
  }
  
  $scope.getTrip = function () {
      
  }
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
