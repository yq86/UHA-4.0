// create table Statuses with default values
module.exports = (sequelize, DataTypes) => {
    try {
        const Statuses = sequelize.define("Statuses", {
            name: {
                type: DataTypes.STRING,
                unique: true,
            }
        },{
            updatedAt: false,
            createdAt: false
        });
        Statuses.associate = function (models) {
            Statuses.hasMany(models.Demandes, {foreignKey: {allowNull: false}});
        }; 
        Statuses.sync().then((status) => {
            status.bulkCreate([
                { name: "en cours" },
                { name: "validée" },
                { name: "refusée" }
            ],{ignoreDuplicates: true});        
        });                 
        return Statuses;
    } catch (error) {
        console.error(error);
    }    
};

