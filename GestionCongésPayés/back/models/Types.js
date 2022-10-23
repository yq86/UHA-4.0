// create table Types with default values
module.exports = (sequelize, DataTypes) => {
    try {
        const Types = sequelize.define("Types", {
            name: {
                type: DataTypes.STRING,
                unique: true,
            }
        },{
            updatedAt: false,
            createdAt: false
        });
        Types.associate = function (models) {
            Types.hasMany(models.Demandes, {foreignKey: {allowNull: false}});
        }; 
        Types.sync().then((types) => {
            types.bulkCreate([
                { name: "normal"},
                { name: "maladie" },
                { name: "maternité" },
                { name: "mariage" },
                { name: "funéraille" },
            ],{ignoreDuplicates: true});     
        });   
        return Types;
    } catch (error) {
        console.error(error);
    }    
};

