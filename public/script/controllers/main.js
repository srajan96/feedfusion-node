var sohagApp = angular.module('SohagApp');

sohagApp.controller("RootController",function($rootScope,$location, $scope) {
  this.redirect = function(path){
    console.log('In redirect '+ path);
	  $location.path(path);
	
	
  }
  
});
