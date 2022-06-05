

const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function(req,res) {

    var allUsers;
    
    if(req.user)
    {
        User.find({},(err,users) => {
           allUsers = users;     
        })
    }
    
    Post.
    find({}).
    populate("user").
    populate({
        path:"comments",
        populate:{
            path:"user"
        }
    }). 
    exec((err,posts) => {
        if(err)
        {
           return res.render('<h1> Not able to fetch the post </h1>');
        }
        else
        {
            return res.render('home',{
                        posts:posts,
                        all_users:allUsers
                    });
        }
    });
};