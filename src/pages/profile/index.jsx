import { Navbar } from "../../components/navbar.jsx";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";
import { use, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config.js";
import { useUpdateLevel } from "../../hooks/useUpdateLevel.js";
import "./styles.css";

export const Profile = () => {
    const { userID, name, profilePicture } = useGetUserInfo();
    const { calculateLevel } = useUpdateLevel();

    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [badges, setBadges] = useState([]);
    const [xpToNextLevel, setXpToNextLevel] = useState(100);
    const [currentXP, setCurrentXP] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {

            try {
                const userDocRef = doc(db, "users", userID);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setXp(userData.xp || 0);
                    setLevel(userData.level || 1);
                    setBadges(userData.badges || []);
                
                let currentLevel = 1;
                let xpForLevelUp = 100;
                let xpForPrevLevel = 0;
                
                while (userData.xp >= xpForLevelUp) {
                    currentLevel++;
                    xpForPrevLevel = xpForLevelUp;
                    xpForLevelUp += 100 * currentLevel;
                }

                setCurrentXP(xpForPrevLevel);
                setXpToNextLevel(xpForLevelUp);
                }
            } 
            catch (err) {
                console.error("Error fetching user data: ", err);
            }
        };

        fetchUserData();
    }, [userID]);

    const progressPercentage = Math.round(((xp - currentXP) / (xpToNextLevel - currentXP)) * 100);

    return (
        <>
            <Navbar />

            <div className="profile-page">
                <h1>Profile</h1>
                <div className="profile-info">
                    <img src={profilePicture} alt="img" className="profile-picture" referrerPolicy="no-referrer" />
                    <h2>{name}</h2>
                </div>
            </div>
            <div className="xp-container">
                    <div className="xp-header">
                        <strong>Level: {level}</strong>
                        <span>{xpToNextLevel - xp} XP to Level {level + 1}</span>
                    </div>
                    
                    <div className="xp-bar">
                        <div className="xp-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
        </>
    );
};