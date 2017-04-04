var sohagApp = angular.module('SohagApp');

sohagApp.controller('HomeController', function ($scope, $routeParams, $rootScope, SohagRootService,$auth,$uibModal,$timeout,$sessionStorage) {
    console.log('in home controller');
    $scope.home = {};
    $scope.tab=0;
    $scope.dataStatus="not-ready";
	$scope.username=$sessionStorage.username;
    $scope.flipped="false";
	$scope.tweetid={
		
  "1": "848631648505679872",
  "2": "848627670271348741",
  "3": "848627062248271876",
  "4": "848627055667236864",
  "5": "848626965636665345",
  "6": "848621266651287552",
  "7": "848618040598159360",
  "8": "848611687703994368",
  "9": "848611524016914432",
  "10": "848608504181014529",
  "11": "848608249653805060",
  "12": "848603489207017474",
  "13": "848602842537447424",
  "14": "848597163131129856",
  "15": "848595897088962564",
  "16": "848595663394918401",
  "17": "848595660253274112",
  "18": "848589677653245953",
  "19": "848588954949517313",
  "20": "848585328227110912"

	};
	//$scope.tweetid=[];
	
	console.log($scope.tweetid);
    $scope.setTab = function(tabIn){
      $scope.tab = tabIn;
    };

    $scope.isSet = function(tabIn){
      return $scope.tab === tabIn;
    };
    SohagRootService.getHomePageData().then(
        function (response) {
            $scope.tweetid = response.data;
			console.log($scope.tweetid);
            console.log("loading home data");
			//$timeout(function() {
				//$scope.tweetid = response.data;
			//	console.log($scope.tweetid);
			//},0);
			//$scope.$digest();
        },
        function (response) {
            console.log("loading home ....");
            console.log(response);
        }

    );
    
    $scope.authenticate = function(provider) {
       console.log("in authenticate"); 
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/');
        });
    };
	
	
	
	
	
	
	$scope.manageAccount = function () {
        console.log("in manage account ");
        $uibModal.open({
            templateUrl: 'accountModal.html',
            controller: 'accountModalCtrl',
            backdropClass: 'modal-backdrop',
        });
    }
	$scope.changePassword = function () {
        console.log("Changing Password ");
        $uibModal.open({
            templateUrl: 'passwordModal.html',
            controller: 'passwordModalCtrl',
            backdropClass: 'modal-backdrop',
        });
    }
	
    $scope.logout = function(){
        console.log("Checking");
            SohagRootService.logout().then(
                function (response) {
					$sessionStorage.sessionId="";
					$sessionStorage.username="";
					
					$scope.rootctrl.redirect("/");

			    },
                function (response) {
					console.log("error in logout");
				}

            );
            
            
        
       
    };
	
		

});


















sohagApp.controller('passwordModalCtrl',function($scope, SohagRootService, $route, $sessionStorage,$rootScope, $uibModalInstance){
    
	
	$scope.repasshelp="done";
    $scope.repasshelpstyle={
        "visibility":"hidden",
        "font-size": "15px",
        "font-weight":"bold"
    };
    
    $scope.userdata={
        curpass:"",
        pass:"",
        repass:""
    };
	$scope.verifypass=function(){
		console.log("in verify pass");
		var passfield=$scope.userdata.pass;
		var repassfield=$scope.userdata.repass;
    
		$scope.repasshelpstyle.visibility="visible";
		if(passfield.value!==""){
			if(passfield===repassfield ){
				$scope.repasshelp="Passwords match!! Good to go!";
				$scope.repasshelpstyle={
					"font-size":"15px",
					"color":"black",
					"font-weight":"bold"
				};
				if(passfield.length<8){
					$scope.repasshelp="Password length less than 8 characters!!";
					$scope.repasshelpstyle={
						"font-size":"15px",
						"color":"orange",
						"font-weight":"bold"
					};

					return false;
				}
					
				return true;
			}
			else{

				$scope.repasshelp="Passwords don't match!!";
				$scope.repasshelpstyle={
					"font-size":"15px",
					"color":"orange",
					"font-weight":"bold"
				};

				return false;
			}
		}
	};
	$scope.update=function(){
		var check=$scope.verifypass();
		if(check){
			  SohagRootService.updateUser($scope.userdata).then(
                function (response) {
					console.log(response.data)
                    $scope.userres = response.data;
                    console.log("loading user response data");
                    console.log($scope.userres);
					if($scope.userres==="\"true\""){
						//$scope.rootctrl.redirect("/dashboard");
						$uibModalInstance.dismiss('cancel');
						$route.reload();
					}
					else if($scope.userres==="\"false\"")
						$scope.repasshelp="Wrong password";
					else{
						$scope.repasshelp="Sessionid error.Redirecting";
						$scope.rootctrl.redirect("/");
					}
						
						
                },
                function (response) {
					$scope.repasshelp="error";
					console.log("loading error of login");
                    console.log(response);
					
                }

            );
		}
		else
			return false;
	}
    $scope.close = function(){
        $uibModalInstance.dismiss('cancel');
        $route.reload();
    }
    $scope.ok = function () {
        $uibModalInstance.close($scope);
        $route.reload();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
});





sohagApp.controller('accountModalCtrl',function($scope, SohagRootService, $route, $sessionStorage,$rootScope, $uibModalInstance,$auth){
    
	$scope.authenticate = function(provider) {
       console.log("in authenticate"); 
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider + '!');
          $location.path('/');
        });
    };
	
    $scope.close = function(){
        $uibModalInstance.dismiss('cancel');
        $route.reload();
    }
    $scope.ok = function () {
        $uibModalInstance.close($scope);
        $route.reload();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
});
