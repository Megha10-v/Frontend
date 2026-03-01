import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SSidebar from "./SuperAdminSideBar";
import AdminNav from "./SuperAdminNav";
import Loader from "../Loader";
import "../../styles/admin/SalesUserView.css";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

function SuperAdminSalesUserView() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("ads"); 
    const [user, setUser] = useState(null);
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    const [imageIndex, setImageIndex] = useState({});
    const navigate = useNavigate();

    const handleEdit = (adId) => {
        navigate(`/admin/edit-ad/${adId}`);
    };
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/get-sales-user-by-id?id=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "elk_authorization_token"
                        )}`,
                    },
                }
            );
            setUser(response.data.user);
            setAds(response.data.user.referred_ads || []);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    };

    /* ================= IMAGE SLIDER ================= */

    const nextImage = (adId, total) => {
        setImageIndex((prev) => ({
            ...prev,
            [adId]: ((prev[adId] || 0) + 1) % total,
        }));
    };

    const prevImage = (adId, total) => {
        setImageIndex((prev) => ({
            ...prev,
            [adId]: ((prev[adId] || 0) - 1 + total) % total,
        }));
    };

    return (
        <>
            <SSidebar />
            <AdminNav />

            <div className="homeadmin">
                {loading ? (
                    <Loader />
                ) : user ? (
                    <>
                        {/* ================= USER PROFILE CARD ================= */}

                        <div className="sales-user-card">
                            <div className="profile-header">
                                <div className="avatar">
                                    {user.profile ? (
                                        <img src={user.profile} alt="Profile" />
                                    ) : (
                                        <div className="avatar-fallback">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                <div className="profile-info">
                                    <h2>{user.name}</h2>
                                    <p className="user-id">
                                        User ID: {user.user_id}
                                    </p>

                                    <div className="status-badges">
                                        <span
                                            className={`badge ${
                                                user.block_status
                                                    ? "blocked"
                                                    : "unblocked"
                                            }`}
                                        >
                                            {user.block_status
                                                ? "Blocked"
                                                : "Active"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="details-grid">
                                <div>
                                    <label>Email</label>
                                    <p>{user.email ?? "-"}</p>
                                </div>

                                <div>
                                    <label>Phone</label>
                                    <p>{user.mobile_number ?? "-"}</p>
                                </div>

                                <div>
                                    <label>Created At</label>
                                    <p>
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <label>Last Updated</label>
                                    <p>
                                        {new Date(
                                            user.updatedAt
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <label>Total Ads</label>
                                    <p>{ads.length}</p>
                                </div>

                                <div>
                                    <label>Total Users</label>
                                    <p>{user.referred_users.length}</p>
                                </div>
                            </div>
                        </div>
                        {/* ================= TAB BAR ================= */}

                        <div className="tab-bar">
                            <button
                                className={`tab-btn ${activeTab === "ads" ? "active" : ""}`}
                                onClick={() => setActiveTab("ads")}
                            >
                                Referred Ads ({ads.length})
                            </button>

                            <button
                                className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
                                onClick={() => setActiveTab("users")}
                            >
                                Referred Users ({user.referred_users.length})
                            </button>
                        </div>
                        {/* ================= ADS SECTION ================= */}

                        {activeTab === "ads" && (
                            <div className="ads-section">
                                {ads.length === 0 ? (
                                    <div className="no-ads-container">
                                        <div className="no-ads-card">
                                            <div className="no-ads-icon">📦</div>
                                            <h4>No Ads Found</h4>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="ads-grid">
                                        {ads.map((ad) => {
                                            const images = (ad.ad_images || []).filter(img => img.image !== null);                                            
                                            const currentImage =
                                                images.length > 0
                                                    ? images[imageIndex[ad.id] || 0]?.image
                                                    : null;

                                            return (
                                                <div className="ad-card" key={ad.id}>
                                                    <div className="image-slider">
                                                        {currentImage ? (
                                                            <>
                                                                <img src={currentImage} alt="Ad" />

                                                                {images.length > 1 && (
                                                                    <div className="slider-buttons">
                                                                        <button
                                                                            onClick={() =>
                                                                                prevImage(ad.id, images.length)
                                                                            }
                                                                        >
                                                                            ‹
                                                                        </button>

                                                                        <button
                                                                            onClick={() =>
                                                                                nextImage(ad.id, images.length)
                                                                            }
                                                                        >
                                                                            ›
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <div className="no-image">No Image</div>
                                                        )}
                                                    </div>

                                                    <div className="ad-content">
                                                        <h4>{ad.title}</h4>

                                                        <p className="ad-description">
                                                            {ad.description}
                                                        </p>

                                                        <div className="price-slider">
                                                            {ad.ad_price_details &&
                                                            ad.ad_price_details.length > 0
                                                                ? ad.ad_price_details
                                                                    .map(
                                                                        (p) =>
                                                                            `₹${p.rent_price}/${p.rent_duration}`
                                                                    )
                                                                    .join(", ")
                                                                : "N/A"}
                                                        </div>

                                                        <div className="ad-actions">
                                                            <button
                                                                className="edit-btn"
                                                                onClick={() => handleEdit(ad.id)}
                                                            >
                                                                <MdEdit size={18} /> Edit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ================= USERS SECTION ================= */}
                        
                        {activeTab === "users" && (
                            <div className="users-section">
                                {user.referred_users.length === 0 ? (
                                    <div className="no-ads-container">
                                        <div className="no-ads-card">
                                            <div className="no-ads-icon">👤</div>
                                            <h4>No Users Found</h4>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="users-grid">
                                        {user.referred_users.map((u) => (
                                            <div className="user-card-modern" key={u.id}>
                                                <div className="user-card-header">
                                                    <div className="user-avatar">
                                                        {u.profile ? (
                                                            <img src={u.profile} alt="User" />
                                                        ) : (
                                                            <div className="avatar-fallback">
                                                                {u.name?.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="user-main-info">
                                                        <h3>{u.name}</h3>
                                                        <span className="user-id">
                                                            ID: {u.user_id}
                                                        </span>
                                                    </div>

                                                    <span
                                                        className={`user-status ${
                                                            u.block_status ? "blocked" : "active"
                                                        }`}
                                                    >
                                                        {u.block_status ? "Blocked" : "Active"}
                                                    </span>
                                                </div>

                                                <div className="user-card-body">
                                                    <div className="info-row">
                                                        <span>Email</span>
                                                        <p>{u.email ?? "-"}</p>
                                                    </div>

                                                    <div className="info-row">
                                                        <span>Phone</span>
                                                        <p>{u.mobile_number ?? "-"}</p>
                                                    </div>

                                                    <div className="info-row">
                                                        <span>Joined</span>
                                                        <p>
                                                            {new Date(
                                                                u.createdAt
                                                            ).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <p>User not found</p>
                )}
            </div>
        </>
    );
}

export default SuperAdminSalesUserView;