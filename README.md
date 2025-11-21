# ShopEase - Product Management API

REST API for managing products and categories with React frontend.

## Deployed Application

**Live URL:** https://shopease-67cu.onrender.com

**API Base:** https://shopease-67cu.onrender.com/api

## Tech Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Frontend:** React
- **Authentication:** API Key
- **Deployment:** Render

## Project Structure

```
├── server/              Backend API
│   ├── config/         Database configuration
│   ├── controllers/    Request handlers
│   ├── middleware/     Auth and error handling
│   ├── models/         Mongoose schemas
│   ├── routes/         API endpoints
│   ├── index.js        Server entry point
│   └── seed.js         Database seeding
├── client/              React frontend
│   ├── src/
│   └── package.json
├── .env                Environment variables
├── package.json        Backend dependencies
└── postman_collection.json  API tests
```

## Database Schema

### Category
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  description: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  _id: ObjectId,
  name: String (required),
  price: Number (required, min: 0),
  categoryId: ObjectId (required, references Category),
  inStock: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

**Relationships:** One Category has many Products. Cannot delete Category if Products exist.

## API Endpoints

### Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/categories` | Required | Create category |
| GET | `/api/categories` | Public | List all categories |
| GET | `/api/categories/:id` | Public | Get single category |
| PUT | `/api/categories/:id` | Required | Update category |
| DELETE | `/api/categories/:id` | Required | Delete category (fails if has products) |

### Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/products` | Required | Create product |
| GET | `/api/products` | Public | List all products |
| GET | `/api/products?categoryId=xxx` | Public | Filter by category |
| GET | `/api/products?inStock=true` | Public | Filter by stock status |
| GET | `/api/products/:id` | Public | Get single product |
| PUT | `/api/products/:id` | Required | Update product |
| DELETE | `/api/products/:id` | Required | Delete product |

### Authentication

Write operations require `x-api-key` header:

```bash
curl -X POST https://shopease-67cu.onrender.com/api/categories \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{"name":"Electronics","description":"Electronic devices"}'
```

## Local Setup

### Prerequisites
- Node.js v14+
- MongoDB Atlas account

### Installation

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install && cd ..
```

### Environment Variables

Create `.env` file in root:

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/shopease?retryWrites=true&w=majority
API_KEY=test-api-key-12345
NODE_ENV=development
```

**MongoDB Setup:**
1. Create free cluster at mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP: 0.0.0.0/0
4. Get connection string
5. Add to `.env`

### Run Locally

**Backend:**
```bash
npm start
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd client
npm start
# Runs on http://localhost:3000
```

**Seed Database:**
```bash
npm run seed
# Creates 4 categories and 12 products
```

## API Examples

### Create Category
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "x-api-key: test-api-key-12345" \
  -d '{
    "name": "Electronics",
    "description": "Electronic devices and gadgets"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "65f1234567890abc",
    "name": "Electronics",
    "description": "Electronic devices and gadgets",
    "createdAt": "2024-03-15T10:00:00.000Z",
    "updatedAt": "2024-03-15T10:00:00.000Z"
  }
}
```

### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: test-api-key-12345" \
  -d '{
    "name": "iPhone 15 Pro",
    "price": 999.99,
    "categoryId": "65f1234567890abc",
    "inStock": true
  }'
```

### Get Products with Filters
```bash
# All products
curl http://localhost:5000/api/products

# By category
curl http://localhost:5000/api/products?categoryId=65f1234567890abc

# In stock only
curl http://localhost:5000/api/products?inStock=true

# Combined
curl http://localhost:5000/api/products?categoryId=65f1234567890abc&inStock=true
```

## Testing

### Option 1: Postman Collection

Import `postman_collection.json`:
1. Open Postman
2. Click Import
3. Select file
4. Set variables:
   - `base_url`: http://localhost:5000 or deployed URL
   - `api_key`: test-api-key-12345

### Option 2: React Frontend

Visit http://localhost:3000 (local) or deployed URL.

Features:
- Create/delete categories
- Create/delete products
- Filter products by category and stock
- API key auto-loaded

## Validation & Error Handling

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad request / Validation error
- `401` - Unauthorized (missing API key)
- `403` - Forbidden (invalid API key)
- `404` - Not found
- `500` - Server error

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed errors if applicable"]
}
```

### Validation Rules
- Category name: Required, unique, max 100 chars
- Product name: Required, max 200 chars
- Product price: Required, must be >= 0
- Product categoryId: Required, must reference existing category
- Cannot delete category with associated products

## Deployment

### Render (Current)

Application deployed at: https://shopease-67cu.onrender.com

**Deploy Steps:**
1. Push to GitHub
2. Connect repository on Render
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### Alternative: AWS EC2

```bash
# Launch Ubuntu instance
ssh -i key.pem ubuntu@ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and setup
git clone repo-url
cd shopease
npm install
npm run build

# Create .env with production values

# Start with PM2
pm2 start server/index.js --name shopease
pm2 save
pm2 startup
```

**Optional Nginx:**
```nginx
server {
    listen 80;
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

## GitHub Repository

https://github.com/SwethaMohan45/ShopEase

## Features Implemented

- ✅ Complete REST API with Express
- ✅ MongoDB database with Mongoose
- ✅ Full CRUD for Categories and Products
- ✅ Query filters (categoryId, inStock)
- ✅ API key authentication
- ✅ Input validation
- ✅ Proper HTTP status codes
- ✅ Error handling
- ✅ Category deletion protection
- ✅ React frontend for testing
- ✅ Postman collection
- ✅ Database seeding script
- ✅ Production deployment
- ✅ Professional code structure

## License

ISC
