"use strict";
var app

app = angular.module('spa-dashboard', []);


app.controller('DashboardController', function($scope, $http) {
  var controller = this
  $http({ method: 'GET', url: 'http://spa.tglrw.com:4000/users' }).
  success(function (data, status, headers, config) {
    controller.users = data
    controller.users_counter = controller.users.length;
  })
  $http({ method: 'GET', url: 'http://spa.tglrw.com:4000/widgets' }).
  success(function (data, status, headers, config) {
    controller.widgets = data;
    controller.widgets_counter = controller.widgets.length;
  })
});
