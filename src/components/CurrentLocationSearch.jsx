import { useState } from 'react';
import axios from 'axios';
import "./ImageUploadForm.css";


const CurrentLocationButton = ({ onSubmit, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState('');

  const handleGetLocation = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const payload = {
          latitude : latitude,
          longitude : longitude
        }

        try {
          const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/get_place`, payload);
          const place = response.data;
          setLocationName(place.place);
          onSubmit({place});
        } catch (err) {
          console.error('Error reverse geocoding:', err);
        }

        setLoading(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Failed to get your location');
        setLoading(false);
      }
    );
  };

  return (
     <>
    <form className="image-upload-form" onSubmit={(e) => e.preventDefault()}>
      <label>Set the location for your Ad</label>
      <br />
      <div className="form-actions">
         <button type="button" className="btn-cancel" onClick={onClose}>Back</button>
         <button
          type="button"
          className="btn-submit"
          onClick={handleGetLocation}
          disabled={loading}
        >
          {loading ? 'Getting location...' : 'Use My Current Location'}
        </button>
      </div>
      {locationName && (
        <p className="mt-2 text-sm text-gray-600">Location: {locationName}</p>
      )}
    </form>
  </>
  );
};

export default CurrentLocationButton;