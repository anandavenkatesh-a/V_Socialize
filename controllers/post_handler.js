

const Post = require('../models/post');
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