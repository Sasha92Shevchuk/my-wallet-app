import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
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
import { roundedBalance } from "../../../helpers/api";

export const Header = () => {
  const { isConnecting, connectWallet } = useConnectWallet();
  const [address, setAddress] = useState(
    localStorage.getItem("connectedAddress")
  );
  const [amountToken, setAmountToken] = useState("");

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    const fetchBalance = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = roundedBalance(await provider.getSigner().getBalance());
        if (address) {
          setAmountToken(balance);
        }
      } catch (error) {
        toast.error("Error fetching balance:", error);
      }
    };

    fetchBalance();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.on("block", fetchBalance);

    return () => {
      provider.off("block", fetchBalance);
    };
  }, [address, amountToken]);

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
