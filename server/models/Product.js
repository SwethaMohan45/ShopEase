const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required']
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

productSchema.index({ categoryId: 1 });
productSchema.index({ inStock: 1 });

module.exports = mongoose.model('Product', productSchema);

