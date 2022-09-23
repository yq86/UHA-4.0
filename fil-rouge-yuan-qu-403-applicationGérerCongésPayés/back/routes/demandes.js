require('../config/db');
const express = require('express');
const demandesRouter =  express.Router();
const demandesCtrl = require('./controllers/demandes');

demandesRouter.post('/create', demandesCtrl.createDemande);
demandesRouter.get('/', demandesCtrl.getAllDemandes);
demandesRouter.get('/getById/:id', demandesCtrl.getDemandeById);
demandesRouter.get('/getByIdUser/:idUser', demandesCtrl.getDemandeByIdUser);
demandesRouter.delete('/deleteById/:id', demandesCtrl.deleteDemandeById);
demandesRouter.put('/update', demandesCtrl.updateDemande);
module.exports = demandesRouter;