angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state, $ionicModal, System, UserService, TripService, $ionicPopup, $http) {
  // variables
  $scope.isBluetoothConnected = false;
  $scope.isMenuOpen = false;
  $scope.user = {email: 'cykwongaa@connect.ust.hk', password: '123456'};
  $scope.newUser = {email: 'cykwongaa@connect.ust.hk', password: '123456'};
  $scope.currentUser = {};
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
  $scope.hasLogin = false;

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
    scope: $scope,
    focusFirstInput: true
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
        $scope.currentUser = response;
        $scope.hasLogin = true;
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

.controller('ImmigrationCtrl', function($scope, TripService, UserService, $http, $ionicHistory, $ionicPopup, $ionicModal) {
  $scope.data = {
    "access_token": null,
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
  $scope.openForm = false;
  $scope.qrcode_string = 'www.acesobee.com';
  $scope.size = 300;
  $scope.correctionLevel = '';
  $scope.typeNumber = 0;
  $scope.inputMode = '';
  $scope.image = true;

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

    console.log(params);

    $http(params).then(function(response){
        TripService.setTrip(response.data);
        console.log(response);
        console.log(response.data.access_token);
        //$scope.getTrip(response.data.access_token);
    }, function(response){
        console.log(response);
    });
  }

  $scope.getTrip = function () {
    $scope.qrcode_string = 'http://cathay-pacific-146715.appspot.com/trips/' + TripService.getTrip().uid + '?access_token=' + TripService.getTrip().access_token;
    $scope.openQRCode();
/*    
    var params = {
        method: 'GET',
        url: 'http://cathay-pacific-146715.appspot.com/api/v1/trips/' + TripService.getTrip().uid + '?access_token=' + TripService.getTrip().access_token,
        headers: {
            'X-WALKER-ACCESS-TOKEN': UserService.getUser().access_token
        },
    }

    console.log(params);
      
    $http(params).then(function(response){
        console.log(response);
    }, function(response){
        console.log(response);
    });
*/    
  };

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'fade-out'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openQRCode = function(index) {
    switch(index) {
      case 1: break;
      case 2: break;
      case 3: break;
      default:break;
    }
    $scope.modal.show();
  };

  $scope.checkFinished = function() {
    for(var key in $scope.data) {
      if (typeof $scope.data[key] === 'object') {
        for (var childKey in $scope.data[key]) {
          if ($scope.data[key][childKey] === undefined || $scope.data[key][childKey] === '' || $scope.data[key][childKey] === null)
            return true;
        }
      } else {
        if ($scope.data[key] === undefined || $scope.data[key] === '' || $scope.data[key] === null)
          return true;
      }
    }
    return false;
  };

  $scope.submitForm = function() {

  }

  $scope.goBack = function() {
    if ($scope.openForm)
      $scope.destroyForm();
    else
      $ionicHistory.goBack();
  };

  $scope.destroyForm = function() {
    var confirmPopup = $ionicPopup.confirm({
       title: 'Quit Immigration Paper',
       template: 'Are you sure you want to quit this form?'
     }).then(function(res) {
       if (res) {
         $scope.data = {};
         $scope.openForm = false;
       }
     });
  }

  $scope.createForm = function() {
    console.log("data: ", $scope.data);
    if ($scope.openForm) {
      $scope.destroyForm();
    } else
      $scope.openForm = !$scope.openForm;
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

.controller('AccountCtrl', function($scope, UserService, $ionicHistory) {
  $scope.user = UserService.getUser();

  $scope.goBack = function() {
    $ionicHistory.goBack();
  }
  // $scope.settings = {
  //   enableFriends: true
  // };
});
