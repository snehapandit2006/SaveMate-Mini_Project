import api from '../lib/api';

export interface Transaction {
  _id?: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
  isEssential?: boolean;
  date?: string;
}

export const transactionService = {
  async getTransactions(limit = 50) {
    const response = await api.get('/transactions', { params: { limit } });
    return response.data;
  },

  async createTransaction(transaction: Transaction) {
    const response = await api.post('/transactions', transaction);
    return response.data;
  },

  async deleteTransaction(id: string) {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },

  async getStats(period: 'week' | 'month' | 'year' = 'week') {
    const response = await api.get('/stats', { params: { period } });
    return response.data;
  }
};
