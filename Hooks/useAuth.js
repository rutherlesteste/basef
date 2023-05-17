import { useEffect, useState } from "react";
import { getAccount, IAccount } from "../service/auth";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState(null);
  const getAccountHandler = async () => {
    try {
      const account = await getAccount();
      setAccount(account);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAccountHandler();
  }, []);

  return { isLoading, isLoggedIn, account };
};
