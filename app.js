const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');




const db = require('./config/database');
require('./models/Album');
db.sync();


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req,res,next)=>{
    let err = new Error('Not Found');
    err.status = 404;

    next(err);
});
app.use((error, req, res) => {
    res.status(error.status || 500).json({error: error.message || ''})
});



module.exports = app;
