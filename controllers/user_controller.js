

const { redirect, render } = require('express/lib/response');
const { contentDisposition } = require('express/lib/utils');
const User = require('../models/user');


module.exports.create_session = (req,res) => {
     const email = req.body.email;
     const password = req.body.password;

     //find the user
     User.findOne({email : email},(err,user) => {
          if(err)
          {
               console.log('problem in signing in!');
               return res.redirect('back');
          }
          else
          {
               if(user)
               {
                  if(user.password == password)
                  {
                      res.cookie('user_id',user._id); // user identity is eshtablished
                      return res.redirect('/user/profile');
                  }
                  else
                  {
                      console.log('password doesnt match'); 
                      return res.redirect('back');
                  }
               }
               else
               {
                    console.log('account does not exists! create one!');
                    return res.redirect('/user/sign-up');
               }
          }
     });
};

module.exports.profile = (req,res) => {

     if(req.cookies.user_id)
     {
          User.findById(req.cookies.user_id,(err,user) => {
               if(err)
               {
                   console.log('error in rendering your profile');
                   return res.redirect('/user/sign-in');
               }
               else
               {
                   if(user)
                   {
                        return res.render('profile',user);
                   }
                   else
                   {
                        console.log('you dont have account ');
                        return res.redirect('/user/sign-up');
                   }
               }
           });
     }
     else
     {
          return res.redirect('/user/sign-in');
     }

};

module.exports.sign_in = (req,res) =>{
     return res.render('sign-in');
};

module.exports.sign_up = (req,res) => {
     return res.render('sign-up');
};


module.exports.create_account = (req,res) => {

     const email = req.body.email;
     const password = req.body.password;
     const confirm_password = req.body.confirm_password;
     const name = req.body.name;

     let confirmPassword = () => {
          if(confirm_password == password)
          {
                return true;
          }
          return false;
     };

     let add_to_db = async () => {
          try{
               console.log('inside add to db!');
               const new_user = new User({
                    email:email,
                    password:password,
                    name:name
               });

               const result = await new_user.save();
               return true;
          }
          catch{
               return false;
          }     
     };

     User.find({email : email},(err,users) => {
          if(err)
          {
               console.log('Error while signing up');
               return res.redirect('back');
          }
          else
          {
               if(users.length)
               {
                    return res.redirect('/user/sign-in');
               }
               else
               {
                    if(confirmPassword())
                    {
                        console.log('inside confirm password!');
                         if(add_to_db())
                        {
                           return res.redirect('/user/profile');
                        }
                        else
                        {
                             return redirect('back');
                        }
                    }
                    else
                    {
                        return res.redirect('back');
                    }
               }
          }
     });
};