# 📰 Neev News – Automated AI News Agent (`news-agent/`)

This folder contains a **standalone Node.js background service** that:

- Fetches news from FREE RSS feeds every 30 minutes  
- Uses **OpenAI** to safely rewrite news in original wording  
- Saves articles into the **same Firestore `news` collection** used by your admin panel  
- Respects duplicate rules and daily/category publishing limits  
- Runs independently of the Next.js frontend

It **does not** replace or break your existing admin panel – it just adds automation on top.

---

## 1. Architecture Overview

- **Database**: Same Firebase Firestore project as your website (`news` collection)
- **Scheduler**: `node-cron` in `scheduler.js` (every 30 minutes)
- **RSS ingestion**: `fetchNews.js` + `rssSources.js`
- **AI rewrite**: `rewriteWithAI.js` (uses OpenAI Chat Completions API)
- **Duplicate control**: `dedupe.js`
- **Limits & save**: `saveArticle.js`
- **Entry point**: `index.js`

Flow per run:

1. `scheduler.js` → `runNewsAgent()`
2. `fetchNews.js` → fetch & normalize latest RSS items (last 24 hours only)
3. `dedupe.js` → remove duplicates (slug, title similarity, source URL)
4. `rewriteWithAI.js` → call OpenAI to rewrite title, summary, body
5. `saveArticle.js` → apply limits and save to Firestore with `status="published"`

---

## 2. Important Files

- `news-agent/index.js`  
  Starts the scheduler and keeps the Node process alive.

- `news-agent/scheduler.js`  
  Sets up cron schedule: `*/30 * * * *` (every 30 minutes).

- `news-agent/rssSources.js`  
  Defines the RSS feeds and categories:
  - Google News India (General / Politics)
  - BBC World
  - Reuters World
  - TechCrunch
  - ESPN Sports
  - Science Daily

- `news-agent/fetchNews.js`  
  Uses `rss-parser` to download feeds and normalize them into your article shape.  
  **Extra rule**: skips any item older than **24 hours**.

- `news-agent/rewriteWithAI.js`  
  Calls OpenAI to:
  - Rewrite headline, summary, and full article (200–400 words)
  - Keep facts unchanged
  - Keep neutral, simple, human-like news tone
  - Avoid emojis and opinions
  - Naturally mention the original source (e.g., “According to a report by …”)
  - Return JSON: `{ "headline", "summary", "article" }`  
  If anything fails, falls back to the original RSS article.

- `news-agent/dedupe.js`  
  Checks for duplicates using:
  - Same `slug`
  - Very similar titles
  - Same `sourceUrl`

- `news-agent/saveArticle.js`  
  Enforces:
  - **Max 40** articles per day (RSS-sourced)
  - **Max 2** per category per run  
  Saves with:
  - `status: "published"`
  - `author: "Neev News Desk"`
  - `isRssSource: true`

- `news-agent/firebaseClient.js`  
  Initializes Firebase Firestore for Node using env vars (same project as the website).

---

## 3. Environment Variables (REQUIRED)

Set these **in your server/host environment** – do **not** hardcode secrets in code.

### OpenAI

- `OPENAI_API_KEY` – Your OpenAI API key (used only by the news-agent).

> Note: Do **not** commit the key to Git or hardcode it in any file. Always use env vars.

### Firebase / Database

These should match your existing website Firebase project:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `DATABASE_URL` (optional for Firestore, kept for compatibility)

If these are not set, `firebaseClient.js` falls back to the same values currently used in `utils/firebase.ts`, so it will still work in development.

---

## 4. Running Locally

### Prerequisites

- Node.js **18+** (for built-in `fetch`)
- `npm install` already run at the project root

### Steps

1. **Create a local env file** (for example `.env.local` or export directly in your shell):

```bash
export OPENAI_API_KEY="your-openai-key-here"
export FIREBASE_API_KEY="..."
export FIREBASE_AUTH_DOMAIN="..."
export FIREBASE_PROJECT_ID="..."
export FIREBASE_STORAGE_BUCKET="..."
export FIREBASE_MESSAGING_SENDER_ID="..."
export FIREBASE_APP_ID="..."
```

2. From the project root, start the agent:

```bash
node news-agent/index.js
```

You should see logs like:

```text
📰 NEEV NEWS AGENT
Starting automated news publishing system...
⏰ Starting RSS News Scheduler...
🚀 NEEV NEWS RSS AGENT - Starting Run
📡 Fetching from: Google News - India...
...
🧠 Starting AI rewrite for 4 articles...
✅ AI rewrite complete for 4 articles.
💾 Saving articles to database...
```

3. Check your admin panel at `/admin` → “All Articles”  
   Look for articles authored by **“Neev News Desk”**.

4. Stop the agent with:

```bash
Ctrl + C
```

---

## 5. Deploying on Your Server

This agent is intended to run as a **separate Node process** alongside your website.

### Typical options

- **PM2** (recommended): process manager that restarts on crash and on reboot.
- **systemd service**: if you control the server directly.
- **Docker container**: if you use containers.

### Example with PM2

From the project root on your server:

```bash
pm2 start news-agent/index.js --name neev-news-agent
pm2 save
pm2 startup   # to auto-start on reboot (follow PM2 instructions)
```

To stop:

```bash
pm2 stop neev-news-agent
```

To see logs:

```bash
pm2 logs neev-news-agent
```

---

## 6. Cron Schedule & Behaviour

- Schedule: `*/30 * * * *` (every 30 minutes)
- Set in `scheduler.js` using `node-cron`
- On each run:
  - Fetches latest RSS items (last 24 hours)
  - Skips duplicates
  - AI rewrites remaining articles
  - Applies per-category and per-day limits
  - Writes to Firestore

If the OpenAI key is missing or the API fails:

- The agent **still runs**
- Articles are saved using the **original RSS content**
- Logs will show warnings about AI rewrite being skipped

---

## 7. Monitoring & Troubleshooting

### Monitoring

- Watch the terminal output (or `pm2 logs`) to see:
  - How many articles fetched
  - How many were unique
  - How many were AI-rewritten
  - How many were saved / skipped

### Common Issues

- **No OPENAI_API_KEY**  
  - Symptom: logs say “OPENAI_API_KEY not set. Skipping AI rewrite…”  
  - Fix: set `OPENAI_API_KEY` in your environment and restart the agent.

- **No articles saved**  
  - All fetched items may be:
    - Older than 24 hours, or
    - Duplicates of existing articles, or
    - Blocked by daily/category limits  
  - Check logs for:
    - “No articles fetched”
    - “All articles are duplicates”
    - “Daily limit reached”

- **Too many OpenAI errors**  
  - Check your OpenAI usage / limits.
  - Verify `OPENAI_API_KEY` is correct.
  - Agent will fall back to non-AI content automatically.

---

## 8. Safety & Content Rules (AI)

The agent is configured so that AI:

- **Only** uses data from the RSS item you fetched
- Does **not** add new facts or speculation
- Keeps neutral, simple, human-like language
- Avoids adjectives, hyperbole, and emotional tone
- Avoids emojis and personal opinions
- Produces:
  - Clear headline
  - 2–3 line summary
  - 200–400 word full article
- Always includes attribution to the original source in the article body and at the bottom.

---

You now have a **fully automated, AI-assisted news pipeline** that:

- Works with your existing admin CMS
- Publishes safely and regularly
- Can be started/stopped independently of the website
- Is configurable via environment variables without changing code

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

