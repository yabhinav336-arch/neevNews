# Neev News RSS Agent 🤖

Automated news publishing system that fetches news from RSS feeds and publishes them to your website automatically.

## 📋 What This Does

- ✅ Fetches news from multiple RSS feeds every 30 minutes
- ✅ Automatically detects and skips duplicate articles
- ✅ Saves articles to your Firebase database
- ✅ Auto-publishes articles (status: "published")
- ✅ Respects daily limits (max 40 articles/day)
- ✅ Limits articles per category (max 2 per run)
- ✅ Handles errors gracefully
- ✅ Logs everything for monitoring

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd /Users/anirudhyadav/project/neevNews
npm install rss-parser node-cron
```

### Step 2: Fix Firebase Import Issue

The Firebase client SDK doesn't work well in Node.js scripts. We need to use the Admin SDK instead. Let me create a better version:

**Option A: Use Firebase Admin SDK (Recommended)**

```bash
npm install firebase-admin
```

Then I'll update the code to use Admin SDK.

**Option B: Use a Next.js API Route (Easier for beginners)**

I'll create a Next.js API route that you can call, which is simpler.

### Step 3: Run the Agent

**If using Node.js script:**
```bash
node news-agent/index.js
```

**If using API route:**
The API route will be at `/api/rss-agent` and can be called by a cron service.

## 📁 File Structure

```
news-agent/
├── index.js          # Main entry point
├── rssSources.js     # RSS feed configuration
├── fetchNews.js      # Fetches news from RSS feeds
├── dedupe.js         # Checks for duplicates
├── saveArticle.js    # Saves articles to database
├── scheduler.js      # Cron job scheduler
└── README.md         # This file
```

## ⚙️ Configuration

Edit `rssSources.js` to:
- Add/remove RSS feeds
- Change categories
- Adjust limits
- Change default author name

## 🔒 Safety Features

1. **Daily Limit**: Max 40 articles per day
2. **Category Limit**: Max 2 articles per category per run
3. **Duplicate Detection**: Checks by slug, title similarity, and source URL
4. **Error Handling**: Continues even if one feed fails
5. **Rate Limiting**: 500ms delay between saves

## 📊 Monitoring

The script logs everything:
- ✅ Successful fetches
- ⚠️ Warnings (duplicates, limits)
- ❌ Errors

Watch the console output to monitor the system.

## 🛠️ Troubleshooting

**Problem**: "Cannot find module 'firebase/firestore'"
**Solution**: We need to use Firebase Admin SDK for Node.js scripts. I'll fix this.

**Problem**: Script stops after first run
**Solution**: Make sure node-cron is installed and the scheduler is running.

**Problem**: Too many articles being published
**Solution**: Adjust limits in `rssSources.js` (maxArticlesPerDay, maxPerCategoryPerRun)

## 🔄 Deployment Options

### Option 1: Run on Your Computer (Development)
```bash
node news-agent/index.js
```
Keep your computer running 24/7 (not recommended for production)

### Option 2: Use a Cloud Service (Recommended)
- **Vercel Cron Jobs**: If hosting on Vercel
- **Netlify Functions + Cron**: If hosting on Netlify
- **GitHub Actions**: Free cron jobs
- **Railway/Render**: Free tier available

### Option 3: Use a VPS
- DigitalOcean Droplet ($5/month)
- AWS EC2 (free tier available)
- Google Cloud Run

## 📝 Next Steps

1. I'll create a Next.js API route version (easier to deploy)
2. Set up a cron service to call it every 30 minutes
3. Test with one RSS feed first
4. Monitor for a few days
5. Adjust limits as needed

## ⚠️ Important Notes

- **Don't spam**: The system has built-in limits
- **Monitor daily**: Check logs to ensure it's working
- **Manual review**: Consider reviewing articles before auto-publishing
- **Source attribution**: All articles include source links
- **SEO friendly**: Articles include proper meta tags

## 🆘 Need Help?

If something doesn't work:
1. Check the console logs
2. Verify Firebase connection
3. Test one RSS feed manually
4. Check daily limits haven't been reached

---

**Created for Neev News** 📰
*Automated news publishing made simple*

