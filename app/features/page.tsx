import { getLandingPage } from '@/lib/cosmic'
import { LandingPage } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features - Cosmic',
  description: 'Explore Cosmic\'s powerful features including RESTful & GraphQL APIs, webhooks, team collaboration, and more.',
}

export default async function FeaturesPage() {
  const page = await getLandingPage('features') as LandingPage | null
  
  if (!page) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Features</h1>
        <p className="text-xl text-gray-600">Content not found. Please check your Cosmic configuration.</p>
      </div>
    )
  }
  
  const { metadata } = page
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-blue-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {metadata.hero_headline || page.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              {metadata.hero_subheadline}
            </p>
            {metadata.hero_cta_text && metadata.hero_cta_link && (
              <a
                href={metadata.hero_cta_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors duration-200"
              >
                {metadata.hero_cta_text}
              </a>
            )}
          </div>
        </div>
        {metadata.hero_image && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img
              src={`${metadata.hero_image.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
              alt={metadata.hero_headline || ''}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </section>

      {/* Features Grid */}
      {metadata.features_content && metadata.features_content.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {metadata.features_title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {metadata.features_content.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-100"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}