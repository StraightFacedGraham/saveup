import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const navigate = useNavigate();

    const googleSignIn = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePicture: results.user.photoURL,
            isAuth: true,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo))
        navigate("/budget-tracker")
    };

    return (
        <div className="login-page">
            <p>Sign in</p>
            <button className="google-login-button" onClick={googleSignIn}>
                {" "}
                Sign in with Google
                </button>
        </div>
    );
};