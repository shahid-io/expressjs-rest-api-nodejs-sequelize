const db = require("../models");

const Contact = db.contact;

const addContact = async (req, res) => {
  /**
   * instead of build we can use create if we donts want to save data by ourselves
   */

  //   const shahidContact = Contact.build({
  //     permanent_address: "Patna, Bihar",
  //     current_address: "Kochi, Kerala",
  //   });

  const shahidContact = await Contact.create({
    permanent_address: "Patna, Bihar",
    current_address: "Kochi, Kerala",
  });
  /**
   * we have set() and update() methods to modify the data after create()
   *
   */

  //   await shahidContact.set({
  //     permanent_address: "Patna, Saran, Bihar",
  //     current_address: "Kochi, Kerala",
  //   });
  //   shahidContact.save();

  // await shahidContact.update({
  //   permanent_address: "Patna, Bihar",
  //   current_address: "Kochi Infopark, Kerala",
  // });
  // shahidContact.save();
  //   await shahidContact.save(); //dont need to use save if ceate being used.
  res.status(200).json(shahidContact.toJSON());
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    if (!contacts) {
      return res.status(204).send({ message: "Not found" });
    }
    res.status(200).json({ message: "List of contacts", contacts });
  } catch (error) {
    console.error("Error while fetching all contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addContacts = async (req, res) => {
  try {
    const address = await Contact.bulkCreate(req.body);
    res.status(200).json({ message: "Contacts as been added", address });
  } catch (error) {
    console.error("Error while adding contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const contactById = async (req, res) => {
  try {
    const data = await Contact.findOne({ where: { id: req.params.id } });
    // console.log(data);
    if (!data) {
      return res.status(204).send({ message: "Not found" });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    console.error("Error while finding contact by id :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateContact = async (req, res) => {
  try {
    const contact = req.body;
    const updatedContact = await Contact.update(contact, {
      where: { id: req.params.id },
    });
    console.log(updatedContact);
    if (updateContact[0] === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Contact updated successfylly" });
  } catch (error) {
    console.error("Error while updating contact by id :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const data = await Contact.destroy({ where: { id: req.params.id } });
    if (!data) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res
      .status(200)
      .json({ message: `With Id ${req.params.id} Contact has been deleted` });
  } catch (error) {}
};

module.exports = {
  addContact,
  addContacts,
  contactById,
  updateContact,
  getContacts,
  deleteContact,
};
