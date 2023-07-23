import { useState } from "react";
import { ethers } from "ethers";
import { useProviderAndSigner } from "./useProviderAndSigner";

const metaMaskLinks = {
  chrome:
    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/",
  ios: "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202",
  android:
    "https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&pli=1",
};

export const useConnectWallet = () => {
  const { provider, signer, createProviderAndSigner } = useProviderAndSigner();
  const [connectedAddress, setConnectedAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const checkAndRedirectToInstall = () => {
    if (typeof window.ethereum === "undefined") {
      const result = confirm(
        "Please install MetaMask or any other Ethereum-compatible wallet to connect. Click OK to install MetaMask."
      );

      if (result) {
        const userAgent = navigator.userAgent.toLocaleLowerCase();
        if (/iphone|ipad|ipod/.test(userAgent)) {
          window.location.href = metaMaskLinks.ios;
        } else if (/android/.test(userAgent)) {
          window.location.href = metaMaskLinks.android;
        } else if (userAgent.indexOf("firefox") !== -1) {
          window.location.href = metaMaskLinks.firefox;
        } else {
          window.location.href = metaMaskLinks.chrome;
        }
      }
      return false;
    }
    return true;
  };
  const getConnectedAddressFromStorage = () => {
    return localStorage.getItem("connectedAddress");
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    const isExtensionAvailable = checkAndRedirectToInstall();
    if (!isExtensionAvailable) {
      setIsConnecting(false);
      return;
    }
    if (!signer || !provider) {
      try {
        await createProviderAndSigner();
      } catch (error) {
        console.error("Error creating provider and signer:", error);
        throw new Error("No wallet found");
      }
    }
    try {
      const storedConnectedAddress = getConnectedAddressFromStorage();
      if (storedConnectedAddress) {
        const balance = await signer.getBalance(storedConnectedAddress);
        setConnectedAddress(storedConnectedAddress);
        setBalance(balance);
        setIsConnecting(false);
        return {
          address: storedConnectedAddress,
          balance,
        };
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const connectedAddress = await signer.getAddress();
      const balance = await signer.getBalance();
      const balanceInEther = ethers.utils.formatEther(balance);
      const roundedBalance = parseFloat(balanceInEther).toFixed(6);

      localStorage.setItem("connectedAddress", connectedAddress);

      setConnectedAddress(connectedAddress);
      setBalance(roundedBalance);
      setIsConnecting(false);

      return {
        address: connectedAddress,
        balance: roundedBalance,
      };
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setIsConnecting(false);
      return {
        address: "",
        balance: "",
      };
    }
  };

  return { connectedAddress, balance, isConnecting, connectWallet };
};
