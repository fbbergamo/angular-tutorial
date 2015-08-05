"use strict";
var app, users, widgets;

app = angular.module('spa-widgets', []);


app.controller('WidgetsController', function($scope, $routeParams ,$location, $anchorScroll, $http) {
  var controller = this
  controller.should_update_or_create = "Create Widget"
  if ($routeParams.id) {
    $http({ method: 'GET', url: 'http://spa.tglrw.com:4000/widgets/' + $routeParams.id }).
    success(function (data, status, headers, config) {
      controller.widgets = [data];
    });
    controller.is_show = true;
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
          //TODO: reload with a info message add with success
          }, function(response) {
            alert("error")
        });
    }
    else {
      $http.put('http://spa.tglrw.com:4000/widgets/'+  controller.form_widget.id, controller.form_widget).
        then(function(response) {
          //TODO: reload with a info message add with success
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
    //TODO: check why page is reloading
    $location.hash('form-update-or-create');
    $anchorScroll();
    $location.hash(old);
  }
});
