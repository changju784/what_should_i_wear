import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth } from "../auth/hooks/useAuth";

const UserMenu: React.FC = () => {
    const { logOut } = useAuth();

    const handleSignOut = async () => {
        await logOut();
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-400">
                    👤
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
                align="end"
                sideOffset={5}
                className="min-w-[150px] bg-white rounded-md shadow-md p-1"
            >
                <DropdownMenu.Item
                    onClick={handleSignOut}
                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md cursor-pointer select-none"
                >
                    Sign Out
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default UserMenu;
