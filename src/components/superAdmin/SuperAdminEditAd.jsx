import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SSidebar from "./SuperAdminSideBar";
import AdminNav from "./SuperAdminNav";
import Loader from "../Loader";
import "../../styles/admin/EditAd.css";
import { IoCloseCircleOutline } from "react-icons/io5";

function SuperAdminEditAd() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updating, setUpdating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ad, setAd] = useState(null);
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        fetchAd();
    }, []);

    const fetchAd = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/api/get-ad-by-id?id=${id}`,
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                    "elk_authorization_token"
                    )}`,
                },
            });

            const adData = response.data.ad;
            const convertedPrices =
                adData.ad_price_details?.map((price) => ({
                id: price.id,
                category: "duration",
                unit: price.rent_duration || "",
                price: price.rent_price || "",
            })) || [];

            setAd({
                ...adData,
                ad_price_details: convertedPrices || [],
            });
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    // ================= BASIC FIELD CHANGE =================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAd({ ...ad, [name]: value });
    };

    // ================= PRICE HANDLING =================
    const handlePriceChange = (index, field, value) => {
        const updated = [...ad.ad_price_details];
        updated[index][field] = value;
        setAd({ ...ad, ad_price_details: updated });
    };

    const addNewPrice = () => {
        setAd({
        ...ad,
        ad_price_details: [
            ...ad.ad_price_details,
            { category: "", unit: "", price: "" },
        ],
        });
    };

    const removePrice = (index) => {
        const updated = [...ad.ad_price_details];
        updated.splice(index, 1);
        setAd({ ...ad, ad_price_details: updated });
    };

    // ================= IMAGE HANDLING =================
    const handleImageUpload = (e) => {
        setNewImages([...newImages, ...Array.from(e.target.files)]);
    };

    const handleSave = async () => {
        try {
            setUpdating(true);
            const formData = new FormData();

            formData.append("id", ad.id);
            formData.append("title", ad.title);
            formData.append("description", ad.description);
            formData.append("category", ad.category);

            // 🔥 Send prices as JSON string
            formData.append(
                "ad_price_details",
                JSON.stringify(ad.ad_price_details)
            );

            // 🔥 Append new images
            newImages.forEach((file) => {
                formData.append("ad_images", file);
            });

            await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/api/update-ad`,
                formData,
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                    "elk_authorization_token"
                    )}`,
                    "Content-Type": "multipart/form-data",
                },
                }
            );

            alert("Ad updated successfully");
            navigate(-1);
        } catch (err) {
            console.error(err);
            alert("Update failed");
        } finally {
            setUpdating(false);
        }
    };



    if (loading || !ad) return <Loader />;


    return (
        <>
            <SSidebar />
            <AdminNav />
            {updating && (
                <div className="overlay-loader">
                    <Loader />
                </div>
            )}
            <div className="edit-ad-container">
                <div className="edit-card">

                    <h2>Edit Advertisement</h2>

                    <div className="form-grid">

                    {/* Title */}
                    <div className="form-group full-width">
                        <label>Title</label>
                        <input
                        type="text"
                        name="title"
                        value={ad.title || ""}
                        onChange={handleChange}
                        />
                    </div>

                    {/* Description */}
                    <div className="form-group full-width">
                        <label>Description</label>
                        <textarea
                        name="description"
                        rows="4"
                        value={ad.description || ""}
                        onChange={handleChange}
                        />
                    </div>

                    </div>

                    {/* ================= PRICE SECTION ================= */}
                    <h3 className="section-title">Price Details</h3>

                    {ad.ad_price_details?.map((price, index) => (
                        <div key={index} className="price-box">

                            {/* CATEGORY */}
                            <select
                            value={price.category || ""}
                            onChange={(e) =>
                                handlePriceChange(index, "category", e.target.value)
                            }
                            className="styled-input"
                            >
                            <option value="">Select Category</option>
                            <option value="duration">Duration</option>
                            <option value="size">Size</option>
                            <option value="custom">Custom</option>
                            </select>

                            {/* UNIT FIELD BASED ON CATEGORY */}

                            {price.category === "custom" && (
                            <input
                                type="text"
                                placeholder="Custom Unit"
                                value={price.unit || ""}
                                onChange={(e) =>
                                handlePriceChange(index, "unit", e.target.value)
                                }
                                className="styled-input"
                            />
                            )}

                            {price.category === "size" && (
                            <select
                                value={price.unit || ""}
                                onChange={(e) =>
                                handlePriceChange(index, "unit", e.target.value)
                                }
                                className="styled-input"
                            >
                                <option value="">Select Unit</option>
                                <option value="Inch">Inch</option>
                                <option value="Centimeter">Centimeter</option>
                            </select>
                            )}

                            {price.category === "duration" && (
                            <select
                                value={price.unit || ""}
                                onChange={(e) =>
                                handlePriceChange(index, "unit", e.target.value)
                                }
                                className="styled-input"
                            >
                                <option value="">Select Unit</option>
                                <option value="Hour">Hour</option>
                                <option value="Day">Day</option>
                                <option value="Week">Week</option>
                                <option value="Month">Month</option>
                            </select>
                            )}

                            {/* PRICE */}
                            <input
                            type="number"
                            placeholder="Price"
                            value={price.price || ""}
                            onChange={(e) =>
                                handlePriceChange(index, "price", e.target.value)
                            }
                            className="styled-input"
                            />

                            {/* REMOVE BUTTON */}
                            <IoCloseCircleOutline
                                size={48}
                                color="red"
                                style={{ cursor: "pointer", marginTop: "10px" }}
                                onClick={() => removePrice(index)}
                            />
                        </div>
                    ))}

                    <button className="add-btn" onClick={addNewPrice}>
                        + Add Price
                    </button>

                    {/* ================= EXISTING IMAGES ================= */}
                    <div className="section-title">Existing Images</div>

                    <div className="image-preview-grid">
                    {ad.ad_images?.map((img, index) => (
                        <div key={index} className="image-box">
                        <img src={img.image} alt="Ad" />
                        </div>
                    ))}
                    </div>

                    {/* ================= ADD NEW IMAGES ================= */}
                    <div className="section-title">Add More Images</div>

                    <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    />

                    <div className="new-preview">
                    {newImages.map((file, index) => (
                        <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        />
                    ))}
                    </div>

                    {/* ================= ACTION BUTTONS ================= */}
                    <div className="action-buttons">
                    <button className="cancel-btn" onClick={() => navigate(-1)}>
                        Cancel
                    </button>

                    <button className="save-btn" onClick={handleSave}>
                        Save Changes
                    </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default SuperAdminEditAd;