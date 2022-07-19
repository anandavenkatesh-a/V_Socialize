

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');
passport.use(new GoogleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url,
    scope: [ 'profile','email' ],
    state: true
  },
  function verify(accessToken, refreshToken, profile, cb) {
     User.findOne({email:profile.emails[0].value}).exec((err,user) => {
        if(err){
            console.log('err:',err);
            return  cb(err);
        }
        
        if(user){
           return cb(null,user);
        }
        else{
           User.create({
              email:profile.emails[0].value,
              name:profile.displayName,
              password:crypto.randomBytes(20).toString('hex')
           },(err,user) => {
               
               if(err){
                 console.log(err);
                 return cb(err);
               }
            
               if(user)
               {
                   return cb(null,user);
               }
               else
               {
                  console.log('new user not able to create'); 
                  return cb(null,false);
               }
           });
        }
     });
  }
));

module.exports = passport;
