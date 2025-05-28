import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Form, Button, Container, Card, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup } from '../firebase';
import { setUser } from '../store/slices/authSlice';

const LoginPage = () => {
    const dispatch = useDispatch()
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState('phone'); 
    const [verificationId, setVerificationId] = useState('');

   const navigate = useNavigate();

    const validatePhoneNumber = (number) => /^[0-9]{10}$/.test(number);
    const validateOtp = (otp) => /^[0-9]{6}$/.test(otp);
    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;    
            const name = user.displayName;
            const email = user.email;
            const uuid = user.uid;
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/create_user`, {
                name,
                uuid,
                email,
            });
            localStorage.setItem('elk_authorization_token', response.data.data.token);
            // localStorage.setItem('elk_is_admin', response.data.data.is_admin);
            // localStorage.setItem('elk_user_id', response.data.data.user_id);
            dispatch(setUser({
                user:response.data.data,
                token: response.data.data.token,
                isAdmin: response.data.data.is_admin

            }))
            navigate('/home');
        } catch (error) {
            console.error('Google Login Error:', error);
            if (error.code === 'auth/popup-closed-by-user') {
                setError('Login popup closed before completion. Please try again.');
            } else {
                setError('Google sign-in failed. Please try again.'+error);
            }        
        } finally{
            setLoading(false);
        }
    };
    
    const handleSendOtp = async () => {
        if (!validatePhoneNumber(phoneNumber)) {
            setError('Please enter a valid 10-digit phone number.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/send_otp`, { mobile: `+91 ${phoneNumber}` });
            console.log('OTP Sent:', response.data);
            setStep('otp'); 
            setVerificationId(response.data.verificationId)
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError(error.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle verifying OTP
    const handleVerifyOtp = async () => {
        if (!validateOtp(otp)) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/verify_otp`, { verificationId: verificationId, otp: otp });
            console.log('OTP Verified:', response.data);
            localStorage.setItem('elk_authorization_token', response.data.data.token);
            // localStorage.setItem('elk_is_admin', response.data.data.is_admin);
            // localStorage.setItem('elk_user_id', response.data.data.user_id);
            dispatch(setUser({
                user:response.data.data,
                token: response.data.data.token,
                isAdmin: response.data.data.is_admin

            }))
            navigate('/home');
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError(error.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Container>
                <Card className="shadow-lg p-4 border-0 rounded-4 mx-auto" style={{ maxWidth: '400px' }}>
                    <Card.Body>
                        <h3 className="text-center mb-3" style={{ fontWeight: 'bold', color: '#4FBBB4' }}>
                            {step === 'phone' ? 'Welcome Back!' : 'Enter OTP'}
                        </h3>
                        <p className="text-muted text-center mb-4">
                            {step === 'phone'
                                ? 'Login or Sign Up with your phone number'
                                : `OTP sent to ${phoneNumber}`}
                        </p>

                        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                        <Form>
                            {step === 'phone' && (
                                <Form.Group controlId="phoneNumber" className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter your 10-digit phone number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        isInvalid={!!error}
                                    />
                                </Form.Group>
                            )}

                            {step === 'otp' && (
                                <Form.Group controlId="otp" className="mb-3">
                                    <Form.Label>Enter OTP</Form.Label>
                                    <Form.Control
                                        className='mb-3'
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        isInvalid={!!error}
                                    />
                                </Form.Group>
                            )}

                            <Button
                                className="w-100 py-2"
                                onClick={step === 'phone' ? handleSendOtp : handleVerifyOtp}
                                style={{
                                    fontWeight: 'bold',
                                    letterSpacing: '0.5px',
                                    backgroundColor: '#fdd77f',
                                    borderColor: '#fdd77f',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                }}
                                disabled={loading}
                            >
                                {loading && <Spinner as="span" animation="border" size="sm" />}
                                {step === 'phone' ? 'Send OTP' : 'Verify OTP'}
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            <p className="text-muted">or</p>
                            <Button
                                variant="outline-dark"
                                className="w-100 py-2"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                            >
                                <img
                                    src="https://developers.google.com/identity/images/g-logo.png"
                                    alt="Google"
                                    style={{ width: 20, marginRight: 10 }}
                                />
                                Continue with Google
                            </Button>
                        </div>


                        <p className="text-muted text-center mt-4" style={{ fontSize: '14px' }}>
                            By continuing, you agree to our <Link to="https://elkbusinesshub.com/terms" target="_blank">Terms of Service</Link> &{' '}
                            <Link to="https://elkbusinesshub.com/privacy" target="_blank" >Privacy Policy</Link>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LoginPage;

