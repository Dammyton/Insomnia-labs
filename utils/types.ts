export interface NFT {
  token_id: string;
  name: string;
  description: string;
  image_url: string;
  asset_contract: {
    address: string;
  };
}
