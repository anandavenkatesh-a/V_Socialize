

const User = require('../models/user');
module.exports.showProfile = (req,res) => {
    User.findById(req.params.id,(err,user) => {
        if(user)
        {
            return res.render('profile',{
                profile_user:user
            });
        }
    });
};