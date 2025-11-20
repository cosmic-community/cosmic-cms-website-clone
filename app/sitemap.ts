import { MetadataRoute } from 'next'
import { getBlogPosts, getLandingPage } from '@/lib/cosmic'
import { BlogPost } from '@/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  const posts = await getBlogPosts() as BlogPost[]
  
  const blogUrls = posts.map((post) => {
    // Validate and parse the modified_at date, fallback to current date if invalid
    let lastModified: Date
    try {
      const parsedDate = new Date(post.modified_at)
      // Check if the date is valid
      lastModified = isNaN(parsedDate.getTime()) ? new Date() : parsedDate
    } catch {
      lastModified = new Date()
    }
    
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  })
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...blogUrls,
  ]
}