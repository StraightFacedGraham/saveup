import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Auth = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const emailSignUp = async (e) => {
        e.preventDefault();
        try {
            const results = await createUserWithEmailAndPassword(auth, email, password);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.email,
                profilePicture: "",
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo))
            navigate("/budget-tracker");
        } 
        catch (err) {
            console.error(err);
            setLoginError("Error creating account. Please try again.");
        }
    };

    const emailSignIn = async (e) => {
        e.preventDefault();
        try {
            const results = await signInWithEmailAndPassword(auth, email, password);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.email,
                profilePicture: "",
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo))
            navigate("/budget-tracker");
        } 
        catch (err) {
            console.error(err);
            setLoginError("Invalid email or password. Please try again.");
        }
    };

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
            <form onSubmit={isSignUp ? emailSignUp : emailSignIn} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px", marginBottom: "20px" }}>
                <input
                    type="email"
                    label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email address" />
                <input
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password" />
                <button type="submit">Sign In</button>
            </form>

            <p>Sign in</p>

            {loginError && <p style={{ color: "red" }}>{loginError}</p>}

            <div className="toggle-sign-up">
                <span>{isSignUp ? "Already have an account?" : "Don't have an account?"}</span>
                <button onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? "Sign In" : "Sign Up"}</button>
            </div>

            <p>or</p>

            <button className="google-login-button" onClick={googleSignIn}>
                {" "}
                Sign in with Google
            </button>

        </div>
    );
};