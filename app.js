
/**
 * Module dependencies.
 */
//myblog

var fs = require('fs');
var accessLogfile = fs.createWriteStream('./log/access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  //,SessionStore = require("session-mongoose")(express)
  ,MongoStore = require('connect-mongo')(express)
  //RedisStore = require("connect-redis")(express)
  ;

var config = require('./config').config;
  
var app = express();
 
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');
app.use(express.favicon());
//app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger({stream: accessLogfile}));

var store = new MongoStore({
	db: "session",
	host: "192.168.62.213"
});

/*
var store = new RedisStore({
	host: "192.168.62.213",
	port: "6379"
});*/


app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());

//app.use(express.cookieSession({secret : 'shiqiliang'}));
app.use(express.session({
	secret : 'shiqiliang',
	store: store,
	cookie: { maxAge: 900000 }
}));

app.use(function(req, res, next){
	res.locals.user = req.session.user;
	res.locals.test1 = 'test';
	var url = req.originalUrl;
	/*if(url == "/login" && req.session.user){
		return res.redirect("/");
	}
    if (url != "/login" && !req.session.user) {
        return res.redirect("/login");
    }*/
	next();
});

//app.use(express.router(routes));
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));
	
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

if ('production' == app.get('env')) {
	app.error(function (err, req, res, next) {
		var meta = '[' + new Date() + '] ' + req.url + '\n';
		errorLogfile.write(meta + err.stack + '\n');
		next();
	});
}

routes(app);//这个是新加的

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
