export default function CalculatorLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-12 bg-white/20 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-white/20 rounded-lg w-96 mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* Billing Period */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-12 bg-gray-200 rounded-lg w-24 animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse" />
              </div>
            </div>

            {/* Plan Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border-2 border-gray-200 rounded-lg">
                    <div className="h-6 bg-gray-200 rounded w-16 mb-2 animate-pulse" />
                    <div className="h-8 bg-gray-200 rounded w-20 mb-2 animate-pulse" />
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-28 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage Estimates */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                    </div>
                    <div className="h-2 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cost Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                </div>
              </div>
              <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}