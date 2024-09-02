export const CHAIN_ID: number = process.env.NEXT_PUBLIC_CHAIN_ID
  ? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
  : 56;

export const PAYMENT_TOKEN: any = {
  97: {
    USDT: {
      symbol: 'USDT',
      address: '0xe00402a79D4414cDD9309086178021757826F858',
      image: '/images/icons/icon_usdt.svg',
    },
    PBUX: {
      symbol: 'PBUX',
      address: '0x42B5B2dC3E05EEd00D0356e7Fb1C445D2345dcc5',
      image: '/images/icons/icon_pbux.svg',
    },
  },

  56: {
    USDT: {
      symbol: 'USDT',
      address: '0x55d398326f99059fF775485246999027B3197955',
      image: '/images/icons/icon_usdt.svg',
    },
    PBUX: {
      symbol: 'PBUX',
      address: '0x9D1d4dE9cD93203147fAc3BC0262a78e3a0e96bb',
      image: '/images/icons/icon_pbux.svg',
    },
  },
};

export const MAX_UINT256 =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';

export const BSC_RPC_URL =
  process.env.NEXT_PUBLIC_BSC_RPC_URL || 'https://bsc-dataseed.binance.org';
export const BSC_SCAN_URL: any = {
  56: 'https://bscscan.com',
  97: 'https://testnet.bscscan.com',
};
export const QUEST_TYPE = {
  PLANET_MYSTERY_BOX: 100,
};

export const BLOCK_LIMIT_EACH_TIME = 5000;
