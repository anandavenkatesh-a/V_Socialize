

const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = (req,res) => {
    const new_post = new Post({
       data:req.body.data,
       user:req.user._id
   });

   add = async () => {
      try{
        const result = await new_post.save();
        return res.redirect('/');
      }catch{
          return res.render('<h1>Error in adding post</h1>');
      }  
   };

   add();
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
                     return res.redirect('back');     
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