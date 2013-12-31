
/*
 * GET home page.
 */

var user = require('../controllers/user');
var post = require('../controllers/post');
var blog = require('../controllers/blog');
//var auth = require('../middlewares/auth');

module.exports = function(app) {
	//app.get('/index',user.checkNotLogin);
	app.get('/',post.getAllPosts);
	app.get('/reg', user.showReg);
	app.post('/reg',user.reg);
	
	//app.get('/login', user.checkNotLogin);
	app.get('/login',user.showLogin);
	
	//app.post('/login', user.checkNotLogin);
	app.post('/login', user.login);
	
	
	app.all('/logout',user.logout);
	
	app.get('/u/:user',post.getPosts);
	
	app.post('/post', post.addPost);
	
	app.get('/b/:user', blog.getBlogs);
	app.get('/blog', blog.getAllBlogs);
	app.post('/blog', blog.publishBlog);
	app.get('/blog/create', blog.createBlog);
};