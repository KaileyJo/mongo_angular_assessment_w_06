myApp.controller('SuperController', ['$scope', 'dataFactory', function($scope, dataFactory) {
    console.log('Super Controller');
    $scope.dataFactory = dataFactory;
    $scope.heroes = [];
    $scope.powers = [];

    var getHeroData = function() {
        dataFactory.getHeroes().then(function() {
            $scope.heroes = dataFactory.heroesList();
        });
    };

    var getPowerData = function() {
        dataFactory.getPowers().then(function() {
            $scope.powers = dataFactory.powersList();
        });
    };

    $scope.delete = function(id) {
        var deleteHero = confirm('Are you sure you want to delete this hero??');
        if (deleteHero == true) {
            dataFactory.deleteHero(id).then(function() {
                getHeroData();
            });
        }
    };

    getHeroData();
    getPowerData();
}]);