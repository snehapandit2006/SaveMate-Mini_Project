import api from '../lib/api';

export interface Goal {
  _id?: string;
  name: string;
  targetAmount: number;
  savedAmount?: number;
  autoSaveAmount?: number;
  deadline?: string;
  category?: string;
  type?: 'personal' | 'group';
}

export const goalService = {
  async getGoals() {
    const response = await api.get('/goals');
    return response.data;
  },

  async createGoal(goal: Goal) {
    const response = await api.post('/goals', goal);
    return response.data;
  },

  async updateGoal(id: string, updates: Partial<Goal>) {
    const response = await api.put(`/goals/${id}`, updates);
    return response.data;
  },

  async deleteGoal(id: string) {
    const response = await api.delete(`/goals/${id}`);
    return response.data;
  },

  async contributeToGoal(id: string, amount: number) {
    const response = await api.post(`/goals/${id}/contribute`, { amount });
    return response.data;
  }
};
