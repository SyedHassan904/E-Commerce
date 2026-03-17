import "./register.css"
import React, { useState, useContext } from "react"
import { TextField } from '@mui/material';
import shopContext from "../../context/shopContext.js";
import { toast } from "react-toastify";
import assets from "../../assets/assetsFile.js"
import axios from "axios";
import {
    auth,
    googleProvider,
} from "../../config/firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";
export default function Register() {
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const { backendURL, setToken, setLoginState, setLoginPopup, popupRef } = useContext(shopContext);
    const handleSocialLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Split full name into first and last name
            const [firstName, ...lastNameParts] = user.displayName?.split(" ") || [];
            const lastName = lastNameParts.join(" ") || "";

            // Send to backend
            const response = await axios.post(`${backendURL}/api/user/social-login`, {
                username: firstName,            // first name
                lastName: lastName,             // last name
                email: user.email,              // email from firebase
                profilePic: user.photoURL || "", // profile picture
            });

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                toast.success("Login successful!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Social Login Error:", error);
            toast.error(error.message || "Something went wrong");
        }
    };


    const handleRegisterUser = async (e) => {
        e.preventDefault();
        try {
            let payload = {
                firstName,
                lastName,
                email,
                password,
            }

            let response = await axios.post(`${backendURL}/api/user/register`, payload);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }
    return (
        <>
            <div ref={popupRef} className="RegisterPopup">
                <form onSubmit={(e) => handleRegisterUser(e)} id="loginForm">
                    <div className="loginFormTextFieldContainer">
                        <TextField
                            label="First Name *"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                        <TextField
                            label="Last Name *"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        />
                    </div>
                    <TextField
                        label="Email *"
                        variant="outlined"
                        type="email"
                        placeholder="example@domain.com"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField
                        label="Password *"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                    />
                    <button type="submit" className="userBtn" id="registerBtn">Register</button>
                    <div className="accountManageDiv">
                        <p>if you have already account ?</p>
                        <button type="button" onClick={() => setLoginState("login")} className="accManageBtn">login</button>
                    </div>
                    <div className="socialButtons">
                        <button type="button" className="googleBtn" onClick={() => handleSocialLogin(googleProvider)}>
                            Continue with<img src={assets.google_icon} alt="Google" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}