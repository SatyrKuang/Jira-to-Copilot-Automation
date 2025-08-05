import { useState } from 'react';
import type { ReactNode } from 'react';
import { FaCaiContext } from './FaCaiContext';
import type { FaCaiState, Transaction, FaCaiContextType } from './FaCaiContext';

// Provider component
export interface FaCaiProviderProps {
  children: ReactNode;
  initialBalance?: number;
}

export function FaCaiProvider({ 
  children, 
  initialBalance = 0 
}: FaCaiProviderProps) {
  const [state, setState] = useState<FaCaiState>({
    balance: initialBalance,
    transactions: [],
    isLoading: false,
  });

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };

    setState(prevState => {
      const newBalance = transaction.type === 'income' 
        ? prevState.balance + transaction.amount
        : prevState.balance - transaction.amount;

      return {
        ...prevState,
        balance: newBalance,
        transactions: [newTransaction, ...prevState.transactions],
      };
    });
  };

  const getBalance = () => state.balance;

  const clearTransactions = () => {
    setState(prevState => ({
      ...prevState,
      transactions: [],
      balance: initialBalance,
    }));
  };

  const contextValue: FaCaiContextType = {
    state,
    addTransaction,
    getBalance,
    clearTransactions,
  };

  return (
    <FaCaiContext.Provider value={contextValue}>
      {children}
    </FaCaiContext.Provider>
  );
}