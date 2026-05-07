import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../db';
import { motion } from 'framer-motion';
import { ChevronLeft, Award, TrendingUp, Calendar as CalendarIcon, CheckCircle } from 'lucide-react';

const History = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            const [localPlan, localLogs] = await Promise.all([
                db.plans.get(token),
                db.daily_logs.where({ token }).toArray()
            ]);
            setPlan(localPlan);
            setLogs(localLogs);
            setLoading(false);
        };
        loadHistory();
    }, [token]);

    // Simple heatmap generation for last 28 days
    const generateHeatmap = () => {
        const cells = [];
        const today = new Date();
        for (let i = 27; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const log = logs.find(l => l.date === dateStr);
            const intensity = log ? (log.completedExerciseIds.length / (plan?.exercises.length || 1)) : 0;
            cells.push({ date: dateStr, intensity });
        }
        return cells;
    };

    if (loading) return <div className="loading-screen">Loading history...</div>;

    const streak = logs.length; // Simplified streak for prototype

    return (
        <div className="patient-container">
            <header className="patient-header">
                <button onClick={() => navigate(`/patient/${token}`)} className="back-btn-patient">
                    <ChevronLeft size={24} />
                </button>
                <h1>Your Progress</h1>
                <p>Keep up the great work, {plan?.patientName}!</p>
            </header>

            <main className="patient-content">
                <div className="stats-summary card">
                    <div className="stat-item">
                        <Award className="streak-icon" />
                        <div>
                            <h4>Current Streak</h4>
                            <p>{streak} Days</p>
                        </div>
                    </div>
                    <div className="stat-item">
                        <TrendingUp className="calendar-icon" />
                        <div>
                            <h4>Consistency</h4>
                            <p>{Math.round((logs.length / 28) * 100)}%</p>
                        </div>
                    </div>
                </div>

                <div className="heatmap-section card">
                    <h3><CalendarIcon size={18} /> Completion Heatmap</h3>
                    <div className="heatmap-grid">
                        {generateHeatmap().map((cell, idx) => (
                            <div 
                                key={idx} 
                                className="heatmap-cell"
                                style={{ 
                                    backgroundColor: cell.intensity > 0.8 ? '#1A7A4A' : 
                                                     cell.intensity > 0.4 ? '#34d399' : 
                                                     cell.intensity > 0 ? '#a7f3d0' : '#eee' 
                                }}
                                title={cell.date}
                            />
                        ))}
                    </div>
                    <div className="heatmap-legend">
                        <span>Less</span>
                        <div className="legend-cells">
                            <div className="heatmap-cell" style={{backgroundColor: '#eee'}}></div>
                            <div className="heatmap-cell" style={{backgroundColor: '#a7f3d0'}}></div>
                            <div className="heatmap-cell" style={{backgroundColor: '#1A7A4A'}}></div>
                        </div>
                        <span>More</span>
                    </div>
                </div>

                <div className="recent-activity">
                    <h3>Recent Activity</h3>
                    {logs.slice().reverse().map(log => (
                        <div key={log.id} className="activity-item card">
                            <div className="activity-info">
                                <strong>{new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</strong>
                                <p>{log.completedExerciseIds.length} exercises completed</p>
                            </div>
                            <CheckCircle color="#1A7A4A" />
                        </div>
                    ))}
                </div>
            </main>

            <nav className="patient-nav">
                <div className="nav-item" onClick={() => navigate(`/patient/${token}`)}>
                    <CheckCircle />
                    <span>Today</span>
                </div>
                <div className="nav-item active" onClick={() => navigate(`/history/${token}`)}>
                    <CalendarIcon />
                    <span>History</span>
                </div>
            </nav>
        </div>
    );
};

export default History;
