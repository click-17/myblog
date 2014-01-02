/*!
 * microblog - blog controller.
 * Copyright(c) 2013 ozil <ozil@gmail.com>
 * Copyright(c) 2013 ozil
 * MIT Licensed
 */

var Blog = require('../proxy/blog');
var User = require('../proxy').User;
var sanitize = require('validator').sanitize;
/**
 * 获取某个用户的blog.
 */
exports.getBlogs = function(req,res){
	var username = sanitize(req.params.user).trim();
    User.getUserByName(username, function (err, user) {
	    if (err) {
	      return next(err);
	    }
	    if (!user) {
	      return res.render('blog/user', { error: '这个用户不存在。' });
	    }
	      Blog.findBlogByQuery({author:username},null,function(err,blogs){
           if (err) {
		         return next(err);
		       }
		          res.render('blog/user', {
		           title: username,
		           blogs: blogs,
		       });
		  });
   });
}

/**
 * 创建blog
 */
exports.createBlog = function(req,res,next){
	var user= req.session.user;
    if (!user) {
    	res.redirect('/login');
      //return res.render('user/login', { error: '这个用户不存在。' });
    }
	return res.render('blog/create');
}

exports.publishBlog = function(req,res,next){
	var content = sanitize(req.body.content).trim();
	var title = sanitize(req.body.title).trim();
	content = sanitize(content).xss();
	title = sanitize(title).xss();
	var userName = req.session.user.name.toString();
	
	Blog.newAndSave( userName, title, content,function(err){
		if (err) {
			return next(err);
		}
		res.redirect('/b/' + req.session.user.name);
	});
}

/**
 * 获取所有blogs
 */
exports.getAllBlogs = function(req,res){
	Blog.findBlogByQuery({},null,function(err,blogs){
		res.render('blog/index', {
			title: '博客首页',
			blogs: blogs,
		});
	});
}