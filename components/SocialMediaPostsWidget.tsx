import { SocialMediaPost } from '@/types'

interface SocialMediaPostsWidgetProps {
  posts: SocialMediaPost[];
}

// Changed: Helper to format relative time from created_at
function getRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Changed: Helper to truncate post text for card display
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + '…';
}

export default function SocialMediaPostsWidget({ posts }: SocialMediaPostsWidgetProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Social Feed
            </h2>
            <p className="text-gray-600 mt-2">
              Latest updates from our social channels
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span>Scroll for more</span>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="social-scroll-container -mx-4 px-4">
          <div className="flex gap-5 pb-4">
            {posts.map((post) => {
              const postText = post.metadata?.post || post.title || '';

              return (
                <article
                  key={post.id}
                  className="flex-shrink-0 w-[300px] sm:w-[340px] bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getRelativeTime(post.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {truncateText(postText, 200)}
                  </p>

                  {/* Card Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Like
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Reply
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Share
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}