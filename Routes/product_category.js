const express = require('express');
const { upload2 } = require('../middleware/multer');
const { validateProductDetails, validateProductDetailsId } = require('../Validations/productDetailsValidation');
const {
  addProductDetails,
  updateProductDetails,
  getAllProductDetails,
  isActiveStatus,
  deleteProductDetails,getAllProductNames
} = require('../Controllers/product_category');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add', upload2, authenticateToken, validateProductDetails, addProductDetails);
router.put('/update/:productId', upload2, authenticateToken, validateProductDetails, validateProductDetailsId, updateProductDetails);
router.get('/get', getAllProductDetails);
router.get('/find', authenticateToken, getAllProductDetails);
router.put('/isactive/:id', authenticateToken, validateProductDetailsId, isActiveStatus);
router.delete('/isdelete/:id', authenticateToken, validateProductDetailsId, deleteProductDetails);
router.get("/get-productnames",  getAllProductNames);
module.exports = router;
