// App module

var userApp = angular.module('userApp', [
  'ngRoute',
  'userControllers',
  'userServices'
]);

userApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
        when('/users', {
          templateUrl: 'list.html',
          controller: 'ListCtrl'
        }).
        when('/users/:id', {
          templateUrl: 'show.html',
          controller: 'ShowCtrl'
        }).
        when('/new', {
          templateUrl: 'new.html',
          controller: 'NewCtrl'
        }).
        when('/users/:id/edit', {
          templateUrl: 'edit.html',
          controller: 'EditCtrl'
        }).
        otherwise({
          redirectTo: '/users'
        })
  }
]);

// Controllers
var userControllers = angular.module('userControllers', []);

userControllers.
    controller('ListCtrl', ['$scope', 'User', '$location',
      function ListCtrl($scope, User, $location) {
        $scope.deleteUser = function (id) {
          User.delete({ id: id });
          $scope.users = User.query();
        };

        $scope.users = User.query();
        $scope.orderProp = 'id';
      }]).
    controller('ShowCtrl', ['$scope', '$routeParams', 'User', '$location',
      function ShowCtrl($scope, $routeParams, User, $location) {
        $scope.deleteUser = function (id) {
          User.delete({ id: id });
          $location.path('/users');
        };
        $scope.user = User.get({id: $routeParams.id})
      }]).
    controller('NewCtrl', ['$scope', 'User', '$location',
      function NewCtrl($scope, User, $location) {
        $scope.createNewUser = function () {
          User.create($scope.user);
          $location.path('/users');
        };
        $scope.user = {};
      }]).
    controller('EditCtrl', ['$scope', '$routeParams', 'User', '$location',
      function EditCtrl($scope, $routeParams, User, $location) {
        $scope.updateUser = function () {
          User.update($scope.user);
          $location.path('/users');
        };

        $scope.user = User.get({id: $routeParams.id})
      }]);

// Service
var userServices = angular.module('userServices', ['ngResource']);

userServices.factory('User', ['$resource',
  function ($resource) {
    return $resource('users/:id.json', {}, {
      query: {method: 'GET', params: {}, isArray: true},
      create: {method: 'POST' },
      update: {method: 'PUT', params: {id: '@id'}},
      delete: {method: 'DELETE', params: {id: '@id'}}
    });
  }]);
