import Dexie from 'dexie';

export const db = new Dexie('PhysioPathDB');
db.version(1).stores({
    plans: 'token, patientName, createdAt',
    progress: '++id, token, date, exerciseId, setsDone'
});
