import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../assets/google.svg"
import FacebookLogo from "../assets/facebook.svg"

export const SignInForm: React.FC = () => {
    const { signIn, signInWithGoogle, signInWithFacebook } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signIn(email, password);
            if (userCredential.user.emailVerified) {
                navigate("/dashboard");
            } else {
                alert("Please verify your email before signing in.");
            }
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-6 bg-gray-100 rounded-xl max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold text-center text-black">Sign In</h2>
            <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                Sign In
            </button>
            <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 py-2 rounded hover:bg-gray-100"
            >
                Continue with Google
                <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" />
            </button>

            <button
                type="button"
                onClick={signInWithFacebook}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 py-2 rounded hover:bg-gray-100"
            >
                Continue with Facebook
                <img src={FacebookLogo} alt="Facebook Logo" className="w-5 h-5" />
            </button>


        </form>
    );
};