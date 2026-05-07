import api from '../api/client';
import { db } from './index';

export const getLatestPlan = async (token) => {
    try {
        const response = await api.get(`/plans/${token}`);
        await db.plans.put(response.data);
        return response.data;
    } catch (error) {
        const localPlan = await db.plans.get(token);
        if (localPlan) return localPlan;
        throw error;
    }
};
