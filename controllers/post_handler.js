

const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
module.exports.create = async (req,res) => {
    try{
        let post = await Post.create({
            data: req.body.data,
            user: req.user._id
        });
        
        post.user = req.user;
        
        req.flash('success', 'Post published!');
        
        return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
        });

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
};
module.exports.delete = (req,res) => {
    Post.findById(req.params.id,(err,post) => {
      if(err)
      {
         console.log('err in deleting post',req.params.id);
         return res.redirect('back');
      }
      else
      {
          if(post)
          {
              if(post.user == req.user.id)
              {
                 post.remove();
                 
    
                 Comment.deleteMany({post:post._id},(err) => {
                     
                    if(req.xhr){
                        return res.status(200).json({
                            data:req.params.id,
                            message:'deleted the post'
                        });

                    }
                 });
              }
              else
              {
                 console.log('You are not auth to delete the post',post.id);
                 return res.redirect('back');
              }
          }
          else
          {
              console.log('no such post',req.params.id);
              return res.redirect('back');
          }
      }
    });

};