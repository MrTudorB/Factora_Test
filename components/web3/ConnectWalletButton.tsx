'use client';

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Identity,
} from '@coinbase/onchainkit/identity';
import { useAccount, useChains, useChainId } from 'wagmi';
import { useWalletStore } from '@/store/walletStore';
import { useEffect } from 'react';

export default function ConnectWalletButton() {
  const { address } = useAccount();
  const { setAddress, setIsConnected } = useWalletStore();
  const chains = useChains();
  const chainId = useChainId();
  const currentChain = chains.find(chain => chain.id === chainId);

  useEffect(() => {
    if (address) {
      setAddress(address);
      setIsConnected(true);
    } else {
      setAddress('');
      setIsConnected(false);
    }
  }, [address, setAddress, setIsConnected]);

  const truncateAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <div className="relative">
      <Wallet>
        <ConnectWallet className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {address ? truncateAddress(address) : 'Connect Wallet'}
        </ConnectWallet>
        {address && (
          <WalletDropdown className="absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-gray-900">Connected Wallet</p>
              <div 
                className="mt-1 px-3 py-2 text-sm bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => copyToClipboard(address)}
              >
                <Identity address={address} className="text-gray-900 font-mono">
                  <Address address={address} className="text-gray-900" />
                </Identity>
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-900">Network</p>
                <div className="mt-1 px-3 py-2 text-sm bg-gray-50 rounded-md">
                  <span className="font-mono text-gray-900">
                    {currentChain?.name || 'Not Connected'} 
                    {currentChain?.id && ` (${currentChain.id})`}
                  </span>
                </div>
              </div>
            </div>
            <div className="py-1">
              <WalletDropdownDisconnect className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors" />
            </div>
          </WalletDropdown>
        )}
      </Wallet>
    </div>
  );
} 