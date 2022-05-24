

const Post = require('../models/post');
const Comment = require('../models/comment');
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
                    console.log(result); //TODO remove this
                    
                    //adding this comment in post
                    post.comments.push(new_comment);
                    post.save(); 
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
