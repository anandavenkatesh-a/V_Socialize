

const { redirect } = require('express/lib/response');
const { contentDisposition } = require('express/lib/utils');
const User = require('../models/user');

module.exports.create_session = (req,res) => {
     return res.redirect('/');
};

module.exports.profile = (req,res) => {
     return res.render('profile');
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
               console.log(result);
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