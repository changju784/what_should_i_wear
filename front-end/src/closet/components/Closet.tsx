import React, { useState } from "react";
import AddByImage from "../components/AddByImage";
import ClassificationResult from "../components/ClassificationResult";
import { BackToDashboardButton } from "../../components/BackToDashboardButton";
import Form from "../../components/Form";

type ClosetItem = {
    id: string;
    imageUrl: string;
    category: "Tops" | "Outerwear" | "Bottoms" | "Dresses" | "Footwear";
};

const Closet: React.FC = () => {
    const [closet, setCloset] = useState<ClosetItem[]>([]);
    const [showAdd, setShowAdd] = useState(false);
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [pendingImgSrc, setPendingImgSrc] = useState<string | null>(null);

    const handleAddItem = (item: { imgSrc: string; category: string }) => {
        const newItem: ClosetItem = {
            id: Date.now().toString(),
            imageUrl: item.imgSrc,
            category: item.category as ClosetItem["category"],
        };
        setCloset((prev) => [...prev, newItem]);
    };

    return (
        <div className="min-h-screen p-8">
            <BackToDashboardButton />

            <Form onSubmit={(e) => e.preventDefault()}>
                <h1 className="text-2xl font-bold mb-6 text-center">👗 My Closet</h1>

                {closet.length === 0 ? (
                    <p className="text-gray-500 text-center">No items yet. Add something!</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {closet.map((item) => (
                            <div
                                key={item.id}
                                className="border rounded-lg shadow-sm p-2 flex flex-col items-center"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.category}
                                    className="h-32 w-32 object-cover rounded"
                                />
                                <span className="mt-2 text-sm font-medium">{item.category}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setShowAdd(true)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600"
                    >
                        ➕ Add Item
                    </button>
                </div>
            </Form>

            {/* Add Image Modal */}
            {showAdd && (
                <AddByImage
                    onClose={() => setShowAdd(false)}
                    onImageReady={(file, imgSrc) => {
                        setPendingFile(file);
                        setPendingImgSrc(imgSrc);
                        setShowAdd(false);
                    }}
                />
            )}

            {/* Classification Modal */}
            {pendingFile && pendingImgSrc && (
                <ClassificationResult
                    file={pendingFile}
                    imgSrc={pendingImgSrc}
                    onClose={() => {
                        setPendingFile(null);
                        setPendingImgSrc(null);
                    }}
                    onConfirm={(item) => {
                        handleAddItem(item);
                        setPendingFile(null);
                        setPendingImgSrc(null);
                    }}
                />
            )}
        </div>
    );
};

export default Closet;
