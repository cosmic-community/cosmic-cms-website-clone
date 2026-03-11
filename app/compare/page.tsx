import { getBlogPosts } from '@/lib/cosmic'
import { BlogPost } from '@/types'
import Link from 'next/link'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Compare Cosmic vs Other CMS Platforms | Cosmic',
  description: 'See how Cosmic compares to Contentful, Sanity, Strapi, WordPress, and Payload. Discover why developers choose Cosmic for AI-powered content management.',
}

// Comparison data for the hero cards
const comparisons = [
  {
    slug: 'cosmic-vs-contentful',
    competitor: 'Contentful',
    tagline: 'AI-native vs. bolt-on integrations',
    highlights: ['Native AI content creation', 'More affordable at scale', 'Full platform stack vs content-only'],
    color: 'from-blue-500 to-blue-700',
  },
  {
    slug: 'cosmic-vs-sanity',
    competitor: 'Sanity',
    tagline: 'AI-first platform vs. structured content',
    highlights: ['Agentic workflows built-in', 'Faster setup, no GROQ learning curve', 'Predictable pricing'],
    color: 'from-red-500 to-red-700',
  },
  {
    slug: 'cosmic-vs-strapi',
    competitor: 'Strapi',
    tagline: 'Managed AI platform vs. self-hosted open source',
    highlights: ['Zero DevOps required', 'AI-powered content out of the box', 'Lower total cost of ownership'],
    color: 'from-purple-500 to-purple-700',
  },
  {
    slug: 'cosmic-vs-wordpress',
    competitor: 'WordPress',
    tagline: 'Modern headless + AI vs. legacy monolith',
    highlights: ['No plugin vulnerabilities', 'Lightning-fast performance', 'AI content automation'],
    color: 'from-cyan-500 to-cyan-700',
  },
  {
    slug: 'cosmic-vs-payload-cms',
    competitor: 'Payload CMS',
    tagline: 'AI-powered platform vs. code-first CMS',
    highlights: ['Native AI features', 'Fully managed, no hosting needed', 'Complete content operations platform'],
    color: 'from-orange-500 to-orange-700',
  },
]

export default async function ComparePage() {
  // Fetch actual blog posts to verify they exist and get metadata
  const posts = await getBlogPosts() as BlogPost[]
  const comparisonSlugs = comparisons.map(c => c.slug)
  const comparisonPosts = posts.filter(p => comparisonSlugs.includes(p.slug))

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Compare Cosmic vs Other CMS Platforms',
    description: 'See how Cosmic compares to Contentful, Sanity, Strapi, WordPress, and Payload CMS.',
    url: 'https://www.cosmicjs.com/compare',
    publisher: {
      '@type': 'Organization',
      name: 'Cosmic',
      url: 'https://www.cosmicjs.com',
    },
  }

  return (
    <div className="bg-white">
      <JsonLd data={jsonLd} />

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How Cosmic Compares
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4">
            See why developers are choosing Cosmic over traditional headless CMS platforms.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            AI-powered content creation, agentic workflows, and a complete platform stack — all in one place.
          </p>
        </div>
      </section>

      {/* Why Cosmic Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Teams Choose Cosmic</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three things that set Cosmic apart from every other CMS
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3">AI-Native Content</h3>
              <p className="text-gray-600">
                Generate, edit, and optimize content with AI built directly into the platform. No plugins, no third-party integrations.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Agentic Workflows</h3>
              <p className="text-gray-600">
                Automate multi-step content processes with AI agents. From creation to review to publishing — all automated.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Full Platform Stack</h3>
              <p className="text-gray-600">
                Content + code + agents in one unified platform. Stop juggling multiple tools and start building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Detailed Comparisons</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore head-to-head comparisons with the most popular CMS platforms
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {comparisons.map((comparison) => {
              const post = comparisonPosts.find(p => p.slug === comparison.slug)
              return (
                <Link
                  key={comparison.slug}
                  href={`/blog/${comparison.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 group-hover:border-blue-200">
                    {/* Gradient Header */}
                    <div className={`bg-gradient-to-r ${comparison.color} p-6 text-white`}>
                      <div className="text-sm font-medium opacity-80 mb-1">Cosmic vs</div>
                      <h3 className="text-2xl font-bold">{comparison.competitor}</h3>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-gray-600 font-medium mb-4">{comparison.tagline}</p>
                      
                      {/* Key Highlights */}
                      <ul className="space-y-2 mb-6 flex-grow">
                        {comparison.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      
                      {/* Reading time */}
                      {post?.metadata?.reading_time && (
                        <div className="text-sm text-gray-500 mb-4">
                          {post.metadata.reading_time}
                        </div>
                      )}
                      
                      {/* CTA */}
                      <div className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                        Read full comparison →
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to experience the difference?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of developers who've switched to the AI-powered CMS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.cosmicjs.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Started Free
            </a>
            <Link
              href="/pricing"
              className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}