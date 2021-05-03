module.exports = function (sequelize, DataTypes) {
    const Ability = sequelize.define("Ability", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        type: {
            type: DataTypes.STRING,
            allowNull: false
        },

        effect: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Ability.associate = (db) => {
        Ability.belongsTo(db.Class);
    };

    // Ability.associate = (db) => {
    //     Ability.belongsTo(db.Enemy);
    // };

    return Ability;
};
