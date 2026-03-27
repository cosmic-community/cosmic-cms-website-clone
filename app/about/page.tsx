import { getPage, getTeamMembers, getSelectValue } from '@/lib/cosmic'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about')
  return {
    title: page?.metadata?.hero_title ? `${page.metadata.hero_title} - Cosmic` : 'About - Cosmic',
    description: page?.metadata?.seo_description || 'Learn about Cosmic, the AI-powered content management platform. Meet the team of humans and AI agents building the future.',
  }
}

interface TeamMember {
  id: string
  title: string
  slug: string
  thumbnail?: string
  metadata: {
    name?: string
    role?: string
    member_type?: unknown
    bio?: string
    avatar?: string | { url?: string; imgix_url?: string }
    model?: string
    capabilities?: string
    display_order?: number
  }
}

function getAvatarUrl(avatar: unknown): string {
  if (!avatar) return ''
  if (typeof avatar === 'string') {
    if (avatar.startsWith('http')) return avatar
    return `https://imgix.cosmicjs.com/${avatar}`
  }
  if (typeof avatar === 'object' && avatar !== null) {
    const obj = avatar as Record<string, unknown>
    if (typeof obj.imgix_url === 'string') return obj.imgix_url
    if (typeof obj.url === 'string') return obj.url
  }
  return ''
}

export default async function AboutPage() {
  const [page, allMembers] = await Promise.all([
    getPage('about') as Promise<{ id: string; title: string; slug: string; metadata: { hero_title?: string; hero_subtitle?: string; content?: string; seo_description?: string } } | null>,
    getTeamMembers() as Promise<TeamMember[]>,
  ])

  const humans = allMembers.filter((m) => getSelectValue(m.metadata.member_type) === 'Human')
  const agents = allMembers.filter((m) => getSelectValue(m.metadata.member_type) === 'AI Agent')

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {page?.metadata?.hero_title || 'About Cosmic'}
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100">
              {page?.metadata?.hero_subtitle || 'A unique blend of human creativity and AI agents, building the future of content management.'}
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      {page?.metadata?.content && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div
              className="prose prose-lg max-w-4xl mx-auto prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-900 prose-ul:my-4 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: page.metadata.content }}
            />
          </div>
        </section>
      )}

      {/* Team Section */}
      {allMembers.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Meet the Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A unique blend of human creativity and AI agents, working together to build the future of content management.
              </p>
            </div>

            {/* Leadership */}
            {humans.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Leadership</h3>
                <div className="flex justify-center">
                  <div className="max-w-md">
                    {humans.map((member) => {
                      const avatarUrl = getAvatarUrl(member.metadata.avatar)
                      return (
                        <div key={member.id} className="bg-white rounded-2xl shadow-sm p-8 text-center">
                          {avatarUrl && (
                            <img
                              src={`${avatarUrl}?w=200&h=200&fit=crop&auto=format,compress`}
                              alt={member.metadata.name || member.title}
                              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-indigo-100"
                            />
                          )}
                          <h4 className="text-xl font-bold text-gray-900">{member.metadata.name || member.title}</h4>
                          <p className="text-indigo-600 font-medium mb-4">{member.metadata.role}</p>
                          <p className="text-gray-600 leading-relaxed text-sm">{member.metadata.bio}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* AI Agents */}
            {agents.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-center mb-4 text-gray-900">Our AI Team Agents</h3>
                <p className="text-center text-gray-500 mb-8 max-w-xl mx-auto">
                  These AI agents are active participants in our daily operations, collaborating through Slack, executing workflows, and making decisions alongside our human team.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agents.map((member) => {
                    const avatarUrl = getAvatarUrl(member.metadata.avatar)
                    const capabilities = member.metadata.capabilities
                      ? member.metadata.capabilities.split(',').map((c: string) => c.trim()).filter(Boolean)
                      : []
                    return (
                      <div key={member.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4 mb-4">
                          {avatarUrl && (
                            <img
                              src={`${avatarUrl}?w=120&h=120&fit=crop&auto=format,compress`}
                              alt={member.metadata.name || member.title}
                              className="w-16 h-16 rounded-full object-cover border-2 border-purple-100 flex-shrink-0"
                            />
                          )}
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{member.metadata.name || member.title}</h4>
                            <p className="text-indigo-600 font-medium text-sm">{member.metadata.role}</p>
                            {member.metadata.model && (
                              <span className="inline-block mt-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                {member.metadata.model}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.metadata.bio}</p>
                        {capabilities.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {capabilities.map((cap: string, idx: number) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                {cap}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* How We Work Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI agents are not just chatbots. They are active participants in our daily operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-bold mb-2">Real-Time Collaboration</h3>
              <p className="text-gray-600 text-sm">
                Our agents communicate in Slack alongside the human team. They participate in standups, brainstorms, and strategy sessions.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold mb-2">Autonomous Execution</h3>
              <p className="text-gray-600 text-sm">
                Each agent has defined responsibilities and can act independently, from writing blog posts to researching prospects to deploying code.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-lg font-bold mb-2">Continuous Improvement</h3>
              <p className="text-gray-600 text-sm">
                Agents learn from feedback, adapt their strategies, and get better over time. They are always on, always improving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build with Cosmic?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using the AI-powered content platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.cosmicjs.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors duration-200"
            >
              Start Building Free
            </a>
            <Link
              href="/contact"
              className="inline-block bg-transparent text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:border-white/60 transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
