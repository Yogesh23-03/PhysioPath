import Dexie from 'dexie';

export const db = new Dexie('PhysioPathDB');
db.version(2).stores({
    plans: 'token, patientName, createdAt',
    daily_logs: '++id, token, date, completedExerciseIds', // completedExerciseIds is an array
    settings: 'id, lastVisitDate' // For daily reset logic
});
