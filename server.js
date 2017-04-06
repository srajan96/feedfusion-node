var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var querystring = require('querystring');
var staticDir = __dirname + "/public";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(staticDir));

/*var routerr = express.Router();


app.use("/", router);
app.use("/movie/:name", router);
*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.post('/registerdata', function(req, res) {
  console.log(querystring.stringify(req.body));
	request({
		url: "http://localhost:8080/feedfusiontest/registerdata",
		method: "POST",
		headers: {
        "content-type": "application/x-www-form-urlencoded",  // <--Very important!!!
		"charset" : "UTF-8"
		},
		body: querystring.stringify(req.body)
	}, function (error, response, body){
		console.log(body)
		res.send(body)
	});
});


app.post('/auth/twitter', function(req, res) {
  var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
  var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
  var profileUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json';
console.log("goind to part 1");
  // Part 1 of 2: Initial request from Satellizer.
  if (!req.body.oauth_token || !req.body.oauth_verifier) {
    var requestTokenOauth = {
      consumer_key: 'Olwk4ncLNgYZcROLvP9oAFrgv',
      consumer_secret: 'eht2OHYflAV1Cu8GP9XA46zm7KbiivY35TytvJ91aMX67brKEF',
      callback: req.body.redirectUri
    };
console.log(requestTokenOauth);
    // Step 1. Obtain request token for the authorization popup.
    request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
      var oauthToken = querystring.parse(body);
		console.log(body);
		console.log(oauthToken);
		
		
      // Step 2. Send OAuth token back to open the authorization screen.
      res.send(oauthToken);
    });
  } else {
    // Part 2 of 2: Second request after Authorize app is clicked.
    var accessTokenOauth = {
      consumer_key: 'Olwk4ncLNgYZcROLvP9oAFrgv',
      consumer_secret: 'eht2OHYflAV1Cu8GP9XA46zm7KbiivY35TytvJ91aMX67brKEF',
      token: req.body.oauth_token,
      verifier: req.body.oauth_verifier
    };
console.log(accessTokenOauth);
    // Step 3. Exchange oauth token and oauth verifier for access token.
    request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {

      accessToken = querystring.parse(accessToken);
	  console.log(accessToken);
      var profileOauth = {
       consumer_key: 'Olwk4ncLNgYZcROLvP9oAFrgv',
      consumer_secret: 'eht2OHYflAV1Cu8GP9XA46zm7KbiivY35TytvJ91aMX67brKEF',
        token: accessToken.oauth_token,
        token_secret: accessToken.oauth_token_secret,
      };
	  oauth_tok=accessToken.oauth_token;
	  oauth_tok_sec=accessToken.oauth_token_secret;
	console.log(oauth_tok+" "+oauth_tok_sec);
	res.json({token:oauth_tok,token_secret:oauth_tok_sec});
      
    });
  }
});
/*------------------------------------------------------------------------------------------------------*/
app.post('/auth/instagram', function(req, res) {
  var accessTokenUrl = 'https://api.instagram.com/oauth/access_token';
	
console.log(req.body);
console.log("here");
  var params = {
    client_id: '84670ddd8cf849a1892ae52963ef53a9',
    redirect_uri: req.body.redirectUri,
    client_secret: "a6fc64493c6f4e5fa6db58b34fd8071b",
    code: req.body.code,
    grant_type: 'authorization_code'
  };
console.log(params);  
console.log("here 2");
  // Step 1. Exchange authorization code for access token.
  request.post({ url: accessTokenUrl, form: params, json: true }, function(error, response, body) {
console.log("here 3");
    // Step 2a. Link user accounts.
  //console.log(body);

	var token_this=body.access_token;
	var userinstagram = body.user.id;
        var userpicture =  body.user.profile_picture;
        var userdisplayName = body.user.username;
		console.log(token);
//		console.log(userinstagram);
    res.json({token:token_this});
	
	 });
});

/*------------------------------------------------------------------------------------------------------*/
app.post('/auth/facebook', function(req, res) {
  var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret:"8bb6800994144f6b4438a49aadcf5e4e",
    redirect_uri: req.body.redirectUri
  };
console.log(params);
  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      return res.status(500).send({ message: accessToken.error.message });
    }

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: profile.error.message });
      }
		console.log("showing profile");
	  console.log(profile);
	console.log(accessToken.access_token);
		res.json({token:accessToken.access_token});
 //see this part @srajan
      //var token = profile.access_token;;
//console.log(token+" isd yoken");
            //user.facebook = profile.id;
            //user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
            //user.displayName = user.displayName || profile.name;
          
	  
    });
  });
});
/*------------------------------------------------------------------------------------------------------*/

/*------------------------------------*/
app.get('/auth/instagram',function(req,res){
	console.log("in get insta");
	res.sendStatus(200);
});
app.get('/auth/twitter',function(req,res){
	console.log("in get twitter");
	res.sendStatus(200);
});


var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
