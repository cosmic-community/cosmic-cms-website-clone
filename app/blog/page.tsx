import { getBlogPosts } from '@/lib/cosmic'
import { BlogPost } from '@/types'
import BlogPostCard from '@/components/BlogPostCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Cosmic',
  description: 'Read the latest articles about headless CMS, content management, and web development.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts() as BlogPost[]
  
  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600">No blog posts found. Check back soon!</p>
      </div>
    )
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, tutorials, and best practices for modern content management
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}