module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: "KK",
      },
    },
    {
      sequelize, //connection instance
      modelName: "users", //model name
    }
  );
  return User;
};
