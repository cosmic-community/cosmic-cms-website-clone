// app/team/[slug]/page.tsx
import { getAuthors } from '@/lib/cosmic'
import { Author } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface TeamMemberPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { slug } = await params
  const team = await getAuthors() as Author[]
  const member = team.find((m) => m.slug === slug)
  
  if (!member) {
    return {
      title: 'Team Member Not Found - Cosmic',
    }
  }
  
  return {
    title: `${member.metadata?.name || member.title} - Team - Cosmic`,
    description: member.metadata?.bio || `Learn more about ${member.metadata?.name || member.title} at Cosmic.`,
  }
}

export async function generateStaticParams() {
  const team = await getAuthors() as Author[]
  return team.map((member) => ({
    slug: member.slug,
  }))
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params
  const team = await getAuthors() as Author[]
  const member = team.find((m) => m.slug === slug)
  
  if (!member) {
    notFound()
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/team"
            className="inline-flex items-center text-blue-100 hover:text-white mb-8 transition-colors"
          >
            ← Back to Team
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar */}
              {member.metadata?.avatar && (
                <div className="flex-shrink-0">
                  <img
                    src={`${member.metadata.avatar.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={member.metadata.name || member.title}
                    className="w-48 h-48 rounded-full border-4 border-white shadow-xl"
                  />
                </div>
              )}
              
              {/* Info */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {member.metadata?.name || member.title}
                </h1>
                {member.metadata?.role && (
                  <p className="text-2xl text-blue-100 mb-6">
                    {member.metadata.role}
                  </p>
                )}
                
                {/* Social Links */}
                <div className="flex gap-4 justify-center md:justify-start">
                  {member.metadata?.linkedin && (
                    <a
                      href={member.metadata.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.metadata?.twitter && (
                    <a
                      href={`https://twitter.com/${member.metadata.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                  {member.metadata?.github && (
                    <a
                      href={`https://github.com/${member.metadata.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      {member.metadata?.bio && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {member.metadata.bio}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}