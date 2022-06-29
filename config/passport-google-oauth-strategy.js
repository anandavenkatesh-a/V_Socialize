

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
passport.use(new GoogleStrategy({
    clientID: '957095670216-r9s7dnb5ol57r7mmrtnknd2kkajucn77.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:9000/user/auth/google/callback',
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
