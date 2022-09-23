require('../config/db');
const express = require('express');
const usersRouter =  express.Router();
const usersCtrl = require('./controllers/users');

usersRouter.post('/create', usersCtrl.createUser);
usersRouter.get('/', usersCtrl.getAll);
usersRouter.get('/getById/:id', usersCtrl.getUserById);
usersRouter.get('/getByUserName', usersCtrl.getUserByUserName);
usersRouter.delete('/deleteById/:id', usersCtrl.deleteUserById);
usersRouter.put('/update', usersCtrl.updateUser);
usersRouter.put('/updateHoliday/:idUser', usersCtrl.updateUserHoliday);

module.exports = usersRouter;