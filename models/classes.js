module.exports = function (sequelize, DataTypes) {
    const Classes = sequelize.define("Classes", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    return Classes;
};
