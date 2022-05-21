

const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
   data:{
      type:String
   },
   userID:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:"User"
   }
},{
    timestamps:true
});


const Post = mongoose.model('Post',postSchema);
module.exports = Post;