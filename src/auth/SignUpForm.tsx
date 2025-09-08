import { useState } from "react";
import { useAuth } from "./useAuth";
import Form from "../components/Form";

export const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            setMessage("Check your inbox to verify your email!");
        } catch (err: any) {
            setMessage(err.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-center text-black">Sign Up</h2>
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
            <button className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
            {message && <p className="text-sm text-red-500">{message}</p>}
        </Form>
    );
};
