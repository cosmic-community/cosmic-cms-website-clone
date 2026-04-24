import { getPage } from '@/lib/cosmic'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 0
export const dynamic = 'force-dynamic'

interface PageObject {
  id: string
  title: string
  slug: string
  metadata: {
    hero_title?: string
    hero_subtitle?: string
    content?: string
    seo_description?: string
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = (await getPage('privacy')) as PageObject | null
  return {
    title: page?.metadata?.hero_title
      ? `${page.metadata.hero_title} - Cosmic`
      : 'Privacy Policy - Cosmic',
    description:
      page?.metadata?.seo_description ||
      'Read the Cosmic privacy policy to understand how we collect, use, and protect your personal information.',
  }
}

export default async function PrivacyPage() {
  const page = (await getPage('privacy')) as PageObject | null

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {page?.metadata?.hero_title || 'Privacy Policy'}
            </h1>
            {page?.metadata?.hero_subtitle && (
              <p className="text-lg md:text-xl text-gray-300">
                {page.metadata.hero_subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {page?.metadata?.content ? (
            <div
              className="prose prose-lg max-w-4xl mx-auto prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900 prose-ul:my-4 prose-li:my-1 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: page.metadata.content }}
            />
          ) : (
            <div className="max-w-4xl mx-auto text-center py-12">
              <p className="text-gray-500 text-lg">
                Privacy policy content is being prepared. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            Questions about our privacy practices?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            If you have any questions about this Privacy Policy or how we handle
            your data, please don&apos;t hesitate to reach out.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}