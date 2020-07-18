const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const albumsRouter = require('./routes/albums');
const usersRouter = require('./routes/users');
const photosRouter = require('./routes/photos');



const db = require('./config/database');
require('./models/index');
db.sync();


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//routes

app.use('/users', usersRouter);
app.use('/albums', albumsRouter);
app.use('/photos', photosRouter);



//error
app.use((req,res,next)=>{
    let err = new Error('Not Found');
    err.status = 404;

    next(err);
});
app.use((error, req, res) => {
    res.status(error.status || 500).json({error: error.message || ''})
});



module.exports = app;
