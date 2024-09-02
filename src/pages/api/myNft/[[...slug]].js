import { useEvmNativeBalance } from "@moralisweb3/next";

const Moralis = require("moralis").default;
// Import the EvmChain dataType
const { EvmChain } = require("@moralisweb3/common-evm-utils");

// Check if Moralis is already started
if (!Moralis.Core.isStarted) {
  const apiKey = process.env.MORALIS_API_KEY;
  Moralis.start({
    apiKey,
  });
}

export default async function handler(req, res) {
  try {
    const chain = 97;
    // TODO: get address from request query string

    const { slug = {} } = req.query;
    console.log("slug", slug);

    const address = slug[0];

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });
    //  const address = "0x66217b8D37C2cb47e6e4BF714542C376eA3FEA6e";

    const nftContactAddress = 0xf3c58f45ac92b04d53f830509bdeb0ca6fbbed85; // real
    // const nftContactAddress = 0x49d686a19055ff0b1b471b759f34a03014fbae01;
    const filteredNFTs = [];

    response.result.map((nft) => {
      if (nft.tokenAddress._value == nftContactAddress) {
        filteredNFTs.push({
          contractType: nft.contractType,
          tokenAddress: nft.tokenAddress._value,
          name: nft.name,
          symbol: nft.symbol,
          tokenId: nft.tokenId,
          owner: nft.ownerOf,
          tokenUri: nft.tokenUri,
          imageId: nft.tokenUri.split("/")[nft.tokenUri.split("/").length - 1],
          metadata: nft.metadata,
        });
      }
    });

    res.status(200).json(filteredNFTs);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}
