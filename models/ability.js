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
        },

        forClass: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Ability;
};
