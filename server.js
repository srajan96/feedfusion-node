var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var querystring = require('querystring');
var staticDir = __dirname + "/public";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(staticDir));
/*var router = express.Router();


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

  // Part 1 of 2: Initial request from Satellizer.
  if (!req.body.oauth_token || !req.body.oauth_verifier) {
    var requestTokenOauth = {
      consumer_key: config.TWITTER_KEY,
      consumer_secret: config.TWITTER_SECRET,
      callback: req.body.redirectUri
    };

    // Step 1. Obtain request token for the authorization popup.
    request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
      var oauthToken = qs.parse(body);

      // Step 2. Send OAuth token back to open the authorization screen.
      res.send(oauthToken);
    });
  } else {
    // Part 2 of 2: Second request after Authorize app is clicked.
    var accessTokenOauth = {
      consumer_key: config.TWITTER_KEY,
      consumer_secret: config.TWITTER_SECRET,
      token: req.body.oauth_token,
      verifier: req.body.oauth_verifier
    };

    // Step 3. Exchange oauth token and oauth verifier for access token.
    request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {

      accessToken = qs.parse(accessToken);

      var profileOauth = {
        consumer_key: config.TWITTER_KEY,
        consumer_secret: config.TWITTER_SECRET,
        token: accessToken.oauth_token,
        token_secret: accessToken.oauth_token_secret,
      };

      
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

	var token=body.access_token;
	var userinstagram = body.user.id;
        var userpicture =  body.user.profile_picture;
        var userdisplayName = body.user.username;
		console.log(token);
//		console.log(userinstagram);
	res.send(token);
	 });
});

app.get('/auth/instagram',function(req,res){
	console.log("in get");
	res.sendStatus(200);
});
var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
