# NeevNews - Quick Start Guide

## 🚀 Your Professional News Portal

NeevNews is a world-class news platform built with Next.js, Firebase, and Tailwind CSS.

---

## 📱 Contact Information

- **Email**: abhinavvoicebox@gmail.com
- **Phone**: +91 93693 36080
- **Address**: Noida Sector 27, Uttar Pradesh, India

---

## 🌐 Important URLs

### Live Site
- **Homepage**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **All News**: http://localhost:3000/news

### Category Pages
- Politics: http://localhost:3000/category/politics
- Technology: http://localhost:3000/category/technology
- Business: http://localhost:3000/category/business
- Science: http://localhost:3000/category/science
- Health: http://localhost:3000/category/health
- Sports: http://localhost:3000/category/sports
- Entertainment: http://localhost:3000/category/entertainment
- World: http://localhost:3000/category/world

---

## 📝 How to Create Articles

### Step 1: Go to Admin Panel
Visit: http://localhost:3000/admin

### Step 2: Fill in Article Details

**Required Fields:**
- **Title**: Your article headline (auto-generates URL slug)
- **Summary**: Brief description (used for SEO and previews)
- **Content**: Full article text
- **Category**: Select from dropdown
- **Author**: Your name or journalist name

**Optional Fields:**
- **Image URL**: Featured image (use Unsplash or your own)
- **Meta Description**: Custom SEO description (auto-generated if empty)
- **Keywords**: SEO keywords (comma-separated)
- **Tags**: Article tags (comma-separated)
- **Featured**: Check to show in homepage hero
- **Status**: Draft, Published, or Archived

### Step 3: Add Good Image URLs

**Recommended Sources:**
- Unsplash: https://unsplash.com/
- Example: `https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`

**Image Guidelines:**
- Use high-quality images (1200px+ width)
- Landscape orientation (16:9 or 21:9)
- Relevant to article content
- Proper licensing

### Step 4: Click "Create Article"

Your article will:
- Save to Firebase `news` collection
- Auto-generate SEO-friendly URL slug
- Appear on homepage immediately
- Show in category pages
- Be searchable on /news page

---

## 📊 Firebase Collections

### News Collection (`news`)
Stores all articles with:
- Article content (title, summary, full text)
- Metadata (author, category, dates)
- SEO data (meta description, keywords, tags, slug)
- Engagement (views, likes)
- Status (draft/published/archived)

### Newsletter Collection (`newsletter`)
Stores email subscribers with:
- Email address
- Subscription timestamp
- Source (homepage/footer/sidebar)
- Active status

---

## 🎨 Features

### Homepage
- ✅ Featured breaking news hero
- ✅ Trending articles sidebar (top 5)
- ✅ Latest news grid (12 articles)
- ✅ Category sections (4 articles each)
- ✅ Newsletter signup (Firebase)
- ✅ Empty state with helpful guide

### Article Pages
- ✅ Full-screen hero image
- ✅ Complete article content
- ✅ Author information
- ✅ Related articles
- ✅ Social sharing (Twitter, Facebook, LinkedIn, Email)
- ✅ Like/heart button
- ✅ Reading time calculator
- ✅ Tags and metadata

### Category Pages
- ✅ Filter by category
- ✅ Sort by latest/popular
- ✅ Grid or list view
- ✅ Category description
- ✅ Article count

### All News Page
- ✅ Search functionality
- ✅ Filter by all categories
- ✅ Sort by latest/popular
- ✅ Grid or list view
- ✅ Real-time results

### Newsletter
- ✅ 3 signup locations
- ✅ Email validation
- ✅ Duplicate prevention
- ✅ Firebase integration
- ✅ Success/error messages

---

## 🎯 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Export static site
npm run export
```

---

## 🔧 Tech Stack

- **Framework**: Next.js 14
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **SEO**: Next-SEO
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Language**: TypeScript

---

## 🌟 Key Features

1. **Professional Design** - BBC/WION/CNN inspired
2. **Dark Mode** - Full theme support
3. **Mobile Responsive** - Perfect on all devices
4. **SEO Optimized** - Structured data, meta tags
5. **Firebase Integration** - Real-time database
6. **Newsletter System** - Email subscriptions
7. **Category Filtering** - Easy navigation
8. **Search Functionality** - Find articles quickly
9. **Social Sharing** - Multi-platform sharing
10. **Professional Logo** - Custom orange SVG

---

## 📞 Contact & Support

For any questions or support:
- **Email**: abhinavvoicebox@gmail.com
- **Phone**: +91 93693 36080

---

## 🎉 Your News Portal is Ready!

Visit http://localhost:3000 to see your beautiful news website in action!

Start creating articles at http://localhost:3000/admin

---

**Built with ❤️ for professional journalism and news publishing**

