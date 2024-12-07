import React from "react";

function ExpenseList({ transactions, setTransactions }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/transactions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting transaction:", error));
  };
  

  return (
    <div className="list-container">
      <h2>Transactions</h2>
      <input type="text" className="search-bar" placeholder="Search here" style={{background:"rgba(255, 255, 255, 0.2)", backdropFilter:"blur(0.5px)"}} />
      {transactions.length === 0 ? (
        <p>No transactions yet!</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              <div >
                <p>{transaction.description}</p>
                <p>
                  ₹{transaction.amount.toLocaleString()} (
                  {transaction.type === "income" ? "Income" : "Expense"})
                </p>
              </div>
              <button
                onClick={() => handleDelete(transaction.id)}
                className="delete-button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
