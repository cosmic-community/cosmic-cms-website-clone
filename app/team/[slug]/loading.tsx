// app/team/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="h-6 w-32 bg-blue-400 rounded mb-8 animate-pulse"></div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar Skeleton */}
              <div className="w-48 h-48 rounded-full bg-blue-400 animate-pulse"></div>
              
              {/* Info Skeleton */}
              <div className="flex-1 text-center md:text-left">
                <div className="h-12 w-64 bg-blue-400 rounded mb-4 animate-pulse mx-auto md:mx-0"></div>
                <div className="h-8 w-48 bg-blue-300 rounded mb-6 animate-pulse mx-auto md:mx-0"></div>
                <div className="flex gap-4 justify-center md:justify-start">
                  <div className="h-10 w-24 bg-white rounded-lg animate-pulse"></div>
                  <div className="h-10 w-24 bg-white rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <div className="h-8 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-100 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}