const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userId: {type: Number,required: true},
    name: { type: String, required: true },
    email: { type: String, required: true },
    password:   { type: String, required: true },
    status: {type: String,enum:['Active','Inactive'],default : 'Inactive'},
    createdBy: String
  },{
      timestamps:true
  },{
      collection:"Users"
  });

  let UserModel = mongoose.model('Users', userSchema,'Users');

  module.exports = UserModel;
