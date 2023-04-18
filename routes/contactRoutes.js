const express = require('express');
const {
  getContacts,
  createContact,
  updateContact,
  getContact,
  deleteContact,
} = require('../controllers/contactControllers');
const ValidateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
router.use(ValidateToken);
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
