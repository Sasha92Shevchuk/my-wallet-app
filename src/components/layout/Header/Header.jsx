import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import { connectWallet } from "../../../helpers/api";
import {
  ConnectButton,
  HeaderBox,
  InfoContainer,
  PageLink,
} from "./Header.styled";
import { useConnectWallet } from "../../../hooks/useConnectWallet";
// import { useProviderAndSigner } from "../../../hooks/useProviderAndSigner";

export const Header = () => {
  const { isConnecting, connectWallet } = useConnectWallet();
  const [address, setAddress] = useState(
    localStorage.getItem("connectedAddress")
  );
  const [amountToken, setAmountToken] = useState("");

  // const { createProviderAndSigner } = useProviderAndSigner();

  useEffect(() => {
    const loadWalletData = async () => {
      try {
        // const storedConnectedAddress = localStorage.getItem("connectedAddress");
        if (address) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const bal = await provider.getSigner().getBalance();
          const balanceInEther = ethers.utils.formatEther(bal);
          const roundedBalance = parseFloat(balanceInEther).toFixed(6);
          setAmountToken(roundedBalance);
        }
      } catch (error) {
        console.error("Error loading wallet data:", error);
      }
    };

    loadWalletData();

    // const loadWalletData = async () => {
    //   try {
    //     const storedConnectedAddress = localStorage.getItem("connectedAddress");
    //     if (storedConnectedAddress) {
    //       await createProviderAndSigner();
    //        await connectWallet();

    //     }
    //   } catch (error) {
    //     console.error("Error loading wallet data:", error);
    //   }
    // };

    // loadWalletData();
  }, [address]);

  const handleConnectWallet = async () => {
    const { address, balance } = await connectWallet();
    setAmountToken(balance);
    setAddress(address);
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
      {!address && !amountToken ? (
        <ConnectButton
          type="button"
          onClick={handleConnectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect wallet"}{" "}
        </ConnectButton>
      ) : (
        <InfoContainer>
          {amountToken && <p>{amountToken}</p>}
          {address && <p>{shortenAddress(address)}</p>}
        </InfoContainer>
      )}
    </HeaderBox>
  );
};
