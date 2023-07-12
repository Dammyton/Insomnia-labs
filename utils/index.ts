// Format a number by adding commas to it.
export const formatNumber = (number: string | number) =>
  number?.toLocaleString();

/**
 *    This function takes a walletAddress as a parameter and
 *    returns a formatted version of the address with some of the characters hidden.
 *  */

export const formatWallet = (walletAddress: string) => {
  // Create an empty array to store the modified characters of the walletAddress.
  let hideNum = [];
  // Loop through each character of the walletAddress, checking for a valid length of the address.
  for (let i = 0; i < walletAddress?.length; i++) {
    // If the current index is between 4 and 11, push an asterisk to the hideNum array.
    if (i > 4 && i < 11) {
      hideNum.push("*");
    } else {
      // Otherwise, push the current character to the hideNum array.
      hideNum.push(walletAddress[i]);
    }
  }
  // Return the first 15 characters of the modified walletAddress, with the asterisks and original characters combined, as a string.
  return hideNum.slice(0, 15).join("");
};
