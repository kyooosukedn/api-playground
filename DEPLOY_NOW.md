# 🚀 Quick Deploy Guide - API Playground

This guide will help you deploy the API Playground to Vercel in under 5 minutes.

## Option 1: Deploy from Vercel Dashboard (Recommended - Easiest)

### Step 1: Go to Vercel
Open https://vercel.com in your browser

### Step 2: Sign Up/Login
- Click "Sign Up" or "Log In"
- Choose "Continue with GitHub"
- Authorize Vercel to access your GitHub account

### Step 3: Add New Project
1. Click "Add New" → "Project" in the top right
2. Find `kyooosukedn/api-playground` in the list
3. Click "Import"

### Step 4: Configure (Auto-detected)
Vercel will automatically detect:
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

Just click "Deploy" - no changes needed!

### Step 5: Wait for Deployment
- Deployment takes ~1-2 minutes
- You'll see a real-time build log
- Once done, you'll get a URL like: `https://api-playground.vercel.app`

### Step 6: Test Your App!
Click the deployment URL and test:
- Load an API spec (try JSONPlaceholder API below)
- Make a live HTTP request
- Check dark mode toggle
- Verify history saves

## Example API Spec to Test

Paste this into the API Input on the home page:

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "JSONPlaceholder API",
    "version": "1.0.0"
  },
  "paths": {
    "/posts": {
      "get": {
        "summary": "Get all posts",
        "description": "Retrieve a list of all posts",
        "responses": {
          "200": {
            "description": "Successful response"
          }
        }
      },
      "post": {
        "summary": "Create a post",
        "description": "Create a new post",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "example": {
                "title": "foo",
                "body": "bar",
                "userId": 1
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Post created"
          }
        }
      }
    },
    "/posts/1": {
      "get": {
        "summary": "Get a single post",
        "description": "Retrieve a specific post by ID",
        "responses": {
          "200": {
            "description": "Successful response"
          }
        }
      }
    }
  }
}
```

Then in the playground:
1. Change URL to: `https://jsonplaceholder.typicode.com/posts`
2. Click "Send Request"
3. See the response with syntax highlighting!

## Option 2: Deploy with Vercel CLI (Advanced)

If you prefer command-line deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to your project
cd api-playground

# Deploy to production
vercel --prod
```

## What You Get

After deployment, you'll have:
- ✅ Live URL: `https://api-playground.vercel.app`
- ✅ Automatic HTTPS
- ✅ Global CDN (fast loading worldwide)
- ✅ Automatic previews for pull requests
- ✅ Custom domain support (optional)

## Custom Domain (Optional)

Want to use your own domain?

1. Buy a domain (or use one you own)
2. Go to your Vercel project → Settings → Domains
3. Add your domain (e.g., `api-playground.yourdomain.com`)
4. Update your DNS with the CNAME record Vercel provides
5. Wait 5-10 minutes for DNS propagation

## Troubleshooting

### Build Fails
- Check the build log in Vercel Dashboard
- Make sure `npm run build` works locally
- Verify all dependencies are installed

### Page Not Found
- Wait a few minutes - DNS can take time to propagate
- Clear your browser cache
- Try in incognito/private mode

### Features Don't Work
- Check browser console for errors (F12 → Console)
- Verify localStorage is enabled in your browser
- Test in a different browser

### Dark Mode Issues
- Check your system color scheme settings
- Clear localStorage: DevTools → Application → Local Storage → Clear All
- Reload the page

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: https://github.com/kyooosukedn/api-playground/issues

## 🎉 Success!

Once deployed, you can:
1. Add the URL to your portfolio/resume
2. Share it with potential employers
3. Demonstrate it during interviews
4. Continue building features (Monaco Editor, etc.)

---

**Built for**: Kyo (kyooosukedn)
**Status**: Ready to deploy ✅
**Time to deploy**: ~5 minutes
