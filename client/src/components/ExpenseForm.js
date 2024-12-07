import React, { useState } from "react";

function ExpenseForm({ transactions, setTransactions }) {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description) {
      alert("Please fill in all fields!");
      return;
    }
  
    const newTransaction = {
      type,
      amount: parseFloat(amount),
      description,
    };
  
    fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions((prevTransactions) => [...prevTransactions, data]);
        setType("income");
        setAmount("");
        setDescription("");
      })
      .catch((error) => console.error("Error adding transaction:", error));
  };
  

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 style={{color:"white"}}>Add New Transaction</h2>
      <div className="form-group">
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)} style={{background:"rgba(255, 255, 255, 0.2)", backdropFilter:"blur(10px)"}}>
          <option value="income" >Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group">
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{background:"rgba(255, 255, 255, 0.2)", backdropFilter:"blur(10px)"}}/>
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          style={{background:"rgba(255, 255, 255, 0.2)", backdropFilter:"blur(10px)"}}/>
      </div>
      <button type="submit" className="submit-button">
        Add
      </button>
    </form>
  );
}

export default ExpenseForm;
