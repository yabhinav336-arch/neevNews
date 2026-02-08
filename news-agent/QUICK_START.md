# ⚡ Quick Start - RSS Agent

## 🎯 3-Step Setup (5 Minutes)

### Step 1: Deploy Your Site
```bash
git add .
git commit -m "Add RSS agent"
git push origin main
```
Wait for Netlify to deploy (2-3 minutes)

### Step 2: Test the API
Open in browser:
```
https://neevnews.app/api/rss-agent
```

You should see JSON with article counts. ✅

### Step 3: Set Up Cron Job

**Easiest Option: EasyCron.com**

1. Go to: https://www.easycron.com/user/sign_up
2. Sign up (free)
3. Click "Add New Cron Job"
4. Fill in:
   - **URL**: `https://neevnews.app/api/rss-agent`
   - **Schedule**: `*/30 * * * *`
   - **Method**: GET
5. Click "Add"

**Done!** 🎉 Your site will now auto-update every 30 minutes!

---

## 📊 Check It's Working

1. Wait 30 minutes
2. Visit: `https://neevnews.app/api/rss-agent`
3. Check your admin: `https://neevnews.app/admin`
4. Look for articles by "Neev News Desk"

---

## 🆘 Problems?

**API returns error?**
- Check Netlify function logs
- Make sure site is deployed
- Test URL in browser

**No articles appearing?**
- Check admin panel first
- Verify articles are "published" status
- Check category matches your categories

**Cron not running?**
- Verify cron job is active
- Check cron service dashboard
- Test URL manually

---

That's it! Simple and automated! 🚀

