import React from 'react';
import './ImageZoom.css';

function ImageViewer({ photo, onClose }) {
    console.log(photo);
  return (
    <div className="image-viewer">
      <div className="overlay"></div>
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">
          <img src={photo.urls.full} alt={photo.alt_description} />
          <div className="photo-details">
            <p className="photo-user">{photo.user.name}</p>
            <p className="photo-likes">{photo.likes} likes</p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default ImageViewer;
