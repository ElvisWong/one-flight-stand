angular.module('starter.services', [])

.service('System', function($resource) {
    return {
        login: function () {
            return $resource('http://cathay-pacific-146715.appspot.com/api/v1/tokens');
        },
        register: function () {
            return $resource('http://cathay-pacific-146715.appspot.com/api/v1/users');
        }
    }
})

.service('UserService', function($resource){
    var user = null;
    
    return {
        getUser: function () {
            return user;
        },
        setUser: function (newUser) {
            user = newUser;
        }
    }
})

.service('TripService', function($resource){
    return{
        set: function (tokens) {
            return $resource('http://cathay-pacific-146715.appspot.com/api/v1/trips', {},
                             {headers: { 'X-WALKER-ACCESS-TOKEN': tokens }});
        }
    }
})