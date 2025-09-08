import React, { JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignInForm } from "../auth/SignInForm";
import { SignUpForm } from "../auth/SignUpForm";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../auth/useAuth";
import { Link } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/signin" />;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />

            <Route
                path="/signin"
                element={
                    <div className="flex flex-col items-center gap-4 p-6 text-white">
                        <SignInForm />
                        <p>
                            Don’t have an account?{" "}
                            <Link to="/signup" className="text-blue-600">Sign Up</Link>
                        </p>
                    </div>
                }
            />

            <Route
                path="/signup"
                element={
                    <div className="flex flex-col items-center gap-4 p-6 text-white">
                        <SignUpForm />
                        <p>
                            Already have an account?{" "}
                            <Link to="/signin" className="text-blue-600">Sign In</Link>
                        </p>
                    </div>
                }
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
