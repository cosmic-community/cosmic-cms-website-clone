import { getTeamMembers } from '@/lib/cosmic'
import { TeamMember } from '@/types'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Team - Cosmic',
  description:
    'Meet the Cosmic team: one human founder and a crew of AI agents working together to build the future of content management.',
}

export default async function TeamPage() {
  const members = (await getTeamMembers()) as TeamMember[]

  const humanMembers = members.filter((m) => m.metadata.type === 'Human')
  const agentMembers = members.filter((m) => m.metadata.type === 'AI Agent')

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium">
              <span>🤖</span>
              <span>Human + AI, working as one</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet the Cosmic Team
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              We are a new kind of company: one human founder supported by a team
              of AI agents. Together, we build, grow, and support Cosmic every
              single day.
            </p>
          </div>
        </div>
      </section>

      {/* Human Leadership */}
      {humanMembers.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Leadership
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The human at the helm
              </p>
            </div>
            <div className="flex justify-center">
              {humanMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  {member.metadata.avatar && (
                    <img
                      src={`${member.metadata.avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={member.metadata.name || member.title}
                      className="w-32 h-32 rounded-full mx-auto mb-6 object-cover ring-4 ring-indigo-100"
                    />
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {member.metadata.name || member.title}
                  </h3>
                  <p className="text-indigo-600 font-semibold mb-4">
                    {member.metadata.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.metadata.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI Team Agents */}
      {agentMembers.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI Team Agents
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Autonomous AI agents that handle engineering, growth, content,
                sales, research, and customer success
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {agentMembers.map((member) => {
                const capabilities = member.metadata.capabilities
                  ? member.metadata.capabilities
                      .split(',')
                      .map((c: string) => c.trim())
                      .filter((c: string) => c.length > 0)
                  : []

                return (
                  <div
                    key={member.id}
                    className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {member.metadata.avatar && (
                        <img
                          src={`${member.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                          alt={member.metadata.name || member.title}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-100 flex-shrink-0"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {member.metadata.name || member.title}
                        </h3>
                        <p className="text-indigo-600 font-medium text-sm">
                          {member.metadata.role}
                        </p>
                      </div>
                    </div>

                    {member.metadata.model && (
                      <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 rounded-full px-3 py-1 text-xs font-medium mb-4 w-fit">
                        <span>⚡</span>
                        <span>{member.metadata.model}</span>
                      </div>
                    )}

                    <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                      {member.metadata.bio}
                    </p>

                    {capabilities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
                        {capabilities.map((cap: string, i: number) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium"
                          >
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
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How Our AI Team Works
              </h2>
              <p className="text-xl text-gray-600">
                Every agent is built on Cosmic's own AI agent platform
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Real Conversations</h3>
                <p className="text-gray-600">
                  Our agents live in Slack and communicate with Tony and each
                  other in real time, just like any team.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔄</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Autonomous Execution</h3>
                <p className="text-gray-600">
                  Each agent has specific capabilities: reading and writing CMS
                  content, browsing the web, managing code, and more.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📈</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Measurable Impact</h3>
                <p className="text-gray-600">
                  From writing blog posts to researching prospects to shipping
                  code, every agent delivers real, trackable results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Build Your Own AI Team
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Cosmic lets you create AI agents that work alongside your human team.
            Start building today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.cosmicjs.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors duration-200"
            >
              Get Started Free
            </a>
            <Link
              href="/about"
              className="inline-block bg-transparent text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-200"
            >
              About Cosmic
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
