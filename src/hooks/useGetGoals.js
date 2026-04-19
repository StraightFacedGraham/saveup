import { useState, useEffect } from "react";
import { query, collection, orderBy, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetGoals = () => {
    const [goals, setGoals] = useState([]);

    const goalCollectionRef = collection(db, "goals");
    const { userID } = useGetUserInfo();

    const getGoals = async () => {
        try {
            const goalQuery = query(goalCollectionRef, where("userID", "==", userID), orderBy("createdAt"));

            onSnapshot(goalQuery, (snapshot) => {

                let docs = [];

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id

                    docs.push({...data, id});
                });

                setGoals(docs);
            });

        } catch (err) {
            console.error(err);
        }
        
    };

    useEffect(() => {
        getGoals()
    }, [])

    return { goals };
};