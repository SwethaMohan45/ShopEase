const Product = require('../models/Product');
const Category = require('../models/Category');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, categoryId, inStock } = req.body;

    if (!name || price === undefined || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and categoryId are required'
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category does not exist'
      });
    }

    const product = await Product.create({
      name,
      price,
      categoryId,
      inStock: inStock !== undefined ? inStock : true
    });

    await product.populate('categoryId', 'name description');

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const { categoryId, inStock } = req.query;
    
    const filter = {};
    
    if (categoryId) {
      filter.categoryId = categoryId;
    }
    
    if (inStock !== undefined) {
      filter.inStock = inStock === 'true';
    }

    const products = await Product.find(filter)
      .populate('categoryId', 'name description')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('categoryId', 'name description');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, price, categoryId, inStock } = req.body;

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (categoryId && categoryId !== product.categoryId.toString()) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Category does not exist'
        });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (inStock !== undefined) updateData.inStock = inStock;

    product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('categoryId', 'name description');

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

