export const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const charactersLength = characters.length;
  let result = "";
  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % charactersLength;
    result += characters[randomIndex];
  }

  return result;
};

// Function to hash the code_verifier and generate the code_challenge (SHA-256)
export const generateCodeChallenge = async (codeVerifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64Url = btoa(String.fromCharCode(...hashArray))
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, ""); // Remove padding '='
  return base64Url;
};
