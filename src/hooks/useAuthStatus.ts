import { useEffect, useState } from "react";

import { isTokenExpired } from "../auth/token";
import { exchangeCodeForToken } from "../auth/token";

const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  return token !== null && !isTokenExpired(token); // Check if the token is not expired
};

export const useAuthStatus = () => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

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
  }, []);

  return {
    isAuth,
  };
};
