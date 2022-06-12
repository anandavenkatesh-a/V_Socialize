

const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req,res) {

    try{
        var allUsers;
        if(req.user)
        {
            allUsers = await User.find({});
        }
        
        let posts = await Post.
            find({}).
            populate("user").
            populate({
                path:"comments",
                populate:{
                    path:"user"
                }
            }).
            sort({
                _id:-1
            });

        return res.render('home',{
            posts:posts,
            all_users:allUsers
        });
    }
    catch(err){
         console.log('Error: ',err);
    }    
};
