// controllers/productDetailController.js
const ProductDetail = require('../Models/ProductDetail1');
const Product = require('../Models/ProductName');

// Create new product details for a product
exports.createProductDetail = async (req, res) => {
    try {
        const { description, manufacturer, stock, productId } = req.body;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const productDetail = await ProductDetail.create({
            description,
            manufacturer,
            stock,
            productId,
        });
        res.status(201).json(productDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all details for a specific product
exports.getProductDetailsByProductId = async (req, res) => {
    try {
        const productDetails = await ProductDetail.findAll({
            where: { productId: req.params.productId }
        });
        if (productDetails.length === 0) {
            return res.status(404).json({ message: "No details found for this product" });
        }
        res.status(200).json(productDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update product details by ID
exports.updateProductDetail = async (req, res) => {
    try {
        const { description, manufacturer, stock } = req.body;
        const productDetail = await ProductDetail.findByPk(req.params.id);
        if (!productDetail) {
            return res.status(404).json({ message: "Product detail not found" });
        }

        productDetail.description = description;
        productDetail.manufacturer = manufacturer;
        productDetail.stock = stock;
        await productDetail.save();
        res.status(200).json(productDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete product detail by ID
exports.deleteProductDetail = async (req, res) => {
    try {
        const productDetail = await ProductDetail.findByPk(req.params.id);
        if (!productDetail) {
            return res.status(404).json({ message: "Product detail not found" });
        }
        await productDetail.destroy();
        res.status(200).json({ message: "Product detail deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
