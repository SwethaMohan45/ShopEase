# Project Structure

```
product-category-api/
├── server/                     Backend API
│   ├── config/
│   │   └── database.js        MongoDB connection
│   ├── controllers/
│   │   ├── categoryController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── auth.js            API key authentication
│   │   └── errorHandler.js    Global error handler
│   ├── models/
│   │   ├── Category.js        Category schema
│   │   └── Product.js         Product schema
│   ├── routes/
│   │   ├── categoryRoutes.js
│   │   └── productRoutes.js
│   ├── index.js               Server entry point
│   └── seed.js                Database seeding script
│
├── client/                     React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js             Main component
│   │   ├── App.css            Styles
│   │   ├── index.js           React entry
│   │   └── index.css          Global styles
│   ├── package.json
│   └── README.md
│
├── .env                        Environment variables (not in git)
├── .gitignore                  Git ignore rules
├── package.json                Backend dependencies
├── postman_collection.json     API test collection
├── README.md                   Main documentation
├── DEPLOYMENT.md               Deployment guide
└── QUICK_START.md              Quick start guide
```

## Key Files

**Backend Entry:** `server/index.js`
**Frontend Entry:** `client/src/App.js`
**Database Seed:** `server/seed.js`
**API Tests:** `postman_collection.json`

## Clean Architecture

- **server/** - All backend code
- **client/** - All frontend code
- Root level - Configuration and docs only
- No unnecessary test files
- No verbose documentation
- Production-ready structure

