"use strict";
var app, users, widgets;

app = angular.module('spa', ["ngRoute"]);

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

app.controller('UserController', function($scope, $routeParams, $http) {
  $http({ method: 'GET', url: 'http://spa.tglrw.com:4000/users/' + $routeParams.id }).
  success(function (data, status, headers, config) {
    $scope.users = [data];
  })
});


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

app.controller('UsersController', function($scope, $http) {
  var controller = this
  $http({ method: 'GET', url: 'http://spa.tglrw.com:4000/users' }).
  success(function (data, status, headers, config) {
    $scope.users = data;
  })
});


app.controller('WidgetsController', function($scope, $routeParams ,$location, $anchorScroll, $http) {
  var controller = this
  controller.should_update_or_create = "Create Widget"
  if ($routeParams.id) {
    $http({ method: 'GET', url: 'http://spa.tglrw.com:4000/widgets/' + $routeParams.id }).
    success(function (data, status, headers, config) {
      controller.widgets = [data];
    })
    controller.is_show = true
  }
  else {
    $http({ method: 'GET', url: 'http://spa.tglrw.com:4000/widgets/' }).
    success(function (data, status, headers, config) {
      controller.widgets = data;
    })
    controller.is_show = false;
  }
  controller.form_widget = {};

  this.submit = function(){
    if (controller.form_widget.id == null) {
      $http.post('http://spa.tglrw.com:4000/widgets', controller.form_widget).
        then(function(response) {
          //reload with a info message add with success
          }, function(response) {
            alert("error")
        });
    }
    else {
      $http.put('http://spa.tglrw.com:4000/widgets/'+  controller.form_widget.id, controller.form_widget).
        then(function(response) {
          //reload with a info message add with success
          }, function(response) {
            alert("error")
        });
    }
    controller.form_widget = {}
  };

  this.build_update_form = function(widget) {
    var old = $location.hash();
    this.form_widget = angular.copy(widget);
    this.should_update_or_create = "Update Widget / ID: " + widget.id;
    $location.hash('form-update-or-create');
    $anchorScroll();
    $location.hash(old);
  };

  this.build_create_form = function() {
    this.form_widget = {};
    this.should_update_or_create = "Create Widget";
    $location.hash('form-update-or-create');
    $anchorScroll();
    $location.hash(old);
  }
});

app.run(function($route, $rootScope)
{
  $rootScope.path = function(controller, params)
  {
    for(var path in $route.routes)
    {
      var pathController = $route.routes[path].controller;

      if(pathController == controller) // Route found
      {
        var result = path;
        for(var param in params)
        {
          result = result.replace(':' + param, params[param]);
        }
        return "#"+result;
      }
    }
    return undefined;
  };
});
