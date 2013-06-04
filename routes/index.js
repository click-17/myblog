
/*
 * GET home page.
 */

var user = require('../controllers/user');

module.exports = function(app) {
	//app.get('/index',user.checkNotLogin);
	app.get('/',user.checkNotLogin, function(req, res) {
		req.session.test = 'test';
		res.render('index', {
			title: '首页'
		});
	});
	app.get('/reg', user.showReg);
	app.post('/reg',user.reg);
	
	//app.get('/login', user.checkNotLogin);
	app.get('/login',user.showLogin);
	
	//app.post('/login', user.checkNotLogin);
	app.post('/login', user.login);
	
	
	app.all('/logout',user.logout);
	
};