require('../../config/db');
const { Holidays } = require("../../models");
const { Users } = require("../../models");

// to create Holidays
exports.getAllUsersHolidays = async (req, res) => {
    try {
        const holidays = await Holidays.findAll({
            include: [ Users]
        });
        res.json(holidays); // to return the list of holidays
        
    }catch (error) {
        res.send(error);
    }finally{
    res.end();
    }
};

// get holiday by id user
exports.getHolidayByIdUser = async (req, res) => {
    try {
        const id = req.params.idUser;
        const holiday = await Holidays.findOne( {
            where: {UserId: [id]}, 
            include: [ Users ]
        });
        res.json(holiday); 
    }catch (error) {
        res.send(error);
    }finally{
    res.end();
    } 
};


