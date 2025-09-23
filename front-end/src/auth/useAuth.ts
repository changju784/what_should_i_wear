import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signOut,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firebase";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const useAuth = () => {
    const { user, loading } = useContext(AuthContext);

    // Email + password login
    const signIn = async (email: string, password: string) => {
        // Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Fetch user from PostgreSQL
        const response = await fetch(`${API_URL}/users/by-email/${email}`);
        if (!response.ok) {
            console.error("User not found in backend. Did signup fail?");
            throw new Error("User exists in Firebase but not in backend DB");
        }

        const data = await response.json();
        console.log("Fetched user from backend:", data);

        return { ...userCredential, backendUser: data };
    };


    // Email + password signup
    const signUp = async (email: string, password: string) => {
        // Create user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
            // Send Email verification
            await sendEmailVerification(userCredential.user);
        }

        // Create user in PostgreSQL
        const response = await fetch(`${API_URL}/users/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: email.split("@")[0],
                email: email,
            }),
        });

        if (!response.ok) {
            console.error("Failed to create user in backend");
        } else {
            const data = await response.json();
            console.log("User created in backend:", data);
        }

        return userCredential;
    };

    // Google OAuth login
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // Facebook OAuth login
    const signInWithFacebook = async () => {
        const provider = new FacebookAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // Sign out
    const logOut = async () => {
        return signOut(auth);
    };

    return {
        user,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithFacebook,
        logOut,
    };
};
