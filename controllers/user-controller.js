const db = require("../models/index");
//or
// const db = require("../models");
const { Sequelize } = require("sequelize");
const User = db.user;

const addUser = async (req, res) => {
  try {
    const user = User.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    /**
     * or we can say
     * const data = req.body;
     * const user = User.create(data)
     */

    await user.save();
    console.log(user.toJSON());
    res.status(200).json({ message: "A new User has been added", user });
  } catch (error) {
    console.error("Erro adding one user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addUsers = (async = (req, res) => {
  try {
    const users = User.bulkCreate(req.body);
    res
      .status(200)
      .json({ message: "New Users has been Added to Database", users });
  } catch (error) {
    console.error("Error while adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getUser = async (req, res) => {
  try {
    const data = await User.findAll({});
    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error while getting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const data = await User.findOne({ where: { id: req.params.id } });
    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error while fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await User.destroy({ where: { id: req.params.id } });

    if (data == 0) {
      res.status(404).send("not found");
    }
    res.status(200).json({
      message: `User with id ${req.params.id} has been deleted.`,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.body;
    console.log("User:", user);

    const updatedUser = await User.update(user, {
      where: { id: req.params.id },
    });
    console.log(updateUser);

    if (updatedUser[0] === 0) {
      // If no rows were affected, it means the user with the given ID does not exist
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUsernames = async (req, res) => {
  try {
    const username = await User.findAll({
      attributes: ["firstName", "lastName"],
    });
    res.status(200).json({ user: username });
  } catch (error) {}
};

/**
 * usecase of fields option while creating user
 */
const queryUser = async (req, res) => {
  try {
    const user = await User.create(
      {
        firstName: "Alen",
        lastName: "Wilson",
      },
      { fields: ["firstName"] }
    );
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
  }
};

/**
 * get count of users (no. of users)
 */
const getUserCount = async (req, res) => {
  try {
    const userCount = await User.findAll({
      attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "User Count"]],
    });
    res.status(200).json({ userCount });
  } catch (error) {
    console.log(error);
  }
};

/**
 * find or create
 */

const findOrCreateUser = async (req, res) => {
  try {
    const [user, created] = await User.findOrCreate({},{
      where: { firstName: "raza" },

    });
    res.status(200).json({ data: user, created });
  } catch (error) {
    console.log(error);
  }
};

/**
 * findAll
 * findByPk
 * findOne
 * findOrCreate
 * findAndCountAl
 */

module.exports = {
  addUser,
  addUsers,
  getUser,
  getUserById,
  deleteUser,
  updateUser,
  queryUser,
  getUsernames,
  getUserCount,
  findOrCreateUser,
};
