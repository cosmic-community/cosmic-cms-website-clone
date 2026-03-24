import { getBlogPosts, getComparisonPosts } from '@/lib/cosmic'

const BASE_URL = 'https://www.cosmicjs.com'

export default async function sitemap() {
  const posts = await getBlogPosts()
  const comparisons = await getComparisonPosts()

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/features`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE_URL}/calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  const blogPages = posts.map((post: { slug: string }) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const comparisonPages = comparisons.map((post: { slug: string }) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...blogPages, ...comparisonPages]
}
