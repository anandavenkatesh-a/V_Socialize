

const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
module.exports.createSession = async (req,res) => {
   try{
        const user = await User.findOne({email:req.body.email});
    
        if(!user || user.password != req.body.password)
        {
            return res.status(422).json({
            message:'Username / password invalid'
            });
        }
    
        return res.status(200).json({
          message:'signed in successfully',
          data:{
            token:jwt.sign(user.toJSON(),'Anandhamalthunai',{
                expiresIn:'900000'
            })
          }
        });
   }
   catch{
      return res.status(500).json({
         message:'Internal server error'
      });
   } 
};