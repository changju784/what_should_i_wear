import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../assets/google.svg";
import FacebookLogo from "../assets/facebook.svg";
import Form from "../components/Form";

export const SignInForm: React.FC = () => {
    const { signIn, signInWithGoogle, signInWithFacebook } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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

    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await signInWithGoogle();
            if (userCredential.user.emailVerified || userCredential.user.emailVerified === undefined) {
                navigate("/dashboard");
            } else {
                alert("Please verify your email before signing in.");
            }
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleFacebookSignIn = async () => {
        try {
            const userCredential = await signInWithFacebook();
            if (userCredential.user.emailVerified || userCredential.user.emailVerified === undefined) {
                navigate("/dashboard");
            } else {
                alert("Please verify your email before signing in.");
            }
        } catch (err: any) {
            alert(err.message);
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-center text-black">Sign In</h2>

            {/* Email */}
            <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password with eye toggle */}
            <div className="relative w-full">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full p-2 border rounded pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500"
                >
                    {showPassword ? "🙈" : "👁️"}
                </button>
            </div>

            {/* Sign In button */}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded"
            >
                Sign In
            </button>

            {/* Social login buttons */}
            <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 py-2 rounded hover:bg-gray-100"
            >
                Continue with Google
                <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" />
            </button>

            <button
                type="button"
                onClick={handleFacebookSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 py-2 rounded hover:bg-gray-100"
            >
                Continue with Facebook
                <img src={FacebookLogo} alt="Facebook Logo" className="w-5 h-5" />
            </button>
        </Form>

    );
};
