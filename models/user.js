var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.set('debug', true);
 
var UserSchema = new Schema({
  name: { type: String ,unique: true},
  password: { type: String},
  avatar: { type: String},
  active: { type: Boolean, default: false },
});

mongoose.model('User', UserSchema);
