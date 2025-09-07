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

export const useAuth = () => {
    const { user, loading } = useContext(AuthContext);

    // Email + password login
    const signIn = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Email + password signup
    const signUp = async (email: string, password: string) => {
        // Create user in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
            // Send Email verification
            await sendEmailVerification(userCredential.user);
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
