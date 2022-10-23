const { Types } = require("../../models");

exports.getAllTypes = async (req, res) => {
    try{
        const types = await Types.findAll();
        res.json(types); // to return the list of users
    }catch (error) {
        res.send(error);
    }finally{
    res.end();
    }
};