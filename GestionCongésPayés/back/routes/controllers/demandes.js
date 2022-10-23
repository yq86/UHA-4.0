require('../../config/db');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const { Demandes } = require("../../models");
const { Holidays } = require("../../models");
const { Types } = require("../../models");
const { Users } = require("../../models");
const { Statuses } = require("../../models");
const cron = require('node-cron');

// to create demande
exports.createDemande = async (req, res) => {
    try{
        const demande = req.body;
        demande.StatusId = 1;
        const idUser = req.body.UserId;   
        const user = await Users.findByPk(idUser);
        if (user) {
            const holiday = await Holidays.findOne({
                where: {
                    UserId: [idUser]
                }
            });
        
            const date1 = new Date(demande.startingDate);
            const date2 = new Date(demande.endingDate);
            const daysDemande = Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24) + 1);
            // res.json(daysDemande)
            if (demande.TypeId == 1 && holiday.holidaysAvailable >= daysDemande) { // if user has enough holidays
                await Demandes.create(demande).then(createdDemande => { // create demande
                    res.status(201); // return status Created
                });
            } else if (demande.TypeId == 1 && holiday.holidaysAvailable < daysDemande) { // if user doesnt have enough holidays
                res.send(400, "you dont have enough holidays");
            } else if (demande.TypeId != 1) { // si demande d'autre type de congés payés
                // create demande
                await Demandes.create(demande).then(async (createdDemande) => {
                    /*const idDemande = createdDemande.id;
                    const newDemande = await Demandes.findByPk(idDemande, {
                        include: [Types, Statuses, Users]
                    }); */
                    res.send(201); // return status Created
                });
            }
        } else {
            res.send(400, "user does not exist");
        }    
    } catch (error) {
        res.send(error);
    }finally{
    res.end();
    }
};

//to get all demandes
exports.getAllDemandes = async (req, res) => {
    try{
        const demandes = await Demandes.findAll({
            include: [ Users, Types, Statuses]
        });
        res.json(demandes); // to return the list of users
    }catch (error) {
        res.send(error);
    }finally{
    res.end();
    }
};

//to get demande by id
exports.getDemandeById = async (req, res) => {
    try {
        const id = req.params.id;
        const demande = await Demandes.findByPk(id,{
            include : [Users, Types, Statuses]
        });
        res.json(demande); 
    }catch (error) {
        res.send(error);
    }finally{
    res.end();
    } 

};

// to get demandes by id user
exports.getDemandeByIdUser = async (req, res) => {
    try {
        const id = req.params.idUser;
        const demandes = await Demandes.findAll({
            include: [ Users, Types, Statuses],
            where: {
                UserId: [id]
            }
        });
        res.json(demandes); 
    }catch (error) {
        res.send(error);
    }finally{
    res.end();
    } 
};

// to delete demande by id
exports.deleteDemandeById = async (req, res) => {
    try {
        const id = req.params.id;
        const demande = await Demandes.findByPk(id);
        // if this user has holidays, delete his holidays
        if(demande){ 
            if(demande.idStatus !=2 ){
                await Demandes.destroy({
                    where: {
                        id: [id]
                    }
                });
                /*
                const demandes = await Demandes.findAll({
                    include: [ Users, Types, Statuses ]
                }); */
                res.status(200);
            } else {
                res.send(400, "demande accepted, can not be deleted");
            }    
        }else {
            res.send(400, "demande doesn't exist");
        }
    }catch (error) {
        res.send(error);
    }finally{
    res.end();
    }
};

