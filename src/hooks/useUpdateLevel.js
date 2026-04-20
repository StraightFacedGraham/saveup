import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo.js";
import { use } from "react";

export const useUpdateLevel = () => {
    const { userID } = useGetUserInfo();

    const calculateLevel = (xpGained) => {
        let level = 1;
        let xpToNextLevel = 100;

        while (xpGained >= xpToNextLevel) {
            level++;
            xpToNextLevel += 100 * level;
        }

        return level;
    };

    const addXP = async (xpReward) => {
        const userDocRef = doc(db, "users", userID);

        try {
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const currentXP = userData.xp || 0;
                const newTotalXP = currentXP + xpReward;
                const newLevel = calculateLevel(newTotalXP);

                if (newLevel > userData.level) {
                    console.log(`Congratulations! You've leveled up to Level ${newLevel}!`);
                }

                await updateDoc(userDocRef, {
                    xp: newTotalXP,
                    level: newLevel
                });
            }
            else {
                const initialLevel = calculateLevel(xpReward);

                await setDoc(userDocRef, {
                    userID: userID,
                    xp: xpReward,
                    level: initialLevel,
                    badges: []
                });
            }
        } 
        catch (err) {
            console.error("Error updating XP and level: ", err);
        }
    };

    return { addXP, calculateLevel };
    
};