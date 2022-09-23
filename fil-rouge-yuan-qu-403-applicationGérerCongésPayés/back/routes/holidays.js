require('../config/db');
const express = require('express');
const holidaysRouter =  express.Router();
const holidaysCtrl = require('./controllers/holidays');

holidaysRouter.get('/', holidaysCtrl.getAllUsersHolidays);
holidaysRouter.get('/getById/:idUser', holidaysCtrl.getHolidayByIdUser);
module.exports = holidaysRouter;