# Quick Start

## Local Development

### Backend
```bash
npm install
npm start
```

### Frontend
```bash
cd client
npm install
npm start
```

## Deploy to GitHub

```bash
git init
git add .
git commit -m "Product & Category REST API"
git remote add origin https://github.com/YOUR_USERNAME/repo-name.git
git branch -M main
git push -u origin main
```

## Deploy to Render

1. Go to render.com
2. New -> Web Service
3. Connect your GitHub repository
4. Configure:
   - Build: `npm install`
   - Start: `npm start`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `API_KEY`: Your secure API key
   - `NODE_ENV`: production
6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment

Your API will be live at: `https://your-app.onrender.com`

## Update README

After deployment, add your live URL to README.md:
```
Deployed URL: https://your-app.onrender.com
```

