/**
 * config
 */

var path = require('path');

exports.config = {
  debug: true,
  name: 'Node First',
  description: 'node first',
  version: '0.2',

  // site settings
  site_headers: [
    '<meta name="author" content="EDP@TAOBAO" />',
  ],
  host: 'localhost.shiqiliang.org',
  site_logo: '', // default is `name`

  upload_dir: path.join(__dirname, 'public', 'user_data', 'images'),

  db: 'mongodb://192.168.62.213/blog',
  session_secret: 'node_club',
  auth_cookie_name: 'node_club',
  port: 3000,


};
