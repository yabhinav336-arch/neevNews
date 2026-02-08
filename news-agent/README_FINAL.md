# 📰 Neev News RSS Agent - Complete Guide

## ✅ What's Been Built

I've created a **fully automated news publishing system** for your website that:

- ✅ Fetches news from 6 RSS feeds automatically
- ✅ Runs every 30 minutes (configurable)
- ✅ Detects and skips duplicate articles
- ✅ Saves articles to your Firebase database
- ✅ Auto-publishes articles (status: "published")
- ✅ Respects safety limits (max 40 articles/day)
- ✅ Handles errors gracefully
- ✅ Logs everything for monitoring

## 📁 What Was Created

### Main File (API Route)
- **`pages/api/rss-agent.js`** - The main API endpoint that does everything

### Documentation Files
- **`news-agent/README.md`** - Full documentation
- **`news-agent/SETUP.md`** - Step-by-step setup guide
- **`news-agent/QUICK_START.md`** - 3-step quick start

### Configuration
- RSS feeds are configured in the API file
- Easy to add/remove feeds
- Easy to change categories and limits

## 🚀 How to Use (3 Simple Steps)

### Step 1: Deploy Your Site

Your code is ready! Just push to GitHub:

```bash
git add .
git commit -m "Add RSS news agent"
git push origin main
```

Netlify will automatically deploy it.

### Step 2: Test the API

After deployment, test it:

1. Open browser
2. Go to: `https://neevnews.app/api/rss-agent`
3. You should see JSON response with article counts

**Expected Response:**
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

### Step 3: Set Up Automatic Runs

Use a free cron service to call your API every 30 minutes:

**Recommended: EasyCron.com (Free)**

1. Go to: https://www.easycron.com/user/sign_up
2. Sign up (free account)
3. Click "Add New Cron Job"
4. Fill in:
   - **Cron Job Name**: Neev News RSS
   - **URL**: `https://neevnews.app/api/rss-agent`
   - **Schedule**: `*/30 * * * *` (every 30 minutes)
   - **HTTP Method**: GET
5. Click "Add"
6. ✅ Done!

**Alternative: Cron-Job.org**
- Same process, different website
- https://cron-job.org/

## 📊 RSS Feeds Included

1. **Google News (India)** - General news
2. **BBC World News** - World news
3. **Reuters World News** - World news
4. **TechCrunch** - Technology
5. **ESPN** - Sports
6. **Science Daily** - Science

All feeds are **100% FREE** - no API keys needed!

## ⚙️ Configuration

Edit `pages/api/rss-agent.js` to customize:

### Change RSS Feeds
Find `RSS_SOURCES` array and add/remove feeds:
```javascript
{
  name: 'Your Feed Name',
  url: 'https://feed-url.com/rss',
  category: 'Technology', // Must match your categories
  maxPerRun: 2,
}
```

### Change Limits
```javascript
const MAX_ARTICLES_PER_DAY = 40; // Max articles per day
const MAX_PER_CATEGORY_PER_RUN = 2; // Max per category per run
```

### Change Author Name
```javascript
const DEFAULT_AUTHOR = 'Neev News Desk';
```

### Change Categories
Make sure categories match your website categories:
- Politics
- Technology
- Business
- Science
- Health
- Sports
- General
- World

## 🔒 Security (Optional)

To prevent unauthorized access:

1. **Add Environment Variable in Netlify:**
   - Go to Site Settings → Environment Variables
   - Add: `RSS_AGENT_KEY` = `your-secret-key-123`

2. **Uncomment security check in API file:**
   ```javascript
   if (req.query.key !== process.env.RSS_AGENT_KEY) {
     return res.status(401).json({ error: 'Unauthorized' });
   }
   ```

3. **Update cron job URL:**
   ```
   https://neevnews.app/api/rss-agent?key=your-secret-key-123
   ```

## 📈 Monitoring

### Check API Status
Visit: `https://neevnews.app/api/rss-agent`

You'll see:
- How many articles fetched
- How many were unique
- How many were saved
- Any errors

### Check Netlify Logs
1. Go to Netlify dashboard
2. Click "Functions"
3. Click "rss-agent"
4. See execution logs

### Check Your Website
1. Go to admin: `https://neevnews.app/admin`
2. Check "All Articles"
3. Look for articles by "Neev News Desk"
4. They should be auto-published!

## 🐛 Troubleshooting

### "No articles fetched"
- Some RSS feeds might be blocked
- Check if feeds are accessible
- Try different feeds

### "All articles are duplicates"
- This is normal! Means you already have those articles
- Wait for new articles to be published by sources

### "Daily limit reached"
- You've published 40 articles today
- Wait until tomorrow
- Or increase `MAX_ARTICLES_PER_DAY`

### Articles not appearing on website
1. Check admin panel - are they saved?
2. Check status - should be "published"
3. Check category - must match your categories
4. Clear browser cache

### Cron job not running
1. Check cron service dashboard
2. Verify URL is correct
3. Test URL manually in browser
4. Check Netlify function logs

## 📝 How It Works

1. **Every 30 minutes**: Cron service calls your API
2. **API fetches**: News from all RSS feeds
3. **Checks duplicates**: Compares with existing articles
4. **Applies limits**: Respects daily and category limits
5. **Saves to database**: New articles are published
6. **Appears on website**: Articles show automatically!

## ✅ Success Checklist

- [ ] API route works when tested manually
- [ ] Cron job is set up and running
- [ ] Articles appear in admin panel
- [ ] Articles show on website homepage
- [ ] No errors in Netlify logs
- [ ] Daily limit is respected
- [ ] Duplicates are being skipped

## 🎯 Next Steps

1. **Test it**: Run the API manually first
2. **Set up cron**: Use EasyCron or similar
3. **Monitor**: Check logs for first few days
4. **Adjust**: Tweak limits and feeds as needed
5. **Enjoy**: Your site updates automatically! 🎉

## 📞 Need Help?

1. Check Netlify function logs
2. Test API manually in browser
3. Verify cron job is active
4. Check Firebase database directly
5. Review error messages in API response

---

## 🎉 You're All Set!

Your automated news publishing system is ready! 

**What happens next:**
- Every 30 minutes, your site will fetch new news
- Articles will be published automatically
- Your website stays updated 24/7
- No manual work needed!

**Just remember to:**
- Monitor it for the first few days
- Adjust limits if needed
- Check logs occasionally

**That's it! Simple, automated, and free!** 🚀

---

*Created for Neev News - Automated news publishing made simple*

