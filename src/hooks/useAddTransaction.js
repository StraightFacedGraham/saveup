import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo.js";
import { useUpdateLevel } from "./useUpdateLevel.js";
import { useMissions } from "./useMissions.js";

export const useAddTransaction = () => {
    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();
    const { addXP } = useUpdateLevel();
    const { completeMission } = useMissions();

    const addTransaction = async ({ description, transactionAmount, transactionType, category }) => {
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            category,
            createdAt: serverTimestamp()
        });

        await addXP(10);
        await completeMission(1);
    };
    return { addTransaction };
};