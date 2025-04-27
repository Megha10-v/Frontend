import '../styles/admin/HomeAdmin.css';
import { useState, useEffect } from "react";
import axios from "axios";

function AdLOcation({onClose, onSubmit}) {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [location, setLocation] = useState([])
    const [query, setQuery] = useState('');
    const [address, setAddress] = useState({});
    const token = localStorage.getItem('elk_authorization_token');

    useEffect(() => {
        if (selectedLocation) {
            const selected = location.find(loc => loc.name === selectedLocation);
            if (selected) {
                setAddress(selected);
            }
        }
    }, [selectedLocation, location]);

    const fetchAdLocations = async (query) => {
        if(query===''){
            return;
        }
        try {
            const response = await axios.post(`https://api.elkcompany.online/api/place_search`, 
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
    const handleUpload = (event) => {
        event.preventDefault();    
        if(selectedLocation === ""){
            alert('Select a location');
        }else{
            onSubmit(address);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        fetchAdLocations(value);
    };
    return (
        <>
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
                    <button type="button" className="btn-cancel" onClick={onClose}>Back</button>
                    <button type="submit" className="btn-submit">Upload</button>
                </div>
            </form>
        </>
    );
}

export default AdLOcation;


