import { getLandingPage } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

// Known static routes to exclude from dynamic landing page lookup
const STATIC_ROUTES = [
  'about',
  'blog',
  'calculator',
  'compare',
  'contact',
  'features',
  'pricing',
]

interface LandingPageMetadata {
  page_title?: string
  hero_headline?: string
  hero_subheadline?: string
  hero_image?: string | { imgix_url: string }
  hero_cta_text?: string
  hero_cta_link?: string
  features_title?: string
  features_content?: Array<{
    title: string
    description: string
    icon?: string
  }>
  content_sections?: Array<{
    title?: string
    content?: string
    layout?: string
  }>
  seo_title?: string
  seo_description?: string
}

interface LandingPage {
  id: string
  title: string
  slug: string
  metadata: LandingPageMetadata
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  if (STATIC_ROUTES.includes(slug)) {
    return {}
  }

  const page = (await getLandingPage(slug)) as LandingPage | null

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.metadata.seo_title || page.metadata.page_title || page.title,
    description: page.metadata.seo_description || page.metadata.hero_subheadline || '',
  }
}

export default async function DynamicLandingPage({ params }: PageProps) {
  const { slug } = await params

  // Don't handle known static routes
  if (STATIC_ROUTES.includes(slug)) {
    notFound()
  }

  const page = (await getLandingPage(slug)) as LandingPage | null

  if (!page) {
    notFound()
  }

  const { metadata } = page

  // Resolve hero image URL
  let heroImageUrl: string | null = null
  if (metadata.hero_image) {
    if (typeof metadata.hero_image === 'string' && metadata.hero_image.length > 0) {
      heroImageUrl = metadata.hero_image.startsWith('http')
        ? metadata.hero_image
        : `https://imgix.cosmicjs.com/${metadata.hero_image}`
    } else if (typeof metadata.hero_image === 'object' && metadata.hero_image.imgix_url) {
      heroImageUrl = metadata.hero_image.imgix_url
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 md:py-32 overflow-hidden">
        {heroImageUrl && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={`${heroImageUrl}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {metadata.hero_headline || page.title}
            </h1>
            {metadata.hero_subheadline && (
              <p className="text-xl md:text-2xl text-indigo-100 mb-8">
                {metadata.hero_subheadline}
              </p>
            )}
            {metadata.hero_cta_text && metadata.hero_cta_link && (
              <a
                href={metadata.hero_cta_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors duration-200 shadow-lg"
              >
                {metadata.hero_cta_text}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {metadata.features_content && metadata.features_content.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            {metadata.features_title && (
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {metadata.features_title}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {metadata.features_content.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200"
                >
                  {feature.icon && (
                    <div className="text-4xl mb-4">{feature.icon}</div>
                  )}
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      {metadata.content_sections && metadata.content_sections.length > 0 && (
        <div>
          {metadata.content_sections.map((section, index) => (
            <section
              key={index}
              className={`py-16 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
            >
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  {section.title && (
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                      {section.title}
                    </h2>
                  )}
                  {section.content && (
                    <div
                      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams using the AI-powered content platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={metadata.hero_cta_link || 'https://app.cosmicjs.com/signup'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors duration-200"
            >
              {metadata.hero_cta_text || 'Start Building Free'}
            </a>
            <Link
              href="/contact"
              className="inline-block bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
