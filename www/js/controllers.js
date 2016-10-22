angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state, $ionicModal, System, UserService, $ionicPopup, $http) {
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
  $scope.showLogin = true;
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

  $scope.update = function () {
    var params = {
        method: 'PUT',
        url: 'http://cathay-pacific-146715.appspot.com/api/v1/users',
        headers: {
            'X-WALKER-ACCESS-TOKEN': UserService.getTokens()
        },
        data: $scope.updateUser
    }

    console.log($scope.params);
      
    $http(params).then(function(response){
        console.log(response);
    }, function(response){
        console.log(response);
    });
      
/*      
    $scope.api_call = new System.update(UserService.getTokens());

    $scope.params = $scope.updateUser;

    console.log($scope.params);
    $scope.api_call.save($scope.params, function(response){
        console.log(response);
    }, function(response){
        console.log(response);
    });
*/
  }
    
  $scope.searchBluetooth = function() {
    angular.element(document.getElementsByClassName('search-profile')).css('-webkit-animation', 'avatar 0.8s');
    $scope.isBluetoothConnected = true;

  };
})

.controller('ImmigrationCtrl', function($scope) {})

.controller('ChatroomCtrl', function($scope) {})

.controller('CateringCtrl', function($scope) {})

.controller('NotificationCtrl', function($scope) {})

.controller('BlackboxCtrl', function($scope) {})

.controller('RedemptionCtrl', function($scope, $ionicHistory) {
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
})
