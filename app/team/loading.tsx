export default function TeamLoading() {
  return (
    <div>
      {/* Hero Skeleton */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-8 w-48 bg-white/20 rounded-full mx-auto mb-6 animate-pulse" />
            <div className="h-12 w-96 bg-white/20 rounded-lg mx-auto mb-6 animate-pulse" />
            <div className="h-6 w-80 bg-white/10 rounded-lg mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Leadership Skeleton */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 w-48 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-64 bg-gray-100 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="flex justify-center">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 animate-pulse" />
              <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-2 animate-pulse" />
              <div className="h-5 w-32 bg-gray-100 rounded-lg mx-auto mb-4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-4 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Skeleton */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 w-56 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-80 bg-gray-100 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse flex-shrink-0" />
                  <div className="flex-grow">
                    <div className="h-6 w-32 bg-gray-200 rounded-lg mb-2 animate-pulse" />
                    <div className="h-4 w-24 bg-gray-100 rounded-lg animate-pulse" />
                  </div>
                </div>
                <div className="h-5 w-28 bg-purple-50 rounded-full mb-4 animate-pulse" />
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="h-4 w-2/3 bg-gray-100 rounded-lg animate-pulse" />
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-6 w-14 bg-gray-100 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
