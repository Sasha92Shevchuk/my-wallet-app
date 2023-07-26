import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useProviderAndSigner } from "./useProviderAndSigner";

export const useTransferToken = () => {
  const [isTransactionPending, setTransactionPending] = useState(false);
  const { provider, signer, createProviderAndSigner } = useProviderAndSigner();

  const transferToken = async (recipientAddress, tokenAmount) => {
    if (!signer || !provider) {
      try {
        await createProviderAndSigner();
      } catch (error) {
        throw new Error("No wallet found");
      }
    }

    try {
      setTransactionPending(true);
      const tokenAmountToNumber = ethers.utils.parseEther(tokenAmount);
      const transaction = await signer.sendTransaction({
        to: recipientAddress,
        value: tokenAmountToNumber,
      });

      const receipt = await transaction.wait();

      if (receipt.status === 1) {
        toast.success(
          ` Token transfer successfully completed, sent: ${tokenAmount}`
        );
      } else {
        toast.error("Transaction failed!");
      }
    } catch (error) {
      if (error.code === "ACTION_REJECTED") {
        toast.error("not verified by user");
      }
      toast.error("Error during token transfer");
    } finally {
      setTransactionPending(false);
    }
  };

  return {
    transferToken,
    isTransactionPending,
  };
};
