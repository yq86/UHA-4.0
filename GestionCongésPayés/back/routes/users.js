require('../config/db');
const express = require('express');
const usersRouter =  express.Router();
const usersCtrl = require('./controllers/users');
const authenticateToken = require('./auth');


usersRouter.post('/', authenticateToken, usersCtrl.createUser);
usersRouter.get('/all', authenticateToken, usersCtrl.getAll); // pass the accessToken in req.body to finally securize the backend
usersRouter.get('/getById/:id', authenticateToken, usersCtrl.getUserById);
usersRouter.post('/login', usersCtrl.userLogin);
usersRouter.delete('/logout', authenticateToken, usersCtrl.userLogOut);
usersRouter.post('/token', authenticateToken, usersCtrl.userToken);
usersRouter.delete('/deleteById/:id', authenticateToken, usersCtrl.deleteUserById);
usersRouter.put('/update', authenticateToken, usersCtrl.updateUser);
usersRouter.put('/updateHoliday/:idUser', authenticateToken, usersCtrl.updateUserHoliday);


//function test


// usersRouter.post('/', usersCtrl.createUser);
// usersRouter.get('/all', usersCtrl.getAll); // pass the accessToken in req.body to finally securize the backend
// usersRouter.get('/getById/:id',usersCtrl.getUserById);
// usersRouter.post('/login', usersCtrl.userLogin);
// usersRouter.delete('/logout', usersCtrl.userLogOut);
// usersRouter.post('/token', usersCtrl.userToken);
// usersRouter.delete('/deleteById/:id', usersCtrl.deleteUserById);
// usersRouter.put('/update', usersCtrl.updateUser);
// usersRouter.put('/updateHoliday/:idUser', usersCtrl.updateUserHoliday);

module.exports = usersRouter;