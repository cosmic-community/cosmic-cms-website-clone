import { getAuthors } from '@/lib/cosmic'
import { Author } from '@/types'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Team - Cosmic',
  description: 'Meet the team behind Cosmic, the headless CMS built for developers.',
}

export default async function TeamPage() {
  const team = await getAuthors() as Author[]
  
  if (!team || team.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Team</h1>
        <p className="text-xl text-gray-600">Team members coming soon!</p>
      </div>
    )
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            The passionate people building the future of content management
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member) => (
              <Link
                key={member.id}
                href={`/team/${member.slug}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group"
              >
                {/* Avatar */}
                {member.metadata?.avatar && (
                  <div className="relative h-64 bg-gray-200 overflow-hidden">
                    <img
                      src={`${member.metadata.avatar.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                      alt={member.metadata.name || member.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}
                
                {/* Info */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {member.metadata?.name || member.title}
                  </h2>
                  {member.metadata?.role && (
                    <p className="text-blue-600 font-semibold mb-3">
                      {member.metadata.role}
                    </p>
                  )}
                  {member.metadata?.bio && (
                    <p className="text-gray-600 line-clamp-3">
                      {member.metadata.bio}
                    </p>
                  )}
                  
                  {/* Social Links */}
                  <div className="flex gap-4 mt-4">
                    {member.metadata?.linkedin && (
                      <span className="text-gray-400 hover:text-blue-600 transition-colors">
                        LinkedIn →
                      </span>
                    )}
                    {member.metadata?.twitter && (
                      <span className="text-gray-400 hover:text-blue-600 transition-colors">
                        Twitter →
                      </span>
                    )}
                    {member.metadata?.github && (
                      <span className="text-gray-400 hover:text-blue-600 transition-colors">
                        GitHub →
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}