export default async function CheckBlur(file: File) {
  console.log("Uploading file...");
  const url =
    "https://detect-image-blur-function-app.azurewebsites.net/api/test_blur?code=" + import.meta.env.VITE_API_CODE;

  const formData = new FormData();
  formData.append("file", file, file.name);
  
  const data = await fetch(url, {
    method: "POST",
    body: formData,
  }).then(async (response) => {
    const json = await response.json();
    console.log(json);
    return json;
  });
}
