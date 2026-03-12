import { useState, useEffect } from 'react';


interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('swiftcash_transactions');
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const recentTransactions = transactions.slice(0, 5);

  const getCategoryTotal = (category: string, type: 'income' | 'expense') => {
    return transactions
      .filter(t => t.category === category && t.type === type)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const topExpenseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment']
    .map(cat => ({ name: cat, amount: getCategoryTotal(cat, 'expense') }))
    .filter(cat => cat.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 4);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__subtitle">Welcome back! Here's your financial overview</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="dashboard-cards">
        <div className="dashboard-card" data-type="balance">
          <div className="dashboard-card__content">
            <p className="dashboard-card__label">Total Balance</p>
            <p className="dashboard-card__value">${balance.toFixed(2)}</p>
          </div>
          <div className="dashboard-card__icon">💰</div>
        </div>

        <div className="dashboard-card" data-type="income">
          <div className="dashboard-card__content">
            <p className="dashboard-card__label">Total Income</p>
            <p className="dashboard-card__value">+${totalIncome.toFixed(2)}</p>
          </div>
          <div className="dashboard-card__icon">📈</div>
        </div>

        <div className="dashboard-card" data-type="expense">
          <div className="dashboard-card__content">
            <p className="dashboard-card__label">Total Expense</p>
            <p className="dashboard-card__value">-${totalExpense.toFixed(2)}</p>
          </div>
          <div className="dashboard-card__icon">📉</div>
        </div>

        <div className="dashboard-card" data-type="transactions">
          <div className="dashboard-card__content">
            <p className="dashboard-card__label">Total Transactions</p>
            <p className="dashboard-card__value">{transactions.length}</p>
          </div>
          <div className="dashboard-card__icon">📝</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="dashboard-grid">
        {/* Recent Transactions */}
        <div className="dashboard-section">
          <h2 className="dashboard-section__title">Recent Transactions</h2>
          <div className="recent-list">
            {recentTransactions.length === 0 ? (
              <div className="empty-message">No transactions yet</div>
            ) : (
              recentTransactions.map(transaction => (
                <div key={transaction.id} className="recent-item">
                  <div className="recent-item__icon" data-type={transaction.type}>
                    {transaction.type === 'income' ? '+' : '−'}
                  </div>
                  <div className="recent-item__details">
                    <p className="recent-item__description">{transaction.description}</p>
                    <p className="recent-item__meta">{transaction.category}</p>
                  </div>
                  <div className="recent-item__amount" data-type={transaction.type}>
                    {transaction.type === 'income' ? '+' : '−'}${transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Spending Categories */}
        <div className="dashboard-section">
          <h2 className="dashboard-section__title">Top Spending</h2>
          <div className="category-list">
            {topExpenseCategories.length === 0 ? (
              <div className="empty-message">No expenses yet</div>
            ) : (
              topExpenseCategories.map(category => {
                const percentage = totalExpense > 0 ? (category.amount / totalExpense) * 100 : 0;
                return (
                  <div key={category.name} className="category-item">
                    <div className="category-item__info">
                      <p className="category-item__name">{category.name}</p>
                      <p className="category-item__amount">${category.amount.toFixed(2)}</p>
                    </div>
                    <div className="category-item__bar">
                      <div 
                        className="category-item__fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="category-item__percentage">{percentage.toFixed(0)}%</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}