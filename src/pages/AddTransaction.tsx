import React, { useState, useEffect } from 'react';
interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function AddTransactions() {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];
  const expenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];

  useEffect(() => {
    const stored = localStorage.getItem('swiftcash_transactions');
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !description) {
      alert('Please fill in all fields');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem('swiftcash_transactions', JSON.stringify(updatedTransactions));

    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleDelete = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('swiftcash_transactions', JSON.stringify(updatedTransactions));
  };

  return (
    <div className="add-transactions">
      <div className="add-transactions__header">
        <h1 className="add-transactions__title">Add Transaction</h1>
        <p className="add-transactions__subtitle">Track your income and expenses</p>
      </div>

      <div className="add-transactions__content">
        <div className="add-transactions__form-container">
          <form onSubmit={handleSubmit} className="transaction-form">
            {/* Type Toggle */}
            <div className="form-group">
              <label className="form-label">Transaction Type</label>
              <div className="type-toggle">
                <button
                  type="button"
                  className={`type-toggle__btn ${type === 'expense' ? 'active' : ''}`}
                  onClick={() => setType('expense')}
                >
                  <span className="type-toggle__icon">−</span>
                  Expense
                </button>
                <button
                  type="button"
                  className={`type-toggle__btn ${type === 'income' ? 'active' : ''}`}
                  onClick={() => setType('income')}
                >
                  <span className="type-toggle__icon">+</span>
                  Income
                </button>
              </div>
            </div>

            {/* Amount */}
            <div className="form-group">
              <label htmlFor="amount" className="form-label">Amount</label>
              <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  id="amount"
                  className="form-input"
                  placeholder="0.00"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {(type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                id="description"
                className="form-input"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Date */}
            <div className="form-group">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                id="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              Add Transaction
            </button>
          </form>
        </div>

        {/* Recent Transactions */}
        <div className="transactions-list">
          <h2 className="transactions-list__title">Recent Transactions</h2>
          
          {transactions.length === 0 ? (
            <div className="empty-state">
              <p>No transactions yet. Add your first one!</p>
            </div>
          ) : (
            <div className="transactions-list__items">
              {transactions.slice(0, 10).map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-item__icon" data-type={transaction.type}>
                    {transaction.type === 'income' ? '+' : '−'}
                  </div>
                  <div className="transaction-item__details">
                    <p className="transaction-item__description">{transaction.description}</p>
                    <p className="transaction-item__meta">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="transaction-item__amount" data-type={transaction.type}>
                    {transaction.type === 'income' ? '+' : '−'}${transaction.amount.toFixed(2)}
                  </div>
                  <button
                    className="transaction-item__delete"
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
    </div>
  );
}