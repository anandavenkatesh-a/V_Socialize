

const Post = require('../models/post');
const Comment = require('../models/comment');
const commentMailer = require('../mailer/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
module.exports.create = (req,res) => {
   //store in it collection Comment
   Post.findById(req.query.post_id,(err,post) => {
       
       if(err){
           return res.redirect('back');
       }
       else if(post)
       {
           create_comment = async () => {
               try{
                const new_comment = new Comment({
                    data:req.body.data,
                    user:req.user._id,
                    post:req.query.post_id
                   });   
                
                    const result = await new_comment.save();
                    
                    //adding this comment in post
                    post.comments.push(new_comment);
                    post.save(); 

                    new_comment.user = req.user;
                    new_comment.post = post;
                    
                    let job = queue.create('comment_email',new_comment).save( function(err){
                       if(err)
                       {
                          console.log(err);
                          return;
                       } 

                       console.log( 'job id:',job.id,'enqueued' );
                       
                    });

                    return res.redirect('back');
               }
               catch
               {
                  return res.redirect('back');
               }    
           };

           create_comment();
       }
       else
       {   
        console.log('Anand!'); // TODO remove
        return res.redirect('back');
       }
   });  
};
module.exports.destroy = (req,res) => {
    //req.params.id => comment id
    Comment.findById(req.params.id,(err,comment) => {
        if(comment)
        {
            let postId = comment.post;
            if(comment.user == req.user.id)
            {
                 comment.remove();

                 Post.findById(postId,{$pull:{comments:req.params.id}},(err,post) =>{
                     return res.redirect('back');  
                 });
            }
        }
    });
};