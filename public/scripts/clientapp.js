var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/form', {
            templateUrl: '/views/templates/form.html',
            controller: 'FormController'
        })
        .when('/heroes', {
            templateUrl: '/views/templates/heroes.html',
            controller: 'SuperController'
        })
        .otherwise({
            redirectTo: 'form'
        });
}]);