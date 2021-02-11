const mongoose = require('mongoose');
const { Schema } = mongoose;

const pagesSchema = new Schema({
    pageId: {type: Number,required: true},
    title: { type: String, required: true },
    content: String,
    keywords:[],
    createdBy: {}
  },{
      timestamps:true
  },{
      collection:"Pages"
  });

  let PageModel = mongoose.model('Pages', pagesSchema,'Pages');

  module.exports = PageModel;
