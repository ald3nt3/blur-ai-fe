import "./ImageUpload.css";

const checkFileSize = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files !== null && event.target.files.length > 0) {
    const fileSize = event.target.files[0].size;
    const fileSizeMB = fileSize / 1024 ** 2;
    console.log("File size: " + fileSizeMB + " MB");
  }
};

function ImageUpload() {
  return (
    <>
      <label htmlFor="dropzone-file" className="wrapper">
        <div className="stack">
          <svg
            className="icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="text">
            <b>Click to upload</b> or drag and drop
          </p>
          <p className="additional-text">JPG or PNG (MAX. 800x400px)</p>
        </div>
      </label>
      <input
        onChange={checkFileSize}
        id="dropzone-file"
        type="file"
        accept="image/jpg"
      />
    </>
  );
}

export default ImageUpload;
