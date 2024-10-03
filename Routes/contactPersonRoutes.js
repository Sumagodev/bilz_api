const express = require('express');
const { upload } = require('../middleware/multer');
const { validateContactPerson, validateContactPersonId } = require('../Validations/contactPersonValidation');
const {
  addContactPerson,
  updateContactPerson,
  getContactPersons,
  toggleContactPersonStatus,
  toggleContactPersonDelete
} = require('../Controllers/contactPersonController');
const authenticateToken = require('../middleware/auth');
const imageRequired = require('../Validations/imageValidation');
const router = express.Router();

router.post('/add', upload.single('img'), imageRequired, validateContactPerson, addContactPerson);
router.put('/update/:id', upload.single('img'), validateContactPerson, validateContactPersonId, updateContactPerson);
router.get('/get', getContactPersons);
router.get('/find', authenticateToken, getContactPersons);
router.put('/isactive/:id', authenticateToken, validateContactPersonId, toggleContactPersonStatus);
router.delete('/isdelete/:id', authenticateToken, validateContactPersonId, toggleContactPersonDelete);

module.exports = router;
