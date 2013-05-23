
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs')
  //,MongoStore = require('connect-mongo')
  ,settings = require('./settings')
  ,SessionStore = require("session-mongoose")(express);
  
var store = new SessionStore({
	url: "mongodb://192.168.62.213/session",
	interval: 120000
});
//partials = require('express-partials')

var app = express();
 //app.use(partials()); 
 
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({secret : 'shiqiliang'}));
app.use(express.session({
	secret : 'shiqiliang',
	store: store,
	cookie: { maxAge: 900000 }
}));

app.use(function(req, res, next){
	res.locals.user = req.session.user;
	next();
});

//app.use(express.router(routes));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);//这个是新加的

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
