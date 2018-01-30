/**
 * Created by hl on 2018/1/29.
 */
const path = require('path');
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', userRouter);

//错误处理
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000);
