module.exports = function (sequelize, DataTypes) {
    const Class = sequelize.define("Class", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    });

    Class.associate = (db) => {
        Class.belongsTo(db.Character);
    }

    Class.associate = (db) => {
        Class.hasMany(db.Ability);
    }

    return Class;
};
