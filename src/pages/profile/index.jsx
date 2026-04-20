import { Navbar } from "../../components/navbar.jsx";
import { useGetUserInfo } from "../../hooks/useGetUserInfo.js";
import "./styles.css";

export const Profile = () => {
    const { name, profilePicture } = useGetUserInfo();

    return (
        <>
            <Navbar />

            <div className="profile-page">
                <h1>Profile</h1>
                <div className="profile-info">
                    {profilePicture ? (<img src={profilePicture} alt="img" className="profile-picture" referrerPolicy="no-referrer" />) : null}
                    <h2>{name}</h2>
                </div>
            </div>
        </>
    );
};