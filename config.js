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
  site_static_host: '', // 静态文件存储域名
  mini_assets: false, // 静态文件的合并压缩，详见视图中的Loader
  site_enable_search_preview: false, // 开启google search preview
  site_google_search_domain:  'cnodejs.org',  // google search preview中要搜索的域名

  upload_dir: path.join(__dirname, 'public', 'user_data', 'images'),

  db: 'mongodb://192.168.62.213/blog',
  session_secret: 'node_club',
  auth_cookie_name: 'node_club',
  port: 3000,


};
