export default function FeaturesLoading() {
  return (
    <div>
      <section className="bg-gradient-to-br from-purple-600 to-blue-700 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-16 bg-white/20 rounded w-3/4 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-white/20 rounded w-2/3 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-12 animate-pulse"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}