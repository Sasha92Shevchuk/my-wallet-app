import { useState } from "react";
import { Form, Label } from "./TokenTransferForm.styled";

export const TokenTransferForm = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Тут можна реалізувати логіку відправки токенів
    // Ви можете використовувати Web3.js або інші бібліотеки для взаємодії з Ethereum мережею

    // Приклад виводу в консоль (для демонстраційних цілей)
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
