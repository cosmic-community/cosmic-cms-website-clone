import Link from 'next/link'
import { BlogPost } from '@/types'

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const { metadata } = post
  const author = metadata.author
  
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full flex flex-col">
      {/* Featured Image */}
      {metadata.featured_image && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            <img
              src={`${metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={metadata.title || post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
        </Link>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">
            {metadata.title || post.title}
          </h2>
        </Link>
        
        {/* Excerpt */}
        {metadata.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
            {metadata.excerpt}
          </p>
        )}
        
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-auto">
          {author && (
            <div className="flex items-center gap-2">
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={author.metadata.name || author.title}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="font-medium text-gray-700">
                {author.metadata?.name || author.title}
              </span>
            </div>
          )}
          
          {metadata.reading_time && (
            <span>• {metadata.reading_time}</span>
          )}
        </div>
        
        {/* Tags */}
        {metadata.tags && metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {metadata.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}