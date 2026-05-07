import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Bone, Dumbbell, HeartPulse, Loader2, Lock, Mail, Pill, StretchHorizontal, User } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [stateMedicalCouncil, setStateMedicalCouncil] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.post('/auth/register', { name, email, password, licenseNumber, stateMedicalCouncil, photoUrl });
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try another email.');
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setPhotoUrl(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <div className="login-page">
            <div className="auth-floating-icons" aria-hidden="true">
                <span><HeartPulse /></span>
                <span><Dumbbell /></span>
                <span><Activity /></span>
                <span><Bone /></span>
                <span><StretchHorizontal /></span>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="login-card"
            >
                <div className="login-header">
                    <div className="logo-icon">
                        <Pill size={40} color="#1A7A4A" />
                    </div>
                    <h1>Create Account</h1>
                    <p>Therapist access for PhysioPath</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message">{error}</div>}

                    <div className="input-group">
                        <label><User size={18} /> Full Name</label>
                        <input
                            type="text"
                            placeholder="Dr. Meena Sharma"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label><Mail size={18} /> Email Address</label>
                        <input
                            type="email"
                            placeholder="doctor@physiopath.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label><Lock size={18} /> Password</label>
                        <input
                            type="password"
                            placeholder="Minimum 6 characters"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="input-group">
                        <label>Medical License Number (NMC Registration No.)</label>
                        <input
                            type="text"
                            placeholder="Enter your NMC registration number"
                            value={licenseNumber}
                            onChange={(event) => setLicenseNumber(event.target.value)}
                            required
                            minLength={5}
                            pattern="[A-Za-z0-9]+"
                            title="Use only letters and numbers, minimum 5 characters"
                        />
                    </div>

                    <div className="input-group">
                        <label>State Medical Council</label>
                        <select
                            value={stateMedicalCouncil}
                            onChange={(event) => setStateMedicalCouncil(event.target.value)}
                            required
                        >
                            <option value="">Select state medical council</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Delhi">Delhi</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Profile Photo URL</label>
                        <input
                            type="url"
                            placeholder="Paste your profile photo URL"
                            value={photoUrl.startsWith('data:') ? '' : photoUrl}
                            onChange={(event) => setPhotoUrl(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Or Upload Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                        />
                        {photoUrl && (
                            <div className="register-photo-preview">
                                <img src={photoUrl} alt="Profile preview" />
                                <span>{photoUrl.startsWith('data:') ? 'Uploaded image selected' : 'Photo URL selected'}</span>
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={loading} className="login-btn">
                        {loading ? <><Loader2 className="spin" /> Verifying with NMC...</> : 'Create Account'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Already registered? <Link to="/login">Sign in</Link></p>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
