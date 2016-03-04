myApp.factory('dataFactory', ['$http', function($http) {
    var heroList = undefined;
    var powerList = undefined;

    var getHeroData = function() {
        console.log('Getting Data');
        var promise = $http.get('/heroes').then(function(response) {
            heroList = response.data;
            console.log('Async data response', heroList);
        });
        return promise;
    };

    var getPowerData = function() {
        console.log('Getting Power Data');
        var promise = $http.get('/powers').then(function(response) {
            powerList = response.data;
            console.log('Async power data response', powerList);
        });
        return promise;
    };

    var postHeroData = function(task) {
        var promise = $http.post('/heroes', task).then(function(response) {});
        return promise;
    };

    var deleteHeroData = function(id) {
        var promise = $http.delete('/heroes/' + id).then(function(response) {});
        return promise;
    };

    var publicApi = {
        getHeroes: function() {
            return getHeroData();
        },
        getPowers: function() {
            return getPowerData();
        },
        postHero: function(hero) {
            return postHeroData(hero);
        },
        deleteHero: function(id) {
            return deleteHeroData(id);
        },
        heroesList: function() {
            return heroList;
        },
        powersList: function() {
            return powerList;
        }
    };

    return publicApi;
}]);