// create table Holidays
module.exports = (sequelize, DataTypes) => {
    try{
        const Holidays = sequelize.define("Holidays", {
        holidaysAvailable: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        holidaysTaken: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
        },{
            updatedAt: false, 
            createdAt: false
        });
        Holidays.associate = function (models) {
            Holidays.belongsTo(models.Users, {foreignKey: {allowNull: false}});
        }; 
        return Holidays;
    } catch (error) {
        console.error(error);
    }  
};