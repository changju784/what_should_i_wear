import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import UserMenu from "./UserMenu";
import { useAuth } from "../auth/hooks/useAuth";

export default function Header() {
    const { user } = useAuth();
    return (
        <header className="w-full bg-transparent py-4 border-b border-beige/10">
            <div className="w-full flex justify-between items-center px-6">
                <Link to={user ? "/dashboard" : "/"} className="flex gap-3">
                    <img src={Logo} alt="Logo" className="h-8 w-[160px]" />
                </Link>
                {user && <UserMenu />}
            </div>
        </header>
    );
}
