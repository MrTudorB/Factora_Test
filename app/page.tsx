export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            Welcome to Factora+
          </h1>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
            The Modern Invoice Factoring Platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* For Companies */}
          <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">For Companies</h3>
            <p className="mt-2 text-gray-500">
              Turn your invoices into immediate capital. Access quick, reliable funding through our secure platform.
            </p>
          </div>

          {/* For Investors */}
          <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">For Investors</h3>
            <p className="mt-2 text-gray-500">
              Discover new investment opportunities. Earn competitive returns by funding verified invoices.
            </p>
          </div>

          {/* Why Factora+ */}
          <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Why Factora+</h3>
            <p className="mt-2 text-gray-500">
              Blockchain-powered security, transparent transactions, and automated settlements for peace of mind.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Connect your wallet to access the platform and start exploring the future of invoice factoring.
          </p>
        </div>
      </div>
    </div>
  );
}
