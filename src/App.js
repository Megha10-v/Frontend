import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/authSlice';
import axios from 'axios'; 
import LoginPage from './components/LoginPage';
import Tabs from './components/Tabs';
import AdminHome from './components/admin2/AdminHome';
import AdminNotificationForm from './components/admin2/AdminNotification';
import ChatScreen from './components/chat';
import MyWishList from './components/WishList';
import AdminAllUsers from './components/admin2/AdminAllUsers';
import ProfilePage from './components/Profile';
import AdCategory from './components/AdCategory';
import cleaning from './assets/ic_cleaning_service.png';
import repairing from './assets/ic_repairing_service.png';
import painting from './assets/ic_painting_service.png';
import plumbing from './assets/ic_plumbing_service.png';
import electricain from './assets/ic_electrician_service.png';
import carpentry from './assets/ic_carpentry_service.png';
import laundry from './assets/ic_laudery_service.png';
import salon from './assets/ic_saloon_service.png';
import car from './assets/home_cate_cars.png';
import property from './assets/home_cate_properties.png';
import electronics from './assets/home_cate_electronics.png';
import tools from './assets/home_cate_tools.png';
import furniture from './assets/home_cate_furniture.png';
import bike from './assets/home_cate_bikes.png';
import clothes from './assets/home_cate_clothes.png';
import helicopter from './assets/home_cate_helicopter.png';
import PostAdForm from './components/PostAd';
import ProtectedRoute from './components/ProtectedRoute';
import Error from './components/Error';
import AdminRoute from './components/AdminRoute';
import LoginRoute from './components/LoginRoute';
import UserProfilePage from './components/UserProfile';
import Careers from './components/Careers';
import Home from './components/Home';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import SearchResult from './components/SearchResult';
function App() {
    const dispatch = useDispatch();
    const serviceCategories = [
        { id: 1, title: 'Cleaning', image: cleaning  },
        { id: 2, title: 'Repairing', image: repairing },
        { id: 3, title: 'Painting', image: painting },
        { id: 4, title: 'Plumbing', image: plumbing },
        { id: 5, title: 'Electrician', image: electricain },
        { id: 6, title: 'Carpentry', image: carpentry },
        { id: 7, title: 'Laundry', image: laundry },
        { id: 8, title: 'Salon', image: salon },
    ];
    const rentalCategories = [
        { id: 1, title: 'Car', image: car },
        { id: 2, title: 'Property', image: property },
        { id: 3, title: 'Electronics', image: electronics },
        { id: 4, title: 'Tools', image: tools },
        { id: 5, title: 'Furniture', image: furniture },
        { id: 6, title: 'Bikes', image: bike },
        { id: 7, title: 'Clothes', image: clothes },
        { id: 8, title: 'Helicopter', image: helicopter },
    ];

    useEffect(() => {
        const token = localStorage.getItem('elk_authorization_token');        
        if (token && token.split('.').length === 3) {
            const fetchUserData = async () => {
                try {
                    const { id: userId } = jwtDecode(token);
                    const response = await axios.post(
                        `${process.env.REACT_APP_API_BASE_URL}/api/get_user?id=${userId}`,
                        {},
                        {
                            headers: { authorization: `Bearer ${token}` }
                        }
                    );
                    const userData = response.data;
                    dispatch(setUser({ user: userData, token, isAdmin: userData.is_admin }));
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                }
            };
            fetchUserData();
        }
    }, [dispatch]); 

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />

                <Route path="/home" element={<Tabs />} />
                <Route path="/login" element={<LoginRoute><LoginPage /></LoginRoute>} />
                <Route path="/post-ad" element={<ProtectedRoute><PostAdForm /></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute><ChatScreen/></ProtectedRoute>}/>
                <Route path="/mywishlist" element={<ProtectedRoute><MyWishList/></ProtectedRoute>}/>
                <Route path='/profile' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
                <Route path='/user-profile/:id' element={<ProtectedRoute><UserProfilePage/></ProtectedRoute>}/>
                {serviceCategories.map((category) => (
                    <Route
                        key={category.id}
                        path={`/services/${category.title.toLowerCase()}`}
                        element={<AdCategory category={category} type={'service'}/>}
                    />
                ))}
                {rentalCategories.map((category) => (
                    <Route
                        key={category.id}
                        path={`/rental/${category.title.toLowerCase()}`}
                        element={<AdCategory category={category} type={'rent'}/>}
                    />
                ))}
                <Route path='/search/:query' element={<SearchResult/>}/>
                <Route path="/admin" element={<AdminRoute><AdminHome /></AdminRoute>} />
                <Route path='/admin/notification' element={<AdminRoute><AdminNotificationForm/></AdminRoute>}/>
                <Route path="/admin/accounts" element={<AdminRoute><AdminAllUsers /></AdminRoute>} />
                <Route path="*" element={<Error/>}/>
            </Routes>
        </>
    );
}

export default App;





