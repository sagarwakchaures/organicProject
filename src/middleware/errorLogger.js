const fs = require('fs');

function errorLogger (err,req,res,next) {
    fs.appendFile("errorLogger.txt", err.stack, (err) => { 
        if (err) throw new Error("error while appending fine");
    });
    status = 500;
    if (err.status) {
        status = err.status;
    }
    let message = err.message;
    res.status(status);
    res.json({
        message: message,
        status: 0
    });
}

module.exports = errorLogger;