import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

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
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded-xl flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Sign In</h2>
            <input
                type="email"
                placeholder="Email"
                className="border p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Sign In
            </button>

            <button
                type="button"
                onClick={signInWithGoogle}
                className="bg-red-500 text-white p-2 rounded"
            >
                Continue with Google
            </button>

            <button
                type="button"
                onClick={signInWithFacebook}
                className="bg-blue-700 text-white p-2 rounded"
            >
                Continue with Facebook
            </button>
        </form>
    );
};
