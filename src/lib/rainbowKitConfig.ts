'use-client';

import { WALLET_CONNECT_PROJECT_ID } from '@/constants';
import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { bscTestnet, bsc } from 'wagmi/chains';

const { wallets } = getDefaultWallets();

const chain = process.env.NEXT_PUBLIC_CHAIN_ID === '97' ? bscTestnet : bsc;

export const rainbowKitConfig = getDefaultConfig({
  appName: 'Playbux',
  projectId: WALLET_CONNECT_PROJECT_ID,
  wallets,
  ssr: true,
  chains: [chain],
  transports: {
    [chain.id]: http(),
    // [bsc.id]: http(),
  },
});
