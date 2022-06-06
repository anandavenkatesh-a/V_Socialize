

const { redirect } = require('express/lib/response');
const { contentDisposition } = require('express/lib/utils');
const User = require('../models/user');

module.exports.create_session = (req,res) => {
     req.flash('success','Logged in');
     return res.redirect('/');
};

module.exports.profile = (req,res) => {
     return res.render('user_profile');
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
               req.flash('err','Error in creating account');
               return res.redirect('back');
          }
          else
          {
               if(users.length)
               {
                    req.flash('info','You already have account');
                    return res.redirect('/user/sign-in');
               }
               else
               {
                    if(confirmPassword())
                    {
                        console.log('inside confirm password!');
                        if(add_to_db())
                        {
                           req.flash('success','Account Successfully created ');
                           return res.redirect('/user/profile');
                        }
                        else
                        {
                           req.flash('err','Error in creating account');   
                           return redirect('back');
                        }
                    }
                    else
                    {
                         req.flash('err','Error in creating account');                        
                         return res.redirect('back');
                    }
               }
          }
     });
};

module.exports.destroySession = (req,res) => {
     req.flash('success','Logged out');
     req.logout();
    return res.redirect('back');
};

module.exports.update_profile = (req,res) => {
    User.findByIdAndUpdate(req.user.id,req.body,(err,user) =>{
         return res.redirect('back');
    });
};