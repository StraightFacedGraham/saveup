
import { useAddTransaction } from "../../hooks/useAddTransaction.js";
import { useState } from "react";
import { useGetTransactions } from "../../hooks/useGetTransactions.js";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config.js";

import "./styles.css";


export const BudgetTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { transactions, income, expenses, balance } = useGetTransactions();
    const { profilePicture } = useGetUserInfo();
    const navigate = useNavigate();
    
    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({description, transactionAmount, transactionType});
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

                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input type="text" placeholder="Description" required onChange={(e) => setDescription(e.target.value)} />
                        <input type="number" placeholder="Amount" required onChange={(e) => setTransactionAmount(e.target.value)} />

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
                            const { description, transactionAmount, transactionType } = transaction;
                            return (
                                <li>
                                    <h4> {description} </h4>
                                    <p> 
                                        {" "}
                                        £{transactionAmount}  <label style={{color: transactionType  === "expense" ? "red" : "green"}}> {transactionType} </label>
                                    </p>
                                </li>
                            )
                        })}
                    </ul>
                </div>

            </div>
        </>
    );
};