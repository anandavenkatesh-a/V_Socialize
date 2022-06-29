

const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async (req,res) => {
    
    
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

        return res.json(200,{
            message:'list of posts',
            posts:posts
        });
    }
    catch(err){
         console.log('Error: ',err);
    }
    
}


module.exports.delete = async (req,res) => {
    try{
        const post =  await Post.findById(req.params.id);
        console.log(req.user);
        if(post.user == req.user.id)
        {
            post.remove();
 
           await Comment.deleteMany({post:post._id});
        
           return res.json(200,{
              message:'comments and associated posts are deleted'
           }); 
        }
        else
        {
            return res.status(401).json({
                message:'you are unauthorized to delete the post'
            });
        }
        
    }
    catch{
        return res.json(500,{
            message:'internal server error'
        });
    }
};