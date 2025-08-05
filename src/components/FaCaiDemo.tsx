import { useState } from 'react';
import { useFaCai } from '../providers';

export function FaCaiDemo() {
  const { state, addTransaction, clearTransactions } = useFaCai();
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');

  const handleAddTransaction = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && description.trim()) {
      addTransaction({
        amount: numAmount,
        description: description.trim(),
        type: transactionType,
      });
      setAmount('');
      setDescription('');
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">FaCai Provider Demo</h2>
      
      {/* Balance Display */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Balance</h3>
        <p className={`text-3xl font-bold ${state.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(state.balance)}
        </p>
      </div>

      {/* Add Transaction Form */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Transaction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Transaction description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value as 'income' | 'expense')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddTransaction}
              disabled={!amount || !description.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Recent Transactions ({state.transactions.length})
          </h3>
          {state.transactions.length > 0 && (
            <button
              onClick={clearTransactions}
              className="text-sm bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
        
        {state.transactions.length === 0 ? (
          <p className="text-gray-500 italic">No transactions yet. Add your first transaction above!</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {state.transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{formatDate(transaction.timestamp)}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{transaction.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}