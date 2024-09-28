// const express = require('express');
// const { validateProductName, validateProductNameId } = require('../Validations/productNameValidation');
// const {
//   addProductName,
//   getProductNames,
//   updateProductName,
//   isActiveStatus,
//   isDeleteStatus,
// } = require('../Controllers/ProductName');
// const authenticateToken = require('../middleware/auth');

// const router = express.Router();

// router.post('/add', authenticateToken, validateProductName, addProductName);
// router.get('/get', getProductNames);
// router.get('/find', authenticateToken, getProductNames);
// router.put('/update/:id', authenticateToken, validateProductNameId, validateProductName, updateProductName);
// router.put('/isactive/:id', authenticateToken, validateProductNameId, isActiveStatus);
// router.delete('/isdelete/:id', authenticateToken, validateProductNameId, isDeleteStatus);

// module.exports = router;
const express = require('express');
const productController = require('../Controllers/ProductName');
// const productDetailController=require('../Controllers/ProductDetail1');
const productImagesController=require('../Controllers/productImagesController');
const { validateProductName, validateProductNameId } = require('../Validations/productNameValidation');
const authenticateToken = require('../middleware/auth');
const { upload } = require('../middleware/multer');

const router = express.Router();

// CRUD routes for products
router.post('/add',authenticateToken, productController.createProduct);
router.get('/get', productController.getAllProducts);
router.get('/find',authenticateToken, productController.getAllProducts);
router.get('/get/:id', productController.getProductById);
router.get('/find/:id',authenticateToken, productController.getProductById);
router.put('/update/:id',authenticateToken, productController.updateProduct);
router.delete('/isdelete/:id',authenticateToken, productController.deleteProduct);


///product details

router.post('/adddetails', upload.single('img'),authenticateToken, productImagesController.createProductDetail);
router.get('/getdetails', productImagesController.getAllProductDetails);
router.get('/finddetails',productImagesController.getAllProductDetails);
router.get('/getdetails/:productId', productImagesController.getProductDetailsByProductId);
router.put('/updatedetails/:id',authenticateToken, productImagesController.updateProductDetail);
router.delete('/isdeletedetails/:id',authenticateToken, productImagesController.deleteProductDetail);


// router.post('/addimage',  upload.single('img'),productImagesController.createProductDetail);
// router.get('/getimage/:productId', productImagesController.getProductDetailsByProductId);
// router.put('/updateimage/:id', productImagesController.updateProductDetail);
// router.delete('/isdeleteimage/:id', productImagesController.deleteProductDetail);


module.exports = router;
