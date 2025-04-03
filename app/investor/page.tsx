'use client';

import { useWalletStore } from '@/store/walletStore';
import ConnectWalletButton from '@/components/web3/ConnectWalletButton';
import MockApyChart from '@/components/investor/MockApyChart';
import MarketSentimentCard from '@/components/investor/MarketSentimentCard';
import TokenInfoCard from '@/components/investor/TokenInfoCard';

export default function InvestorPage() {
  const { isConnected } = useWalletStore();

  const handleDeposit = () => {
    console.log('Deposit test USDC clicked');
  };

  const handleWithdraw = () => {
    console.log('Withdraw Funds clicked');
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Investor Hub</h1>
            <p className="mt-4 text-lg text-gray-600">Please connect your wallet to access the dashboard</p>
            <div className="mt-8">
              <ConnectWalletButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Investor Hub</h1>
          <p className="mt-2 text-lg text-gray-600">Welcome to your investment dashboard</p>
        </div>

        {/* Investment Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Investment Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Strategy Focus</h3>
              <p className="text-gray-600">AI-Optimized Stable Yield</p>
            </div>
            <MarketSentimentCard />
          </div>
        </div>

        {/* Token Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Token Information</h2>
          <TokenInfoCard />
        </div>

        {/* APY Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Performance</h2>
          <MockApyChart />
        </div>

        {/* Investment Actions */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Investment Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Deposit Funds</h3>
              <p className="text-gray-600 mb-4">Add USDC to your investment portfolio</p>
              <button
                onClick={handleDeposit}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Deposit test USDC
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Withdraw Funds</h3>
              <p className="text-gray-600 mb-4">Withdraw your investment returns</p>
              <button
                onClick={handleWithdraw}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 