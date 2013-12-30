/*!
 * microblog - blog models.
 * Copyright(c) 2013 ozil <ozil@gmail.com>
 * Copyright(c) 2013 ozil
 * MIT Licensed
 */

/**
 * blog models.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.set('debug', true);

var blogSchema = new Schema({
  title:  String,
  author_id:{type: ObjectId},
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: {type: Boolean, default: false},
  attachment:{type: ObjectId,},
  meta: {
    votes: { type: Number, default: 0 },
    favs:  { type: Number, default: 0 }
  }
});

mongoose.model('Blog', blogSchema);

