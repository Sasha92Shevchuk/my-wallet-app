import { useState } from "react";
import { ethers } from "ethers";
import { useProviderAndSigner } from "./useProviderAndSigner";

export const useTransferToken = () => {
  const [isTransactionPending, setTransactionPending] = useState(false);
  //const [amountAfterTransfer, setAmountAfterTransfer] = useState(null);
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
      const prevBalance = await signer.getBalance();
      const balanceInEther = ethers.utils.formatEther(prevBalance);
      const roundedAmount = parseFloat(balanceInEther).toFixed(6);
      console.log("кількість токенів перед відправкою", roundedAmount);

      const receipt = await transaction.wait();
      // код за запитом на отримання балансу
      // const AfterTrBalance = await signer.getBalance();
      // const balanceFormat = ethers.utils.formatEther(AfterTrBalance);
      // const amountFinally = parseFloat(balanceFormat).toFixed(6);
      // setAmountAfterTransfer(amountFinally);
      // console.log("кількість токенів після відправки", amountFinally);

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

  return {
    transferToken,
    isTransactionPending,
    //amountAfterTransfer
  };
};
