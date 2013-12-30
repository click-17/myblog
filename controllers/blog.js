/*!
 * microblog - blog controller.
 * Copyright(c) 2013 ozil <ozil@gmail.com>
 * Copyright(c) 2013 ozil
 * MIT Licensed
 */

var Blog = require('../proxy').Blog;
var User = require('../proxy').User;
var sanitize = require('validator').sanitize;
/**
 * 获取blog.
 */
exports.getBlog = function(req,res){
	var username = sanitize(req.params.user).trim();
    User.getUserByName(username, function (err, user) {
	    if (err) {
	      return next(err);
	    }
	    if (!user) {
	      return res.render('/', { error: '这个用户不存在。' });
	    }
   });
   Blog.findBlogByQuery({author:username},null,function(err,blogs){
   	 	if (err) {
	      return next(err);
	    }
   	    res.render('user/user', {
			title: username,
			blogs: blogs,
		});
   });
}

/**
 * 创建blog
 */
exports.createBlog = function(req,res,next){
	return res.render('/blog/create', { error: '这个用户不存在。' });
}

exports.publishBlog = function(req,res,next){
	var content = sanitize(req.body.content).trim();
	var title = sanitize(req.body.title).trim();
	content = sanitize(content).xss();
	title = sanitize(title).xss();
	var userId = req.session.user._id.toString();
	var userName = req.session.user.name.toString();
	
	Blog.newAndSave(userId, userName, content,function(err){
		if (err) {
			return next(err);
		}
		res.redirect('/b/' + req.session.user.name);
	});
}

/**
 * 获取用户的所有blogs
 */
exports.getBlogs = function(req,res){
	Blog.findPostByQuery({},null,function(err,blogs){
		res.render('/blog/index', {
			title: '博客首页',
			blogs: blogs,
		});
	});
}