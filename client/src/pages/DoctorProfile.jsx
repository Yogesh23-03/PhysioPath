import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Award,
    BriefcaseMedical,
    Download,
    Edit3,
    FileText,
    Mail,
    MapPin,
    Save,
    ShieldCheck,
    Star,
    X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

const hardcodedDoctorProfile = {
    specialization: 'Orthopedic Physiotherapist',
    yearsOfExperience: 8,
    address: 'PhysioPath Recovery Clinic, Bengaluru',
    workingAt: 'PhysioPath Care Studio',
    photoUrl: '',
    documentName: 'Physiotherapy License.pdf',
    isVerified: true,
    rating: 4.8
};

const DoctorProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await api.get('/auth/me');
                setProfile(response.data);
                setForm(response.data);
            } catch (error) {
                console.warn('Unable to fetch doctor profile from DB:', error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const doctor = {
        ...hardcodedDoctorProfile,
        name: user?.name || 'PhysioPath Therapist',
        email: user?.email || 'doctor@physiopath.com',
        ...Object.fromEntries(
            Object.entries(user || {}).filter(([, value]) => value !== undefined && value !== null && value !== '')
        ),
        ...Object.fromEntries(
            Object.entries(profile || {}).filter(([, value]) => value !== undefined && value !== null && value !== '')
        )
    };

    const updateForm = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const saveProfile = async () => {
        setSaving(true);
        setMessage('');
        try {
            const response = await api.put('/auth/me', {
                name: form.name,
                email: form.email,
                specialization: form.specialization,
                yearsOfExperience: form.yearsOfExperience,
                address: form.address,
                workingAt: form.workingAt,
                photoUrl: form.photoUrl,
                documentName: form.documentName,
                stateMedicalCouncil: form.stateMedicalCouncil
            });
            setProfile(response.data);
            setForm(response.data);
            localStorage.setItem('therapistUser', JSON.stringify({
                id: response.data._id,
                name: response.data.name,
                email: response.data.email,
                rating: response.data.rating,
                ratingCount: response.data.ratingCount
            }));
            setEditing(false);
            setMessage('Profile updated successfully.');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Unable to update profile.');
        } finally {
            setSaving(false);
        }
    };

    const cancelEdit = () => {
        setForm(profile || {});
        setEditing(false);
        setMessage('');
    };

    const initials = doctor.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const handleDownload = () => {
        const blob = new Blob([
            `${doctor.name}\n${doctor.specialization}\nVerified PhysioPath therapist profile document.`
        ], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = doctor.documentName.replace(/\.pdf$/i, '.txt');
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="doctor-profile-shell">
            <header className="doctor-profile-nav">
                <button className="back-btn" onClick={() => navigate('/dashboard')}>
                    <ArrowLeft size={20} /> Dashboard
                </button>
                <strong>Doctor Profile</strong>
                {editing ? (
                    <div className="doctor-profile-actions">
                        <button className="secondary-action" onClick={cancelEdit}>
                            <X size={17} /> Cancel
                        </button>
                        <button className="save-btn" onClick={saveProfile} disabled={saving}>
                            <Save size={17} /> {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                ) : (
                    <button className="secondary-action" onClick={() => setEditing(true)}>
                        <Edit3 size={17} /> Edit Profile
                    </button>
                )}
            </header>

            <main className="doctor-profile-main">
                {loading && <div className="empty-state compact">Loading doctor profile...</div>}
                <section className="doctor-profile-card">
                    <div className="doctor-profile-hero">
                        <div className="doctor-photo-wrap">
                            {doctor.photoUrl ? (
                                <img src={doctor.photoUrl} alt={doctor.name} />
                            ) : (
                                <div className="doctor-initials">{initials}</div>
                            )}
                            {doctor.isVerified && (
                                <span className="photo-verified" aria-label="Verified doctor">
                                    <ShieldCheck size={20} />
                                </span>
                            )}
                        </div>

                        <div className="doctor-profile-heading">
                            <div className="doctor-name-row">
                                {editing ? (
                                    <input
                                        className="doctor-profile-title-input"
                                        value={form.name || ''}
                                        onChange={(event) => updateForm('name', event.target.value)}
                                    />
                                ) : (
                                    <h1>{doctor.name}</h1>
                                )}
                                {doctor.isVerified && (
                                    <span className="verified-text-badge">
                                        <ShieldCheck size={16} /> Verified
                                    </span>
                                )}
                            </div>
                            {editing ? (
                                <input
                                    className="doctor-profile-line-input"
                                    value={form.specialization || ''}
                                    onChange={(event) => updateForm('specialization', event.target.value)}
                                />
                            ) : (
                                <p>{doctor.specialization}</p>
                            )}
                            <div className="doctor-profile-stats">
                                <span><Award size={18} /> {doctor.yearsOfExperience}+ years experience</span>
                                <span><Star size={18} fill="currentColor" /> {Number(doctor.rating || 0).toFixed(1)} rating ({doctor.ratingCount || 0})</span>
                            </div>
                        </div>
                    </div>

                    <div className="doctor-info-grid">
                        <article>
                            <Mail size={22} />
                            <div>
                                <span>Email</span>
                                {editing ? (
                                    <input value={form.email || ''} onChange={(event) => updateForm('email', event.target.value)} />
                                ) : (
                                    <strong>{doctor.email}</strong>
                                )}
                            </div>
                        </article>
                        <article>
                            <MapPin size={22} />
                            <div>
                                <span>Address</span>
                                {editing ? (
                                    <input value={form.address || ''} onChange={(event) => updateForm('address', event.target.value)} />
                                ) : (
                                    <strong>{doctor.address}</strong>
                                )}
                            </div>
                        </article>
                        <article>
                            <BriefcaseMedical size={22} />
                            <div>
                                <span>Working At</span>
                                {editing ? (
                                    <input value={form.workingAt || ''} onChange={(event) => updateForm('workingAt', event.target.value)} />
                                ) : (
                                    <strong>{doctor.workingAt}</strong>
                                )}
                            </div>
                        </article>
                        <article>
                            <FileText size={22} />
                            <div>
                                <span>Document</span>
                                {editing ? (
                                    <input value={form.documentName || ''} onChange={(event) => updateForm('documentName', event.target.value)} />
                                ) : (
                                    <strong>{doctor.documentName}</strong>
                                )}
                            </div>
                            <button className="secondary-action" onClick={handleDownload}>
                                <Download size={17} /> Download
                            </button>
                        </article>
                        <article>
                            <Award size={22} />
                            <div>
                                <span>Years of Experience</span>
                                {editing ? (
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.yearsOfExperience || 0}
                                        onChange={(event) => updateForm('yearsOfExperience', event.target.value)}
                                    />
                                ) : (
                                    <strong>{doctor.yearsOfExperience} years</strong>
                                )}
                            </div>
                        </article>
                        <article>
                            <ShieldCheck size={22} />
                            <div>
                                <span>Medical License Number (NMC Registration No.)</span>
                                <strong>{doctor.licenseNumber || 'Not available'}</strong>
                            </div>
                        </article>
                        <article>
                            <ShieldCheck size={22} />
                            <div>
                                <span>State Medical Council</span>
                                {editing ? (
                                    <input
                                        value={form.stateMedicalCouncil || ''}
                                        onChange={(event) => updateForm('stateMedicalCouncil', event.target.value)}
                                    />
                                ) : (
                                    <strong>{doctor.stateMedicalCouncil || 'Not available'}</strong>
                                )}
                            </div>
                        </article>
                        <article>
                            <Star size={22} fill="currentColor" />
                            <div>
                                <span>Rating</span>
                                <strong>{Number(doctor.rating || 0).toFixed(1)} ({doctor.ratingCount || 0} reviews)</strong>
                            </div>
                        </article>
                    </div>

                    {editing && (
                        <div className="doctor-info-grid doctor-photo-edit-grid">
                            <article>
                                <FileText size={22} />
                                <div>
                                    <span>Photo URL</span>
                                    <input value={form.photoUrl || ''} onChange={(event) => updateForm('photoUrl', event.target.value)} />
                                </div>
                            </article>
                        </div>
                    )}

                    {message && <aside className="doctor-profile-note"><p>{message}</p></aside>}
                </section>
            </main>
        </div>
    );
};

export default DoctorProfile;
