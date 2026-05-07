import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../db';
import api from '../api/client';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Calendar, Flame, AlertCircle, Info, ChevronRight, ChevronDown } from 'lucide-react';

const PatientPortal = () => {
    const { token } = useParams();
    const [plan, setPlan] = useState(null);
    const [dailyLog, setDailyLog] = useState({ completedExerciseIds: [] });
    const [loading, setLoading] = useState(true);
    const [expandedExercise, setExpandedExercise] = useState(null);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const initPlan = async () => {
            try {
                // 1. Check local Dexie first
                let localPlan = await db.plans.get(token);
                
                if (!localPlan) {
                    // 2. Fetch from API if not local
                    const response = await api.get(`/plans/${token}`);
                    localPlan = response.data;
                    await db.plans.add(localPlan);
                }
                setPlan(localPlan);

                // 3. Load/Init Daily Log
                let log = await db.daily_logs.where({ token, date: today }).first();
                if (!log) {
                    log = { token, date: today, completedExerciseIds: [] };
                    await db.daily_logs.add(log);
                }
                setDailyLog(log);

            } catch (err) {
                console.error("Error loading plan:", err);
            } finally {
                setLoading(false);
            }
        };

        initPlan();
    }, [token, today]);

    const toggleExercise = async (exerciseId) => {
        const isCompleted = dailyLog.completedExerciseIds.includes(exerciseId);
        let newIds;
        if (isCompleted) {
            newIds = dailyLog.completedExerciseIds.filter(id => id !== exerciseId);
        } else {
            newIds = [...dailyLog.completedExerciseIds, exerciseId];
        }

        const updatedLog = { ...dailyLog, completedExerciseIds: newIds };
        await db.daily_logs.put(updatedLog);
        setDailyLog(updatedLog);
    };

    if (loading) return <div className="loading-screen">Syncing your plan...</div>;
    if (!plan) return <div className="error-screen">Plan not found or expired.</div>;

    const progressPercent = Math.round((dailyLog.completedExerciseIds.length / plan.exercises.length) * 100) || 0;
    
    // Overall timeline calculation
    const startDate = new Date(plan.createdAt);
    const endDate = new Date(startDate.getTime() + (plan.durationWeeks * 7 * 24 * 60 * 60 * 1000));
    const now = new Date();
    const totalDays = plan.durationWeeks * 7;
    const daysElapsed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const timelinePercent = Math.min(Math.round((daysElapsed / totalDays) * 100), 100);

    return (
        <div className="patient-container">
            <header className="patient-header">
                <div className="patient-intro">
                    <h1>Hello, {plan.patientName}</h1>
                    <div className="offline-badge">Available Offline ✅</div>
                </div>
                
                <div className="stats-row">
                    <div className="stat-card">
                        <Flame size={24} className="streak-icon" />
                        <div className="stat-info">
                            <span className="stat-value">5 Days</span>
                            <span className="stat-label">Current Streak</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Calendar size={24} className="calendar-icon" />
                        <div className="stat-info">
                            <span className="stat-value">Day {daysElapsed}</span>
                            <span className="stat-label">of {totalDays}</span>
                        </div>
                    </div>
                </div>

                <div className="overall-timeline">
                    <div className="timeline-header">
                        <span>Recovery Progress</span>
                        <span>{timelinePercent}%</span>
                    </div>
                    <div className="progress-bar-bg">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${timelinePercent}%` }}
                            className="progress-bar-fill timeline-fill"
                        />
                    </div>
                </div>
            </header>

            <main className="patient-content">
                <div className="daily-task-header">
                    <h2>Today's Checklist</h2>
                    <span className="daily-score">{progressPercent}%</span>
                </div>

                <div className="exercise-checklist">
                    {plan.exercises.map((ex) => (
                        <div key={ex.id} className={`patient-exercise-card ${dailyLog.completedExerciseIds.includes(ex.id) ? 'completed' : ''}`}>
                            <div className="exercise-main-row" onClick={() => setExpandedExercise(expandedExercise === ex.id ? null : ex.id)}>
                                <button 
                                    className="check-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExercise(ex.id);
                                    }}
                                >
                                    {dailyLog.completedExerciseIds.includes(ex.id) ? 
                                        <CheckCircle size={32} className="checked" /> : 
                                        <Circle size={32} className="unchecked" />
                                    }
                                </button>
                                
                                <div className="ex-brief">
                                    <h3>{ex.name}</h3>
                                    <p>{ex.sets} sets × {ex.reps} reps</p>
                                </div>

                                <div className="ex-toggle">
                                    {expandedExercise === ex.id ? <ChevronDown /> : <ChevronRight />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedExercise === ex.id && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="exercise-details"
                                    >
                                        <div className="visual-guide">
                                            <h4>Visual Guide</h4>
                                            <div className="steps-list">
                                                {ex.steps.map((step, idx) => (
                                                    <div key={idx} className="step-item">
                                                        <span className="step-num">{step.order}</span>
                                                        <p>{step.instruction}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {ex.mistakes.length > 0 && (
                                            <div className="mistakes-box">
                                                <h4><AlertCircle size={16} /> Common Mistakes</h4>
                                                <ul>
                                                    {ex.mistakes.map((m, i) => <li key={i}>{m}</li>)}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="rest-info">
                                            <Info size={16} />
                                            <span>Rest {ex.restSeconds}s between sets</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
                <button 
                    onClick={() => navigate(`/workout/${token}`)} 
                    className="start-workout-btn"
                >
                    <Play fill="currentColor" /> Start Guided Workout
                </button>
            </main>

            <nav className="patient-nav">
                <div className="nav-item active" onClick={() => navigate(`/patient/${token}`)}>
                    <CheckCircle />
                    <span>Today</span>
                </div>
                <div className="nav-item" onClick={() => navigate(`/history/${token}`)}>
                    <Calendar />
                    <span>History</span>
                </div>
            </nav>
        </div>
    );
};

export default PatientPortal;
