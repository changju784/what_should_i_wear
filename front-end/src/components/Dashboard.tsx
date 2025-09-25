import { User } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
            <WelcomeMsg user={user} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                {/* Closet card */}
                <Link
                    to="/closet"
                    className="rounded-2xl bg-white shadow-md hover:shadow-xl transition p-6 flex flex-col items-center"
                >
                    <span className="text-5xl">👕</span>
                    <h2 className="text-xl font-semibold mt-4">See what’s in my closet</h2>
                    <p className="text-gray-500 mt-2 text-center">
                        View and organize your jackets, pants, T-shirts, shoes, and more.
                    </p>
                </Link>

                {/* Suggestion card */}
                <Link
                    to="/suggestion"
                    className="rounded-2xl bg-white shadow-md hover:shadow-xl transition p-6 flex flex-col items-center"
                >
                    <span className="text-5xl">🌦️</span>
                    <h2 className="text-xl font-semibold mt-4">What should I wear?</h2>
                    <p className="text-gray-500 mt-2 text-center">
                        Get weather-based outfit suggestions now, closet-aware in the future.
                    </p>
                </Link>
            </div>
        </div>
    );
};

interface WelcomeMsgProps {
    user: User | null;
}

const WelcomeMsg: React.FC<WelcomeMsgProps> = ({ user }) => {
    return (
        <>
            {user && (
                <p className="text-2xl font-bold mb-6 text-white drop-shadow-lg">
                    👋 Welcome, {user.email}!
                </p>
            )}
        </>
    );
};

export default Dashboard;