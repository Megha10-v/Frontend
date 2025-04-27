import React, { useState } from 'react';
import AppHeader from './AppHeader';
import Footer from './AppFooter';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../App.css'


const ProfilePage = () => {
    const { user, token } = useSelector((state) => state.auth);
    const [isHovered, setIsHovered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDeleteHovered, setIsDeleteHovered] = useState(false);
    const [showWizard, setShowWizard] = useState(false);
    // const [cookies, removeCookie] = useCookies(['elk_authorization_token']);
    const navigate = useNavigate();
    const refreshUserData = () => {
        navigate('/profile');
    };
    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account?");
        if (!confirmed) return;
    
        try {
            setLoading(true)
            const response = await fetch(`http://localhost:3000/api/delete_account?user_id=${user.user_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            const data = await response.json();
    
            if (data.success) {
                alert("Account deleted successfully");
                localStorage.removeItem('elk_authorization_token');
                // removeCookie('elk_authorization_token');
                navigate('/home');
            } else {
                alert(data.message || "Failed to delete account");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting your account");
        } finally{
            setLoading(false)
        }
    };
    
    const buttonStyle = {
        border: '2px solid #4FBBB4',
        borderRadius : '10px',
        padding: '10px',
        color: isHovered ? '#FFFFFF' : '#4FBBB4',
        backgroundColor: isHovered ? '#4FBBB4' : 'transparent',
        transition: 'background-color 0.3s, color 0.3s',
        margin: '10px'
    };
    const deleteButtonStyle = {
        border: '2px solid red',
        borderRadius : '10px',
        padding: '10px',
        color: isDeleteHovered ? '#FFFFFF' : 'red',
        backgroundColor: isDeleteHovered ? 'red' : 'transparent',
        transition: 'background-color 0.3s, color 0.3s',
        margin: '10px'
    };
    return (
        <>
            <AppHeader />
            <main className="container py-4" style={{ minHeight: '70vh' }}>
                {(
                    loading?<Loader/>:
                    user?
                    <div className="container py-4">
                        <div className="d-flex align-items-center border-bottom pb-4 mb-4">
                            <img 
                                src={user.profile ?? 'https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'} 
                                alt="Profile" 
                                className="rounded-circle border border-primary shadow" 
                                height="100"
                                width="100"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="ms-3">
                                <h2 className="h4 mb-1">{user.name}</h2>
                                <p className="text-muted mb-0">{user.description}</p>
                                <p className="text-muted mb-0">{user.email}</p>
                                <p className="text-muted mb-0">{user.mobile_number}</p>
                            </div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <button style={buttonStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => setShowWizard(true)}>Edit Profile</button>
                            <button style={deleteButtonStyle} onMouseEnter={() => setIsDeleteHovered(true)} onMouseLeave={() => setIsDeleteHovered(false)} onClick={handleDelete}>Delete Accoumt</button>
                        </div>
                    </div>:<></>
                )}
            </main>
            <Footer />
            {showWizard && (
                <EditProfile
                    user={user}
                    onClose={() => setShowWizard(false)}
                    onProfileUpdated={refreshUserData}
                    token = {token}
                    show={showWizard}
                />
            )}
        </>
    );
};

export default ProfilePage;
