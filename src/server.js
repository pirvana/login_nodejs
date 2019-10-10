const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const { url } = require('./config/database');

mongoose.connect(url, {
    //useMongoClient: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//setting
app.set('port', process.env.PORT || 3000 );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//middlewares

//routes

//static Files


 app.listen(app.get('port'), () => {
     console.log('server on port', app.get('port'));
 });