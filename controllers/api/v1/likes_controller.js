

const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.toogleLike = async (req,res) => {
      try{
         let deleted = false;
         let likeable;
         if(req.query.type == 'Post')
         {
            likeable = await Post.findById(req.query.id).populate('likes');
         }
         else
         {
            likeable = await Comment.findById(req.query.id).populate('likes');
         }

         let like = Like.find({
            docModel:req.query.type,
            likeable:req.user_id,
            user:req.user._id,     
         });

         if(like)
         {
           likeable.likes.pull(like._id); 
           likeable.save();
           like.remove();
           deleted = true;
         }
         else
         {
            like = await Like.create({
               user:req.user._id,
               docModel:req.query.type,
               likeable:req.query.id           
            });

            likeable.likes.push(like._id);
            likeable.save();
         }

         return res.status(200).json({
            message:'req success',
            data:{
               deleted:deleted   
            }
         });
         
      }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'error in liking',
        });
      }
};