import { ethers } from "ethers";

let provider = null;
let signer = null;
let tokenContractAddress = "";

const metaMaskLinks = {
  chrome:
    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/",
  ios: "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202",
  android:
    "https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&pli=1",
};

export const createProviderAndSigner = async () => {
  if (!provider || !signer) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }
};

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

export const connectWallet = async () => {
  const isExtensionAvailable = checkAndRedirectToInstall();
  if (!isExtensionAvailable) {
    return;
  }
  await createProviderAndSigner();
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const connectedAddress = await signer.getAddress();
    tokenContractAddress = connectedAddress;
    const balance = await signer.getBalance();
    const balanceInEther = ethers.utils.formatEther(balance);
    const roundedBalance = parseFloat(balanceInEther).toFixed(6);

    return {
      address: connectedAddress,
      balance: roundedBalance,
    };
  } catch (error) {
    console.error("Помилка підключення до гаманця:", error);
    return {
      address: "",
      balance: "",
    };
  }
};

export const transferToken = async (recipientAddress, tokenAmount) => {
  if (!signer || !provider) {
    try {
      await createProviderAndSigner();
    } catch (error) {
      throw Error("No wallet found");
    }
  }

  try {
    // Send Ether
    const tokenAmountToNumber = ethers.utils.parseEther(tokenAmount);
    const transaction = await signer.sendTransaction({
      to: recipientAddress,
      value: tokenAmountToNumber,
    });
    // Wait transaction
    transaction.on("pending", () => {
      console.log(`Транзакція триває, режим пендінг `);
    });
    const receipt = await transaction.wait();

    if (receipt.status === 1) {
      console.log("transfer from ", tokenContractAddress);
      console.log("transfer to", recipientAddress);
      console.log("amount token to transfer", tokenAmount);
      console.log("Трансфер токенів успішно виконано!");
      console.log(transaction);
    } else {
      console.log("Транзакція неуспішна!");
    }
  } catch (error) {
    if (error.code === "ACTION_REJECTED") {
      console.log("не підтверджено користувачем");
    }
    console.error("Помилка при виконанні трансферу токенів:", error);
  }
};
