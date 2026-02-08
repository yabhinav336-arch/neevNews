# 🚀 RSS Agent Setup Guide (Beginner-Friendly)

This guide will help you set up automated news publishing for Neev News.

## ✅ What You Need

- Your website deployed on Netlify (or Vercel)
- A free cron service account (I'll show you options)
- 10 minutes of your time

## 📦 Step 1: Install Package

The package is already installed! But if you need to reinstall:

```bash
npm install rss-parser
```

## 🧪 Step 2: Test It Manually

### Option A: Test on Your Computer (Local)

1. Start your development server:
```bash
npm run dev
```

2. Open your browser and go to:
```
http://localhost:3000/api/rss-agent
```

3. You should see a JSON response like:
```json
{
  "success": true,
  "fetched": 12,
  "unique": 8,
  "saved": 5,
  "skipped": 3,
  "message": "Completed in 15.23s. Saved 5 articles."
}
```

4. Check your admin panel to see if articles were added!

### Option B: Test on Live Site

1. Deploy your site first (push to GitHub, Netlify auto-deploys)
2. Visit: `https://neevnews.app/api/rss-agent`
3. Check the response

## ⏰ Step 3: Set Up Automatic Runs (Cron Job)

You need a service that calls your API every 30 minutes. Here are FREE options:

### Option 1: EasyCron (Recommended for Beginners) ⭐

1. Go to: https://www.easycron.com/
2. Sign up (free account)
3. Click "Add New Cron Job"
4. Fill in:
   - **Cron Job Name**: Neev News RSS Agent
   - **URL**: `https://neevnews.app/api/rss-agent`
   - **Schedule**: `*/30 * * * *` (every 30 minutes)
   - **HTTP Method**: GET
5. Click "Add"
6. Done! ✅

### Option 2: Cron-Job.org (Free)

1. Go to: https://cron-job.org/
2. Sign up (free)
3. Create new cron job:
   - **Title**: Neev News RSS
   - **URL**: `https://neevnews.app/api/rss-agent`
   - **Schedule**: Every 30 minutes
4. Save

### Option 3: GitHub Actions (Advanced)

If you want to use GitHub Actions, I can create a workflow file for you.

### Option 4: Netlify Scheduled Functions (If on Netlify)

I can create a Netlify function with cron trigger.

## 🔒 Step 4: Add Security (Optional but Recommended)

To prevent others from calling your API:

1. Add an environment variable in Netlify:
   - Go to Site Settings → Environment Variables
   - Add: `RSS_AGENT_KEY` = `your-secret-key-here`

2. Uncomment the security check in `pages/api/rss-agent.js`:
   ```javascript
   if (req.query.key !== process.env.RSS_AGENT_KEY) {
     return res.status(401).json({ error: 'Unauthorized' });
   }
   ```

3. Update your cron job URL to:
   ```
   https://neevnews.app/api/rss-agent?key=your-secret-key-here
   ```

## 📊 Step 5: Monitor It

### Check Logs

1. Go to your Netlify dashboard
2. Click "Functions" → "rss-agent"
3. See execution logs

### Check Results

Visit: `https://neevnews.app/api/rss-agent`

You'll see:
- How many articles were fetched
- How many were unique
- How many were saved
- Any errors

### Check Your Website

1. Go to your admin panel: `https://neevnews.app/admin`
2. Check "All Articles"
3. Look for articles by "Neev News Desk"
4. They should be auto-published!

## ⚙️ Configuration

Edit `pages/api/rss-agent.js` to:
- Change RSS sources (add/remove feeds)
- Change categories
- Adjust limits (MAX_ARTICLES_PER_DAY, MAX_PER_CATEGORY_PER_RUN)
- Change author name (DEFAULT_AUTHOR)

## 🐛 Troubleshooting

### Problem: "No articles fetched"
- **Solution**: Check if RSS feeds are accessible. Some might be blocked.

### Problem: "All articles are duplicates"
- **Solution**: This is normal! It means you already have those articles.

### Problem: "Daily limit reached"
- **Solution**: Wait until tomorrow, or increase MAX_ARTICLES_PER_DAY in the code.

### Problem: Cron job not running
- **Solution**: 
  1. Check cron service dashboard
  2. Verify URL is correct
  3. Test URL manually in browser
  4. Check Netlify function logs

### Problem: Articles not appearing on website
- **Solution**:
  1. Check admin panel - are they saved?
  2. Check article status - should be "published"
  3. Clear browser cache
  4. Check category matches your categories

## 📈 What Happens Next?

1. **Every 30 minutes**: Cron service calls your API
2. **API fetches**: News from all RSS feeds
3. **Checks duplicates**: Skips articles you already have
4. **Saves to database**: New articles are published
5. **Appears on website**: Articles show up automatically!

## 🎯 Success Checklist

- [ ] API route works when tested manually
- [ ] Cron job is set up and running
- [ ] Articles appear in admin panel
- [ ] Articles show on website
- [ ] No errors in logs
- [ ] Daily limit is respected

## 🆘 Need Help?

1. Check the console logs in Netlify
2. Test the API manually first
3. Start with one RSS feed to test
4. Check Firebase database directly

---

**You're all set!** 🎉 Your website will now automatically update with news every 30 minutes!

