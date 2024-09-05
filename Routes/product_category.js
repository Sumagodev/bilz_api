const express = require('express');
const { addproduct_category, updateproduct_category, getproduct_category, isActiveStatus, isDeleteStatus } = require('../Controllers/product_category');
const { validateHeaderContact, validateHeaderContactId } = require('../Validations/headerContactValidation');
const { validationResult } = require('express-validator');
const apiResponse = require('../helper/apiResponse');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Add header contact
// router.post('/create-headercontact', validateHeaderContact, (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
//   }
//   next();
// }, addproduct_category);

// Add header contact
router.post('/add', authenticateToken, validateHeaderContact, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
  }
  next();
}, addproduct_category);

// Update header contact
router.put('/update/:id', authenticateToken, validateHeaderContactId, validateHeaderContact, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
  }
  next();
}, updateproduct_category);

// Get header contacts
router.get('/get', getproduct_category);
router.get('/find', authenticateToken, getproduct_category);

module.exports = router;

// Toggle header contact status
router.put('/isactive/:id', authenticateToken, validateHeaderContactId, isActiveStatus);

// Toggle header contact delete status
router.delete('/isdelete/:id', authenticateToken, validateHeaderContactId, isDeleteStatus);
