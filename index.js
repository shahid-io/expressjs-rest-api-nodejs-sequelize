const express = require("express");
const bodyParser = require("body-parser");
require("./models/index");
const userController = require("./controllers/user-controller");
const contactController = require("./controllers/contact-controller");
/**
 * this down below code we're importing from models to create table accoding to model
 * but this seems bad practice because if we're having huge amount of tables
 * then doing this become hectic and more no. of lines of code.
 * so better to sync the sequalize itself.
 * Instead of requiring each file individually into main index file
 * we can require model index file which will help us to require all the files
 * by just requiring index file into this file (index.js).
 */

//bad practice
// const User = require("./models/user");
// const Contact = require("./models/contact");

const app = express();
app.use(bodyParser.json());

//first route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

/**
 * User API's
 */
app.post("/addUser", userController.addUser);
app.post("/addUsers", userController.addUsers);
app.get("/addContact", contactController.addContact);
app.get("/allUsers", userController.getUser);
app.get("/user/id/:id", userController.getUserById);
app.delete("/user/delete/:id", userController.deleteUser);
app.patch("/user/update/:id", userController.updateUser);
app.get("/user/query", userController.queryUser);
app.get("/user/name/all", userController.getUsernames);
app.get("/user/count", userController.getUserCount);
app.post("/user/find/create", userController.findOrCreateUser);

/**
 * Contact API's
 */ 
app.get("/contacts", contactController.getContacts);
app.post("/add/contacts", contactController.addContacts);
app.get("/contact/id/:id", contactController.contactById);
app.patch("/contact/update/id/:id", contactController.updateContact);
app.delete("/contact/delete/id/:id", contactController.deleteContact);

/**
 * bad practice to do this below code for creating table with sequelize.
 */
// User.sync({ force: true });
// Contact.sync({ force: true });

app.listen(3000, () => {
  console.log(`Serving at -> http://localhost:3000`);
});
