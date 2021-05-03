module.exports = function (sequelize, DataTypes) {
    const Character = sequelize.define("Character", {
        seed: {
            type: DataTypes.STRING,
            allowNull: false,
            uniqe: true
        },

        faction: {
            type: DataTypes.STRING,
            allowNull: false
        },

        level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        health: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        mana: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    
    Character.associate = (db) => {
        Character.belongsTo(db.User);
    };

    return Character;
};
