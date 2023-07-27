import { useState } from "react";
import { Form, Label, Submit } from "./TokenTransferForm.styled";
import { useTransferToken } from "../../hooks/useTransferToken";
import { LoaderBtn } from "../Loader/Loader";
import {
  isValidEthereumAddress,
  isValidTransferAmount,
} from "../../helpers/api";
import { toast } from "react-toastify";

export const TokenTransferForm = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  const { transferToken, isTransactionPending } = useTransferToken();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEthereumAddress(recipientAddress)) {
      toast.warning("Invalid Ethereum address format");
      return;
    }

    if (!isValidTransferAmount(tokenAmount)) {
      toast.warning("Invalid transfer amount");
      return;
    }
    await transferToken(recipientAddress, tokenAmount);
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
        <Submit type="submit" disabled={isTransactionPending}>
          {isTransactionPending ? <LoaderBtn /> : "Submit"}
        </Submit>
      </Form>
    </>
  );
};
