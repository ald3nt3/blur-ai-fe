export default async function CheckBlur(file: File) {
  console.log("Uploading file...");
  const url =
    "https://detect-image-blur-function-app.azurewebsites.net/api/test_blur?code=dlA3F4KxGNUkFUhwq2xVqu5LXmdUtc9uj2LEFQBCXPuJAzFueaY_0g==";

  const formData = new FormData();
  formData.append("file", file, file.name);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    mode: 'no-cors', // for development
  })
    .then((res) => {
      console.log(res.json());
    })
    .catch((err) => {
      console.log(err);
    });
}
