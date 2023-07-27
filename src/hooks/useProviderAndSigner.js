import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

export const useProviderAndSigner = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const createProviderAndSigner = useCallback(async () => {
    if (!provider || !signer) {
      if (!window.ethereum) {
        return;
      }
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      const newSigner = newProvider.getSigner();
      setProvider(newProvider);
      setSigner(newSigner);
    }
  }, [provider, signer]);
  useEffect(() => {
    createProviderAndSigner();
  }, [createProviderAndSigner]);

  return { provider, signer, createProviderAndSigner };
};
