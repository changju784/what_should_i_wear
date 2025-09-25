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
    UserCredential as FirebaseUserCredential,
} from "firebase/auth";
import { auth } from "./firebase";

const API_URL = process.env.REACT_APP_BACKEND_URL;

interface UserCredential extends FirebaseUserCredential {
    postgresUser?: any; // TODO: Define a proper type for your backend user
}

export const useAuth = () => {
    const { user, loading } = useContext(AuthContext);

    const syncPostgresUser = async (email: string) => {
        // Check if user exists in db
        let response = await fetch(`${API_URL}/users/by-email/${email}`);
        if (response.ok) {
            return response.json();
        }

        // If not found, create in db
        response = await fetch(`${API_URL}/users/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: email.split("@")[0],
                email,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to sync user with backend");
        }
        return response.json();
    };

    // Email + password login
    const signIn = async (email: string, password: string): Promise<UserCredential> => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const postgresUser = await syncPostgresUser(email);
        return { ...userCredential, postgresUser };
    };

    // Email + password signup
    const signUp = async (email: string, password: string): Promise<UserCredential> => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        if (userCredential.user) {
            await sendEmailVerification(userCredential.user);
        }

        const postgresUser = await syncPostgresUser(email);
        return { ...userCredential, postgresUser };
    };

    // Google OAuth login
    const signInWithGoogle = async (): Promise<UserCredential> => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);

        if (!userCredential.user.email) {
            throw new Error("No email returned from Google account");
        }

        const postgresUser = await syncPostgresUser(userCredential.user.email);
        return { ...userCredential, postgresUser };
    };

    // Facebook OAuth login
    const signInWithFacebook = async (): Promise<UserCredential> => {
        const provider = new FacebookAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);

        if (!userCredential.user.email) {
            throw new Error("No email returned from Facebook account");
        }

        const postgresUser = await syncPostgresUser(userCredential.user.email);
        return { ...userCredential, postgresUser };
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
