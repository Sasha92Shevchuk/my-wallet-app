import { ethers } from "ethers";

const checkAndRedirectToInstall = () => {
  if (typeof window.ethereum === "undefined") {
    const result = confirm(
      "Please install MetaMask or any other Ethereum-compatible wallet to connect. Click OK to install MetaMask."
    );
    // if (result) {
    //   const userAgent = navigator.userAgent.toLowerCase();
    //   let storeURL = "";

    //   switch (true) {
    //     case /iphone|ipad|ipod/.test(userAgent):
    //       storeURL =
    //         "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202";
    //       break;
    //     case /android/.test(userAgent):
    //       storeURL =
    //         "https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&pli=1";
    //       break;
    //     case userAgent.indexOf("firefox") !== -1:
    //       storeURL =
    //         "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/";
    //       break;
    //     default:
    //       storeURL =
    //         "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
    //       break;
    //   }

    //   window.location.href = storeURL;
    // }
    if (result) {
      const userAgent = navigator.userAgent.toLocaleLowerCase();
      if (/iphone|ipad|ipod/.test(userAgent)) {
        window.location.href =
          "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202";
      } else if (/android/.test(userAgent)) {
        window.location.href =
          "https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&pli=1";
      } else if (userAgent.indexOf("firefox") !== -1) {
        window.location.href =
          "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/";
      } else {
        window.location.href =
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
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

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const connectedAddress = await signer.getAddress();
    const balance = await signer.getBalance();

    const balanceInEther = ethers.utils.formatEther(balance);
    const roundedBalance = parseFloat(balanceInEther).toFixed(3);

    // const daiAddress = "dai.tokens.ethers.eth";
    // const daiAbi = [
    //   // Some details about the token
    //   "function name() view returns (string)",
    //   "function symbol() view returns (string)",

    //   // Get the account balance
    //   "function balanceOf(address) view returns (uint)",

    //   // Send some of your tokens to someone else
    //   "function transfer(address to, uint amount)",

    //   // An event triggered whenever anyone transfers to someone else
    //   "event Transfer(address indexed from, address indexed to, uint amount)",
    // ];
    // const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);
    // const tokenName = await daiContract.name();
    // console.log("connectWal ~ a:", tokenName);
    // const tokenSymbol = await daiContract.symbol();
    // console.log("connectWal ~ tokenSymbol:", tokenSymbol);
    // const testbalance = await daiContract.balanceOf("ricmoo.firefly.eth");
    // console.log("connectWal ~ testbalance:", testbalance);
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
