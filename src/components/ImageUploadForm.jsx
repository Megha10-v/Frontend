import React, { useState } from "react";
import "./ImageUploadForm.css"; // Import CSS file for styling

export default function ImageUploadForm({ onSubmit, onClose }) {
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevPreviews) => [...prevPreviews, ...previews]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const handleUpload = (event) => {
    event.preventDefault();
    if (images.length === 0) {
      alert("Please select images first.");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => formData.append("files", image));

    onSubmit(formData);
    setImages([]);
    setPreviewUrls([]);
  };

  return (
    <form className="image-upload-form" onSubmit={handleUpload}>
      <div className="form-group">
        <label htmlFor="imageUpload">Upload Images</label>
        <input type="file" id="imageUpload" multiple onChange={handleImageChange} />
      </div>

      {/* Image Preview Section */}
      <div className="image-preview">
        {previewUrls.map((url, index) => (
          <div key={index} className="preview-container">
            <img src={url} alt={`Preview ${index + 1}`} className="preview-image" />
            <button type="button" className="remove-btn" onClick={() => handleRemoveImage(index)}>
              ✖
            </button>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Back</button>
        <button type="submit" className="btn-submit">Upload</button>
      </div>
    </form>
  );
}

