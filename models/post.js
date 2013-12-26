var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.set('debug', true);
 
var PostSchema = new Schema({
  user_id: { type: ObjectId ,index: true},
  user_name: {type: String},
  content: { type: String},
  create_at: { type: Date, default: Date.now},
});

mongoose.model('Post', PostSchema);
