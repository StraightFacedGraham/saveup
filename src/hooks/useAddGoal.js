import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo.js";
import { add } from "firebase/firestore/pipelines";
import { useMissions } from "./useMissions.js";

export const useAddGoal = () => {
    const goalCollectionRef = collection(db, "goals");
    const { userID } = useGetUserInfo();
    const { completeMission } = useMissions();

    const addGoal = async ({ goalName, targetAmount, savedAmount }) => {
        await addDoc(goalCollectionRef, {
            userID,
            goalName,
            targetAmount: Number(targetAmount),
            savedAmount: Number(savedAmount),
            createdAt: serverTimestamp()
        });

        await completeMission(2);
    };

    return { addGoal };
};