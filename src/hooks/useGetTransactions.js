import { useState, useEffect } from "react";
import { query, collection, orderBy, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [income, setIncome] = useState(0.0);
    const [expenses, setExpenses] = useState(0.0);
    const [balance, setBalance] = useState(0.0);

    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();

    const getTransactions = async () => {
        try {
            const queryTransactions = query(transactionCollectionRef, where("userID", "==", userID), orderBy("createdAt"));

            onSnapshot(queryTransactions, (snapshot) => {

                let docs = [];

                let totalIncome = 0
                let totalExpenses = 0

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id

                    docs.push({...data, id});

                    const amount = Number(data.transactionAmount);

                    if (data.transactionType === "income") {
                        totalIncome += amount;
                    } else if (data.transactionType === "expense") {
                        totalExpenses += amount;
                    }

                });

                setTransactions(docs);

                setIncome(totalIncome);
                setExpenses(totalExpenses);
                setBalance(totalIncome - totalExpenses);
            });

        } 
        catch (err) {
            console.error(err);
        }
        
    };

    useEffect(() => {
        getTransactions()
    }, [])

    return { transactions, income, expenses, balance };
};