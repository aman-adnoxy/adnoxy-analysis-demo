# Deployment Guide

## Vercel Deployment

This project is optimized for deployment on Vercel. Follow these steps to deploy:

### Step 1: Prepare Your Repository

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New..." → "Project"
4. Select your repository
5. Vercel will auto-detect the Vite configuration

### Step 3: Configure Environment Variables

In the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
GEMINI_API_KEY=your_actual_api_key_here
```

### Step 4: Deploy

Click "Deploy" and Vercel will:
- Install dependencies
- Run `npm run build`
- Deploy the `dist` folder to Vercel's CDN

### Step 5: Verify Deployment

- Your app will be available at `https://your-project.vercel.app`
- Check the deployment logs for any errors
- Test all routes and features

## Build Configuration

The `vercel.json` file specifies:
- **buildCommand**: `npm run build` - Builds the Vite project
- **outputDirectory**: `dist` - Where the built files are located
- **framework**: `vite` - Tells Vercel to use Vite configuration

## Performance Optimizations

The build is configured with:
- Code splitting for vendor libraries
- Minification with Terser
- No source maps in production (smaller bundle)
- Manual chunks for better caching:
  - `vendor.js` - React and routing
  - `charts.js` - Recharts
  - `maps.js` - Leaflet and React-Leaflet

## Troubleshooting

### Build Fails

Check the build logs in Vercel dashboard. Common issues:
- Missing environment variables
- TypeScript errors
- Missing dependencies

### Slow Performance

- Check bundle size: `npm run build` and review the output
- Use Vercel Analytics to identify bottlenecks
- Consider lazy loading routes

### Environment Variables Not Working

- Ensure variables are added in Vercel dashboard (not in `.env` files)
- Redeploy after adding variables
- Variables must be prefixed with `VITE_` to be accessible in the browser

## Rollback

If deployment has issues:
1. Go to Vercel dashboard
2. Find the previous successful deployment
3. Click "Promote to Production"

## Custom Domain

To add a custom domain:
1. Go to project settings → "Domains"
2. Add your domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (usually 24-48 hours)

## Monitoring

Vercel provides built-in monitoring:
- **Analytics**: View traffic and performance metrics
- **Logs**: Check server and build logs
- **Deployments**: View deployment history

## CI/CD

Vercel automatically deploys on:
- Push to main branch (production)
- Pull requests (preview deployments)

Configure branch settings in project settings → "Git" if needed.
