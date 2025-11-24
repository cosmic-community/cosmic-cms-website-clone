// app/blog/[slug]/page.tsx
import { getBlogPost, getBlogPosts } from '@/lib/cosmic'
import { BlogPost } from '@/types'
import Link from 'next/link'
import type { Metadata } from 'next'
import SocialShareButtons from '@/components/SocialShareButtons'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug) as BlogPost | null
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: post.metadata.seo_title || post.metadata.title || post.title,
    description: post.metadata.seo_description || post.metadata.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts() as BlogPost[]
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Helper function to convert tags to array
function getTagsArray(tags: string | string[] | undefined): string[] {
  if (!tags) return []
  if (Array.isArray(tags)) return tags
  // Convert comma-separated string to array
  return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug) as BlogPost | null
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
        <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-semibold">
          ← Back to Blog
        </Link>
      </div>
    )
  }
  
  const { metadata } = post
  const author = metadata.author
  const tagsArray = getTagsArray(metadata.tags) // Changed: Convert tags to array
  
  // Build the full URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  const postUrl = `${baseUrl}/blog/${post.slug}`
  const postTitle = metadata.title || post.title
  
  return (
    <article className="bg-white">
      {/* Hero Section */}
      {metadata.featured_image && (
        <div className="relative h-96 bg-gray-900">
          <img
            src={`${metadata.featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={metadata.title || post.title}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            ← Back to Blog
          </Link>
          
          {/* Title and Meta */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {metadata.title || post.title}
          </h1>
          
          {/* Author and Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b">
            {author && (
              <div className="flex items-center gap-3">
                {author.metadata?.avatar && (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                    alt={author.metadata.name || author.title}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold">{author.metadata?.name || author.title}</div>
                  {author.metadata?.role && (
                    <div className="text-sm text-gray-600">{author.metadata.role}</div>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-4 text-gray-600">
              {metadata.published_date && (
                <span>{new Date(metadata.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              )}
              {metadata.reading_time && (
                <span>• {metadata.reading_time}</span>
              )}
            </div>
          </div>
          
          {/* Social Share Buttons - Added */}
          <div className="mb-8">
            <SocialShareButtons url={postUrl} title={postTitle} />
          </div>
          
          {/* Excerpt */}
          {metadata.excerpt && (
            <div className="text-xl text-gray-600 mb-8 leading-relaxed">
              {metadata.excerpt}
            </div>
          )}
          
          {/* Content */}
          {metadata.content && (
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: metadata.content }}
            />
          )}
          
          {/* Tags */}
          {tagsArray.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {tagsArray.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Bottom Social Share Buttons - Added for end of article */}
          <div className="mt-8 pt-8 border-t">
            <p className="text-gray-600 mb-4">Enjoyed this article? Share it with others:</p>
            <SocialShareButtons url={postUrl} title={postTitle} />
          </div>
          
          {/* Author Bio */}
          {author && author.metadata?.bio && (
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                {author.metadata.avatar && (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={author.metadata.name || author.title}
                    className="w-20 h-20 rounded-full flex-shrink-0"
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    About {author.metadata.name || author.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{author.metadata.bio}</p>
                  <div className="flex gap-4">
                    {author.metadata.twitter && (
                      <a
                        href={`https://twitter.com/${author.metadata.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Twitter
                      </a>
                    )}
                    {author.metadata.linkedin && (
                      <a
                        href={author.metadata.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        LinkedIn
                      </a>
                    )}
                    {author.metadata.github && (
                      <a
                        href={`https://github.com/${author.metadata.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}