const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: {type: Number,required: true},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password:   { type: String, required: true },
    status: {type: String,enum:['active','inactive'],default : 'inactive'},
    createdBy: String
  },{
      timestamps:true
  },{
      collection:"User"
  });

  let UserModel = mongoose.model('User', userSchema,'User');

  module.exports = UserModel;