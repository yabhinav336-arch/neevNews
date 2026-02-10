/**
 * Google Images Scraper for Neev News Agent
 *
 * Uses Puppeteer to:
 * 1. Open Google Images
 * 2. Search by article headline
 * 3. Pick a random image from the top 10 results
 * 4. Download it to local disk
 *
 * Falls back gracefully - if anything fails the article keeps its original image.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const IMAGE_DIR = path.join(__dirname, '.cache', 'images');

function ensureImageDir() {
  if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
  }
}

/**
 * Download an image from a URL to a local file.
 * Follows redirects. Validates content-type and minimum size.
 */
function downloadImage(imageUrl, filename, redirectsLeft) {
  if (redirectsLeft === undefined) redirectsLeft = 5;
  return new Promise(function (resolve, reject) {
    if (redirectsLeft <= 0) return reject(new Error('Too many redirects'));
    ensureImageDir();
    const filePath = path.join(IMAGE_DIR, filename);
    const proto = imageUrl.startsWith('https') ? https : http;
    const opts = {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        Accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
        Referer: 'https://www.google.com/',
      },
    };
    const request = proto.get(imageUrl, opts, function (response) {
      if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location) {
        response.destroy();
        return downloadImage(response.headers.location, filename, redirectsLeft - 1).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        response.destroy();
        return reject(new Error('HTTP ' + response.statusCode));
      }
      const contentType = response.headers['content-type'] || '';
      if (!contentType.startsWith('image/')) {
        response.destroy();
        return reject(new Error('Not an image: ' + contentType));
      }
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      fileStream.on('finish', function () {
        fileStream.close();
        const stats = fs.statSync(filePath);
        if (stats.size < 5000) {
          fs.unlinkSync(filePath);
          return reject(new Error('Image too small (< 5 KB)'));
        }
        resolve(filePath);
      });
      fileStream.on('error', function (err) {
        fs.unlink(filePath, function () {});
        reject(err);
      });
    });
    request.on('timeout', function () {
      request.destroy();
      reject(new Error('Download timeout'));
    });
    request.on('error', reject);
  });
}

/**
 * Launch Puppeteer, search Google Images, and return an array of image URLs.
 */
async function searchGoogleImages(query) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--window-size=1280,800'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');

    const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query) + '&tbm=isch&safe=active&hl=en';
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 25000 });

    // Handle cookie-consent dialog
    try {
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await btn.evaluate(el => el.textContent);
        if (text && (text.includes('Accept all') || text.includes('I agree'))) {
          await btn.click();
          await new Promise(r => setTimeout(r, 1500));
          break;
        }
      }
    } catch (_) { /* no consent dialog */ }

    // Let images lazy-load
    await new Promise(r => setTimeout(r, 2000));
    await page.evaluate(() => window.scrollBy(0, 400));
    await new Promise(r => setTimeout(r, 1500));

    // Extract image URLs using multiple strategies
    const imageUrls = await page.evaluate(() => {
      const urls = [];
      const seen = {};
      const blocked = ['google', 'gstatic', 'favicon', 'logo', 'icon', 'badge', 'avatar', 'data:'];
      function isBlocked(u) {
        const l = u.toLowerCase();
        for (let i = 0; i < blocked.length; i++) { if (l.indexOf(blocked[i]) !== -1) return true; }
        return false;
      }
      function add(u) { if (u && !seen[u] && !isBlocked(u)) { seen[u] = true; urls.push(u); } }

      // Strategy 1: Full-size URLs from inline scripts
      document.querySelectorAll('script').forEach(script => {
        const text = script.textContent || '';
        const re = /\["(https?:\/\/[^"]+?\.(?:jpg|jpeg|png|webp)(?:\?[^"]*)?)",(\d+),(\d+)\]/gi;
        let m;
        while ((m = re.exec(text)) !== null) {
          let url = m[1].replace(/\\u003d/g, '=').replace(/\\u0026/g, '&').replace(/\\u002F/g, '/').replace(/\\\//g, '/');
          const w = parseInt(m[2], 10);
          const h = parseInt(m[3], 10);
          if (w > 200 && h > 150) add(url);
        }
      });

      // Strategy 2: img elements with http src
      document.querySelectorAll('img[src^="http"]').forEach(img => {
        if (img.naturalWidth > 80 && img.naturalHeight > 80) add(img.src);
      });

      // Strategy 3: data-src attributes
      document.querySelectorAll('[data-src^="http"]').forEach(el => {
        add(el.dataset.src);
      });

      return urls;
    });

    return imageUrls;
  } finally {
    if (browser) await browser.close();
  }
}

/**
 * Fetch a relevant image for an article.
 * 1. Search Google Images for the headline
 * 2. Pick a random from top 10
 * 3. Download to .cache/images/
 * @returns {string|null} Local file path or null
 */
async function fetchImageForArticle(headline, slug) {
  try {
    console.log('   \ud83d\udd0d Searching Google Images: "' + headline.substring(0, 55) + '..."');
    const imageUrls = await searchGoogleImages(headline);
    if (!imageUrls || imageUrls.length === 0) {
      console.log('   \u26a0\ufe0f  No images found on Google Images');
      return null;
    }
    console.log('   \ud83d\udcf8 Found ' + imageUrls.length + ' image(s). Picking from top 10...');
    const pool = imageUrls.slice(0, Math.min(10, imageUrls.length));
    const tried = {};
    for (let attempt = 0; attempt < Math.min(3, pool.length); attempt++) {
      let idx, tries = 0;
      do { idx = Math.floor(Math.random() * pool.length); tries++; } while (tried[idx] && tries < pool.length * 2);
      tried[idx] = true;
      try {
        const extMatch = pool[idx].match(/\.(jpg|jpeg|png|webp|gif)/i);
        const ext = extMatch ? '.' + extMatch[1].toLowerCase() : '.jpg';
        const safeSlug = slug.substring(0, 50).replace(/[^a-z0-9-]/gi, '');
        const filename = safeSlug + '-' + Date.now() + ext;
        const localPath = await downloadImage(pool[idx], filename);
        console.log('   \u2705 Image downloaded: ' + filename + ' (attempt ' + (attempt + 1) + ')');
        return localPath;
      } catch (err) {
        console.log('   \u26a0\ufe0f  Download attempt ' + (attempt + 1) + ' failed: ' + err.message);
      }
    }
    console.log('   \u274c All download attempts failed');
    return null;
  } catch (error) {
    console.error('   \u274c Image search error: ' + error.message);
    return null;
  }
}

/** Cleanup cached images older than 24 hours */
function cleanupOldImages() {
  try {
    if (!fs.existsSync(IMAGE_DIR)) return;
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const files = fs.readdirSync(IMAGE_DIR);
    let removed = 0;
    for (const file of files) {
      const fp = path.join(IMAGE_DIR, file);
      const stat = fs.statSync(fp);
      if (stat.mtimeMs < cutoff) { fs.unlinkSync(fp); removed++; }
    }
    if (removed > 0) console.log('   \ud83e\uddf9 Cleaned up ' + removed + ' old cached image(s)');
  } catch (_) { /* non-critical */ }
}

module.exports = { fetchImageForArticle, cleanupOldImages };
