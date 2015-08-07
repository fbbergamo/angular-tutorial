"use strict";
var app

app = angular.module('spa-dashboard', []);


app.controller('DashboardController', function($scope, $http, $rootScope) {
  var controller = this
  $http({ method: 'GET', url: $rootScope.route_api('users')}).
  success(function (data, status, headers, config) {
    controller.users = data
    controller.users_counter = controller.users.length;
  })
  $http({ method: 'GET', url: $rootScope.route_api('widgets')}).
  success(function (data, status, headers, config) {
    controller.widgets = data;
    controller.widgets_counter = controller.widgets.length;
  })
});
