export default function TeamLoading() {
  return (
    <div>
      {/* Hero Skeleton */}
      <section className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-12 bg-white/20 rounded-lg w-64 mx-auto mb-6 animate-pulse" />
            <div className="h-6 bg-white/20 rounded-lg w-96 mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Leadership Skeleton */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="h-10 bg-gray-200 rounded-lg w-48 mx-auto mb-12 animate-pulse" />
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full">
                <div className="w-40 h-40 rounded-full bg-gray-200 mx-auto mb-6 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded-lg w-40 mx-auto mb-2 animate-pulse" />
                <div className="h-5 bg-gray-200 rounded-lg w-32 mx-auto mb-4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Skeleton */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-12 animate-pulse" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
                    <div>
                      <div className="h-6 bg-gray-200 rounded w-24 mb-1 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}