var userApp = angular.module('userApp', []);

userApp.controller('UserCtrl', ['$scope', '$http',
  function UserCtrl($scope, $http) {
    $http.get('/users.json').success(function(data) {
      $scope.users = data;
    });
  }]);
