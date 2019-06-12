const express = require('express');
const monsgoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

monsgoose.connect('mongodb://xpto:xpto123@ds151602.mlab.com:51602/customers', {
    useNewUrlParser: true,
})

app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'))

server.listen(3333)