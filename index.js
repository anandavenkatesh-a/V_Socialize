

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport'); //Passport is middleware for Node.js that makes it easy to implement authentication and authorization.
const localAuth = require('./config/passport_auth_local_strategy');
const passportJwt = require('./config/passport_jwt');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash'); 
const customMiddlware = require('./config/custom_middlewares');
const port = 9000;

//Models
const User = require('./models/user');
 
//creating express application
const app = express();

//statring server on this port
app.listen(port,(err) => {
    if(err)
    {
       console.log(`Error in starting server : ${err}`);
    }
    else
    {
       console.log(`Anandhamalthunai :: server is running on port : ${port}`);
    }
}); 

//middlewares(to build express application)

//setup parsers
app.use(express.urlencoded());
app.use(cookieParser()); //to populate req.cookies with an object keyed by cookie name

//setup layout(must be written above routing)
app.use(expressLayouts);
app.set('layout','./layouts/layout1'); //setting default layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setup sass
app.use(sassMiddleware({
   src:"./assets/scss",
   dest:"./assets/css",
   debug:true, //untill production stage it should be true
   outputStyle:"expanded",
   prefix:"/css"
}));

//setup static folder
app.use(express.static('./assets'));
app.use('/uploads',express.static( __dirname + '/uploads'));

//set up views and view engine
app.set('view engine','ejs');
app.set('views','./views');

//To create cookie(present in brower) which stores the sessionID of a session(which is in server)
//these cookies are called session cookies
app.use(session({
   name:"sessionid9000",
   resave:false,
   secret:"Anandamalthunai",
   saveUninitialized:false,
   cookie:{
      maxAge : (1000*60*90)
   },
   store:MongoStore.create({
      client:db.getClient(),
      autoRemove:"native",
      collectionName:"session"
   })
}));

//to use passport and maintain session using passport
app.use(passport.initialize()); // to instailize paasport
app.use(passport.session());

/* passport.session() acts as a middleware to alter the req 
object and change the 'user' value that is currently the session 
id (from the client cookie) into the true deserialized user object */

//set user details
app.use(localAuth.setAuthenticatedUserDetails);


//set up flash
app.use(flash());
app.use(customMiddlware.renderFlash);
//routing
app.use('/',require('./routers/index'));

