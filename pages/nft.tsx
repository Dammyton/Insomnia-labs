import NFTItem from "@/components/NFTItem";
import { formatWallet } from "@/utils";
import { NFT } from "@/utils/types";
import Image from "next/image";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const NFTList: React.FC = () => {
  const [nftList, setNFTList] = useState<NFT[]>([]);
  const [connectedWallet, setConnectedWallet] = useState<string>("");

  useEffect(() => {
    const fetchNFTs = async (): Promise<void> => {
      try {
        // Fetch NFT data
        const response = await fetch(
          `https://testnets-api.opensea.io/api/v1/assets?owner=${connectedWallet}`
        );
        const nftData: { assets: NFT[] } = await response.json();
        setNFTList(nftData?.assets);
      } catch (error) {
        console.log("Error fetching NFT data:", error);
      }
    };

    fetchNFTs();

    return () => {
      // Cleanup function
      setNFTList([]); // Reset the NFT list when the component unmounts
    };
  }, [connectedWallet]);

  const connectWallet = (): void => {
    // Connect the user's wallet and set the connected wallet address
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          const walletAddress = accounts[0];
          setConnectedWallet(walletAddress);
        })
        .catch((error: Error) => {
          console.log("Error connecting wallet:", error);
        });
    } else {
      console.log("Wallet provider not found.");
    }
  };

  const disconnectWallet = (): void => {
    // Disconnect the wallet and reset the connected wallet address
    setConnectedWallet("");
  };

  return (
    <div className="container mx-auto px-5">
      {!connectedWallet && (
        <div className="mt-12">
          <Image
            src={"/images/empty.svg"}
            alt={"empty"}
            className="h-[300px] w-full mb-5 rounded"
            width={100}
            height={100}
          />
          <p className="text-center mt-12">
            Connect your wallet to get started!
          </p>
          {!connectedWallet && (
            <button
              className="bg-green-600 mx-auto flex text-sm hover:bg-green-700 text-white py-2 px-4 rounded-lg mt-4"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          )}
        </div>
      )}

      {connectedWallet && (
        <>
          <div className="flex justify-between flex-wrap space-y-3 items-center mb-12 lg:mb-0">
            <h1 className="text-2xl font-bold lg:mt-12 mt-6 mb-8">NFT List</h1>

            <div className="flex flex-wrap items-center lg:gap-8 gap-3 lg:mb-12">
              {connectedWallet && (
                <p className="">
                  Connected Wallet: {formatWallet(connectedWallet)}
                </p>
              )}

              {connectedWallet && (
                <button
                  className="bg-red-500 text-xs hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                  onClick={disconnectWallet}
                >
                  Disconnect Wallet
                </button>
              )}
            </div>
          </div>
          <div className="mb-10 bg-[#191C22] rounded lg:px-8 lg:py-6 p-5">
            {nftList?.map((nft, i) => (
              <div key={nft.token_id}>
                <NFTItem nft={nft} />

                {i !== nftList.length - 1 && (
                  <hr className="bg-[#2E384D] h-[1px] border-0 my-8" />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NFTList;
