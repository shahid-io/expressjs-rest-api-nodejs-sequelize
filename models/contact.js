module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "contacts",
    {
      //Model (Contact) attribute
      permanent_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      current_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "contacts",
    }
  );
  return Contact;
};
