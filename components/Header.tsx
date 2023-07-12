import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#191C22] py-4">
      <nav className="container px-5 mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          WalletHub
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white lg:block hidden">
            Home
          </Link>{" "}
          <Link href="/nft" className="text-white">
            NFT List
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
