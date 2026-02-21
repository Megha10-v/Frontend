import SSidebar from "./SideBar";
import '../../styles/admin/HomeAdmin.css';
import { useState, useEffect } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";
import { Button } from "react-bootstrap";
import Loader from "../Loader";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ChatIcon from '@mui/icons-material/Chat';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function SAdminHome() {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [ads, setAds] = useState([]);
    const [adLocations, setAdLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    const downloadExcel = () => {
        if (ads.length === 0) {
            Swal.fire({
                icon: "warn",
                title: "No ads available to export!",
                confirmButtonColor: "#3085d6",
            });
            return;
        }

        const data = ads.map((ad, index) => ({
            "S No": index + 1,
            "Ad ID": ad.ad_id,
            "Title": ad.title,
            "Category": ad.category,
            "Type": ad.ad_type,
            "Phone": ad.user?.mobile_number ?? "-",
            "Email": ad.user?.email ?? "-",
            "Status": ad.ad_status,
            "Location": ad.ad_location
                ? `${ad.ad_location.place ?? ""}${ad.ad_location.place ? ", " : ""}${ad.ad_location.district}, ${ad.ad_location.state}`
                : "N/A",
            "Price": ad.ad_price_details?.[0]?.rent_price
                ? `₹${ad.ad_price_details[0].rent_price} / ${ad.ad_price_details[0].rent_duration}`
                : "N/A",
            "Posted By": ad.user?.name || "User",
            "Date": new Date(ad.createdAt).toLocaleDateString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Ads");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `elk_ads_report_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    const handleWhatsAppClick = async (phone, message) => {
        if(phone){
            const phoneNumber = phone.replace(/\D/g, "");
            const encodedMessage = encodeURIComponent(message);

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            window.open(whatsappUrl, "_blank");
        } else {
            Swal.fire({
                icon: "warn",
                title: "Phone Number Not Available",
                confirmButtonColor: "#3085d6",
            });
        }
    };
    return (
        <>
            <SSidebar />
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
                    <div>
                        <Button variant="success" onClick={downloadExcel}>
                            Download Excel
                        </Button>
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
                                                    ? `₹${ad.ad_price_details[0].rent_price} / ${ad.ad_price_details[0].rent_duration}`
                                                    : "N/A"}
                                            </td>
                                            <td>
                                                {ad.ad_images?.length > 0 ? (
                                                    <img src={ad.ad_images[0].image} alt="Ad" height="100" />
                                                ) : "No Image"}
                                            </td>
                                            <td>{ad.user?.name || "User"}</td>
                                            <td>{new Date(ad.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <Button style={{ backgroundColor: "red", color: "white" }} onClick={() => deleteAd(ad.ad_id)}>Delete</Button>
                                                <ChatIcon onClick={()=>navigate('/chat',{ state: { userId: ad.user_id, userName: ad.user.name, adName: ad.title, profile: ad.user.profile, message: `Hey ${ad.user.name}! Your ad "${ad.title}" is almost ready to go! Just complete it to make it live.` } })} fontSize="large" sx={{ color: '#4FBBB4', margin: "0 20px", cursor: 'pointer' }}/>
                                                <WhatsAppIcon style={{ color: 'green', fontSize: 30, cursor: 'pointer' }} onClick={()=>handleWhatsAppClick(ad.user?.mobile_number, `Hey ${ad.user.name}! Your ad "${ad.title}" is almost ready to go! Just complete it to make it live.`)}/>
                                            </td>
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

export default SAdminHome;

