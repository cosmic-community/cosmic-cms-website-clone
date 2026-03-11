import { getBlogPosts } from '@/lib/cosmic'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cosmicjs.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
  
  // Dynamic blog posts
  try {
    const posts = await getBlogPosts()
    const blogPages: MetadataRoute.Sitemap = posts.map((post: { slug: string; metadata?: { published_date?: string } }) => {
      // Give comparison posts higher priority
      const isComparison = post.slug.startsWith('cosmic-vs-')
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.metadata?.published_date ? new Date(post.metadata.published_date) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: isComparison ? 0.8 : 0.6,
      }
    })
    
    return [...staticPages, ...blogPages]
  } catch {
    return staticPages
  }
}