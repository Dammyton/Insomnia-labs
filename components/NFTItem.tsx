import React from "react";
import Image from "next/image";
import { NFT } from "@/utils/types";

const NFTItem: React.FC<{ nft: NFT }> = ({ nft }) => (
  <div>
    <h2 className="text-[#D6E8FF] font-[700] text-[20px] mb-5">{nft.name}</h2>

    <div className="lg:flex lg:gap-16">
      <Image
        src={nft.image_url}
        alt={nft.name}
        className="h-[200px] w-[200px] object-cover mb-5 rounded"
        width={100}
        height={100}
      />
      <div>
        <div className="text-[#68749C] font-[600] text-[14px] mb-1">
          Description:
        </div>
        <div className="text-[#fff] font-[500] text-[14px] mb-5 overflow-scroll">
          {nft.description}
        </div>

        <div className="text-[#68749C] font-[600] text-[14px] mb-1">
          Token ID:
        </div>
        <div className="text-[#fff] font-[500] text-[14px] mb-5">
          {nft.token_id}
        </div>

        <div className="text-[#68749C] font-[600] text-[14px] mb-1">
          Contract Address:
        </div>
        <div className="text-[#fff] font-[500] text-[14px]">
          {nft.asset_contract?.address}
        </div>
      </div>
    </div>
  </div>
);
export default NFTItem;
