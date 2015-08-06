"use strict";
var app

app = angular.module('spa-users', []);

app.controller('UserController', function($scope, $routeParams, $http, $rootScope) {
  $http({ method: 'GET', url: $rootScope.route_api('users/' + $routeParams.id) }).
  success(function (data, status, headers, config) {
    $scope.users = [data];
  })
});

app.controller('UsersController', function($scope, $http, $rootScope) {
  var controller = this
  $http({ method: 'GET', url: $rootScope.route_api('users') }).
  success(function (data, status, headers, config) {
    $scope.users = data;
  })
});
