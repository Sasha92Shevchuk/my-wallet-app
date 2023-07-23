import { useState } from "react";
// import { ethers } from "ethers";
import { Form, Label } from "./TokenTransferForm.styled";
// import { transferToken } from "../../helpers/api";
import { useTransferToken } from "../../hooks/useTransferToken";

export const TokenTransferForm = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  const { transferToken, isTransactionPending } = useTransferToken();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await transferToken(recipientAddress, tokenAmount);

    console.log(
      "Відправити",
      tokenAmount,
      "токенів на адресу",
      recipientAddress
    );

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
        <button type="submit" disabled={isTransactionPending}>
          {isTransactionPending ? "Transaction Pending..." : "Button"}
        </button>
      </Form>
    </>
  );
};
