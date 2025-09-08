import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

export default function Header() {
    return (
        <header className="w-full bg-transparent py-4 border-b border-beige/10">
            <div className="max-w-6xl flex px-6">
                <Link to="/" className="flex gap-3">
                    <img src={Logo} alt="Logo" className="h-8 w-[160px]" />
                </Link>
            </div>
        </header>
    );
}
