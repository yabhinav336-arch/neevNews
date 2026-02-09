/**
 * OpenAI Rewriter for Neev News Agent
 *
 * - Uses ONLY the RSS content provided
 * - Does NOT invent new facts or speculate
 * - Writes in neutral, simple, human-like news tone
 * - 200–400 word article body
 * - Returns: headline, summary, article body
 *
 * Configuration (environment variables):
 * - OPENAI_API_KEY  (required for rewriting)
 *
 * If OPENAI_API_KEY is missing or any error happens, this module
 * safely falls back to the original RSS article content.
 */

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-4o-mini';

/**
 * Rewrite a single article using OpenAI.
 * Returns a NEW article object with rewritten fields.
 */
async function rewriteArticleWithAI(article) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('⚠️  OPENAI_API_KEY not set. Skipping AI rewrite and using original content.');
    return article;
  }

  try {
    const systemPrompt = 'You are a professional news editor.';

    const userPrompt = `
Rewrite the following news into original wording.
Do not change facts.
Keep a neutral journalistic tone.

Also, make sure you only use the information given in the news content. Do not add any new facts or guesses.

Write it in the simplest words and make it naturally written so that readers want to read the full copy like a human wrote it.
Keep it calm and matter-of-fact. Avoid hyperbole, emotional language, or strong adjectives.
Do not use emojis. Do not insert your own opinions.

Add:
- Headline
- 2-3 line summary
- Full article (200–400 words)

Make sure to naturally mention the original source in the article body, like:
"According to a report by ${article.sourceName}, ..." or similar phrasing.

News title:
${article.title}

News summary/description:
${article.summary}

Full RSS content (if available):
${article.content}

Source: ${article.sourceName}

VERY IMPORTANT OUTPUT FORMAT:
Respond ONLY with valid JSON in this exact shape:
{
  "headline": "string",
  "summary": "string",
  "article": "string"
}
`;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.4,
        max_tokens: 900,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('   ❌ OpenAI API error:', response.status, text);
      return article;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('   ⚠️  OpenAI response missing content. Using original article.');
      return article;
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      console.error('   ⚠️  Failed to parse OpenAI JSON. Using original article.');
      return article;
    }

    const rewrittenHeadline = (parsed.headline || article.title || '').trim();
    const rewrittenSummary = (parsed.summary || article.summary || '').trim();
    const rewrittenBody = (parsed.article || article.content || '').trim();

    if (!rewrittenHeadline || !rewrittenSummary || !rewrittenBody) {
      console.error('   ⚠️  OpenAI JSON missing fields. Using original article.');
      return article;
    }

    // Regenerate slug from the rewritten headline for cleanliness
    const slug = rewrittenHeadline
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 100);

    // Attach explicit source attribution at the bottom
    const attribution = `\n\n---\n\nSource: ${article.sourceName || 'Original publisher'} — Original report: ${article.sourceUrl || ''}`.trim();

    const fullContent = `${rewrittenBody}${attribution.startsWith('\n') ? attribution : `\n\n${attribution}`}`;

    return {
      ...article,
      title: rewrittenHeadline,
      summary: rewrittenSummary,
      content: fullContent,
      slug,
      // Keep existing category, timestamps, image, etc.
      metaDescription: rewrittenSummary.substring(0, 160),
    };
  } catch (error) {
    console.error('   ⚠️  Error during OpenAI rewrite:', error.message || error);
    return article;
  }
}

/**
 * Rewrite an array of articles with OpenAI, one by one.
 * Returns an array of rewritten articles (or originals if rewriting failed).
 */
async function rewriteArticlesWithAI(articles) {
  if (!articles || articles.length === 0) return [];

  console.log(`\n🧠 Starting AI rewrite for ${articles.length} articles...\n`);

  const rewritten = [];
  for (const article of articles) {
    const updated = await rewriteArticleWithAI(article);
    rewritten.push(updated);

    // Small delay to be gentle on the API
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(`\n✅ AI rewrite complete for ${rewritten.length} articles.\n`);
  return rewritten;
}

module.exports = {
  rewriteArticlesWithAI,
};

