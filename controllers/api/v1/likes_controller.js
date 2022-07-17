

const Like = require('../../../models/like');
const Comment = require('../../../models/comment');
const Post = require('../../../models/post');
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

         console.log(likeable);

         let like = await Like.findOne({
            docModel:req.query.type,
            likeable:req.query.id,
            user:req.user._id,     
         });

         console.log('This is like',like);

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
         console.log(like);

         console.log(likeable);

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