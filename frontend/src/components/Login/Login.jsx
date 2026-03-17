import "./login.css"
import shopContext from "../../context/shopContext.js"
import { TextField } from '@mui/material';
import React, { useState, useContext } from "react"
import { toast } from "react-toastify";
import assets from "../../assets/assetsFile.js"
import {
    auth,
    googleProvider,
} from "../../config/firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
export default function Login() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const { backendURL, setToken, setRole, setLoginState, setLoginPopup, popupRef } = useContext(shopContext);

   const handleSocialLogin = async (provider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user || !user.email) {
      toast.error("Failed to get user info. Try again.");
      return;
    }

    const [firstName, ...lastNameParts] = user.displayName?.split(" ") || [];
    const lastName = lastNameParts.join(" ") || "";

    const response = await axios.post(`${backendURL}/api/user/social-login`, {
      username: firstName,
      lastName,
      email: user.email,
      profilePic: user.photoURL || "",
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
      
    
    const handleLoginUser = async (e) => {
        e.preventDefault();
        try {
            let payload = {
                email,
                password,
            }
            let response = await axios.post(`${backendURL}/api/user/login`, payload);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setRole(response.data.role);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    return (
        <>
            <div ref={popupRef} className="loginPage">
                <form onSubmit={(e) => handleLoginUser(e)} id="loginForm">
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
                    <button type="submit" className="userBtn" id="registerBtn">Login</button>
                <div className="accountManageDiv">
                    <p>don't have account ?</p>
                    <button type="button" onClick={()=>setLoginState("register")} className="accManageBtn">register</button>
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