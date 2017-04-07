var sohagApp = angular.module('SohagApp',['ngRoute','satellizer','ngStorage','ui.bootstrap','ngtweet']);

sohagApp.config(function($routeProvider, $locationProvider, $authProvider,$httpProvider) {
$httpProvider.defaults.withCredentials = true;  
console.log('in config ');
  /*$locationProvider.html5Mode(true);
  $locationProvider.hashPrefix("!"); //Support for hasbangs url (SEO)
  */
  $routeProvider.
  when('/dashboard',{
    templateUrl : 'templates/dashboard.html',
    controller : 'HomeController as homectrl'
  }).
  when('/register',{
    templateUrl : 'templates/register.html',
    controller : 'RegisterController as regcntrl'
  }).
  when('/',{
    templateUrl : 'templates/login.html',
    controller : 'LoginController as logincntrl'
  }).        
  otherwise({
    redirectTo: '/'
  }) 


      $authProvider.facebook({
      clientId: '1978232082408711',
      redirectUri: window.location.origin+"/auth/facebook"
    });

 
    $authProvider.instagram({
      clientId: '84670ddd8cf849a1892ae52963ef53a9',
      redirectUri: window.location.origin+"/auth/instagram",
	  });
	     $authProvider.twitter({
      url: '/auth/twitter'
    });


 $authProvider.twitter({
  url: '/auth/twitter',
  authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
  redirectUri: window.location.origin,
  oauthType: '1.0',
  popupOptions: { width: 495, height: 645 }
 });
  

  
});

