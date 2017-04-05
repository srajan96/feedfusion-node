var sohagApp = angular.module('SohagApp',['ngRoute','satellizer','ngStorage','ui.bootstrap','ngtweet']);

sohagApp.config(function($routeProvider, $locationProvider, $authProvider) {
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
  when('/auth/:provider',{
    templateUrl : 'templates/dashboard.html',
    controller : 'HomeController as homectrl'
  }).        
  otherwise({
    redirectTo: '/'
  }) 


      $authProvider.facebook({
      clientId: '657854390977827'
    });

 
    $authProvider.instagram({
      clientId: '84670ddd8cf849a1892ae52963ef53a9',
      redirectUri: window.location.origin+"/instagram"
    });

 $authProvider.twitter({
  url: '/auth/twitter',
  authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
  redirectUri: window.location.origin,
  oauthType: '1.0',
  popupOptions: { width: 495, height: 645 }
 });
  

  
});

