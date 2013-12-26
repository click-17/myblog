var Post = require('../models').Post;

/**
 * 
 * @param {String} userId
 * @param {String} content
 * @param {Function} callback
 */
exports.newAndSave = function(userId, userName, content, callback){
	var post = new Post();
	post.user_id = userId;
	post.user_name = userName;
	post.content = content;
	post.save(callback);
}

exports.findPostByQuery = function(query,opt,callback){
	Post.find(query, null, opt, callback);
}

exports.findPostById = function(id,callback){
	Post.findById(id,callback);
}
