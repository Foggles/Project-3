
module.exports = function (sequelize, DataTypes) {
    const Enemy = sequelize.define("Enemy", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        health: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Enemy.associate = (db) => {
        Enemy.hasMany(db.Ability);
    }

    return Enemy;
};
