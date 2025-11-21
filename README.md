# ShopEase - Product Management API

A REST API for managing products and categories, built with Node.js, Express, and MongoDB.

## Live Demo

**Application:** https://shopease-67cu.onrender.com  
**GitHub:** https://github.com/SwethaMohan45/ShopEase

## Tech Stack

- Node.js + Express
- MongoDB Atlas
- React
- API Key Authentication

## Quick Start

Clone and install:
```bash
git clone https://github.com/SwethaMohan45/ShopEase.git
cd ShopEase
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/shopease
API_KEY=test-api-key-12345
NODE_ENV=development
```

Run the app:
```bash
npm start
```

Visit http://localhost:5000

## Database Schema

**Category**
- name (string, unique)
- description (string, optional)

**Product**
- name (string)
- price (number, min: 0)
- categoryId (references Category)
- inStock (boolean, default: true)

Note: Cannot delete a category if it has products.

## API Endpoints

All endpoints return JSON. Write operations need `x-api-key` header.

### Categories

```
POST   /api/categories          Create category
GET    /api/categories          List all
GET    /api/categories/:id      Get one
PUT    /api/categories/:id      Update
DELETE /api/categories/:id      Delete (if no products)
```

### Products

```
POST   /api/products            Create product
GET    /api/products            List all
GET    /api/products/:id        Get one
PUT    /api/products/:id        Update
DELETE /api/products/:id        Delete
```

Filter products:
- `?categoryId=xxx` - by category
- `?inStock=true` - by stock status
- Combine both for filtered results

## Usage Examples

Create a category:
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "x-api-key: test-api-key-12345" \
  -d '{"name":"Electronics","description":"Electronic devices"}'
```

Get all products:
```bash
curl http://localhost:5000/api/products
```

Filter in-stock products:
```bash
curl http://localhost:5000/api/products?inStock=true
```

## Authentication

Write operations (POST, PUT, DELETE) require API key:
```
x-api-key: test-api-key-12345
```

Read operations (GET) are public.

## Testing

**Postman:** Import `postman_collection.json`

**Web Interface:** Visit the deployed URL to use the React frontend

**Seed Data:** Run `npm run seed` to populate sample data (4 categories, 12 products)

## Project Structure

```
server/              Backend
  config/           Database connection
  controllers/      Business logic
  middleware/       Auth and error handling
  models/           MongoDB schemas
  routes/           API endpoints
  index.js          Server entry
  seed.js           Sample data

client/              React frontend
  src/
    App.js          Main component
    App.css         Styles
```

## MongoDB Setup

1. Create free cluster at mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP (0.0.0.0/0 for development)
4. Get connection string
5. Add to `.env` as `MONGODB_URI`

## Deployment

Currently deployed on Render. The app serves both API and frontend from a single URL.

For AWS EC2 deployment:
```bash
# Install Node.js and PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# Clone and setup
git clone repo-url
cd shopease
npm install
npm run build

# Start with PM2
pm2 start server/index.js --name shopease
pm2 save
pm2 startup
```

## HTTP Status Codes

- 200: Success
- 201: Created
- 400: Bad request / Validation error
- 401: Missing API key
- 403: Invalid API key
- 404: Not found
- 500: Server error

## Error Response Format

```json
{
  "success": false,
  "message": "Error description"
}
```

## Features

- Full CRUD operations
- Query filtering
- Input validation
- API key authentication
- Category deletion protection
- React frontend
- Postman collection
- Database seeding

## License

ISC
