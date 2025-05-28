import React, { useState, useEffect } from 'react';
import PriceDetailsForm from './PriceDetailsForm';
import './OfferForm.css';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from 'react-redux';

export default function OfferForm({ selectedItem, onBack, onSubmit }) {
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceDetailsList, setPriceDetailsList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); 
  // const userId = localStorage.getItem('elk_user_id');
  const { user } = useSelector((state) => state.auth);
  const userId = user?.user_id;

  const [privacy, setPrivacy] = useState(true);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchPrivacy() {
      const value = await getPrivacy(userId);
      setPrivacy(value);
      setLoading(false);
    }
    fetchPrivacy();
    
  }, [userId]);

  async function getPrivacy(userId) {
    try {
      const userDocRef = doc(db, "privacy", userId);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.privacy;
      } else {
        return true;
      }
    } catch (error) {
      return true;
    }
  }
  async function updatePrivacy(userId, privacy, name) {
    const userDocRef = doc(db, "privacy", userId);
    const docSnap = await getDoc(userDocRef);
  
    const data = {
      privacy: privacy,
      name: name,
      userid: userId.toString(),
    };
  
    if (docSnap.exists()) {
      await updateDoc(userDocRef, data);
    } else {
      await setDoc(userDocRef, data);
    }
    alert('Privacy changed')
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const priceDetailsObject = priceDetailsList.reduce((acc, detail) => {
      acc[detail.unit] = detail.amount;
      return acc;
    }, {});
    
    const formData = {
      ad_type: selectedItem.type,
      category: selectedItem.name,
      title: e.target.title.value,
      description: e.target.description.value,
      ad_prices: priceDetailsObject,
    };

    onSubmit(formData);
  };

  const handleSavePriceDetails = (details) => {
    if (editingIndex !== null) {
      const updatedList = [...priceDetailsList];
      updatedList[editingIndex] = details;
      setPriceDetailsList(updatedList);
    } else {
      setPriceDetailsList([...priceDetailsList, details]);
    }
    setShowPriceModal(false);
    setEditingIndex(null);
  };

  const handleEditPrice = (index) => {
    setEditingIndex(index);
    setShowPriceModal(true);
  };

  const handleDeletePrice = (index) => {
    const updatedList = priceDetailsList.filter((_, i) => i !== index);
    setPriceDetailsList(updatedList);
  };

  return (
    <form className="offer-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" placeholder="Enter a catchy title" required />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" placeholder="Add some details" rows="4" required />
      </div>

      <div className="form-group">
        <label>Price Details</label>
        <button
          type="button"
          className="add-price-btn"
          onClick={() => {
            setEditingIndex(null);
            setShowPriceModal(true);
          }}
        >
          + Add Price Details
        </button>

        <ul className="price-list">
          {priceDetailsList.map((detail, index) => (
            <li key={index} className="price-item">
              <strong>{`₹${detail.amount}`}</strong> per {detail.unit}
              <button type="button" className="edit-price-btn m-2" onClick={() => handleEditPrice(index)}>
                Edit
              </button>
              <button type="button" className="delete-price-btn m-2" onClick={() => handleDeletePrice(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {
        loading?
          <></>:
          privacy?<div style={{fontSize:'16px'}}>Contact details are visible to others. <span onClick={()=>{setPrivacy(!privacy); updatePrivacy(userId, !privacy, user.name)}} style={{color:'blue', cursor:'pointer'}}>Change</span></div>:<div style={{fontSize:'16px'}}>Contact Details are hidden. <span onClick={()=>{setPrivacy(!privacy); updatePrivacy(userId, !privacy, user.name)}} style={{color:'blue', cursor:'pointer'}}>Change</span></div>
      }
      
      
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="btn-next" disabled={priceDetailsList.length === 0} onSubmit={handleSubmit}>
          Next
        </button>
      </div>



      {showPriceModal && (
        <PriceDetailsForm
          initialDetails={editingIndex !== null ? priceDetailsList[editingIndex] : {}}
          onClose={() => {
            setShowPriceModal(false);
            setEditingIndex(null);
          }}
          onSave={handleSavePriceDetails}
        />
      )}
    </form>
  );
}
