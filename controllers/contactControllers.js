const asyncHandler = require('express-async-handler');
const contact = require('../models/contactModel');
// @desc Get all contact
//@route Get /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc create a new contact
//@route post /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log('the data from the user is this ', req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('All fields are mandotary');
  }
  const contacts = await contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contacts);
});

//@desc update a  contact
//@route put /api/contacts
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('contact not found');
  }
  if (contact.user.id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      'user is have no permission to update the other user contacts'
    );
  }

  const updatedContact = await contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateContact);
});
//@desc get a  contact
//@route get /api/contacts
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contacts = await contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contacts);
});

//@desc  delete  a  contact
//@route delete /api/contacts
//@access private

const deleteContact = asyncHandler(async (req, res) => {
  const contacts = await contact.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json(contacts, { message: 'the contact deleted successsfully' });
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  getContact,
  deleteContact,
};
