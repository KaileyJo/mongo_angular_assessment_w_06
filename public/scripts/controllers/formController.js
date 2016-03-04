myApp.controller('FormController', ['$scope', 'dataFactory', function($scope, dataFactory) {
    console.log('Form Controller');
    $scope.dataFactory = dataFactory;
    $scope.powers = function() {
        dataFactory.getPowers().then(function(response){
            console.log(response);
        });
    };

    var getPowerData = function() {
        dataFactory.getPowers().then(function() {
            $scope.powers = dataFactory.powersList();
        });
    };

    $scope.submitHero = function() {
        var newHero = {
            alias: $scope.alias,
            first: $scope.first,
            last: $scope.last,
            city: $scope.city,
            power: $scope.power.power_name
        };
        dataFactory.postHero(newHero).then(function() {
            $scope.alias = '';
            $scope.first = '';
            $scope.last = '';
            $scope.city = '';
            $scope.power = '?';
        });
    };

    getPowerData();
}]);