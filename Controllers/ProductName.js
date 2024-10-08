// const ProductName = require('../Models/ProductName');
// const apiResponse = require('../helper/apiResponse');

// exports.addProductName = async (req, res) => {
//   try {
//     const { productName } = req.body;

//     const product = await ProductName.create({ productName, isActive: true, isDelete: false });
//     return apiResponse.successResponseWithData(res, 'Product name added successfully', product);
//   } catch (error) {
//     console.error('Add product name failed', error);
//     return apiResponse.ErrorResponse(res, 'Add product name failed');
//   }
// };

// exports.getProductNames = async (req, res) => {
//   try {
//     const products = await ProductName.findAll({ where: { isDelete: false } });
//     return apiResponse.successResponseWithData(res, 'Product names retrieved successfully', products);
//   } catch (error) {
//     console.error('Get product names failed', error);
//     return apiResponse.ErrorResponse(res, 'Get product names failed');
//   }
// };

// exports.updateProductName = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { productName } = req.body;

//     const product = await ProductName.findByPk(id);
//     if (!product) {
//       return apiResponse.notFoundResponse(res, 'Product name not found');
//     }

//     product.productName = productName;
//     await product.save();

//     return apiResponse.successResponseWithData(res, 'Product name updated successfully', product);
//   } catch (error) {
//     console.error('Update product name failed', error);
//     return apiResponse.ErrorResponse(res, 'Update product name failed');
//   }
// };

// exports.isActiveStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await ProductName.findByPk(id);

//     if (!product) {
//       return apiResponse.notFoundResponse(res, 'Product name not found');
//     }

//     product.isActive = !product.isActive;
//     await product.save();

//     return apiResponse.successResponseWithData(res, 'Product name status updated successfully', product);
//   } catch (error) {
//     console.error('Toggle product name status failed', error);
//     return apiResponse.ErrorResponse(res, 'Toggle product name status failed');
//   }
// };

// exports.isDeleteStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await ProductName.findByPk(id);

//     if (!product) {
//       return apiResponse.notFoundResponse(res, 'Product name not found');
//     }

//     product.isDelete = !product.isDelete;
//     await product.save();

//     return apiResponse.successResponseWithData(res, 'Product name delete status updated successfully', product);
//   } catch (error) {
//     console.error('Toggle product name delete status failed', error);
//     return apiResponse.ErrorResponse(res, 'Toggle product name delete status failed');
//   }
// };


const Product = require('../Models/ProductName');

exports.createProduct = async (req, res) => {
    try {
        const { productName } = req.body;
        const product = await Product.create({ productName});
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { productName} = req.body;
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product.productName = productName;
        
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.destroy();
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.isActiveStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
  
      if (!product) {
        return apiResponse.notFoundResponse(res, 'Product not found');
      }
  
      product.isActive = !product.isActive;
      await product.save();
  
      res.status(200).json(product);
    } catch (error) {
      console.error('Toggle Product active status failed', error);
      return apiResponse.ErrorResponse(res, 'Toggle Product active status failed');
    }
  };
// Create Product with ProductDetail
// exports.createProduct = async (req, res) => {
//     try {
//         const { productName, description, manufacturer, stock } = req.body;

//         // Create Product
//         const product = await Product.create({ productName });

//         // Create ProductDetail and associate it with the Product
//         const productDetail = await ProductDetail.create({
//             description,
//             manufacturer,
//             stock,
//             productId: product.id,
//         });

//         res.status(201).json({ product, productDetail });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get all products with details
// exports.getProducts = async (req, res) => {
//     try {
//         const products = await Product.findAll({ include: ProductDetail });
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get a single product by ID
// exports.getProductById = async (req, res) => {
//     try {
//         const product = await Product.findByPk(req.params.id, { include: ProductDetail });
//         if (!product) return res.status(404).json({ message: "Product not found" });
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update Product and ProductDetail
// exports.updateProduct = async (req, res) => {
//     try {
//         const { productName, description, manufacturer, stock } = req.body;
        
//         const product = await Product.findByPk(req.params.id);
//         if (!product) return res.status(404).json({ message: "Product not found" });

//         const productDetail = await ProductDetail.findOne({ where: { productId: product.id } });

//         // Update product and product details
//         await product.update({ productName });
//         await productDetail.update({ description, manufacturer, stock });

//         res.status(200).json({ product, productDetail });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete Product and associated ProductDetail
// exports.deleteProduct = async (req, res) => {
//     try {
//         const product = await Product.findByPk(req.params.id);
//         if (!product) return res.status(404).json({ message: "Product not found" });

//         // Delete product and cascading productDetail
//         await product.destroy();
//         res.status(204).json({ message: "Product deleted" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
