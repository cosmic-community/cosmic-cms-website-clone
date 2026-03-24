import { getTeamMembers } from '@/lib/cosmic'
import { TeamMember } from '@/types'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Team - Cosmic',
  description: 'Meet the Cosmic team: a unique blend of human leadership and AI agents working together to build the future of content management.',
}

export default async function TeamPage() {
  const members = await getTeamMembers() as TeamMember[]

  const humans = members.filter(m => m.metadata?.type === 'Human')
  const agents = members.filter(m => m.metadata?.type === 'AI Agent')

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-violet-600 to-indigo-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet the Team
            </h1>
            <p className="text-xl md:text-2xl text-violet-100">
              A unique blend of human creativity and AI agents, working together to build the future of content management.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      {humans.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Leadership</h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                The humans steering the ship.
              </p>
              <div className="flex justify-center">
                {humans.map((member) => {
                  const avatarUrl = member.metadata?.avatar
                    ? typeof member.metadata.avatar === 'object'
                      ? (member.metadata.avatar as { imgix_url: string }).imgix_url
                      : `https://imgix.cosmicjs.com/${member.metadata.avatar}`
                    : null

                  return (
                    <div
                      key={member.id}
                      className="bg-white rounded-2xl shadow-lg p-8 max-w-sm text-center hover:shadow-xl transition-shadow duration-300"
                    >
                      {avatarUrl && (
                        <img
                          src={`${avatarUrl}?w=300&h=300&fit=crop&auto=format`}
                          alt={member.metadata?.name || member.title}
                          className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-violet-100"
                        />
                      )}
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {member.metadata?.name || member.title}
                      </h3>
                      <p className="text-violet-600 font-semibold mb-4">
                        {member.metadata?.role}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {member.metadata?.bio}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AI Agents Section */}
      {agents.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block bg-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  Powered by AI
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI Team Agents</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  These AI agents are active team members at Cosmic. They collaborate with us in Slack, execute real work daily, and each bring specialized skills to the company.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {agents.map((member) => {
                  const avatarUrl = member.metadata?.avatar
                    ? typeof member.metadata.avatar === 'object'
                      ? (member.metadata.avatar as { imgix_url: string }).imgix_url
                      : `https://imgix.cosmicjs.com/${member.metadata.avatar}`
                    : null

                  const capabilities = member.metadata?.capabilities
                    ? member.metadata.capabilities.split(',').map((c: string) => c.trim()).filter((c: string) => c.length > 0)
                    : []

                  return (
                    <div
                      key={member.id}
                      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        {avatarUrl && (
                          <img
                            src={`${avatarUrl}?w=200&h=200&fit=crop&auto=format`}
                            alt={member.metadata?.name || member.title}
                            className="w-16 h-16 rounded-full object-cover border-2 border-violet-100"
                          />
                        )}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {member.metadata?.name || member.title}
                          </h3>
                          <p className="text-violet-600 font-medium text-sm">
                            {member.metadata?.role}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-4 flex-grow">
                        {member.metadata?.bio}
                      </p>

                      {member.metadata?.model && (
                        <div className="mb-3">
                          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            {member.metadata.model}
                          </span>
                        </div>
                      )}

                      {capabilities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {capabilities.slice(0, 4).map((cap: string, i: number) => (
                            <span
                              key={i}
                              className="inline-block bg-violet-50 text-violet-700 px-2.5 py-0.5 rounded-full text-xs font-medium"
                            >
                              {cap}
                            </span>
                          ))}
                          {capabilities.length > 4 && (
                            <span className="inline-block bg-gray-50 text-gray-500 px-2.5 py-0.5 rounded-full text-xs font-medium">
                              +{capabilities.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Work</h2>
            <p className="text-xl text-gray-600 mb-12">
              Our AI agents are not just chatbots. They are active participants in our daily operations, collaborating through Slack, executing workflows, and making decisions alongside our human team.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Real-Time Collaboration</h3>
                <p className="text-gray-600">
                  Our agents communicate in Slack alongside the human team. They participate in standups, respond to questions, and coordinate on projects.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-4">🔄</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Automated Workflows</h3>
                <p className="text-gray-600">
                  Each agent runs on scheduled workflows: daily prospecting, content creation, customer outreach, and technical monitoring happen on autopilot.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-4">🧠</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Persistent Memory</h3>
                <p className="text-gray-600">
                  Our team agents remember past conversations and context. They build relationships, track progress, and learn from every interaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Build Your Own AI Team</h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Cosmic lets you create AI agents that join your team, collaborate in your channels, and execute real work. Start building today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.cosmicjs.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-violet-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-violet-50 transition-colors duration-200"
            >
              Get Started Free
            </a>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors duration-200"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}