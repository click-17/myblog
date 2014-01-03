/*!
 * microblog - middlewares
 * Copyright(c) 2013 ozil <ozil@gmail.com>
 * Copyright(c) 2013 ozil
 * MIT Licensed
 */

/**
 * 权限验证
 */
exports.checkNotLogin = function (req, res, next){
	if (!req.session.user) {
		return res.redirect('/login');
	}
	next();
}