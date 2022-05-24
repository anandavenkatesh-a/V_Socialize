

const { populate } = require('../models/post');
const Post = require('../models/post');
module.exports.home = function(req,res) {
    
    // Post.
    // find({}).
    // populate({
    //     path:"user"
    // }).
    // exec((err,posts) => {
    //     if(err){
    //         return res.render('<h1> Not able to fetch the post </h1>');
    //     }
    //     else{
    //         return res.render('home',{
    //             posts:posts
    //         });
    //     }
    // });

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
            console.log(posts);
            return res.render('home',{
                        posts:posts
                    });
        }
    });
};