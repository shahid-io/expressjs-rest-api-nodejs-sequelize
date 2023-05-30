const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "root", {
  host: "localhost",
  logging: false /* we can avoid console messages with this */,
  dialect: "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};

db.Sequelize = sequelize;
db.sequelize = sequelize;
// console.log(db);
/**
 * this is realtime use case of currying
 */
db.contact = require("./contact")(sequelize, DataTypes);
db.user = require("./user")(sequelize, DataTypes);

db.sequelize.sync({ force: false });

module.exports = db;
