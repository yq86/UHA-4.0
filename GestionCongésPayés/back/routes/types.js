require('../config/db');
const express = require('express');
const typesRouter =  express.Router();
const typesCtrl = require('./controllers/types');
const authenticateToken = require('./auth');

typesRouter.get('/all', authenticateToken, typesCtrl.getAllTypes);

//typesRouter.get('/all', typesCtrl.getAllTypes);

module.exports = typesRouter;