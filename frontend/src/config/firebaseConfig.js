import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWS6_OYDIthogz-90rhYAZnortWHUcggA",
  authDomain: "bossauth-1be11.firebaseapp.com",
  projectId: "bossauth-1be11",
  storageBucket: "bossauth-1be11.firebasestorage.app",
  messagingSenderId: "659934027095",
  appId: "1:659934027095:web:922e704ec96b51eca43212",
  measurementId: "G-C0RZXN4WMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();
// facebookProvider.addScope('email');
// facebookProvider.addScope('public_profile');

// export const facebookLocalConfig = {
//   callbackURL: "http://localhost:3000/auth/facebook/callback"
// };

export { auth, googleProvider, analytics };
