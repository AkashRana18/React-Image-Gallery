import React, { useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';
import ImageZoom from './ImageZoom';

const unsplash = createApi({
  accessKey: 'k5gw4CLcRXEJ0z2-KOD-8yQHTMvzqDEhUD1YpDWQgbA',
});

function ImageGallery() {
  const [query, setQuery] = useState('nature');
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);


  useEffect(() => {
    unsplash.search
      .getPhotos({
        query,
        page: 1,
        perPage: 20,
        collections: '10558174',
        contentFilter: 'high',
        orderBy: 'relevant',
        orientation: 'portrait',
        fields: ['id', 'alt_description', 'urls.regular', 'user.name', 'likes.total'],
      })
      .then(result => {
        if (result.errors) {
          console.log(result.errors);
        } else {
          setPhotos(result.response.results);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [query]);

  const handleSearch = event => {
    event.preventDefault();
    setQuery(event.target.elements.search.value);
  };
  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handlePhotoClick = photo => {
    setSelectedPhoto(photo);
  };

  const handleCloseViewer = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="image-gallery">
      <form onSubmit={handleSearch}>
        <input 
       type="text" 
       name="search"
       placeholder="Search for photos" 
       value={query}
      onChange={handleInputChange}

        />
        <button type="submit">Search</button>
      </form>
      <div className="image-gallery-grid">
      {photos.map(photo => (
        <div key={photo.id} className="photo-card" onClick={() => handlePhotoClick(photo)}>
          <img src={photo.urls.regular} alt={photo.alt_description} />
          <div className="photo-details">
            <p className="photo-user">{photo.user.name}</p>
            <p className="photo-likes">{photo.likes} likes</p>
          </div>
        </div>
      ))}
      {selectedPhoto && <ImageZoom photo={selectedPhoto} onClose={handleCloseViewer} />}
    
    </div>
    </div>

  );
}

export default ImageGallery;
