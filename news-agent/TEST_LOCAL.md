# 🧪 Testing RSS Agent Locally

## Quick Test Steps

### 1. Start Your Dev Server
```bash
npm run dev
```

### 2. Test the API Route

**Option A: Browser**
- Open: `http://localhost:3000/api/rss-agent`
- You should see JSON response

**Option B: Terminal**
```bash
curl http://localhost:3000/api/rss-agent
```

**Option C: Postman/Insomnia**
- Method: GET
- URL: `http://localhost:3000/api/rss-agent`

### 3. Check the Response

**Success Response:**
```json
{
  "success": true,
  "timestamp": "2025-01-XX...",
  "fetched": 12,
  "unique": 8,
  "saved": 5,
  "skipped": 3,
  "errors": 0,
  "message": "Completed in 15.23s. Saved 5 articles."
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here",
  "fetched": 0,
  "saved": 0
}
```

### 4. Check Console Logs

Look at your terminal where `npm run dev` is running. You should see:
- 🚀 RSS Agent started
- 📊 Checking daily limit...
- 📡 Fetching from X RSS sources...
- ✅/❌ messages for each source
- 🔍 Checking for duplicates...
- 💾 Saving articles...

### 5. Check Your Database

1. Go to: `http://localhost:3000/admin`
2. Click "All Articles"
3. Look for articles by "Neev News Desk"
4. Check if they're published

## Common Issues & Fixes

### Issue: "Cannot GET /api/rss-agent"
**Fix:** Make sure dev server is running (`npm run dev`)

### Issue: "No articles fetched"
**Possible causes:**
- RSS feeds are blocked/not accessible
- Network issues
- RSS feed URLs changed

**Fix:** Test RSS feeds manually:
```bash
curl https://techcrunch.com/feed/
```

### Issue: "All articles are duplicates"
**This is normal!** It means you already have those articles in your database.

**Fix:** 
- Wait for new articles from RSS sources
- Or delete some existing articles to test

### Issue: "Daily limit reached"
**Fix:** 
- Wait until tomorrow
- Or change `MAX_ARTICLES_PER_DAY` in the code

### Issue: Articles saved but not showing on website
**Check:**
1. Article status = "published" ✅
2. Category matches your categories ✅
3. Clear browser cache
4. Check homepage filters

### Issue: Firebase errors
**Check:**
1. Firebase config is correct
2. Database permissions allow writes
3. Network connection

## Debug Mode

Add this to see more details:

In `pages/api/rss-agent.js`, add at the top:
```javascript
const DEBUG = true;
```

Then add more console.logs throughout the code.

## Test with One Feed

To test with just one feed, modify `RSS_SOURCES`:

```javascript
const RSS_SOURCES = [
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    category: 'Technology',
    maxPerRun: 1, // Just 1 article for testing
  },
];
```

## Check What's Happening

1. **Check terminal logs** - See all console.log messages
2. **Check browser console** - If testing in browser
3. **Check Firebase console** - See if articles are being saved
4. **Check admin panel** - See if articles appear

## Still Not Working?

1. Share the error message you see
2. Share the JSON response from the API
3. Share the terminal logs
4. Check if any RSS feeds are accessible

---

**Need help?** Share:
- The error message
- The API response JSON
- Terminal logs
- What you see in admin panel

