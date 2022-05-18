

const express = require('express');
const port = 9000;

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

//routing
app.use('/',require('./routers/index'));

//set up views and view engine
app.set('view engine','ejs');
app.set('views','./views');



