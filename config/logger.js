

const path = require('path');
const morgan = require('morgan');//writes the log in the file
const rfs = require('rotating-file-stream');
const fs = require('fs');
const env = require('./environment');

const logDirectory = path.join(__dirname,'../production_log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const rotatingLogStream = rfs.createStream('access.log',{
    path:logDirectory,
    interval:'1d'
});


module.exports = morgan(env.logger.mode,{stream:rotatingLogStream});