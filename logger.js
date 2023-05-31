function logger(req,res,next){
    console.log('loging...')
    next()
}

function auth(req,res,next){
    console.log('authenticating...')
    next()
}
module.exports.logger=logger;
module.exports.auth=auth;