import { useState, useEffect } from 'react';
import axios from 'axios';
import "./ImageUploadForm.css";
import AdLOcation from './AdLocation';

const CurrentLocationButton = ({ onSubmit, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showSelectLocation, setShowSelectLocation] = useState(false);
  const [location, setLocation] = useState([]);
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState({});
  const token = localStorage.getItem('elk_authorization_token');
  const [payloads, setPayloads] = useState({})
  useEffect(() => {
    if (selectedLocation) {
      const selected = location.find(loc => loc.name === selectedLocation);
      if (selected) {
        setAddress(selected);
      }
    }
  }, [selectedLocation, location]);

  const fetchAdLocations = async (query) => {
    if (query === '') {
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/place_search`,
        {
          query: query,
          limited: false
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allLocations = response.data;
      setLocation(allLocations);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleSelect = (loc) => {
    setSelectedLocation(loc.name);
    setAddress(loc);
    setQuery(loc.name);
    setLocation([]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (selectedLocation === "") {
      alert('Select a location');
    } else {
      onSubmit(address);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchAdLocations(value);
  };

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
          latitude: latitude,
          longitude: longitude
        }
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/get_place`, payload);
          const place = response.data;          
          setLocationName(place.place);
          onSubmit(place);
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
      <div className="image-upload-form">
        <label>Set the location for your Ad</label>
        <br />
        <div className="form-actions">
          <button
            type="button"
            className="btn-submit"
            onClick={() => setShowSelectLocation(true)}
            disabled={loading}
          >
            Select Location Manually
          </button>
          <button
            type="button"
            className="btn-submit"
            onClick={handleGetLocation}
            disabled={loading}
          >
            {loading ? 'Getting location...' : 'Use My Current Location'}
          </button>
        </div>
        {showSelectLocation && (
          <form className="image-upload-form" onSubmit={handleUpload}>
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            {location.length > 0 && (
              <ul className="location-suggestions border rounded bg-white shadow mt-1 max-h-60 overflow-y-auto">
                {location.map((loc, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(loc)}
                  >
                    <strong>{loc.name}</strong>
                  </li>
                ))}
              </ul>
            )}
            <div className="form-actions">
              <button type="submit" className="btn-submit">Set</button>
            </div>
          </form>
        )}
        <button type="button" className="btn-cancel mt-4" onClick={onClose}>Back</button>
        {locationName && (
          <p className="mt-2 text-sm text-gray-600">Location: {locationName}</p>
        )}
      </div>
    </>
  );
};

export default CurrentLocationButton;