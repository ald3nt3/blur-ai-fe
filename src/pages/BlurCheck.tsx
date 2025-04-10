import CheckBlur from "../api/CheckBlur";
import ImageUpload from "../components/ImageUpload";
import "./BlurCheck.css";
import React, { FormEvent } from "react";
import { useState, useCallback } from "react";



function BlurCheck() {
    const [previewUrl, setPreviewUrl] = useState<string>();
    const [selectedFile, setSelectedFile] = useState<File>();
    
    const onFileSelect = useCallback((file: File) => {
        setSelectedFile(file);
        if (file && file.type.startsWith("image/")) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    }, []);
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // TODO: validation
        

        CheckBlur(selectedFile??(new File([], "empty")));
    };

  return (
    <form onSubmit={handleSubmit}>

      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="preview" />
      ) : (
        <div className="preview placeholder">
          Image preview will be displayed here
        </div>
      )}

      <ImageUpload onFileSelect={onFileSelect} />

      <button id="submit" type="submit">
        Check if blurry
      </button>
    </form>
  );
}

export default BlurCheck;