// to update demande
exports.updateDemande = async (req, res) => {
    try {
        const id = req.body.id;
        const demandeOriginal = await Demandes.findByPk(id);
        if (demandeOriginal) {
            const objDemande = req.body;
            const iduser = demandeOriginal.UserId;
            const idtype = demandeOriginal.TypeId;
            const status = req.body.StatusId;
            const description = req.body.description;
            delete objDemande.id;
            if (status == 3) {  // if refuse
                if (!description) { // description required

                    res.send(400, "please specify the reason of refuse");
                    
                 //   res.json("please specify the reason of refuse");
                } else {
                    await Demandes.update(objDemande, { // to update demande
                        where: { id: [id] }
                    });
                    // to send email to user
                    sendEmailToEmployee(iduser, id);
                    /*
                    const demande = await Demandes.findByPk(id, {
                        include: [Users, Types, Statuses]
                    }); */
                    res.status(200); // return status ok
                }
            } else if (status == 2 && idtype == 1) { // if congé payé normale accepted
                await Demandes.update(objDemande, { // update demande status
                    where: { id: [id] }
                });
                // to update holiday
                const holiday = await Holidays.findOne({
                    where: { UserId: iduser }
                });
                const date1 = new Date(demandeOriginal.startingDate);
                const date2 = new Date(demandeOriginal.endingDate);
                const daysDemande = Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24) + 1);
                const holidaysAvb = holiday.holidaysAvailable - daysDemande;
                const holidaysTaken = holiday.holidaysTaken + daysDemande;
                const holidayUpdate = {
                    "holidaysAvailable": holidaysAvb,
                    "holidaysTaken": holidaysTaken
                };
                await Holidays.update(holidayUpdate, {    // update holiday
                    where: {
                        UserId: iduser
                    },
                });
                // to send email to user
                sendEmailToEmployee(iduser, id);
                /*
                const demande = await Demandes.findByPk(id, {
                    include: [Users, Types, Statuses]
                });*/
                res.status(200);
            } else if (status == 2 && idtype != 1) { // if other type(maladie...) congé payé accepted
                await Demandes.update(objDemande, { // update demande status
                    where: { id: [id] }
                });
                /*
                const demande = await Demandes.findByPk(id, {
                    include: [Users, Types, Statuses]
                });*/
                // to send email to user
                sendEmailToEmployee(iduser, id);
                res.status(200);
            } else if (status == 1) {
                await Demandes.update(objDemande, { // to update demande
                        where: { id: [id] }
                    });
                    // to send email to user
                sendEmailToEmployee(iduser, id);
                /*
                    const demande = await Demandes.findByPk(id, {
                        include: [Users, Types, Statuses]
                    }); */
                    res.status(200); // return updated demande
            }
        } else {
            res.json("demande does not exist");
        }
    }catch (error) {
        res.send(error);
    }finally{
    res.end();
    }
};

async function sendEmailToEmployee(idUser, idDemande){
    try{
        const user = await Users.findByPk(idUser); 
        const demande = await Demandes.findByPk(idDemande);
        const idStatus = demande.StatusId;
        const idType = demande.TypeId;
        const status = await Statuses.findByPk(idStatus);
        const type = await Types.findByPk(idType);
        const typeName = type.name;
        const statusName = status.name;
        const email = user.email;
        const description = demande.description;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const startingD = demande.startingDate;
        const startingDate = startingD.toLocaleString('Fr-fr', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const endingD = demande.endingDate;
        const endingDate = endingD.toLocaleString('Fr-fr', { year: 'numeric', month: '2-digit', day: '2-digit' })
        let messageContent = 'Bonjour, veuillez consulter le nouveau statut de votre demande de congés payés.';
        let content = `<br><table style="display: flex; border-bottom: #eee 1px solid; color: #000;margin-top: 80px; margin-left: 120px ">
                            <tr>
                                <th style="padding-bottom: 5px; padding-right: 20px">Prénom</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Nom</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Congé type</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Status</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Du</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Au</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Description</th>
                            </tr>
                            <tr>
                                <td style="padding-right: 20px"> `;
                                
        content += firstName;
        content += `</td>
        <td style="padding-right: 20px">`;
        content += lastName;
        content += `</td>
        <td style="padding-right: 20px">`; 
        content += typeName;
        content += `</td>
        <td style="padding-right: 20px">`; 
        content += statusName;
        content += `</td>
        <td style="padding-right: 20px">`; 
        content += startingDate;
        content += `</td>
        <td style="padding-right: 20px">`;  
        content += endingDate;
        content += `</td>
        <td style="padding-right: 20px">`;  
        content += description;
        content += `</td>
        <tr>                  
        </table>`;

        messageContent += content;
        const nodemailer = require('nodemailer');
        let transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: "11590b13c9bd26",
                pass: "9783192eb4bc16"
            }
        });

        let message = {
            from: "request@email.com",
            to: email,
            subject: "Demande congé payé",
            html: messageContent
        };
        transporter.sendMail(message, function(err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        }); 
    }catch(error) {
        console.log(error);
    }
}

