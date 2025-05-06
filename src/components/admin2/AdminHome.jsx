import Sidebar from "./SideBar";
import '../../styles/admin/HomeAdmin.css';
import { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";
import { Button } from "react-bootstrap";
import Loader from "../Loader";

function AdminHome() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [ads, setAds] = useState([]);
    const [adLocations, setAdLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await fetchAds();
            await fetchAdLocations();
            setLoading(false);
        };
        fetchData();
    }, [selectedDate, selectedLocation]);

    const fetchAdLocations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get-ad-locations`);            
            setAdLocations(["Select","New Delhi", ...response.data.list]);
        } catch (error) {
            console.error("Error fetching ads:", error);
        }
    };

    const fetchAds = async () => {     
        try {
            let query = [];            
            if (selectedDate) query.push(`date=${selectedDate}`);
            if (selectedLocation) query.push(`location=${selectedLocation}`);
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get-admin-ads?${query.join("&")}`);            
            setAds(response.data.ads);
        } catch (error) {
            console.error("Error fetching ads:", error);
        }
    };

    const deleteAd = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
        if (!confirmDelete) return;
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/delete-ad?id=${id}`);
            if (response.data.success) {
                alert("Ad deleted successfully!");
                fetchAds();
            }else{
                alert(response?.data?.message || "Failed to delete ad.");
            }
        } catch (error) {
            console.error("Error deleting ad:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to delete ad.");
        }
    };
    return (
        <>
            <Sidebar />
            <AdminNav />
            <div className="homeadmin">
                <div className="filters">
                    <div className="fields">
                        <div className="label">Select date:</div>
                        <div className="input">
                            <input 
                                type="date" 
                                value={selectedDate} 
                                onChange={(e) => setSelectedDate(e.target.value)}
                                onClick={(e) => e.target.showPicker()} />
                        </div>  
                    </div>
                    <div className="fields">
                        <div className="label">Select Location:</div>
                        <div className="input">
                            <select value={selectedLocation} 
                            onChange={(e) => {
                                if(e.target.value!=='Select'){
                                    setSelectedLocation(e.target.value)
                                }else{
                                    setSelectedLocation('')
                                }
                            }}>
                            {adLocations.map((location, index) => (
                                <option key={index} value={location}>{location}</option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <h4>Total: {ads.length}</h4>
                    </div>
                </div>
                {loading ? <Loader/> : (
                <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>S No:</th>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Location</th>
                                    <th>Price</th>
                                    <th>Images</th>
                                    <th>Posted By</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ads.length > 0 ? (
                                    ads.map((ad,index) => (
                                        <tr key={ad.id}>
                                            <td>{index+1}</td>
                                            <td>{ad.ad_id}</td>
                                            <td>{ad.title}</td>
                                            <td>{ad.category}</td>
                                            <td>{ad.ad_type}</td>
                                            <td>{ad.user?.mobile_number??'-'}</td>
                                            <td>{ad.user?.email??'-'}</td>
                                            <td>{ad.ad_status}</td>
                                            <td>
                                                {ad.ad_location
                                                    ? `${ad.ad_location.place??''}${ad.ad_location.place?',':''} ${ad.ad_location.district}, ${ad.ad_location.state}`
                                                    : "N/A"}
                                            </td>
                                            <td>
                                                {ad.ad_price_details?.[0]?.rent_price
                                                    ? `$${ad.ad_price_details[0].rent_price} / ${ad.ad_price_details[0].rent_duration}`
                                                    : "N/A"}
                                            </td>
                                            <td>
                                                {ad.ad_images?.length > 0 ? (
                                                    <img src={ad.ad_images[0].image} alt="Ad" height="100" />
                                                ) : "No Image"}
                                            </td>
                                            <td>{ad.user?.name || "User"}</td>
                                            <td>{new Date(ad.createdAt).toLocaleDateString()}</td>
                                            <td><Button style={{ backgroundColor: "red", color: "white" }} onClick={() => deleteAd(ad.ad_id)}>Delete</Button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="14" style={{ textAlign: "center" }}>No ads found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                </div>
                )}

            </div>
        </>
    );
}

export default AdminHome;

