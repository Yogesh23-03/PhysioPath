import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, RotateCcw, ChevronRight, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { db } from '../db';

const WorkoutEngine = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [plan, setPlan] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [state, setState] = useState('INTRO'); // INTRO, REPS, REST, COMPLETE
    const [currentRep, setCurrentRep] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);
    const [timer, setTimer] = useState(0);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [loading, setLoading] = useState(true);

    const timerRef = useRef(null);
    const wakeLockRef = useRef(null);

    const currentExercise = plan?.exercises[currentIndex];

    // Initialize Workout
    useEffect(() => {
        const loadPlan = async () => {
            const localPlan = await db.plans.get(token);
            if (localPlan) {
                setPlan(localPlan);
                startIntro();
            }
            setLoading(false);
        };
        loadPlan();
        requestWakeLock();
        return () => releaseWakeLock();
    }, [token]);

    // Wake Lock API
    const requestWakeLock = async () => {
        try {
            if ('wakeLock' in navigator) {
                wakeLockRef.current = await navigator.wakeLock.request('screen');
            }
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
    };

    const releaseWakeLock = () => {
        if (wakeLockRef.current) {
            wakeLockRef.current.release();
            wakeLockRef.current = null;
        }
    };

    // Voice Coaching
    const speak = (text) => {
        if (!voiceEnabled) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    };

    const startIntro = () => {
        setState('INTRO');
        speak(`Next exercise: ${currentExercise?.name || ''}. Get ready.`);
        setTimer(5);
    };

    useEffect(() => {
        if (state === 'INTRO' && timer > 0) {
            timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
        } else if (state === 'INTRO' && timer === 0) {
            setState('REPS');
            speak("Begin.");
        }

        if (state === 'REST' && timer > 0) {
            timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
        } else if (state === 'REST' && timer === 0) {
            nextSetOrExercise();
        }

        return () => clearTimeout(timerRef.current);
    }, [state, timer]);

    const handleRepClick = () => {
        if (state !== 'REPS') return;
        
        const nextRep = currentRep + 1;
        setCurrentRep(nextRep);
        speak(nextRep.toString());

        if (nextRep >= currentExercise.reps) {
            if (currentSet >= currentExercise.sets) {
                startRest(true); // Last set
            } else {
                startRest(false); // More sets left
            }
        }
    };

    const startRest = (isLastSet) => {
        setState('REST');
        setTimer(currentExercise.restSeconds);
        speak(`Great job. Rest for ${currentExercise.restSeconds} seconds.`);
    };

    const nextSetOrExercise = () => {
        if (currentSet < currentExercise.sets) {
            setCurrentSet(currentSet + 1);
            setCurrentRep(0);
            setState('REPS');
            speak("Begin next set.");
        } else {
            if (currentIndex < plan.exercises.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setCurrentSet(1);
                setCurrentRep(0);
                startIntro();
            } else {
                completeWorkout();
            }
        }
    };

    const completeWorkout = async () => {
        setState('COMPLETE');
        speak("Workout complete. Fantastic effort today.");
        
        // Log to Dexie
        const today = new Date().toISOString().split('T')[0];
        let log = await db.daily_logs.where({ token, date: today }).first();
        const allIds = plan.exercises.map(ex => ex.id);
        if (log) {
            await db.daily_logs.update(log.id, { completedExerciseIds: allIds });
        } else {
            await db.daily_logs.add({ token, date: today, completedExerciseIds: allIds });
        }
    };

    if (loading) return <div className="loading-screen">Preparing workout...</div>;

    return (
        <div className="workout-engine">
            <header className="workout-header">
                <button onClick={() => navigate(`/patient/${token}`)} className="close-btn">
                    <X size={24} />
                </button>
                <div className="workout-progress">
                    Exercise {currentIndex + 1} of {plan.exercises.length}
                </div>
                <button onClick={() => setVoiceEnabled(!voiceEnabled)} className="voice-toggle">
                    {voiceEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                </button>
            </header>

            <main className="workout-main">
                <AnimatePresence mode="wait">
                    {state === 'INTRO' && (
                        <motion.div 
                            key="intro"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="state-view intro-view"
                        >
                            <span className="upcoming-label">UPCOMING</span>
                            <h2>{currentExercise.name}</h2>
                            <div className="countdown-circle">{timer}</div>
                            <p>Get into position</p>
                        </motion.div>
                    )}

                    {state === 'REPS' && (
                        <motion.div 
                            key="reps"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="state-view reps-view"
                        >
                            <div className="exercise-title">
                                <h2>{currentExercise.name}</h2>
                                <span className="set-indicator">Set {currentSet} of {currentExercise.sets}</span>
                            </div>

                            <button className="big-rep-button" onClick={handleRepClick}>
                                <div className="rep-count">{currentRep}</div>
                                <div className="rep-target">of {currentExercise.reps}</div>
                                <div className="tap-hint">TAP TO COUNT REP</div>
                            </button>

                            <div className="mistake-warning-alert">
                                <ShieldAlert size={20} />
                                <p>{currentExercise.mistakes[0] || "Maintain controlled movement"}</p>
                            </div>
                        </motion.div>
                    )}

                    {state === 'REST' && (
                        <motion.div 
                            key="rest"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="state-view rest-view"
                        >
                            <h2>Rest Period</h2>
                            <div className="timer-display">{timer}s</div>
                            <p>Breath deeply and relax</p>
                            <button onClick={nextSetOrExercise} className="skip-btn">Skip Rest</button>
                        </motion.div>
                    )}

                    {state === 'COMPLETE' && (
                        <motion.div 
                            key="complete"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="state-view complete-view"
                        >
                            <div className="success-icon">🎉</div>
                            <h2>Well Done!</h2>
                            <p>You've completed your prescribed exercises for today.</p>
                            <button onClick={() => navigate(`/patient/${token}`)} className="finish-btn">Finish</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default WorkoutEngine;
