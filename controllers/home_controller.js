

const Post = require('../models/post');
module.exports.home = function(req,res) {
    
    Post.
    find({}).
    populate('userID').
    exec((err,posts) => {
        if(err){
            return res.render('<h1> Not able to fetch the post </h1>');
        }
        else{
            return res.render('home',{
                posts:posts
            });
        }
    });
};