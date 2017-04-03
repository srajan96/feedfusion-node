var movieApp = angular.module('MovieApp');

movieApp.controller('HomeCtrl', function ($scope, $analytics, $uibModal, $routeParams, $rootScope, MovieRootService) {

    $analytics.pageTrack('/Home');
    $scope.home = {};
    //if data-status == ready then take the html snapshot from phantomjs.
    //data-status tell if all the data has been loaded on the page or not.
    $rootScope.dataStatus = "not-ready";

    if ($routeParams.videoid) {
        $uibModal.open({
            templateUrl: 'ytubeModal',
            controller: 'YtubeModalCtrl',
            backdropClass: 'modal-backdrop',
            resolve: {
                items: function () {
                    return {
                        'videoId' : $routeParams.videoid,
                        'videoName' : null
                    };
                }
            }
        });
    }
    
    MovieRootService.getHomePageData().then(
        function (response) {
            $scope.home = response.data;
            console.log($scope.home);
            if($scope.home.inTheaters){
                $scope.home.inTheaters.reverse();
            }   
            if(response.data.seo){   
                $scope.seo.meta_keywords = response.data.seo.keywords;
                $scope.seo.meta_description = response.data.seo.description;
                $scope.seo.meta_title = response.data.seo.title;
            }
            $rootScope.dataStatus = "ready";
        },

        function (response) {
            $rootScope.dataStatus = "ready";
        }
    );

});

movieApp.filter("emptyToEnd", function () {
    return function (array, key) {
        if(!angular.isArray(array)) return;
        var present = array.filter(function (item) {
            return item[key];
        });
        var empty = array.filter(function (item) {
            return !item[key]
        });
        return present.concat(empty);
    };
});