// import { useEffect } from "react";
// import { ethers } from "ethers";
// import { connectWallet } from "../../../helpers/api";
import {
  ConnectButton,
  HeaderBox,
  InfoContainer,
  PageLink,
} from "./Header.styled";
import { useConnectWallet } from "../../../hooks/useConnectWallet";

export const Header = () => {
  const { connectedAddress, balance, isConnecting, connectWallet } =
    useConnectWallet();

  // useEffect(() => {
  //   const storedConnectedAddress = localStorage.getItem("connectedAddress");
  //   if (storedConnectedAddress) {
  //     connectWallet();
  //   }
  // }, []);

  const handleConnectWallet = async () => {
    await connectWallet();
  };

  // const handleConnectWallet = async () => {
  //   const { address, balance } = await connectWallet();
  //   setConnectedAddress(address);
  //   setBalance(balance);
  // };

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
        <ConnectButton
          type="button"
          onClick={handleConnectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect wallet"}{" "}
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
