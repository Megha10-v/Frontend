// import React, { useState } from "react";
// import "./ImageUploadForm.css"; // Import CSS file for styling

// export default function ImageUploadForm({ onSubmit, onClose, imageData, setImageData  }) {
//   const [images, setImages] = useState([]);
//   const [previewUrls, setPreviewUrls] = useState([]);

//   const handleImageChange = (event) => {
//     const files = Array.from(event.target.files);

//     if (files.length > 0) {
//       setImages((prevImages) => [...prevImages, ...files]);
//       const previews = files.map((file) => URL.createObjectURL(file));
//       setPreviewUrls((prevPreviews) => [...prevPreviews, ...previews]);
//     }
//   };

//   const handleRemoveImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//     setPreviewUrls(previewUrls.filter((_, i) => i !== index));
//   };

//   const handleUpload = (event) => {
//     event.preventDefault();
//     if (images.length === 0) {
//       alert("Please select images first.");
//       return;
//     }

//     const formData = new FormData();
//     images.forEach((image) => formData.append("files", image));

//     onSubmit(formData);
//     setImages([]);
//     setPreviewUrls([]);
//   };

//   return (
//     <form className="image-upload-form" onSubmit={handleUpload}>
//       <div className="form-group">
//         <label htmlFor="imageUpload">Upload Images</label>
//         <input type="file" id="imageUpload" multiple onChange={handleImageChange} />
//       </div>

//       {/* Image Preview Section */}
//       <div className="image-preview">
//         {previewUrls.map((url, index) => (
//           <div key={index} className="preview-container">
//             <img src={url} alt={`Preview ${index + 1}`} className="preview-image" />
//             <button type="button" className="remove-btn" onClick={() => handleRemoveImage(index)}>
//               ✖
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="form-actions">
//         <button type="button" className="btn-cancel" onClick={onClose}>Back</button>
//         <button type="submit" className="btn-submit">Upload</button>
//       </div>
//     </form>
//   );
// }


import React, { useState, useEffect } from "react";
import "./ImageUploadForm.css";

export default function ImageUploadForm({ onSubmit, onClose, imageData, setImageData }) {
  const [images, setImages] = useState([]); 
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    if (imageData && imageData.length > 0) {
      const previews = imageData.map((item) =>
        typeof item === "string" ? item : URL.createObjectURL(item)
      );
      setImages(imageData); 
      setPreviewUrls(previews);
    }
  }, [imageData]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const previews = files.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...files]);
      setPreviewUrls((prev) => [...prev, ...previews]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);

    setImages(updatedImages);
    setPreviewUrls(updatedPreviews);
    setImageData(updatedImages); 
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    images.forEach((item) => {
      if (item instanceof File) {
        formData.append("files", item);
      }
    });

    setImageData(images);
    onSubmit(formData);   
  };

  return (
    <form className="image-upload-form" onSubmit={handleUpload}>
      <div className="form-group">
        <label htmlFor="imageUpload">Upload Images</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>

      <div className="image-preview">
        {previewUrls.map((url, index) => (
          <div key={index} className="preview-container">
            <img src={url} alt={`Preview ${index + 1}`} className="preview-image" />
            <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemoveImage(index)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>
          Back
        </button>
        <button type="submit" className="btn-submit" disabled={images.length === 0}>
          Upload
        </button>
      </div>
    </form>
  );
}
