# Deployment to Render

## Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "ShopEase API"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

2. **Deploy on Render**
- Go to render.com
- New Web Service
- Connect GitHub repository
- Configure:
  - Build Command: `npm install`
  - Start Command: `npm start`

3. **Environment Variables**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/shopease
API_KEY=your-secure-key
NODE_ENV=production
```

4. **Deploy**
- Click "Create Web Service"
- Wait 2-3 minutes
- Get URL: `https://your-app.onrender.com`

## MongoDB Atlas Setup

1. Create free cluster at mongodb.com/cloud/atlas
2. Database Access: Create user
3. Network Access: Add 0.0.0.0/0
4. Get connection string
5. Add to Render environment variables

## After Deployment

Test your API:
```bash
curl https://your-app.onrender.com/
curl https://your-app.onrender.com/api/categories
```

Update README.md with deployed URL.

## Alternative: AWS EC2

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
cd repo
npm install
nano .env  # Add environment variables

# Start with PM2
pm2 start server/index.js --name shopease
pm2 save
pm2 startup
```
