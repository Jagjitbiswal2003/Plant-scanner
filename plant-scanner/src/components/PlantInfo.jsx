import React from 'react';

const PlantInfo = ({ plantData, loading }) => {
  if (loading) {
    return (
      <div className="info-container">
        <div className="loading">Identifying plant... 🌿</div>
      </div>
    );
  }

  if (!plantData) return null;

  return (
    <div className="info-container">
      <h2>Identification Results</h2>
      <div className="plant-card">
        <h3>{plantData.plant_name}</h3>
        <p className="confidence">
          Confidence: {(plantData.probability * 100).toFixed(1)}%
        </p>
        
        {plantData.plant_details && (
          <>
            {plantData.plant_details.common_names && (
              <p>
                <strong>Common names:</strong>{' '}
                {plantData.plant_details.common_names.join(', ')}
              </p>
            )}
            
            {plantData.plant_details.description && (
              <div className="description">
                <strong>Description:</strong>
                <p>{plantData.plant_details.description.value}</p>
              </div>
            )}
            
            {plantData.plant_details.url && (
              <p>
                <strong>More info:</strong>{' '}
                <a
                  href={plantData.plant_details.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlantInfo;