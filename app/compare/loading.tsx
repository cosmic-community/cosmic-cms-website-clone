export default function Loading() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Skeleton */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 bg-gray-800 rounded-lg w-96 mx-auto mb-6 animate-pulse" />
          <div className="h-6 bg-gray-800 rounded w-2/3 mx-auto mb-4 animate-pulse" />
          <div className="h-5 bg-gray-800 rounded w-1/2 mx-auto animate-pulse" />
        </div>
      </section>

      {/* Cards Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-24 bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-full animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded w-5/6 animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded w-4/5 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}