
/*
 * GET home page.
 */

/*
exports.index = function(req, res){
  res.render('index', { title: '棣栭〉' });
};
exports.hello = function(req,res){
	res.send('The time is '+new Date().toString());
};
exports.user = function(req, res) {
};
exports.post = function(req, res) {
};
exports.reg = function(req, res) {
};
exports.doReg = function(req, res) {
};
exports.login = function(req, res) {
};
exports.doLogin = function(req, res) {
};
exports.logout = function(req, res) {
};*/


module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {
			title: '首页'
		});
	});
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: '用户注册',
		});
	});
	app.post('/reg', function(req, res) {
		if(req.body['password-repeat'] != req.bady['password']){
			req.session.error = '密码不一致';
			return res.redirect('/reg');
		}
	});
};