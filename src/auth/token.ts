import { authDomain, clientId, redirectUri } from "../config/authConfig";

export const isTokenExpired = (token: string) => {
  // Decode the token to extract the expiration time
  const payload = JSON.parse(atob(token.split(".")[1]));
  const exp = payload.exp; // Token expiration time (in seconds)
  return exp * 1000 < Date.now(); // Compare expiration time with current time
};

export const exchangeCodeForToken = async (code: string): Promise<void> => {
  // Retrieve the code_verifier from localStorage
  const codeVerifier = localStorage.getItem("code_verifier");
  if (!codeVerifier) {
    throw new Error("No code_verifier found");
  }

  // Step 3: Exchange the authorization code for an access token
  const tokenUrl = `${authDomain}/oauth/token`;

  const tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: clientId,
      code: code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  const tokenData = await tokenResponse.json();
  if (tokenData.error) return;
  localStorage.setItem("access_token", tokenData.access_token);
  localStorage.setItem("id_token", tokenData.id_token);
};
