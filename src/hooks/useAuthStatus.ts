import { useCallback, useEffect, useState } from "react";
import { useToken } from "./useToken";

export const useAuthStatus = () => {
  const { isTokenExpired, exchangeCodeForToken } = useToken();
  const [isAuth, setIsAuth] = useState(false);

  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem("access_token");
    return token !== null && !isTokenExpired(token); // Check if the token is not expired
  }, [isTokenExpired]);

  // On mount, check if redirected back with an authorization code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    setIsAuth(isAuthenticated());
    if (code) {
      console.log(code);
      // If there's an authorization code in the URL, exchange it for tokens
      exchangeCodeForToken(code).then(() => {
        setIsAuth(true);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        ); // Remove code from URL
      });
    }
  }, [isAuthenticated, exchangeCodeForToken]);

  return {
    isAuth,
  };
};
