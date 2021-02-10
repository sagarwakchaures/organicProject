const jwt = require('jsonwebtoken');
const allowAction = require('../config/action');

async function verify(req,res,next) {
    //allowAction before login
    if (allowAction[req.action]) {
        next();
    } else {
        let bearerHeader = req.headers['authorization'];
        let token;
        if (bearerHeader) {
            let  bearer = bearerHeader.split(" ");
            token = bearer[1];
        }
        if (!token){
            res.status(401);
            return res.json({
                message:"Unretricted access !!!"        
            });
        }
        try {
            payload = await jwt.verify(token, 'accessTokenSecret');
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                res.status(401);
                return res.json({
                    message:"Unretricted access !!!"        
                });
            }
            res.status(401);
            return res.json({
                message:"Unretricted access !!!"        
            });
        }
        next();
    }
}

module.exports = verify;