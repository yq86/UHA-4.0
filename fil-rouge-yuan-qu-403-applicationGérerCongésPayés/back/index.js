require('./config/db');
const express = require("express");
const http = require('http');
const app = require('./app');
const db = require("./models"); 

// get rid of error of empty api
app.get('/', (req, res)=>{
    res.send(200);
});

// routers
const usersRouter = require('./routes/users');
const holidaysRouter = require('./routes/holidays');
const demandesRouter = require('./routes/demandes');
app.use('/users', usersRouter);
app.use('/holidays', holidaysRouter);
app.use('/demandes', demandesRouter);




const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '9090');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE': 
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};


const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => { 
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

db.sequelize.sync().then(()=>{ // to create all the tables using sequelize
    server.listen(port);
});

