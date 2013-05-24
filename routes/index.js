
/*
 * GET home page.
 */

var user = require('../controllers/user');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {
			title: '首页'
		});
	});
	app.get('/reg', user.showReg);
	app.post('/reg',user.reg);
};