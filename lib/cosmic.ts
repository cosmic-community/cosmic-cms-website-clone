Testing the AI smarts :)

import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all blog posts
export async function getBlogPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch blog posts');
  }
}

// Fetch latest blog posts with limit
export async function getLatestBlogPosts(limit: number = 3) {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Sort by published_date (newest first) and limit results
    // Changed: Added explicit types to fix TS7006 errors
    const sortedPosts = response.objects.sort((a: { metadata?: { published_date?: string } }, b: { metadata?: { published_date?: string } }) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });
    
    return sortedPosts.slice(0, limit);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch latest blog posts');
  }
}

// Fetch a single blog post by slug
export async function getBlogPost(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'blog-posts',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch blog post');
  }
}

// Fetch related blog posts based on tags and category
export async function getRelatedPosts(currentSlug: string, tags?: string | string[], limit: number = 3) {
  try {
    const allPosts = await getBlogPosts();
    
    // Parse tags
    let tagsArray: string[] = [];
    if (tags) {
      if (Array.isArray(tags)) {
        tagsArray = tags;
      } else {
        tagsArray = tags.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
      }
    }
    
    // Filter out current post
    const otherPosts = allPosts.filter((p: { slug: string }) => p.slug !== currentSlug);
    
    if (tagsArray.length === 0) {
      // No tags, return latest posts
      return otherPosts.slice(0, limit);
    }
    
    // Score posts by tag overlap
    const scored = otherPosts.map((post: { slug: string; metadata?: { tags?: string | string[] } }) => {
      let postTags: string[] = [];
      const rawTags = post.metadata?.tags;
      if (rawTags) {
        if (Array.isArray(rawTags)) {
          postTags = rawTags;
        } else {
          postTags = (rawTags as string).split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
        }
      }
      const overlap = postTags.filter((t: string) => tagsArray.includes(t)).length;
      return { post, score: overlap };
    });
    
    // Sort by score (most related first), then take top N
    scored.sort((a: { score: number }, b: { score: number }) => b.score - a.score);
    return scored.slice(0, limit).map((s: { post: unknown }) => s.post);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    return [];
  }
}

// Fetch comparison blog posts (Cosmic vs X)
export async function getComparisonPosts() {
  try {
    const allPosts = await getBlogPosts();
    return allPosts.filter((p: { slug: string }) => p.slug.startsWith('cosmic-vs-'));
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    return [];
  }
}

// Fetch landing page by slug
export async function getLandingPage(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'landing-pages',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch landing page');
  }
}

// Fetch a page by slug (from pages object type)
export async function getPage(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'pages',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch page');
  }
}

// Fetch all authors
export async function getAuthors() {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch authors');
  }
}

// Changed: Added function to fetch social media posts
export async function getSocialMediaPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'social-media-posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(0)

    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch social media posts');
  }
}
