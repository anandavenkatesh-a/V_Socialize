

const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = '/uploads/user/avatar';
const userSchema = new mongoose.Schema({
   email:{
       type:String,
       required:true,
       unique:true
   },
   password:{
       type:String,
       required:true
   },
   name:{
       type:String,
       required:true
   },
   avatar:{
       type:String,
       default:'https://e7.pngegg.com/pngimages/165/652/png-clipart-businessperson-computer-icons-avatar-avatar-heroes-public-relations.png'
   }
},{
    timestamps:true
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
userSchema.statics.avatarUpload = multer({ storage: storage }).single('avatar');
userSchema.statics.avatar_path = AVATAR_PATH;

const User = mongoose.model('User',userSchema);
module.exports = User;