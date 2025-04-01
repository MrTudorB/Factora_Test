import { create } from 'zustand';

interface WalletState {
  address: string | undefined;
  isConnected: boolean;
  setAddress: (address: string | undefined) => void;
  setIsConnected: (isConnected: boolean) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: undefined,
  isConnected: false,
  setAddress: (address) => set({ address }),
  setIsConnected: (isConnected) => set({ isConnected }),
  disconnect: () => set({ address: undefined, isConnected: false }),
})); 