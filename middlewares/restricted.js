function protected(req,res, next){
    console.log(req.session)
    if (req.session && req.session.userId){
        next()
    } else {
        res.status(401).json({message: 'Not authorized'});
    }
}

module.exports = {
    protected
}