async function sendEmailToManager(){ 
    try {
        let date = new Date();
        const bigYesterday =new Date(date.setDate(date.getDate()-4));
        const today = new Date()

        // find all the managers
        const managers =await Users.findAll({
            where: { role: 2} // to get managers
        });
        // find demandes from the last 5 days
        const demandes = await Demandes.findAll({
            where: {
                createdAt: {
                    [op.between]: [ bigYesterday, today],
                }
            }
        });
        let messageContent = 'Bonjour, veuillez consulter les demandes des congés payés des derniers 5 jours.';
        let content = `<br><table style="display: flex; border-bottom: #eee 1px solid; color: #000;margin-top: 80px; margin-left: 120px ">
                            <tr>
                                <th style="padding-bottom: 5px; padding-right: 20px">Prénom</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Nom</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Congé type</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Status</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Du</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Au</th>
                                <th style="padding-bottom: 5px; padding-right: 20px">Description</th>
                            </tr>`;

        for(const demande of demandes){
            const idStatus = demande.idStatus;                           
            const idType = demande.idType;
            const idUser = demande.idUser;
            const status = await Statuses.findByPk(idStatus);                       
            const type = await Types.findByPk(idType);
            const user = await Users.findByPk(idUser);                           
            const typeName = type.name;
            const statusName = status.name;
            const description = demande.description;
            const firstName = user.firstName;                           
            const lastName = user.lastName;
            const startingD = demande.startingDate;
            const startingDate = startingD.toLocaleString('Fr-fr', { year: 'numeric', month: '2-digit', day: '2-digit' });
            const endingD = demande.endingDate;
            const endingDate = endingD.toLocaleString('Fr-fr', { year: 'numeric', month: '2-digit', day: '2-digit' });
        
            content += `<tr>
            <td style="padding-right: 20px"> `;
            
            content += firstName;
            content += `</td>
            <td style="padding-right: 20px">`;
            content += lastName;
            content += `</td>
            <td style="padding-right: 20px">`; 
            content += typeName;
            content += `</td>
            <td style="padding-right: 20px">`; 
            content += statusName;
            content += `</td>
            <td style="padding-right: 20px">`; 
            content += startingDate;
            content += `</td>
            <td style="padding-right: 20px">`;  
            content += endingDate;
            content += `</td>
            <td style="padding-right: 20px">`;  
            content += description;
            content += `</td>
            <tr>`;                 
        }
        content += `</table>`;
        messageContent += content;

        const nodemailer = require('nodemailer');
        let transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: "11590b13c9bd26",
                pass: "9783192eb4bc16"
            }
        });

        for(const manager of managers){
            const email = manager.email;
            message = {
                from: "request@email.com",
                to: email,
                subject: "Demande congés payés des derniers 5 jours",
                html: messageContent
            };
            transporter.sendMail(message, function(err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(info);
                }
            }); 
        }
    } catch (error) {
        console.log(error);
    }
}

// to delete refused demandes
async function deleteDemandesRefused(){
    try{
        const demandes = await Demandes.destroy({ // to delete refused demandes 
            where: { idStatus: 3}
        });
    }catch (error) {
        console.log(error);
    }
}

// send email to managers every morning at 6am from monday to friday
cron.schedule('00 06 * * 1-5', () => {
    try{
        sendEmailToManager();
    }catch (error) {
        console.log(error);
    }
    
});

// delete refused demandes every morning at 6:30am from monday to friday
cron.schedule('30 06 * * 1-5', () => {
    try{
        deleteDemandesRefused();
    }catch (error) {
        console.log(error);
    }
});
