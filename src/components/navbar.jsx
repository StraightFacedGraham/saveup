import { Link, useNavigate } from "react-router-dom";
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
                <Link to="/budget-tracker">Dashboard</Link>
                <Link to="/profile">Profile</Link>
            </div>

            <div className="navbar-signout">
                <img src={profilePicture} alt="img" className="profile-picture" referrerPolicy="no-referrer" />
                <button onClick={signUserOut}>Sign Out</button>
            </div>

        </nav>
    );
};