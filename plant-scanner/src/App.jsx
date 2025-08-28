import React, { useState } from 'react';
import axios from 'axios';
import ImageUpload from './components/ImageUpload';
import PlantInfo from './components/PlantInfo';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Plant.id API URL and Key
const PLANT_API_URL = import.meta.env.VITE_PLANT_API_URL;
const PLANT_API_KEY = import.meta.env.VITE_PLANT_API_KEY;

  

  // Handle image selection
  const handleImageSelect = (file) => {
    if (!file) return;
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPlantData(null);
    setError(null);
  };

  // Handle plant identification
  const identifyPlant = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('images[]', selectedImage); 
    formData.append('details', 'common_names,url,description');

    try {
      const response = await axios.post(
        PLANT_API_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Api-Key': PLANT_API_KEY,
          },
        }
      );

      if (response.data.suggestions && response.data.suggestions.length > 0) {
        setPlantData(response.data.suggestions[0]);
      } else {
        setError('No plant identification found. Try a clearer image.');
      }
    } catch (err) {
      setError('Error identifying plant. Please try again.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Plant Scanner 🌿</h1>
        <p>Upload a photo to identify plants</p>
      </header>

      <main className="app-main">
        <ImageUpload 
          onImageSelect={handleImageSelect} 
          previewUrl={previewUrl} 
        />
        
        {previewUrl && (
          <button 
            onClick={identifyPlant} 
            className="identify-btn"
            disabled={loading}
          >
            {loading ? 'Identifying...' : 'Identify Plant'}
          </button>
        )}

        {error && <div className="error-message">{error}</div>}

        <PlantInfo plantData={plantData} loading={loading} />
      </main>

      <footer className="app-footer">
        <p>Created for Anslation Front End Developer Internship</p>
      </footer>
    </div>
  );
}

export default App;
