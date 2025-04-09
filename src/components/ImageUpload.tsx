import "./ImageUpload.css";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const sizeMB = (size: number): number => size / 1024 ** 2;

function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div className="wrapper">
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="preview" />
      ) : (
        <div className="preview placeholder">
          Image preview will be displayed here
        </div>
      )}
      <label
        htmlFor="dropzone-file"
        className="upload-field"
        {...getRootProps()}
      >
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
          {file && (
            <>
              <p className="additional-text">Name: {file.name} </p>
              <p className="additional-text">
                Size: {sizeMB(file.size).toFixed(2)} MB
              </p>
            </>
          )}
          <p className="text">
            <b>Click to upload</b> or drag and drop
          </p>
          <p className="additional-text">JPG or PNG (MAX. 800x400px)</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept="image/*"
          {...getInputProps()}
        />
      </label>
    </div>
  );
}

export default ImageUpload;
