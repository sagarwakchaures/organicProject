const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const jwt = require('jsonwebtoken');

/**
 * Register the user with fields
 */
router.post('/register',(req,res,next)=>{
    let params = req.body;
    if (!params.email) {    
        throw new Error('Email is required !!!');
    }
    if (!params.name) {    
        throw new Error('Name is required !!!');
    }
    if (!params.password) {    
        throw new Error('Passsword is required !!!');
    }
    userService.registerUser(params).then(()=>{
        return res.json({
            "status": 1,
            "message": "User is created successfully !!!"
        });
    }).catch((err)=>{
        next(err);
    });
});

/**
 * Login with credentials
 */
router.post('/login',(req, res,next) => {
    const { email, password } = req.body;
    userService.checkUserRecordIsExist(email,password).then((result)=>{
        if (result) {
            const accessToken = jwt.sign({ email: email,  password: password }, 'accessTokenSecret');
            return res.json({
               "token": accessToken,
               "message": "Login is successful !!!!"
            });
        } 
    }).catch((err)=>{
        next(err);
    })
});

/**
 * Delete user
 */
router.delete('/delete/:userId',(req,res,next)=>{
    let userId = req.params.userId;    
    if (!userId) {    
        throw new Error('UserId is required !!!');
    }
    userService.deleteUser(userId).then(()=>{
        return res.json({
            "status": 1,
            "message": "Account is deleted successfully !!!"
        });
    }).catch((err)=>{
        next(err);
    });
});

/**
 * Update user
 */
router.put('/update/:userId',(req,res,next)=>{
    let userId = req.params.userId;
    let updateObj = {};
    if (req.body.name !== undefined) {
        updateObj['name'] = req.body.name;
    }
    if (req.body.status !== undefined) {
        updateObj['status'] = req.body.status;
    }
    if (Object.keys(updateObj).length === 0) {
        return res.json({
            "status": 1,
            "message": "No data for updation !!!"
        });
    }
    userService.updateUser(userId,obj).then(()=>{
        return res.json({
            "status": 1,
            "message": "Account is updated successfully !!!"
        });
    }).catch((err)=>{
        next(err);
    });
});    
module.exports = router;