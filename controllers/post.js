var sanitize = require('validator').sanitize;
var Post = require('../proxy').Post;
var User = require('../proxy').User;

exports.addPost = function(req, res, next){
	var content = sanitize(req.body.content).trim();
	content = sanitize(content).xss();
	var userId = req.session.user._id.toString();
	var userName = req.session.user.name.toString();
	
	Post.newAndSave(userId, userName, content,function(err){
		if (err) {
			return next(err);
		}
		res.redirect('/u/' + req.session.user.name);
	});
}

exports.getPosts = function(req,res){
	var username = sanitize(req.params.user).trim();
    User.getUserByName(username, function (err, user) {
	    if (err) {
	      return next(err);
	    }
	    if (!user) {
	     res.render('user/user', { error: '这个用户不存在。',ll:'rest' });
	      return ;
	    }
	    Post.findPostByQuery({user_name:username},null,function(err,posts){
	   	 	if (err) {
		      return next(err);
		    }
	   	    res.render('user/user', {
				title: username,
				posts: posts,
			});
	   });
   });
}

exports.getAllPosts = function(req, res){
	Post.findPostByQuery({},null,function(err,posts){
		res.render('index', {
			title: '首页',
			posts: posts,
		});
	});
}