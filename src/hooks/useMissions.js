import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config.js";
import { useGetUserInfo } from "./useGetUserInfo.js";
import { useUpdateLevel } from "./useUpdateLevel.js";

export const missionsArray = [
    { id: 1, description: "Add a transaction", xpReward: 10 },
    { id: 2, description: "Create a savings goal", xpReward: 20 },
    { id: 3, description: "Reach a savings goal", xpReward: 50 },
]

export const useMissions = () => {
    const { userID } = useGetUserInfo();
    const { gainXP } = useUpdateLevel();

    const completeMission = async (missionID) => {
        try {
            const userRef = doc(db, "users", userID);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const completedMissions = userData.completedMissions || [];

                if (completedMissions.includes(missionID)) {
                    return;
                }

                const mission = missionsArray.find(m => m.id === missionID);
                if (!mission) return;

                await gainXP(mission.xpReward);

                await updateDoc(userRef, {
                    completedMissions: [...completedMissions, missionID]
                });

                window.dispatchEvent(new Event("missionsUpdated"));
            }
        } 
        catch (err) {
            console.error("Error updating mission status: ", err);
        }
    };

    return { completeMission };
};
