import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Адреса контракту токена
let tokenContractAddress = "";
// ABI контракту токена (масив)
//let tokenContractABI = []; // Замініть на відповідний ABI вашого контракту токена

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
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
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
  if (!signer || !provider) throw Error("No wallet found");
  console.log(signer, provider);
  try {
    //     // Створюємо екземпляр контракту токена !!!!жпт версія
    //     const tokenContract = new ethers.Contract(
    //       tokenContractAddress,
    //       tokenContractABI,
    //       signer
    //     );

    //     // Викликаємо функцію transfer на контракті токена
    //     const transaction = await tokenContract.transfer(
    //       recipientAddress,
    //       tokenAmount
    //     );

    //     // Очікуємо на підтвердження транзакції
    //     await transaction.wait();

    // моя версія згідно доків
    // Send Ether
    const tokenAmountToNumber = ethers.utils.parseEther(tokenAmount);
    const transaction = await signer.sendTransaction({
      to: recipientAddress,
      value: tokenAmountToNumber,
    });
    // Wait transaction
    await transaction.wait();
    console.log("transfer from ", tokenContractAddress);
    console.log("transfer to", recipientAddress);
    console.log("amount token to transfer", tokenAmount);
    console.log("Трансфер токенів успішно виконано!");

    console.log(transaction);
  } catch (error) {
    console.error("Помилка при виконанні трансферу токенів:", error);
  }
};
