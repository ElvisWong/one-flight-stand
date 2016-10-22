angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state, $ionicModal, System, UserService, TripService, $ionicPopup, $http) {
  // variables
  $scope.isBluetoothConnected = false;
  $scope.isMenuOpen = false;
  $scope.user = {email: 'cykwongaa@connect.ust.hk', password: '123456'};
  $scope.newUser = {email: 'cykwongaa@connect.ust.hk', password: '123456'};
  $scope.currentUser = {};

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
  $scope.isLogin = false;
  $scope.modalTitle = "Login";

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

    System.showLoading();
    $scope.api_call.save($scope.params, function(response){
        System.hideLoading();
        console.log(response);
        UserService.setUser(response);
        $scope.currentUser = response;
        System.setLogin();
        $scope.isLogin = true;
        $scope.modal.hide();
    });
  };

  $scope.signUp = function() {
    console.log('$scope.signup()');
    $scope.api_call = new System.register();

    $scope.params = $scope.newUser;

    System.showLoading();
    $scope.api_call.save($scope.params, function(response){
        System.hideLoading();
        console.log(response);
        UserService.setUser(response);
        $scope.user = $scope.newUser;
        $scope.login();
    });
  };

  $scope.searchBluetooth = function() {
    angular.element(document.getElementsByClassName('search-profile')).css('-webkit-animation', 'avatar 0.8s');
    $scope.isBluetoothConnected = true;
  };
})

.controller('ImmigrationCtrl', function($scope, TripService, UserService, System, $http, $ionicHistory, $ionicPopup, $ionicModal) {
  $scope.data = {
    "access_token": null,
    "flight_number_to": null,
    "foreign_address": null,
    "update_time": "2016-10-22T10:09:27.500811",
    "user_info": null,
    "create_time": "2016-10-22T10:09:27.500785",
    "from_date": null,
    "destination": 'TH',
    "to_date": null,
    "owner": 5629499534213120,
    "uid": 5891733057437696,
    "flight_number_back": null,
    "last_visit_country": null,
    "next_visit_country": null
  };
  $scope.openForm = false;
  $scope.isLoading = false;
  $scope.qrcode_string = 'www.acesobee.com';
  $scope.size = 250;
  $scope.correctionLevel = '';
  $scope.typeNumber = 0;
  $scope.inputMode = '';
  $scope.image = true;
  
  $scope.trip_list_data = [];
  $scope.isLogin = System.getIsLogin();

  $scope.init = function () {
      if($scope.isLogin)
          $scope.getTripList();
  }

  $scope.setTrip = function () {

    if(!$scope.isLogin){
        return;
    }
      
    $scope.trip = $scope.data;
    if($scope.isLogin){
        $scope.trip.user_info = UserService.getUser();

        var params = {
            method: 'POST',
            url: 'http://cathay-pacific-146715.appspot.com/api/v1/trips',
            headers: {
                'X-WALKER-ACCESS-TOKEN': UserService.getUser().access_token
            },
            data: $scope.trip
        }
    }
    else{
        $scope.trip.user_info = {};
        console.log($scope.trip.user_info);
        var params = {
            method: 'POST',
            url: 'http://cathay-pacific-146715.appspot.com/api/v1/trips',
            data: $scope.trip
        }
    }
    console.log(params);

    $scope.isLoading = true;
    System.showLoading();
    $http(params).then(function(response){
        TripService.setTrip(response.data);
        console.log(response);
        console.log(response.data.access_token);
        if($scope.isLogin)
            $scope.getTripList();
        else
            $scope.trip_list_data.push(response.data);
        System.hideLoading();
        $scope.isLoading = false;
    }, function(response){
        console.log(response);
    });
  }

  $scope.getTripList = function () {
    if(!$scope.isLogin){
        return;
    }
    var params = {
        method: 'GET',
        url: 'http://cathay-pacific-146715.appspot.com/api/v1/trips',
        headers: {
            'X-WALKER-ACCESS-TOKEN': UserService.getUser().access_token
        },
    }

    console.log(params);
      
    $scope.isLoading = true;
    System.showLoading();
    $http(params).then(function(response){
        console.log('getTripList:');
        console.log(response);
        $scope.trip_list_data = response.data.results;
        console.log($scope.trip_list_data);
        System.hideLoading();
        $scope.isLoading = false;
    }, function(response){
        console.log(response);
    });
  }
  
  $scope.getTrip = function (data) {
    $scope.temp_string = 'http://cathay-pacific-146715.appspot.com/trips/' + data.uid + '?access_token=' + data.access_token;
      
    var params = {
        method: 'POST',
        url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyC4fJd2cD8r4sQfTh8CccyzyoFXDT80glg',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            'longUrl': $scope.temp_string
        }
    }

    console.log(params);
      
    $http(params).then(function(response){
        console.log(response);
        $scope.qrcode_string = response.data.id;
    }, function(response){
        console.log(response);
    });
      
    //$scope.qrcode_string = 'http://cathay-pacific-146715.appspot.com/trips/' + data.uid + '?access_token=' + data.access_token;
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
    
  $scope.openQRCodeLink = function () {
      window.open($scope.qrcode_string);
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'fade-out'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openQRCode = function() {
    $scope.modal.show();
  };
    
  $scope.closeQRCode = function () {
    $scope.modal.hide();
  }

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

.controller('AccountCtrl', function($scope, UserService, $ionicHistory, $http) {
  $scope.user = UserService.getUser();
  $scope.date = new Date('1911-11-11 00:00:00');
  $scope.updateUser = {
      'firstname': 'CY',
      'lastname': 'Kwong',
      'nationality': 'TH',
      'date_of_birth': $scope.date.getTime() / 1000,
      'passport_number': '12345678',
      'visa_number': '999',
      'gender': 'male',
      'address': 'Hong Kong'
  };

  console.log($scope.user);
    
  $scope.goBack = function() {
    $ionicHistory.goBack();
  }
  
  $scope.update = function () {
    var params = {
        method: 'PUT',
        url: 'http://cathay-pacific-146715.appspot.com/api/v1/users',
        headers: {
            'X-WALKER-ACCESS-TOKEN': UserService.getUser().access_token
        },
        data: $scope.updateUser
    };

    console.log(params);

    $http(params).then(function(response){
        console.log(response);
        UserService.setUser(response.data);
        $scope.user = response.data;
    }, function(response){
        console.log(response);
    });
  }

  // $scope.settings = {
  //   enableFriends: true
  // };
});
