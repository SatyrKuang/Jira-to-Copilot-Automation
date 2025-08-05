import { createContext } from 'react';

// Types for FaCai Provider
export interface FaCaiState {
  balance: number;
  transactions: Transaction[];
  isLoading: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  timestamp: Date;
  type: 'income' | 'expense';
}

export interface FaCaiContextType {
  state: FaCaiState;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  getBalance: () => number;
  clearTransactions: () => void;
}

// Create the context and export it for the hook
export const FaCaiContext = createContext<FaCaiContextType | undefined>(undefined);