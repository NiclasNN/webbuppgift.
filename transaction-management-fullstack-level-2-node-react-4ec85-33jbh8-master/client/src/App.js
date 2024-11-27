import React, { useState } from "react";
import './App.css';
function App() {
  const [transactions, setTransactions] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accountId || !amount) {
      alert("Both Account ID and Amount are required.");
      return;
    }

    const transactionData = {
      accountId,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      setTransactions([
        {
          ...transactionData,
          balance: data.balance,
        },
        ...transactions,
      ]);

      setAccountId("");
      setAmount("");
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Failed to submit transaction. Check the backend server.");
    }
  };

  const withdrawals = transactions.filter((t) => t.amount < 0);
  const deposits = transactions.filter((t) => t.amount >= 0);

  return (
    <div className="container">
      <div className="section">
        <h1>Submit New Transaction</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="accountId">Account ID:</label>
          <input
            type="text"
            id="accountId"
            placeholder="Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="section">
        <h2>Transaction History</h2>
        <div className="transaction-section">
          <h3>Withdrawals</h3>
          {withdrawals.length === 0 && <p>No withdrawals yet.</p>}
          {withdrawals.map((transaction, index) => (
            <div key={index} className="transaction withdrawal">
              <p>
                Transferred {Math.abs(transaction.amount)}$ from account{" "}
                {transaction.accountId}.
              </p>
              <p>Current balance: {transaction.balance}$</p>
            </div>
          ))}
        </div>

        <div className="transaction-section">
          <h3>Deposits</h3>
          {deposits.length === 0 && <p>No deposits yet.</p>}
          {deposits.map((transaction, index) => (
            <div key={index} className="transaction deposit">
              <p>
                Transferred {transaction.amount}$ to account{" "}
                {transaction.accountId}.
              </p>
              <p>Current balance: {transaction.balance}$</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
