"use strict";
var app, users, widgets;

app = angular.module('spa-widgets', []);

app.controller('WidgetsController', function($scope, $routeParams ,$location, $anchorScroll, $http, $rootScope) {
  var controller = this

  this.reset_form = function() {
    controller.form_widget = {};
    controller.should_update_or_create = "Create Widget"
  }

  this.load_widgets = function (widget_id) {
    if (widget_id) {
      $http({ method: 'GET', url: $rootScope.route_api('widgets/' + widget_id) }).
      success(function (data, status, headers, config) {
        controller.widgets = [data];
      });
      controller.is_show = true;
    }
    else {
      $http({ method: 'GET', url: $rootScope.route_api('widgets') }).
      success(function (data, status, headers, config) {
        controller.widgets = data;
      })
      controller.is_show = false;
    }
  }

  this.submit = function(){
    if (controller.form_widget.id == null) {
      $http.post($rootScope.route_api('widgets'), controller.form_widget).
        then(function(response) {
          controller.load_widgets(null);
          }, function(response) {
            alert("error")
        });
    }
    else {
      var widget_id = controller.form_widget.id
      $http.put($rootScope.route_api('widgets/'+  widget_id), controller.form_widget).
        then(function(response) {
          controller.load_widgets(widget_id);
          }, function(response) {
            alert("error")
        });
    }
    controller.reset_form();
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
    var old = $location.hash();
    controller.reset_form();
    $location.hash('form-update-or-create');
    $anchorScroll();
    $location.hash(old);
  }

  controller.reset_form();
  controller.load_widgets($routeParams.id);
});
