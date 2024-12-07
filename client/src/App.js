import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import one from "./assests/e4.jpg"

function App() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);
  

  useEffect(() => {
    calculateTotals(transactions);
  }, [transactions]);

  const calculateTotals = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += parseFloat(transaction.amount);
      } else if (transaction.type === "expense") {
        totalExpense += parseFloat(transaction.amount);
      }
    });

    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  };

  return (
    <div className="app" style={{backgroundImage:`url(${one})`, backgroundRepeat: "no-repeat",backgroundSize: "cover",backgroundPosition: "center",}}>
      <h1 className="title">Expense Tracker</h1>

      <div className="balance-container">
        <h3>Balance ₹{balance.toLocaleString()}</h3>
      </div>

      <div className="stats-container">
        <div className="card expense">
          <h4>Expense</h4>
          <p>₹{expense.toLocaleString()}</p>
        </div>
        <div className="card income">
          <h4>Budget</h4>
          <p>₹{income.toLocaleString()}</p>
        </div>
      </div>

      <ExpenseForm
        transactions={transactions}
        setTransactions={setTransactions}
      />
      <ExpenseList
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  );
}

export default App;
