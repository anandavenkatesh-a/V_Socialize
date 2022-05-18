

//ODM
const mongoose = require('mongoose');

//Connect to  db
mongoose.connect('mongodb://localhost/v_socialize_dev');

//accesing the connection
const db = mongoose.connection;

//error handling and veryfying conecttion
db.on('error',console.error.bind(console,'Error in connecting to v_socialize_dev db'));
db.once('open', () => {
    console.log('Anandhamalthunai :: connected to db : v_socialize_dev');
});

//export it
module.exports = db;