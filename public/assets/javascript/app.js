"use strict";
var app, users, widgets;

app = angular.module('spa', ["ngRoute", "spa-users", "spa-widgets", "spa-dashboard"]);

app.config([
  '$routeProvider',  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'dashboard.html'
    }).when('/users', {
      templateUrl: 'users.html',
      controller: 'UsersController'
    }).when('/users/:id', {
      templateUrl: 'users.html',
      controller: 'UserController'
    }).when('/widgets/:id', {
      templateUrl: 'widgets.html',
      controller: 'WidgetsController'
    }).when('/widgets', {
      templateUrl: 'widgets.html',
      controller: 'WidgetsController'
    });
  }
]);

app.run(function($route, $rootScope) {
    $rootScope.path = function(controller, params) {
        for (var path in $route.routes) {
            var pathController = $route.routes[path].controller;
            if (pathController == controller) // Route found
            {
                var result = path;
                for (var param in params) {
                    result = result.replace(':' + param, params[param]);
                }
                return "#" + result;
            }
        }
        return undefined;
    };
});
