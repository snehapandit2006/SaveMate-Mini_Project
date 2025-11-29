# SaveMate Frontend Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Environment Configuration
- ✅ `.env.production` configured with production backend URL
- ✅ `.env.development` configured for local development
- ✅ API base URL uses environment variables

### 2. Build Configuration
- ✅ Vite config set with correct base path for GitHub Pages
- ✅ All imports fixed (no corrupted Figma imports)
- ✅ Logo assets properly imported
- ✅ Service workers configured for PWA

### 3. Backend Integration
- ✅ API service layer created (`src/lib/api.ts`)
- ✅ Authentication service (`src/services/authService.ts`)
- ✅ Transaction service (`src/services/transactionService.ts`)
- ✅ Goal service (`src/services/goalService.ts`)
- ✅ CORS configured with credentials
- ✅ Token-based authentication with interceptors

## 🚀 Deployment Steps

### GitHub Pages Deployment

```bash
# 1. Build the production version
npm run build

# 2. Deploy to GitHub Pages
npm run deploy
```

Your app will be live at: `https://snehapandit2006.github.io/SaveMate-Mini_Project`

### Render Deployment

1. Go to [render.com](https://render.com)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     - `VITE_BACKEND_URL`: `https://savemate-mini-project-1.onrender.com`
5. Click "Create Static Site"

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd Frontend
vercel --prod
```

## 🔧 Backend Requirements

Ensure your backend is deployed and has:

1. **CORS Configuration**:
```javascript
app.use(cors({ 
  origin: [
    'https://snehapandit2006.github.io',
    'http://localhost:3000'
  ], 
  credentials: true 
}));
```

2. **Required Endpoints**:
- `POST /api/auth/login`
- `POST /api/auth/signup`
- `GET /api/transactions`
- `POST /api/transactions`
- `GET /api/goals`
- `POST /api/goals`
- `GET /api/stats`

## 🧪 Testing

### Local Testing
```bash
# Start development server
npm run dev

# Preview production build
npm run build
npm run preview
```

### Production Testing
1. Visit deployed URL
2. Check browser console for errors
3. Test API connectivity
4. Verify authentication flow

## 🐛 Common Issues

### Issue: Blank Page
- **Solution**: Check browser console for errors
- Verify `base` path in `vite.config.ts` matches your deployment URL

### Issue: API Calls Failing
- **Solution**: Check CORS configuration on backend
- Verify `VITE_BACKEND_URL` environment variable
- Check network tab for 401/403 errors

### Issue: Assets Not Loading
- **Solution**: Ensure all imports use relative paths
- Check that assets are in `src/assets` or `public` folder

## 📝 Environment Variables

### Production (.env.production)
```
VITE_BACKEND_URL=https://savemate-mini-project-1.onrender.com
```

### Development (.env.development)
```
VITE_BACKEND_URL=http://localhost:4000
```

## 🔐 Security Notes

- Never commit `.env` files with sensitive data
- Use environment variables for all API URLs
- Implement proper token refresh logic
- Enable HTTPS in production

## 📊 Performance Optimization

- ✅ Code splitting enabled
- ✅ Tree shaking configured
- ✅ PWA for offline support
- ✅ Lazy loading for routes (recommended)

## 🎯 Next Steps

1. Set up CI/CD pipeline (GitHub Actions)
2. Add error tracking (Sentry)
3. Implement analytics (Google Analytics)
4. Add E2E tests (Playwright/Cypress)
