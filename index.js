

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());

//setup layout(must be written above routing)
app.use(expressLayouts);
app.set('layout','./layouts/layout1'); //setting default layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setup static folder
app.use(express.static('./assets'));

//routing
app.use('/',require('./routers/index'));

//set up views and view engine
app.set('view engine','ejs');
app.set('views','./views');



