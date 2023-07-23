import { useState } from "react";
import { connectWallet } from "../../../helpers/api";
import {
  ConnectButton,
  HeaderBox,
  InfoContainer,
  PageLink,
} from "./Header.styled";

export const Header = () => {
  const [connectedAddress, setConnectedAddress] = useState("");
  const [balance, setBalance] = useState("");

  const handleConnectWallet = async () => {
    const { address, balance } = await connectWallet();
    setConnectedAddress(address);
    setBalance(balance);
  };

  const shortenAddress = (address) => {
    if (address.length > 9) {
      return address.slice(0, 5) + "..." + address.slice(-4);
    } else {
      return address;
    }
  };
  return (
    <HeaderBox>
      <PageLink to="/">Logo</PageLink>
      {!connectedAddress && !balance ? (
        <ConnectButton type="button" onClick={handleConnectWallet}>
          Connect wallet
        </ConnectButton>
      ) : (
        <InfoContainer>
          {balance && <p>{balance}</p>}
          {connectedAddress && <p>{shortenAddress(connectedAddress)}</p>}
        </InfoContainer>
      )}
    </HeaderBox>
  );
};
