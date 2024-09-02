"use client";

import { useCallback, useEffect, useState } from "react";
// import { recoverTypedSignature, signTypedData } from "@metamask/eth-sig-util";
import axios from "axios";
// import { ethers } from "ethers";
import { useAccount } from "wagmi";

export const useNFT = () => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const { signTypedData } = useSignTypedData();
  // const { data: signMessageData, error, isLoading, signMessage, variables } = useSignMessage();
  const { address, isConnected } = useAccount();

  const fetchNFT = useCallback(async () => {
    console.log("fetchNFT", address);
    try {
      setLoading(true);
      const response = await fetch(`/api/myNft/${address}`);
      const data = await response.json();
      setNftData(data);
      setLoading(false);
    } catch (error) {
      // setError(error);
      console.log("error", error);
      setLoading(false);
    }
  }, [isConnected]);

  return { fetchNFT, nftData, loading };
};
