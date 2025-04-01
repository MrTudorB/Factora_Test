import Link from 'next/link';
import ConnectWalletButton from '@/components/web3/ConnectWalletButton';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-gray-900">
                  Factora+
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/company"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-500"
                >
                  Company Portal
                </Link>
                <Link
                  href="/investor"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-500"
                >
                  Investor Portal
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <ConnectWalletButton />
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
} 