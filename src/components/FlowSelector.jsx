function FlowSelector({ onSelectFlow }) {
  return (
    <div className="max-w-3xl mx-auto mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          className="bg-white border border-cloudflare-gray-200 rounded-lg p-8 cursor-pointer transition-all duration-200 text-left shadow-sm hover:shadow-md hover:border-cloudflare-orange group"
          onClick={() => onSelectFlow('epic')}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cloudflare-blue to-cloudflare-blue-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 text-cloudflare-gray-900">Epic</h3>
              <p className="text-cloudflare-gray-700 mb-3 text-base leading-relaxed">Size large bodies of work using T-shirt sizes (XS, S, M, L, XL, XXL)</p>
              <p className="text-sm text-cloudflare-gray-500">For roadmap planning, prioritization, and scoping major initiatives</p>
            </div>
          </div>
        </button>
        
        <button 
          className="bg-white border border-cloudflare-gray-200 rounded-lg p-8 cursor-pointer transition-all duration-200 text-left shadow-sm hover:shadow-md hover:border-cloudflare-orange group"
          onClick={() => onSelectFlow('story')}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cloudflare-teal to-cloudflare-blue-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 text-cloudflare-gray-900">Story</h3>
              <p className="text-cloudflare-gray-700 mb-3 text-base leading-relaxed">Size individual tickets using Fibonacci story points (1, 2, 3, 5, 8, 13)</p>
              <p className="text-sm text-cloudflare-gray-500">For sprint planning and estimating individual design tasks</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default FlowSelector