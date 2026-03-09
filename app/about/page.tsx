import { getPage } from '@/lib/cosmic'
import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about')
  return {
    title: page?.metadata?.hero_title ? `${page.metadata.hero_title} - Cosmic` : 'About - Cosmic',
    description: page?.metadata?.seo_description || 'Learn about Cosmic, the AI-powered content management platform.',
  }
}

export default async function AboutPage() {
  const page = await getPage('about') as { id: string; title: string; slug: string; metadata: { hero_title?: string; hero_subtitle?: string; content?: string; seo_description?: string } } | null

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p className="text-xl text-gray-600">Content not found. Please check your Cosmic configuration.</p>
      </div>
    )
  }

  const { metadata } = page

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {metadata.hero_title || page.title}
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100">
              {metadata.hero_subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      {metadata.content && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div
              className="prose prose-lg max-w-4xl mx-auto prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900 prose-ul:my-4 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: metadata.content }}
            />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build with Cosmic?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using the AI-powered content platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.cosmicjs.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Start Building Free
            </a>
            <Link
              href="/contact"
              className="inline-block bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-300 transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}