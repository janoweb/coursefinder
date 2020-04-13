const express = require('express');
const morgan = require('morgan');

//import routes:
const courseRouter = require('./routes/courseRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//middleware: 
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
};

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('Hi from middlleware'),
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


//routes
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;