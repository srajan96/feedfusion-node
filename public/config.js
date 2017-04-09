var sohagApp = angular.module('SohagApp',['ngRoute','satellizer','ngStorage','ui.bootstrap','ui-notification','ngtweet','ezfb']);


sohagApp.config(function (NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 5000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
    });
});

sohagApp.config(function(ezfbProvider) {
    // Set up FB
    ezfbProvider.setLocale('en_US');
    ezfbProvider.setInitParams({
        appId:'1978232082408711' // My FB APP ID
    });
});

sohagApp.config(function($routeProvider, $locationProvider, $authProvider,$httpProvider) {
console.log('in config ');
  /*$locationProvider.html5Mode(true);
  $locationProvider.hashPrefix("!"); //Support for hasbangs url (SEO)
  */
  $routeProvider.
  when('/dashboard',{
	resolve: {
                "check": function ($location, $sessionStorage, Notification) {
                    if (!$sessionStorage.loggedIn) {
                        $location.path('/login');
                        Notification.error({
                            message: "You must be logged in to access that URL"
                        })
                    }

                }
            },  
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

