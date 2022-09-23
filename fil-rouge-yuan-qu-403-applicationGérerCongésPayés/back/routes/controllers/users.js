require('../../config/db');
const { Users } = require("../../models");
const { Holidays } = require("../../models");
const { Demandes } = require("../../models");
const { Types } = require("../../models");
const { Statuses } = require("../../models");
// to create users
exports.createUser = async (req, res) => {
    try{
        const user = req.body;
        await Users.create(user).then(createdUser=>{
            res.json(createdUser); // return created user
            const idUser = createdUser.id;
            const role = createdUser.role;
            const startingDate = createdUser.firstWorkingDay;
            if(role==2||role==3){ // si user n'est pas admin, create holiday
            // to get the date of 6 months after first working date
                const dateWorked6months = new Date(new Date(startingDate).setMonth(new Date(startingDate).getMonth()+6));
                let totalConge;
                if( !(new Date()<dateWorked6months)){ // if this employee has been working for more than 6 months
                    // to calculate days of congés payés
                    totalConge = calculateCongesPayes(startingDate);    
                } else { // if this employee has not been working for more than 6 months
                    totalConge = 0;  // no congés payés normale available
                }            
                const holiday = {
                    "UserId": [idUser],
                    "holidaysAvailable": totalConge,
                    "holidaysTaken": 0
                    };
                Holidays.create(holiday); //to create this employee's paid leaves
            }    
        });    
    } catch (error) {
        res.send(error);
        }
};

// to get all the users
exports.getAll = async (req, res) => {
    try{
        const users = await Users.findAll({ 
            include: [ Demandes,Holidays ]
        });
        res.json(users); // to return the list of users
    }catch (error) {
        // res.send(error);
    }
};

// to get user by id
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findByPk(id, { 
            include: [ {
                model: Demandes,
                include: [ Types, Statuses ]
            },
            
                Holidays ]
        });
        res.json(user); 
    }catch (error) {
        res.send(error);
    }    
};

// to get user by userName
exports.getUserByUserName = async (req, res) => {
    try{
        const userName = req.body.userName;
        const user = await Users.findOne({
            where: {userName: [userName]},
            include: [ Demandes, Holidays ]
            });
        res.json(user);
    }catch (error) {
        res.send(error);
    }
};


// to delete user by id
exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const holiday = await Holidays.findByPk(id);
        const demandes = await Demandes.findAll({
            where: {UserId: [id]}
        });
        // if this user has holidays, delete his holidays
        if(holiday){ 
            await Holidays.destroy({where: {UserId: [id]}});
        }
        // if this user has demandes, delete them
        if(demandes){
            demandes.forEach(el => {
                Demandes.destroy({where: {UserId: [id]}});
            });
        }
        // delete this user
        await Users.destroy({where: {id: [id]}}); 
        res.json("user and user's holidays are deleted");     
    }catch (error) {
        res.send(error);
    }

};

// to update user
exports.updateUser = async (req, res) => {
    try {
        const id = req.body.id;
        const user = await Users.findByPk(id);  
        if(user){ // si user exists
            let objUser = req.body;
            delete objUser.id;     
            await Users.update(objUser,{    // update user
                where: { 
                    id : [id]
                },
                returning: true
            }).then(async ()=>{
                // get and return this user after being updated
                const updatedUser = await Users.findByPk(id);          
                const holiday = await Holidays.findByPk(id);
                const holidayUpdate = updateHoliday(updatedUser, holiday);
                if(holidayUpdate){
                    Holidays.update(holidayUpdate,{    // update user
                        where: { 
                            idUser : [id]
                        }
                    });  
                }
                const newUser = await Users.findByPk(id, {
                    include: [ Holidays]
                });
                res.json(newUser);
            });
        } else {
            res.json("user doesn't exist");
        }
    }catch (error) {
        res.send(error);
    }
};

exports.updateUserHoliday = async (req, res) => {
    try {
        const id = req.params.idUser;   
        // get and return this user after being updated
        const updatedUser = await Users.findByPk(id);
            // return updated user    
        const holiday = await Holidays.findByPk(id);
        const holidayUpdate = updateHoliday(updatedUser, holiday);
        if(holidayUpdate){
            Holidays.update(holidayUpdate,{    // update user
                where: { 
                    idUser : [id]
                }
            });  
        }
        res.json(holidayUpdate) ;
    }catch (error) {
        res.send(error);
    }
};


function calculateCongesPayes(startingDate){
    try {
        const fullMonths = new Date().getMonth() -startingDate.getMonth()-1 +12 * (new Date().getFullYear() - startingDate.getFullYear());
        // to calculate worked days of current month
        const today = new Date();
        const num = today.getDate();
        let daysPast = 0;
        for(let i=1; i<=num; i++){     
            today.setDate(i);
            let day = today.getDay();
            if(!(day==0 || day == 6)){
                daysPast += 1;
            }               
        }
    // to calculate worked days of first working months
        const firstWorkingDay = startingDate.getDate();
        const year = startingDate.getFullYear();
        const month = startingDate.getMonth()+1;
        const days = new Date(year, month, 0).getDate();
        let daysWorked = 0;
        for(let i=firstWorkingDay; i<=days; i++){     
            startingDate.setDate(i);
            let day = startingDate.getDay();
            if(!(day==0 || day == 6)){
                daysWorked += 1;
            }               
        }   
        const totalConge = parseFloat(fullMonths*2.5 + 2.5/21*(daysPast+daysWorked)).toFixed(1); 
        return totalConge;
    } catch (error) {
        res.send(error);
    }           
};

function updateHoliday(user, holiday){
    try {
        const role = user.role;
        if(role==2 || role==3){ // try to update user's holiday if user is employee or manager
            const startingDate = user.firstWorkingDay;
            const dateWorked6months = new Date(new Date(startingDate).setMonth(new Date(startingDate).getMonth()+6));
                // recalculate paid leaves
            if( new Date() >= dateWorked6months){ //update user's holiday if user has been working for more than 6 months 
                const totalPaidLeaves = calculateCongesPayes(startingDate);
                const holidaysTaken = holiday.holidaysTaken;
                const holidaysAvailable = totalPaidLeaves - holidaysTaken;
                const holidayUpdate = {
                    "holidaysAvailable": holidaysAvailable, 
                    "holidaysTaken": [holidaysTaken]
                    };
                return holidayUpdate;
            }
        }    
    } catch (error) {
        res.send(error);
    }   
}