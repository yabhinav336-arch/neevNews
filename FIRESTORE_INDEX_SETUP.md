# Firestore Index Setup Guide

## Required Composite Index for Article Pages

Your article page queries articles by `slug` and `status` simultaneously. Firestore requires a composite index for this query to work efficiently.

### Index Details

**Collection:** `news`

**Fields:**
- `slug` - Ascending
- `status` - Ascending

### How to Create the Index

#### Option 1: Automatic (Recommended)
1. When you first visit an article page, Firebase will detect the missing index
2. Check your browser console for an error message with a direct link
3. Click the link - it will open Firebase Console with the index pre-configured
4. Click "Create Index" button
5. Wait 1-5 minutes for the index to build

#### Option 2: Manual Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **test-auth-4866a**
3. Navigate to **Firestore Database** → **Indexes** tab
4. Click **Create Index** button
5. Configure the index:
   - **Collection ID:** `news`
   - **Query scope:** Collection
   - **Fields to index:**
     - Field: `slug` → Order: Ascending
     - Field: `status` → Order: Ascending
6. Click **Create**

#### Option 3: Using Firebase CLI
If you have Firebase CLI installed, run:
```bash
firebase deploy --only firestore:indexes
```

Then create a `firestore.indexes.json` file:
```json
{
  "indexes": [
    {
      "collectionGroup": "news",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "slug",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "status",
          "order": "ASCENDING"
        }
      ]
    }
  ]
}
```

### Verification

After creating the index:
1. The index status will show as "Building" initially
2. Once it shows "Enabled" (usually 1-5 minutes), your article pages will work correctly
3. Test by visiting: `https://neevnews.app/politics/india-successfully-tests-hypersonic-missile-joins-elite-global-club/`

### Current Query

The article page uses this query:
```javascript
query(
  collection(db, 'news'),
  where('slug', '==', articleSlug),
  where('status', '==', 'published')
)
```

This requires the composite index: `slug (Ascending) + status (Ascending)`

### Troubleshooting

**Error: "The query requires an index"**
- This means the index hasn't been created yet
- Follow the steps above to create it
- Wait for the index to finish building (shows as "Enabled")

**Error: "Article not found"**
- Verify the slug exists in your Firestore `news` collection
- Check that the `slug` field matches exactly (case-sensitive)
- Ensure the article's `status` is set to `'published'`
- Verify the URL format: `/{category-slug}/{article-slug}` (e.g., `/politics/article-slug`)

**Important:** The application will work even without the composite index - it will automatically fall back to a slug-only query and filter by status client-side. However, creating the index improves performance.

**Index Status: "Building"**
- This is normal - wait 1-5 minutes
- Large collections may take longer
- You'll receive an email when it's ready

### Additional Indexes (Optional but Recommended)

For better performance, consider creating these indexes too:

1. **Category + Status + CreatedAt (for category pages):**
   - Collection: `news`
   - Fields: `category` (Ascending), `status` (Ascending), `createdAt` (Descending)

2. **Status + CreatedAt (for homepage latest news):**
   - Collection: `news`
   - Fields: `status` (Ascending), `createdAt` (Descending)

These will speed up your homepage and category page queries.

