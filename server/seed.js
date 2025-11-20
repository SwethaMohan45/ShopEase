require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    const categories = await Category.insertMany([
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets'
      },
      {
        name: 'Books',
        description: 'Books and publications'
      },
      {
        name: 'Clothing',
        description: 'Apparel and accessories'
      },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies'
      }
    ]);

    console.log('Categories created');

    const products = [
      {
        name: 'iPhone 15 Pro',
        price: 999.99,
        categoryId: categories[0]._id,
        inStock: true
      },
      {
        name: 'MacBook Pro',
        price: 1999.99,
        categoryId: categories[0]._id,
        inStock: true
      },
      {
        name: 'AirPods Pro',
        price: 249.99,
        categoryId: categories[0]._id,
        inStock: false
      },
      {
        name: 'iPad Air',
        price: 599.99,
        categoryId: categories[0]._id,
        inStock: true
      },
      {
        name: 'The Great Gatsby',
        price: 12.99,
        categoryId: categories[1]._id,
        inStock: true
      },
      {
        name: '1984 by George Orwell',
        price: 14.99,
        categoryId: categories[1]._id,
        inStock: true
      },
      {
        name: 'To Kill a Mockingbird',
        price: 13.99,
        categoryId: categories[1]._id,
        inStock: false
      },
      {
        name: 'Cotton T-Shirt',
        price: 19.99,
        categoryId: categories[2]._id,
        inStock: true
      },
      {
        name: 'Jeans',
        price: 49.99,
        categoryId: categories[2]._id,
        inStock: true
      },
      {
        name: 'Winter Jacket',
        price: 89.99,
        categoryId: categories[2]._id,
        inStock: false
      },
      {
        name: 'Garden Tools Set',
        price: 79.99,
        categoryId: categories[3]._id,
        inStock: true
      },
      {
        name: 'Plant Seeds Collection',
        price: 24.99,
        categoryId: categories[3]._id,
        inStock: true
      }
    ];

    await Product.insertMany(products);
    console.log('Products created');

    console.log(`
Seed completed successfully!
- ${categories.length} categories created
- ${products.length} products created
    `);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
