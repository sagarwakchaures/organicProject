
function checkRequest(req,res,next) {
    let url = req.path.split('/');
    req.action = url[3] ? url[3] :''; 
    next();
 }
 module.exports = checkRequest;