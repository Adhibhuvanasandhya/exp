const express = require("express");
const cors = require("cors");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage 
let transactions = [];

// Get all transactions
app.get("/api/transactions", (req, res) => {
  console.log(transactions)
  res.json(transactions);
});

// Add a new transaction
app.post("/api/transactions", (req, res) => {
  const { type, amount, description } = req.body;

  if (!type || !amount || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newTransaction = {
    id: Date.now(), // Unique ID for each transaction
    type,
    amount: parseFloat(amount), 
    description,
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// Delete a transaction by ID
app.delete("/api/transactions/:id", (req, res) => {
  const { id } = req.params;
  transactions = transactions.filter((transaction) => transaction.id !== parseInt(id));
  res.status(200).json({ message: "Transaction deleted successfully" });
});


app.listen(5000, () => console.log("Start the Server"))