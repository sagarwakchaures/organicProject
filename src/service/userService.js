const UserModel = require('../model/userModel');
const md5 = require('md5');
let userObj = {};

/**
 * @param {*} obj
 * create the user
 */
userObj.registerUser = async(obj) =>{
    let checkEmailIsExist = await userObj.checkEmailIsExist(obj.email);
    if (checkEmailIsExist) {
        let emailExitsErr = new Error('Email is already registered with us !!!');
        emailExitsErr.status = 500;
        throw emailExitsErr;     
    }
    let userId = await userObj.createUserId();
    obj.password = md5(obj.password);//encrypt the password by using md5
    obj['userId'] = userId;
    let result;
    try {
        result = await UserModel.create(obj);
    } catch(err){
        let error = new Error("Enable to register the user !!!");
        error.status = 500;
        throw error;
    }
    return result;
}

/**
 * Check email & password combination while login for authentication
 * @param {*} email 
 * @param {*} password 
 */
userObj.checkUserRecordIsExist = async(email,password) =>{
    let result;
    try {
        result = await UserModel.findOne({email:email,password:md5(password)});
        if (!result) {
            let err =  new Error('Incorrect username or password !!!');
            err.status = 400;
            throw err;
        } else {
            return result;
        }
    } catch(err){
        let error = new Error(err);
        error.status = 404;
        throw error;
    }
}

/**
 * check email is exist or not
 * @param {*} email 
 */
userObj.checkEmailIsExist = async(email) => {
    let result;
    try {
        result = await UserModel.findOne({email:email});
    } catch(err){
        let error = new Error(err);
        error.status = 500;
        throw error;
    }
    return result;
}

/**
 * create the userId based on previous userId
 */
userObj.createUserId = async () => {
    let result = await UserModel.findOne({}).sort({userId:-1});
    let userId;
    if(!result) {
        userId = 1
    } else {
        userId = result.userId + 1;
    }
    return userId;
}

/**
 * update the user based on userId
 */
userObj.updateUser = async (userId,obj) => {
    let result;
    try {
        result = await UserModel.updateOne({userId: userId},{$set:obj});
        if (result.deletedCount === 0) {
            throw new Error('User Id is not exist');
        }
    } catch(err){
        let error = new Error(err.message);
        error.status = 404;
        throw error;
    }
    return result; 
}

/**
 * delete the user based on userId
 */
userObj.deleteUser = async (userId) => {
    let result;
    try {
        result = await UserModel.deleteOne({userId: userId});
        if (result.deletedCount === 0) {
            throw new Error('User Id is not exist');
        }
    } catch(err){
        let error = new Error(err.message);
        error.status = 500;
        throw error;
    }
    return result; 
}

module.exports = userObj;