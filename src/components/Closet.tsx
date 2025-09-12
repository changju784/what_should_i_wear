import React, { useState } from "react";
import { Plus, ChevronDown, ChevronRight, Camera, Pencil } from "lucide-react";
import { BackToDashboardButton } from "./BackToDashboardButton";
import Form from "./Form";

interface ClosetItem {
    id: number;
    name: string;
    category: string;
}

interface AddClosetButtonProps {
    showMenu: boolean;
    onToggleMenu: () => void;
    onTakePhoto: () => void;
    onManualEntry: () => void;
}

const AddClosetButton: React.FC<AddClosetButtonProps> = ({
    showMenu,
    onToggleMenu,
    onTakePhoto,
    onManualEntry,
}) => (
    <div className="mb-6 relative flex justify-end">
        <button
            onClick={onToggleMenu}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
            <Plus className="w-5 h-5" /> Add
        </button>
        {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                    onClick={onTakePhoto}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                    <Camera className="w-4 h-4" /> Take a photo
                </button>
                <button
                    onClick={onManualEntry}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                    <Pencil className="w-4 h-4" /> Manual Entry
                </button>
            </div>
        )}
    </div>
);

const Closet: React.FC = () => {
    const [closetItems, setClosetItems] = useState<ClosetItem[]>([
        { id: 1, name: "Blue Denim Jacket", category: "Jackets" },
        { id: 2, name: "Black T-shirt", category: "T-Shirts" },
        { id: 3, name: "White Sneakers", category: "Shoes" },
    ]);

    const [expanded, setExpanded] = useState<string | null>(null);
    const [showAddMenu, setShowAddMenu] = useState(false);

    const categories = ["Jackets", "Pants", "T-Shirts", "Shoes"];

    const toggleCategory = (category: string) => {
        setExpanded(expanded === category ? null : category);
    };

    // Manual entry handler
    const handleManualEntry = () => {
        setShowAddMenu(false);
        const category = prompt("Enter category (Jackets, Pants, T-Shirts, Shoes):");
        if (!category || !categories.includes(category)) return;
        const name = prompt(`Add a new ${category} item:`);
        if (name) {
            setClosetItems((prev) => [
                ...prev,
                { id: Date.now(), name, category },
            ]);
        }
    };

    // Take a photo handler (stub)
    const handleTakePhoto = () => {
        setShowAddMenu(false);
        alert("Photo capture not implemented yet.");
    };

    return (
        <div className="min-h-screen p-8">
            <BackToDashboardButton />
            <Form>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">👕 My Closet</h1>

                <AddClosetButton
                    showMenu={showAddMenu}
                    onToggleMenu={() => setShowAddMenu((v) => !v)}
                    onTakePhoto={handleTakePhoto}
                    onManualEntry={handleManualEntry}
                />

                <div className="space-y-4">
                    {categories.map((category) => {
                        const items = closetItems.filter((item) => item.category === category);
                        const isOpen = expanded === category;

                        return (
                            <div
                                key={category}
                                className="rounded-2xl bg-white shadow-md border border-gray-200"
                            >
                                {/* Category Header */}
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="w-full flex items-center justify-between p-4 text-left"
                                >
                                    <div className="flex items-center gap-2">
                                        {isOpen ? (
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-500" />
                                        )}
                                        <h2 className="text-lg font-semibold text-gray-700">
                                            {category}
                                        </h2>
                                    </div>
                                </button>

                                {/* Items List */}
                                {isOpen && (
                                    <div className="px-6 pb-4 space-y-2">
                                        {items.length > 0 ? (
                                            items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="p-2 rounded-lg border border-gray-200 bg-gray-50"
                                                >
                                                    {item.name}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 italic">
                                                No items in {category}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Form>
        </div>
    );
};

export default Closet;