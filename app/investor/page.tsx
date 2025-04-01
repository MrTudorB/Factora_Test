'use client';

import { useWalletStore } from '@/store/walletStore';
import MockApyChart from '@/components/investor/MockApyChart';

export default function InvestorPage() {
  const { isConnected } = useWalletStore();

  const handleDeposit = () => {
    console.log('Mock Deposit Triggered');
  };

  const handleWithdraw = () => {
    console.log('Mock Withdraw Triggered');
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Investor Portal</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please connect your wallet to access the Investor Portal
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <h2 className="text-3xl font-extrabold text-gray-900">Investor Dashboard</h2>
          <p className="mt-2 text-lg text-gray-500">
            Welcome to your investment portal
          </p>
        </div>

        {/* Strategy Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Investment Strategy</h3>
            <div className="bg-white bg-opacity-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Current Strategy Focus:</span>{' '}
                AI-Optimized Stable Yield
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Our AI-driven strategy focuses on optimizing returns while maintaining stability through selective invoice factoring.
              </p>
            </div>
          </div>
        </div>

        {/* APY Chart */}
        <MockApyChart />

        {/* Actions Section */}
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Deposit Card */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <h4 className="text-base font-medium text-gray-900 mb-2">Deposit Funds</h4>
              <p className="text-sm text-gray-500 mb-4">
                Add USDC to your investment pool
              </p>
              <button
                onClick={handleDeposit}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Deposit test USDC
              </button>
            </div>

            {/* Withdraw Card */}
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
              <h4 className="text-base font-medium text-gray-900 mb-2">Withdraw Funds</h4>
              <p className="text-sm text-gray-500 mb-4">
                Withdraw available USDC from your pool
              </p>
              <button
                onClick={handleWithdraw}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder for future components (e.g., investment history, stats) */}
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Overview</h3>
          <p className="text-sm text-gray-500">
            Your investment statistics and history will appear here.
          </p>
        </div>
      </div>
    </div>
  );
} 