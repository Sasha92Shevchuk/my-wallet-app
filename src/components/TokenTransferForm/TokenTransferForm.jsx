import { useState } from "react";
// import { ethers } from "ethers";
import { Form, Label } from "./TokenTransferForm.styled";
import { transferToken } from "../../helpers/api";

export const TokenTransferForm = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  // Адреса отримувача токенів
  // const recipientAddress = "RECIPIENT_ADDRESS"; // from state
  // Кількість токенів, які потрібно відправити
  //utils.parseEther() // - в доках назва така!!!!!!!!!!!!! було utils.parseUnits
  // const tokenAmountToNumber = ethers.utils.parseEther(tokenAmount);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    //const tokenAmountToNumber = ethers.utils.parseEther(tokenAmount);
    transferToken(recipientAddress, tokenAmount);

    console.log(
      "Відправити",
      tokenAmount,
      "токенів на адресу",
      recipientAddress
    );

    // Очищення полів після відправки
    setRecipientAddress("");
    setTokenAmount("");
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Label>
          Recipient Address
          <input
            type="text"
            name="address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            required
          />
        </Label>
        <Label>
          Token Amount
          <input
            type="text"
            name="tokenAmount"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            required
          />
        </Label>
        <button type="submit">Button</button>
      </Form>
    </>
  );
};
