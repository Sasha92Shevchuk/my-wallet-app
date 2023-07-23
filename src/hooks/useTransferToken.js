import { useState } from "react";
import { ethers } from "ethers";
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
        console.log("transfer from ", recipientAddress);
        console.log("transfer to", recipientAddress);
        console.log("amount token to transfer", tokenAmount);
        console.log("Трансфер токенів успішно виконано!");
        console.log(transaction);
      } else {
        console.log("Транзакція неуспішна!");
      }
    } catch (error) {
      if (error.code === "ACTION_REJECTED") {
        console.log("не підтверджено користувачем");
      }
      console.error("Помилка при виконанні трансферу токенів:", error);
    } finally {
      setTransactionPending(false);
    }
  };

  return { transferToken, isTransactionPending };
};
