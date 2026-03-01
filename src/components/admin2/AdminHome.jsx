import Sidebar from "./SideBar";
import '../../styles/admin/HomeAdmin.css';
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";


function AdminHome() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('elk_authorization_token');
    const [sliderIndex, setSliderIndex] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            await fetchAds();
            setLoading(false);
        };
        fetchData();
    }, []);

    const fetchAds = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/get_sales_ads`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );
            setAds(response.data.data || []);
        } catch (error) {
            console.error("Error fetching ads:", error);
        }
    };
    return (
        <>
            <Sidebar />

            <div className="homeadmin">
                <div className="filters">
                    <div>
                        <h4>Total: {ads.length}</h4>
                    </div>
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="admin-table-container d-none d-md-block">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>S No:</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Type</th>
                                        <th>Location</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Posted By</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {ads.length > 0 ? (
                                        ads.map((ad, index) => (
                                            <tr key={ad.id}>
                                                <td>{index + 1}</td>
                                                <td>{ad.title}</td>
                                                <td>{ad.category}</td>
                                                <td>{ad.ad_type}</td>
                                                <td>
                                                    {ad.ad_location
                                                    ? `${ad.ad_location.place ? ad.ad_location.place + ", " : ""}${ad.ad_location.state ?? ""}`
                                                    : "N/A"}
                                                </td>
                                                <td>
                                                    {ad.ad_price_details && ad.ad_price_details.length > 0
                                                        ? ad.ad_price_details
                                                            .map((p) => `₹${p.rent_price}/${p.rent_duration}`)
                                                            .join(", ")
                                                        : "N/A"}
                                                </td>
                                                <td>
                                                    {ad.ad_images?.length > 0 && (
                                                        <div className="ad-slider">
                                                            <img
                                                                src={ad.ad_images[sliderIndex[ad.id] || 0]?.image}
                                                                alt="Ad"
                                                                className="ad-card-img"
                                                            />

                                                            {ad.ad_images.length > 1 && (
                                                                <>
                                                                    <button
                                                                    className="nav-btn left"
                                                                    onClick={() =>
                                                                        setSliderIndex((prev) => {
                                                                        const current = prev[ad.id] || 0;
                                                                        const newIndex =
                                                                            current === 0 ? ad.ad_images.length - 1 : current - 1;
                                                                        return { ...prev, [ad.id]: newIndex };
                                                                        })
                                                                    }
                                                                    >
                                                                    ‹
                                                                    </button>

                                                                    <button
                                                                    className="nav-btn right"
                                                                    onClick={() =>
                                                                        setSliderIndex((prev) => {
                                                                        const current = prev[ad.id] || 0;
                                                                        const newIndex =
                                                                            current === ad.ad_images.length - 1 ? 0 : current + 1;
                                                                        return { ...prev, [ad.id]: newIndex };
                                                                        })
                                                                    }
                                                                    >
                                                                    ›
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                    {/* {ad.ad_images?.length > 0 ? (
                                                        <img
                                                            src={ad.ad_images[0].image}
                                                            alt="Ad"
                                                            height="60"
                                                        />
                                                    ) : "No Image"} */}
                                                </td>
                                                <td>{ad.user?.name || "User"}</td>
                                                <td>
                                                    {new Date(ad.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="13" style={{ textAlign: "center" }}>
                                                No ads found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* ================= MOBILE CARD VIEW ================= */}
                        <div className="d-block d-md-none">
                            {ads.length > 0 ? (
                                ads.map((ad, index) => (
                                    <div key={ad.id} className="ad-card">
                                        <div className="ad-card-header">
                                            <strong>{index + 1}. {ad.title}</strong>
                                        </div>

                                        <div className="ad-card-body">
                                            {ad.ad_images?.length > 0 && (
                                                <div className="ad-slider">
                                                    <img
                                                    src={ad.ad_images[sliderIndex[ad.id] || 0]?.image}
                                                    alt="Ad"
                                                    className="ad-card-img"
                                                    />

                                                    {ad.ad_images.length > 1 && (
                                                    <>
                                                        <button
                                                        className="nav-btn left"
                                                        onClick={() =>
                                                            setSliderIndex((prev) => {
                                                            const current = prev[ad.id] || 0;
                                                            const newIndex =
                                                                current === 0 ? ad.ad_images.length - 1 : current - 1;
                                                            return { ...prev, [ad.id]: newIndex };
                                                            })
                                                        }
                                                        >
                                                        ‹
                                                        </button>

                                                        <button
                                                        className="nav-btn right"
                                                        onClick={() =>
                                                            setSliderIndex((prev) => {
                                                            const current = prev[ad.id] || 0;
                                                            const newIndex =
                                                                current === ad.ad_images.length - 1 ? 0 : current + 1;
                                                            return { ...prev, [ad.id]: newIndex };
                                                            })
                                                        }
                                                        >
                                                        ›
                                                        </button>
                                                    </>
                                                    )}
                                                </div>
                                            )}
                                            <p><b>Category:</b> {ad.category}</p>
                                            <p><b>Type:</b> {ad.ad_type}</p>
                                            <p>
                                                <b>Location:</b>{" "}
                                                {ad.ad_location
                                                    ? `${ad.ad_location.place ? ad.ad_location.place + ", " : ""}${ad.ad_location.state ?? ""}`
                                                    : "N/A"}
                                            </p>
                                            <p>
                                                <b>Price:</b>{" "}
                                                {ad.ad_price_details && ad.ad_price_details.length > 0
                                                    ? ad.ad_price_details
                                                        .map((p) => `₹${p.rent_price}/${p.rent_duration}`)
                                                        .join(", ")
                                                    : "N/A"}
                                            </p>
                                            <p><b>Posted By:</b> {ad.user?.name}</p>
                                            <p><b>Date:</b> {new Date(ad.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ textAlign: "center" }}>No ads found</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default AdminHome;
