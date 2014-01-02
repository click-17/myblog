var models = require('../models');
var Blog = models.Blog;
/**
 * 
 * @param {String} userId
 * @param {String} content
 * @param {Function} callback
 */
exports.newAndSave = function(userName, title,content, callback){
	var blog = new Blog();
	blog.title = title;
	blog.author = userName;
	blog.body = content;
	blog.save(callback);
}

exports.findBlogByQuery = function(query,opt,callback){
	Blog.find(query, null, opt, callback);
}

exports.findBlogById = function(id,callback){
	Blog.findById(id,callback);
}