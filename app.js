var app = angular.module('spa', []);
users = [{"name":"Colin","id":1,"gravatar":"http://www.gravatar.com/avatar/a51972ea936bc3b841350caef34ea47e?s=64&d=monsterid"},{"name":"Kyle","id":2,"gravatar":"http://www.gravatar.com/avatar/432f3e353c689fc37af86ae861d934f9?s=64&d=monsterid"},{"name":"Thomas","id":3,"gravatar":"http://www.gravatar.com/avatar/48009c6a27d25ef0ea03f985d1f186b0?s=64&d=monsterid"},{"name":"James","id":4,"gravatar":"http://www.gravatar.com/avatar/9372f138140c8578c82bbc77b2eca602?s=64&d=monsterid"}];


widgets = [{"id":1,"name":"Losenoid2","color":"green","price":"9.00","inventory":25,"melts":true},{"id":2,"name":"Rowlow","color":"purple","price":"5.00","inventory":7,"melts":true}, {"id":3,"name":"Printure","color":"green","price":"5.53","inventory":18,"melts":false}, {"id":4,"name":"Claster","color":"white","price":"58.00","inventory":30,"melts":true}, {"id":5,"name":"Pepelexa","color":"purple","price":"0.99","inventory":1,"melts":false}]

app.controller('UsersController', function () {
  this.users = users
});

app.controller('WidgetsController', function () {
  this.widgets = widgets
});
