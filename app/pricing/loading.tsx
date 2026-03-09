export default function PricingLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-12 bg-white/20 rounded-lg w-3/4 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-white/20 rounded-lg w-1/2 mx-auto mb-8 animate-pulse" />
            <div className="h-10 bg-white/20 rounded-lg w-64 mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Cards Skeleton */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded w-1/3 mb-6 animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                ))}
              </div>
              <div className="h-10 bg-gray-200 rounded w-full mt-8 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}