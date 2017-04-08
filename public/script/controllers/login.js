var sohagApp = angular.module('SohagApp');

sohagApp.controller('LoginController', function ($scope, $routeParams, $rootScope, $sessionStorage, SohagRootService, Notification) {
    console.log('in login controller');
    $scope.userdata={
        username:"",
        password:""
    };
    $scope.isUserinfo = function(){
        
    };
    $scope.login = function(){
        console.log("Checking");
        if($scope.userdata.username!=="" &&$scope.userdata.password!==""){
            console.log("redirecting");
            SohagRootService.getLoginData($scope.userdata).then(
                function (response) {
					console.log(response.data)
                    $scope.userres = response.data;
                    console.log("loading user response data");
                    console.log($scope.userres);
					if($scope.userres.login_correct==true){
							Notification.success({
								message: "Login Successfull.",
								delay:1000
							});
							$sessionStorage.sessionId = response.data.sessionid;
							$sessionStorage.username=$scope.userdata.username;
							$sessionStorage.loggedIn=true;
							$scope.rootctrl.redirect("/dashboard");

					}
					else
						Notification.error({
                            message: "Wrong Credentials.Please try again."
						});
                },
                function (response) {
					Notification.error({
                            message: "Error:"+response
						});
                    console.log("loading error of login");
                    console.log(response);
                }

            );
            
            
        }
       
    };
    
    
   
});

sohagApp.controller('RegisterController', function ($scope, $routeParams, $rootScope, SohagRootService, Notification) {
    console.log('in register controller');
    $scope.repasshelp="";
    $scope.repasshelpstyle={
        "visibility":"hidden",
        "font-size": "15px",
        "font-weight":"bold"
    };
    
    $scope.userdata={
        name:"a",
        email:"a@a.c",
        username:"a",
        pass:"asdasdas",
        repass:"asdasdas"
    };
    $scope.isUserinfo = function(){
        
    };
      //function to allow only alphabets
    $scope.allowOnlyAlphabets=function(element){
    var content=element;
    var regex = /^[a-zA-Z]*$/;

    if (regex.test(content)){
      
      return true;
  } else {

      return false;
  }

};
 
    $scope.verifypass=function(){
    var passfield=$scope.userdata.pass;
    var repassfield=$scope.userdata.repass;
    
    $scope.repasshelpstyle.visibility="visible";
    if(passfield.value!==""){
         if(passfield===repassfield ){
         $scope.repasshelp="Passwords match!! Good to go!";
         $scope.repasshelpstyle={
            "font-size":"15px",
            "color":"white",
            "font-weight":"bold"
        };
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
    
    $scope.checkregister = function(){
        console.log("Checking");
        var checkpass=$scope.verifypass();

        if(checkpass){
            var str=$scope.userdata.username;
            if($scope.allowOnlyAlphabets($scope.userdata.name)){
                if($scope.userdata.pass.length<8){
                  //alert("Password should be greater than 8 characters");
                Notification.error({
					message: "Password should be greater than 8 characters"
				});
				  return false;
                }
                return true;
            }
            else{
                //alert("Name cannot contain numbers!!");
                Notification.error({
					message: "Name cannot contain numbers!!"
				});
				return false;
              }
        }
		Notification.error({
			message: "Password does not match"
		});
        return false;
    };
   /* $scope.register=function(){
        var check=$scope.checkregister();
        console.log("loading user ");
        if(check){
            SohagRootService.registerUser($scope.userdata).then(
                function (response) {
                    $scope.userres = response.data;
                    console.log("loading user response data");
                    console.log($scope.userres);
                    $scope.rootctrl.redirect("/dashboard");
                },
                function (response) {
                    console.log("loading error of register");
                    console.log(response);
                }

            );

        }
    };
    */
    $scope.register = function(){
        console.log("Checking");
		var check=$scope.checkregister();
        /*Notification.error({
			message: "Check:"+check
		});
		*/
        if(check){  
			console.log("redirecting");
            SohagRootService.registerUser($scope.userdata).then(
                function (response) {
					console.log(response.data)
                    $scope.userres = response.data;
                    console.log("loading user response data");
                    console.log($scope.userres);
					if($scope.userres=="true"){
						Notification.success({
							message: "Registration Successfull.Please login to continue."
						});
						$scope.rootctrl.redirect("/");
					
					}
					else{
						console.log(response);
						Notification.error({
							message: "Error:"+$scope.userres
						});
					}
                },
                function (response) {
					Notification.error({
							message: "Error:"+$scope.userres
					});
                    console.log("loading error of login");
                    console.log(response);
					
                }

            );
        }    
             
        
       
    };


});
   