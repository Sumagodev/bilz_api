// controllers/productImagesController.js
// controllers/productImagesController.js
const ProductImages = require('../Models/ServiceDetail');
const ServiceName = require('../Models/servicename');
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');

// exports.getProductImages = async (req, res) => {
//   try {
//     const baseUrl = `${req.protocol}://${req.get('host')}/`;

//     const productImages = await ProductImages.findAll({
//       include: [{
//         model: ServiceName,
//         as: 'service',
//         attributes: ['title'],
//       }],
//     });

//     const imagesWithDetails = productImages.map(image => ({
//       id: image.id,
//       img: baseUrl + image.img,
//       productName: image.productName,
//       serviceNameTitle: image.service.title,
//       desc: image.desc,
//       createdAt: image.createdAt,
//       updatedAt: image.updatedAt,
//     }));

//     return apiResponse.successResponseWithData(
//       res,
//       "Product images retrieved successfully",
//       imagesWithDetails
//     );
//   } catch (error) {
//     console.error("Get product images failed", error); // Log the entire error
//     return apiResponse.ErrorResponse(res, "Get product images failed");
//   }
// };

// controllers/productImagesController.js

exports.findProductImages = async (req, res) => {
  try {
      const { productName, title } = req.query;

      const query = {};
      if (productName) {
          query.productName = productName;
      }
      if (title) {
          query.title = title;
      }

      const productImages = await ProductImages.findAll({
          where: query
      });

      if (productImages.length === 0) {
          return apiResponse.notFoundResponse(res, "No product images found");
      }

      return apiResponse.successResponseWithData(
          res,
          "Product images retrieved successfully",
          productImages
      );
  } catch (error) {
      console.error("Find product images failed", error);
      return apiResponse.ErrorResponse(res, "Find product images failed");
  }
};

exports.findAllProductImages = async (req, res) => {
  try {
      const productImages = await ProductImages.findAll();

      if (productImages.length === 0) {
          return apiResponse.notFoundResponse(res, "No product images found");
      }

      return apiResponse.successResponseWithData(
          res,
          "Product images retrieved successfully",
          productImages
      );
  } catch (error) {
      console.error("Find all product images failed", error);
      return apiResponse.ErrorResponse(res, "Find all product images failed");
  }
};

exports.addProductImage = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
    }

    try {
        const { productName, title, desc } = req.body;
        const img = req.file ? req.file.path : null; // If using file upload

        // Validate img field
        if (!img) {
            return apiResponse.validationErrorWithData(res, "Image URL cannot be null", null);
        }

        // Find service by title
        const service = await ServiceName.findOne({ where: { title } });
        if (!service) {
            return apiResponse.notFoundResponse(res, "ServiceName not found");
        }

        // Create new product image entry
        const productImage = await ProductImages.create({
            ProductDetailId: service.id,
            img,
            productName,
            title,
            desc
        });

        return apiResponse.successResponseWithData(
            res,
            "Product image added successfully",
            productImage
        );
    } catch (error) {
        console.error("Add product image failed", error);
        return apiResponse.ErrorResponse(res, "Add product image failed");
    }
};

// Other methods remain unchanged


exports.updateProductImage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { id } = req.params;
    const { productName, title, desc } = req.body;
    const img = req.file ? req.file.path : null;

    const productImage = await ProductImages.findByPk(id, {
      include: [{
        model: ServiceName,
        as: 'service',
        attributes: ['title'],
      }],
    });
    if (!productImage) {
      return apiResponse.notFoundResponse(res, "Product image not found");
    }

    const product = await ServiceName.findOne({ where: { title } });
    if (!product) {
      return apiResponse.notFoundResponse(res, "ServiceName not found");
    }

    productImage.img = img || productImage.img;
    productImage.productName = productName;
    productImage.ProductDetailId = product.id; // Update the ProductDetailId if title changes
    productImage.title = title;
    productImage.desc = desc;
    await productImage.save();

    return apiResponse.successResponseWithData(
      res,
      "Product image updated successfully",
      productImage
    );
  } catch (error) {
    console.error("Update product image failed", error);
    return apiResponse.ErrorResponse(res, "Update product image failed");
  }
};

exports.deleteProductImage = async (req, res) => {
  try {
    const { id } = req.params;

    const productImage = await ProductImages.findByPk(id);
    if (!productImage) {
      return apiResponse.notFoundResponse(res, "Product image not found");
    }

    await productImage.destroy();

    return apiResponse.successResponse(res, "Product image deleted successfully");
  } catch (error) {
    console.error("Delete product image failed", error);
    return apiResponse.ErrorResponse(res, "Delete product image failed");
  }
};



