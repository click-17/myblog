var check = require('validator').check,
  sanitize = require('validator').sanitize;

var crypto = require('crypto');
var config = require('../config').config;

var User = require('../proxy').User;

//sign up
exports.showReg = function (req, res) {
	res.render('user/reg', {
		title: '用户注册',
	});
};

exports.reg = function (req, res, next) {
  var name = sanitize(req.body.username).trim();
  name = sanitize(name).xss();
  var pass = sanitize(req.body.password).trim();
  pass = sanitize(pass).xss();
  var re_pass = sanitize(req.body.password_repeat).trim();
  re_pass = sanitize(re_pass).xss();

  if (name === '' || pass === '' || re_pass === '' ) {
    res.render('user/reg', {error: '信息不完整。', name: name});
    return;
  }

  if (name.length < 5) {
    res.render('user/reg', {error: '用户名至少需要5个字符。', name: name});
    return;
  }

  try {
    check(name, '用户名只能使用0-9，a-z，A-Z。').isAlphanumeric();
  } catch (e) {
    res.render('user/reg', {error: e.message, name: name});
    return;
  }

  if (pass !== re_pass) {
    res.render('user/reg', {error: '两次密码输入不一致。', name: name});
    return;
  }

  User.getUsersByQuery({'$or': [{'name': name}]}, {}, function (err, users) {
    if (err) {
      return next(err);
    }
    if (users.length > 0) {
      res.render('user/reg', {error: '用户名已被使用。', name: name});
      return;
    }

    // md5 the pass
    pass = md5(pass);
    // create gavatar
    var avatar_url = 'http://www.gravatar.com/avatar/' + '?size=48';

    User.newAndSave(name, pass, avatar_url, false, function (err) {
      if (err) {
        return next(err);
      }
      // 发送激活邮件
      //mail.sendActiveMail(email, md5(email + config.session_secret), name, email);
      res.render('index', {
      	title: '',
        success: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
      });
    });
  });
};

/**
 * Show user login page.
 *
 * @param  {HttpRequest} req
 * @param  {HttpResponse} res
 */
exports.showLogin = function (req, res) {
  req.session._loginReferer = req.headers.referer;
  res.render('user/login');
};

exports.testLogin = function (req, res,next) {
  req.session._loginReferer = 'mytest';
  next();
};

/**
 * define some page when login just jump to the home page
 * @type {Array}
 */
var notJump = [
  '/active_account', //active page
  '/reset_pass',     //reset password page, avoid to reset twice
  '/reg',         //regist page
  '/search_pass'    //serch pass page
];

/**
 * Handle user login.
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.login = function (req, res, next) {
  var loginname = sanitize(req.body.username).trim().toLowerCase();
  var pass = sanitize(req.body.password).trim();

  if (!loginname || !pass) {
    return res.render('user/login', { error: '信息不完整。' });
  }

  User.getUserByName(loginname, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('user/login', { error: '这个用户不存在。' });
    }
    pass = md5(pass);
    if (pass !== user.password) {
      return res.render('user/login', { error: '密码错误。' });
    }
    req.session.user = user;
    
    //var refer = req.session._loginReferer || '/';
    res.redirect('/');
  });
};

// sign out
exports.logout = function (req, res, next) {
  req.session.destroy();
  res.clearCookie(config.auth_cookie_name, { path: '/' });
  res.redirect(req.headers.referer || '/');
};


exports.showSearchPass = function (req, res) {
  res.render('sign/search_pass');
};


// private
function gen_session(user, res) {
  var auth_token = encrypt(user._id + '\t' + user.name + '\t' + user.pass + '\t' + user.email, config.session_secret);
  res.cookie(config.auth_cookie_name, auth_token, {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30}); //cookie 有效期30天
}

function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

function randomString(size) {
  size = size || 6;
  var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var max_num = code_string.length + 1;
  var new_pass = '';
  while (size > 0) {
    new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
    size--;
  }
  return new_pass;
}
