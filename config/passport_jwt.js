

const { model } = require('mongoose');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const JwtExtract = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
var opts = {}
opts.jwtFromRequest = JwtExtract.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Anandhamalthunai';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

module.exports = passport;
