const product_category = require("../Models/product_category");
const apiResponse = require("../helper/apiResponse");

exports.addproduct_category = async (req, res) => {
  try {
    const { title } = req.body;
    const product_category = await product_category.create({
      title,
     
      isActive: true,
      isDelete: false,
    });
    return apiResponse.successResponseWithData(
      res,
      "product category added successfully",
      product_category
    );
  } catch (error) {
    console.log("Add product category failed", error);
    return apiResponse.ErrorResponse(res, "Add product category failed");
  }
};

exports.updateproduct_category = async (req, res) => {
  try {
    console.log("req.body",req.body.title);
    
    const { id } = req.params;
    const product_category = await product_category.findByPk(id);
    
    if (!product_category) {
      return apiResponse.notFoundResponse(res, "product category not found");
    }

    product_category.title = req.body.title; // Hardcoded values for testing
 
    await product_category.save();
    
    return apiResponse.successResponseWithData(
      res,
      "product category updated successfully",
      product_category
    );
  } catch (error) {
    console.log("Update product category failed", error);
    return apiResponse.ErrorResponse(res, "Update product category failed");
  }
};


exports.getproduct_category = async (req, res) => {
  try {
    const product_categorys = await product_category.findAll({
      where: { isDelete: false },
    });
    return apiResponse.successResponseWithData(
      res,
      "product category retrieved successfully",
      product_categorys
    );
  } catch (error) {
    console.log("Get product category failed", error);
    return apiResponse.ErrorResponse(res, "Get product category failed");
  }
};

// isActive api
exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const product_category = await product_category.findByPk(id);

    if (!product_category) {
      return apiResponse.notFoundResponse(res, "product category not found");
    }

    // Toggle the isActive status
    product_category.isActive = !product_category.isActive;
    await product_category.save();

    return apiResponse.successResponseWithData(
      res,
      "product category status updated successfully",
      product_category
    );
  } catch (error) {
    console.log("Toggle product category status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle product category status failed"
    );
  }
};

// New method to toggle isDelete
exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const product_category = await product_category.findByPk(id);

    if (!product_category) {
      return apiResponse.notFoundResponse(res, "product category not found");
    }

    // Toggle the isDelete status
    product_category.isDelete = !product_category.isDelete;
    await product_category.save();

    return apiResponse.successResponseWithData(
      res,
      "product category delete status updated successfully",
      product_category
    );
  } catch (error) {
    console.log("Toggle product category delete status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle product category delete status failed"
    );
  }
};
