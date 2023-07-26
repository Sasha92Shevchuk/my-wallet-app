import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import { connectWallet } from "../../../helpers/api";
import { Link } from "react-router-dom";
import { IoMdHelpCircleOutline } from "react-icons/io";
import {
  BlockWallet,
  ConnectButton,
  HeaderBox,
  InfoContainer,
  InfoLink,
} from "./Header.styled";
import { useConnectWallet } from "../../../hooks/useConnectWallet";
import { Logo } from "../../Logo/Logo";
import { LoaderWallet } from "../../Loader/Loader";
//import { useTransferToken } from "../../../hooks/useTransferToken";
// import { useProviderAndSigner } from "../../../hooks/useProviderAndSigner";

export const Header = () => {
  const { isConnecting, connectWallet } = useConnectWallet();
  const [address, setAddress] = useState(
    localStorage.getItem("connectedAddress")
  );
  const [amountToken, setAmountToken] = useState("");
  console.log("Header ~ amountToken:", amountToken);
  // const { amountFinally } = useTransferToken();
  // console.log(amountFinally); // була ідея після виконання трансферу виконати запит за балансом та передати нове значення
  // в хуку useTransferToken дописав код
  // const { createProviderAndSigner } = useProviderAndSigner();

  useEffect(() => {
    // Функція, яка отримує і оновлює баланс
    const fetchBalance = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bal = await provider.getSigner().getBalance();
        const balanceInEther = ethers.utils.formatEther(bal);
        const roundedBalance = parseFloat(balanceInEther).toFixed(6);
        if (address) {
          setAmountToken(roundedBalance);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    // Викликаємо функцію при монтуванні компоненти

    fetchBalance();

    // Підписуємося на подію зміни балансу, щоб оновлювати значення у реальному часі
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.on("block", fetchBalance);

    return () => {
      provider.off("block", fetchBalance);
    };
  }, []);

  useEffect(() => {
    const loadWalletData = async () => {
      try {
        // const storedConnectedAddress = localStorage.getItem("connectedAddress");
        if (address) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const balance = await provider.getSigner().getBalance();
          const balanceInEther = ethers.utils.formatEther(balance);
          const roundedBalance = parseFloat(balanceInEther).toFixed(6);
          setAmountToken(roundedBalance);
        }
      } catch (error) {
        console.error("Error loading wallet data:", error);
      }
    };

    loadWalletData();
  }, [address]);

  const handleConnectWallet = async () => {
    const { address, balance } = await connectWallet();
    setAmountToken(balance);
    setAddress(address);
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
      <Link to="/">
        <Logo />
      </Link>
      <BlockWallet>
        <InfoLink to="info">
          <IoMdHelpCircleOutline size={50} />
        </InfoLink>
        {!address && !amountToken ? (
          <ConnectButton
            type="button"
            onClick={handleConnectWallet}
            disabled={isConnecting}
          >
            {isConnecting ? <LoaderWallet /> : "Connect wallet"}
          </ConnectButton>
        ) : (
          <InfoContainer>
            {amountToken && <p>{amountToken}</p>}
            {address && <p>{shortenAddress(address)}</p>}
          </InfoContainer>
        )}
      </BlockWallet>
    </HeaderBox>
  );
};
