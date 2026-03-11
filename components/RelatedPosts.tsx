import Link from 'next/link'
import { BlogPost } from '@/types'

interface RelatedPostsProps {
  posts: BlogPost[]
  currentSlug: string
  title?: string
}

// Helper to check if a post is a comparison post
function isComparisonPost(slug: string): boolean {
  return slug.startsWith('cosmic-vs-')
}

export default function RelatedPosts({ posts, currentSlug, title = 'Related Articles' }: RelatedPostsProps) {
  // Filter out the current post
  const filteredPosts = posts.filter(p => p.slug !== currentSlug).slice(0, 3)
  
  if (filteredPosts.length === 0) return null

  // Check if we're on a comparison post to show cross-links
  const isCurrentComparison = isComparisonPost(currentSlug)
  const comparisonPosts = posts.filter(p => isComparisonPost(p.slug) && p.slug !== currentSlug)
  
  return (
    <div className="mt-12 pt-8 border-t">
      {/* Cross-links for comparison posts */}
      {isCurrentComparison && comparisonPosts.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-4">Also Considering?</h3>
          <div className="flex flex-wrap gap-3">
            {comparisonPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm"
              >
                {post.metadata.title || post.title}
              </Link>
            ))}
            <Link
              href="/compare"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
            >
              View All Comparisons →
            </Link>
          </div>
        </div>
      )}

      {/* Related posts */}
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
              {post.metadata.featured_image && (
                <div className="relative h-36 bg-gray-200 overflow-hidden">
                  <img
                    src={`${post.metadata.featured_image.imgix_url}?w=400&h=200&fit=crop&auto=format,compress`}
                    alt={post.metadata.title || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="font-semibold text-sm leading-tight group-hover:text-blue-600 transition-colors mb-2">
                  {post.metadata.title || post.title}
                </h4>
                {post.metadata.excerpt && (
                  <p className="text-xs text-gray-500 line-clamp-2 flex-grow">
                    {post.metadata.excerpt}
                  </p>
                )}
                {post.metadata.reading_time && (
                  <span className="text-xs text-gray-400 mt-2">
                    {post.metadata.reading_time}
                  </span>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}