import { useAddTransaction } from "../../hooks/useAddTransaction.js";
import { useState } from "react";
import { useGetTransactions } from "../../hooks/useGetTransactions.js";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config.js";
import { GoalTracker } from "../../components/goalTracker.jsx";
import "./styles.css";

// ChartJS imports
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const BudgetTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { transactions, income, expenses, balance } = useGetTransactions();
    const { profilePicture } = useGetUserInfo();
    const navigate = useNavigate();
    
    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    const [category, setCategory] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({description, transactionAmount, transactionType, category});
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
            } catch(err) {
                console.error(err);
            }
    };

    const chartData = {
        labels: ['Expenses', 'Income'],
        datasets: [
            {
                label: 'Amount (£)',
                data: [expenses, income],
                backgroundColor: ['red', 'green'],
                borderColor: ['red', 'green'],
            },
        ],
    };

    return (
        <>
            <div className="budget-tracker">

                <div className="container">
                    <h1> SaveUp</h1>
                    <div className="balance">
                        <h3> Your Balance</h3>
                        <h2> £{balance}</h2>
                    </div>
                </div>

                <div className="summary">
                    <div className="income">
                        <h4> Income</h4>
                        <p> £{income}</p>
                    </div>

                    <div className="expenses">
                        <h4> Expenses</h4>
                        <p> £{expenses}</p>
                    </div>

                    <div className="chart-container">
                        <Doughnut data={chartData} />
                    </div>

                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input type="text" placeholder="Description" required onChange={(e) => setDescription(e.target.value)} />
                        <input type="number" placeholder="Amount" required onChange={(e) => setTransactionAmount(e.target.value)} />
                        <select value={category} required onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Salary">Salary</option>
                            <option value="Other">Other</option>
                        </select>

                        <input type="radio" id="expense" name="transaction-type" value="expense" onChange={(e) => setTransactionType(e.target.value)} checked={transactionType === "expense"} />
                        <label htmlFor="expense"> Expense</label>
                        <input type="radio" id="income" name="transaction-type" value="income" onChange={(e) => setTransactionType(e.target.value)} checked={transactionType === "income"}/>
                        <label htmlFor="income"> Income</label>

                        <button type="submit"> Add Transaction</button>
                    </form>
                </div>

                {profilePicture && (
                    <div className="profile"> 
                    {" "}
                    <img className="profile-picture" src={profilePicture} />

                    <button className="sign-out-button" onClick={signUserOut}>
                        Sign Out
                    </button>
                </div>)}

                <div className="transactions">
                    <h3> Transactions</h3>
                    <ul>
                        {transactions.map((transaction) => {
                            const { description, transactionAmount, transactionType, category } = transaction;
                            return (
                                <li>
                                    <h4> {description} </h4>
                                    <p> 
                                        {" "}
                                        £{transactionAmount}  <label style={{color: transactionType  === "expense" ? "red" : "green"}}> {category} {transactionType} </label>
                                    </p>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <GoalTracker />
                

            </div>
        </>
    );
};