import React from 'react';

const ImageUpload = ({ onImageSelect, previewUrl }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-area">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <label htmlFor="file-upload" className="upload-label">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="image-preview" />
          ) : (
            <div className="upload-placeholder">
              <span>+</span>
              <p>Click to upload a plant image</p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;