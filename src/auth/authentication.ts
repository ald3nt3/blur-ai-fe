import {
  clientId,
  authDomain,
  redirectUri,
  audience,
} from "../config/authConfig";
import { generateCodeChallenge, generateRandomString } from "./generate";

export const handleLogin = async () => {
  // Step 1: Generate the code_verifier and code_challenge
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Step 2: Redirect to the Auth0 authorization endpoint
  const authUrl =
    `${authDomain}/authorize?` +
    `response_type=code&` +
    `client_id=${encodeURIComponent(clientId)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=openid profile email&` +
    `code_challenge=${encodeURIComponent(codeChallenge)}&` +
    `code_challenge_method=S256&` +
    (audience ? `audience=${encodeURIComponent(audience)}&` : "");

  // Save code_verifier for later to exchange the token
  localStorage.setItem("code_verifier", codeVerifier);

  // Redirect to Auth0 for authentication
  window.location.href = authUrl;
};

export const handleLogout = () => {
  // Clear tokens from localStorage
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
  localStorage.removeItem("code_verifier");

  // Redirect to Auth0 logout endpoint
  const logoutUrl =
    `${authDomain}/v2/logout?` +
    `returnTo=${encodeURIComponent(redirectUri)}&client_id=${encodeURIComponent(
      clientId
    )}`;
  window.location.assign(logoutUrl);
};
