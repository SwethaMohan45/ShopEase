# Deployment Guide

## Render Deployment

### Backend API

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

2. **Create Render Service**
- Go to render.com
- New -> Web Service
- Connect GitHub repository
- Configure:
  - Name: `product-api`
  - Build Command: `npm install`
  - Start Command: `npm start`

3. **Environment Variables**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
API_KEY=your_secure_key
NODE_ENV=production
```

4. **Deploy**
- Click "Create Web Service"
- Wait 2-3 minutes
- Get URL: `https://product-api.onrender.com`

### Frontend (Optional)

**Option 1: Vercel**
```bash
cd client
npm run build
vercel --prod
```

**Option 2: Netlify**
```bash
cd client
npm run build
netlify deploy --prod --dir=build
```

Set environment variable:
```
REACT_APP_API_URL=https://your-api.onrender.com/api
```

## Alternative: AWS EC2

### Launch Instance
- Ubuntu 22.04 LTS
- t2.micro
- Allow ports: 22, 80, 5000

### Setup
```bash
# Connect
ssh -i key.pem ubuntu@ip-address

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and setup
git clone your-repo-url
cd repo-name
npm install

# Create .env
nano .env
```

### Start with PM2
```bash
pm2 start server/index.js --name api
pm2 save
pm2 startup
```

### Nginx (Optional)
```bash
sudo apt install nginx

sudo nano /etc/nginx/sites-available/api
```

Add:
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

Enable:
```bash
sudo ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## MongoDB Atlas

1. Create cluster at mongodb.com/cloud/atlas
2. Database Access: Create user
3. Network Access: Add 0.0.0.0/0
4. Get connection string
5. Replace password and database name

## Environment Variables

Required:
```
PORT=5000
MONGODB_URI=mongodb+srv://...
API_KEY=secure_random_key
NODE_ENV=production
```

## Troubleshooting

**Cannot connect to MongoDB**
- Verify connection string
- Check IP whitelist in Atlas
- Test connection locally first

**Port issues**
- Check PORT env variable
- Verify firewall rules
- Check security groups (AWS)

**App not starting**
- Check logs on Render dashboard
- Verify all dependencies installed
- Check environment variables set

## Post-Deployment

1. Test health: `curl https://your-app.onrender.com/`
2. Test API: `curl https://your-app.onrender.com/api/categories`
3. Update README with deployed URL
4. Test all CRUD operations
