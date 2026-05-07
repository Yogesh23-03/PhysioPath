import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Save, Plus, Trash2, Search, Info, AlertTriangle } from 'lucide-react';
import { exerciseLibrary } from '../data/exercises';
import api from '../api/client';

import { QRCodeCanvas } from 'qrcode.react';

const PlanBuilder = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const isEditMode = Boolean(token);
    const [patientName, setPatientName] = useState('');
    const [durationWeeks, setDurationWeeks] = useState(4);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [showLibrary, setShowLibrary] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [generatedToken, setGeneratedToken] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEditMode);

    useEffect(() => {
        if (!isEditMode) return;

        const loadPlan = async () => {
            try {
                const response = await api.get(`/plans/${token}`);
                const plan = response.data;
                setPatientName(plan.patientName);
                setDurationWeeks(plan.durationWeeks);
                setSelectedExercises((plan.exercises || []).map((exercise) => ({
                    ...exercise,
                    instanceId: exercise._id || `${exercise.id}-${Date.now()}-${Math.random()}`
                })));
                setGeneratedToken(plan.token);
            } catch (error) {
                console.error('Error loading plan:', error);
                alert('Unable to load this patient plan.');
                navigate('/dashboard');
            } finally {
                setInitialLoading(false);
            }
        };

        loadPlan();
    }, [isEditMode, navigate, token]);

    const addExercise = (exercise) => {
        const newExercise = {
            ...exercise,
            instanceId: Date.now() + Math.random(), // Unique ID for this specific plan instance
            sets: exercise.defaultSets,
            reps: exercise.defaultReps,
            restSeconds: exercise.restSeconds
        };
        setSelectedExercises([...selectedExercises, newExercise]);
        setShowLibrary(false);
    };

    const removeExercise = (instanceId) => {
        setSelectedExercises(selectedExercises.filter(ex => ex.instanceId !== instanceId));
    };

    const updateExercise = (instanceId, field, value) => {
        setSelectedExercises(selectedExercises.map(ex => 
            ex.instanceId === instanceId ? { ...ex, [field]: value } : ex
        ));
    };

    const updateExerciseStep = (instanceId, order, instruction) => {
        setSelectedExercises(selectedExercises.map((ex) => (
            ex.instanceId === instanceId
                ? {
                    ...ex,
                    steps: ex.steps.map((step) => (
                        step.order === order ? { ...step, instruction } : step
                    ))
                }
                : ex
        )));
    };

    const updateExerciseMistake = (instanceId, index, value) => {
        setSelectedExercises(selectedExercises.map((ex) => (
            ex.instanceId === instanceId
                ? {
                    ...ex,
                    mistakes: ex.mistakes.map((mistake, mistakeIndex) => (
                        mistakeIndex === index ? value : mistake
                    ))
                }
                : ex
        )));
    };

    const handleSave = async () => {
        if (!patientName || selectedExercises.length === 0) {
            alert('Please provide a patient name and select at least one exercise.');
            return;
        }

        setLoading(true);
        try {
            const planData = {
                patientName,
                durationWeeks,
                exercises: selectedExercises.map(ex => ({
                    id: ex.id,
                    name: ex.name,
                    muscleGroup: ex.muscleGroup,
                    description: ex.description,
                    imageUrl: ex.imageUrl,
                    sets: parseInt(ex.sets),
                    reps: parseInt(ex.reps),
                    restSeconds: parseInt(ex.restSeconds),
                    steps: ex.steps,
                    mistakes: ex.mistakes
                }))
            };
            const response = isEditMode
                ? await api.put(`/plans/${token}`, planData)
                : await api.post('/plans', planData);
            setGeneratedToken(response.data.token);
            setShowSuccess(true);
        } catch (error) {
            console.error('Error saving plan:', error);
            alert('Failed to save plan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const filteredLibrary = exerciseLibrary.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const shareUrl = `${window.location.origin}/patient/${generatedToken}`;

    if (initialLoading) {
        return <div className="loading-screen">Loading patient plan...</div>;
    }

    return (
        <div className="builder-container">
            <header className="builder-header">
                <button onClick={() => navigate('/dashboard')} className="back-btn">
                    <ChevronLeft size={20} /> Back
                </button>
                <h1>{isEditMode ? 'Edit Patient Plan' : 'Create Exercise Plan'}</h1>
                <button onClick={handleSave} disabled={loading} className="save-btn">
                    <Save size={20} /> {loading ? 'Saving...' : isEditMode ? 'Update Plan' : 'Save Plan'}
                </button>
            </header>

            <main className="builder-content plan-creator-layout">
                <section className="plan-form-column">
                    <section className="patient-details card glass-card">
                        <h3><Info size={18} /> Patient Information</h3>
                        <div className="form-row">
                            <div className="form-group floating-field">
                                <input 
                                    type="text" 
                                    placeholder=" " 
                                    value={patientName}
                                    onChange={(e) => setPatientName(e.target.value)}
                                />
                                <label>Patient Name</label>
                            </div>
                            <div className="form-group floating-field">
                                <select value={durationWeeks} onChange={(e) => setDurationWeeks(e.target.value)}>
                                    {[1, 2, 4, 6, 8, 12].map(w => (
                                        <option key={w} value={w}>{w} Weeks</option>
                                    ))}
                                </select>
                                <label>Duration</label>
                            </div>
                        </div>
                    </section>

                    <section className="selected-exercises">
                        <div className="section-header">
                            <h3>Prescribed Exercises</h3>
                            <button onClick={() => setShowLibrary(true)} className="add-btn">
                                <Plus size={18} /> Add Exercise
                            </button>
                        </div>

                        <div className="exercise-list">
                            {selectedExercises.length === 0 ? (
                                <div className="empty-list-prompt glass-card">
                                    <p>No exercises added yet. Click "Add Exercise" to start.</p>
                                </div>
                            ) : (
                                selectedExercises.map((ex) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={ex.instanceId} 
                                        className="exercise-item card glass-card hover-lift"
                                    >
                                        <div className="exercise-info">
                                            <h4>{ex.name}</h4>
                                            <span className="tag">{ex.muscleGroup}</span>
                                        </div>
                                        <div className="exercise-config">
                                            <div className="config-field">
                                                <label>Sets</label>
                                                <input 
                                                    type="number" 
                                                    value={ex.sets} 
                                                    onChange={(e) => updateExercise(ex.instanceId, 'sets', e.target.value)}
                                                />
                                            </div>
                                            <div className="config-field">
                                                <label>Reps</label>
                                                <input 
                                                    type="number" 
                                                    value={ex.reps} 
                                                    onChange={(e) => updateExercise(ex.instanceId, 'reps', e.target.value)}
                                                />
                                            </div>
                                            <div className="config-field">
                                                <label>Rest (s)</label>
                                                <input 
                                                    type="number" 
                                                    value={ex.restSeconds} 
                                                    onChange={(e) => updateExercise(ex.instanceId, 'restSeconds', e.target.value)}
                                                />
                                            </div>
                                            <button onClick={() => removeExercise(ex.instanceId)} className="remove-btn">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="builder-step-preview editable-steps">
                                            {ex.steps.map((step) => (
                                                <div key={step.order} className="builder-step-row">
                                                    <span>⠿</span>
                                                    <textarea
                                                        value={step.instruction}
                                                        onChange={(event) => updateExerciseStep(ex.instanceId, step.order, event.target.value)}
                                                        aria-label={`${ex.name} step ${step.order}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        {ex.mistakes.length > 0 && (
                                            <div className="mistakes-preview editable-mistakes">
                                                <AlertTriangle size={14} />
                                                <div>
                                                    {ex.mistakes.map((mistake, index) => (
                                                        <input
                                                            key={`${ex.instanceId}-mistake-${index}`}
                                                            value={mistake}
                                                            onChange={(event) => updateExerciseMistake(ex.instanceId, index, event.target.value)}
                                                            aria-label={`${ex.name} mistake ${index + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </section>
                </section>

                <aside className="live-preview-column">
                    <div className="phone-preview-shell">
                        <span className="patient-view-badge">Patient View</span>
                        <div className="phone-frame">
                            <div className="phone-speaker" />
                            <div className="phone-greeting glass-card">
                                <small>Good Morning</small>
                                <strong>{patientName || 'Patient'}</strong>
                                <div className="phone-progress">
                                    <span style={{ width: selectedExercises.length ? '35%' : '8%' }} />
                                </div>
                                <p>{selectedExercises.length} exercises prescribed</p>
                            </div>
                            <div className="phone-exercise-list">
                                {(selectedExercises.length ? selectedExercises : exerciseLibrary.slice(0, 2)).slice(0, 4).map((ex) => (
                                    <article key={ex.instanceId || ex.id} className="phone-ex-card glass-card">
                                        <img src={ex.imageUrl || '/medical-therapy-hero.svg'} alt="" />
                                        <div>
                                            <strong>{ex.name}</strong>
                                            <span>{ex.sets || ex.defaultSets} sets x {ex.reps || ex.defaultReps} reps</span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Exercise Library Modal */}
            <AnimatePresence>
                {showLibrary && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                        onClick={() => setShowLibrary(false)}
                    >
                        <motion.div 
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            exit={{ y: 50 }}
                            className="modal-content"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>Exercise Library</h3>
                                <div className="search-bar">
                                    <Search size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Search exercises..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="library-grid">
                                {filteredLibrary.map(ex => (
                                    <div key={ex.id} className="library-item" onClick={() => addExercise(ex)}>
                                        <div className="library-item-info">
                                            <h4>{ex.name}</h4>
                                            <p>{ex.muscleGroup}</p>
                                        </div>
                                        <Plus size={20} className="add-icon" />
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setShowLibrary(false)} className="close-modal-btn">Close</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success QR Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="modal-content success-modal"
                        >
                            <div className="success-header">
                                <h2>{isEditMode ? 'Plan Updated Successfully!' : 'Plan Created Successfully!'}</h2>
                                <p>Scan the QR code below or share the link with <strong>{patientName}</strong>.</p>
                            </div>
                            
                            <div className="qr-container">
                                <QRCodeCanvas value={shareUrl} size={200} />
                            </div>

                            <div className="share-link-box">
                                <input type="text" readOnly value={shareUrl} />
                                <button onClick={() => {
                                    navigator.clipboard.writeText(shareUrl);
                                    alert('Link copied!');
                                }}>Copy</button>
                            </div>

                            <button onClick={() => navigate('/dashboard')} className="done-btn">Done & Back to Dashboard</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PlanBuilder;
