const express = require('express');
const { upload } = require('../middleware/multer');
const { validateOffice, validateOfficeId } = require('../Validations/officeValidation');
const {
  addOffice,
  updateOffice,
  getOffices,
  toggleOfficeStatus,
  toggleOfficeDelete,
} = require('../Controllers/job');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add', upload.single('img'), validateOffice, addOffice);
router.put('/update/:id', upload.single('img'), authenticateToken, validateOffice, validateOfficeId, updateOffice);
router.get('/get', getOffices);
router.get('/find', authenticateToken, getOffices);
router.put('/isactive/:id', authenticateToken, validateOfficeId, toggleOfficeStatus);
router.delete('/isdelete/:id', authenticateToken, validateOfficeId, toggleOfficeDelete);

module.exports = router;
