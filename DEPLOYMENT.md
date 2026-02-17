# Deployment Guide - API Playground

This guide will help you deploy the API Playground to Vercel.

## 🚀 Quick Deploy (Recommended)

### Option 1: Deploy from Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Open https://vercel.com in your browser
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub"

2. **Add New Project**
   - Click "Add New" → "Project"
   - Import `kyooosukedn/api-playground` from GitHub
   - Click "Deploy"

3. **That's it!** 🎉
   - Vercel will automatically:
     - Detect Next.js
     - Configure build settings
     - Deploy to global edge network
     - Provide a URL like: `https://api-playground.vercel.app`

---

### Option 2: Deploy with Vercel CLI (From Your Computer)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```
   - Select GitHub
   - Authorize Vercel access

3. **Clone and Deploy**
   ```bash
   # Clone the repository
   git clone https://github.com/kyooosukedn/api-playground.git
   cd api-playground

   # Install dependencies
   npm install

   # Deploy to production
   vercel --prod
   ```

4. **Get Your URL**
   - Vercel will output your production URL
   - Save it for future reference

---

## 📋 Pre-Deployment Checklist

- [x] Repository pushed to GitHub
- [x] All dependencies installed (`npm install`)
- [x] Build succeeds (`npm run build`)
- [x] README.md is complete
- [ ] Deploy to Vercel
- [ ] Test deployment URL
- [ ] Verify all features work

---

## 🧪 Post-Deployment Testing

After deployment, verify these features work:

### 1. Home Page (`/`)
- [ ] Page loads without errors
- [ ] API Input component displays
- [ ] Can paste OpenAPI/JSON spec
- [ ] Validation works (shows error for invalid JSON)

### 2. Playground (`/playground`)
- [ ] Request Builder loads
- [ ] Method selector works (GET, POST, PUT, DELETE, PATCH)
- [ ] URL input accepts valid URLs
- [ ] Headers can be added/removed
- [ ] Query params can be added/removed
- [ ] Body editor shows for non-GET methods

### 3. Live Requests
- [ ] Can make GET request to a public API (e.g., `https://jsonplaceholder.typicode.com/posts/1`)
- [ ] Response viewer displays with syntax highlighting
- [ ] Status code shows correctly
- [ ] Response time displays
- [ ] Copy button works

### 4. History
- [ ] Requests are saved to localStorage
- [ ] History sidebar shows past requests
- [ ] Can click to replay a request
- [ ] History page (`/history`) works
- [ ] Search in history works
- [ ] Clear history works

### 5. Dark Mode
- [ ] Toggle button changes theme
- [ ] Theme persists across page reloads
- [ ] System preference is detected on first visit

### 6. Navigation
- [ ] All navigation links work
- [ ] Active page is highlighted
- [ ] Logo link goes to home

---

## 🔧 Environment Variables

This project doesn't require any environment variables for basic functionality.

**Optional:** If you want to add features like API key management, add them in Vercel Dashboard:
- Go to Project Settings → Environment Variables
- Add variables like `NEXT_PUBLIC_API_KEY`
- Redeploy to apply changes

---

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. **Buy a Domain** (optional, Vercel provides `.vercel.app` for free)

2. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Enter your domain (e.g., `api-playground.yourdomain.com`)
   - Follow DNS instructions

3. **Update DNS**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Wait for DNS propagation (usually 5-10 minutes)

---

## 📊 Monitoring

Vercel provides built-in monitoring:
- **Analytics**: Page views, visitors, geography
- **Logs**: Real-time logs and error tracking
- **Build Logs**: Deployment history

Access from:
- Vercel Dashboard → Your Project → Analytics
- Vercel Dashboard → Your Project → Logs

---

## 🔄 Continuous Deployment

After the initial deploy:
- Every push to `main` branch triggers automatic deployment
- Pull requests generate preview URLs
- No manual intervention needed

---

## 🐛 Troubleshooting

### Build Fails
- Check GitHub Actions build logs
- Ensure `npm run build` passes locally
- Check for missing dependencies

### Deployment Stuck
- Cancel deployment from Vercel Dashboard
- Push a new commit to trigger fresh deploy

### Features Don't Work
- Check browser console for errors
- Verify localStorage is enabled
- Test in incognito/private mode

### Dark Mode Issues
- Check browser color scheme settings
- Clear localStorage and reload
- Verify next-themes is installed

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review the [README.md](README.md) for usage instructions
3. Check [Next.js Documentation](https://nextjs.org/docs)
4. Check [Vercel Documentation](https://vercel.com/docs)

---

## ✅ Success Checklist

Once deployed, you should have:
- [ ] Working Vercel URL (e.g., `https://api-playground.vercel.app`)
- [ ] All pages loading correctly
- [ ] Live API requests working
- [ ] Dark mode toggling properly
- [ ] Request history saving
- [ ] Responsive design on mobile

---

**Ready to deploy? Go to https://vercel.com and import your GitHub repo!** 🚀
