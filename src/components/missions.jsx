import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config.js";
import { useGetUserInfo } from "../hooks/useGetUserInfo.js";
import { useMissions, missionsArray } from "../hooks/useMissions.js";

export const Missions = () => {
    const { userID } = useGetUserInfo();
    
    const [completedMissions, setCompletedMissions] = useState([]);

    useEffect(() => {
        const fetchMissions = async () => {

            try {
                const userDoc = await getDoc(doc(db, "users", userID));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setCompletedMissions(data.completedMissions || []);
                }
            } 
            catch (err) {
                console.error("Error fetching missions:", err);
            }
        };
        fetchMissions();
        window.addEventListener("missionsUpdated", fetchMissions);
        
        return () => {
            window.removeEventListener("missionsUpdated", fetchMissions);
        };

    }, [userID]);

    return (
        <div className="missions-container">
            <h3>Daily Missions</h3>
            
            <div className="missions-list">
                {missionsArray.map((mission) => {
                    const isComplete = completedMissions.includes(mission.id);

                    return (
                        <div key={mission.id} className={`mission-card ${isComplete ? 'completed' : ''}`}>
                            <div className="mission-content">
                                <div>
                                    <h4 className="mission-description">{mission.description}</h4>
                                    <span className="mission-xp">+{mission.xpReward} XP</span>
                                </div>
                                
                                <div className="mission-status">
                                    {isComplete ? "Completed" : "In Progress"}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};