var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.set('debug', true);

var BlogSchema = new Schema({
  title:  { type: String},
  author: { type: String},
  body:   { type: String},
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: {type: Boolean, default: false},
  attachment:{type: ObjectId,},
  meta: {
    votes: { type: Number, default: 0 },
    favs:  { type: Number, default: 0 }
  }
});

mongoose.model('Blog', BlogSchema);
