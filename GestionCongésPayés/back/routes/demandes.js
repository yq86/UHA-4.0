require('../config/db');
const express = require('express');
const demandesRouter =  express.Router();
const demandesCtrl = require('./controllers/demandes');
const authenticateToken = require('./auth');


demandesRouter.post('/', authenticateToken, demandesCtrl.createDemande);
demandesRouter.get('/all', authenticateToken, demandesCtrl.getAllDemandes);
demandesRouter.get('/getById/:id', authenticateToken, demandesCtrl.getDemandeById);
demandesRouter.get('/getByIdUser/:idUser', authenticateToken, demandesCtrl.getDemandeByIdUser);
demandesRouter.delete('/deleteById/:id', authenticateToken, demandesCtrl.deleteDemandeById);
demandesRouter.put('/update', authenticateToken, demandesCtrl.updateDemande);


//function test
// demandesRouter.post('/', demandesCtrl.createDemande);
// demandesRouter.get('/all', demandesCtrl.getAllDemandes);
// demandesRouter.get('/getById/:id', demandesCtrl.getDemandeById);
// demandesRouter.get('/getByIdUser/:idUser', demandesCtrl.getDemandeByIdUser);
// demandesRouter.delete('/deleteById/:id',  demandesCtrl.deleteDemandeById);
// demandesRouter.put('/update', demandesCtrl.updateDemande);

module.exports = demandesRouter;