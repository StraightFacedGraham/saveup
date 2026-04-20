import { link, useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo.js";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config.js";

export const Navbar = () => {
    const { profilePicture } = useGetUserInfo();
    const navigate = useNavigate();

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } 
        catch(err) {
            console.error(err);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>SaveUp</h1>
            </div>

            <div className="navbar-links">
                <a href="/budget-tracker">Dashboard</a>
                
                <a href="/profile">Profile</a>
            </div>

            <div className="navbar-signout">
                {profilePicture ? (<img src={profilePicture} alt="img" className="profile-picture" referrerPolicy="no-referrer" />) : null}
                <button onClick={signUserOut}>Sign Out</button>
            </div>

        </nav>
    );
};