/* global sohagServerUrl */

var sohagApp = angular.module('SohagApp');

sohagApp.factory('SohagRootService', function ($http,$httpParamSerializer,$sessionStorage) {

    return {
	
	getHomePageData: function () {
			
            var req = {
                method: 'POST',
                url: sohagServerUrl + "getHomePageData",
                headers: {
                    'Content-Type': "text/html"
                },
                data: ""
            };
            return $http(req);
        },
        getLoginData: function (userdata) {

            var req = {
                method: 'POST',
                url: sohagServerUrl + "logindata",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                data: $httpParamSerializer(userdata)
            };
            return $http(req);
        },
        registerUser: function (userdata) {
			//userdata.sessionid=$sessionStorage.sessionId;
            var req = {
                method: 'POST',
                url: "/registerdata",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                data: $httpParamSerializer(userdata)
					
				
			};
            return $http(req);
        },
		updateUser: function (userdata) {
			//userdata.sessionid=$sessionStorage.sessionId;
			data={
				'curpass':userdata.curpass,
				'newpass':userdata.pass,
				'username':$sessionStorage.username,
				'sessionid':$sessionStorage.sessionId
			};
            var req = {
                method: 'POST',
                url: sohagServerUrl +"changepass",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                data: $httpParamSerializer(data)
			};
            return $http(req);
        },
		logout: function () {
			//userdata.sessionid=$sessionStorage.sessionId;
			data={
				'username':$sessionStorage.username,
				'sessionid':$sessionStorage.sessionId
			};
            var req = {
                method: 'POST',
                url: sohagServerUrl +"logout",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                data: $httpParamSerializer(data)
			};
            return $http(req);
        },
        getPostStatus:function(postdata){
            data={
                    'username':$sessionStorage.username,
                    'session':$sessionStorage.sessionId,
                    'status':postdata.status
		};
            var req = {
                method: 'POST',
                url: sohagServerUrl +"twitter/postupdate",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                data: $httpParamSerializer(data)
			};
            return $http(req);
            
        }
    };
    
    
});
