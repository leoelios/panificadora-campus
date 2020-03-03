module.exports = (req,res,next) => {
    if(req.isAuthenticated() && req.user.groupId == 1) {
        return next();
    }

    req.flash('error', 'Voce não possui acesso a essa área.');
    res.redirect('/cliente/login');
}