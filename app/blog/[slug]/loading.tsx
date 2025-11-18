// app/blog/[slug]/loading.tsx
export default function BlogPostLoading() {
  return (
    <article className="bg-white">
      <div className="relative h-96 bg-gray-200 animate-pulse"></div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="h-6 bg-gray-200 rounded w-32 mb-8 animate-pulse"></div>
          
          <div className="h-12 bg-gray-200 rounded mb-6 animate-pulse"></div>
          
          <div className="flex items-center gap-6 mb-8 pb-8 border-b">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </article>
  )
}