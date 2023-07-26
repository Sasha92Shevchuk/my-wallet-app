import { ethers } from "ethers";

export const roundedBalance = (balance) =>
  parseFloat(ethers.utils.formatEther(balance)).toFixed(3);

export const isValidEthereumAddress = (address) => {
  const regex = /^(0x)?[0-9a-fA-F]{40}$/;
  return regex.test(address);
};

export const isValidTransferAmount = (amount) => {
  const parsedAmount = parseFloat(amount);
  return (
    !isNaN(parsedAmount) &&
    parsedAmount >= 0.000001 &&
    parsedAmount <= 100000 &&
    parsedAmount % 10 === 0
  );
};
