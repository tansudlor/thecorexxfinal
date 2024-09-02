'use client'

import * as React from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { rainbowKitConfig } from '@/lib/rainbowKitConfig';
import { queryClient } from '@/lib/queryClient';
// import { Providers as ReduxProvider } from '@/store/provider';





export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={rainbowKitConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {/* <ReduxProvider> */}
          {children}
          {/* </ReduxProvider> */}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}


