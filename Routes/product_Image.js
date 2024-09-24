// // routes/productImagesRoutes.js
// const { upload } = require('../middleware/multer');

// const express = require('express');
// const {
//   addProductImage,
//   updateProductImage,
//   getProductImages,
//   deleteProductImage,
// } = require('../Controllers/productImagesController');
// const authenticateToken = require('../middleware/auth');

// const router = express.Router();

// router.post('/create-productimage', upload.single('img'),authenticateToken, addProductImage);
// router.put('/update-productimage/:id', upload.single('img'), authenticateToken, updateProductImage);
// router.get('/get-productimages', authenticateToken, getProductImages);
// router.delete('/delete-productimage/:id', authenticateToken, deleteProductImage);

// module.exports = router;
const express = require('express');
// const productController = require('../Controllers/ProductName');
const productDetailController=require('../Controllers/productImagesController');
const { validateProductName, validateProductNameId } = require('../Validations/productNameValidation');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// CRUD routes for products


router.post('/add', productDetailController.createProductDetail);
router.get('/get/:productId', productDetailController.getProductDetailsByProductId);
router.put('/update/:id', productDetailController.updateProductDetail);
router.delete('/isdelete/:id', productDetailController.deleteProductDetail);


module.exports = router;

