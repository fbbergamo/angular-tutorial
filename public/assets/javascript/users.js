"use strict";
var app

app = angular.module('spa-users', []);

app.controller('UserController', function($scope, $routeParams, $http) {
  $http({ method: 'GET', url: 'http://spa.tglrw.com:4000/users/' + $routeParams.id }).
  success(function (data, status, headers, config) {
    $scope.users = [data];
  })
});

app.controller('UsersController', function($scope, $http) {
  var controller = this
  $http({ method: 'GET', url: 'http://spa.tglrw.com:4000/users' }).
  success(function (data, status, headers, config) {
    $scope.users = data;
  })
});
