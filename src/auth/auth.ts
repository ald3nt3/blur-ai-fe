const clientId = "1n4TenO3vILIXM233CSoxCmbhRF41DCE";
const authorizationEndpoint = "https://dev-bn3hssykxatwc54p.us.auth0.com";
const tokenEndpoint = "https://TWOJ_DOSTAWCA/oauth2/v1/token";
const redirectUri = "http://localhost:5173/callback";

function generateRandomString(length: number) {
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  return Array.from(array, (dec) => ("0" + dec.toString(16)).slice(-2)).join("");
}

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export const login = async () => {
  const state = generateRandomString(16);
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await sha256(codeVerifier);

  localStorage.setItem("pkce_state", state);
  localStorage.setItem("pkce_verifier", codeVerifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "openid profile email",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  window.location.href = `${authorizationEndpoint}?${params.toString()}`;
};

export const handleCallback = async () => {
  const params = new URLSearchParams(window.location.search);

  const code = params.get("code");
  const state = params.get("state");

  const storedState = localStorage.getItem("pkce_state");
  const verifier = localStorage.getItem("pkce_verifier");

  if (!code || !state || state !== storedState || !verifier) {
    throw new Error("Invalid callback params");
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  });

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const tokens = await response.json();

  localStorage.setItem("access_token", tokens.access_token);
  localStorage.setItem("id_token", tokens.id_token);
};
