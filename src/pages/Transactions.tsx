import { useState, useEffect } from 'react';


interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  useEffect(() => {
    const stored = localStorage.getItem('swiftcash_transactions');
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('swiftcash_transactions', JSON.stringify(updatedTransactions));
  };

  const filteredTransactions = transactions.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="transactions">
      <div className="transactions__header">
        <h1 className="transactions__title">Transactions</h1>
        <p className="transactions__subtitle">View and manage all your transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card" data-type="balance">
          <p className="summary-card__label">Balance</p>
          <p className="summary-card__value">${balance.toFixed(2)}</p>
        </div>
        <div className="summary-card" data-type="income">
          <p className="summary-card__label">Total Income</p>
          <p className="summary-card__value">+${totalIncome.toFixed(2)}</p>
        </div>
        <div className="summary-card" data-type="expense">
          <p className="summary-card__label">Total Expense</p>
          <p className="summary-card__value">-${totalExpense.toFixed(2)}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'income' ? 'active' : ''}`}
          onClick={() => setFilter('income')}
        >
          Income
        </button>
        <button
          className={`filter-btn ${filter === 'expense' ? 'active' : ''}`}
          onClick={() => setFilter('expense')}
        >
          Expense
        </button>
      </div>

      {/* Transactions List */}
      <div className="transactions-container">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <p>No transactions found</p>
          </div>
        ) : (
          <div className="transactions-list">
            {filteredTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-card">
                <div className="transaction-card__icon" data-type={transaction.type}>
                  {transaction.type === 'income' ? '+' : '−'}
                </div>
                <div className="transaction-card__details">
                  <p className="transaction-card__description">{transaction.description}</p>
                  <p className="transaction-card__meta">
                    {transaction.category} • {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="transaction-card__amount" data-type={transaction.type}>
                  {transaction.type === 'income' ? '+' : '−'}${transaction.amount.toFixed(2)}
                </div>
                <button
                  className="transaction-card__delete"
                  onClick={() => handleDelete(transaction.id)}
                  aria-label="Delete transaction"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}